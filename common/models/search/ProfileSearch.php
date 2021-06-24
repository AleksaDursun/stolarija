<?php
/**
 * Nikola Jankovic  <hello@singularity.is>
 * Company: Singularity Solution <https://singularity.is>
 */

namespace common\models\search;


use common\models\Profile;
use yii\data\ActiveDataProvider;

class ProfileSearch extends Profile
{
    public function rules()
    {
        return [
            [['first_name', 'last_name'], 'safe']
        ];
    }

    public function search($params)
    {
        $query = Profile::find();

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        $this->load($params);

        if (!$this->validate()) {
            return $dataProvider;
        }

        $query->andFilterWhere([
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
        ]);

        return $dataProvider;
    }

}