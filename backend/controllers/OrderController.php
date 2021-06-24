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
use common\models\Order;
use common\models\Post;
use common\models\Product;
use common\models\search\OrderSearch;
use common\models\search\PostSearch;
use common\models\search\ProductSearch;
use common\models\search\TeamSearch;
use common\models\Team;
use Yii;
use yii\bootstrap4\ActiveForm;
use yii\filters\AccessControl;
use yii\web\Response;


/**
 * PublicationController implements the CRUD actions for Publication model.
 */
class OrderController extends CrudController
{
    public $modelClass = Order::class;
    public $searchModelClass = OrderSearch::class;

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
        return [
            'index' => [
                'class' => SearchAction::class,
                'searchModel' => $this->searchModelClass,
            ],
        ];
    }

    public function actionStatus($id)
    {
        /** @var Order $model */
        $this->modelClass = Order::class;
        $model = $this->findModel($id);

        $post = \Yii::$app->getRequest()->post($model->formName());
        if ($post && isset($post['status'])) {
            Yii::$app->response->format = Response::FORMAT_JSON;

            return $model->changeStatusTo($post['status']) ? [
                'success' => true,
                'message' => 'Status promjenjen.'
            ] : [
                'success' => false,
                'message' => 'Greska prilikom promjene statusa',
                'errors' => ActiveForm::validate($model)
            ];
        }

        return $this->renderAjaxConditional('status_modal', [
            'model' => $model
        ]);
    }

}