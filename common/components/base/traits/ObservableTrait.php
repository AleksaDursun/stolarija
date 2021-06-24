<?php
/**
 * Nikola Kukric <hola@2amigos.us>
 * Company: 2amigOS! <https://2amigos.us>.
 */

namespace common\components\base\traits;

use common\components\base\interfaces\IHandleable;
use common\components\base\NotificationHandler;
use common\components\orm\ActiveRecord;

trait ObservableTrait
{
    public function init()
    {
        parent::init();

        $this->attachEvents();
    }

    protected function attachEvents()
    {
        foreach ($this->events() as $eventKey => $object) {
            if (is_array($object)) {
                foreach ($object as $item) {
                    if ($item instanceof IHandleable) {
                        $item->owner = $this;

                        $this->on($eventKey, function ($event) use ($item) {
                            return $item->handle($event);
                        });
                    }
                }
            } elseif ($object instanceof IHandleable) {
                $object->owner = $this;

                $this->on($eventKey, function ($event) use ($object) {
                    return $object->handle($event);
                });
            } elseif (is_numeric($eventKey) && in_array($object, $this->defaultEvents())) {
                $defaultHandler = $this->getDefaultEventHandler($object);

                $this->on($object, function ($event) use ($defaultHandler) {
                    return $defaultHandler->handle($event);
                });
            }
        }
    }

    public function events()
    {
        return [];
    }

    public function defaultEvents()
    {
        return [
            ActiveRecord::EVENT_AFTER_INSERT,
            ActiveRecord::EVENT_AFTER_UPDATE,
            ActiveRecord::EVENT_AFTER_DELETE,
        ];
    }

    public function getDefaultEventHandler($eventName)
    {
        $handler = new NotificationHandler();
        $handler->owner = $this;
        $handler->title = "{$this->getPublicName()} notification";
        $handler->message = "You are notified since <i>{$this->getPublicName()}</i> has triggered {$eventName} event.";

        return $handler;
    }

}