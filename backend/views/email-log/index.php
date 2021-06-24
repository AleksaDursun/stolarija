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
use yii\widgets\Pjax;

/**
 * @var \common\models\EmailLog $model
 * @var \yii\data\ActiveDataProvider $dataProvider
 */

$this->title = 'Email Log';
$pjaxId = 'email-log-pjax';

?>

<div class="row">
    <div class="col-md-12">
        <div class="card mt-3">
            <div class="card-header card-header-icon mb-0">
                <div class="card-text float-right p-0 bg-transparent">
                    <h4 class="card-title m-0">
                        <?= $this->render('_filter', [
                            'pjaxId' => $pjaxId,
                            'model' => $searchModel,
                        ]) ?>
                    </h4>
                </div>
                <h2 class="card-title"><i class="fal fa-envelope mr-4"></i>Email Log</h2>
            </div>
            <div class="card-body pt-0">
                <?php Pjax::begin(['id' => $pjaxId]); ?>
                <?= GridView::widget([
                    'pjaxId' => $pjaxId,
                    'showFooter' => true,
                    'dataProvider' => $dataProvider,
                    'columns' => [
                        [
                            'attribute' => 'id',
                            'label' => '#',
                        ],
                        [
                            'attribute' => 'subject',
                            'label' => 'Subject',
                        ],
                        [
                            'attribute' => 'to',
                            'label' => 'To',
                            'format' => 'raw',
                            'value' => function (EmailLog $model) {
                                return is_array($model->to) ? implode('<br>', $model->to) : $model->to;
                            },
                        ],
                        [
                            'attribute' => 'reply_to',
                            'label' => 'Reply to',
                            'format' => 'raw',
                            'value' => function (EmailLog $model) {
                                return is_array($model->reply_to) ? implode('<br>', $model->reply_to) : $model->reply_to;
                            },
                        ],
                        [
                            'attribute' => 'cc',
                            'label' => 'CC',
                            'format' => 'raw',
                            'value' => function (EmailLog $model) {
                                return is_array($model->cc) ? implode('<br>', $model->cc) : $model->cc;
                            },
                        ],
                        [
                            'attribute' => 'bcc',
                            'label' => 'BCC',
                            'format' => 'raw',
                            'value' => function (EmailLog $model) {
                                return is_array($model->bcc) ? implode('<br>', $model->bcc) : $model->bcc;
                            },
                        ],
                        [
                            'attribute' => 'num_attempts',
                            'label' => 'Att#',
                        ],
                        [
                            'attribute' => 'last_attempt_at',
                            'label' => 'Last Attempt',
                            'value' => function (EmailLog $model) {
                                return TimeHelper::createDateObjectFromTimestamp($model->last_attempt_at)->format(TimeHelper::DATETIME_FORMAT);
                            },
                        ],
                        [
                            'attribute' => 'status',
                            'label' => 'Status',
                            'format' => 'html',
                            'value' => function (EmailLog $model) {
                                $label = ucfirst($model->status);
                                return "<span class='badge badge-{$model->getStatusColor()}'>{$label}</span>";
                            },
                        ],
                    ],
                ]); ?>
                <?php Pjax::end(); ?>
            </div>
        </div>
    </div>
</div>