<?php
/*
 * Nikola Kukric <info@singulaity.is>
 * Company: Singularity Solution <https://singulaity.is>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace backend\controllers;

use common\components\behaviors\PropertyFilter;
use common\models\File;
use Yii;
use yii\filters\AccessControl;
use yii\web\ForbiddenHttpException;
use yii\web\Response;
use notes\models\Note;
use common\components\actions\DeleteAction;
use common\components\actions\UpdateAction;
use common\components\controllers\BaseController;
use notes\components\actions\AttachmentAction;

/**
 * Default controller for the `notes` module
 */
class NoteController extends BaseController
{
    public $modelClass = Note::class;

    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::class,
                'rules' => [
                    [
                        'allow' => true,
                        'roles' => ['@']
                    ]
                ],
            ],
        ];
    }

    public function actions()
    {
        return [
            'delete' => [
                'class' => DeleteAction::class,
                'modelClass' => $this->modelClass,
                'checkAccess' => function ($id, $model) {
                    if (!Yii::$app->user->isAdmin && $model->created_by != Yii::$app->user->id) {
                        throw new ForbiddenHttpException('Not Allowed to perform this operation.');
                    }
                },
                'afterDelete' => function ($model) {

                    Yii::$app->response->format = Response::FORMAT_JSON;

                    return [
                        'success' => $model->is_deleted ? true : false,
                        'message' => $model->is_deleted ? 'Note successfully deleted.' : 'Note has not been removed.'
                    ];
                }
            ],
            'update' => [
                'class' => UpdateAction::class,
                'modelClass' => $this->modelClass,
                'checkAccess' => function ($id, $model) {
                    if (!Yii::$app->user->isAdmin() && $model->created_by != Yii::$app->user->id) {
                        throw new ForbiddenHttpException('Not Allowed to perform this operation.');
                    }
                }

            ],
            'add-note-attachment' => [
                'class' => AttachmentAction::class,
                'fileClass' => File::class,
            ]
        ];
    }
}
