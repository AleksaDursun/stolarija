<?php

use common\helpers\ArrayHelper;
use common\helpers\Select2Helper;
use common\widgets\select2\Select2;
use yii\bootstrap4\Html;
use yii\widgets\ActiveForm;


/* @var $this yii\web\View */
/* @var $model common\models\Category */

$excludeIds = $model->childCategories ? array_values(ArrayHelper::map($model->childCategories, 'id', 'id')) : [];
$excludeIds[] = $model->id;
$excludeIds = ArrayHelper::merge($excludeIds, $model->getCategoriesWithoutParents());


?>

<div id="category-form">

    <?php $form = ActiveForm::begin([
        'id' => $model->getFormId(),
        'action' => $model->isNewRecord ?
            ['/category/create'] :
            ['/category/update', 'id' => $model->id]
    ]) ?>

    <div class="row">

        <div class="col-12 col-lg-6">
            <?= $form->field($model, 'name')->textInput() ?>
        </div>

      <div class="col-12 col-lg-6">
        <?= $form->field($model, 'name_en')->textInput() ?>
      </div>

      <div class="col-12 col-lg-6">
        <?= $form->field($model, 'name_de')->textInput() ?>
      </div>

      <div class="col-12 col-lg-4">
            <?= $form->field($model, 'sort')->textInput([
                    'type' => 'number'
                ])?>
        </div>

        <div class="col-12 col-lg-6">
            <?= $form->field($model, 'parent_category_id')->widget(Select2::class,
                Select2Helper::getProductCategoryConfig($model, 'parent_category_id', true,
                    ['excludedIds' => $excludeIds])
            ) ?>
        </div>

        <div class="col-12 text-right mt-4">
            <?= Html::button(Yii::t('app', 'Cancel'), ['class' => 'btn btn-link ml-auto', 'data-dismiss' => 'modal']) ?>
            <?= Html::submitButton(Yii::t('app', 'Save'), ['class' => 'btn btn-primary btn-modal-control-submit', 'data-form-id' => $model->getFormId()]) ?>
        </div>
    </div>

    <?php ActiveForm::end(); ?>

</div>

