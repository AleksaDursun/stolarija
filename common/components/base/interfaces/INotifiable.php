<?php
/**
 * Nikola Kukric <hola@2amigos.us>
 * Company: 2amigOS! <https://2amigos.us>.
 */

namespace common\components\base\interfaces;


interface INotifiable extends IObservable
{
    public function getNotificationReceivers($event);
}