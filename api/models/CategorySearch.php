<?php


namespace api\models;


use yii\data\ActiveDataProvider;
use yii\data\SqlDataProvider;

class CategorySearch extends \common\models\search\CategorySearch
{
    public $search;
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id'], 'integer'],
            [['search'], 'safe'],
        ];
    }

    public function search($params)
    {

        $query = Category::find();

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'sort'=> ['defaultOrder' => ['sort' => SORT_ASC]]
        ]);

        $this->load($params, '');

        if (!$this->validate()) {
            return $dataProvider;
        }

        $query->andFilterWhere([
            'id' => $this->id,
        ]);

        $query->andWhere(['parent_category_id' => null]);
        $query->andWhere(['is_active' => 1]);


        if ($this->search) {
            $query->andWhere(['like', 'name', $this->search]);
        }

        return $dataProvider;
    }
}