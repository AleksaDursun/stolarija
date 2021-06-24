<?php

namespace common\models;

use common\components\orm\ActiveRecord;
use Yii;

/**
 * This is the model class for table "address".
 *
 * @property int $id
 * @property string $name
 * @property string $address
 * @property string $city
 * @property string $state
 * @property string $zipcode
 * @property string $lat
 * @property string $long
 * @property int $created_at
 * @property int $created_by
 * @property int $updated_at
 * @property int $updated_by
 * @property int $is_deleted
 *
 * @property Company[] $companies
 * @property LoadCheckpoint[] $loadCheckpoints
 * @property Profile[] $profiles
 * @property Trip[] $trips
 * @property Trip[] $trips0
 */
class Address extends ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'address';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['lat', 'long'], 'number'],
            [['created_at', 'created_by', 'updated_at', 'updated_by', 'is_deleted'], 'integer'],
            [['name', 'city', 'state', 'zipcode'], 'string', 'max' => 45],
            [['address'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'address' => 'Address',
            'city' => 'City',
            'state' => 'State',
            'zipcode' => 'Zipcode',
            'lat' => 'Lat',
            'long' => 'Long',
            'created_at' => 'Created At',
            'created_by' => 'Created By',
            'updated_at' => 'Updated At',
            'updated_by' => 'Updated By',
            'is_deleted' => 'Is Deleted',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCompanies()
    {
        return $this->hasMany(Company::class, ['address_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getLoadCheckpoints()
    {
        return $this->hasMany(LoadCheckpoint::class, ['address_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getProfiles()
    {
        return $this->hasMany(Profile::class, ['address_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTrips()
    {
        return $this->hasMany(Trip::class, ['from_address_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTrips0()
    {
        return $this->hasMany(Trip::class, ['to_address_id' => 'id']);
    }
}
