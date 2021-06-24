<?php


use common\components\grid\GridView;
use common\helpers\CurrencyHelper;
use common\helpers\TimeHelper;
use common\models\Post;
use common\models\Product;
use common\models\Publication;
use common\models\Team;
use common\widgets\Switchy;
use yii\helpers\Html;
use yii\helpers\Url;
use yii\widgets\Pjax;

/**
 * @var \common\models\Product $model
 * @var \yii\data\ActiveDataProvider $dataProvider
 */

$this->title = 'Proizvodi | Umjetnost u Drvetu';
$webUser = Yii::$app->user;
$pjaxId = 'product-list-pjax';

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
                            <?= $this->render('_filter', [
                                'pjaxId' => $pjaxId,
                                'model' => $searchModel,
                            ]) ?>
                            <?= Html::a('<i class="fal fa-plus"></i>Dodaj prozvod', ['/product/create'] , [
                                'class' => 'btn btn-rose btn-modal-control m-0'
                            ]) ?>
                        </h4>
                    </div>
                    <h2 class="card-title text-capitalize"><i class="fal fa-mobile-android mr-4"></i>Proizvodi</h2>
                </div>
                <div class="card-body">
                    <?php Pjax::begin(['id' => $pjaxId]); ?>
                    <?= GridView::widget([
                        'pjaxId' => $pjaxId,
                        'showFooter' => true,
                        'dataProvider' => $dataProvider,
                        'columns' => [
                            [
                                'attribute' => 'name',
                                'label' => 'Naziv'
                            ],
                            [
                                'attribute' => 'company',
                                'label' => 'Lager'
                            ],
                            [
                                'attribute' => 'image_url',
                                'label' => 'Slika',
                                'format' => 'raw',
                                'contentOptions' => ['class' => 'text-center'],
                                'headerOptions' => ['class' => 'text-center'],
                                'value' => function (Product $model) {
                                    return Html::img($model->getImageUrl(), [
                                        'class' => '',
                                        'height' => 64
                                    ]);
                                }
                            ],
                            [
                                'attribute' => 'manufacturer',
                                'label' => 'Proizvođać'
                            ],
                            [
                                'attribute' => 'category.name',
                                'label' => 'Kategorija'
                            ],
                            [
                                'attribute' => 'quantity',
                                'label' => 'Količina',
                                'contentOptions' => ['class' => 'text-center'],
                                'headerOptions' => ['class' => 'text-center'],
                                'format' => 'raw',
                                'value' => function (Product $model) {
                                    return $model->quantity>0 ? Html::tag('p', $model->quantity) :
                                        Html::tag('p', $model->quantity, [
                                                'class' => 'text-danger'
                                        ]);
                                }
                            ],
                            [
                                'attribute' => 'price',
                                'label' => 'Cijena',
                                'format' => 'raw',
                                'contentOptions' => ['class' => 'text-right'],
                                'headerOptions' => ['class' => 'text-right'],
                                'value' => function (Product $model) {
                                    return CurrencyHelper::format($model->price);
                                },
                            ],
                            [
                                'attribute' => 'retail_price',
                                'format' => 'raw',
                                'label' => 'Preporućena cijena',
                                'contentOptions' => ['class' => 'text-right'],
                                'headerOptions' => ['class' => 'text-right'],
                                'value' => function (Product $model) {
                                    return CurrencyHelper::format($model->retail_price);
                                },
                            ],
                            [
                                'attribute' => 'selling_price',
                                'label' => 'Prodajna cijena',
                                'format' => 'raw',
                                'contentOptions' => ['class' => 'text-right'],
                                'headerOptions' => ['class' => 'text-right'],
                                'value' => function (Product $model) {
                                    return  CurrencyHelper::format($model->selling_price, 2, $model->sale);
                                },
                            ],
                            [
                                'attribute' => 'updated_at',
                                'value' => function (Product $model) {
                                    return TimeHelper::format($model->updated_at);
                                },
                                'label' => 'Izmjena'
                            ],
                            [
                                'attribute' => 'is_active',
                                'contentOptions' => ['class' => 'text-center'],
                                'headerOptions' => ['class' => 'text-center'],
                                'label' => Yii::t('app', 'Active'),
                                'format' => 'raw',
                                'value' => function (Product $model) use ($pjaxId) {
                                    return Switchy::widget([
                                        'url' => Url::to(['product/status', 'attribute' => 'is_active', 'id' => $model->id]),
                                        'checked' => $model->is_active ? 'checked' : '',
                                        'pjaxId' => $pjaxId,
                                        'confirmationMessage' => 'Da li želite ' . ($model->is_active ? 'deaktivirati ' : 'aktivirati') . ' proizvod?',
                                        'title' => $model->is_active ? Yii::t('app', 'Deaktiviraj') : Yii::t('app', 'Aktiviraj'),
                                    ]);
                                },
                            ],
                            [
                                'class' => 'yii\grid\ActionColumn',
                                'options' => ['width' => '40px'],
                                'template' => '<div class="text-right">{update}</div>',
                                'buttons' => [
                                    'update' => function ($url, $model) {
                                        $url = Url::to(['/product/update', 'id' => $model->id]);
                                        return Html::a('<i class="fal fa-wrench"></i>', $url, [
                                            'class' => 'btn btn-sm btn-round btn-white btn-just-icon btn-loading btn-modal-control mr-1',
                                        ]);
                                    },
                                    'delete' => function ($url, $model) use ($pjaxId) {
                                        $url = Url::to(['product/delete', 'id' => $model->id]);
                                        return Html::a('<i class="fal fa-trash"></i>', $url, [
                                            'data-confirm-msg' => 'Da li ste sigurni da želite izbrisati?',
                                            'data-grid' => $pjaxId,
                                            'data-type' => 'post',
                                            'class' => 'btn btn-sm btn-round btn-danger btn-just-icon btn-control-pjax-action',
                                        ]);
                                    },
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
