<?php
/*
 * Nikola Kukric <info@singularity-solution.com>
 * Company: Singularity Solution <https://singularity-solution.com>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace backend\controllers;

use common\components\actions\SearchAction;
use common\components\controllers\BaseController;
use common\helpers\ArrayHelper;
use common\helpers\RbacHelper;
use common\models\EmailLog;
use common\models\search\EmailLogSearch;
use Yii;
use yii\filters\AccessControl;

class EmailLogController extends BaseController
{
    public $modelClass = EmailLog::class;
    public $searchModelClass = EmailLogSearch::class;

    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::class,
                'rules' => [
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
        return ArrayHelper::merge(parent::actions(), [
            'index' => [
                'class' => SearchAction::class,
                'searchModel' => $this->searchModelClass,
            ],
        ]);
    }




}