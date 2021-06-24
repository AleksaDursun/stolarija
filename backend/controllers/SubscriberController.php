<?php

namespace backend\controllers;

use common\components\actions\CustomToggleAction;
use common\components\controllers\CrudController;
use common\helpers\ArrayHelper;
use Yii;
use common\models\Subscriber;
use common\models\search\SubscriberSearch;
use yii\filters\AccessControl;


/**
 * SubscriberController implements the CRUD actions for Subscriber model.
 */
class SubscriberController extends CrudController
{
    public $modelClass = Subscriber::class;
    public $searchModelClass = SubscriberSearch::class;

    public function behaviors()
    {
        return ArrayHelper::merge(parent::behaviors(),
            [
                'access' => [
                    'class' => AccessControl::class,
                    'rules' => [
                        [
                            'allow' => true,
                            'roles' => ['@'],
                        ]
                    ],
                ],
            ]
        );
    }

    public function actions()
    {
        return ArrayHelper::merge(parent::actions(), [
            'toggle' => [
                'class' => CustomToggleAction::class,
                'modelClass' => $this->modelClass,
                'onValue' => 1,
                'offValue' => 0
            ]
        ]);
    }

}
