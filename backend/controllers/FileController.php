<?php


namespace backend\controllers;


use common\components\actions\CreateAction;
use common\components\actions\DeleteAction;
use common\components\actions\DownloadAction;
use common\components\actions\UpdateAction;
use common\components\actions\UploadFileAction;
use common\components\controllers\CrudController;
use common\models\File;
use yii\filters\AccessControl;
use yii\helpers\Json;


class FileController extends CrudController
{
    public $modelClass = File::class;

    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::class,
                'rules' => [
                    [
                        'allow' => true,
                        'roles' => ['@']
                    ],
                    [
                        'allow' => true,
                        'actions' => ['download'],
                        'roles' => ['?'],
                    ],
                ],
            ],
        ];
    }

    public function actions()
    {
        return array_merge(parent::actions(), [
            'download' => [
                'class' => DownloadAction::class,
                'modelClass' => File::class,
            ],
            'create' => [
                'class' => CreateAction::class,
                'modelClass' => $this->modelClass,
                'afterSave' => function ($model) {
                    $this->redirect(['/folder/browse', 'id' => $model->folder_id]);
                }
            ],
            'update' => [
                'class' => UpdateAction::class,
                'modelClass' => $this->modelClass,
                'scenario' => File::SCENARIO_UPDATE,
                'afterUpdate' => function ($model) {
                    $this->redirect(['/folder/browse', 'id' => $model->folder_id]);
                }
            ],
            'upload' => [
                'class' => UploadFileAction::class,
                'modelClass' => $this->modelClass,
            ],
        ]);
    }
}