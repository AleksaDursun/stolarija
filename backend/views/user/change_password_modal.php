<?php

use common\widgets\modal\ModalContent;
use yii\helpers\Html;

$this->title = Yii::t('app', 'Change Password');

?>

<div>

    <?php ModalContent::begin([
        'title' => $this->title,
        'footer' =>
            Html::button(Yii::t('app', 'Cancel'), ['class' => 'btn btn-link ml-auto', 'data-dismiss' => 'modal']) .
            Html::submitButton(Yii::t('app', 'Change Password'), ['class' => 'btn btn-primary btn-modal-control-submit', 'data-form-id' => $model->getFormId()])
    ]) ?>

    <?= $this->render('_change_password_form', [
        'model' => $model,
    ]) ?>

    <?php ModalContent::end(); ?>

</div>

