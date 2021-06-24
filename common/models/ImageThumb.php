<?php

namespace common\models;

use common\components\orm\ActiveRecord;
use Yii;

/**
 * This is the model class for table "image_thumb".
 *
 * @property int $id
 * @property int $image_id
 * @property string $spec_key
 * @property string $storage_type
 * @property string $storage_key
 * @property int $created_at
 * @property int $created_by
 * @property int $updated_at
 * @property int $updated_by
 * @property int $is_deleted
 *
 * @property Image $img
 */
class ImageThumb extends ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'image_thumb';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['image_id', 'spec_key', 'storage_type', 'storage_key'], 'required'],
            [['image_id', 'created_at', 'created_by', 'updated_at', 'updated_by', 'is_deleted'], 'integer'],
            [['spec_key', 'storage_type'], 'string', 'max' => 45],
            [['storage_key'], 'string', 'max' => 255],
            [['image_id'], 'exist', 'skipOnError' => true, 'targetClass' => Image::class, 'targetAttribute' => ['image_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'image_id' => 'Img ID',
            'spec_key' => 'Spec Key',
            'storage_type' => 'Storage Type',
            'storage_key' => 'Storage Key',
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
    public function getImg()
    {
        return $this->hasOne(Image::class, ['id' => 'img_id']);
    }

    /**
     * @return string url
     */
    public function getUrl()
    {
        return Yii::$app->resourceManager->getUrl($this->storage_key, Yii::$app->params['image.thumb.expire']);
    }
}
