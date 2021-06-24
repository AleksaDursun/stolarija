<?php
/*
 * Nikola Kukric <info@singulaity.is>
 * Company: Singularity Solution <https://singulaity.is>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace common\components\controllers;

use common\components\actions\SearchAction;
use common\helpers\RbacHelper;
use notes\components\actions\ListAction;
use Yii;
use yii\filters\AccessControl;
use yii\filters\VerbFilter;
use yii\helpers\ArrayHelper;
use common\components\actions\CreateAction;
use common\components\actions\ViewAction;
use common\components\actions\UpdateAction;
use common\components\actions\DeleteAction;

/**
 * Class CrudController
 *
 */
class CrudController extends BaseController
{

    public function extendedBehaviors()
    {
        return [
            'verbs' => [
                'class' => VerbFilter::class,
                'actions' => [
                    'delete' => ['POST'],
                ],
            ],
            'access' => [
                'class' => AccessControl::class,
                'rules' => [
                    [
                        'allow' => true,
                        'actions' => ['notes'],
                        'roles' => ['@'],
                    ],
                    [
                        'allow' => true,
                        'roles' => [RbacHelper::ROLE_ADMIN],
                    ]
                ],
            ],
        ];
    }

    public function actions()
    {
        /* @var $modelClass \common\components\orm\ActiveRecord */
        $modelClass = $this->modelClass;

        return ArrayHelper::merge([
            'index' => [
                'class' => SearchAction::class,
                'searchModel' => $this->searchModelClass,
            ],
            'create' => [
                'class' => CreateAction::class,
                'modelClass' => $modelClass,
                'scenario' => $modelClass::SCENARIO_CREATE
            ],
            'view' => [
                'class' => ViewAction::class,
                'modelClass' => $modelClass,
            ],
            'update' => [
                'class' => UpdateAction::class,
                'modelClass' => $modelClass,
                'scenario' => $modelClass::SCENARIO_UPDATE,
                'findModel' => function ($id) {
                    return $this->findModel($id);
                }
            ],
            'delete' => [
                'class' => DeleteAction::class,
                'modelClass' => $modelClass,
            ],
            'notes' => [
                'class' => ListAction::class,
                'modelClass' => $modelClass,
                'createRedirectRoute' => "{$this->id}/notes",
                'panelOptions' => [
                    'title' => function ($model) {
                        return Yii::t('app', '{:object} notes:', [':object' => $model->name]);
                    },
                ]
            ],
        ], $this->extendedActions());
    }

    public function extendedActions() {
        return [];
    }

}
