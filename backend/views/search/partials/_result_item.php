<?php
/*
 * Nikola Kukric <info@singularity.is>
 * Company: Singularity Solution <https://singularity.is>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

use common\helpers\IconHelper;
use yii\helpers\ArrayHelper;
use yii\helpers\Url;


$iconClass = IconHelper::getIconByType(ArrayHelper::getValue($model, 'type', $model['type']));
$iconClass .= ' ' . ArrayHelper::getValue(IconHelper::getTextColorClassMap(), $model['type'], '');
$url = Url::to(['/search/resolve-result', 'modelId' => $model['_modelId'], 'modelClass' => $model['type']]);

?>

<a href="<?= $url ?>" class="list-group-item bg-lightest-hover" data-pjax="0">
    <div class="media col-xs-12">
        <div class="media-icon text-center align-self-center">
            <i class="fal fa-3x mr-3 <?= $iconClass ?>"></i>
        </div>
        <div class="media-body">
            <div class="media-heading"><?= $model['name']; ?></div>
            <small class="m-0 text-muted"><?= $model['text']; ?></small>
        </div>
    </div>
</a>
