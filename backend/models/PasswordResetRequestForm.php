<?php

namespace backend\models;

use common\components\orm\Model;
use Yii;
use common\models\User;

/**
 * Password reset request form
 */
class PasswordResetRequestForm extends Model
{
    public $email;


    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            ['email', 'trim'],
            ['email', 'required'],
            ['email', 'email'],
            ['email', 'exist',
                'targetClass' => '\common\models\User',
                'message' => 'There is no user with this email address.'
            ],
        ];
    }

    /**
     * Sends an email with a link, for resetting the password.
     *
     * @return bool whether the email was send
     */
    public function sendEmail()
    {
        /* @var $user User */
        $user = User::findOne([
            'email' => $this->email,
        ]);

        if (!$user) {
            return false;
        }

        if (!User::isPasswordResetTokenValid($user->password_reset_token)) {
            $user->generatePasswordResetToken();
            if (!$user->save()) {
                return false;
            }
        }

        return Yii::$app
            ->mailer
            ->compose('password-reset', [
                'model' => $user,
                'options' => [
                    'title' => Yii::t('app', 'Reset password')
                ]])
            ->setFrom([Yii::$app->params['support.email'] => Yii::t('app', 'Chicago Oglasi')])
            ->setTo($this->email)
            ->setSubject(Yii::t('app', 'Chicago Oglasi Password Reset'))
            ->send();

    }

    public function sendEmailByAdmin($email)
    {
        /* @var $user User */
        $user = User::findOne([
            'email' => $email,
        ]);

        if (!$user) {
            return false;
        }

        if (!User::isPasswordResetTokenValid($user->password_reset_token)) {
            $user->generatePasswordResetToken();
            if (!$user->save()) {
                return false;
            }
        }

        return Yii::$app
            ->mailer
            ->compose('password-reset', [
                'model' => $user,
                'options' => [
                    'title' => Yii::t('app', 'Reset password')
                ]])
            ->setFrom([Yii::$app->params['support.email'] => Yii::t('app', 'Chicago Oglasi')])
            ->setTo($email)
            ->setSubject(Yii::t('app', 'Chicago Oglasi Password Reset'))
            ->send();

    }

}
