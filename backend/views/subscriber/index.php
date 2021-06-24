<?php


use common\components\grid\GridView;
use common\helpers\TimeHelper;
use common\models\Publication;
use common\models\Subscriber;
use common\widgets\Switchy;
use yii\helpers\Html;
use yii\helpers\Url;
use yii\widgets\Pjax;

/**
 * @var \common\models\Subscriber $model
 * @var \yii\data\ActiveDataProvider $dataProvider
 */
$type = Yii::$app->controller->id;
$this->title = 'Umjetnost u Drvetu | Subscribers';
$webUser = Yii::$app->user;
$pjaxId = 'publication-list-pjax';

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
                    <div class="card-text float-right p-0 bg-transparent">
                        <h4 class="card-title m-0">
                            <?= Html::a('<i class="fal fa-plus"></i>Dodaj preplatnika' , ['/subscriber/create'], [
                                'class' => 'btn btn-rose btn-modal-control m-0'
                            ]) ?>
                        </h4>
                    </div>
                    <h2 class="card-title text-capitalize"><i class="fal fa-user mr-4"></i>Preplatnici</h2>
                </div>
                <div class="card-body">
                    <?php Pjax::begin(['id' => $pjaxId]); ?>
                    <?= GridView::widget([
                        'pjaxId' => $pjaxId,
                        'showFooter' => true,
                        'dataProvider' => $dataProvider,
                        'columns' => [
                            [
                                'attribute' => 'email',
                            ],
                            [
                                'attribute' => 'created_at',
                                'value' => function (Subscriber $model) {
                                    return TimeHelper::format($model->created_at);
                                },
                                'label' => 'Datum preplate'
                            ],
                            [
                                'attribute' => 'is_active',
                                'label' => Yii::t('app', 'Active'),
                                'format' => 'raw',
                                'value' => function (Subscriber $model) use ($pjaxId) {
                                    return Switchy::widget([
                                        'url' => Url::to(['subscriber/toggle', 'attribute' => 'is_active', 'id' => $model->id]),
                                        'checked' => $model->is_active ? 'checked' : '',
                                        'pjaxId' => $pjaxId,
                                        'confirmationMessage' => 'Da li želite ' . ($model->is_active ? 'deaktivirati ' : 'aktivirati') . ' preplatnika?',
                                        'title' => $model->is_active ? Yii::t('app', 'Deactivate') : Yii::t('app', 'Activate'),
                                    ]);
                                },
                            ],
                            [
                                'class' => 'yii\grid\ActionColumn',
                                'options' => ['width' => '70px'],
                                'template' => '<div class="text-right">{update}</div>',
                                'buttons' => [
                                    'update' => function ($url, $model) {
                                        $url = Url::to(['/subscriber/update', 'id' => $model->id]);
                                        return Html::a('<i class="fal fa-wrench"></i>', $url, [
                                            'class' => 'btn btn-sm btn-round btn-white btn-just-icon btn-loading btn-modal-control mr-1',
                                        ]);
                                    }
                                ],
                            ],
                        ],
                    ]); ?>
                    <?php Pjax::end(); ?>
                </div>
            </div>
        </div>
    </div>
</div>
