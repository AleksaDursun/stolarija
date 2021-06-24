<?php

namespace common\components\settings;

use common\models\Settings;
use common\helpers\ArrayHelper;
use Yii;
use yii\base\Component;

class SettingsComponent extends Component
{
    /**
     * @var array preload cached values
     */
    public $cache = array();

    /**
     * @var Settings model name for setting value
     */
    public $modelClass = '\common\models\Settings';

    /**
     * Get application setting
     *
     * @param $name
     * @param mixed|null $defaultValue
     * @param bool $cached
     * @return mixed|null
     */
    public function get($name, $defaultValue = null, $cached = true)
    {
        $modelClass = $this->modelClass;

        if ($cached) {
            $cachedValue = $this->getFromCache($name);
            if (!empty($cachedValue)) {
                return $cachedValue;
            }
        }

        $value = $modelClass::get($name, $defaultValue);
        if ($value !== null) {
            $this->saveToCache($name, $value);
            return $value;
        }
        return $defaultValue;
    }

    public function getArrayValue($arraySettingKey, $index, $defaultValue = null, $cached = true)
    {
        return ArrayHelper::getValue($this->get($arraySettingKey, null, $cached), $index, $defaultValue);
    }

    /**
     * Set application setting
     *
     * @param mixed $name
     * @param mixed $value
     * @throws \Exception
     */
    public function set($name, $value)
    {
        $modelClass = $this->modelClass;

        $this->saveToCache($name, $value);
        $modelClass::set($name, $value);
    }

    /**
     * Get application setting from cache
     *
     * @param string $name
     * @return mixed
     */
    private function getFromCache($name)
    {
        if (!empty($this->cache[$name])) {
            return $this->cache[$name];
        }

        return Yii::$app->cache->get($name);
    }

    /**
     * Save application setting to cache
     *
     * @param string $name
     * @param mixed $value
     */
    private function saveToCache($name, $value)
    {
        $this->cache[$name] = $value;
        Yii::$app->cache->set($name, $value);
    }
}