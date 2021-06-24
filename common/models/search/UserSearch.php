<?php
/**
 * Nikola Jankovic  <hello@singularity.is>
 * Company: Singularity Solution <https://singularity.is>
 */

namespace common\models\search;


use common\models\User;
use yii\data\ActiveDataProvider;

class UserSearch extends User
{
    public function rules()
    {
        return [
            [['email', 'username',], 'safe']
        ];
    }

    public function search($params)
    {
        $query = User::find();

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        $this->load($params);

        if (!$this->validate()) {
            return $dataProvider;
        }

        $query->andFilterWhere([
            'id' => $this->id,
            'email' => $this->email,
            'username' => $this->username,
        ]);

        return $dataProvider;
    }

}