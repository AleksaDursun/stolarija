<?php


namespace common\helpers;


use common\models\EmailLog;
use Yii;
use yii\base\Exception;
use yii\helpers\Json;

class EmailHelper
{
    public static function addToLog($to, $subject, $view, $params) {
        $emailLog = new EmailLog([
            'to' => $to,
            'reply_to' => Yii::$app->params['reply.email']  ,
            'subject' => $subject,
            'view' => $view,
            'params' => $params
        ]);


        if (!$emailLog->save()) {
            throw new Exception('Unable to save email log. ' . Json::encode($emailLog->getFirstErrors()));
        }

        return $emailLog;
    }
}