<?php
/**
 * Aleksandar Panic <hola@2amigos.us>
 * Company: 2amigOS! <https://2amigos.us>
 */

namespace notes\components\actions;

use notes\models\Note;
use notes\models\NoteSearch;
use Yii;
use yii\db\ActiveRecord;
use yii\helpers\Url;
use yii\web\Response;

class ListAction extends NoteAction
{
    public $uploadUrl =  '/note/add-note-attachment';

    public $noteModelTextParam = 'content';

    public $viewFile = '@common/components/notes/views/shared/notes';

    public $modalViewFile = '@common/components/notes/views/notes_modal';

    public $createRedirectRoute;

    public $subMenuView;

    public $panelOptions;

    public function run($id)
    {

        /** @var ActiveRecord $modelClass */
        $modelClass = $this->modelClass;

        $searchModel = new NoteSearch([
            'model_name' => $modelClass,
            'model_id' => $id
        ]);

        /** @var Note $model */
        $model = new Note([
            'model_id' => $id,
            'model_name' => $modelClass
        ]);

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            if (Yii::$app->request->getIsAjax()) {
                Yii::$app->response->format = Response::FORMAT_JSON;
                return ['success' => true, 'message' => 'Note successfully added.'];
            } else {
                return $this->controller->redirect([$this->createRedirectRoute, 'id' => $id]);
            }
        }

        $dataProvider = $searchModel->search(Yii::$app->request->getQueryParams());

        $controllerModel = $modelClass::findOne($id);

        return $this->render([
            'panelOptions' => $this->panelOptions,
            'controllerModel' => $controllerModel,
            'dataProvider' => $dataProvider,
            'model' => $model,
            'attribute' => $this->noteModelTextParam,
            'uploadUrl' => Url::to([$this->uploadUrl]),
            'fileParam' => $this->uploadFileParam,
            'fileAttributeIdParam' => $this->uploadFileIdAttribute,
            'subMenuView' => $this->subMenuView,
        ]);
    }

    private function render(array $params = [])
    {
        $view = Yii::$app->request->getIsAjax() ? $this->modalViewFile : $this->viewFile;

        return $this->controller->renderAjaxConditional($view, $params);
    }

}
