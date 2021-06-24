<?php
/*
 * Nikola Kukric <info@singularity-solution.com>
 * Company: Singularity Solution <https://singularity-solution.com>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace common\widgets\listing;


use common\helpers\ArrayHelper;
use common\helpers\TreeHelper;
use common\models\Attribute;
use common\models\AttributeValue;
use common\models\CategoryAttribute;
use Yii;
use yii\bootstrap4\ActiveField;
use yii\helpers\Html;
use yii\helpers\Inflector;
use yii\helpers\Json;
use yii\widgets\ActiveForm;
use yii\widgets\InputWidget;

/**
 * Class AttributeFieldRender
 * @package common\widgets
 *
 * @property ActiveForm $form
 * @property array $model
 * @property string $attribute
 * @property array $listData
 * @property array $listOptions
 * @property array $fieldConfig
 * @property array $wrapperOptions
 * @property CategoryAttribute $attributeField
 */
class AttributeFieldsRender extends InputWidget
{
    public $wrapperOptions = [];
    public $attributeWrapperOptions = [];

    public $attributeFieldConfig = [];

    public $form;


    public function init()
    {
        $this->wrapperOptions['id'] = $this->getId();

        parent::init();
    }

    /**
     * Runs the widget.
     */
    public function run()
    {
        $this->registerJs();

        $content = '<div class="attribute-sizer col-w-1"></div>';

        foreach ($this->getFields() as $field) {
            /* @var $field CategoryAttribute */
            $content.= AttributeFieldRender::widget([
                'form' => $this->form,
                'model' => $this->model,
                'attribute' => "{$this->attribute}[{$field->attribute_id}]",
                'attributeField' => $field,
                'fieldConfig' => $this->attributeFieldConfig,
                'wrapperOptions' => $this->attributeWrapperOptions,
            ]);
        }

        return Html::tag('div', $content, $this->wrapperOptions);
    }

    protected function registerJs()
    {
        $js = [];
        $view = $this->getView();
        $options = Json::encode([
            'attributeContainerSelector' => "#{$this->getId()}"
        ]);
        AttributeFieldsRenderAssets::register($view);
        $jsVar = Inflector::variablize("attr-fields-{$this->getId()}");

        $js[] = "var {$jsVar} = new AttributeFieldsRender({$options});";
        $js[] = "{$jsVar}.init();";

        $view->registerJs(implode("\n", $js));
    }

    protected function getFields()
    {
        return ArrayHelper::getValue($this->model, $this->attribute, []);
    }

}
