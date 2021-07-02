<?php

namespace common\components\actions;

use Yii;
use yii\db\BaseActiveRecord;
use yii\web\Response;
use yii\bootstrap4\ActiveForm;
use common\helpers\FlashHelper;
use common\components\orm\ActiveRecord;

/**
 * Class CreateAction
 */
class CreateAction extends ItemAction
{
    /**
     * @var string the name of the view action.
     */
    public $view = 'create';

    public $modalView = 'create_modal';

    public $redirectUrl;

    /**
     * @var callable
     * The signature of the callable should be:
     *
     * ```php
     * function ($model) {
     *     // $model is the requested model instance.
     *     return $this->redirect(['my-action', 'id' => $model->getPrimaryKey()]);
     * }
     * ```
     */
    public $afterSave;

    /**
     * @return mixed
     */
    public function run()
    {
        $this->checkAccess();

        /** @var ActiveRecord $model */
        $modelClass = $this->modelClass;
        $model = $modelClass::createObject(\Yii::$app->getRequest()->get());
        $model->setScenario($this->scenario);

        $this->controller->getView()->title = "Create new {$model->getPublicName()}";

        if ($model->load(\Yii::$app->getRequest()->post())) {
            if ($model->save()) {

                $message = $this->responseMessage ?: Yii::t('app', '{:model} successfully created!', [':model' => $model->getPublicName()]);

                if (Yii::$app->request->getIsAjax()) {
                    Yii::$app->response->format = Response::FORMAT_JSON;

                    $returnMessage = [
                        'success' => true,
                        'message' => $message
                    ];

                    if (Yii::$app->request->get('returnAttributes', false)) {
                        $attributes = explode(',', Yii::$app->request->get('returnAttributes'));

                        foreach ($attributes as $attribute) {
                            if ($model->hasProperty($attribute)) {
                                $returnMessage['attributes'][$attribute] = $model->{$attribute};
                            } else if ($model->hasAttribute($attribute)) {
                                $returnMessage['attributes'][$attribute] = $model->getAttribute($attribute);
                            } else {
                                $returnMessage['attributes'][$attribute] = null;
                            }
                        }

                    }

                    return $returnMessage;
                }

                FlashHelper::setSuccess($message);

                $afterSave = $this->afterSave;
                if (empty($afterSave)) {
                    $afterSave = function (BaseActiveRecord $model) {
                        return $this->controller->redirect(['update', 'id' => $model->getPrimaryKey()]);
                    };
                }

                return call_user_func($afterSave, $model);
            }

            $errorMessage = Yii::t('app', '{:model} could not be created!', [':model' => $model->getPublicName()]) . '<br>' . implode('<br>', $model->getFirstErrors());

            if (Yii::$app->request->getIsAjax()) {
                Yii::$app->response->format = Response::FORMAT_JSON;

                $returnMessage = [
                    'success' => false,
                    'message' => $errorMessage,
                    'errors' => ActiveForm::validate($model)
                ];
                return $returnMessage;
            }

            FlashHelper::setError($errorMessage);
        }

        $params = $this->resolveParams(['model' => $model]);

        return $this->render($params);
    }

    private function render(array $params = [])
    {
        $view = Yii::$app->request->getIsAjax() ? $this->modalView : $this->view;

        return $this->controller->renderAjaxConditional($view, $params);
    }
}