<?php

/* @var $this yii\web\View */
/* @var $form yii\bootstrap\ActiveForm */

/* @var $model \common\models\LoginForm */

use yii\helpers\Html;
use yii\bootstrap4\ActiveForm;

$this->title = Yii::t('app', 'Login');

$this->registerJs("setTimeout(function() { $('.card').removeClass('card-hidden'); }, 700);");

?>

<div class="container">
    <div class="row">
        <div class="col-lg-4 col-md-6 col-sm-8 ml-auto mr-auto">
            <?php $form = ActiveForm::begin([
                'fieldConfig' => [],
                'id' => 'login-form'
            ]); ?>
            <div class="card card-login card-hidden">
                <div class="card-header card-header-rose text-center" style="background: #098c09;
box-shadow: 0 4px 20px 0 rgba(0,0,0,.14),0 7px 10px -5px rgba(30, 233, 52, 0.4);
">
                    <h4 class="card-title">Login</h4>
                </div>
                <div class="card-body">
                    <p class="card-description text-center ba">Umjetnost u Drvetu</p>

                    <div class="bmd-form-group">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <i class="far fa-grin"></i>
                                </span>
                            </div>
                            <?= $form->field($model, 'email')->textInput(['placeholder' => 'Username or email...'])->label(false) ?>
                        </div>
                    </div>

                    <div class="bmd-form-group">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <i class="far fa-lock-alt"></i>
                                </span>
                            </div>
                            <?= $form->field($model, 'password')->passwordInput(['placeholder' => 'Password...'])->label(false); ?>
                        </div>
                    </div>

                    <div class="bmd-form-group">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <?= $form->field($model, 'rememberMe')->checkbox([], true)->label('Remember me') ?>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="card-footer justify-content-center">
                        <?= Html::submitButton('Lets go', [
                            'class' => 'btn btn-rose btn-link btn-lg btn-loading',
                            'name' => 'login-button'
                        ]) ?>
                    </div>
                </div>
                <?php ActiveForm::end(); ?>
            </div>
        </div>
    </div>
</div>

