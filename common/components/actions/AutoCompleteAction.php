<?php

namespace common\components\actions;

use Yii;
use yii\base\InvalidConfigException;
use yii\web\Response;

class AutoCompleteAction extends Action
{
    const LIMIT = 25;

    /**
     * @var \yii\db\ActiveRecord
     */
    public $modelClass;
    /**
     * @var string|array field name for search
     */
    public $field;
    /**
     * @var array - add with models
     */
    public $with = [];
    /**
     * @var int
     */
    public $limit = self::LIMIT;
    /**
     * @var callable - additional search limitation callback
     */
    public $limitSearch;
    /**
     * @var callable - return value callback
     */
    public $returnValue;
    /**
     * @var callable - return value callback
     */
    public $returnValueWrapper;

    /** @var array */
    public $scopes = [];

    public $castToSelect2 = false;

    public $order;

    /**
     * @throws InvalidConfigException
     */
    public function init()
    {
        if ($this->modelClass === null) {
            throw new InvalidConfigException('"modelClass" cannot be empty.');
        }

        if ($this->field === null) {
            throw new InvalidConfigException('"field" cannot be empty.');
        }

        parent::init();
    }

    public function run()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;

        $q = Yii::$app->request->get('query', Yii::$app->request->get('term', ''));
        $except = Yii::$app->request->get('except', '');

        $class = $this->modelClass;
        if (is_array($this->field)) {
            $condition = [];
            $condition[] = 'OR';
            foreach ($this->field as $field) {
                $condition[] = ['LIKE', $field, $q];
            }
        } else {
            $condition = ['LIKE', $this->field, $q];
        }

        $query = $class::find()->andWhere($condition);

        if (!empty($except)) {
            $query->andWhere(['not in', 'id', explode(',', $except)]);
        }
        if ($this->limit) {
            $query->limit($this->limit);
        }

        if (!empty($this->with)) {
            $query->joinWith($this->with);
        }

        foreach ($this->scopes as $scope) {
            if (is_callable($scope)) {
                $scope($query);
            }
        }

        if (is_callable($this->limitSearch)) {
            $user = Yii::$app->user->getIdentity();
            $params = Yii::$app->request->getQueryParams();
            call_user_func_array($this->limitSearch, [&$query, $user, $params]);
        }

        if (!empty($this->order)) {
            $query->orderBy($this->order);
        } elseif (is_array($this->field)) {
            $orderBy = [];
            foreach ($this->field as $field) {
                $orderBy[$field] = SORT_ASC;
            }
            $query->orderBy($orderBy);
        } else {
            $query->orderBy($this->field);
        }

        if (is_callable($this->returnValue)) {
            $result = array_map($this->returnValue, $query->all());
        } else {
            $result = $query->all();
        }

        if (is_callable($this->returnValueWrapper)) {
            $result = call_user_func($this->returnValueWrapper, $result);
        }

        if ($this->castToSelect2) {
            return ['results' => $result];
        }

        return $result;
    }

    protected function getOrderBy()
    {
        if (!empty($this->order)) {
            return $this->order;
        }

        $order = [];

        if (is_array($this->field)) {
            foreach ($this->field as $field) {
                $order[$field] = SORT_ASC;
            }
        } else {
            $order = [$this->field => SORT_ASC];
        }
        return $order;

    }
}
