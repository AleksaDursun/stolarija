<?php

namespace common\components\actions;

use Yii;
use yii\base\Model;
use yii\base\InvalidConfigException;

/**
 * Class SearchAction
 *
 * @author 2amigOS! <http://2amigos.us/>
 **/

class SearchRelatedAction extends ItemAction
{
    const FORM_METHOD_GET = 'get';
    const FORM_METHOD_POST = 'post';
    const FORM_METHOD_ANY = 'any';

    public $relatedModelClass;
    public $relationKey;
    public $relationKeyProvider;

    /**
     * @var string
     */
    public $scenario = Model::SCENARIO_DEFAULT;

    /**
     * @var string the name of the view action.
     */
    public $view = 'related_models';

    /**
     * @var string the name of the view action in modal.
     */
    public $modalView = 'related_models_modal';

    public $partialView = '_grid';

    /**
     * @var string
     */
    public $formMethod = self::FORM_METHOD_GET;

    /**
     * The method should return an instance of [[DataProviderInterface]].
     *
     * @var string
     */
    public $searchMethod = 'search';

    /**
     * @var array
     */
    public $searchOptions = [];

    /**
     * If true partial view will render without panel
     *
     * @var boolean
     */
    public $renderWithoutPanel = false;

    /**
     * Initializes the object.
     * This method is invoked at the end of the constructor after the object is initialized with the
     * given configuration.
     *
     * @throws InvalidConfigException
     */
    public function init()
    {
        if ($this->modelClass === null) {
            $className = get_class($this);
            throw new InvalidConfigException("$className::\$modelClass must be set.");
        }

        if ($this->relatedModelClass === null) {
            $className = get_class($this);
            throw new InvalidConfigException("$className::\$relatedModelClass must be set.");
        }

        if ($this->relationKey === null) {
            $className = get_class($this);
            throw new InvalidConfigException("$className::\$relationKey must be set.");
        }


        parent::init();
    }

    /**
     * @return string
     */
    public function run($id)
    {
        $model = $this->findModel($id);
        $this->checkAccess($model);

        list($dataProvider, $filterModel) = $this->prepare($id);
        $params = $this->resolveParams([
            'partialView' => $this->partialView,
            'model' => $model,
            'dataProvider' => $dataProvider,
            'filterModel' => $filterModel,
            'renderWithoutPanel' => $this->renderWithoutPanel
        ]);

        return $this->render($params);
    }

    /**
     * @return array [$dataProvider, $filterModel]
     */
    protected function prepare($id)
    {
        /** @var Model $model */
        $model = new $this->relatedModelClass(['scenario' => $this->scenario]);

        $data = $this->getData();

        if (empty($data)) {
            $data = $this->getActionDataFromSession(['id' => $id]);
        } else {
            $this->setActionDataToSession($data, ['id' => $id]);
        }

        $model->load($data);

        $model->{$this->relationKey} = $this->provideRelationKey($id);

        return [call_user_func([$model, $this->searchMethod], $this->searchOptions), $model];
    }

    /**
     * @return array|null
     * @throws InvalidConfigException
     */
    protected function getData()
    {
        $request = \Yii::$app->request;

        switch ($this->formMethod) {
            case self::FORM_METHOD_GET:
                $data = $request->get();
                break;
            case self::FORM_METHOD_POST:
                $data = $request->post();
                break;
            case self::FORM_METHOD_ANY:
                $data = $_REQUEST;
                break;
            default:
                throw new InvalidConfigException('Unsupported method "' . $this->formMethod . '".');
        }
        unset($data['id']);

        return $data;
    }

    protected function provideRelationKey($id)
    {
        if (is_callable($this->relationKeyProvider)) {
            $user = Yii::$app->user->getIdentity();
            $params = Yii::$app->request->getQueryParams();

            return call_user_func_array($this->relationKeyProvider, [$id, $user, $params]);
        }

        return $id;
    }

    private function render(array $params = [])
    {
        $view = Yii::$app->request->getIsAjax() ? $this->modalView : $this->view;

        return $this->controller->renderAjaxConditional($view, $params);
    }
}
