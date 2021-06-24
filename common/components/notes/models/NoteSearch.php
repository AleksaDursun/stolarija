<?php
/**
 * Igor Golub <hola@2amigos.us>
 * Company: 2amigOS! <https://2amigos.us>
 */

namespace notes\models;

use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;

/**
 * NoteSearch represents the model behind the search form about `common\modules\notes\models\Note`.
 */
class NoteSearch extends Note
{
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id', 'model_id'], 'integer'],
            [['model_name', 'content'], 'safe'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function scenarios()
    {
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
        $query = Note::find();

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'sort'=> ['defaultOrder' => ['created_at'=>SORT_DESC]],
        ]);

        $this->load($params);

        if (!$this->validate()) {
            $query->where('0=1');

            return $dataProvider;
        }

        $query->andFilterWhere([
            'id' => $this->id,
            'model_id' => $this->model_id,
        ]);

        $query->andFilterWhere(['model_name' => $this->model_name])
            ->andFilterWhere(['like', 'content', $this->content]);

        return $dataProvider;
    }
}
