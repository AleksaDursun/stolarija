<?php
/*
 * Nikola Kukric <info@singularity-solution.com>
 * Company: Singularity Solution <https://singularity-solution.com>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

use common\helpers\Select2Helper;
use common\models\search\UserSearch;
use common\widgets\select2\Select2;
use yii\bootstrap4\ActiveForm;
use yii\helpers\Html;
use yii\web\JsExpression;
use common\helpers\StatusHelper;
use common\helpers\RbacHelper;
/** @var UserSearch $model */


$company_id = Html::getInputId($model, 'company_id');


$webUser = Yii::$app->user;



$this->registerJs("
    $(document).on('modal-submitted', function(e, xhr, btn, frm, data) {
        $.pjax.reload({
            container:'#{$pjaxId}',
            push: false, 
            replace: true, 
            timeout: 10000
        });
    });
    
    $('#{$model->getFormId()}').on('submit', function(event) {
        event.preventDefault(); 
        event.stopPropagation(); 
        main.ui.buttonLoading($(this).find('button'), true);
        $.pjax.submit(event, '#{$pjaxId}', {timeout: 10000, replace: true, push: false});
    });
    
    $(document).on('pjax:complete', function() {
        main.ui.buttonLoading($('#{$model->getFormId()}').find('button'), false);
        $('#{$model->getFormId()}').find('.dropdown').removeClass('show');
        $('#{$model->getFormId()}').find('.dropdown-menu').removeClass('show');
    });
");

?>

<?php $form = ActiveForm::begin([
    'id' => $model->getFormId(),
    'options' => ['class' => 'm-0 d-inline-block'],
    'method' => 'get'
]); ?>

    <div class="filter-plugin">
        <div class="dropdown show-dropdown">
            <?= Html::a('<i class="fal fa-filter text-gray"></i>', 'javascript:void(0)', [
                'class' => 'btn btn-white m-0',
                'data-toggle' => "dropdown",
                'aria-expanded' => "true"
            ]) ?>
            <ul class="dropdown-menu allow-click p-3 filter-dropdown-menu" x-placement="bottom-start"
                style="position: absolute; top: 41px; left: -231px; will-change: top, left;">
                <li class="header-title">User Filters</li>
                <li class="w-100">
                    <div class="row">
                        <div class="col-12">
                            <?= $form->field($model, 'fullName')->textInput()?>
                        </div>
                        <div class="col-12">
                            <?= $form->field($model, 'email')->textInput(); ?>
                        </div>
                    </div>
                </li>
                <li class="button-container">
                    <?= Html::submitButton('Apply Filter', ['class' => 'btn btn-primary btn-block']) ?>
                </li>
            </ul>
        </div>
    </div>

<?php ActiveForm::end(); ?>