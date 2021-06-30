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

$canEdit = $model->company==Product::COMPANY_MEDIA_MARKET || $model->isNewRecord;

$racunar = $this->render('form/_racunar');
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
                'value' => Product::COMPANY_MEDIA_MARKET
        ]);?>
        <?php endif; ?>


        <div class="col-md-4">
            <?= $form->field($model, 'name')->textInput(['maxlength' => true])->label('Naziv') ?>
        </div>

        <div class="col-md-4">
            <?= $form->field($model, 'category_id')->widget(Select2::class,
                Select2Helper::getProductCategoryConfig($model, 'category_id', false))->label('Kategorija') ?>
        </div>

        <?php if($canEdit) : ?>
        <div class="col-md-4">
            <?=  $form->field($model, 'code')->textInput() ?>
        </div>

        <div class="col-md-3">
            <?= $form->field($model, 'retail_price')->widget(MoneyInput::class)->label('Preporucena')?>
        </div>

        <div class="col-md-3">
            <?= $form->field($model, 'price')->widget(MoneyInput::class)->label('Nabavna cijena')?>
        </div>
        <?php endif; ?>


        <div class="col-md-3">
            <?= $form->field($model, 'selling_price')->widget(MoneyInput::class)->label('Prodajna Cijena')?>
        </div>

        <div class="col-md-3">
            <?= $form->field($model, 'sale')->widget(MoneyInput::class, [
                'icon' => '<i class="fal fa-piggy-bank"></i>'
            ])->label('Akcijska cijena')?>
        </div>

        <div class="col-md-3">
            <?= $canEdit ? $form->field($model, 'quantity')->widget(MoneyInput::class, [
                'icon' => '<i class="fal fa-calculator"></i>'
            ])->label('Kolićina') :''?>
        </div>


        <div class="col-md-3">
            <?= $canEdit ? $form->field($model, 'is_used')->checkbox()->label(false) : '' ?>
        </div>

        <div class="col-12">
            <?= $form->field($model, 'short_description')->textarea(['rows' => 6])->label('Kratki opis') ?>
        </div>

        <div class="col-12">
            <div class="form-check form-check-inline">
                <input class="form-check-input part-select" type="radio" id="inlineCheckbox1"  name="inlineRadioOptions"  value="racunar">
                <label class="form-check-label" for="inlineCheckbox1">PC</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input part-select" type="radio" id="inlineCheckbox2"  name="inlineRadioOptions"  value="laptop">
                <label class="form-check-label" for="inlineCheckbox2">Laptop</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input part-select" type="radio" id="inlineCheckbox3" name="inlineRadioOptions"  value="printer">
                <label class="form-check-label" for="inlineCheckbox3">Printer</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input part-select" type="radio" id="inlineCheckbox4"  name="inlineRadioOptions"  value="monitor">
                <label class="form-check-label" for="inlineCheckbox4">Monitor</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input part-select" type="radio" id="inlineCheckbox5"  name="inlineRadioOptions"  value="allInOne">
                <label class="form-check-label" for="inlineCheckbox5">All in one</label>
            </div>
        </div>

        <div class="col-12">
            <?= $form->field($model, 'description')->widget(CKEditor::class, [
                'id' => 'test',
                'options' => ['rows' => 20],
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
