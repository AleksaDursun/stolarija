<?php

namespace common\models;

use common\components\orm\ActiveRecord;
use Yii;
use yii\helpers\Json;

/**
 * This is the model class for table "settings".
 *
 * @property integer $id
 * @property string $key
 * @property string $value
 * @property integer $created_at
 * @property integer $create_id
 * @property integer $updated_at
 * @property integer $update_id
 * @property integer $is_deleted
 */
class Settings extends ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'settings';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['key', 'value'], 'required'],
            [['value'], 'string'],
            [['created_at', 'created_by', 'updated_at', 'updated_by', 'is_deleted'], 'integer'],
            [['key'], 'string', 'max' => 255],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'key' => 'Key',
            'value' => 'Value',
            'created_at' => 'Created At',
            'create_id' => 'Create ID',
            'updated_at' => 'Updated At',
            'update_id' => 'Update ID',
            'is_deleted' => 'Is Deleted',
        ];
    }

    /**
     * @param $key
     * @return Settings|null
     */
    public static function findByKey($key)
    {
        return static::findOne(['key' => $key]);
    }

    /**
     * Get param value
     *
     * @param string $name
     * @param mixed $default
     * @return mixed
     */
    public static function get($name, $default = null)
    {
        $setting = static::findByKey($name);

        if (empty($setting)) {
            return $default;
        }

        $value = Json::decode($setting->value);
        return $value !== false ? $value : $setting->value;
    }

    /**
     * Set param value
     *
     * @param string $name
     * @param mixed $value
     * @throws \Exception
     */
    public static function set($name, $value)
    {
        $setting = static::findByKey($name);

        if (empty($setting)) {
            $setting = new Settings();
            $setting->key = $name;
        }

        $setting->value = Json::encode($value);

        if (!$setting->save()) {
            throw new \Exception("Setting was not saved.\n" . print_r($setting->getErrors(), true));
        }
    }
}
