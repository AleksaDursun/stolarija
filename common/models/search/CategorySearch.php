<?php

namespace common\models\search;


use common\models\Category;
use yii\data\ActiveDataProvider;

class CategorySearch extends Category
{
    public function rules()
    {
        return [
            [['name',], 'safe']
        ];
    }

    public function search($params)
    {
        $query = Category::find();

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'sort'=> ['defaultOrder' => ['sort' => SORT_ASC]]
        ]);

        $this->load($params);

        if (!$this->validate()) {
            return $dataProvider;
        }

        $query->andFilterWhere(['like', 'name', $this->name]);

        return $dataProvider;
    }
}