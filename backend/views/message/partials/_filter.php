<?php
/*
 * Nikola Kukric <info@singularity.is>
 * Company: Singularity Solution <https://singularity.is>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

use yii\bootstrap4\ActiveForm;
use yii\bootstrap4\Html;

/**
 * @var $model \common\models\search\MessageSearch
 */

?>

<div class="filter-container p-4">
    <?php $form = ActiveForm::begin(['fieldConfig' => []]); ?>

    <div class="row">
        <div class="col-lg-12">
            <div class="form-group">
                <?= $form->field($model, 'source_message', [
                    'inputOptions' => ['placeholder' => Yii::t('app', 'Source')],
                ])->textInput() ?>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-lg-12">
            <div class="form-group">
                <?= $form->field($model, 'translation', [
                    'inputOptions' => ['placeholder' => Yii::t('app', 'Translation')],
                ])->textInput() ?>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-6">
            <?= Html::button(Yii::t('app', 'Clear'), ['class' => 'clear-form btn btn-secondary ml-auto']) ?>
        </div>
        <div class="col-6 text-right">
            <?= Html::submitButton(Yii::t('app', 'Filter'), ['class' => 'btn btn-primary', 'name' => 'save-button']) ?>
        </div>
    </div>


    <?php ActiveForm::end(); ?>
</div>

