<?php
/*
 * Nikola Kukric <info@singularity.is>
 * Company: Singularity Solution <https://singularity.is>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

use common\widgets\modal\ModalContent;
use yii\widgets\ListView;
use yii\widgets\Pjax;
use yii\helpers\Json;
use yii\helpers\Html;
use yii\helpers\Url;

$isNonAjaxRequest = !Yii::$app->request->isAjax;
$searchUrl = Url::current();
$this->title = Yii::t('app', 'Search results for "{:query}"', [':query' => $model->query]);

?>

<?php ModalContent::begin([
    'title' => $this->title,
    'footer' => Html::button(Yii::t('app', 'Cancel'), [
        'class' => 'btn btn-link  ml-auto',
        'data-dismiss' => 'modal'
    ])
]) ?>

    <div class="row search-modal-items">
        <div class="col-md-12 result-list">
            <ul id="result-tabs" class="nav nav-pills flex-column flex-sm-row">
                <li class="nav-item flex-sm-fill text-sm-center mb-2">
                    <a class="nav-link active" href="#results" data-toggle="tab" data-category="">
                        <?= Yii::t('app', 'All results') ?>
                    </a>
                </li>
                <?php foreach ($model->labels as $key => $label): ?>
                    <li class="nav-item flex-sm-fill text-sm-center mb-2">
                        <?= Html::a($label, '#results', [
                                'class' => 'nav-link',
                                'data-toggle' => 'tab',
                                'data-category' => $key,
                        ]) ?>
                    </li>
                <?php endforeach; ?>
            </ul>

            <div class="tab-content col-xs-12 mt-4">
                <div id="results" class="tab-pane active">
                    <?php Pjax::begin([
                        'options' => [
                            'id' => 'search-results'
                        ],
                        'enablePushState' => false,
                        'timeout' => 10000
                    ]); ?>

                    <?= ListView::widget([
                        'dataProvider' => $dataProvider,
                        'itemView' => 'partials/_result_item',
                        'options' => ['class' => 'list-group list-group-flush list my--3 nicescroll']
                    ]); ?>

                    <?php Pjax::end(); ?>

                </div>
            </div>
        </div>
    </div>

<?php ModalContent::end(); ?>

<?php
$searchTypeName = Json::encode(Html::getInputName($model, 'type'));
$searchUrlString = Json::encode($searchUrl);
$this->registerJs(<<<SCRIPT
(function() {
    $('#result-tabs, #result-tabs-left-side').on('show.bs.tab', function(e) {
        var category = $(e.target).data('category');
 
        var data = {
            {$searchTypeName} : category
        }

        $.pjax.reload({
            container:'#search-results',
            url: {$searchUrlString},
            data: data, 
            replace:false,
            timeout: 10000
        });
    });
    
     $(document)
            .on('pjax:send', function() {
                main.ui.loading(true);
            })
            .on('pjax:complete', function() {
                main.ui.loading(false);
            });
     
     $("#results img").on('load', function() {
            $(this).closest('.thumb-preview').removeClass('loader-bg');
        });
})();
SCRIPT
);
