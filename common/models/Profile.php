<?php

namespace common\models;

use common\components\behaviors\AuditBehavior;
use common\components\behaviors\UploadableBehavior;
use common\components\image\ImageSpecification;
use common\components\orm\ActiveRecord;
use common\helpers\ArrayHelper;
use Yii;
use yii\db\Exception;
use yii\helpers\Url;

/**
 * This is the model class for table "profile".
 *
 * @property int $id
 * @property int $image_id
 * @property int $address_id
 * @property string $first_name
 * @property string $last_name
 * @property string $status
 * @property string $email
 * @property string $phone
 * @property int $created_at
 * @property int $created_by
 * @property int $updated_at
 * @property int $updated_by
 * @property int $is_deleted
 *
 * @property string $streetAddress
 * @property string $city
 * @property string $state
 * @property string $zipcode
 *
 * @property Image $image
 * @property User $user
 * @property Address $address
 */
class Profile extends ActiveRecord
{
    const SCENARIO_PROFILE_PHOTO_UPLOAD = 'profile-photo-upload';

    public $image_file;
    public $streetAddress;
    public $city;
    public $state;
    public $zipcode;

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'profile';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['first_name', 'last_name'], 'required'],
            [['image_file'], 'required', 'on' => static::SCENARIO_PROFILE_PHOTO_UPLOAD],
            [['image_id', 'created_at', 'created_by', 'updated_at', 'updated_by', 'is_deleted'], 'integer'],
            [['streetAddress', 'city', 'state', 'zipcode'], 'string'],
            [['first_name', 'last_name', 'status', 'phone'], 'string', 'max' => 45],
            [['image_file'], 'file', 'extensions' => 'jpg, png'],
            [['image_id'], 'exist', 'skipOnError' => true, 'targetClass' => Image::class, 'targetAttribute' => ['image_id' => 'id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return ArrayHelper::merge(parent::behaviors(), [
//            'auditable' => [
//                'class' => AuditBehavior::class,
//                'ignoredAttributes' => [
//                    'id', 'created_at', 'updated_at'
//                ]
//            ],
            'storeable' => [
                'class' => UploadableBehavior::class,
                'imageAttributes' => ['image_id' => 'image_file'],
            ],
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'user_id' => Yii::t('app', 'User ID'),
            'image_id' => Yii::t('app', 'Image ID'),
            'image_file' => Yii::t('app', 'Profile image'),
            'streetAddress' => Yii::t('app', 'Address'),
            'first_name' => Yii::t('app', 'First Name'),
            'last_name' => Yii::t('app', 'Last Name'),
            'status' => Yii::t('app', 'Status'),
            'email' => Yii::t('app', 'Email'),
            'phone' => Yii::t('app', 'Phone'),
            'created_at' => Yii::t('app', 'Created At'),
            'created_by' => Yii::t('app', 'Created By'),
            'updated_at' => Yii::t('app', 'Updated At'),
            'updated_by' => Yii::t('app', 'Updated By'),
            'is_deleted' => Yii::t('app', 'Is Deleted'),
        ];
    }

    public function afterFind()
    {
        if ($address = $this->address) {
            $this->streetAddress = $address->address;
            $this->city = $address->city;
            $this->state = $address->state;
            $this->zipcode = $address->zipcode;
        }

        parent::afterFind();
    }

    public function save($runValidation = true, $attributeNames = null)
    {
        $transaction = Yii::$app->db->beginTransaction();

        try {

            $address = $this->address ?: new Address();
            $address->address = $this->streetAddress;
            $address->city = $this->city;
            $address->state = $this->state;
            $address->zipcode = $this->zipcode;

            if (!$address->save()) {
                throw new Exception('Unable to save profile address.');
            }

            $this->address_id = $address->id;

            if (!parent::save($runValidation, $attributeNames)) {
                throw new Exception('Unable to update profile.');
            }

            $transaction->commit();

        } catch (Exception $e) {
            $this->addError('streetAddress', $e->getMessage());

            $transaction->rollBack();

            return false;
        }

        return true;
    }

    public function getFullName()
    {
        return $this->first_name . ' ' . $this->last_name;
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getImage()
    {
        return $this->hasOne(Image::class, ['id' => 'image_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUser()
    {
        return $this->hasOne(User::class, ['profile_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getAddress()
    {
        return $this->hasOne(Address::class, ['id' => 'address_id']);
    }

    public function getPhotoUrl($specs = ImageSpecification::THUMB_LARGE)
    {
        if ($image = $this->image) {
            return $image->getImageUrl($specs);
        }

        return Url::to('/img/dummy-user-image.png', true);
    }

}
