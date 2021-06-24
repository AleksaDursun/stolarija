<?php

/* @var $this yii\web\View */
/* @var $form yii\bootstrap\ActiveForm */
/* @var $model \backend\models\SignupForm */

use yii\helpers\Html;
use yii\bootstrap4\ActiveForm;

$this->title = Yii::t('app', 'Invitation Signup');
$this->params['breadcrumbs'][] = $this->title;

?>

<div class="container mt--8 pb-5">
    <!-- Table -->
    <div class="row justify-content-center">
        <div class="col-lg-6 col-md-8">
            <div class="card bg-secondary border-0">
                <div class="card-body px-lg-5 py-lg-5">
                    <div class="text-center text-muted mb-4">
                        <h2><?= Yii::t('app', 'Registration') ?></h2>
                    </div>
                    <?php $form = ActiveForm::begin(['fieldConfig' => [],
                        'id' => 'form-signup']); ?>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="form-group">
                                <?= $form->field($model, 'firstName')->textInput(['placeholder' => Yii::t('app', 'First Name')])->label(false); ?>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="form-group">
                                <?= $form->field($model, 'lastName')->textInput(['placeholder' => Yii::t('app', 'Last Name')])->label(false); ?>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="form-group">
                                <?= $form->field($model->teamUser, 'invitation_email')->textInput(['disabled' => true])->label(false); ?>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="form-group">
                                <?= $form->field($model, 'username')->textInput(['placeholder' => Yii::t('app', 'Username')])->label(false); ?>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="form-group">
                                <?= $form->field($model, 'password')->passwordInput(['placeholder' => Yii::t('app', 'Password')])->label(false); ?>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="form-group">
                                <?= $form->field($model, 'passwordRepeat')->passwordInput(['placeholder' => Yii::t('app', 'Repeat password')])->label(false); ?>
                            </div>
                        </div>
                    </div>

                    <?= $form->field($model, 'agree', ['labelOptions' => ['class' => 'custom-control-label']])->checkbox(['class' => 'custom-control-input'])->label(Yii::t('app', 'I agree with <a href="">terms and conditions</a>')); ?>

                    <div class="form-group text-center">
                        <?= Html::submitButton(Yii::t('app', 'Register'), ['class' => 'btn btn-primary btn-loading', 'name' => 'signup-button']) ?>
                    </div>

                    <?php ActiveForm::end(); ?>

                </div>
            </div>
            <div class="row mt-3">
                <div class="col-6">
                    <?= Html::a('<small>'. Yii::t('app', 'Go home').'</small>', ['/'], [
                        'class' => 'text-light',
                    ]) ?>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
