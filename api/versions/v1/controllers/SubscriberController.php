<?php
/*
 * Nikola Kukric <info@singularity.is>
 * Company: Singularity Solution <https://singularity.is>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace api\versions\v1\controllers;

use api\components\responses\ErrorResponse;
use api\components\responses\SuccessResponse;
use api\components\web\BaseApiController;
use api\models\Subscriber;
use common\helpers\ArrayHelper;
use Faker\Provider\Base;
use Yii;
use yii\rest\Controller;
use yii\rest\OptionsAction;
use yii\web\UploadedFile;

/**
 * Class FuelController
 * @package api\versions\v1\controllers
 *
 */
class SubscriberController extends BaseApiController
{

    public $modelClass = Subscriber::class;
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

    /**
     * @rest\endpoint /subscribers
     * @rest\method POST Create
     * @rest\description Create fuel model
     * @rest\tags Fuel
     * @rest\body FuelModel body
     * @rest\consumes application/json
     * @rest\consumes application/xml
     * @rest\produces application/json
     * @rest\produces application/xml
     * @rest\response 200 allof(SuccessResponse,object(data:FuelModel))
     * @rest\response 400 ErrorResponse
     */
    public function actionCreate()
    {

        $request = Yii::$app->request->getBodyParams();

        $model = new Subscriber();
        $model->load($request, '');


        if ($model->save()) {
            $model->sendEmail();
            return (new SuccessResponse($model))->asArray();
        }

        return (new ErrorResponse($model->getFirstErrors()))->asArray();

    }

}
