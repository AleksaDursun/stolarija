<?php
/**
 * Nikola Jankovic  <hello@singularity.is>
 * Company: Singularity Solution <https://singularity.is>
 */

namespace backend\controllers;


use common\components\controllers\CrudController;
use common\helpers\ArrayHelper;
use common\helpers\RbacHelper;
use common\models\Message;
use common\models\search\MessageSearch;
use Yii;
use yii\filters\AccessControl;

class MessageController extends CrudController
{
    public $modelClass = Message::class;
    public $searchModelClass = MessageSearch::class;

    public function behaviors()
    {
        return ArrayHelper::merge(parent::behaviors(),
            [
                'access' => [
                    'class' => AccessControl::class,
                    'rules' => [
                        [
                            'actions' => ['index','create', 'update', 'delete'],
                            'allow' => true,
                            'matchCallback' => function ($rule, $action) {
                                return Yii::$app->user->can(RbacHelper::ROLE_ADMIN);
                            }
                        ],
                        [
                            'allow' => true,
                            'roles' => [RbacHelper::ROLE_ADMIN]
                        ]
                    ],
                ],
            ]);
    }

}