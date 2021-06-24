<?php

/* @var $this yii\web\View */
/* @var $form yii\bootstrap\ActiveForm */

/* @var $model \backend\models\PasswordResetRequestForm */

use yii\helpers\Html;
use yii\bootstrap4\ActiveForm;

$this->title = Yii::t('app', 'Password reset request');

?>

<div class="container mt--8 pb-5">
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary border-0">
                <div class="card-body px-lg-5 py-lg-5">
                    <div class="text-center text-muted mb-4">

                        <div class="site-request-password-reset">
                            <h2 class="pb-3"><?= Yii::t('app', 'Request Password Reset') ?></h2>
                            <p class="pb-3"><?= Yii::t('app', 'Type your email, and we\'ll send you password reset instructions') ?></p>

                            <div class="row">
                                <div class="col-lg-12">
                                    <?php $form = ActiveForm::begin(['fieldConfig' => []]); ?>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="form-group">
                                                <?= $form->field($model, 'email')->textInput(['placeholder' => Yii::t('app', 'Password reset email')])->label(false); ?>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <?= Html::submitButton(Yii::t('app', 'Send'), ['class' => 'btn btn-primary btn-loading']) ?>
                                    </div>

                                    <?php ActiveForm::end(); ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-6">
                    <?= Html::a('<small>' . Yii::t('app', 'Go home') . '</small>', ['/'], [
                        'class' => 'text-light',
                    ]) ?>
                </div>
            </div>
        </div>
    </div>
</div>
