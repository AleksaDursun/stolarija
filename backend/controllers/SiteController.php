<?php
/*
 * Nikola Kukric <info@singularity.is>
 * Company: Singularity Solution <https://singularity.is>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace backend\controllers;

use Yii;
use yii\bootstrap4\ActiveForm;
use yii\web\BadRequestHttpException;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use backend\models\LoginForm;
use backend\models\PasswordResetRequestForm;
use backend\models\ResetPasswordForm;
use backend\models\SignupForm;
use common\components\controllers\BaseController;
use yii\web\Response;

/**
 * Site controller
 */
class SiteController extends BaseController
{
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::class,
                'only' => ['logout', 'signup', 'password-reset', 'request-password-reset', 'request-password-reset-by-admin'],
                'rules' => [
                    [
                        'actions' => ['signup', 'password-reset', 'request-password-reset', 'comtrade'],
                        'allow' => true,
                        'roles' => ['?'],
                    ],
                    [
                        'actions' => ['logout', 'header'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                    [
                        'actions' => ['request-password-reset-by-admin'],
                        'allow' => true,
                        'roles' => ['admin'],
                    ],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::class,
                'actions' => [
                    'logout' => ['post'],
                ],
            ],
        ];
    }

    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
                'layout' => 'login',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }

    public function actionHeader()
    {
        $this->layout = 'empty';

        return $this->renderAjaxConditional('//layouts/_header');
    }

    /**
     * Logs in a user.
     *
     * @return mixed
     */
    public function actionLogin()
    {
        $this->layout = 'login';

        if (!Yii::$app->user->isGuest) {
            return $this->goHome();
        }

        $model = new LoginForm();
        if ($model->load(Yii::$app->request->post()) && $model->login()) {
            return $this->goBack();
        } else {
            $model->password = '';

            return $this->render('login', [
                'model' => $model,
            ]);
        }

    }

    /**
     * Logs out the current user.
     *
     * @return mixed
     */
    public function actionLogout()
    {
        Yii::$app->user->logout();

        return $this->goHome();
    }

    /**
     * Signs user up.
     *
     * @param $hash
     * @return string|\yii\web\Response
     * @throws BadRequestHttpException
     * @throws \yii\db\Exception
     */
    public function actionSignup($hash)
    {
        if (!($teamUser = TeamUser::findByInvitationHash($hash))) {
            throw new BadRequestHttpException(Yii::t('app', 'Invitation url invalid or expired. Please contact site admin to send you new invitation link.'));
        }

        $this->layout = 'login';

        $model = new SignupForm(['teamUser' => $teamUser]);

        if ($model->load(Yii::$app->request->post()) && $model->signup()) {
            return $this->goHome();
        }

        return $this->render('signup', [
            'model' => $model,
        ]);
    }

    /**
     * Requests password reset.
     *
     * @return mixed
     */
    public function actionRequestPasswordReset()
    {
        $this->layout = 'login';

        $model = new PasswordResetRequestForm();
        if ($model->load(Yii::$app->request->post()) && $model->validate()) {
            if ($model->sendEmail()) {
                Yii::$app->session->setFlash('success', 'Check your email for further instructions.');

                return $this->goHome();
            } else {
                Yii::$app->session->setFlash('error', 'Sorry, we are unable to reset password for the provided email address.');
            }
        }

        return $this->render('request-password-reset', [
            'model' => $model,
        ]);
    }

    public $ajaxResponse = true;
    public $responseMessage;

    public function actionRequestPasswordResetByAdmin()
    {
        $this->layout = 'login';

        $email = Yii::$app->getRequest()->getQueryParam('email');
        $model = new PasswordResetRequestForm();
        if ($model->sendEmailByAdmin($email)) {
            if ($this->ajaxResponse) {
                Yii::$app->response->format = Response::FORMAT_JSON;
                return [
                    'success' => true,
                    'message' => $this->responseMessage ?: Yii::t('app', 'Password reset link sent successfully')
                ];
            }

            return $this->redirect(Yii::$app->request->referrer);
        } else {
            if ($this->ajaxResponse) {
                Yii::$app->response->format = Response::FORMAT_JSON;
                return [
                    'success' => false,
                    'message' => $this->responseMessage ?: Yii::t('app', 'Sorry, we are unable to reset password for the provided email address.'),
                    'errors' => ActiveForm::validate($model)
                ];
            }

            return $this->redirect(Yii::$app->request->referrer);
        }

    }

    /**
     * Resets password.
     *
     * @param string $token
     * @return mixed
     * @throws BadRequestHttpException
     */
    public function actionPasswordReset($token)
    {
        $this->layout = 'login';

        try {
            $model = new ResetPasswordForm($token);
        } catch (InvalidParamException $e) {
            throw new BadRequestHttpException($e->getMessage());
        }

        if ($model->load(Yii::$app->request->post()) && $model->validate() && $model->resetPassword()) {
            Yii::$app->session->setFlash('success', 'New password saved.');

            return $this->goHome();
        }

        return $this->render('password-reset', [
            'model' => $model,
        ]);
    }


    public function actionComtrade() {

        return phpinfo();
    }
}
