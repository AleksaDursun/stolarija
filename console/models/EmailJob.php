<?php
/*
 * Nikola Kukric <info@singularity-solution.com>
 * Company: Singularity Solution <https://singularity-solution.com>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace console\models;

use common\models\EmailLog;
use Yii;
use yii\base\BaseObject;
use yii\base\Exception;
use yii\queue\JobInterface;

/**
 * Class EmailJob
 */
class EmailJob extends BaseObject implements JobInterface
{
    public $emailLogId;

    public function execute($queue)
    {
        $emailLog = EmailLog::findOne($this->emailLogId);

        if (!$emailLog) {
            throw new Exception("Unable to find email to send [ID]: '{$this->emailLogId}'");
        }

        if ($emailLog->status != EmailLog::STATUS_PENDING) {
            return true;
        }

        $emailLog->logSendingAttempt();

        Yii::$app->mailer->view->params['previewText'] = isset($emailLog->params['previewText']) ? $emailLog->params['previewText'] : '' ;

        $mail = Yii::$app->mailer
            ->compose($emailLog->view, $emailLog->params)
            ->setSubject($emailLog->subject)
            ->setFrom($emailLog->from)
            ->setTo($emailLog->to)
            ->setReplyTo($emailLog->reply_to);

        if ($emailLog->attachment_id) {
            $attachment = $emailLog->attachment;
            $mail->attach($attachment->getLocalFilePath(), [
                'fileName' => $attachment->original_name,
                'contentType' => $attachment->mime_type,
            ]);
        }

        try {
            if (!$mail->send()) {
                $emailLog->updateStatusTo(EmailLog::STATUS_SEND_FAILED);

                throw new Exception("Unable to send email [Subject]: '{$emailLog->subject}' to {$emailLog->to}.");
            }
        } catch (Exception $e) {
            Yii::error($e->getMessage());

            throw $e;
        }

        $emailLog->updateStatusTo(EmailLog::STATUS_SENT);

        return true;
    }

}