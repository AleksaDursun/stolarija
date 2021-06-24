<?php

use common\widgets\modal\ModalContent;
use notes\widgets\notes\RichNote;
use yii\bootstrap4\ActiveForm;
use yii\helpers\Html;
use yii\helpers\Url;


$title = is_callable($panelOptions['title']) ? $panelOptions['title']($controllerModel) : $panelOptions['title'];
$context = $this->context;
$formId = "add-note-form";

?>

<?php ModalContent::begin([
    'title' => $title,
    'footer' =>
        Html::button(Yii::t('app', 'Cancel'), ['class' => 'btn btn-link  ml-auto', 'data-dismiss' => 'modal']) .
        Html::submitButton(Yii::t('app', 'Save'), ['class' => 'btn btn-primary btn-modal-control-submit', 'data-form-id' => $formId, 'data-hide' => 0])
]) ?>


<?php $form = ActiveForm::begin([
    'id' => $formId,
    'action' => Url::to([$context->route, 'id' => $controllerModel->primaryKey])
]); ?>

    <?= $form->field($model, $attribute, [
        'options' => ['class' => ''],
        'template' => '{label}{input}{error}',
    ])->widget(RichNote::class, [
        'model' => $model,
        'attribute' => $attribute,
        'attachmentUploadUrl' => $uploadUrl,
        'uploadFileParam' => $fileParam,
        'attachmentIdName' => Html::getInputName($model, $fileAttributeIdParam . '[]'),
        'noteListProvider' => $dataProvider,
        'pjaxActionUrl' => Url::to($controllerModel->getNoteUrl()),
        'invokerButtonId' => $controllerModel->getModelId(),
        'formContainerId' => $formId,
    ])->label(false); ?>

<?php $form->end(); ?>

<?php ModalContent::end(); ?>

<?php


