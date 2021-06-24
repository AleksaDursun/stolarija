<?php
/**
 * Nikola Kukric <hola@2amigos.us>
 * Company: 2amigOS! <https://2amigos.us>.
 */

namespace common\components\actions;

use common\models\UploadFileForm;
use Yii;
use yii\web\Response;
use yii\web\UploadedFile;

class UploadFileAction extends Action
{
    public $modelClass;

    public function run($id = null)
    {
        Yii::$app->response->format = Response::FORMAT_JSON;

        $model = new UploadFileForm();

        $model->load(Yii::$app->request->post());
        $model->modelClass = $this->modelClass;
        $model->files = UploadedFile::getInstances($model, 'files');

        if ($model->save()) {
            return [
                'success' => true,
                'message' => Yii::t('app', 'Files uploaded successfully.'),
                'data' => $model->responseData
            ];
        }

        return [
            'success' => false,
            'message' => Yii::t('app', 'Could not save file. Errors: {:errors}', [
                ':errors' => implode('<br>', $model->getFirstErrors())
            ])
        ];
    }
}
