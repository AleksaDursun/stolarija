<?php
/**
 * Nikola Kukric <hola@2amigos.us>
 * Company: 2amigOS! <https://2amigos.us>.
 */

namespace common\components\base\interfaces;


use yii\base\Event;

interface IHandleable
{
    public function handle(Event $event);

    public function handleSuccess();

    public function handleFail();
}