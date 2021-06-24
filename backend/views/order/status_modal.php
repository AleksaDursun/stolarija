<?php
/*
 * Nikola Radovic <info@singularity.is>
 * Company: Singularity Solution <https://singularity.is>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

use common\widgets\DropdownList;
use common\widgets\modal\ModalContent;
use yii\bootstrap4\ActiveForm;
use yii\helpers\Html;

/** @var \common\models\Order $model */
?>

<div>

    <?php ModalContent::begin([
        'title' => 'Status narudžbe',
    ]) ?>

    <div id="order-status-form">
        <?php $form = ActiveForm::begin([
            'id' => $model->getFormId(),
            'action' => ['/order/status', 'id' => $model->id],
        ]) ?>

        <div class="row">

            <div class="col-12">
                <?= $form->field($model, 'status')->widget(DropdownList::class, [
                    'items' => $model->getStatusList()
                ]) ?>
            </div>

            <div class="col-12 text-right">
                <?= Html::button(Yii::t('app', 'Cancel'), ['class' => 'btn btn-link ml-auto', 'data-dismiss' => 'modal']) ?>
                <?= Html::submitButton(Yii::t('app', 'Save'), ['class' => 'btn btn-primary btn-modal-control-submit', 'data-form-id' => $model->getFormId()]) ?>
            </div>
        </div>
        <?php ActiveForm::end(); ?>
    </div>

    <?php ModalContent::end(); ?>

</div>
