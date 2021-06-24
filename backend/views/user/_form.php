<?php


use common\helpers\RbacHelper;
use common\widgets\DropdownList;
use yii\bootstrap4\ActiveForm;
use yii\bootstrap4\Html;

/**
 * @var \backend\models\RegistrationForm $model
 */



?>

<div id="profile-form">
    <?php $form = ActiveForm::begin([
        'id' => $model->getFormId(),
        'action' => $model->isNewRecord ? ['/user/create'] : ['/user/update', 'id' => $model->id],
    ]) ?>
    <div class="row">


        <div class="col-md-6">
            <?= $form->field($model, 'first_name')->textInput() ?>
        </div>

        <div class="col-md-6">
            <?= $form->field($model, 'last_name')->textInput() ?>
        </div>

        <div class="col-md-6">
            <?= $form->field($model, 'email')->textInput(['disabled' => !$model->isNewRecord]) ?>
        </div>

        <div class="col-md-6">
            <?= $form->field($model, 'phone')->textInput() ?>
        </div>

        <div class="col-md-6">
            <?= $form->field($model, 'password')->passwordInput() ?>
        </div>

        <div class="col-md-6">
            <?= $form->field($model, 'password_repeat')->passwordInput() ?>
        </div>


        <div class="col-md-12">
            <?= $form->field($model, 'streetAddress')->textInput() ?>
        </div>

        <div class="col-md-4">
            <?= $form->field($model, 'city')->textInput() ?>
        </div>

        <div class="col-4">
            <?= $form->field($model, 'zipcode')->textInput() ?>
        </div>

        <div class="col-md-4">
            <?= $form->field($model, 'state')->textInput() ?>
        </div>

        <div class="col-md-6">
            <?= $form->field($model, 'role')->widget(DropdownList::class,
                [
                    'items' => RbacHelper::getRoles()
                ])
            ?>
        </div>

        <div class="col-12 text-right mt-4">
            <?= Html::button(Yii::t('app', 'Cancel'), ['class' => 'btn btn-link ml-auto', 'data-dismiss' => 'modal']) ?>
            <?= Html::submitButton(Yii::t('app', 'Save'), ['class' => 'btn btn-primary btn-modal-control-submit', 'data-form-id' => $model->getFormId()]) ?>
        </div>
    </div>
    <?php ActiveForm::end(); ?>
</div>
