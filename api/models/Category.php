<?php


namespace api\models;


use yii\helpers\Url;

class Category extends \common\models\Category
{


    public function fields()
    {
        return [
            'id',
            'name',
            'have_used_items',
            'sub_category' => function (Category $model) {
                return $model->getRecursiveChildrenArray();
            }
        ];
    }
}