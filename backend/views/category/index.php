<?php


use common\models\search\ClientTypeSearch;
use yii\helpers\Url;
use yii\helpers\Html;
use common\components\grid\GridView;
use yii\widgets\Pjax;

/* @var $this yii\web\View */
/* @var $model common\models\Category */
/* @var $searchModel common\models\search\CategorySearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = Yii::t('app', 'Categories');
$this->params['breadcrumbs'][] = $this->title;

$pjaxId = 'category-pjax';

$this->registerJs("
    $(document).on('modal-submitted', function(e, xhr, btn, frm, data) {
        if (xhr.success && $('#{$pjaxId}').length) { 
            $.pjax.reload({
                container:'#{$pjaxId}',
                push: false, 
                replace: false, 
                timeout: 10000
            });
        }
    });
");

?>

<div class="container-fluid">
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header card-header-icon">
                    <div class="card-text float-right p-0">
                        <h4 class="card-title m-0">
                            <?= $this->render('_filter', [
                                'pjaxId' => $pjaxId,
                                'model' => $searchModel,
                            ]) ?>
                            <?= Html::a('<i class="fal fa-plus"></i>' . Yii::t('app', 'Category'), ['/category/create'], [
                                'class' => 'btn btn-rose btn-modal-control btn-loading m-0',
                                'data-size' => 'modal-lg'
                            ]) ?>
                        </h4>
                    </div>
                    <h2 class="card-title"><i
                                class="fal fa-map-marker-plus mr-4"></i><?= Yii::t('app', 'Categories'); ?>
                    </h2>
                </div>
                <div class="card-body">

                    <?php Pjax::begin(['id' => $pjaxId]); ?>

                    <?= $this->render('_grid', [
                        'pjaxId' => $pjaxId,
                        'model' => $searchModel,
                        'dataProvider' => $dataProvider
                    ]) ?>

                    <?php Pjax::end(); ?>
                </div>
            </div>
        </div>
    </div>
</div>