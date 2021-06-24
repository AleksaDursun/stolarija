<?php
/**
 * Aleksandar Panic <hola@2amigos.us>
 * Company: 2amigOS! <https://2amigos.us>
 *
 * @var \notes\widgets\notes\RichNote $context
 */

use dosamigos\ckeditor\CKEditor;
use yii\helpers\Html;

$context = $this->context;
?>

<div class="row hidden-update-note hidden" id="<?= $context->getId(); ?>-update-note">
    <div class="col-md-12">
        <?= CKEditor::widget([
            'name' => Html::getInputName($context->model, $context->attribute),
            'options' => [
                'id' => $context->getId() . '-summernote-existing',
            ],
            'clientOptions' => $context->getCkeditorOptions()
        ]) ?>

        <div class="update-group-btn">
            <button type="button" class="btn btn-success btn-xs update-note">Submit</button>
            <button type="button" class="btn btn-default btn-xs cancel-update-btn">Cancel</button>
        </div>
    </div>
</div>

<div class="col-md-12 add-new-note">
    <div class="row">
        <div class="col-md-9 note-area">
            <div class="note-text">
                <?= CKEditor::widget([
                    'model' => $context->model,
                    'attribute' => $context->attribute,
                    'options' => [
                        'id' => $context->getId() . '-summernote',
                    ],
                    'clientOptions' => $context->getCkeditorOptions()
                ]) ?>
            </div>
        </div>
        <div class="col-md-3 attachment-area">
            <div class="note-uploads">
                <div class="dropzone-uploads dropzone"></div>
                <div class="attachment-buttons text-center">
                    <?= Html::button('<i class="fa fa-times"></i> Attachments', ['class' => 'clear-all-button btn btn-danger', 'disabled' => 'disabled']) ?>
                </div>
            </div>
        </div>
    </div>
</div>

