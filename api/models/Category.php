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
            'name_en',
            'name_de',
            'sub_category' => function (Category $model) {
                return $model->getRecursiveChildrenArray();
            }
        ];
    }
}
