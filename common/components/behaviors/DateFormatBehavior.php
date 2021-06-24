<?php


namespace common\components\behaviors;


use common\components\orm\ActiveRecord;
use common\helpers\TimeHelper;
use DateTime;
use DateTimeZone;
use yii\base\Behavior;

class DateFormatBehavior extends Behavior
{
    public $attributes = [];

    public function events()
    {
        return [
            ActiveRecord::EVENT_BEFORE_UPDATE => 'changeDateFormatFromLocalToSql',
            ActiveRecord::EVENT_BEFORE_INSERT => 'changeDateFormatFromLocalToSql',
            ActiveRecord::EVENT_BEFORE_DELETE => 'changeDateFormatFromLocalToSql',
            ActiveRecord::EVENT_AFTER_FIND => 'changeDateFormatFromSqlToLocal',
            ActiveRecord::EVENT_AFTER_UPDATE => 'changeDateFormatFromSqlToLocal',
            ActiveRecord::EVENT_AFTER_INSERT => 'changeDateFormatFromSqlToLocal',
            ActiveRecord::EVENT_AFTER_DELETE => 'changeDateFormatFromSqlToLocal',
        ];
    }

    public function changeDateFormatFromLocalToSql()
    {
        foreach ($this->attributes as $attribute) {
            $this->owner->{$attribute} = TimeHelper::changeDateTimeFormat($this->owner->{$attribute}, TimeHelper::getDateFormat(), TimeHelper::SQL_DATE_FORMAT);
        }
    }

    public function changeDateFormatFromSqlToLocal()
    {
        foreach ($this->attributes as $attribute) {
            $this->owner->{$attribute} = TimeHelper::changeDateTimeFormat($this->owner->{$attribute}, TimeHelper::SQL_DATE_FORMAT, TimeHelper::getDateFormat());
        }
    }

    protected function getDateObject($property)
    {
        foreach ($this->attributes as $attribute) {
            if ($attribute == $property) {
                $date = new DateTime();
                $date->setTimezone(new DateTimeZone(TimeHelper::DEFAULT_SERVER_TIMEZONE));

                return $date->createFromFormat(TimeHelper::getDateFormat(), $this->owner->{$attribute});
            }
        }

        return null;
    }

    public function formatDateAttributeAsMonth($attribute)
    {
        return TimeHelper::formatAsMonth($this->getDateObject($attribute)->format('U'));
    }

    public function formatDateAttributeAsDate($attribute)
    {
        return TimeHelper::formatAsDate($this->getDateObject($attribute)->format('U'));
    }

    public function formatDateAttributeAsDateTime($attribute)
    {
        return TimeHelper::formatAsDateTime($this->getDateObject($attribute)->format('U'));
    }
}