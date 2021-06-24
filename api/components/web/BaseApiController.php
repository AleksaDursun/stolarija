<?php

/*
 * Nikola Kukric <info@singularity.is>
 * Company: Singularity Solution <https://singularity.is>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace api\components\web;

use common\components\orm\ActiveRecord;
use yii\filters\Cors;
use yii\filters\VerbFilter;
use yii\rest\ActiveController;
use yii\rest\OptionsAction;
use yii\web\NotFoundHttpException;

abstract class BaseApiController extends ActiveController
{
    public $findModel = null;
    public $modelClass;
    public $guestActions = [];

    /**
     * Override parent behaviors to ensure certain order on filters
     * @inheritdoc
     */
    public function behaviors()
    {
        return [
            'corsFilter' => [
                'class' => Cors::class,
                'cors' => [
                    'Origin' => ['*'],
                    'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
                    'Access-Control-Request-Headers' => ['*'],
                    'Access-Control-Allow-Credentials' => null,
                    'Access-Control-Max-Age' => 86400,
                    'Access-Control-Expose-Headers' => ['X-Pagination-Total-Count', 'X-Pagination-Page-Count', 'X-Pagination-Current-Page', 'X-Pagination-Per-Page'],
                ]
            ],
            'verbFilter' => [
                'class' => VerbFilter::class,
                'actions' => $this->verbs(),
            ],
        ];
    }

    /**
     * @return array the access rules
     */
    public function accessRules()
    {
        return [
            [
                'allow' => true,
                'roles' => ['*'],
            ]
        ];
    }

    public function actions()
    {
        return array_merge(parent::actions(), [
            'options' => [
                'class' => OptionsAction::class
            ]
        ]);
    }

    protected function findModel($id)
    {
        if ($this->findModel !== null) {
            return call_user_func($this->findModel, $id, $this);
        }

        /* @var $modelClass ActiveRecord */
        $modelClass = $this->modelClass;
        $model = $modelClass::findOne((int) $id);

        if (empty($model)) {
            throw new NotFoundHttpException("Object not found: $id");
        }

        return $model;
    }


}
