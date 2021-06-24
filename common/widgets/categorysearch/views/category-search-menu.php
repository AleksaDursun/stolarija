<?php
/*
 * Nikola Kukric <info@singularity-solution.com>
 * Company: Singularity Solution <https://singularity-solution.com>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

use common\models\Category;
use common\models\ListingSearchForm;
use yii\helpers\Html;
use yii\helpers\Url;

/**
 * @var Category $selectedCategory
 * @var Category[] $categories
 * @var ListingSearchForm $model
 * @var string $columnClass
 */

$selectedCategory = $model->getCategory() ? : new Category();

?>

<div class="category-container row no-gutters">

    <?php foreach ($categories as $category): ?>
        <div class="category-drop <?= $columnClass ?>">
            <?php $childCategories = $category->childCategories; ?>
            <?php $isParentActive = $category->id === $selectedCategory->id || $selectedCategory->getIsChildOf($category->id); ?>
            <?php if ($childCategories): ?>
                <a href="javascript:void(0)"
                   class="btn dropdown-toggle<?= $isParentActive ? ' active-btn' : '' ?>"
                   id="dropdown<?= $category->id ?>" data-toggle="dropdown" aria-haspopup="true"
                   aria-expanded="false">
                    <div class="drop-icon"><?= $isParentActive ? $selectedCategory->getIconHtml() : $category->getIconHtml() ?></div>
                    <div class="drop-title"><?= Yii::t('app-category', $isParentActive ? $selectedCategory->name : $category->name) ?></div>
                    <div class="drop-arrow"><i class="fal fa-chevron-down"></i></div>
                </a>
                <div class="dropdown-menu" aria-labelledby="dropdown<?= $category->id ?>">
                    <?php foreach ($childCategories as $subCategory): ?>
                        <?= Html::a($subCategory->getIconHtml() . Yii::t('app-category', $subCategory->name),
                            ['/search/category', 'slug' => $subCategory->slug], [
                                'class' => 'dropdown-item' . ($subCategory->id === $selectedCategory->id ? ' active' : '')
                            ]) ?>
                    <?php endforeach; ?>
                </div>
            <?php else: ?>
                <a href="<?= Url::to(['/search/category', 'slug' => $category->slug]) ?>"
                   class="btn h-100 <?= $category->id === $selectedCategory->id ? ' active-btn' : '' ?>"
                   id="dropdown<?= $category->id ?>">
                    <div class="drop-icon"><?= $category->getIconHtml() ?></div>
                    <div class="drop-title"><?= Yii::t('app-category', $category->name) ?></div>
                </a>
            <?php endif ?>
        </div>
    <?php endforeach; ?>

</div>
