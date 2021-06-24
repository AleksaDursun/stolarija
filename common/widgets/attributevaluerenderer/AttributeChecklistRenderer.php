<?php
/*
 * Nikola Kukric <info@singularity-solution.com>
 * Company: Singularity Solution <https://singularity-solution.com>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace common\widgets\attributevaluerenderer;


use common\helpers\ArrayHelper;
use common\models\AttributeValue;
use common\models\CategoryAttribute;
use common\models\ListingAttribute;
use common\models\ListingForm;
use Yii;
use yii\base\Widget;
use yii\helpers\Html;

/**
 * Class AttributeValueRenderer
 *
 * @property CategoryAttribute[] $categoryAttributes
 * @property ListingForm[] $model
 */
class AttributeChecklistRenderer extends Widget
{
    public $model;

    public $categoryAttributes = [];

    public $showEmptyAttributes = true;

    public $containerOptions = ['class' => 'mb-3 col-lg-4 col-6'];

    /**
     * Runs the widget.
     */
    public function run()
    {
        Html::addCssClass($this->containerOptions, 'attribute');
        $columns = [];

        foreach ($this->getAttributeValuePairs() as $value) {
            $markup = "<i class='far fa-check mr-2'></i>{$value}";
            $columns[] = Html::tag('div', $markup, $this->containerOptions);
        }

        return implode('', $columns);
    }

    private function getAttributeValuePairs()
    {
        $values = [];

        foreach ($this->categoryAttributes as $categoryAttribute) {

            $listingAttribute = ListingAttribute::findOne([
                'attribute_id' => $categoryAttribute->attribute_id,
                'listing_id' => $this->model->id
            ]);

            if (!$listingAttribute || !$listingAttribute->value) {
                continue;
            }

            $attributeModel = $categoryAttribute->attributeModel;

            if ($attributeModel->getIsEnumInputType()) {
                $translatedAttributeValues = [];
                $attributeValueIds = explode(AttributeValue::ENUM_DELIMITER, $listingAttribute->value);
                $attributeValues = AttributeValue::find()->select('value')->where(['id' => $attributeValueIds])->column();
                $label = !$attributeModel->getIsMultiSelectionInputType() ? $categoryAttribute->getLabelText() : null;

                foreach ($attributeValues as $attributeValue) {
                    $translatedAttributeValues[] = $this->getTranslatedAttributeValue($attributeValue, $label);
                }

                $values = ArrayHelper::merge($translatedAttributeValues, $values);
            } else {
                $values[] = $this->getTranslatedAttributeValue($listingAttribute->value, $categoryAttribute->getLabelText());
            }
        }

        return $values;
    }

    private function getTranslatedAttributeValue($value, $label = null)
    {
        if ($label) {
            return "<span class='attribute-checklist-label'>{$label}:</span> " . Yii::t('app-listing', $value);
        }

        return Yii::t('app-listing', $value);
    }
}

