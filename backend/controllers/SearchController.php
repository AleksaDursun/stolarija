<?php
/*
 * Nikola Kukric <info@singularity.is>
 * Company: Singularity Solution <https://singularity.is>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace backend\controllers;


use common\components\controllers\BaseController;
use common\models\search\SiteSearch;
use Yii;
use yii\filters\AccessControl;
use yii\web\BadRequestHttpException;
use yii\web\Response;

class SearchController extends BaseController
{
    /**
     * {@inheritdoc}
     */
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::class,
                'rules' => [
                    [
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
        ];
    }

    public function actionResolveResult()
    {
        $model = new SiteSearch([
            'scenario' => SiteSearch::SCENARIO_SEARCH_AJAX
        ]);

        $model->load(Yii::$app->request->getQueryParams());

        return $this->redirect($model->getViewUrl());
    }

    public function actionGlobal()
    {
        if (!Yii::$app->request->isAjax) {
            return $this->goHome();
        }

        $model = new SiteSearch([
            'scenario' => SiteSearch::SCENARIO_SEARCH
        ]);

        $dataProvider = $model->search(Yii::$app->request->getQueryParams());

        return $this->renderAjaxConditional('global', [
            'dataProvider' => $dataProvider,
            'model' => $model
        ]);

    }

    public function actionAjaxGlobal()
    {
        if (!Yii::$app->request->isAjax) {
            throw new BadRequestHttpException();
        }

        Yii::$app->response->format = Response::FORMAT_JSON;

        $model = new SiteSearch([
            'scenario' => SiteSearch::SCENARIO_SEARCH_AJAX
        ]);

        return $model->getResultArray(Yii::$app->request->getQueryParams());
    }
}