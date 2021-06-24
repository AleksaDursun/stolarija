<?php

/* @var $this yii\web\View */
/* @var $form yii\bootstrap\ActiveForm */
/* @var $model \backend\models\ResetPasswordForm */

use yii\helpers\Html;
use yii\bootstrap4\ActiveForm;

$this->title = 'Reset password';
$this->params['breadcrumbs'][] = $this->title;
?>

<div class="container mt--8 pb-5">
    <!-- Table -->
    <div class="row justify-content-center">
        <div class="col-lg-6 col-md-8">
            <div class="card bg-secondary border-0">
                <div class="card-body px-lg-5 py-lg-5">
                    <div class="text-center text-muted mb-4">

                        <div class="site-reset-password">
                            <h2 class="pb-3"><?= Html::encode(Yii::t('app', $this->title)) ?></h2>

                            <div class="row">
                                <div class="col-lg-12">
                                    <?php $form = ActiveForm::begin(['fieldConfig' => []]); ?>
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
                                                <?= $form->field($model, 'password_repeat')->passwordInput(['placeholder' => Yii::t('app', 'Repeat password')])->label(false); ?>
                                            </div>
                                        </div>
                                    </div>
                                        <div class="form-group">
                                            <?= Html::submitButton(Yii::t('app', 'Save'), ['class' => 'btn btn-primary btn-loading']) ?>
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
                    <?= Html::a('<small>'. Yii::t('app', 'Go home').'</small>', ['/'], [
                        'class' => 'text-light',
                    ]) ?>
                </div>
            </div>
        </div>
    </div>
</div>
