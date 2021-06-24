<?php
/**
 * Nikola Kukric <info@singularity-solution.com>
 * Company: Singularity Solution <https://singularity-solution.com>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace common\models\search;


use common\helpers\TimeHelper;
use common\models\EmailLog;
use yii\data\ActiveDataProvider;

class EmailLogSearch extends EmailLog
{
    public $date_from;
    public $date_to;

    public function rules()
    {
        return [
            [['subject', 'date_from', 'date_to', 'to', 'from', 'cc', 'bcc', 'status'], 'safe']
        ];
    }

    public function search($params = [])
    {
        $query = EmailLog::find();

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'sort' => ['defaultOrder' => ['id' => SORT_DESC]],
            'pagination' => ['pageSize' => 20],
        ]);

        $this->load($params);

        if (!$this->validate()) {
            return $dataProvider;
        }

        $query->andFilterWhere([
            'id' => $this->id,
            'status' => $this->status,
        ]);

        $query->andFilterWhere(['LIKE', 'subject', $this->subject]);
        $query->andFilterWhere(['LIKE', 'to', $this->to]);

        if ($fromTimestamp = $this->getTimestampOf('date_from', false)) {
            $query->andFilterWhere(['>=', 'created_at', $fromTimestamp]);
        }

        if ($toTimestamp = $this->getTimestampOf('date_to', true)) {
            $query->andFilterWhere(['<=', 'created_at', $toTimestamp]);
        }

        return $dataProvider;
    }

    private function getTimestampOf(string $attribute, $eod = false)
    {
        if (!$this->{$attribute}) {
            return null;
        }

        $date = TimeHelper::createDateObjectFromString($this->{$attribute});

        if ($eod) {
            $date->modify('+1 day');
        }

        return $date->format('U');
    }

}