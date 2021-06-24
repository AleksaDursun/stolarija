<?php


use common\models\User;
use yii\bootstrap4\ActiveForm;

/**
 * @var User $model
 */

?>

<div id="pass-change-form">
    <?php $form = ActiveForm::begin([
        'id' => $model->getFormId(),
        'action' => ['/user/change-password'],
    ]) ?>
    <div class="row">
        <div class="col-lg-12">
            <?= $form->field($model, 'password')->passwordInput() ?>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <?= $form->field($model, 'new_password', ['errorOptions' => ['class' => 'invalid-feedback d-block']])->passwordInput() ?>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <?= $form->field($model, 'password_repeat', ['errorOptions' => ['class' => 'invalid-feedback d-block']])->passwordInput() ?>
        </div>
    </div>
    <?php ActiveForm::end(); ?>
</div>

