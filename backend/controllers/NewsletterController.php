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
use common\models\Newsletter;
use common\models\Order;
use common\models\Post;
use common\models\Product;
use common\models\search\NewslettterSearch;
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
class NewsletterController extends CrudController
{
    public $modelClass = Newsletter::class;
    public $searchModelClass = NewslettterSearch::class;

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

}