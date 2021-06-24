<?php


use common\components\grid\GridView;
use common\helpers\RbacHelper;
use common\models\User;
use yii\helpers\Html;
use yii\helpers\Url;
use yii\widgets\Pjax;

/**
 * @var \common\models\User $model
 * @var \yii\data\ActiveDataProvider $dataProvider
 */

$this->title = 'Users';
$webUser = Yii::$app->user;
$pjaxId = 'user-list-pjax';

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
                            <?= Html::a('<i class="fal fa-plus"></i>Add User', ['/user/create'], [
                                'class' => 'btn btn-rose btn-modal-control m-0'
                            ]) ?>
                        </h4>
                    </div>
                    <h2 class="card-title"><i class="fal fa-users mr-4"></i>Users</h2>
                </div>
                <div class="card-body">
                    <?php Pjax::begin(['id' => $pjaxId]); ?>
                    <?= GridView::widget([
                        'pjaxId' => $pjaxId,
                        'dataProvider' => $dataProvider,
                        'columns' => [
                            [
                                'attribute' => 'id',
                                'label' => '#',
                            ],
                            [
                                'attribute' => 'fullName',
                                'label' => 'Full Name',
                            ],
                            [
                                'attribute' => 'email',
                                'label' => Yii::t('app', 'Email'),
                            ],
                            [
                                'attribute' => 'role',
                                'format' => 'raw',
                                'label' => Yii::t('app', 'Role'),
                                'value' => function (User $model) {
                                    $color = RbacHelper::getColorForRole($model->role);
                                    return Html::tag('span', $model->role, [
                                        'class' => "badge badge-pill badge-{$color}"
                                    ]);
                                },
                            ],
                            [
                                'class' => 'yii\grid\ActionColumn',
                                'options' => ['width' => '50px'],
                                'template' => '<div class="text-right">{update}</div>',
                                'buttons' => [
                                    'update' => function ($url, User $model) {
                                        $url = Url::to(['user/update', 'id' => $model->id]);
                                        return Html::a('<i class="fal fa-wrench"></i>', $url, [
                                            'class' => 'btn btn-sm btn-round btn-white btn-just-icon btn-loading btn-modal-control mr-1',
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