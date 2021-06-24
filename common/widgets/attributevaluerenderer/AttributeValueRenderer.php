<?php
/*
 * Nikola Kukric <info@singularity-solution.com>
 * Company: Singularity Solution <https://singularity-solution.com>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace common\widgets\attributevaluerenderer;

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
class AttributeValueRenderer extends Widget
{
    const EMPTY_ATTRIBUTE_VALUE = 'N/A';

    public $model;

    public $containerOptions = ['class' => 'col-lg-4 col-md-6 mb-3'];

    public $categoryAttributes = [];

    public $showEmptyAttributes = true;

    /**
     * Runs the widget.
     */
    public function run()
    {
        $columns = [];

        foreach ($this->getAttributeValuePairs() as $label => $value) {
            $markup = "<div class='row'>
                            <div class='col font-weight-bold text-uppercase text-black'>{$label}</div>
                            <div class='pr-3 ml-auto text-right'>{$value}</div>
                        </div>";
            $columns[] = Html::tag('div', $markup, $this->containerOptions);
        }

        return implode('', $columns);
    }

    private function getAttributeValuePairs()
    {
        $labelValues = [];

        foreach ($this->categoryAttributes as $categoryAttribute) {
            $label = Yii::t('app-listing', $categoryAttribute->getLabelText());

            $listingAttribute = ListingAttribute::findOne([
                'attribute_id' => $categoryAttribute->attribute_id,
                'listing_id' => $this->model->id
            ]);
            
            if (!$listingAttribute) {
                if ($this->showEmptyAttributes) {
                    $labelValues[$label] = self::EMPTY_ATTRIBUTE_VALUE;
                }
                continue;
            }

            $value = $listingAttribute->value;

            if ($categoryAttribute->attributeModel->getIsEnumInputType()) {
                $translatedAttributeValues = [];
                $attributeValueIds = explode(AttributeValue::ENUM_DELIMITER, $listingAttribute->value);
                $attributeValues = AttributeValue::find()->select('value')->where(['id' => $attributeValueIds])->column();
                foreach ($attributeValues as $attributeValue) {
                    $translatedAttributeValues[] = Yii::t('app-listing', $attributeValue);
                }
                $value = implode(AttributeValue::ENUM_DELIMITER, $translatedAttributeValues);
            }

            $labelValues[$label] = $value;
        }

        return $labelValues;
    }

}