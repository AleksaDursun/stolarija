<?php


namespace common\helpers;

use DateTime;
use DateTimeZone;
use Yii;
use yii\helpers\Inflector;

/**
 * Example of use:
 *
 * $unixtime = HTime::dateTimeToTimestamp('2009-04-01 15:36:13');
 * echo HTime::UTCToPST("M d, Y - H:i:s", $unixtime);
 */
class TimeHelper
{

    const SHORTDATE = "j/n/y";
    const DATE_FORMAT = 'd/m/Y';
    const DATETIME_FORMAT = 'd/m/Y H:i:s';
    const DATE_PICKER_FORMAT = 'dd/mm/yyyy';
    const MOMENT_DATE_PICKER_FORMAT = 'DD/MM/YYYY';
    const DATE_RANGE_PICKER_FORMAT = 'd/m/Y';
    const SQL_DATE_FORMAT = 'Y-m-d';
    const SQL_TIME_FORMAT = 'H:i:s';
    const SQL_DATETIME_FORMAT = 'Y-m-d H:i:s';
    const UNIX_DATE_FORMAT = 'U';
    const MONTH_DAY_YEAR = 'F N, Y';

    const WEEK_DAYS = 7;
    const MINUTE = 60;
    const HOUR = 3600;
    const DAY = 86400;
    const WEEK = 604800;
    const MONTH = 2592000; //30 days
    const YEAR = 31556926;
    const MONDAY = 'monday';
    const TUESDAY = 'tuesday';
    const WEDNESDAY = 'wednesday';
    const THURSDAY = 'thursday';
    const FRIDAY = 'friday';
    const SATURDAY = 'saturday';
    const SUNDAY = 'sunday';
    const WEEK_START = self::MONDAY;
    const WEEK_END = self::SUNDAY;

    const DEFAULT_SERVER_TIMEZONE = 'Europe/Sarajevo';

    /**
     * get circular days list
     * day => next_day
     *
     * @return array
     */
    private static function getDayCircularList()
    {
        return array(
            self::MONDAY => self::TUESDAY,
            self::TUESDAY => self::WEDNESDAY,
            self::WEDNESDAY => self::THURSDAY,
            self::THURSDAY => self::FRIDAY,
            self::FRIDAY => self::SATURDAY,
            self::SATURDAY => self::SUNDAY,
            self::SUNDAY => self::MONDAY,
        );
    }

    /**
     * Return ordered week days array
     * set by self::WEEK_START and self::WEEK_END
     *
     * @return array
     */
    public static function getWeekDays($short = true)
    {
        $availableDays = self::getDayCircularList();
        $nextDay = null;
        $weekDays = [];

        while ($nextDay !== self::WEEK_END) {
            $nextDay = $nextDay ? $availableDays[$nextDay] : self::WEEK_START;
            $weekDays[$nextDay] = Inflector::titleize($short ? substr($nextDay, 0, 2) : $nextDay);
        }

        return $weekDays;
    }

    public static function getMonthList()
    {
        return [
            1 => Yii::t('app', "January"),
            2 => Yii::t('app', "February"),
            3 => Yii::t('app', "March"),
            4 => Yii::t('app', "April"),
            5 => Yii::t('app', "May"),
            6 => Yii::t('app', "June"),
            7 => Yii::t('app', "July"),
            8 => Yii::t('app', "August"),
            9 => Yii::t('app', "September"),
            10 => Yii::t('app', "October"),
            11 => Yii::t('app', "November"),
            12 => Yii::t('app', "December")
        ];
    }

    public static function getMonthListShort()
    {
        $lang = Yii::$app->language;

        return [
            1 => Yii::t('app', $lang == 'hr' ? "Jan.x" : "Jan"),
            2 => Yii::t('app', $lang == 'hr' ? "Feb.x" : "Feb"),
            3 => Yii::t('app', $lang == 'hr' ? "Mar.x" : "Mar"),
            4 => Yii::t('app', $lang == 'hr' ? "Apr.x" : "Apr"),
            5 => Yii::t('app', $lang == 'hr' ? "May.x" : "May"),
            6 => Yii::t('app', $lang == 'hr' ? "Jun.x" : "Jun"),
            7 => Yii::t('app', $lang == 'hr' ? "Jul.x" : "Jul"),
            8 => Yii::t('app', $lang == 'hr' ? "Aug.x" : "Aug"),
            9 => Yii::t('app', $lang == 'hr' ? "Sep.x" : "Sep"),
            10 => Yii::t('app', $lang == 'hr' ? "Oct.x" : "Oct"),
            11 => Yii::t('app', $lang == 'hr' ? "Nov.x" : "Nov"),
            12 => Yii::t('app', $lang == 'hr' ? "Dec.x" : "Dec")
        ];
    }

    public static function getYearList($fromYear = null, $numYears = 11)
    {
        $fromYear = empty($fromYear) ? date('Y') : $fromYear;

        $yearList = [];

        for ($i = $fromYear; $i < $fromYear + $numYears; $i++) {
            $yearList[$i] = $i;
        }

        return $yearList;
    }

    /**
     * @param $timestamp int in milliseconds
     * @param $format string see http://www.php.net/manual/en/function.date.php
     *
     * @return string - formatted date/time
     */
    public static function format($timestamp, $format = self::DATE_FORMAT)
    {
        if (empty($timestamp)) {
            return null;
        }

        return date($format, $timestamp);
    }

    public static function formatTime($time)
    {
        return date('H:i', strtotime($time));
    }

    /**
     * Returns a date string
     *
     * @param $timestamp
     *
     * @return string
     */
    public static function onlyDate($timestamp)
    {
        return self::format($timestamp, self::SHORTDATE);
    }

    /**
     * Calculates the difference between two dates
     *
     * @param string $interval the difference to be returned. Possible values are:
     *
     * - s: seconds
     * - i: minutes
     * - h: hours
     * - d: days
     * - w: weeks
     *
     * @param int|string $dateFrom
     * @param int|string $dateTo
     * @param bool $usingTimeStamps whether we are passing a timestamp (int) or a date string
     *
     * @return int the difference interval
     */
    public static function dateDiff($interval, $dateFrom, $dateTo, $usingTimeStamps = false)
    {
        if (!$usingTimeStamps) {
            $dateFrom = strtotime($dateFrom);
            $dateTo = strtotime($dateTo);
        }

        $timeDiff = $dateTo - $dateFrom;
        $timeDiff = $timeDiff > 0 ? $timeDiff : 0;
        $factor = 0;

        switch ($interval) {
            case 's':
                $factor = 1;
                break;
            case 'i':
                $factor = self::MINUTE;
                break;
            case 'h':
                $factor = self::HOUR;
                break;
            case 'd':
                $factor = self::DAY;
                break;
            case 'w':
                $factor = self::WEEK;
        }

        return $timeDiff >= $factor ? round($timeDiff / $factor) : 0;
    }

    public static function toDateTime($timestamp, $format = 'Y-m-d H:i:s', $gmtOffset = false)
    {
        return $gmtOffset ? gmdate($format, $timestamp) : date($format, $timestamp);
    }

    public static function toTimestamp($dateTime)
    {
        // dateTimeToTimestamp expects MySQL format
        // If it gets a fully numeric value, we'll assume it's a timestamp
        // You can comment out this if block if you don't want this behavior
        if (is_numeric($dateTime)) {
            // You should probably log an error here
            return $dateTime;
        }
        $date = new DateTime($dateTime);
        $ret = $date->format('U');
        return ($ret < 0 ? 0 : $ret);
    }

    public static function UTCToPST($format, $time)
    {
        $dst = intval(date("I", $time));
        $tzOffset = intval(date('Z', time()));
        return date($format, $time + $tzOffset - 28800 + $dst * 3600);
    }

    /**
     * Helper function to get timestamp of first available week day, from given date.
     * If $weekday is same as $date's and function will returt $date,
     * otherwise function will provide date of next week's weekday.
     * Default weekday index is 6, which is equivalent for 'saturday'
     *
     * Example:
     * HTime::nextWeekday(new DateTime('2014-01-20'), 2);  //echo strtotime('2014-01-21');
     * HTime::nextWeekday(new DateTime('2014-01-22'), 2);  //echo strtotime('2014-01-28');
     *
     * @param DateTime $dateTime
     * @param int $weekday Week day index (Start of week is 0 for Sunday)
     *
     * @return DateTime
     */
    public static function nextWeekday(DateTime $dateTime, $weekday = 6)
    {
        $weekdays = self::getWeekDays();

        if ($dateTime->format('w') == $weekday) {
            return $dateTime;
        }

        return $dateTime->modify("next {$weekdays[$weekday]}");
    }

    /**
     * MySQL YEARWEEK mode 6 equivalent
     * based on ISO-8601 with Sunday as first day of week
     * US week calendar
     *
     * @param DateTime $dateTime
     *
     * @return integer
     */
    public static function getYearWeek(DateTime $dateTime)
    {
        $minDaysInWeek = 4;
        $firstDayOfYear = clone $dateTime;
        $lastDayOfYear = clone $dateTime;
        $yearStartingDay = $firstDayOfYear->modify('first day of January this year')->format('N');
        $numberOfDaysInYear = $lastDayOfYear->modify('last day of December this year')->format('z') + 1;
        $ordinalDate = $dateTime->format('z') + 1;
        $weekOffset = $yearStartingDay < $minDaysInWeek ? 1 : 0;

        $weekNum = ceil(($ordinalDate + $yearStartingDay - self::WEEK_DAYS) / self::WEEK_DAYS) + $weekOffset;
        $maxWeekNum = ceil(($numberOfDaysInYear + $yearStartingDay - self::WEEK_DAYS) / self::WEEK_DAYS) + $weekOffset;

        if ($weekNum < 1) {
            return self::getYearWeek(clone $dateTime->modify('last day of December previous year'));
        }

        if ($weekNum > $maxWeekNum) {
            return self::getYearWeek(clone $dateTime->modify('first day of January next year'));
        }

        return intval($dateTime->format('Y') . ($weekNum < 9 ? '0' . $weekNum : $weekNum));
    }

    /**
     * Helper function to get timestamp of first available month day, from given date.
     * If $dayOfMonth is prior to $date, function will return date within $date month,
     * otherwise function will provide date from next month. If next month does not have
     * enough days as we want to, it will return last date in that month.
     *
     * Example:
     * HTime::nextDayOfMonth(new DateTime('2014-01-20'), 21);  //echo '2014-01-21';
     * HTime::nextDayOfMonth(new DateTime('2014-01-22'), 21);  //echo '2014-02-21';
     * HTime::nextDayOfMonth(new DateTime('2014-01-19'), 30);  //echo '2014-02-28';
     *
     * @param DateTime $date
     * @param int $dayOfMonth
     *
     * @return DateTime
     */
    public static function nextDayOfMonth($date, $dayOfMonth)
    {
        $refDayOfMonth = $date->format('j');
        $dateInThisMonth = $date->format('t') > $dayOfMonth ?
            $date->modify("Y-m-{$dayOfMonth}") :
            $date->modify('Y-m-t');

        if ($refDayOfMonth <= $dayOfMonth) {
            return $dateInThisMonth;
        }

        return self::getXMonthsToTheFuture($dateInThisMonth);
    }

    /**
     * Helper function to deal with different month length issue.
     * This function will provide timestamp for a same day in next month of given date.
     * If next month does not have so many days for given date, function will return timestamp
     * of last date from that month
     *
     * Example:
     * HTime::getXMonthsToFuture(new DateTime('2014-01-30'));      //echo '2014-02-28';
     * HTime::getXMonthsToFuture(new DateTime('2014-01-19'), 2);   //echo '2014-03-19';
     *
     * @param DateTime $baseDate
     * @param integer $months
     *
     * @return DateTime
     */
    public static function getXMonthsToTheFuture(DateTime $baseDate, $months = 1)
    {
        $x_monthsToTheFuture = clone $baseDate;
        $x_monthsToTheFuture->modify("+{$months} months");

        $monthBefore = (int)$baseDate->format("m") + 12 * (int)$baseDate->format("Y");
        $monthAfter = (int)$x_monthsToTheFuture->format("m") + 12 * (int)$x_monthsToTheFuture->format("Y");

        if ($monthAfter > $months + $monthBefore) {
            $x_monthsToTheFuture->modify('last day of previous month');
        }

        return $x_monthsToTheFuture;
    }

    /**
     * return Ordinal numbers such as 21st, 33rd, etc.,
     * formed by combining a cardinal ten with an ordinal unit.
     *
     * @param integer $number
     *
     * @return string
     */
    public static function addOrdinalNumberSuffix($number)
    {
        $ends = array('th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th');

        if (($number % 100) >= 11 && ($number % 100) <= 13) {
            $abbreviation = $number . 'th';
        } else {
            $abbreviation = $number . $ends[$number % 10];
        }

        return $abbreviation;
    }

    /**
     * Formats input date format to another output date format using DateTime class.
     *
     * @see DateTime
     *
     * @param $inputDate string Input date which will be formatted.
     * @param $inputFormat string Input date format.
     * @param $outputFormat string Output date format.
     * @return string New date which corresponds to $outputFormat.
     */
    public static function changeFormat($inputDate, $inputFormat, $outputFormat)
    {
        $dateTime = DateTime::createFromFormat($inputFormat, $inputDate);

        if ($dateTime) {
            return $dateTime->format($outputFormat);
        }

        return $inputDate;
    }

    /**
     * Convert timestamp to date time param
     *
     * @param integer $datetime
     * @return string
     */
    public static function getAsDateTime($datetime)
    {
        if (empty($datetime)) {
            return '';
        }

        if (is_numeric($datetime)) {
            return date('Y-m-d H:i:s', $datetime);
        }

        return $datetime;
    }

    /**
     * Formats input date format to another output date format using DateTime class.
     *
     * @see DateTime
     *
     * @param $inputDate string Input date which will be formatted.
     * @param $inputFormat string Input date format.
     * @param $outputFormat string Output date format.
     * @return string New date which corresponds to $outputFormat.
     */
    public static function changeDateTimeFormat($inputDate, $inputFormat, $outputFormat)
    {
        $dateTime = DateTime::createFromFormat($inputFormat, $inputDate);

        if ($dateTime) {
            return $dateTime->format($outputFormat);
        }

        return $inputDate;
    }

    public static function getIsFirstDayOfMonth()
    {
        return date('j', time()) === '1';
    }

    public static function formatDateString($date)
    {
        if (empty($date)) {
            return null;
        }

        return static::createDateObjectFromString($date)->format(static::getDateFormat());
    }

    public static function createDateObject($date)
    {
        return is_integer($date) ?
            static::createDateObjectFromTimestamp($date) :
            static::createDateObjectFromString($date);
    }

    public static function createDateObjectFromString($date = 'now')
    {
        return new DateTime($date, new DateTimeZone(static::DEFAULT_SERVER_TIMEZONE));
    }

    public static function createDateObjectFromTimestamp($timestamp)
    {
        $date = new DateTime();
        $date->setTimezone(new DateTimeZone(static::DEFAULT_SERVER_TIMEZONE));
        $date->setTimestamp($timestamp);

        return $date;
    }

    public static function startOfDay($date)
    {
        $dateWithoutTime = self::createDateObjectFromString($date)->format(self::DATE_FORMAT);

        return self::createDateObjectFromString($dateWithoutTime)->format('U');
    }

    public static function endOfDay($date)
    {
        return self::startOfDay($date) + self::DAY - 1;
    }

    public static function getDatePeriodForLastMonths($num)
    {
        $num = $num - 1 < 0 ? 0 : $num - 1;
        $startDate = new \DateTime("first day of this month - {$num} months");
        $endDate = new \DateTime("last day of this month");
        $interval = new \DateInterval("P1M");

        return new \DatePeriod($startDate, $interval, $endDate);
    }

    public static function getDatesInRange($fromDate, $toDate, $includeWeekends = true)
    {
        $startDate = new \DateTime($fromDate);
        $endDate = new \DateTime($toDate);
        $endDate->modify('+1 day');
        $interval = new \DateInterval("P1D");
        $period = new \DatePeriod($startDate, $interval, $endDate);

        $dates = [];
        foreach ($period as $date) {
            if ($includeWeekends || !self::isWeekend($date)) {
                $dates[] = $date->format(self::SQL_DATE_FORMAT);
            }
        }

        return $dates;
    }

    public static function isWeekend($date)
    {
        return in_array(strtolower($date->format('l')), [self::SATURDAY, self::SUNDAY]);
    }

    public static function getFirstDayOfMonthForYearMonth($ym)
    {
        $year = substr($ym, 0, 4);
        $month = substr($ym, 4, 6);

        return date(self::SQL_DATE_FORMAT, strtotime("{$year}-{$month}-01"));
    }

    public static function getLastDayOfMonthForYearMonth($ym)
    {
        $year = substr($ym, 0, 4);
        $month = substr($ym, 4, 6);

        return date(self::SQL_DATE_FORMAT, strtotime("{$year}-{$month}-01 last day of this month"));
    }

    public static function getFirstDayOfYear($year)
    {
        return date(self::SQL_DATE_FORMAT, strtotime("{$year}-01-01"));
    }

    public static function getLastDayOfYear($year)
    {
        return date(self::SQL_DATE_FORMAT, strtotime("{$year}-12-31"));
    }

    public static function getNextMonth($date)
    {
        return $date->modify('+ 1 month');
    }

    public static function getPreviousMonth($date)
    {
        return $date->modify('- 1 month');
    }

    public static function getNextYear($date)
    {
        return $date->modify('+ 1 year');
    }

    public static function getPreviousYear($date)
    {
        return $date->modify('- 1 year');
    }

    public static function getYearMonthArray($year)
    {
        $months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

        return array_map(function ($month) use ($year) {
            return "{$year}{$month}";
        }, $months);
    }

    public static function getMonthsInRange($fromDate, $toDate)
    {
        $start = (new DateTime($fromDate))->modify('first day of this month');
        $end = (new DateTime($toDate))->modify('first day of next month');
        $interval = \DateInterval::createFromDateString('1 month');
        $period = new \DatePeriod($start, $interval, $end);

        $result = [];
        foreach ($period as $dt) {
            array_push($result, $dt->format("Y-m-01"));
        }

        return $result;
    }

    public static function getDaysBetween($from, $to)
    {
        $from = new DateTime($from);
        $to = new DateTime($to);

        return $to->diff($from)->format("%a");
    }

    public static function getNextWeekDayFromArray($nextReadDay, array $readingDays)
    {
        $weekDays = static::getDayCircularList();

        if (empty($readingDays) || !in_array($nextReadDay, array_keys($weekDays))) {
            return null;
        }

        if (in_array($weekDays[$nextReadDay], $readingDays)) {
            return $weekDays[$nextReadDay];
        }

        return static::getNextWeekDayFromArray($weekDays[$nextReadDay], $readingDays);
    }

    protected static function createDateObjectFromDateFormatString($value)
    {
        $date = new DateTime();
        $date->setTimezone(new DateTimeZone(static::DEFAULT_SERVER_TIMEZONE));

        return $date->createFromFormat(static::getDateFormat(), $value);
    }

    public static function formatAsSqlDate(string $value): string
    {
        return static::createDateObjectFromDateFormatString($value)->format(static::SQL_DATE_FORMAT);
    }

    public static function formatAsDate(int $timestamp): string
    {
        return static::createDateObjectFromTimestamp($timestamp)->format(static::getDateFormat());
    }

    public static function formatAsDateTime(int $timestamp): string
    {
        return static::createDateObjectFromTimestamp($timestamp)->format(static::getDateTimeFormat());
    }

    public static function formatAsYear(int $timestamp): string
    {
        return static::createDateObjectFromTimestamp($timestamp)->format('Y');
    }

    public static function formatAsMonth(int $timestamp, bool $short = false): string
    {
        return static::createDateObjectFromTimestamp($timestamp)->format($short ? 'M' : 'F');
    }

    public static function formatAsTime(int $timestamp)
    {
        return static::createDateObjectFromTimestamp($timestamp)->format('H:i');
    }

    public static function getDateFormat()
    {
        return static::DATE_FORMAT;
    }

    public static function getDateTimeFormat()
    {
        return static::DATETIME_FORMAT;
    }

    public static function getDatePickerFormat()
    {
        return static::DATE_PICKER_FORMAT;
    }

    public static function getMomentDatePickerFormat()
    {
        return static::MOMENT_DATE_PICKER_FORMAT;
    }

    public static function getTimezoneList()
    {
        $timezones = [];

        $list = DateTimeZone::listIdentifiers(DateTimeZone::ALL);
        foreach ($list as $name) {
            $date = new \DateTime('now', new DateTimeZone($name));
            $offset = $date->format('P');
            $timezones[$name] = "{$name} (UTC {$offset})";
        }

        return $timezones;
    }

}
