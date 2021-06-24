<?php

namespace common\models\search;

use common\helpers\ArrayHelper;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use common\models\Product;

/**
 * ProductSearch represents the model behind the search form of `\common\models\Product`.
 */
class ProductSearch extends Product
{

    public $price_to, $price_from, $selling_price_from, $selling_price_to, $category_name;
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id', 'image_id', 'quantity', 'is_on_auction', 'is_active', 'created_at', 'created_by', 'updated_at', 'updated_by', 'is_deleted'], 'integer'],
            [['image_url', 'name', 'code', 'short_description', 'description', 'category_name', 'company'], 'safe'],
            [['price', 'retail_price', 'price_from', 'selling_price_from', 'price_to', 'selling_price_to'], 'number'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }

    public function attributeLabels()
    {
        return ArrayHelper::merge(parent::attributeLabels(),
            [
                'price_from' => 'Cijena od',
                'price_to' => 'Cijena do',
                'selling_price_from' => 'Prodajna cijena od',
                'selling_price_to' => 'Prodajna cijena do',
                'category_name' => 'Kategorija'
            ]);
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params)
    {
        $query = Product::find();

        // add conditions that should always apply here

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'sort'=> ['defaultOrder' => ['id' => SORT_DESC]]]);

        $this->load($params);

        if (!$this->validate()) {
            return $dataProvider;
        }

        // grid filtering conditions
        $query->andFilterWhere([
            'id' => $this->id,
            'image_id' => $this->image_id,
            'quantity' => $this->quantity,
            'is_on_auction' => $this->is_on_auction,
            'product.is_active' => $this->is_active,
            'price' => $this->price,
            'retail_price' => $this->retail_price,
            'created_at' => $this->created_at,
            'created_by' => $this->created_by,
            'updated_at' => $this->updated_at,
            'updated_by' => $this->updated_by,
            'is_deleted' => $this->is_deleted,
            'company' => $this->company
        ]);

        $query->andFilterWhere(['like', 'image_url', $this->image_url])
            ->andFilterWhere(['like', 'product.name' , '%' . $this->name . '%', false])
            ->andFilterWhere(['like', 'code', $this->code])
            ->andFilterWhere(['like', 'short_description', $this->short_description])
            ->andFilterWhere(['like', 'description', $this->description]);

        if($this->price_from) {
            $query->andWhere(['>', 'price', $this->price_from]);
        }

        if($this->selling_price_from) {
            $query->andWhere(['>', 'retail_price', $this->selling_price_from]);
        }

        if($this->price_to) {
            $query->andWhere(['<', 'price', $this->price_to]);
        }

        if($this->selling_price_to) {
            $query->andWhere(['<', 'retail_price', $this->selling_price_to]);
        }

        if($this->category_name) {
            $query->joinWith('category')->andFilterWhere(['like', 'category.name', '%' . $this->category_name . '%', false]);
        }


        return $dataProvider;
    }
}
