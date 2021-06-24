<?php

namespace common\components\actions;


use Yii;
use yii\web\BadRequestHttpException;
use yii\web\Response;

class CustomToggleAction extends \dosamigos\grid\actions\ToggleAction
{
    public $ajaxResponse = true;
    public $responseMessage;

    public function run($id, $attribute)
    {
        if (Yii::$app->request->isAjax) {
            $model = $this->findModel($id);
            $model->setScenario($this->scenario);
            Yii::$app->response->format = Response::FORMAT_JSON;
            if ($this->toggleType == self::TOGGLE_ANY) {
                $model->setAttributes(
                    [$attribute => $model->$attribute == $this->offValue ? $this->onValue : $this->offValue]
                );
                if ($model->validate() && $model->save(false, [$attribute])) {
                    if ($this->ajaxResponse) {
                        Yii::$app->response->format = Response::FORMAT_JSON;

                        return [
                            'success' => true,
                            'message' => $this->responseMessage?: Yii::t('app', '{:model} successfully updated!', [':model' => $model->getPublicName()])
                        ];
                    }

                }
            } elseif ($this->toggleType == self::TOGGLE_UNIQ) {
                if ($model->$attribute == $this->offValue || $this->allowAllOff) {
                    $model->setAttributes(
                        [$attribute => $model->$attribute == $this->offValue ? $this->onValue : $this->offValue]
                    );
                    if ($model->validate()) {
                        /**may  be transaction?**/
                        $model->updateAll([$attribute => $this->offValue]);
                        if ($model->save(false, [$attribute])) {
                            return $this->controller->redirect(['index']);

                        }
                    }
                }
            } else {
                if ($model->$attribute == $this->offValue || $this->allowAllOff) {
                    $cond = is_callable($this->condition) ? call_user_func($this->condition, $model) : $this->condition;
                    $model->setAttributes(
                        [$attribute => $model->$attribute == $this->offValue ? $this->onValue : $this->offValue]
                    );
                    if ($model->validate()) {
                        $model->updateAll([$attribute => $this->offValue], $cond);
                        if ($model->save(false, [$attribute])) {
                            return $this->controller->redirect(['index']);
                        }
                    }
                }
            }

            return ['result' => false, 'errors' => $model->getErrors()];
        }
        throw new BadRequestHttpException(Yii::t('app', 'Invalid request'));
    }

}