<?php


namespace api\models;


use yii\helpers\Url;

class Product extends \common\models\Product
{
    public function fields()
    {
        return [
            'id',
            'image_url' => function (Product $model) {
                return $model->getImageUrl(true);
            },
            'name',
            'name_en',
            'name_de',
            'description',
            'description_de',
            'description_en',
            'category' => function (Product $model) {
                return $model->category_id ? $model->category->name : '';
            },
        ];
    }
}
