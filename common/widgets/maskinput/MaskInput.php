<?php


namespace common\widgets\maskinput;

use common\helpers\ArrayHelper;
use common\widgets\listinggallery\ListingGalleryAsset;
use Yii;
use yii\bootstrap4\Html;
use yii\helpers\Inflector;
use yii\helpers\Json;
use yii\widgets\InputWidget;

class MaskInput extends InputWidget
{
    public $icon = '<i class="fal fa-dollar-sign"></i>';

    public $clientOptions = [];

    public $prefixed = false;

    public function run()
    {
        $this->registerJs();

        Html::addCssClass($this->options, 'form-control');
        $this->options['id'] = isset($this->options['id']) ? $this->options['id'] : "{$this->getId()}-input";

        $input = $this->hasModel()
            ? Html::activeTextInput($this->model, $this->attribute, $this->options)
            : Html::textInput($this->name, $this->value, $this->options);

        $addon = Html::a($this->icon, 'javascript:void(0)', ['class' => 'btn ml-2 btn-sm btn-link btn-just-icon']);
        $input = $this->prefixed ? $addon . $input : $input . $addon;

        return Html::tag('div', $input, ['class' => 'input-group']);
    }

    private function registerJs()
    {
        if (empty($this->clientOptions)) {
            return;
        }

        $jsVar = Inflector::variablize($this->options['id']);
        $options = Json::encode($this->clientOptions);

        $view = $this->getView();
        MaskInputAssets::register($view);

        $view->registerJs("
            var {$jsVar} = IMask(document.getElementById('{$this->options['id']}'), {$options});
        ");
    }
}