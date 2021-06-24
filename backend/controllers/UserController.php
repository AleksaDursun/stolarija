<?php

namespace backend\controllers;


use backend\models\RegistrationForm;
use common\components\actions\AutoCompleteAction;
use common\components\actions\CreateAction;
use common\components\actions\UpdateAction;
use common\components\controllers\CrudController;
use common\helpers\ArrayHelper;

use common\models\search\UserSearch;
use common\models\User;
use Yii;
use yii\db\ActiveQuery;
use yii\db\BaseActiveRecord;
use yii\db\Expression;
use yii\filters\AccessControl;
use yii\web\NotFoundHttpException;

class UserController extends CrudController
{
    public $modelClass = User::class;
    public $searchModelClass = UserSearch::class;

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
            'create' => [
                'class' => CreateAction::class,
                'modelClass' => RegistrationForm::class,
                'scenario' => RegistrationForm::SCENARIO_REGISTRATION,
                'afterSave' => function (BaseActiveRecord $model) {
                    return $this->redirect($model->getPublicUrl());
                }
            ],
            'update' => [
                'class' => UpdateAction::class,
                'modelClass' => RegistrationForm::class,
                'scenario' => RegistrationForm::SCENARIO_UPDATE,
                'findModel' => function ($id) {
                    return RegistrationForm::findOne($id);
                }
            ],

            'autocomplete' => [
                'class' => AutoCompleteAction::class,
                'field' => ['profile.first_name', 'profile.last_name', 'user.email', 'user.username'],
                'order' => 'fullName',
                'modelClass' => $this->modelClass,
                'castToSelect2' => true,
                'with' => ['profile'],
                'scopes' => [function (ActiveQuery $query) {
                    $query->select(['user.*', new Expression("IF(profile.first_name IS NULL OR profile.first_name = '', user.email, CONCAT(profile.first_name, ' ', profile.last_name)) AS fullName")]);
                }],
                'returnValue' => function (User $model) {
                    return [
                        'id' => $model->id,
                        'text' => $model->getFullName()
                    ];
                },
            ],
            'change-password' => [
                'class' => UpdateAction::class,
                'modalView' => 'change_password_modal',
                'scenario' => User::SCENARIO_CHANGE_PASSWORD,
                'findModel' => function () {
                    if ($model = User::findOne(Yii::$app->user->id)) {
                        return $model;
                    }
                    throw new NotFoundHttpException('The requested page does not exist.');
                }
            ],
        ]);
    }


}
