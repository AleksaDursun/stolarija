<?php


namespace common\helpers;


use yii\base\InvalidArgumentException;
use yii\db\ActiveRecordInterface;
use yii\helpers\BaseHtml;

class HtmlHelper extends BaseHtml
{
    /**
     * @inheritdoc
     */
    public static function getAttributeValue($model, $attribute)
    {
        if (!preg_match(static::$attributeRegex, $attribute, $matches)) {
            throw new InvalidArgumentException('Attribute name must contain word characters only.');
        }
        $attribute = $matches[2];
        $value = $model->$attribute;
        if ($matches[3] !== '') {
            foreach (explode('][', trim($matches[3], '[]')) as $id) {
                if ((is_array($value) || $value instanceof \ArrayAccess) && isset($value[$id])) {
                    $value = $value[$id];
                } else {
                    return $value;
                }
            }
        }

        // https://github.com/yiisoft/yii2/issues/1457
        if (is_array($value)) {
            foreach ($value as $i => $v) {
                if ($v instanceof ActiveRecordInterface) {
                    $v = $v->getPrimaryKey(false);
                    $value[$i] = is_array($v) ? json_encode($v) : $v;
                }
            }
        } elseif ($value instanceof ActiveRecordInterface) {
            $value = $value->getPrimaryKey(false);

            return is_array($value) ? json_encode($value) : $value;
        }

        return $value;
    }
}