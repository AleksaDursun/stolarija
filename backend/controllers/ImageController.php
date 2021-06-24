<?php

namespace backend\controllers;

use common\components\controllers\BaseController;
use common\components\image\ImageSpecification;
use common\helpers\ArrayHelper;
use common\helpers\RbacHelper;
use common\helpers\TimeHelper;
use common\models\Image;
use Yii;
use yii\filters\AccessControl;
use yii\web\Response;

class ImageController extends BaseController
{
    public $modelClass = Image::class;

    public function behaviors()
    {
        return ArrayHelper::merge(parent::behaviors(),
            [
                'access' => [
                    'class' => AccessControl::class,
                    'rules' => [
                        [
                            'actions' => ['view', 'index', 'create', 'update', 'delete'],
                            'allow' => true,
                            'roles' => ['@']
                        ],
                        [
                            'allow' => true,
                            'roles' => [RbacHelper::ROLE_ADMIN]
                        ]
                    ],
                ],
            ]);
    }

    public function actionIndex() {
        return $this->render('index');
    }

    public function actionView($id, $spec = ImageSpecification::THUMB_STANDARD, $forceOrientation = null)
    {
        ob_clean(); //FIXME something is echoing some strange character, not an issue on dev

        $imageSpec = new ImageSpecification($spec);

        /** @var Image $image */
        $image = $this->findModel($id);

        if ($forceOrientation == 1 && !$imageSpec->isLandscape() && $image->isLandscape()) {
            $imageSpec->swapDimensions();
        }

        $thumb = $image->getThumb($imageSpec->getKey());

        return $this->renderImageResponse(
            $thumb->getETag(),
            $thumb->getLastModified(),
            $image->mime_type,
            $thumb->storage_key
        );
    }

    protected function renderImageResponse($eTag, $lastModified, $mimeType, $storageKey)
    {
        $expireTime = TimeHelper::YEAR;
        $this->setResponseHeaderCache($expireTime, $eTag, $lastModified);

        if (!$this->isModified($eTag, $lastModified)) {
            Yii::$app->response->statusCode = 304; //HTTP_NOT_MODIFIED;

            return '';
        }

        Yii::$app->response->format = Response::FORMAT_RAW;
        Yii::$app->response->headers->add('Content-Type', $mimeType);

        return Yii::$app->resourceManager->read($storageKey);
    }

    protected function isModified($eTag, $modifyTime)
    {
        $eTags = Yii::$app->request->getETags();

        if (in_array($eTag, $eTags)) {
            return false;
        }

        return !(isset($_SERVER['HTTP_IF_MODIFIED_SINCE']) &&
            strtotime($_SERVER['HTTP_IF_MODIFIED_SINCE']) >= $modifyTime);
    }

    protected function setResponseHeaderCache($expireTime, $eTag, $lastModified)
    {
        Yii::$app->response->headers->add('Expires', gmdate('D, j M Y H:i:s T', time() + $expireTime));
        Yii::$app->response->headers->add('ETag', $eTag);
        Yii::$app->response->headers->add('Cache-Control', "max-age={$expireTime}, must-revalidate");
        Yii::$app->response->headers->add('Last-Modified', gmdate('D, j M Y H:i:s', $lastModified) . ' GMT');
    }

}
