<?php


use common\components\grid\GridView;
use common\helpers\CurrencyHelper;
use common\helpers\TimeHelper;
use common\models\Order;
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
                    </div>
                    <h2 class="card-title text-capitalize"><i class="fal fa-shopping-cart mr-4"></i>Narudžbe</h2>
                </div>
                <div class="card-body">
                    <?php Pjax::begin(['id' => $pjaxId]); ?>
                    <?= GridView::widget([
                        'pjaxId' => $pjaxId,
                        'showFooter' => true,
                        'dataProvider' => $dataProvider,
                        'columns' => [
                            [
                                'attribute' => 'first_name',
                                'label' => 'Kupac',
                                'format' => 'raw',
                                'value' => function (Order $model) {
                                    return $model->getOrderAddressFormat();
                                }
                            ],
                            [
                                'attribute' => 'notes',
                                'label' => 'Napomena',
                            ],
                            [
                                'attribute' => 'created_at',
                                'label' => 'Datum',
                                'value' => function (Order $model) {
                                    return TimeHelper::format($model->created_at, TimeHelper::DATETIME_FORMAT);
                                },
                            ],
                            [
                                'attribute' => 'orderItems',
                                'label' => 'Stavke',
                                'format' => 'raw',
                                'value' => function (Order $model) {
                                    return $model->getOrderItemsList();
                                }
                            ],
                            [
                                'attribute' => 'price',
                                'label' => 'Cijena',
                                'format' => 'raw',
                                'contentOptions' => ['class' => 'text-right'],
                                'headerOptions' => ['class' => 'text-right'],
                                'value' => function (Order $model) {
                                    return CurrencyHelper::format($model->price);
                                }
                            ],
                            [
                                'attribute' => 'status',
                                'format' => 'raw',
                                'label' => 'Status',
                                'headerOptions' => ['class' => 'text-left'],
                                'contentOptions' => ['class' => 'text-left'],
                                'value' => function (Order $model) {
                                    return $model->getOrderStatusLabels();
                                },
                            ],
                        ],
                    ]); ?>
                    <?php Pjax::end(); ?>
                </div>
            </div>
        </div>
    </div>
</div>
