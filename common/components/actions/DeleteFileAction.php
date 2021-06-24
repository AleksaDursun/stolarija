<?php
/**
 * Nikola Kukric <hola@2amigos.us>
 * Company: 2amigOS! <https://2amigos.us>.
 */

namespace common\components\actions;

use common\helpers\FlashHelper;
use Yii;
use yii\web\Response;


class DeleteFileAction extends Action
{
    public $model;
    public $relatedIdAttribute;
    public $fileIdAttribute;
    public $successMessage;
    public $errorMessage;
    public $redirectUrl;

    public function run($id, $relatedModelId)
    {
        Yii::$app->response->format = Response::FORMAT_JSON;

        $model = $this->model;

        $relatedModel = $model::find()
            ->where([$this->fileIdAttribute => $id])
            ->andWhere([$this->relatedIdAttribute => $relatedModelId])
            ->one();

        if (!empty($relatedModel)) {
            if ($relatedModel->delete()) {
                FlashHelper::setSuccess($this->successMessage);
                return $this->controller->redirect($this->redirectUrl);
            }
        }

        FlashHelper::setError($this->errorMessage);
        return $this->$this->controller->redirect($this->redirectUrl);
    }
}