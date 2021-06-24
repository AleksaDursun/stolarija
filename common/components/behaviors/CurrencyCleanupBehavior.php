<?php
/**
 * Nikola Jankovic  <hello@singularity.is>
 * Company: Singularity Solution <https://singularity.is>
 */

namespace common\components\behaviors;


use yii\base\Behavior;
use yii\db\BaseActiveRecord;

class CurrencyCleanupBehavior extends Behavior
{
    public $moneyAttributes = [];

    public function events()
    {
        return [
            BaseActiveRecord::EVENT_BEFORE_VALIDATE => 'cleanMoneyAttributes',
        ];
    }

    public function cleanMoneyAttributes()
    {
        foreach ($this->moneyAttributes as $attribute) {
            $this->cleanAttributeValue($attribute);
        }
    }

    public function cleanAttributeValue($attribute)
    {

        $isNegative = substr($this->owner->{$attribute}, 0, 1) == '-';
        $cleanString = preg_replace('/([^0-9\.,])/i', '', $this->owner->{$attribute});
        $onlyNumbersString = preg_replace('/([^0-9])/i', '', $this->owner->{$attribute});

        $separatorsCountToBeErased = strlen($cleanString) - strlen($onlyNumbersString) - 1;

        $stringWithCommaOrDot = preg_replace('/([,\.])/', '', $cleanString, $separatorsCountToBeErased);
        $removedThousandSeparator = preg_replace('/(\.|,)(?=[0-9]{3,}$)/', '', $stringWithCommaOrDot);

        $value = (float)str_replace(',', '.', $removedThousandSeparator);

        $this->owner->{$attribute} = empty($value) ? '' : ($isNegative ? -$value : $value);
    }
}