<?php


namespace api\models;


use common\models\Category;
use http\QueryString;
use yii\data\ActiveDataProvider;

class ProductSearch extends \common\models\search\ProductSearch
{
    public $isSale;
    public $isCarousel;
    public $search;
    public $disablePagination = false;
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id',], 'integer'],
            [['search', 'disablePagination'], 'safe'],
        ];
    }

    public function search($params)
    {

        $query = Product::find()->joinWith(['category']);

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'pagination' => $this->disablePagination
        ]);

        $this->load($params, '');

        if (!$this->validate()) {
            return $dataProvider;
        }

        $query->andFilterWhere([
            'product.id' => $this->id,
        ]);

        $query->andWhere(['product.is_active' => 1]);

        if ($this->isCarousel=='1') {
            $query->andWhere(['product.is_on_carousel' => 1]);
        }
        else if ($this->isSale=='1') {
            $query->andWhere([ '>', 'product.sale', 0]);
        } else if ($this->search) {
            /**
             * @var $isCategory Category
             */
            $isCategory = Category::find()->andWhere([
                'name' => $this->search
            ])->one();

            if ($isCategory) {
                $ids = $isCategory->getRecursiveChildrenIds();
                $query->andWhere(['OR',
                        ['category.name' => $this->search],
                        ['category.id' => $ids],
                    ]);
            } else {
                $query->andFilterWhere(['OR',
                    ['like', 'product.name', '%' . $this->search . '%', false],
                    ['like', 'product.name_en', '%' . $this->search . '%', false],
                    ['like', 'product.name_de', '%' . $this->search . '%', false],
                    ['like', 'product.description', '%' . $this->search . '%', false],
                    ['like', 'product.description_en', '%' . $this->search . '%', false],
                    ['like', 'product.description_de', '%' . $this->search . '%', false],
                    ['like', 'category.name', '%' . $this->search . '%', false],
                ]);
            }
        }

        return $dataProvider;
    }
}
