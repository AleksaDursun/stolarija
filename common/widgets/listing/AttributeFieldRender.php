<?php
/*
 * Nikola Kukric <info@singularity-solution.com>
 * Company: Singularity Solution <https://singularity-solution.com>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace common\widgets\listing;


use common\components\orm\ActiveRecord;
use common\helpers\ArrayHelper;
use common\helpers\TreeHelper;
use common\models\Attribute;
use common\models\AttributeValue;
use common\models\CategoryAttribute;
use Yii;
use yii\bootstrap4\ActiveField;
use yii\helpers\Html;
use yii\widgets\ActiveForm;
use yii\widgets\InputWidget;

/**
 * Class AttributeFieldRender
 * @package common\widgets
 *
 * @property ActiveForm $form
 * @property ActiveRecord $model
 * @property string $attribute
 * @property array $listData
 * @property array $listOptions
 * @property array $fieldConfig
 * @property array $wrapperOptions
 * @property CategoryAttribute $attributeField
 */
class AttributeFieldRender extends InputWidget
{
    public $wrapperOptions = [];

    public $fieldConfig = [];

    public $attributeField;

    public $form;

    protected $listData = [];

    protected $listOptions = [];

    public function init()
    {
        if ($this->attributeField->column_size) {
            $this->wrapperOptions['class'] = $this->attributeField->column_size;
        }

        Html::addCssClass($this->wrapperOptions, 'attribute-item');

        $this->fieldConfig = ArrayHelper::merge([
            'labelOptions' => ['class' => 'col-12 col-form-label form-control-label'],
            'template' => '<div class="row">{label}<div class="col-12">{input}{error}</div></div>',
        ], $this->fieldConfig);

        $this->initListConfig();

        parent::init();
    }

    /**
     * Runs the widget.
     */
    public function run()
    {
        return Html::tag('div', $this->getInputField(), $this->wrapperOptions);
    }

    protected function initListConfig()
    {
        $listOptions = [];
        $attributeModel = $this->attributeField->attributeModel;

        if ($attributeModel->getIsEnumInputType()) {
            $attributeValues = $attributeModel->attributeValues;
            $this->listData = TreeHelper::getFlatArrayFrom($attributeValues);

            foreach ($attributeValues as $attributeValue) {
                $listOptions[$attributeValue->id] = [
                    'data-id' => $attributeValue->id,
                    'data-model' => $attributeModel->id,
                    'data-scope' => $attributeValue->scope_id,
                    'data-parent' => $attributeValue->parent_id,
                ];
            }
        }

        $this->listOptions = $listOptions;
    }

    protected function getAttributeValue()
    {
        $attributeModel = $this->attributeField->attributeModel;
        $listingAttribute = $this->attributeField->listingAttribute;

        if ($listingAttribute) {
            return $attributeModel->getIsEnumInputType() ?
                explode(AttributeValue::ENUM_DELIMITER, $listingAttribute->value) :
                $listingAttribute->value;
        }

        return $attributeModel->getIsEnumInputType() ? $attributeModel->getAttributeValues()
            ->select('id')
            ->where(['is_selected' => 1])
            ->column() : '';
    }

    protected function getLabelText(): string
    {
        return Yii::t('app-listing', $this->attributeField->getLabelText());
    }

    protected function getInputField()
    {
        $attributeModel = $this->attributeField->attributeModel;

        switch ($attributeModel->input_type) {
            case Attribute::INPUT_TYPE_TEXT_AREA:
                $field = $this->getTextareaField();
                break;
            case Attribute::INPUT_TYPE_CHECKBOX:
                $field = $this->getCheckboxField();
                break;
            case Attribute::INPUT_TYPE_SELECT_LIST:
                $field = $this->getDropdownListField();
                break;
            case Attribute::INPUT_TYPE_RADIO_LIST:
                $field = $this->getRadioListField();
                break;
            case Attribute::INPUT_TYPE_CHECKBOX_LIST:
                $field = $this->getCheckboxListField();
                break;
            case Attribute::INPUT_TYPE_TEXT_INPUT:
            case Attribute::INPUT_TYPE_CURRENCY_INPUT:
            case Attribute::INPUT_TYPE_SWITCHERY:
            case Attribute::INPUT_TYPE_RANGE:
            default:
                $field = $this->getTextInputField();
                break;
        }

        if ($attributeModel->input_type != Attribute::INPUT_TYPE_CHECKBOX) {
            $field->label($this->getLabelText());
        }

        return $field;
    }

    private function getCheckboxField()
    {
        $value = $this->getAttributeValue();
        $attributeModel = $this->attributeField->attributeModel;
        $checkboxId = $attributeModel->key . $attributeModel->id;
        $placeholder = $this->attributeField->placeholder ?: $attributeModel->placeholder ?: $this->attributeField->label ?: $attributeModel->name;

        $checkboxOptions = array_merge([
            'id' => $checkboxId,
            'class' => 'form-check-input custom-control-input',
            'data-model' => $attributeModel->id,
            'data-scope-model' => $attributeModel->scope_id,
        ]);

        $inputName = Html::getInputName($this->model, $this->attribute);

        return
            Html::label($this->attributeField->getLabelText(), null, ['class' => 'col-form-label form-control-label']) .
            Html::beginTag('div', ['class' => ['form-check custom-control custom-checkbox']]) . "\n" .
            Html::hiddenInput($inputName, 0) . "\n" .
            Html::checkbox($inputName, !empty($value), $checkboxOptions) . "\n" .
            Html::label(Html::encode($placeholder), $checkboxId, ['class' => 'form-check-label custom-control-label']) .
            Html::endTag('div') . "\n";
    }

    private function getTextareaField()
    {
        $value = $this->getAttributeValue();
        $attributeModel = $this->attributeField->attributeModel;

        return $this->createActiveField()->textarea([
            'value' => $value,
            'placeholder' => $this->attributeField->placeholder,
            'data-model' => $attributeModel->id,
            'data-scope-model' => $attributeModel->scope_id,
        ]);
    }

    private function getDropdownListField()
    {
        $value = $this->getAttributeValue();
        $attributeModel = $this->attributeField->attributeModel;
        $placeholder = $this->attributeField->placeholder ?: $attributeModel->placeholder ?: $this->attributeField->label ?: $attributeModel->name;

        return $field = $this->createActiveField()->dropDownList($this->listData, [
            'value' => $value,
            'options' => $this->listOptions,
            'encode' => false,
            'encodeSpaces' => true,
            'prompt' => '- ' . Yii::t('app-category', $placeholder) . ' -',
            'data-model' => $attributeModel->id,
            'data-scope-model' => $attributeModel->scope_id,
        ]);
    }

    private function getRadioListField()
    {
        $value = $this->getAttributeValue();
        $attributeModel = $this->attributeField->attributeModel;

        return $this->createActiveField()->radioList($this->listData, [
            'value' => $value,
            'class' => 'list-container',
            'data-scope-model' => $attributeModel->scope_id,
            'item' => function ($index, $label, $name, $checked, $checkboxValue) use ($value) {

                $radioId = $name . $checkboxValue;
                $itemOptions = array_merge([
                    'id' => $radioId,
                    'class' => 'form-check-input custom-control-input',
                    'value' => $checkboxValue
                ], ArrayHelper::getValue($this->listOptions, $checkboxValue, []));

                return
                    Html::beginTag('div', ['class' => ['form-check custom-control custom-radio']]) . "\n" .
                    Html::radio($name, in_array($checkboxValue, $value), $itemOptions) . "\n" .
                    Html::label(Html::encode($label), $radioId, ['class' => 'form-check-label custom-control-label']) .
                    Html::endTag('div') . "\n";
            }
        ]);
    }

    private function getCheckboxListField()
    {
        $value = $this->getAttributeValue();
        $attributeModel = $this->attributeField->attributeModel;

        return $this->createActiveField()->checkboxList($this->listData, [
            'value' => $value,
            'class' => 'list-container',
            'data-scope-model' => $attributeModel->scope_id,
            'item' => function ($index, $label, $name, $checked, $checkboxValue) use ($value) {

                $checkboxId = $name . $checkboxValue;
                $itemOptions = array_merge([
                    'id' => $checkboxId,
                    'class' => 'form-check-input custom-control-input',
                    'value' => $checkboxValue
                ], ArrayHelper::getValue($this->listOptions, $checkboxValue, []));

                return
                    Html::beginTag('div', ['class' => ['form-check custom-control custom-checkbox']]) . "\n" .
                    Html::checkbox($name, in_array($checkboxValue, $value), $itemOptions) . "\n" .
                    Html::label(Html::encode($label), $checkboxId, ['class' => 'form-check-label custom-control-label']) .
                    Html::endTag('div') . "\n";
            }
        ]);
    }

    private function getTextInputField()
    {
        $value = $this->getAttributeValue();
        $attributeModel = $this->attributeField->attributeModel;

        return $this->createActiveField()->textInput([
            'placeholder' => $this->attributeField->placeholder,
            'value' => $value,
            'data-model' => $attributeModel->id,
            'data-scope-model' => $attributeModel->scope_id,
        ]);
    }

    /**
     * @return ActiveField
     *
     * @throws \yii\base\InvalidConfigException
     */
    protected function createActiveField(): ActiveField
    {
        return Yii::createObject(ArrayHelper::merge($this->fieldConfig, [
            'class' => ActiveField::class,
            'model' => $this->model,
            'attribute' => $this->attribute,
            'form' => $this->form,
        ]));
    }

}
