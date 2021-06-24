<?php
/**
 * Nikola Kukric <hola@2amigos.us>
 * Company: 2amigOS! <https://2amigos.us>.
 */

namespace common\components\base;

use common\models\User;
use Yii;
use common\models\Notification;
use common\helpers\ArrayHelper;
use common\helpers\NotificationHelper;

/**
 * Class NotificationHandler
 * @package common\components\base
 *
 * @property string $type
 * @property string $title
 * @property string $message
 * @property string $model_name
 * @property boolean $shouldSendEmailNotification
 */
class NotificationHandler extends AbstractHandler
{
    public $type;
    public $title;
    public $message;
    public $model_name;
    public $sendToInitiator = false;

    public $shouldSendEmailNotification = false;

    public function handleSuccess()
    {
        $allReceivers = $this->owner->getNotificationReceivers($this);
        $currentUserId = php_sapi_name() != "cli" ? ArrayHelper::getValue(Yii::$app, 'user.id') : null;
        $receivers = $this->sendToInitiator ? $allReceivers : ArrayHelper::removeIfValueExists($allReceivers, $currentUserId);

        $notifications = [];

        foreach ($receivers as $receiverId) {

            $notification = new Notification();
            $notification->model_id = $this->owner->primaryKey;
            $notification->model_name = $this->resolve($this->model_name, $this->owner->getBaseName(), $receiverId);
            $notification->receiver_id = $receiverId;
            $notification->type = $this->resolve($this->type, $this->event->name, $receiverId);
            $notification->title = $this->resolve($this->title,  '', $receiverId);
            $notification->message = $this->resolve($this->message, '', $receiverId);
            $notification->is_read = 0;
            $notification->is_deleted = 0;

            $notifications[] = $notification;
        }

        return Notification::insertMultiple($notifications) && ($this->shouldSendEmailNotification ? $this->sendEmailNotificationsTo($receivers) : true);
    }

    protected function sendEmailNotificationsTo($receiverIds)
    {
        $emails = User::find()
            ->select('email')
            ->where(['id' => $receiverIds])
            ->column();

        return $this->owner->sendEmailNotificationByType($this->type, $emails);

    }

}