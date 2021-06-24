<?php

namespace backend\controllers;

use common\components\actions\AutoCompleteAction;
use common\components\actions\CreateAction;
use common\components\actions\CropAction;
use common\components\actions\CustomToggleAction;
use common\components\actions\SearchAction;
use common\components\actions\ViewAction;
use common\components\controllers\CrudController;
use common\helpers\ArrayHelper;
use common\helpers\RbacHelper;
use common\models\Category;
use common\models\Product;
use common\models\search\CategorySearch;
use yii\db\ActiveQuery;
use yii\db\BaseActiveRecord;
use yii\filters\AccessControl;
use yii\filters\VerbFilter;

/**
 * JobController implements the CRUD actions for Job model.
 */
class CategoryController extends CrudController
{
    public $modelClass = Category::class;
    public $searchModelClass = CategorySearch::class;

    /**
     * {@inheritdoc}
     */
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
            'autocomplete' => [
                'class' => AutoCompleteAction::class,
                'field' => ['name'],
                'modelClass' => $this->modelClass,
                'castToSelect2' => true,
                'returnValue' => function (Category $model) {
                    return [
                        'id' => $model->id,
                        'text' => $model->name
                    ];
                },
            ],
            'status' => [
                'class' => CustomToggleAction::class,
                'modelClass' => $this->modelClass,
                'onValue' => 1,
                'offValue' => 0
            ],
        ]);
    }
}
