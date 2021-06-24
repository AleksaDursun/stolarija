<?php
/**
 * Nikola Kukric <hola@2amigos.us>
 * Company: 2amigOS! <https://2amigos.us>.
 */

namespace common\components\base;

use common\components\orm\ActiveRecord;
use common\models\ActionLog;
use common\helpers\ArrayHelper;


class ActionLogHandler extends AbstractHandler
{
    public $title;
    public $model_id;
    public $model_name;
    public $action_type;

    public function handleSuccess()
    {
        $log = new ActionLog();
        $log->model_id = $this->resolve($this->model_id, $this->owner->primaryKey);
        $log->model_name = $this->resolve($this->model_name, $this->owner->getBaseName());
        $log->action_type = $this->resolve($this->action_type, $this->eventNameToActionType($this->event->name));
        $log->title = $this->resolve($this->title);

        return $log->save();
    }

    public static $actionTypeMap = [
        ActiveRecord::EVENT_AFTER_INSERT => 'created',
        ActiveRecord::EVENT_AFTER_UPDATE => 'updated',
        ActiveRecord::EVENT_AFTER_DELETE => 'deleted',
    ];

    public function eventNameToActionType($eventName)
    {
        return ArrayHelper::getValue(static::$actionTypeMap, $eventName, $eventName);
    }

}