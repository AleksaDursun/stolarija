<?php

namespace common\models;

use common\components\orm\ActiveRecord;
use Yii;
use yii\db\ActiveQuery;

/**
 * This is the model class for table "category".
 *
 * @property int $id
 * @property string $name
 * @property string $name_de
 * @property string $name_en
 * @property int $parent_category_id
 * @property int|null $is_active
 * @property int|null $sort
 * @property int|null $created_at
 * @property int|null $created_by
 * @property int|null $updated_at
 * @property int|null $updated_by
 * @property int|null $is_deleted
 *
 * @property Product[] $products
 * @property Category $parentCategory
 * @property Category[] $childCategories
 */
class Category extends ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'category';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name'], 'required'],
            [['parent_category_id', 'created_at', 'created_by', 'updated_at', 'updated_by',
                'is_deleted', 'is_active', 'sort'], 'integer'],
            [['name', 'name_en', 'name_de'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Ime',
            'name_en' => 'Ime na engleskom',
            'name_de' => 'Ime na njemackom',
            'parent_category_id' => 'Parent Category ID',
            'created_at' => 'Created At',
            'created_by' => 'Created By',
            'updated_at' => 'Updated At',
            'updated_by' => 'Updated By',
            'is_deleted' => 'Is Deleted',
        ];
    }

    /**
     * Gets query for [[Products]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getProducts()
    {
        return $this->hasMany(Product::class, ['category_id' => 'id']);
    }

    public function getParentCategory()
    {
        return $this->hasOne(Category::class, ['id' => 'parent_category_id']);
    }

    public function getChildCategories()
    {
        return $this->hasMany(Category::class, ['parent_category_id' => 'id']);
    }

    public function getCategoriesWithoutParents()
    {
        return Category::find()
            ->andWhere(['not', ['parent_category_id' => null]])
            ->column();
    }


    public function getRecursiveChildren()
    {
        $models=[];
        $childCategories = $this->getChildCategories()->all();
        Yii::createObject(ActiveQuery::class, [get_called_class()])->findWith(['childCategories'], $childCategories);
        if(is_array($childCategories)&&count($childCategories)>0)
            foreach ($childCategories as $item)
            {
                $models[]= $item;
                $models=array_merge($models, $item->getRecursiveChildren());
            }
        return $models;
    }

    public function getRecursiveChildrenArray()
    {
        $childs = [];
        foreach ($this->getRecursiveChildren() as $child) {
            $childs[] = [
                'id' => $child->id,
                'name' => $child->name,
            ];
        }

        return $childs;
    }

    public function getRecursiveChildrenIds()
    {
        $childs = [];
        foreach ($this->getRecursiveChildren() as $child) {
            $childs[] =  $child->id;
        }

        return $childs;
    }
}
