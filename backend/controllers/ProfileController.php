<?php
/*
 * Nikola Kukric <info@singularity-solution.com>
 * Company: Singularity Solution <https://singularity-solution.com>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace backend\controllers;

use common\components\actions\AutoCompleteAction;
use common\components\actions\CustomToggleAction;
use common\components\actions\UpdateAction;
use common\components\controllers\CrudController;
use common\helpers\ArrayHelper;
use common\helpers\StatusHelper;
use common\models\Profile;
use common\models\search\ProfileSearch;
use common\models\User;
use Yii;
use yii\db\ActiveQuery;
use yii\db\Expression;
use yii\filters\AccessControl;
use yii\web\NotFoundHttpException;

class ProfileController extends CrudController
{
    public $modelClass = Profile::class;
    public $searchModelClass = ProfileSearch::class;

    public function behaviors()
    {
        return ArrayHelper::merge(parent::behaviors(),
            [
                'access' => [
                    'class' => AccessControl::class,
                    'rules' => [
                        [
                            'allow' => true,
                            'roles' => ['@'],
                        ]
                    ],
                ],
            ]
        );
    }

    public function actions()
    {
        return ArrayHelper::merge(parent::actions(), [
            'autocomplete' => [
                'class' => AutoCompleteAction::class,
                'field' => ['first_name', 'last_name', 'email'],
                'order' => 'fullName',
                'modelClass' => $this->modelClass,
                'castToSelect2' => true,
                'scopes' => [function (ActiveQuery $query) {
                    $query->select(['profile.*', new Expression("IF(profile.first_name IS NULL OR profile.first_name = '', profile.email, CONCAT(profile.first_name, ' ', profile.last_name)) AS fullName")]);
                }],
                'returnValue' => function (Profile $model) {
                    return [
                        'id' => $model->id,
                        'text' => $model->getFullName()
                    ];
                },
            ],
            'update' => [
                'class' => UpdateAction::class,
                'modelClass' => Profile::class,
                'scenario' => Profile::SCENARIO_UPDATE,
                'afterUpdate' => function (Profile $model) {
                    $profileId = ArrayHelper::getValue(Yii::$app->user, 'identity.profile.id');
                    $url = $profileId == $model->id ? ['/profile/update'] : ['/profile/update', 'id' => $model->id];

                    return Yii::$app->controller->redirect($url);
                },
                'findModel' => function ($id) {
                    $id = $id ? : ArrayHelper::getValue(Yii::$app->user, 'identity.profile.id');
                    if (($model = Profile::findOne($id)) === null) {
                        throw new NotFoundHttpException('The requested page does not exist.');
                    }

                    return $model;
                }
            ], [
                'class' => UpdateAction::class,
                'modelClass' => Profile::class,
                'view' => 'update',
                'scenario' => Profile::SCENARIO_PROFILE_PHOTO_UPLOAD,
                'afterUpdate' => function (Profile $model) {
                    $profileId = ArrayHelper::getValue(Yii::$app->user, 'identity.profile.id');
                    $url = $profileId == $model->id ? ['/profile/update'] : ['/profile/update', 'id' => $model->id];

                    return $this->redirect($url);
                },
            ],
            'change-password' => [
                'class' => UpdateAction::class,
                'modalView' => 'change_password_modal',
                'scenario' => User::SCENARIO_CHANGE_PASSWORD,
                'findModel' => function () {
                    if ($model = User::findOne(Yii::$app->user->id)) {
                        return $model;
                    }
                    throw new NotFoundHttpException('The requested page does not exist.');
                }
            ],
        ]);
    }


}
