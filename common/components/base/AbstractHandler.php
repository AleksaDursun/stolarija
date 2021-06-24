<?php
/**
 * Nikola Kukric <hola@2amigos.us>
 * Company: 2amigOS! <https://2amigos.us>.
 */

namespace common\components\base;


use Yii;
use yii\base\BaseObject;
use yii\base\Event;
use yii\base\InvalidConfigException;
use common\components\base\interfaces\IObservable;
use common\components\base\interfaces\IHandleable;


abstract class AbstractHandler extends BaseObject implements IHandleable
{
    public $owner;
    public $event;
    public $condition = true;

    public function handle(Event $event)
    {
        if (empty($this->owner) || !($this->owner instanceof IObservable)) {
            throw new InvalidConfigException('Owner is mandatory and must be instance of Observable object.');
        }

        $this->event = $event;

        if ($this->resolve($this->condition)) {
            return $this->handleSuccess();
        }

        return $this->handleFail();
    }

    public function handleSuccess()
    {
        //define in child class
    }

    public function handleFail()
    {
        return false;
    }

    public function resolve($resolver, $default = null, $data = null)
    {
        if ($resolver && is_callable($resolver)) {
            return call_user_func_array($resolver, [$this->event, $data]);
        }

        return $resolver ?: $default;
    }

}