<?php
/**
 * Nikola Jankovic  <hello@singularity.is>
 * Company: Singularity Solution <https://singularity.is>
 */

use common\widgets\modal\ModalContent;
use yii\helpers\Html;

$this->title = Yii::t('app', 'Adding new translation');
?>

<div>
    <?php ModalContent::begin([
        'title' => $this->title,
        'footer' =>
            Html::button(Yii::t('app', 'Cancel'), ['class' => 'btn btn-link  ml-auto', 'data-dismiss' => 'modal']) .
            Html::submitButton(Yii::t('app', 'Save'), ['class' => 'btn btn-primary btn-modal-control-submit', 'data-form-id' => $model->getFormId()])
    ]) ?>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

    <?php ModalContent::end(); ?>
</div>
