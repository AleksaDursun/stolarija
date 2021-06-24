<?php
/*
 * Nikola Kukric <info@singularity-solution.com>
 * Company: Singularity Solution <https://singularity-solution.com>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace common\widgets\categorysearch;

use common\helpers\ArrayHelper;
use common\helpers\TreeHelper;
use common\models\Attribute;
use common\models\AttributeValue;
use common\models\CategoryAttribute;
use common\models\Listing;
use common\models\ListingSearchForm;
use common\models\search\Search;
use common\widgets\listing\AttributeFieldsRenderAssets;
use Yii;
use yii\base\Widget;
use yii\helpers\Html;
use yii\helpers\Inflector;
use yii\helpers\Json;
use yii\jui\Slider;
use yii\jui\SliderInput;
use yii\web\JsExpression;

/**
 * Class AttributeValueRenderer
 *
 * @property CategoryAttribute[] $categoryAttributes
 * @property Search $model
 * @property bool $hasAdSeparator
 */
class SearchForm extends Widget
{
    public $model;

    public $attributeContainerClass = 'attribute-container';

    public $hasAdSeparator = true;

    /**
     * Runs the widget.
     */
    public function run()
    {
        $this->registerJs();

        return $this->render('search-form', [
            'model' => $this->model,
            'hasAdSeparator' => $this->hasAdSeparator,
            'resultMainAttributes' => $this->model->getSearchResultAttributes(true),
            'resultOtherAttributes' => $this->model->getSearchResultAttributes(false)
        ]);
    }

    protected function registerJs()
    {
        $js = [];
        $view = $this->getView();
        $formId = $this->model->getFormId();
        $options = Json::encode([
            'attributeContainerSelector' => "#{$formId}",
            'attributeItemSelector' => ".{$this->attributeContainerClass}",
        ]);

        AttributeFieldsRenderAssets::register($view);
        $jsVar = Inflector::variablize("main-filter-fields-{$this->getId()}");

        $js[] = "(function ($) {";
        $js[] = "var {$jsVar} = new AttributeFieldsRender({$options});";
        $js[] = "{$jsVar}.initListeners();";
        $js[] = "})(jQuery);";

        $view->registerJs(implode("\n", $js));
    }

    public function renderFilterAttribute(CategoryAttribute $categoryAttribute)
    {
        $filterType = $categoryAttribute->getFilterType();

        $input = '';
        $attributeContainerOptions = ['class' => ''];
        Html::addCssClass($attributeContainerOptions, $this->attributeContainerClass);

        switch ($filterType) {
            case Attribute::INPUT_TYPE_TEXT_INPUT:
                $input = $this->getTextInputFor($categoryAttribute);
                break;
            case Attribute::INPUT_TYPE_TEXT_AREA:
                $input = $this->getTextareaInputFor($categoryAttribute);
                break;
            case Attribute::INPUT_TYPE_SELECT_LIST:
                $input = $this->getSelectListInputFor($categoryAttribute);
                break;
            case Attribute::INPUT_TYPE_RANGE:
                $input = $this->getRangeInputFor($categoryAttribute);
                break;
            case Attribute::INPUT_TYPE_CHECKBOX:
            case Attribute::INPUT_TYPE_SWITCHERY:
                $input = $this->getCheckboxInputFor($categoryAttribute);
                break;
            case Attribute::INPUT_TYPE_CHECKBOX_LIST:
                $input = $this->getCheckboxListInputFor($categoryAttribute);
                break;
            case Attribute::INPUT_TYPE_RADIO_LIST:
                $input = $this->getRadioListInputFor($categoryAttribute);
                break;
        }

        return Html::tag('div', $input, $attributeContainerOptions);
    }

    public function renderListingOfferTypeInput()
    {
        $key = 'listing-type';
        $value = is_array($this->getAttributeValueFor($key)) ? $this->getAttributeValueFor($key) : explode(AttributeValue::ENUM_DELIMITER, $this->getAttributeValueFor($key));

        return Html::checkboxList($key, $value, Listing::getListingTypeList(), [
            'value' => $value,
            'class' => 'listing-type-container row pl-3 mt-0 mt-lg-3',
            'item' => function ($index, $label, $name, $checked, $checkboxValue) use ($value) {

                $checkboxId = $name . $checkboxValue;
                $itemOptions = [
                    'id' => $checkboxId,
                    'class' => 'form-check-input custom-control-input',
                    'value' => $checkboxValue
                ];

                return
                    Html::beginTag('div', ['class' => ['col-auto form-check custom-control custom-checkbox']]) . "\n" .
                    Html::checkbox($name, in_array($checkboxValue, $value), $itemOptions) . "\n" .
                    Html::label(Html::encode($label), $checkboxId, ['class' => 'form-check-label custom-control-label']) .
                    Html::endTag('div') . "\n";
            }
        ]);
    }

    public function renderPriceInput()
    {
        $id = "price-slider";
        $slider = Slider::widget(['id' => $id, 'clientOptions' => [
            'range' => true,
            'step' => 100,
            'max' => 100000,
            'slide' => new JsExpression("function(event, ui){
                        for (var i = 0; i < ui.values.length; ++i) {
                            $('#{$id}').closest('.custom-slider-container').find('input.sliderValue[data-index=' + i + ']').val(ui.values[i]);
                        }
                    }"
            )
        ]]);

        $rangeFrom = Html::textInput("price-from", $this->getAttributeValueFor("price-from"), [
            'class' => 'form-control sliderValue',
            'data-slider' => $id,
            'data-index' => '0',
            'placeholder' => Yii::t('app-category', 'Min Price')
        ]);

        $rangeTo = Html::textInput("price-to", $this->getAttributeValueFor("price-to"), [
            'class' => 'form-control sliderValue',
            'data-slider' => $id,
            'data-index' => '1',
            'placeholder' => Yii::t('app-category', 'Max Price')
        ]);

        return "<div class='custom-slider-container p-0'>
                    {$slider}
                   <div class='row'>
                        <div class='col-6 pr-md-2'>{$rangeFrom}</div>
                        <div class='col-6 pl-md-2'>{$rangeTo}</div>
                   </div>
                </div>";
    }

    public function renderDistanceInput()
    {
        $id = "distanceSlider";
        $slider = Slider::widget(['id' => $id, 'clientOptions' => [
            'range' => false,
            'step' => 1,
            'max' => 1000,
            'slide' => new JsExpression("function(event, ui) {
                $('#{$id}').closest('.custom-slider-container').find('input.sliderValue').val(ui.value);
            }")
        ]]);

        $zipcode = Html::textInput("zipcode", $this->getAttributeValueFor("zipcode"), [
            'class' => 'form-control',
            'size' => 5,
            'maxlength' => 5,
            'placeholder' => Yii::t('app-category', 'Zipcode')
        ]);

        $distance = Html::textInput("distance", $this->getAttributeValueFor("distance"), [
            'class' => 'form-control sliderValue',
            'data-slider' => $id,
            'placeholder' => Yii::t('app-category', 'Distance (mi)')
        ]);

        return "<div class='custom-slider-container p-0'>
                   {$slider}
                   <div class='row'>
                        <div class='col-6 pr-md-2'>{$zipcode}</div>
                        <div class='col-6 pl-md-2'>{$distance}</div>
                   </div>
                </div>";
    }

    private function getTextInputFor(CategoryAttribute $categoryAttribute)
    {
        $attribute = $categoryAttribute->attributeModel;
        $value = $this->getAttributeValueFor($attribute->key);
        $placeholder = $categoryAttribute->placeholder ?: $attribute->placeholder ?: $categoryAttribute->label ?: $attribute->name;

        return Html::textInput($attribute->key, $value, [
                'class' => 'form-control',
                'placeholder' => $placeholder
            ]);
    }

    private function getTextareaInputFor(CategoryAttribute $categoryAttribute)
    {
        $attribute = $categoryAttribute->attributeModel;
        $value = $this->getAttributeValueFor($attribute->key);
        $placeholder = $categoryAttribute->placeholder ?: $attribute->placeholder ?: $categoryAttribute->label ?: $attribute->name;

        return Html::textarea($attribute->key, $value, [
                'class' => 'form-control',
                'placeholder' => $placeholder
            ]);
    }

    private function getSelectListInputFor(CategoryAttribute $categoryAttribute)
    {
        $attribute = $categoryAttribute->attributeModel;
        $enumConfig = $this->getListConfigFor($attribute);
        $value = $this->getAttributeValueFor($attribute->key);
        $placeholder = $categoryAttribute->placeholder ?: $attribute->placeholder ?: $categoryAttribute->label ?: $attribute->name;
        $prompt = "- " . Yii::t('app-category-placeholder', $categoryAttribute->is_in_filter ? $placeholder : 'Any') . " -";

        return Html::dropDownList($attribute->key, $value, $enumConfig['listData'], [
                'value' => $value,
                'options' => $enumConfig['listOptions'],
                'encode' => false,
                'encodeSpaces' => true,
                'data-model' => $attribute->id,
                'data-scope-model' => $attribute->scope_id,
                'prompt' => $prompt,
                'class' => 'form-control custom-select',
            ]);
    }

    private function getRangeInputFor(CategoryAttribute $categoryAttribute)
    {
        $attribute = $categoryAttribute->attributeModel;
        $id = "{$attribute->key}-slider";

        if ($categoryAttribute->is_in_filter) {
            $columnOptions = Json::decode($categoryAttribute->column_options, true);
            $defaultOptions = [
                'range' => true,
                'step' => 1,
                'slide' => new JsExpression("function(event, ui){
                        for (var i = 0; i < ui.values.length; ++i) {
                            $('#{$id}').closest('.custom-slider-container').find('input.sliderValue[data-index=' + i + ']').val(ui.values[i]);
                        }
                    }"
                )
            ];
            $clientOptions = ArrayHelper::merge($defaultOptions, ArrayHelper::getValue($columnOptions, 'range', []));

            $slider = Slider::widget(['id' => $id, 'clientOptions' => $clientOptions]);

            $rangeFrom = Html::textInput("{$attribute->key}-from", $this->getAttributeValueFor("{$attribute->key}-from"), [
                'class' => 'form-control sliderValue',
                'data-slider' => $id,
                'data-index' => '0',
                'placeholder' => Yii::t('app-category', 'Min')
            ]);

            $rangeTo = Html::textInput("{$attribute->key}-to", $this->getAttributeValueFor("{$attribute->key}-to"), [
                'class' => 'form-control sliderValue',
                'data-slider' => $id,
                'data-index' => '1',
                'placeholder' => Yii::t('app-category', 'Max')
            ]);
        } else {
            $slider = '';
            $toId = "{$attribute->key}-range-to";
            $fromId = "{$attribute->key}-range-from";

            $inputFrom = Html::textInput("{$attribute->key}-from", $this->getAttributeValueFor("{$attribute->key}-from"), [
                'class' => 'form-control',
                'id' => $fromId
            ]);

            $inputTo = Html::textInput("{$attribute->key}-to", $this->getAttributeValueFor("{$attribute->key}-to"), [
                'class' => 'form-control',
                'id' => $toId
            ]);

            $rangeTo = Html::label(Yii::t('app-category', 'To'), $toId) . $inputTo;
            $rangeFrom = Html::label(Yii::t('app-category', 'From'), $fromId) . $inputFrom;
        }

        return "<div class='custom-slider-container p-0'>
                    {$slider}
                   <div class='row'>
                        <div class='col-6 pr-md-2'>{$rangeFrom}</div>
                        <div class='col-6 pl-md-2'>{$rangeTo}</div>
                   </div>
                </div>";
    }

    private function getCheckboxListInputFor(CategoryAttribute $categoryAttribute)
    {
        $attribute = $categoryAttribute->attributeModel;
        $enumConfig = $this->getListConfigFor($attribute);
        $value = is_array($this->getAttributeValueFor($attribute->key)) ? $this->getAttributeValueFor($attribute->key) : explode(AttributeValue::ENUM_DELIMITER, $this->getAttributeValueFor($attribute->key));

        return Html::checkboxList($attribute->key, $value, $enumConfig['listData'], [
                'value' => $value,
                'class' => 'list-container',
                'data-scope-model' => $attribute->scope_id,
                'item' => function ($index, $label, $name, $checked, $checkboxValue) use ($enumConfig, $value) {

                    $checkboxId = $name . $checkboxValue;
                    $itemOptions = array_merge([
                        'id' => $checkboxId,
                        'class' => 'form-check-input custom-control-input',
                        'value' => $checkboxValue
                    ], ArrayHelper::getValue($enumConfig['listOptions'], $checkboxValue, []));

                    return
                        Html::beginTag('div', ['class' => ['form-check custom-control custom-checkbox']]) . "\n" .
                        Html::checkbox($name, in_array($checkboxValue, $value), $itemOptions) . "\n" .
                        Html::label(Html::encode($label), $checkboxId, ['class' => 'form-check-label custom-control-label']) .
                        Html::endTag('div') . "\n";
                }
            ]);
    }

    private function getCheckboxInputFor(CategoryAttribute $categoryAttribute)
    {
        $attribute = $categoryAttribute->attributeModel;
        $checkboxId = $attribute->key . $attribute->id;
        $value = $this->getAttributeValueFor($attribute->key);
        $placeholder = $categoryAttribute->placeholder ?: $attribute->placeholder ?: $categoryAttribute->label ?: $attribute->name;

        $checkboxOptions = array_merge([
            'id' => $checkboxId,
            'class' => 'form-check-input custom-control-input',
            'value' => $value,
            'data-model' => $attribute->id,
            'data-scope-model' => $attribute->scope_id,
        ]);

        return
            Html::beginTag('div', ['class' => ['form-check custom-control custom-checkbox']]) . "\n" .
            Html::checkbox($attribute->key, !empty($value), $checkboxOptions) . "\n" .
            Html::label(Html::encode($placeholder), $checkboxId, ['class' => 'form-check-label custom-control-label']) .
            Html::endTag('div') . "\n";
    }

    private function getRadioListInputFor(CategoryAttribute $categoryAttribute)
    {
        $attribute = $categoryAttribute->attributeModel;
        $enumConfig = $this->getListConfigFor($attribute);
        $value = $this->getAttributeValueFor($attribute->key);

        return Html::radioList($attribute->key, $value, $enumConfig['listData'], [
            'value' => $value,
            'class' => 'list-container',
            'data-scope-model' => $attribute->scope_id,
            'item' => function ($index, $label, $name, $checked, $checkboxValue) use ($value, $enumConfig) {

                $radioId = $name . $checkboxValue;
                $itemOptions = array_merge([
                    'id' => $radioId,
                    'class' => 'form-check-input custom-control-input',
                    'value' => $checkboxValue
                ], ArrayHelper::getValue($enumConfig['listOptions'], $checkboxValue, []));

                return
                    Html::beginTag('div', ['class' => ['form-check custom-control custom-radio']]) . "\n" .
                    Html::radio($name, $checkboxValue == $value, $itemOptions) . "\n" .
                    Html::label(Html::encode($label), $radioId, ['class' => 'form-check-label custom-control-label']) .
                    Html::endTag('div') . "\n";
            }
        ]);
    }

    private function getAttributeValueFor($key, $defaultValue = null)
    {
        return Yii::$app->request->get($key, $defaultValue);
    }

    private function getListConfigFor(Attribute $attributeModel)
    {
        $listData = [];
        $listOptions = [];

        if ($attributeModel->getIsEnumInputType()) {
            $attributeValues = $attributeModel->attributeValues;
            $listData = TreeHelper::getFlatArrayFrom($attributeValues);

            foreach ($attributeValues as $attributeValue) {
                $listOptions[$attributeValue->id] = [
                    'data-id' => $attributeValue->id,
                    'data-model' => $attributeModel->id,
                    'data-scope' => $attributeValue->scope_id,
                    'data-parent' => $attributeValue->parent_id,
                ];
            }
        }

        return ['listOptions' => $listOptions, 'listData' => $listData];
    }

}