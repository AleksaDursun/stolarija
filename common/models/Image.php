<?php

namespace common\models;

use common\components\image\ImageBehavior;
use common\components\orm\ActiveRecord;
use Yii;

/**
 * This is the model class for table "image".
 *
 * @property int $id
 * @property string $original_name
 * @property string $mime_type
 * @property int $size
 * @property string $storage_type
 * @property string $storage_key
 * @property int $height
 * @property int $width
 * @property int $created_at
 * @property int $created_by
 * @property int $updated_at
 * @property int $updated_by
 * @property int $is_deleted
 *
 * @property File $file
 * @property ImageThumb[] $imageThumbs
 * @property Profile[] $profiles
 */
class Image extends ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'image';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['original_name', 'mime_type', 'size', 'storage_type', 'storage_key'], 'required'],
            [['id', 'size', 'height', 'width', 'created_at', 'created_by', 'updated_at', 'updated_by', 'is_deleted'], 'integer'],
            [['original_name', 'storage_key'], 'string', 'max' => 255],
            [['mime_type', 'storage_type'], 'string', 'max' => 45],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'original_name' => 'Original Name',
            'mime_type' => 'Mime Type',
            'size' => 'Size',
            'storage_type' => 'Storage Type',
            'storage_key' => 'Storage Key',
            'height' => 'Height',
            'width' => 'Width',
            'created_at' => 'Created At',
            'created_by' => 'Created By',
            'updated_at' => 'Updated At',
            'updated_by' => 'Updated By',
            'is_deleted' => 'Is Deleted',
        ];
    }

    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return array_merge(parent::behaviors(), [
            'imageable' => [
                'class' => ImageBehavior::class
            ],
        ]);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getFile()
    {
        return $this->hasOne(File::class, ['image_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getImageThumbs()
    {
        return $this->hasMany(ImageThumb::class, ['img_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getProfiles()
    {
        return $this->hasMany(Profile::class, ['image_id' => 'id']);
    }

}
