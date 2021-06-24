<?php

namespace common\widgets\select2;

use common\helpers\ArrayHelper;
use common\helpers\HtmlHelper;
use yii\helpers\Json;
use yii\web\JsExpression;
use yii\web\View;

class Select2 extends \dosamigos\select2\Select2Bootstrap
{
    public $addon = '';
    public $wrapperOptions = [];

    public function init()
    {
        parent::init();

        HtmlHelper::addCssClass($this->options, 'd-none');

        $this->initTemplate();
        $this->initClientOptions();
        $this->initClientEvents();
    }

    /**
     * @inheritdoc
     */
    public function run()
    {
        $this->options['multiple'] = ArrayHelper::getValue($this->clientOptions, 'multiple');

        if ($this->hasModel()) {
            $input = HtmlHelper::activeDropDownList($this->model, $this->attribute, $this->items, $this->options);
        } else {
            $input = HtmlHelper::dropDownList($this->name, $this->value, $this->items, $this->options);
        }

        echo strtr($this->template, ['{input}' => $input]);

        $this->registerClientScript();
    }

    protected function initTemplate()
    {
        $isFilled = $this->getElementValue() ? 'is-filled' : '';
        $this->field->options = ArrayHelper::merge(['class' => ['widget' => "form-group bmd-form-group {$isFilled}"]], $this->wrapperOptions);
        $this->field->labelOptions = ['class' => 'bmd-label-floating'];

        if ($this->addon) {
            $this->template = "<div class='input-group no-border'>
                                <div class='form-control'>{input}</div>
                                {$this->addon}
                            </div>";
        } else {
            $this->template = "<div class='form-control'>{input}</div>";
        }
    }

    protected function initClientOptions()
    {
        if (empty($this->clientOptions['dropdownParent'])) {
            $elementId = Json::encode('#' . ($this->name ?: HtmlHelper::getInputId($this->model, $this->attribute)));
            $this->clientOptions['dropdownParent'] = new JsExpression("$({$elementId}).closest('.modal').length ? $({$elementId}).closest('.modal') : $(document.body)");
        }

        if ($this->clientOptions['dropdownParent'] == 'default') {
            unset($this->clientOptions['dropdownParent']);
        }

        if (empty($this->clientOptions['width'])) {
            $this->clientOptions['width'] = '100%';
        }
    }

    protected function initClientEvents()
    {
        $this->clientEvents = ArrayHelper::merge([
            'select2:opening' => new JsExpression("function(e) { 
                $(this).closest('.bmd-form-group').addClass('is-filled'); 
            }"),
            'select2:close' => new JsExpression("function(e) { 
                if (!$(this).val()) $(this).closest('.bmd-form-group').removeClass('is-filled');
            }"),
        ], $this->clientEvents);
    }

    protected function getElementValue()
    {
        if ($this->hasModel()) {
            return HtmlHelper::getAttributeValue($this->model, $this->attribute);
        }

        return $this->value;
    }

    /**
     * @inheritdoc
     */
    protected function registerBundle(View $view)
    {
        //Assets are minified in gulp
    }
}