<?php
/**
 * Nikola Kukric <hola@2amigos.us>
 * Company: 2amigOS! <https://2amigos.us>.
 */

namespace common\components\actions;


use common\helpers\FileHelper;
use Yii;
use yii\base\InvalidConfigException;
use yii\web\NotFoundHttpException;

class DownloadAction extends Action
{
    public $modelClass = null;
    public $findModel = null;
    public $logCallback = null;

    public function run($id)
    {
        /** @var ActiveRecord $class */
        $class = $this->modelClass;

        if (empty($class)) {
            throw new InvalidConfigException('Controller must have modelClass property defined.');
        }

        $model = $class::findOne($id);

        if (is_callable($this->findModel)) {
            $model = call_user_func($this->findModel, $id);
        }

        if (empty($model)) {
            throw new NotFoundHttpException('Page not found!');
        }

        if (is_callable($this->logCallback)) {
            call_user_func($this->logCallback, $id, Yii::$app->request);
        }

        $originalName = FileHelper::sanitizeName($model->original_name);

        header("Content-type: {$model->mime_type}");

        header("Content-Disposition: attachment; filename={$originalName}");


        readfile($model->getLocalFilePath());
    }
}
