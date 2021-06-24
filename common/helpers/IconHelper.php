<?php
/*
 * Nikola Kukric <info@singulaity.is>
 * Company: Singularity Solution <https://singulaity.is>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace common\helpers;


use common\models\Delivery;
use common\models\Expense;
use common\models\Inspection;
use common\models\Sanation;
use yii\helpers\Html;

class IconHelper
{
    const ICON_FOLDER = 'folder';
    const ICON_FILE = 'file';
    const ICON_TEXT = 'file-alt';
    const ICON_IMAGE = 'file-image';
    const ICON_PDF = 'file-pdf';
    const ICON_VIDEO = 'file-video';
    const ICON_EXCEL = 'file-excel';
    const ICON_AUDIO = 'file-audio';
    const ICON_WORD = 'file-word';
    const ICON_POWER_POINT = 'file-powerpoint';
    const ICON_COMPRESSED = 'file-archive';
    const ICON_CAMPAIGN = 'bullhorn';

    const ICON_DEFAULT = 'file';
    const COLOR_DEFAULT = 'noti-primary';

    const ICON_PROPERTY = 'fa-hotel';
    const ICON_NEWS = 'fa-newspaper';
    const ICON_USER = 'fa-user';

    protected static $iconMap = [
        'file' => self::ICON_FILE,
        'token' => self::ICON_FILE,
        'folder' => self::ICON_FOLDER,
        'campaign' => self::ICON_CAMPAIGN,
        'image/jpeg' => self::ICON_IMAGE,
        'image/png' => self::ICON_IMAGE,
        'image/tiff' => self::ICON_IMAGE,
        'image/bmp' => self::ICON_IMAGE,
        'image/gif' => self::ICON_IMAGE,
        'application/msword' => self::ICON_WORD,
        'application/vnd.oasis.opendocument.text' => self::ICON_WORD,
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' => self::ICON_WORD,
        'application/vnd.openxmlformats-officedocument.presentationml.slideshow' => self::ICON_POWER_POINT,
        'audio/mpeg3' => self::ICON_AUDIO,
        "audio/ogg" => self::ICON_AUDIO,
        "audio/x-wav" => self::ICON_AUDIO,
        "application/ogg" => self::ICON_AUDIO,
        "application/mp4" => self::ICON_AUDIO,
        'video/avi' => self::ICON_VIDEO,
        'video/ogg' => self::ICON_VIDEO,
        'video/mp4' => self::ICON_VIDEO,
        'video/x-msvideo' => self::ICON_VIDEO,
        'video/x-flv' => self::ICON_VIDEO,
        'application/x-tar' => self::ICON_COMPRESSED,
        'application/x-rar-compressed' => self::ICON_COMPRESSED,
        'application/zip' => self::ICON_COMPRESSED,
        'application/x-7z-compressed' => self::ICON_COMPRESSED,
        FileHelper::MIME_TYPE_EXCEL_2003 => self::ICON_EXCEL,
        FileHelper::MIME_TYPE_EXCEL_2007 => self::ICON_EXCEL,
        FileHelper::MIME_TYPE_EXCEL_2010 => self::ICON_EXCEL,
        'text/plain' => self::ICON_TEXT,
        'application/pdf' => self::ICON_PDF,
    ];

    protected static $iconByTypeMap = [
        'Property' => self::ICON_PROPERTY,
        'News' => self::ICON_NEWS,
        'User' => self::ICON_USER,
    ];

    protected static $colorByTypeMap = [
        'Property' => 'primary',
        'News' => 'warning',
        'Team' => 'danger',
        'User' => 'custom',
        'PropertyUpload' => 'primary',
        'OwnerInvoice' => 'primary',
        'Contract' => 'yellow',
        'Cession' => 'orange',
        'Deposit' => 'purple',
        'Profit' => 'teal',
    ];

    public static function getFaByMimeType($mimeType)
    {
        $iconName = ArrayHelper::getValue(self::$iconMap, $mimeType, self::ICON_DEFAULT);

        return "fal fa-{$iconName}";
    }

    public static function getByMimeType($mimeType, array $options = [])
    {
        Html::addCssClass($options, static::getFaByMimeType($mimeType));

        return Html::tag('i', ' ', $options);
    }

    public static function getIconTemplateMap()
    {
        $templateMap = [];

        foreach (static::$iconMap as $iconName => &$iconIdentifier) {
            $templateMap[$iconName] = static::getIconTemplateFromName($iconIdentifier);
        }

        return $templateMap;
    }

    protected static function getIconTemplateFromName($name)
    {
        return 'fal fa-' . $name;
    }

    public static function getTextColorClassMap()
    {
        return array_map(function ($a) {
            return 'text-' . $a;
        }, static::$colorByTypeMap);
    }

    public static function getNotificationColorClassMap()
    {
        return array_map(function ($a) {
            return 'noti-' . $a;
        }, static::$colorByTypeMap);
    }

    public static function getIconByType($type)
    {
        return ArrayHelper::getValue(self::$iconByTypeMap, $type, self::ICON_DEFAULT);
    }

    public static function getColorByType($type)
    {
        return ArrayHelper::getValue(self::$colorByTypeMap, $type, self::ICON_DEFAULT);
    }

    public static function getNotificationColorByType($type)
    {
        return ArrayHelper::getValue(self::getNotificationColorClassMap(), $type, self::ICON_DEFAULT);
    }

    public static function getTextColorByType($type)
    {
        return ArrayHelper::getValue(self::getTextColorClassMap(), $type, self::ICON_DEFAULT);
    }

    public static function getIconByTypeMap()
    {
        $templateMap = [];

        foreach (static::$iconByTypeMap as $iconName => &$iconIdentifier) {
            $templateMap[$iconName] = "fal {$iconIdentifier}";
        }

        return $templateMap;
    }
}