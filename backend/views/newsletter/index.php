<?php
/*
 * Nikola Kukric <info@singularity-solution.com>
 * Company: Singularity Solution <https://singularity-solution.com>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

use common\components\grid\GridView;
use common\helpers\TimeHelper;
use common\models\EmailLog;
use common\models\Newsletter;
use yii\helpers\Html;
use yii\widgets\Pjax;

/**
 * @var \common\models\EmailLog $model
 * @var \yii\data\ActiveDataProvider $dataProvider
 */

$this->title = 'Newsletters';
$pjaxId = 'email-log-pjax';

?>

<div class="row">
    <div class="col-md-12">
        <div class="card mt-3">
            <div class="card-header card-header-icon mb-0">
                <div class="card-text float-right p-0 bg-transparent">
                    <h4 class="card-title m-0">
                        <?= Html::a('<i class="fal fa-plus"></i>Dodaj newsletter', ['/newsletter/create'] , [
                            'class' => 'btn btn-rose btn-modal-control m-0'
                        ]) ?>
                    </h4>
                </div>
                <h2 class="card-title"><i class="fal fa-envelope mr-4"></i>Newsletters</h2>
            </div>
            <div class="card-body pt-0">
                <?php Pjax::begin(['id' => $pjaxId]); ?>
                <?= GridView::widget([
                    'pjaxId' => $pjaxId,
                    'showFooter' => true,
                    'dataProvider' => $dataProvider,
                    'columns' => [
                        [
                            'attribute' => 'subject',
                            'label' => 'Subject',
                        ],
                        [
                            'attribute' => 'image_id',
                            'label' => 'Slika',
                            'format' => 'raw',
                            'contentOptions' => ['class' => 'text-center'],
                            'headerOptions' => ['class' => 'text-center'],
                            'value' => function (Newsletter $model) {
                                return Html::img($model->image->getUrl(), [
                                    'class' => '',
                                    'height' => 128
                                ]);
                            }
                        ],
                    ],
                ]); ?>
                <?php Pjax::end(); ?>
            </div>
        </div>
    </div>
</div>