<?php


use common\components\grid\GridView;
use common\helpers\RbacHelper;
use common\widgets\Switchy;
use yii\helpers\Html;
use yii\helpers\Url;
use yii\web\View;
use \common\components\treegrid\TreeGrid;
use \common\models\Category;
use \common\components\image\ImageSpecification;

/* @var $this yii\web\View */
/* @var $model common\models\Category */
/* @var $dataProvider yii\data\ActiveDataProvider */

?>


<?= TreeGrid::widget([
    'showFooter' => true,
    'keyColumnName' => 'id',
    'parentColumnName' => 'parent_category_id',
    'dataProvider' => $dataProvider,
    'columns' => [
        [
            'attribute' => 'sort'
        ],
        [
            'attribute' => 'name',
            'label' => 'Name',
            'headerOptions' => ['style' => 'max-width:50px'],
        ],
        [
            'attribute' => 'parentCategory.name',
            'label' => 'Parent Category',
        ],
        [
            'attribute' => 'is_active',
            'contentOptions' => ['class' => 'text-center'],
            'headerOptions' => ['class' => 'text-center'],
            'label' => Yii::t('app', 'Active'),
            'format' => 'raw',
            'value' => function (Category $model) use ($pjaxId) {
                return Switchy::widget([
                    'url' => Url::to(['category/status', 'attribute' => 'is_active', 'id' => $model->id]),
                    'checked' => $model->is_active ? 'checked' : '',
                    'pjaxId' => $pjaxId,
                    'confirmationMessage' => 'Da li želite ' . ($model->is_active ? 'deaktivirati ' : 'aktivirati') . ' kategoriju?',
                    'title' => $model->is_active ? Yii::t('app', 'Deaktiviraj') : Yii::t('app', 'Aktiviraj'),
                ]);
            },
        ],
        [
            'class' => 'yii\grid\ActionColumn',
            'options' => ['width' => '30px'],
            'template' => '<div class="text-right d-flex align-items-end">{update}</div>',
            'buttons' => [
                'update' => function ($url, $model) {
                    $url = Url::to(['/category/update', 'id' => $model->id]);
                    return Html::a('<i class="fal fa-wrench"></i>', $url, [
                        'class' => 'btn btn-sm btn-round btn-white btn-just-icon btn-modal-control btn-loading mr-1',
                        'data-pjax' => 0,
                        'title' => 'Update'
                    ]);
                },
            ],
        ],
    ],
]); ?>
