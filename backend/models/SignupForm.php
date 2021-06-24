<?php

namespace backend\models;

use common\models\Profile;
use common\models\TeamUser;
use Yii;
use yii\base\Model;
use common\models\User;
use yii\db\Exception;


/**
 * Signup form
 *
 * @property TeamUser $teamUser
 */
class SignupForm extends Model
{
    public $firstName;
    public $lastName;

    public $username;
    public $password;
    public $passwordRepeat;
    public $agree;

    public $teamUser;

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['firstName', 'lastName', 'username'], 'trim'],
            [['firstName', 'lastName', 'teamUser', 'username', 'password', 'passwordRepeat'], 'required'],
            [['firstName', 'lastName'], 'string', 'min' => 2, 'max' => 255],

            ['username', 'unique', 'targetClass' => '\common\models\User', 'message' => Yii::t('app', 'This username has already been taken.')],
            ['username', 'string', 'min' => 2, 'max' => 255],

            [['password', 'passwordRepeat'], 'string', 'min' => 6],
            ['passwordRepeat', 'compare', 'compareAttribute' => 'password', 'message' => Yii::t('app', 'Password and repeat password does not match.')],

            [['agree'], 'required', 'requiredValue' => 1, 'message' => Yii::t('app', 'You have to agree with Terms Of Use and Privacy Policy.')]
        ];
    }

    /**
     * @return boolean
     * @throws Exception
     */
    public function signup()
    {
        if (!$this->validate()) {
            return null;
        }

        $teamUser = $this->teamUser;

        $user = new User();
        $user->email = $this->teamUser->invitation_email;
        $user->username = $this->username;
        $user->setPassword($this->password);
        $user->generateAuthKey();

        $profile = new Profile();
        $profile->first_name = $this->firstName;
        $profile->last_name = $this->lastName;

        $transaction = Yii::$app->db->beginTransaction();

        try {

            if (!$user->save()) {
                throw new Exception(Yii::t('app', 'Unable to register user.'));
            }

            if (!$teamUser->acceptInvitationBy($user)) {
                throw new Exception(Yii::t('app', 'Unable to assign user to team.'));
            }

            $profile->link('user', $user);

            $transaction->commit();

        } catch (Exception $e) {
            $this->addError('username', $e->getMessage());

            $transaction->rollBack();

            return false;
        }

        return true;
    }
}
