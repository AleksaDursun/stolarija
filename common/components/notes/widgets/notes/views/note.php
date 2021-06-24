<?php
/**
 * Aleksandar Panic <hola@2amigos.us>
 * Company: 2amigOS! <https://2amigos.us>
 *
 * @var $this \yii\base\View
 * @var \common\modules\notes\widgets\notes\RichNote $context
 */


use yii\widgets\Pjax;

/* @var $context \notes\widgets\notes\RichNote */
$context = $this->context;

?>

<div class="row rich-note" id="<?= $context->getId(); ?>-container">
    <?php if (!$context->disableNoteList): ?>
        <?php Pjax::begin([
            'id' => $context->pjaxContainerId,
            'enablePushState' => false,
            'enableReplaceState' => false,
            'options' => ['class' => 'note-list col-md-12 nicescroll']
        ]); ?>
            <?= $this->render('_note_list'); ?>
        <?php Pjax::end(); ?>
    <?php endif ?>

    <?php if (!$context->disableNoteAdd): ?>
        <?= $this->render('_add_new_note'); ?>
    <?php endif ?>
</div>