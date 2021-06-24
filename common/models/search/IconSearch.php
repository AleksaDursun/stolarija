<?php
/*
 * Nikola Kukric <info@singulaity.is>
 * Company: Singularity Solution <https://singulaity.is>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace common\models\search;

use common\models\Icon;
use yii\base\Model;
use yii\data\ActiveDataProvider;

class IconSearch extends Icon
{
    public function rules()
    {
        return [
            [['is_active', 'created_at', 'created_by', 'updated_at', 'updated_by'], 'integer'],
            [['name', 'code'], 'string', 'max' => 255],
            [['group', 'type'], 'string', 'max' => 45],
        ];
    }

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
        $query = Icon::find();

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        $this->load($params);

        if (!$this->validate()) {
            return $dataProvider;
        }

        $query->andFilterWhere([
            'id' => $this->id,
            'type' => $this->type,
            'is_active' => $this->is_active,
            'created_at' => $this->created_at,
            'created_by' => $this->created_by,
            'updated_at' => $this->updated_at,
            'updated_by' => $this->updated_by,
        ]);

        $query->andFilterWhere(['like', 'name', $this->name])
            ->andFilterWhere(['like', 'group', $this->group])
            ->andFilterWhere(['like', 'code', $this->code]);

        return $dataProvider;
    }

}