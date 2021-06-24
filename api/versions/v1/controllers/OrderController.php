<?php
/*
 * Nikola Kukric <info@singularity.is>
 * Company: Singularity Solution <https://singularity.is>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace api\versions\v1\controllers;

use api\components\actions\SearchAction;
use api\components\responses\ErrorResponse;
use api\components\responses\SuccessResponse;
use api\components\web\BaseApiController;
use api\models\Order;
use api\models\Product;
use api\models\ProductSearch;
use api\models\Subscriber;
use common\components\actions\IndexAction;
use Yii;
use yii\rest\OptionsAction;

/**
 * Class FuelController
 * @package api\versions\v1\controllers
 *
 */
class OrderController extends BaseApiController
{

    public $modelClass = Product::class;
    public $enableCsrfValidation = false;

    public function accessRules()
    {
        return [
            [
                'allow' => true,
                'roles' => ['?'],
            ]
        ];
    }

    public function actions()
    {
        return [
            'options' => [
                'class' => OptionsAction::class
            ]
        ];
    }

    public function actionCreate()
    {

        $request = Yii::$app->request->getBodyParams();

        $model = new Order();
        $model->load($request, '');

        if ($model->save()) {
            $model->sendEmail();
            return (new SuccessResponse($model))->asArray();
        }

        return (new ErrorResponse($model->getFirstErrors()))->asArray();

    }

}
