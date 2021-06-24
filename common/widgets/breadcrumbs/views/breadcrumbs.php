<?php
/*
 * Nikola Kukric <info@singularity-solution.com>
 * Company: Singularity Solution <https://singularity-solution.com>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

use common\models\Category;
use yii\helpers\Html;

/**
 * @var Category[] $items
 * @var string $currentItem
 */

?>

<div class="breadcrumbs my-3">
    <ul class="d-flex">
        <li class="ml-0 mr-2 breadcrumb-custom">
            <?= Html::a(Yii::t('app', 'Home'), '/', ['class' => 'text-gray']) ?>
        </li>
        <li class="breadcrumb-custom">
            <i class="fal fa-angle-right"></i>
        </li>
        <?php foreach ($items as $category): ?>
            <li class="mx-2 breadcrumb-custom">
                <?= Html::a(Yii::t('app-listing', $category->name), ['/search/category', 'slug' => $category->slug], ['class' => 'text-gray']) ?>
            </li>
            <li class="breadcrumb-custom">
                <i class="fal fa-angle-right"></i>
            </li>
        <?php endforeach ?>
        <li class="mx-2 breadcrumb-custom"><?= $currentItem ?></li>
    </ul>
</div>
