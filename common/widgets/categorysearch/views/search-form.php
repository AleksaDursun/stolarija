<?php
/*
 * Nikola Kukric <info@singularity-solution.com>
 * Company: Singularity Solution <https://singularity-solution.com>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

use common\models\CategoryAttribute;
use common\models\search\Search;
use yii\bootstrap4\ActiveForm;

/**
 * @var CategoryAttribute[] $resultMainAttributes
 * @var CategoryAttribute[] $resultOtherAttributes
 * @var Search $model
 * @var bool $hasAdSeparator
 */

?>


<?php foreach ($resultMainAttributes as $categoryAttribute): ?>
    <div class="accordion mb-2" id="attribute-accordion-<?= $categoryAttribute->id ?>">
        <div class="card">
            <div class="card-header" id="attribute-heading-<?= $categoryAttribute->id ?>">
                <a href="#" class="btn btn-link" type="button" data-toggle="collapse"
                   data-target="#collapse-attribute-<?= $categoryAttribute->id ?>"
                   aria-expanded="true" aria-controls="collapse2">
                    <?= $categoryAttribute->getLabelText() ?>
                    <span class="float-right"><i class="far fa-chevron-down"></i></span>
                </a>
            </div>

            <div id="collapse-attribute-<?= $categoryAttribute->id ?>" class="collapse show"
                 aria-labelledby="attribute-heading-<?= $categoryAttribute->id ?>"
                 data-parent="#attribute-accordion-<?= $categoryAttribute->id ?>">
                <div class="card-body">
                    <?= $this->context->renderFilterAttribute($categoryAttribute) ?>
                </div>
            </div>
        </div>
    </div>
<?php endforeach; ?>

<?php if ($hasAdSeparator): ?>
    <div class="ads-left-col mb-3">
        <img src="https://via.placeholder.com/212x161.png?text=Reklama" alt="placeholder" class="img-fluid">
    </div>
<?php endif ?>

<div class="accordion mb-2" id="attribute-accordion-price">
    <div class="card">
        <div class="card-header" id="attribute-heading-price">
            <a href="#" class="btn btn-link" type="button" data-toggle="collapse"
               data-target="#collapse-attribute-price"
               aria-expanded="true" aria-controls="collapse2">
                <?= Yii::t('app-search', 'Price') ?>
                <span class="float-right"><i class="far fa-chevron-down"></i></span>
            </a>
        </div>

        <div id="collapse-attribute-price" class="collapse"
             aria-labelledby="attribute-heading-price"
             data-parent="#attribute-accordion-price">
            <div class="card-body">
                <?= $this->context->renderPriceInput() ?>
            </div>
        </div>
    </div>
</div>

<div class="accordion mb-2" id="attribute-accordion-distance">
    <div class="card">
        <div class="card-header" id="attribute-heading-distance">
            <a href="#" class="btn btn-link" type="button" data-toggle="collapse"
               data-target="#collapse-attribute-distance"
               aria-expanded="true" aria-controls="collapse2">
                <?= Yii::t('app-search', 'Distance') ?>
                <span class="float-right"><i class="far fa-chevron-down"></i></span>
            </a>
        </div>

        <div id="collapse-attribute-distance" class="collapse"
             aria-labelledby="attribute-heading-distance"
             data-parent="#attribute-accordion-distance">
            <div class="card-body">
                <?= $this->context->renderDistanceInput() ?>
            </div>
        </div>
    </div>
</div>

<?php foreach ($resultOtherAttributes as $categoryAttribute): ?>
    <div class="accordion mb-2" id="attribute-accordion-<?= $categoryAttribute->id ?>">
        <div class="card">
            <div class="card-header" id="attribute-heading-<?= $categoryAttribute->id ?>">
                <a href="#" class="btn btn-link" type="button" data-toggle="collapse"
                   data-target="#collapse-attribute-<?= $categoryAttribute->id ?>"
                   aria-expanded="false" aria-controls="collapse2">
                    <?= $categoryAttribute->getLabelText() ?>
                    <span class="float-right"><i class="far fa-chevron-down"></i></span>
                </a>
            </div>

            <div id="collapse-attribute-<?= $categoryAttribute->id ?>" class="collapse"
                 aria-labelledby="attribute-heading-<?= $categoryAttribute->id ?>"
                 data-parent="#attribute-accordion-<?= $categoryAttribute->id ?>">
                <div class="card-body">
                    <?= $this->context->renderFilterAttribute($categoryAttribute) ?>
                </div>
            </div>
        </div>
    </div>
<?php endforeach; ?>

<?php ActiveForm::end(); ?>