<?php
/**
 * Nikola Jankovic  <hello@singularity.is>
 * Company: Singularity Solution <https://singularity.is>
 */

namespace common\models\search;


use common\models\Message;
use yii\data\ActiveDataProvider;

class MessageSearch extends Message
{
    public function search($params)
    {
        $query = Message::find();

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'pagination' => [
                'pageSizeLimit' => [10, 200],
                'pageSize' => 10
            ],
            'sort' => ['defaultOrder' => ['id' => SORT_DESC]],
        ]);

        $this->load($params);

        if (!$this->validate()) {
            return $dataProvider;
        }

        $dataProvider->query = $this->getQuery();

        return $dataProvider;
    }

    protected function getQuery()
    {
        $query = self::find();

        $query->andWhere(['like', 'translation', '%'.$this->translation.'%', false,]);


        if ($this->source_message) {
            $query->innerJoin('source_message', 'message.id = source_message.id');
            $query->andFilterWhere(['like', 'message', '%'. $this->source_message.'%', false]);
        }

        return $query;

    }

}