<?php

use common\widgets\datepicker\DatePicker;
use common\widgets\dropzoneinput\DropzoneInput;
use yii\helpers\Html;

use yii\widgets\ActiveForm;




/* @var $this yii\web\View */
/* @var $model common\models\Subscriber */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="publication-form">
    <?php $form = ActiveForm::begin([
        'id' => $model->getFormId(),
        'options' => ['enctype' => 'multipart/form-data'],
        'action' => $model->isNewRecord ? ['/subscriber/create'] : ['/subscriber/update', 'id' => $model->id],
    ]); ?>

    <div class="row">
        <div class="col-12 col-lg-6">
            <?= $form->field($model, 'email')->textInput(['maxlength' => true]) ?>
        </div>

        <div class="col-12 text-right mt-4">
            <?= Html::button(Yii::t('app', 'Cancel'), ['class' => 'btn btn-link ml-auto', 'data-dismiss' => 'modal']) ?>
            <?= Html::submitButton(Yii::t('app', 'Save'), ['class' => 'btn btn-primary btn-modal-control-submit', 'data-form-id' => $model->getFormId()]) ?>
        </div>
    </div>

    <?php ActiveForm::end(); ?>

</div>
