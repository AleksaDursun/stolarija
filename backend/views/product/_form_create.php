<?php

use common\helpers\Select2Helper;
use common\widgets\datepicker\DatePicker;
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
    'action' => $model->isNewRecord ? ['/product/create',] : ['/product/update', 'id' => $model->id],
  ]); ?>

  <div class="row">
    <div class="col-md-6">
      <?= $form->field($model, 'name')->textInput(['maxlength' => true]) ?>
    </div>

    <div class="col-md-6">
      <?= $form->field($model, 'name_en')->textInput(['maxlength' => true]) ?>
    </div>

    <div class="col-md-6">
      <?= $form->field($model, 'name_de')->textInput(['maxlength' => true]) ?>
    </div>

    <div class="col-md-6">
      <?= $form->field($model, 'category_id')->widget(Select2::class,
        Select2Helper::getProductCategoryConfig($model, 'category_id', false))->label('Kategorija') ?>
    </div>

    <div class="col-12">
      <?= $form->field($model, 'description')->textarea(['rows' => 6]) ?>
    </div>

    <div class="col-12">
      <?= $form->field($model, 'description_en')->textarea(['rows' => 6]) ?>
    </div>

    <div class="col-12">
      <?= $form->field($model, 'description_de')->textarea(['rows' => 6]) ?>
    </div>

    <div class="col-12">
      <?= $form->field($model, 'image_id')->widget(DropzoneInput::class, [
        'message' => 'Drag & drop file or click to upload ',
        'fileAttribute' => 'image',
        'clientOptions' => [
          'acceptedFiles' => 'image/*',
          'uploadMultiple' => false,
          'maxFiles' => 1,
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
