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
            'manufacturer',
            'description',
            'quantity',
            'category' => function (Product $model) {
                return $model->category_id ? $model->category->name : '';
            },
            'short_description',
            'price' => function (Product $model) {
                return $model->selling_price;
            },
            'discount' => function (Product $model) {
                return $model->sale > 0 ? true : false;
            },
            'discount_price' => function (Product $model) {
                return $this->getProductSellingPrice();
            },
            'is_used'
        ];
    }
}