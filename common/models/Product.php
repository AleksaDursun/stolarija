<?php

namespace common\models;

use common\components\orm\ActiveRecord;
use http\Url;
use Yii;

/**
 * This is the model class for table "product".
 *
 * @property int $id
 * @property int|null $image_id
 * @property int|null $category_id
 * @property string|null $image_url
 * @property string $name
 * @property string $name_en
 * @property string $name_de
 * @property string|null $company
 * @property int|null $is_active
 * @property string|null $description
 * @property string|null $description_en
 * @property string|null $description_de
 * @property int|null $created_at
 * @property int|null $created_by
 * @property int|null $updated_at
 * @property int|null $updated_by
 * @property int|null $is_deleted
 *
 * @property File $image
 * @property Category $category
 */
class Product extends ActiveRecord
{
  const STATUS_ACTIVE = 1;
  const STATUS_NOT_ACTIVE = 0;


  const COMPANY = 'umjetnost-u-drvetu';

  /**
   * {@inheritdoc}
   */
  public static function tableName()
  {
    return 'product';
  }

  /**
   * {@inheritdoc}
   */
  public function rules()
  {
    return [
      [['image_id', 'is_active', 'created_at', 'created_by', 'updated_at', 'updated_by', 'is_deleted', 'category_id'], 'integer'],
      [['name'], 'required'],
      [['description', 'company', 'description_en', 'description_de'], 'string'],
      [['image_url', 'name', 'name_en', 'name_de'], 'string', 'max' => 255],
      [['image_id'], 'exist', 'skipOnError' => true, 'targetClass' => File::className(), 'targetAttribute' => ['image_id' => 'id']],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function attributeLabels()
  {
    return [
      'id' => 'ID',
      'image_id' => 'Image ID',
      'image_url' => 'Image Url',
      'category' => 'Kategorija',
      'name' => 'Naziv',
      'name_en' => 'Naziv na engleskom',
      'name_de' => 'Naziv na njemackom',
      'is_active' => 'Aktivan',
      'company' => 'Lager',
      'description' => 'Detaljan opis',
      'description_en' => 'Detaljan opis na engleskom',
      'description_de' => 'Detaljan opis na njemackom',
      'created_at' => 'Created At',
      'created_by' => 'Created By',
      'updated_at' => 'Updated At',
      'updated_by' => 'Updated By',
      'is_deleted' => 'Is Deleted',
    ];
  }

  /**
   * Gets query for [[Image]].
   *
   * @return \yii\db\ActiveQuery
   */
  public function getImage()
  {
    return $this->hasOne(File::class, ['id' => 'image_id']);
  }


  public function getCategory()
  {
    return $this->hasOne(Category::class, ['id' => 'category_id']);
  }

  public function getOrderItem()
  {
    return $this->hasMany(OrderItem::class, ['product_id' => 'id']);
  }

  private function getNoImagUrl()
  {
    return \yii\helpers\Url::to('/img/no-image.png', true);
  }

  public function getImageUrl($forFrontend = false)
  {
    if ($this->image_id) {
      return $this->image->getUrl($forFrontend);
    } else {
      return $this->image_url ? $this->image_url : $this->getNoImagUrl();
    }
  }

}
