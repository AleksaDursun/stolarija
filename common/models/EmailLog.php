<?php

namespace common\models;

use common\components\orm\ActiveRecord;
use common\helpers\ArrayHelper;
use common\helpers\TimeHelper;
use Yii;
use yii\helpers\Json;

/**
 * This is the model class for table "email_log".
 *
 * @property int $id
 * @property int $attachment_id
 * @property string $subject
 * @property string $from
 * @property string $to
 * @property string $reply_to
 * @property string $cc
 * @property string $bcc
 * @property string $view
 * @property mixed $params
 * @property int $num_attempts
 * @property int $last_attempt_at
 * @property string $status
 * @property int $created_at
 * @property int $created_by
 * @property int $is_deleted
 *
 * @property File $attachment
 */
class EmailLog extends ActiveRecord
{
    const STATUS_PENDING = 'pending';
    const STATUS_SENT = 'sent';
    const STATUS_SEND_FAILED = 'send-failed';

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'email_log';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['num_attempts', 'last_attempt_at', 'created_at', 'created_by', 'is_deleted'], 'integer'],
            [['subject'], 'string', 'max' => 512],
            [['status'], 'string', 'max' => 45],
            [['from', 'to', 'reply_to', 'cc', 'bcc', 'params'], 'safe'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'subject' => 'Subject',
            'from' => 'From',
            'to' => 'To',
            'reply_to' => 'Reply to',
            'cc' => 'Cc',
            'bcc' => 'Bcc',
            'view' => 'View',
            'params' => 'Params',
            'num_attempts' => 'Num Attempts',
            'last_attempt_at' => 'Last Attempt At',
            'status' => 'Status',
            'created_at' => 'Created At',
            'created_by' => 'Created By',
            'is_deleted' => 'Is Deleted',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getAttachment()
    {
        return $this->hasOne(File::class, ['id' => 'attachment_id']);
    }

    public function init()
    {
        $this->from = $this->from ? $this->from : [Yii::$app->params['support.email'] => Yii::$app->params['support.name']];
        $this->reply_to = $this->reply_to ? $this->reply_to : $this->from;

        parent::init();
    }

    public function beforeSave($insert)
    {
        if ($insert) {
            $this->to = Json::encode($this->to);
            $this->reply_to = Json::encode($this->reply_to);
            $this->cc = Json::encode($this->cc);
            $this->bcc = Json::encode($this->bcc);
            $this->from = Json::encode($this->from);
            $this->params = Json::encode($this->params);
            $this->status = EmailLog::STATUS_PENDING;
        }

        return parent::beforeSave($insert);
    }

    public function afterFind()
    {
        $this->to = Json::decode($this->to);
        $this->reply_to = Json::decode($this->reply_to);
        $this->cc = Json::decode($this->cc);
        $this->bcc = Json::decode($this->bcc);
        $this->from = Json::decode($this->from);
        $this->params = Json::decode($this->params);

        parent::afterFind();
    }

    public function updateStatusTo($status)
    {
        $this->status = $status;

        return $this->updateAttributes(['status']);
    }

    public function logSendingAttempt()
    {
        $this->num_attempts ++;
        $this->last_attempt_at = TimeHelper::createDateObjectFromString('now')->format('U');

        return $this->updateAttributes(['num_attempts', 'last_attempt_at']);
    }

    public function getStatusColor()
    {
        switch ($this->status) {
            case EmailLog::STATUS_SENT:
                $color = 'success';
                break;
            case EmailLog::STATUS_SEND_FAILED:
                $color = 'danger';
                break;
            case EmailLog::STATUS_PENDING:
            default:
                $color = 'light';
        }

        return $color;
    }

    public function getStatusList()
    {
        return [
            EmailLog::STATUS_PENDING => 'Pending',
            EmailLog::STATUS_SENT => 'Sent',
            EmailLog::STATUS_SEND_FAILED => 'Failed',
        ];
    }
}
