<?php
/**
 * Aleksandar Panic <hola@2amigos.us>
 * Company: 2amigOS! <https://2amigos.us>
 */

namespace notes\components\actions;


use Yii;
use yii\db\ActiveRecord;
use yii\web\HttpException;
use yii\web\Response;
use yii\web\UploadedFile;

class AttachmentAction extends NoteAction
{
    public $fileClass;
    public $fileParam = 'file';
    public $fileModelConfig = [];

    public function run()
    {
        /** @var ActiveRecord $model */
        $fileClass = $this->fileClass;

        $model = new $fileClass($this->fileModelConfig);

        $model->file = UploadedFile::getInstanceByName($this->fileParam);

        Yii::$app->response->format = Response::FORMAT_JSON;

        if (!$model->save()) {
            throw new HttpException('400', "Could not save file. Details: " . implode("\n", $model->getFirstErrors()));
        }

        return [
            'success' => true,
            'id' => $model->getPrimaryKey()
        ];
    }
}