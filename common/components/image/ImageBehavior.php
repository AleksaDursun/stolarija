<?php
/**
 * Created by PhpStorm.
 * User: Nikola Kukric <nikola@2amigos.us>
 * Date: 12/1/2015
 * Time: 12:53 AM
 */

namespace common\components\image;

use common\components\orm\ActiveRecord;
use Yii;
use yii\db\BaseActiveRecord;
use yii\imagine\Image as Imagine;
use Imagine\Image\Point;
use Imagine\Image\Box;
use Imagine\Image\ManipulatorInterface;
use common\models\ImageThumb;
use yii\web\HttpException;
use common\components\behaviors\FileBehavior;

class ImageBehavior extends FileBehavior implements ImageBehaviorInterface
{

    /**
     * Check is image landscape oriented
     * @return bool
     */
    public function isLandscape()
    {
        return $this->getOrientation() === ImageSpecification::LANDSCAPE;
    }

    /**
     * Check is image portrait oriented
     * @return bool
     */
    public function isPortrait()
    {
        return $this->getOrientation() === ImageSpecification::PORTRAIT;
    }

    /**
     * Get image orientation
     * @return string
     */
    public function getOrientation()
    {
        if ($this->owner->height && $this->owner->width) {
            return $this->owner->height >= $this->owner->width ?
                ImageSpecification::PORTRAIT :
                ImageSpecification::LANDSCAPE;
        }

        return ImageSpecification::PORTRAIT;
    }

    /**
     * Apply transformation specification to an image
     *
     * @param $spec
     */
    public function applyTransformations($spec)
    {
        $specObj = new ImageSpecification($spec);

        if ($specObj->hasCroppedParams()) {
            $this->crop($specObj->getCroppedX(), $specObj->getCroppedY(), $specObj->getCroppedWidth(), $specObj->getCroppedHeight());
        }

        if ($specObj->hasResizeParams()) {
            $this->resize($specObj->getWidth(), $specObj->getHeight(), false, $specObj->getShouldForceSize());
        }

        if ($specObj->hasRotateParams()) {
            $this->rotate($specObj->getRotate());
        }
    }

    /**
     * Resize image
     * @param $width
     * @param $height
     * @param bool $outbound
     * @param bool $forceSize
     * @throws \League\Flysystem\FileNotFoundException
     */
    public function resize($width, $height, $outbound = false, $forceSize = false)
    {
        $imagePath = $this->getLocalFilePath();

        if (!file_exists($imagePath)) {
            return;
        }

        $file = Imagine::getImagine()->open($imagePath);
        $fileSize = $file->getSize();
        $aspectRatio = $fileSize->getWidth() / $fileSize->getHeight();

        if ($height === null) {
            $height = ceil($width / $aspectRatio);
        }

        if ($width === null) {
            $width = ceil($height * $aspectRatio);
        }

        if ($forceSize) {
            if ($fileSize->getWidth() < $width) {
                $file->resize($fileSize->widen($width));
            }

            if ($fileSize->getHeight() < $height) {
                $file->resize($fileSize->heighten($height));
            }

            if ($fileSize->getWidth() > $fileSize->getHeight()) {
                $cropHeight = $fileSize->getHeight();
                $cropWidth = $width * ($fileSize->getHeight()/ $height);
                $cropPoint = new Point((max($fileSize->getWidth() - $cropWidth, 0)) / 2, 0);
            } else {
                $cropWidth = $fileSize->getWidth();
                $cropHeight = $height * ($fileSize->getWidth() / $width);
                $cropPoint = new Point(0, ($fileSize->getHeight() - $cropHeight) / 2);
            }

            $file->crop($cropPoint, new Box($cropWidth, $cropHeight));
        }

        if ($outbound) {
            $file->thumbnail(new Box($width, $height), ManipulatorInterface::THUMBNAIL_OUTBOUND)->save($imagePath);
        } else {
            $file->thumbnail(new Box($width, $height))->save($imagePath);
        }
    }

    /**
     * @param $x
     * @param $y
     * @param $width
     * @param $height
     * @param string $extension
     * @throws \League\Flysystem\FileNotFoundException
     */
    public function crop($x, $y, $width, $height, $extension = '')
    {
        $imagePath = $this->getLocalFilePath();

        if (!file_exists($imagePath)) {
            return;
        }

        Imagine::getImagine()->open($imagePath)
            ->crop(new Point($x, $y), new Box($width, $height))
            ->save($imagePath, ['format' => $extension]);
    }

    /**
     * Rotate Image
     * @param $angle
     * @throws \League\Flysystem\FileNotFoundException
     */
    public function rotate($angle)
    {
        $imagePath = $this->getLocalFilePath();

        if (!file_exists($imagePath)) {
            return;
        }

        Imagine::getImagine()->open($imagePath)->rotate($angle)->save($imagePath);
    }

    /**
     * Regenerate image storage key, using this will put out of use all thumbs already created
     * Use example: when image is transformed
     */
    public function regenerateStorageKey()
    {
        $fileExtension = pathinfo($this->getStorageKey(), PATHINFO_EXTENSION);
        $this->owner->{$this->storageKeyAttribute} = $this->getGeneratedStorageKey($fileExtension);
    }

    /**
     * Generate thumb storage key
     * @param $spec
     * @return mixed
     */
    protected function generateThumbStorageKey($spec)
    {
        $specObj = new ImageSpecification($spec);
        $thumbPath = $this->getThumbPath() . $specObj->getKey();

        return $thumbPath . '/' . str_replace($this->getPathPrefix(), '', $this->getStorageKey());
    }

    /**
     * Get thumb path
     * @return string
     */
    protected function getThumbPath()
    {
        $thumbPath = trim(Yii::$app->params['resourceManager']['image.thumb.path'], '/') . '/';
        $basePath = trim(Yii::$app->params['resourceManager']['s3.path.prefix'], '/');

        return $basePath . '/' . $thumbPath;
    }

    /**
     * Set width and height file size from local file
     */
    public function setSizeFromLocalFile()
    {
        $file = $this->getLocalFile();
        if (!$file) {
            return;
        }

        $this->owner->{$this->widthAttribute} = $file->getSize()->getWidth();
        $this->owner->{$this->heightAttribute} = $file->getSize()->getHeight();
    }

    /**
     * @return bool|\Imagine\Image\ImageInterface|string|null
     * @throws \League\Flysystem\FileNotFoundException
     */
    public function getLocalFile()
    {
        $imagePath = $this->getLocalFilePath();

        if (!file_exists($imagePath)) {
            return null;
        }

        return Imagine::getImagine()->open($imagePath);
    }

    /**
     * Get image url
     * @param string $spec
     * @return string url
     */
    public function getImageUrl($spec = ImageSpecification::THUMB_STANDARD, $token = null)
    {
        $specObj = new ImageSpecification($spec);

        return Yii::$app->urlManager->createUrl([
            '/image/view',
            'id' => $this->owner->id,
            'spec' => $specObj->getKey(),
            'token' => $token
        ]);
    }

    /**
     * @param $spec
     * @return ImageThumb|null
     * @throws ImageSpecificationException
     */
    public function findThumb($spec)
    {
        $specObj = new ImageSpecification($spec);

        return ImageThumb::findOne([
            'spec_key' => $specObj->getKey(),
            'image_id' => $this->owner->id,
            'storage_key' => $this->generateThumbStorageKey($specObj->getKey())
        ]);
    }

    /**
     * Get image Thumb object
     * @param $spec
     * @return ImageThumb|null
     * @throws HttpException
     * @throws ImageSpecificationException
     */
    public function getThumb($spec)
    {
        $specObj = new ImageSpecification($spec);
        $thumb = $this->findThumb($specObj);

        if (empty($thumb)) {
            $thumb = $this->createThumb($specObj->getKey());
        }

        return $thumb;
    }

    /**
     * Create Image thumb object
     * @param $spec
     * @return ImageThumb
     * @throws HttpException
     * @throws ImageSpecificationException
     */
    protected function createThumb($spec)
    {
        $specObj = new ImageSpecification($spec);

        $this->applyTransformations($specObj);

        $storageKey = $this->generateThumbStorageKey($specObj->getKey());

        if (!parent::saveOnStorageAs($storageKey)) {
            throw new HttpException(500, 'Unable to save image thumb on storage.');
        }

        $thumb = new ImageThumb([
            'spec_key' => $specObj->getKey(),
            'image_id' => $this->owner->id,
            'storage_type' => $this->owner->storage_type,
            'storage_key' => $storageKey
        ]);

        if (!$thumb->save()) {
            throw new HttpException(500, 'Unable to save image thumb in DB.');
        }

        return $thumb;
    }
}
