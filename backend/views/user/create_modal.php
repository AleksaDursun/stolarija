<?php


use common\widgets\modal\ModalContent;

?>

<div>

    <?php ModalContent::begin([
        'title' => 'Add User',
    ]) ?>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

    <?php ModalContent::end(); ?>

</div>
