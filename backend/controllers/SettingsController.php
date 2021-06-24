<?php

namespace backend\controllers;

use common\components\behaviors\PropertyFilter;
use common\components\actions\UpdateAction;
use common\components\controllers\BaseController;
use common\components\controllers\CrudController;
use common\helpers\ArrayHelper;
use common\helpers\RbacHelper;
use common\models\SettingsForm;
use Yii;
use yii\filters\AccessControl;

class SettingsController extends BaseController
{
    public $modelClass = SettingsForm::class;

    public function behaviors()
    {
        return ArrayHelper::merge(parent::behaviors(), [
            'access' => [
                'class' => AccessControl::class,
                'rules' => [
                    [
                        'allow' => true,
                        'roles' => [RbacHelper::ROLE_ADMIN]
                    ]
                ],
            ],
        ]);
    }

    public function actions()
    {
        /* @var SettingsForm $modelClass */
        $modelClass = $this->modelClass;

        return [
            'index' => [
                'class' => UpdateAction::class,
                'modelClass' => $modelClass,
                'view' => 'index',
                'scenario' => $modelClass::SCENARIO_UPDATE,
                'findModel' => function ($id) use ($modelClass) {
                    return new $modelClass();
                },
                'afterUpdate' => function ($model)  {
                    return $this->redirect('/settings');
                }
            ],
        ];
    }

}
