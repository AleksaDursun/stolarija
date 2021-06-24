<?php

use common\helpers\Select2Helper;
use common\models\Product;
use common\widgets\dropzoneinput\DropzoneInput;
use common\widgets\maskinput\MoneyInput;
use common\widgets\select2\Select2;
use yii\helpers\Html;

use yii\widgets\ActiveForm;

$type = Yii::$app->controller->id;

/* @var $this yii\web\View */
/* @var $model common\models\Product */
/* @var $form yii\widgets\ActiveForm */

?>

<div class="publication-form">
    <?php $form = ActiveForm::begin([
        'id' => $model->getFormId(),
        'options' => ['enctype' => 'multipart/form-data'],
        'action' => $model->isNewRecord ? ['/newsletter/create',] : ['/newsletter/update', 'id' => $model->id],
    ]); ?>

    <div class="row">
        <div class="col-md-12">
            <?= $form->field($model, 'subject')->textInput(['maxlength' => true])->label('Naziv') ?>
        </div>


        <div class="col-12">
            <?= $form->field($model, 'text')->textarea(['rows' => 6])->label('Tekst prije slike') ?>
        </div>


        <div class="col-12">
            <?=$form->field($model, 'image_id')->widget(DropzoneInput::class, [
                'message' => 'Drag & drop file or click to upload ',
                'fileAttribute' => 'image',
                'clientOptions' => [
                    'acceptedFiles' => 'image/*',
                    'uploadMultiple' => false,
                    'maxFiles' => 1
                ]
            ])->label('Product image'); ?>
        </div>

        <div class="col-12 text-right mt-4">
            <?= Html::button(Yii::t('app', 'Cancel'), ['class' => 'btn btn-link ml-auto', 'data-dismiss' => 'modal']) ?>
            <?= Html::submitButton(Yii::t('app', 'Save'), ['class' => 'btn btn-primary btn-modal-control-submit', 'data-form-id' => $model->getFormId()]) ?>
        </div>
    </div>

    <?php ActiveForm::end(); ?>

</div>
