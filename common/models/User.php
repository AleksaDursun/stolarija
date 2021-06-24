<?php

namespace common\models;

use common\components\behaviors\RbacBehavior;
use common\components\image\ImageSpecification;
use common\components\orm\ActiveRecord;
use common\helpers\ArrayHelper;
use Yii;
use yii\base\NotSupportedException;
use yii\behaviors\TimestampBehavior;
use yii\web\IdentityInterface;

/**
 * User model
 *
 * @property integer $id
 * @property string $email
 * @property string $role
 * @property string $username
 * @property string $password_hash
 * @property string $password_reset_token
 * @property string $auth_key
 * @property string $password write-only password
 * @property integer $created_at
 * @property integer $updated_at
 * @property int $created_by
 * @property int $updated_by
 * @property int $is_deleted
 * @property int $is_active
 *
 * @property Profile $profile
 */
class User extends ActiveRecord implements IdentityInterface
{
    const SCENARIO_CHANGE_PASSWORD = 'profile-change-password';
    const SCENARIO_REGISTRATION = 'registration';

    const STATUS_ACTIVE = 1;
    const STATUS_NOT_ACTIVE = 2;

    public $password;
    public $new_password;
    public $password_repeat;
    public $type;

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return '{{%user}}';
    }

    public function rules()
    {
        return ArrayHelper::merge(parent::rules(), [
            [['password', 'new_password', 'password_repeat'], 'required', 'on' => static::SCENARIO_CHANGE_PASSWORD],
            [['password', 'new_password', 'password_repeat'], 'string', 'min' => 6, 'on' => static::SCENARIO_CHANGE_PASSWORD],
            [['new_password'], 'compare', 'compareAttribute' => 'password_repeat', 'operator' => '==', 'on' => static::SCENARIO_CHANGE_PASSWORD],
            [['password'], 'validateChangePassword', 'on' => static::SCENARIO_CHANGE_PASSWORD],
            [['created_at', 'created_by', 'updated_at', 'updated_by', 'is_deleted', 'is_active'], 'integer'],
            [['email', 'username'], 'string', 'max' => 45],
            [['password_hash', 'auth_key', 'password_reset_token'], 'string', 'max' => 255],
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function behaviors()
    {
        return [
            TimestampBehavior::class,
            RbacBehavior::class
        ];
    }

    public function scenarios()
    {
        return ArrayHelper::merge(parent::scenarios(), [
            static::SCENARIO_CHANGE_PASSWORD => ['password', 'new_password', 'password_repeat'],
        ]);
    }

    public function beforeSave($insert)
    {
        if ($this->scenario == static::SCENARIO_CHANGE_PASSWORD) {
            $this->setPassword($this->new_password);
        }

        return parent::beforeSave($insert);
    }

    public function getProfile()
    {
        return $this->hasOne(Profile::class, ['id' => 'profile_id']);
    }

    /**
     * {@inheritdoc}
     */
    public static function findIdentity($id)
    {
        return static::findOne(['id' => $id]);
    }

    /**
     * {@inheritdoc}
     * @return null|User
     */
    public static function findByAuthKey($key)
    {
        return static::findOne(['auth_key' => $key]);
    }

    /**
     * {@inheritdoc}
     */
    public static function findIdentityByAccessToken($token, $type = null)
    {
        throw new NotSupportedException('"findIdentityByAccessToken" is not implemented.');
    }

    /**
     * @param $name
     * @return array|\yii\db\ActiveRecord|null
     */
    public static function findByUsernameOrEmail($name)
    {
        return self::find()
            ->where(['is_active' => self::STATUS_ACTIVE])
            ->andWhere(['OR', ['username' => $name], ['email' => $name]])
            ->one();
    }

    /**
     * Finds user by password reset token
     *
     * @param string $token password reset token
     * @return static|null
     */
    public static function findByPasswordResetToken($token)
    {
        if (!static::isPasswordResetTokenValid($token)) {
            return null;
        }

        return static::findOne([
            'password_reset_token' => $token,
        ]);
    }

    /**
     * Finds out if password reset token is valid
     *
     * @param string $token password reset token
     * @return bool
     */
    public static function isPasswordResetTokenValid($token)
    {
        if (empty($token)) {
            return false;
        }

        $timestamp = (int)substr($token, strrpos($token, '_') + 1);
        $expire = Yii::$app->params['user.passwordResetTokenExpire'];
        return $timestamp + $expire >= time();
    }

    /**
     * {@inheritdoc}
     */
    public function getId()
    {
        return $this->getPrimaryKey();
    }

    /**
     * {@inheritdoc}
     */
    public function getAuthKey()
    {
        return $this->auth_key;
    }

    /**
     * {@inheritdoc}
     */
    public function validateAuthKey($authKey)
    {
        return $this->getAuthKey() === $authKey;
    }

    /**
     * Validates password
     *
     * @param string $password password to validate
     * @return bool if password provided is valid for current user
     */
    public function validatePassword($password)
    {
        return Yii::$app->security->validatePassword($password, $this->password_hash);
    }

    public function validateChangePassword($attribute)
    {
        if (!$this->hasErrors()) {
            if (!$this || !$this->validatePassword($this->password)) {
                $this->addError($attribute, 'Incorrect password.');
            }
        }
    }

    /**
     * Generates password hash from password and sets it to the model
     *
     * @param $password
     * @throws \yii\base\Exception
     */
    public function setPassword($password)
    {
        $this->password_hash = Yii::$app->security->generatePasswordHash($password);
    }

    /**
     * Generates "remember me" authentication key
     */
    public function generateAuthKey()
    {
        $this->auth_key = Yii::$app->security->generateRandomString();
    }

    /**
     * Generates new password reset token
     */
    public function generatePasswordResetToken()
    {
        $this->password_reset_token = Yii::$app->security->generateRandomString() . '_' . time();
    }

    /**
     * Removes password reset token
     */
    public function removePasswordResetToken()
    {
        $this->password_reset_token = null;
    }

    public function getFullName()
    {
        return ArrayHelper::getValue($this, 'profile.fullName', $this->username);
    }

    public function getPhotoUrl($specs = ImageSpecification::THUMB_STANDARD)
    {
        $profile = $this->profile;

        return $profile ? $profile->getPhotoUrl($specs): null;

    }

    public function verifyEmail()
    {
        $this->auth_key = '';
        $this->is_active = self::STATUS_ACTIVE;

        return $this->save();
    }
    public function isUserActive(){
        return true; //ToDo: User active option
    }

}
