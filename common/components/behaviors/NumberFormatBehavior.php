<?php
/**
 * Nikola Jankovic  <hello@singularity.is>
 * Company: Singularity Solution <https://singularity.is>
 */

namespace common\components\behaviors;


use common\components\orm\ActiveRecord;
use yii\base\Behavior;

class NumberFormatBehavior extends Behavior
{
    public $attributes = [];
    const NUMBER_PATTERN = '/^\s*[-+]?[0-9]*[.,]?[0-9]+([eE][-+]?[0-9]+)?\s*$/';


    public function events()
    {
        return [
            ActiveRecord::EVENT_BEFORE_UPDATE => 'formatNumber',
            ActiveRecord::EVENT_BEFORE_INSERT => 'formatNumber',
            ActiveRecord::EVENT_AFTER_UPDATE => 'formatNumber',
            ActiveRecord::EVENT_AFTER_INSERT => 'formatNumber',
        ];
    }


    public function validateNumber($value)
    {
        $dotPos = strrpos($value, '.');
        $commaPos = strrpos($value, ',');
        $sep = (($dotPos > $commaPos) && $dotPos) ? $dotPos : ((($commaPos > $dotPos) && $commaPos) ? $commaPos : false);

        if (!$sep) {
            return floatval(preg_replace("/[^0-9]/", "", $value));
        }

        return floatval(
            preg_replace("/[^0-9]/", "", substr($value, 0, $sep)) . '.' .
            preg_replace("/[^0-9]/", "", substr($value, $sep + 1, strlen($value)))
        );
    }

    public function formatNumber()
    {
        foreach ($this->attributes as $attribute) {
            $this->owner->{$attribute} = $this->validateNumber($this->owner->{$attribute});
        }
    }

}