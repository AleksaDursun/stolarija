<?php

namespace common\components\flash;

use yii\base\Component;
use yii\di\Instance;
use yii\web\Session;
use yii\base\InvalidConfigException;

class Flash extends Component
{
    const DEFAULT_CATEGORY = 'default';

    const DEFAULT_FLASH_TYPE = 'success';

    const FLASH_SUCESS = 'success';
    const FLASH_ERROR = 'error';
    const FLASH_INFO = 'info';
    const FLASH_WARNING = 'warning';

    /**
     * Flash category used for different types of flashes.
     *
     * @var string|Session
     */
    public $category = self::DEFAULT_CATEGORY;

    /**
     * Session component which will be used.
     *
     * @var string|Session
     */
    public $session = 'yii\web\Session';

    /**
     * @throws InvalidConfigException
     */
    public function init()
    {
        parent::init();
        $this->session = Instance::ensure($this->session, 'yii\web\Session');
    }

    /**
     * Return flashes from provided category
     * @param string $category
     * @return array
     */
    public function getAllByCategory($category = self::DEFAULT_CATEGORY)
    {
        $flashes = $this->session->getAllFlashes();

        $flashesByCategory = [];

        foreach ($flashes as $key => $value) {
            if (stripos($key, $category) !== false) {
                $key = str_replace($category . '_', '', $key);
                $flashesByCategory[$key] = $value;
            }
        }

        return $flashesByCategory;
    }

    /**
     * @param $message
     * @param string $type
     * @param string $category
     * @param bool $removeAfterAccess
     */
    public function add($message, $type = self::DEFAULT_FLASH_TYPE, $category = self::DEFAULT_CATEGORY, $removeAfterAccess = true)
    {
        $this->session->setFlash($category . '_' . $type, $message, $removeAfterAccess);
    }

    /**
     * @param $message
     * @param string $category
     * @param bool $removeAfterAccess
     */
    public function success($message, $category = self::DEFAULT_CATEGORY, $removeAfterAccess = true)
    {
        $this->add($message, self::FLASH_SUCESS, $category, $removeAfterAccess);
    }

    /**
     * @param $message
     * @param string $category
     * @param bool $removeAfterAccess
     */
    public function error($message, $category = self::DEFAULT_CATEGORY, $removeAfterAccess = true)
    {
        $this->add($message, self::FLASH_ERROR, $category, $removeAfterAccess);
    }

    /**
     * @param $message
     * @param string $category
     * @param bool $removeAfterAccess
     */
    public function info($message, $category = self::DEFAULT_CATEGORY, $removeAfterAccess = true)
    {
        $this->add($message, self::FLASH_INFO, $category, $removeAfterAccess);
    }

    /**
     * @param $message
     * @param string $category
     * @param bool $removeAfterAccess
     */
    public function warning($message, $category = self::DEFAULT_CATEGORY, $removeAfterAccess = true)
    {
        $this->add($message, self::FLASH_WARNING, $category, $removeAfterAccess);
    }
}
