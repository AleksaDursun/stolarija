<?php
/**
 * Nikola Jankovic  <info@singulaity.is>
 * Company: Singularity Solution <https://singulaity.is>
 */

use yii\bootstrap4\ActiveForm;
use yii\bootstrap4\Html;

?>

    <h6 class="heading-small  mb-4"><?= Yii::t('app', 'User info'); ?></h6>

<?php $form = ActiveForm::begin(['fieldConfig' => []]); ?>
    <div class="row">
        <div class="col-lg-4">
            <div class="form-group">
                <?= $form->field($model, 'num_free_active_listings')->textInput(['placeholder' => Yii::t('app', 'Free listings')]); ?>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="form-group">
                <?= $form->field($model, 'num_posts_on_home')->textInput(['placeholder' => Yii::t('app', 'Posts on home')]); ?>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="form-group">
                <?= $form->field($model, 'num_events_on_home')->textInput(['placeholder' => Yii::t('app', 'Events on home')]); ?>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-12 text-right">
            <?= Html::a('Cancel', '/dashboard', ['class' => 'btn btn-link ml-auto']) ?>
            <?= Html::submitButton(Yii::t('app', 'Save'), ['class' => 'btn btn-primary', 'name' => 'save-button']) ?>
        </div>
    </div>


<?php ActiveForm::end(); ?>