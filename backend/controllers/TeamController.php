<?php

namespace backend\controllers;

use common\components\actions\CreateAction;
use common\components\actions\CustomToggleAction;
use common\components\actions\DeleteAction;
use common\components\actions\SearchAction;
use common\components\actions\UpdateAction;
use common\components\actions\ViewAction;
use common\components\controllers\CrudController;
use common\helpers\ArrayHelper;
use common\models\Post;
use common\models\search\PostSearch;
use common\models\search\TeamSearch;
use common\models\Team;
use Yii;
use yii\filters\AccessControl;


/**
 * PublicationController implements the CRUD actions for Publication model.
 */
class TeamController extends CrudController
{
    public $modelClass = Team::class;
    public $searchModelClass = TeamSearch::class;

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
                'onValue' => Post::STATUS_ACTIVE,
                'offValue' => Post::STATUS_NOT_ACTIVE
            ],
            'index' => [
                'class' => SearchAction::class,
                'view' => '/people/index',
                'searchModel' => $this->searchModelClass,
                'limitSearch' => function (Team $model) {
                    $model->type = Yii::$app->controller->id;
                },
            ],
            'create' => [
                'class' => CreateAction::class,
                'modelClass' => $this->modelClass,
                'modalView' => '/people/create_modal',
                'scenario' => $this->modelClass::SCENARIO_CREATE
            ],
            'view' => [
                'class' => ViewAction::class,
                'modelClass' => $this->modelClass,
            ],
            'update' => [
                'class' => UpdateAction::class,
                'modalView' => '/people/update_modal',
                'modelClass' => $this->modelClass,
                'scenario' => $this->modelClass::SCENARIO_UPDATE,
                'findModel' => function ($id) {
                    return $this->findModel($id);
                }
            ],
            'delete' => [
                'class' => DeleteAction::class,
                'modelClass' => $this->modelClass,
            ],
        ]);
    }

}