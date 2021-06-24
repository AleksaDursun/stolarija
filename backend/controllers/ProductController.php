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
use common\models\Product;
use common\models\search\PostSearch;
use common\models\search\ProductSearch;
use common\models\search\TeamSearch;
use common\models\Team;
use Yii;
use yii\filters\AccessControl;


/**
 * PublicationController implements the CRUD actions for Publication model.
 */
class ProductController extends CrudController
{
  public $modelClass = Product::class;
  public $searchModelClass = ProductSearch::class;

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
      'status' => [
        'class' => CustomToggleAction::class,
        'modelClass' => $this->modelClass,
        'onValue' => Product::STATUS_ACTIVE,
        'offValue' => Product::STATUS_NOT_ACTIVE
      ],
      'carousel' => [
        'class' => CustomToggleAction::class,
        'modelClass' => $this->modelClass,
        'onValue' => Product::STATUS_ACTIVE,
        'offValue' => Product::STATUS_NOT_ACTIVE
      ],
    ]);
  }

}
