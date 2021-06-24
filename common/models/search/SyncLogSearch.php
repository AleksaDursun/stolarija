<?php

namespace common\models\search;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use common\models\SyncLog;

/**
 * SyncLogSearch represents the model behind the search form of `\common\models\SyncLog`.
 */
class SyncLogSearch extends SyncLog
{
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id', 'run_time', 'updated_items', 'created_new_items'], 'integer'],
            [['command', 'status', 'exception'], 'safe'],
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

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params)
    {
        $query = SyncLog::find();

        // add conditions that should always apply here

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        $this->load($params);

        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }

        // grid filtering conditions
        $query->andFilterWhere([
            'id' => $this->id,
            'run_time' => $this->run_time,
            'updated_items' => $this->updated_items,
            'created_new_items' => $this->created_new_items,
        ]);

        $query->andFilterWhere(['like', 'command', $this->command])
            ->andFilterWhere(['like', 'status', $this->status])
            ->andFilterWhere(['like', 'exception', $this->exception]);

        return $dataProvider;
    }
}
