<?php

namespace backend\controllers;

use common\components\behaviors\PropertyFilter;
use common\helpers\RbacHelper;
use common\models\OnlineTravelAgent;
use common\models\search\ArrivalSearch;
use common\models\search\OnlineTravelAgentSearch;
use backend\models\DashboardForm;
use Yii;
use yii\filters\AccessControl;
use common\components\controllers\BaseController;

class DashboardController extends BaseController
{
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::class,
                'only' => ['index'],
                'rules' => [
                    [
                        'actions' => ['index'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
        ];
    }

    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
                'layout' => 'login',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }

    public function actionIndex()
    {
        $model = new DashboardForm();
        $model->load(Yii::$app->request->get());

        return $this->renderAjaxConditional('index', [
            'model' => $model
        ]);
    }

}
