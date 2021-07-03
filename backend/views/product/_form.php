<?php

use common\helpers\Select2Helper;
use common\models\Product;
use common\widgets\dropzoneinput\DropzoneInput;
use common\widgets\maskinput\MoneyInput;
use common\widgets\select2\Select2;
use dosamigos\ckeditor\CKEditor;
use yii\helpers\Html;

use yii\widgets\ActiveForm;

$type = Yii::$app->controller->id;

/* @var $this yii\web\View */
/* @var $model common\models\Product */
/* @var $form yii\widgets\ActiveForm */

$canEdit = $model->company==Product::COMPANY || $model->isNewRecord;

\backend\assets\ProductFormAsset::register($this);
$this->registerJs("
    $('.part-select').click(function() {
        var editor = CKEDITOR.instances['product-description'];
        switch(this.value){
           case 'racunar':
            editor.setData(window.racunar);
            break;
           case 'laptop':
            editor.setData(window.laptop);
            break;
           case 'printer':
            editor.setData(window.printer);
            break;
           case 'monitor':
            editor.setData(window.monitor);
            break;
          case 'allInOne':
            editor.setData(window.allInOne);
            break;
        }
     });

");
?>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

<div class="publication-form">
    <?php $form = ActiveForm::begin([
        'id' => $model->getFormId(),
        'options' => ['enctype' => 'multipart/form-data'],
        'action' => $model->isNewRecord ? ['/product/create',] : ['/product/update', 'id' => $model->id],
    ]); ?>

    <div class="row">
        <?php if($canEdit) : ?>
        <?=Html::activeHiddenInput($model, 'company', [
                'value' => Product::COMPANY
        ]);?>
        <?php endif; ?>


        <div class="col-md-4">
            <?= $form->field($model, 'name')->textInput(['maxlength' => true]) ?>
        </div>

      <div class="col-md-4">
        <?= $form->field($model, 'name_en')->textInput(['maxlength' => true]) ?>
      </div>

      <div class="col-md-4">
        <?= $form->field($model, 'name_de')->textInput(['maxlength' => true]) ?>
      </div>

        <div class="col-md-4">
            <?= $form->field($model, 'category_id')->widget(Select2::class,
                Select2Helper::getProductCategoryConfig($model, 'category_id', false))->label('Kategorija') ?>
        </div>

        <div class="col-12">
            <?= $form->field($model, 'description')->widget(CKEditor::class, [
                'id' => 'test',
                'options' => ['rows' => 15],
                'preset' => 'standard'
            ]) ?>
        </div>

      <div class="col-12">
        <?= $form->field($model, 'description_en')->widget(CKEditor::class, [
          'id' => 'test',
          'options' => ['rows' => 15],
          'preset' => 'standard'
        ]) ?>
      </div>

      <div class="col-12">
        <?= $form->field($model, 'description_de')->widget(CKEditor::class, [
          'id' => 'test',
          'options' => ['rows' => 15],
          'preset' => 'standard'
        ]) ?>
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
