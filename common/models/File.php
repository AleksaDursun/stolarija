<?php

namespace common\models;

use common\components\behaviors\FileBehavior;
use common\components\orm\ActiveRecord;
use common\helpers\ArrayHelper;
use common\helpers\FileHelper;
use Yii;
use yii\db\Exception;
use yii\helpers\Url;
use yii\web\HttpException;
use yii\web\UploadedFile;

/**
 * This is the model class for table "file".
 *
 * @property int $id
 * @property int $image_id
 * @property string $original_name
 * @property string $mime_type
 * @property string $storage_type
 * @property string $storage_key
 * @property int $size
 * @property int $created_at
 * @property int $created_by
 * @property int $updated_at
 * @property int $updated_by
 * @property int $is_deleted
 *
 * @property Image[] $images
 */
class File extends ActiveRecord
{
    const SCENARIO_FILE_UPLOAD = 'scenario_file_upload';

    public $file;

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'file';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id'], 'unique'],
            [['id', 'image_id', 'size', 'created_at', 'created_by', 'updated_at', 'updated_by', 'is_deleted'], 'integer'],
            [['original_name', 'storage_key'], 'string', 'max' => 255],
            [['mime_type', 'storage_type'], 'string', 'max' => 45],
            [['file'], 'validateFile', 'skipOnEmpty' => false, 'except' => static::SCENARIO_UPDATE],
        ];
    }

    public function validateFile($attribute)
    {
        if (!empty($this->file)) {
            return true;
        }

        $file = UploadedFile::getInstance($this, $attribute);

        if (empty($file)) {
            $this->addError($attribute, 'File can not be empty!');
            return false;
        }

        return true;
    }

    public function scenarios()
    {
        return array_merge(parent::scenarios(), [
            self::SCENARIO_FILE_UPLOAD => ['*']
        ]);
    }


    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'image_id' => 'Image',
            'original_name' => 'Original Name',
            'mime_type' => 'Mime Type',
            'storage_type' => 'Storage Type',
            'storage_key' => 'Storage Key',
            'size' => 'Size',
            'created_at' => 'Created At',
            'created_by' => 'Created By',
            'updated_at' => 'Updated At',
            'updated_by' => 'Updated By',
            'is_deleted' => 'Is Deleted',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getThumbImage()
    {
        return $this->hasOne(Image::class, ['id' => 'image_id']);
    }

    public function getImage()
    {
        return $this->hasOne(Image::class, ['id' => 'image_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getImages()
    {
        return $this->hasMany(Image::class, ['file_id' => 'id']);
    }

    public function getProduct()
    {
        return $this->hasMany(Product::class, ['image_id' => 'id']);
    }

    public function save($runValidation = true, $attributeNames = null)
    {


        $this->original_name = $this->file->name;
        $this->size = $this->file->size;
        $this->mime_type = $this->file->type;
        $this->storage_type = "local";


        if (!parent::save($runValidation, $attributeNames)) {
            throw new Exception('Unable to update model.<br>' . implode('<br>', $this->getFirstErrors()));
        }


        if(!$this->file->saveAs('../../backend/web/uploads/' . $this->id . '.' . $this->file->extension)){
            return false;
        }


        $this->storage_key = $this->id . '.' . $this->file->extension;
        $this->updateAttributes(['storage_key']);

        return true;
    }

    public function getIsImage()
    {
        return FileHelper::getIsImageByMimeType($this->mime_type);
    }

    public function getUrl($getForFrontend = false)
    {
        if ($getForFrontend) {
            return  Url::to(Yii::$app->params['backend.baseUri'] . '/uploads/' . $this->storage_key); //ToDO: Real address;
        }

        return  Url::base(true) . '/uploads/' . $this->storage_key;
    }



    public function getLocalFilePath()
    {
        return '../../backend/web/uploads/' .  $this->storage_key;
    }


    private function createImageRecord()
    {
        $image = Image::findOne($this->image_id);

        if (empty($image)) {
            $image = new Image();
        }

        $imageSize = getimagesize($this->getLocalFilePath());
        $image->width = $imageSize[0];
        $image->height = $imageSize[1];
        $image->size = $this->size;
        $image->mime_type = $this->mime_type;
        $image->original_name = $this->original_name;
        $image->storage_key = $this->storage_key;
        $image->storage_type = $this->storage_type;

        if (!$image->save()) {
            throw new HttpException(500, "Sorry, we weren't able to create thumb image for this file.");
        }

        $this->image_id = $image->id;
    }

}
