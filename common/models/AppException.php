<?php

namespace common\models;

use common\components\orm\ActiveRecord;
use Yii;

/**
 * This is the model class for table "exception".
 *
 * @property int $id
 * @property int $model_id
 * @property string $model_name
 * @property string $name
 * @property string $message
 * @property string $status handeled/in process/no need for handling
 * @property int $is_resolved
 * @property int $created_at
 * @property int $created_by
 * @property int $updated_at
 * @property int $updated_by
 * @property int $is_deleted
 */
class AppException extends ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'exception';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['model_id', 'model_name', 'status'], 'required'],
            [['model_id', 'is_resolved', 'created_at', 'created_by', 'updated_at', 'updated_by', 'is_deleted'], 'integer'],
            [['message'], 'string'],
            [['model_name', 'name', 'status'], 'string', 'max' => 45],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'model_id' => 'Model ID',
            'model_name' => 'Model Name',
            'name' => 'Name',
            'message' => 'Message',
            'status' => 'Status',
            'is_resolved' => 'Is Resolved',
            'created_at' => 'Created At',
            'created_by' => 'Created By',
            'updated_at' => 'Updated At',
            'updated_by' => 'Updated By',
            'is_deleted' => 'Is Deleted',
        ];
    }
}
