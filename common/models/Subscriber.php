<?php

namespace common\models;

use common\components\orm\ActiveRecord;
use common\helpers\EmailHelper;
use common\helpers\TripHelper;
use console\models\EmailJob;
use Yii;
use yii\base\Exception;
use yii\helpers\Json;

/**
 * This is the model class for table "subscriber".
 *
 * @property int $id
 * @property string $email
 * @property int|null $is_active
 * @property int|null $created_at
 * @property int|null $created_by
 * @property int|null $updated_at
 * @property int|null $updated_by
 * @property int|null $is_deleted
 */
class Subscriber extends ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'subscriber';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['is_active', 'created_at', 'created_by', 'updated_at', 'updated_by', 'is_deleted'], 'integer'],
            ['email', 'required'],
            ['email', 'email'],
            ['email', 'unique']
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'email' => 'Email',
            'is_active' => 'Aktivan',
            'created_at' => 'Created At',
            'created_by' => 'Created By',
            'updated_at' => 'Updated At',
            'updated_by' => 'Updated By',
            'is_deleted' => 'Is Deleted',
        ];
    }

    public function sendEmail()
    {

        $from = [Yii::$app->params['support.email'] => Yii::$app->params['support.name']];
        $subject = 'Umjetnost u Drvetu - Usješna preplata';
        $replay_to = $from;
        $to = $this->email;
        $params = [
            'email' => $to
        ];
        $view = 'subscribe';


        $mail = Yii::$app->mailer
            ->compose($view, $params)
            ->setSubject($subject)
            ->setFrom($from)
            ->setTo($to)
            ->setReplyTo($replay_to);


        try {
            $emailLog = EmailHelper::addToLog($to, $subject, $view, $params);
            if (!$mail->send()) {
                $emailLog->status = EmailLog::STATUS_SEND_FAILED;
                $emailLog->updateAttributes(['status']);
                throw new Exception("Unable to send email.");
            }

        } catch (Exception $e) {
            $emailLog->status = EmailLog::STATUS_SEND_FAILED;
            $emailLog->last_attempt_at = time();
            $emailLog->updateAttributes(['status', 'last_attempt_at']);
            Yii::error($e->getMessage());
            throw $e;
        }


        $emailLog->status = EmailLog::STATUS_SENT;
        $emailLog->last_attempt_at = time();
        $emailLog->updateAttributes(['status', 'last_attempt_at']);
        return true;

    }
}
