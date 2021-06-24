<?php
/**
 * Nikola Jankovic  <hello@singularity.is>
 * Company: Singularity Solution <https://singularity.is>
 */

namespace common\models\search;


use common\helpers\NotificationHelper;
use common\helpers\TimeHelper;
use common\models\Notification;
use yii\data\ActiveDataProvider;

/**
 * Class NotificationSearch
 * @package common\models\search
 *
 * @property string $date_range
 * @property int $year
 * @property int $month
 */
class NotificationSearch extends Notification
{
    public $property_id;
    public $year;
    public $month;
    public $date_range;

    public function init()
    {
        $this->year = date('Y');
        $this->month = date('n');

        parent::init();
    }

    public function rules()
    {
        return [
            [['date_range', 'year', 'month', 'receiver_id', 'model_id', 'model_name', 'title', 'type', 'is_read', 'message', 'created_at', 'updated_at'], 'safe'],
        ];
    }

    public function search($params)
    {
        $this->load($params);

        if (!$this->validate()) {
            return new ActiveDataProvider();
        }
        return new ActiveDataProvider([
            'query' => $this->getSearchQuery(),
            'pagination' => [
                'pageSizeLimit' => [10, 200],
                'pageSize' => 30,
            ],
            'sort' => ['defaultOrder' => ['created_at' => SORT_DESC]],
        ]);
    }

    protected function getQuery()
    {
        return self::find();
    }

    private function getSearchQuery()
    {
        $query = Notification::find();

        if ($this->date_range) {
            $to = TimeHelper::formatAsSqlDate($this->getToDate());
            $from = TimeHelper::formatAsSqlDate($this->getFromDate());
            $query->andFilterWhere(['BETWEEN', 'DATE(FROM_UNIXTIME(created_at))', $from, $to]);
        } else {
            $query->andFilterWhere([
                'YEAR(FROM_UNIXTIME(created_at))' => $this->year,
                'MONTH(FROM_UNIXTIME(created_at))' => $this->month
            ]);
        }

        $query->andFilterWhere([
            'is_read' => $this->is_read,
            'receiver_id' => $this->receiver_id,
        ]);

        $query->andFilterWhere(['<>', 'type', NotificationHelper::TYPE_CESSION_SIGNATURE_REQUIRED]);

        return $query;
    }

    public function getUnreadCount()
    {
        return $this->getSearchQuery()->andWhere(['is_read' => 0])->count();
    }

    private $_fromDate;
    private $_toDate;

    public function getFromDate()
    {
        if (empty($this->_fromDate)) {
            $this->setRangeDates();
        }

        return $this->_fromDate;
    }

    public function getToDate()
    {
        if (empty($this->_toDate)) {
            $this->setRangeDates();
        }

        return $this->_toDate;
    }

    protected function setRangeDates()
    {
        if ($this->date_range) {
            list($from, $to) = explode(' - ', $this->date_range);
            $this->_toDate = $to;
            $this->_fromDate = $from;
        }
    }

}