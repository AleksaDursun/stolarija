<?php

/** @var $model \backend\models\forms\ProfileForm */
/** @var \yii\web\View $this */

$title = Yii::t('app', 'User info');
$subTitle = Yii::t('app', 'General information');

/**
 * @var \backend\models\forms\PasswordChangeForm $passwordForm
 * @var \common\models\Profile $model
 */

use common\components\image\ImageSpecification;
use common\helpers\RbacHelper;
use common\widgets\FileInput;
use yii\bootstrap4\ActiveForm;
use yii\bootstrap4\Html;

$userId = Yii::$app->getRequest()->getQueryParam('id') ?: Yii::$app->user->id;

?>

<div class="container-fluid">

    <div class="row">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header card-header-icon card-header-rose">
                    <div class="card-icon">
                        <i class="fal fa-user"></i>
                    </div>
                    <h4 class="card-title">Edit Profile </h4>
                </div>
                <div class="card-body">
                    <?php $form = ActiveForm::begin(); ?>
                    <div class="row">
                        <div class="col-md-6">
                            <?= $form->field($model, 'first_name')->textInput() ?>
                        </div>
                        <div class="col-md-6">
                            <?= $form->field($model, 'last_name')->textInput() ?>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <?= $form->field($model, 'streetAddress')->textInput() ?>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <?= $form->field($model, 'city')->textInput() ?>
                        </div>
                        <div class="col-md-4">
                            <?= $form->field($model, 'state')->textInput() ?>
                        </div>
                        <div class="col-md-4">
                            <?= $form->field($model, 'zipcode')->textInput() ?>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <div class="form-group">
                                    <label class="bmd-label-floating"> Lamborghini Mercy, Your chick she so thirsty, I'm
                                        in that two seat Lambo.</label>
                                    <textarea class="form-control" rows="5"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <?= Html::submitButton('Update Profile', ['class' => 'btn btn-rose btn-loading float-right']) ?>
                    <?= Html::a('Cancel', '/', ['class' => 'btn btn-link ml-auto float-right']) ?>
                    <div class="clearfix"></div>
                    <?php ActiveForm::end(); ?>
                </div>
            </div>
        </div>


        <div class="col-md-4">
            <div class="card card-profile">
                <?php $form = ActiveForm::begin([
                    'action' => ['/profile/photo', 'id' => $userId],
                    'options' => ['enctype' => 'multipart/form-data'],
                ]); ?>
                    <?= Html::activeHiddenInput($model, 'created_at') ?>
                    <div class="fileinput fileinput-new text-center" data-provides="fileinput">
                        <div class="fileinput-new thumbnail img-raised card-avatar">
                            <?= Html::img($model->getPhotoUrl()) ?>
                        </div>
                        <div class="fileinput-preview fileinput-exists thumbnail img-raised card-avatar"></div>
                        <div>
                            <span class="btn btn-raised btn-round btn-default btn-file">
                                <span class="fileinput-new">Select image</span>
                                <span class="fileinput-exists">Change</span>
                                <?= Html::activeFileInput($model, 'image_file') ?>
                            </span>
                            <a href="#" class="btn btn-danger btn-round fileinput-exists" data-dismiss="fileinput">
                                <i class="fa fa-times"></i> Remove
                            </a>
                            <?= Html::submitButton('Upload', [
                                'class' => 'btn btn-primary btn-round btn-loading fileinput-exists'
                            ]) ?>
                        </div>
                    </div>
                <?php ActiveForm::end(); ?>

                <div class="card-body">
                    <h6 class="card-category text-gray">Company Owner / Driver</h6>
                    <h4 class="card-title"><?= $model->getFullName() ?></h4>
                    <p class="card-description">
                        Don't be scared of the truth because we need to restart the human foundation in truth And I love
                        you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...
                    </p>

                    <?= Html::a(Yii::t('app', 'Change Password'), ['/user/change-password'], [
                        'class' => 'btn btn-rose btn-round btn-modal-control',
                        'data-size' => 'modal-md',
                    ]); ?>

                </div>
            </div>
        </div>
    </div>
</div>

