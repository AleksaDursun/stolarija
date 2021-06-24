<?php

namespace common\components\flash;

use Yii;
use yii\web\View;
use yii\base\Widget;
use yii\helpers\Json;

abstract class FlashBaseWidget extends Widget
{
    const FLASH_SUCCESS = 'success';
    const FLASH_ERROR = 'error';
    const FLASH_INFO = 'info';
    const FLASH_WARNING = 'warning';

    /**
     * Flash category used for different types of flashes.
     *
     * @var string
     */
    public $category = Flash::DEFAULT_CATEGORY;

    /**
     * Plugin options
     *
     * @var array
     */
    public $clientOptions;

    public $clientOptionsJs;
    public $js;

    public function run()
    {
        $this->registerAssets();
        $this->registerJs();

        parent::run();
    }

    abstract protected function setJs($type, $message);
    abstract protected function setClientOptionsJs($clientOptionsJson);
    abstract protected function registerAsset();

    public function registerJs() {
        foreach (Yii::$app->flash->getAllByCategory($this->category) as $type => $message) {
            if (in_array($type, array_keys(static::getAlertTypes()))) {
                $message = is_array($message) ? current($message) : $message;
                $type = static::getAlertTypes()[$type];
                $this->setJs($type, $message);
            }
        }
        $this->js = $this->wrapJsWithIIFE($this->js);
        $this->view->registerJs($this->js, View::POS_READY, md5($this->js));

    }

    public function registerAssets() {
        $this->registerAsset();

        if (isset($this->clientOptions)) {
            $clientOptionsJson = Json::encode($this->clientOptions);
            $this->setClientOptionsJs($clientOptionsJson);
        }

        if (isset($this->clientOptionsJs)) {
            $this->clientOptionsJs = $this->wrapJsWithIIFE($this->clientOptionsJs);
            $this->view->registerJs($this->clientOptionsJs, View::POS_READY, md5($this->clientOptionsJs));
        }
    }

    public function wrapJsWithIIFE($js) {
        return ';(function () {' . $js . '})();';
    }

    public static function getAlertTypes()
    {
        return [
            static::FLASH_ERROR   => 'error',
            static::FLASH_SUCCESS => 'success',
            static::FLASH_INFO    => 'info',
            static::FLASH_WARNING => 'warning'
        ];
    }
}
