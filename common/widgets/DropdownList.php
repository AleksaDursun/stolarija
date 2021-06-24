<?php

namespace common\widgets;

use common\helpers\ArrayHelper;
use yii\bootstrap4\InputWidget;
use yii\helpers\Html;

class DropdownList extends InputWidget
{
    public $items = [];
    /**
     * @inheritdoc
     */
    public function run()
    {
        $this->initOptions();

        if ($this->hasModel()) {
            $input = Html::activeDropDownList($this->model, $this->attribute, $this->items, $this->options);
        } else {
            $input = Html::dropDownList($this->name, $this->value, $this->items, $this->options);
        }

        $this->registerJs();

        return $input;
    }

    protected function initOptions()
    {
        $defaults = [
            'prompt' => ' ',
            'data-style' => 'select-with-transition',
            'data-none-selected-text' => '',
            'data-size' => 7,
            'data-width' => '100%'
        ];

        $this->options = ArrayHelper::merge($defaults, $this->options);
        $isFilled = $this->getElementValue() ? 'is-filled' : '';
        $this->field->options = ['class' => ['widget' => "form-group bmd-form-group {$isFilled}"]];

        Html::addCssClass($this->options, 'selectpicker');
    }

    protected function registerJs()
    {
        $js = [];
        $view = $this->getView();
        $id = $this->options['id'];

        $js[] = "$('#{$id}').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
                    if ($(this).val()) {
                        $(this).closest('.bmd-form-group').addClass('is-filled');
                    } else {
                        $(this).closest('.bmd-form-group').removeClass('is-filled');
                    }
                });";

        $view->registerJs(implode("\n", $js));
    }

    protected function getElementValue()
    {
        if ($this->hasModel()) {
            return Html::getAttributeValue($this->model, $this->attribute);
        }

        return $this->value;
    }
}