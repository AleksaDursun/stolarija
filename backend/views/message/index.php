<?php
/**
 * Nikola Jankovic  <hello@singularity.is>
 * Company: Singularity Solution <https://singularity.is>
 */

/* @var $this yii\web\View */
/* @var $searchModel common\models\search\SourceMessageSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = Yii::t('app', 'Translation');
$mainTitle = Yii::t('app', 'Administration');
$pjaxId = 'translation-pjax';

use common\components\grid\GridView;
use common\helpers\RbacHelper;
use common\widgets\Filter;
use yii\bootstrap4\Html;
use yii\helpers\Url;
use yii\widgets\Pjax;

?>


<?php Pjax::begin(['id' => $pjaxId]); ?>
<div class="header bg-sunspalato pb-6">
    <div class="container-fluid">
        <div class="header-body">
            <div class="row align-items-center pt-4 pb-2">
                <div class="col-auto col-sm-6">
                    <h6 class="h2 d-inline-block mb-0"><?= Html::encode($mainTitle) ?></h6>
                </div>
                <div class="col-auto ml-auto col-sm-6 text-right">
                    <?= Filter::widget([
                        'model' => $searchModel,
                        'pjaxId' => $pjaxId,
                        'viewFile' => '//message/partials/_filter',
                    ]); ?>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Page content -->
<div class="container-fluid mt--6">
    <div class="row">
        <div class="col">
            <div class="card">
                <!-- Card header -->
                <div class="card-header">
                    <div class="row">
                        <div class="col-6">
                            <h3 class="mb-0"><?= Html::encode($this->title) ?></h3>
                        </div>
                        <div class="col-6">
                            <?php if (Yii::$app->user->can(RbacHelper::ROLE_ADMIN)): ?>
                                <?= Html::a(Yii::t('app', 'New'),
                                    ['create'],
                                    ['class' => 'btn btn-sm btn-neutral pull-right btn-modal-control']);
                                ?>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
                <?= GridView::widget([
                    'pjaxId' => $pjaxId,
                    'dataProvider' => $dataProvider,
                    'columns' => [
                        [
                            'class' => 'yii\grid\SerialColumn',
                            'contentOptions' => ['class' => ' w-10 '],
                        ],
                        [
                            'attribute' => 'sourceMessage.category',
                            'label' => Yii::t('app', 'Category'),
                        ],
                        [
                            'attribute' => 'sourceMessage.message',
                            'label' => Yii::t('app', 'Message'),
                        ],
                        [
                            'attribute' => 'language',
                            'label' => Yii::t('app', 'Language'),
                        ],
                        [
                            'attribute' => 'translation',
                            'label' => Yii::t('app', 'Translation'),
                        ],
                        ['class' => 'yii\grid\ActionColumn',
                            'options' => ['width' => '200px'],
                            'template' => '<div class="pull-right">{update}{delete}</div>',
                            'buttons' =>
                                [
                                    'update' => function ($url, $model) {
                                        $url = Url::to(['message/update', 'id' => $model->id]);
                                        return Html::a('<i class="fal fa-wrench primary-color"></i>', $url, ['title' => \Yii::t('app', 'Update'), 'class' => 'btn btn-sm btn-icon-only rounded-circle btn-modal-control', 'data-toggle' => 'tooltip', 'data-placement' => 'top']);
                                    },
                                    'delete' => function ($url, $model) use ($pjaxId) {
                                        $url = Url::to(['message/delete', 'id' => $model->id]);
                                        return Html::a('<i class="fal fa-trash"></i>', $url, ['title' => \Yii::t('app', 'Delete'),
                                            'data-pjax' => '0',
                                            'data-pjax-id' => $pjaxId,
                                            'data-json-response' => '1',
                                            'data-msg' => Yii::t('app', 'Do you want to delete translation?'),
                                            'class' => 'btn btn-sm btn-icon-only rounded-circle delete-button btn-control-confirm',
                                            'data-toggle' => 'tooltip',
                                            'data-placement' => 'top']);
                                    },
                                ],
                        ],
                    ],
                ]); ?>
            </div>
        </div>
    </div>
</div>
<?php Pjax::end(); ?>

