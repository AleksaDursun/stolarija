<?php
/**
 * Nikola Kukric <hola@2amigos.us>
 * Company: 2amigOS! <https://2amigos.us>.
 */

namespace common\components\actions;

use Yii;
use yii\web\Response;
use yii\base\InvalidConfigException;

/**
 *
 * Class ToggleAction
 *
 */
class ToggleAction extends ItemAction
{
    /**
     * @var string|int|bool what to set active models to
     */
    public $onValue = 1;

    /**
     * @var string|int|bool what to set inactive models to
     */
    public $offValue = 0;

    /**
     * @var string|array URL to redirect to
     */
    public $redirect;

    /**
     * @inheritdoc
     */
    public function init()
    {
        parent::init();

        if ($this->modelClass === null) {
            throw new InvalidConfigException('The "modelClass" property must be set.');
        }
    }

    /**
     * @param $id
     * @param $attribute
     * @return array|\yii\web\Response
     * @throws InvalidConfigException
     * @throws \yii\web\NotFoundHttpException
     */
    public function run($id, $attribute)
    {
        $this->checkAccess();

        $model = $this->findModel($id);
        $model->setScenario($this->scenario);

        if (!$model->hasAttribute($attribute)) {
            throw new InvalidConfigException("Attribute doesn't exist.");
        }

        $model->$attribute = $model->$attribute == $this->onValue ? $this->offValue : $this->onValue;

        if ($model->update(false, [$attribute])) {
            if (!empty($this->afterSave)) {
                return call_user_func($this->afterSave, $model);
            }

            if (Yii::$app->request->getIsAjax()) {
                Yii::$app->response->format = Response::FORMAT_JSON;

                return [
                    'success' => true,
                    'message' => Yii::t('app', '{:model} successfully toggled!', [':model' => $model->getPublicName()])
                ];
            }
        }
    }
}