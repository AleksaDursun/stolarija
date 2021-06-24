<?php

namespace backend\models;

use common\helpers\RbacHelper;
use common\models\Driver;
use common\models\Profile;
use Yii;
use common\models\User;
use yii\db\Exception;


/**
 * Signup form
 *
 * @property string $streetAddress
 * @property string $city
 * @property string $state
 * @property string $zipcode
 * @property string $first_name
 * @property string $last_name
 * @property string $phone

 *
 */
class RegistrationForm extends User
{
    public $first_name;
    public $last_name;
    public $streetAddress;
    public $city;
    public $zipcode;
    public $state;
    public $phone;


    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['email', 'username', 'role', 'first_name'], 'required'],
            [['email'],'email'],
            [['last_name', 'email', 'username'], 'string', 'max' => 45],
            [['password', 'password_repeat'], 'required', 'on' => static::SCENARIO_REGISTRATION],
            [['password', 'password_repeat'], 'string', 'min' => 6, 'on' => static::SCENARIO_REGISTRATION],
            [['password_repeat'], 'compare', 'compareAttribute' => 'password', 'operator' => '==', 'on' => static::SCENARIO_REGISTRATION],
            ['email', 'unique', 'targetClass' => '\common\models\User', 'on' => static::SCENARIO_REGISTRATION, 'message' => 'User with this email is already registered.'],
            ['username', 'unique', 'targetClass' => '\common\models\User', 'on' => static::SCENARIO_REGISTRATION, 'message' => 'This username has already been taken.'],
            ['username', 'string', 'min' => 2, 'max' => 255],
            [['streetAddress', 'city', 'state', 'zipcode', 'phone', 'last_name'], 'safe'],
        ];
    }


    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'streetAddress' => 'Address',
        ];
    }

    public function afterFind()
    {

        if ($profile = $this->profile) {
            $this->first_name = $profile->first_name;
            $this->last_name = $profile->last_name;
            $this->streetAddress = $profile->streetAddress;
            $this->city = $profile->city;
            $this->state = $profile->state;
            $this->zipcode = $profile->zipcode;
            $this->phone = $profile->phone;
        }

        parent::afterFind();
    }

    public function save($runValidation = true, $attributeNames = null)
    {
        if (empty($this->username)) {
            $this->username = $this->email;
        }

        if (!$this->validate()) {
            return false;
        }

        if (empty($this->password) && $this->scenario == self::SCENARIO_REGISTRATION) {
            $this->setRandomPassword();
        }

        if ($this->password) {
            $this->setPassword($this->password);
            $this->generateAuthKey();
        }

        $profile = $this->profile ?: new Profile();
        $profile->first_name = $this->first_name;
        $profile->last_name = $this->last_name;
        $profile->email = $this->email;
        $profile->streetAddress = $this->streetAddress;
        $profile->city = $this->city;
        $profile->state = $this->state;
        $profile->zipcode = $this->zipcode;
        $profile->phone = $this->phone;

        $transaction = Yii::$app->db->beginTransaction();

        try {
            if (!$profile->save()) {
                throw new Exception('Unable to save profile.<br>', implode('<br>', $profile->getFirstErrors()));
            }

            $this->profile_id = $profile->id;
            if (!parent::save()) {
                throw new Exception('Unable to save user.<br>' . implode('<br>', $this->getFirstErrors()));
            }


            $transaction->commit();

        } catch (Exception $e) {
            $this->addError('username', $e->getMessage());

            $transaction->rollBack();

            return false;
        }

        return true;
    }

    protected function setRandomPassword()
    {
        $this->password = StringHelper::generatePaddedNumber(6);
        $this->password_repeat = $this->password;
    }
}
