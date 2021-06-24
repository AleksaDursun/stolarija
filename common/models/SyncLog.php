<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "sync_log".
 *
 * @property int $id
 * @property string|null $command
 * @property int|null $run_time
 * @property int|null $updated_items
 * @property int|null $created_new_items
 * @property string $status
 * @property string|null $exception
 */
class SyncLog extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'sync_log';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['run_time', 'updated_items', 'created_new_items'], 'integer'],
            [['exception'], 'string'],
            [['command', 'status'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'command' => 'Command',
            'run_time' => 'Run Time',
            'updated_items' => 'Updated Items',
            'created_new_items' => 'Created New Items',
            'status' => 'Status',
            'exception' => 'Exception',
        ];
    }
}
