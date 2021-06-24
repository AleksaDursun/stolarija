<?php
/**
 * Nikola Jankovic  <hello@singularity.is>
 * Company: Singularity Solution <https://singularity.is>
 */

use yii\bootstrap4\ActiveForm;

?>


<div>
    <?php $form = ActiveForm::begin([
        'id' => $model->getFormId(),
        'action' => $model->isNewRecord ? ['message/create'] : ['message/update', 'id' => $model->id],
        'options' => ['enctype' => 'multipart/form-data', 'data-grid-id' => 'translation-pjax-id'],
    ]); ?>

    <?= $form->field($model, 'source_message', [
        'inputOptions' => ['placeholder' => Yii::t('app', 'Message')],
    ])->textInput([
            'disabled' => $model->isNewRecord ? false : true,
            'value' => $model->isNewRecord ? '' : $model->sourceMessage()['message'],
        ]) ?>

    <?= $form->field($model, 'translation', [
        'inputOptions' => ['placeholder' => Yii::t('app', 'Translation')],
    ])->textInput() ?>


    <?php ActiveForm::end(); ?>
</div>