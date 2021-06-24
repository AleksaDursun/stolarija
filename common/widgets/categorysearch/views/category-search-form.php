<?php
/*
 * Nikola Kukric <info@singularity-solution.com>
 * Company: Singularity Solution <https://singularity-solution.com>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

use common\models\Category;
use common\models\Listing;
use common\models\ListingSearchForm;
use common\widgets\FileInput;
use dosamigos\ckeditor\CKEditor;
use yii\bootstrap4\ActiveForm;
use yii\helpers\Html;
use yii\helpers\Url;

/**
 * @var Category $selectedCategory
 * @var Category[] $categories
 * @var ListingSearchForm $model
 * @var string $columnClass
 */

$selectedCategory = $model->getCategory();

?>

<?php $form = ActiveForm::begin([
    'id' => $model->getFormId(),
    'method' => 'GET',
]); ?>

    <div class="container">
        <div class="search-main-container row mt-4">

            <div class="search-main col-lg-9">

                <div class="row mx--2">
                    <?php foreach ($model->getFilterAttributes() as $attribute): ?>
                        <?= $this->context->renderFilterAttribute($attribute) ?>
                    <?php endforeach; ?>
                    <?= $this->context->renderPriceInput() ?>
                    <?= $this->context->renderDistanceInput() ?>
                </div>

                <div class="row mx--2">

                    <div class="col-12 col-lg-6 px-2 mb-3">
                        <div class="search-check-container">
                            <div class="row">
                                <div class="container">
                                    <?= $this->context->renderListingOfferTypeInput() ?>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 col-lg-6 px-2 mb-3">
                        <div class="search-btn-container text-center text-lg-right">
                            <?= Html::a(Yii::t('app-category', 'Advanced search'), 'javascript:void(0)', [
                                'class' => 'btn btn-outline-dark btn-lg mr-2 advanced-search-toggle'
                            ]) ?>
                            <?= Html::submitButton('<i class="fal fa-search mr-2"></i>' . Yii::t('app-category', 'Search'), [
                                'class' => 'btn btn-gold btn-lg'
                            ]) ?>
                        </div>
                    </div>
                </div>

            </div>

            <div class="col-lg-3 d-flex justify-content-center align-items-center">
                <img src="https://via.placeholder.com/600.png?text=VašaReklama" alt="placeholder" class="img-fluid">
            </div>

        </div>
    </div>

    <div class="search-details-container mt-4 py-4" style="display: none">
        <div class="container">
            <div id="<?= $model->getFormId() . '-other-attributes' ?>" class="row mx--2">
                <div class="attribute-sizer col-w-1"></div>
                <?php foreach ($model->getOtherAttributes() as $attribute): ?>
                    <?= $this->context->renderFilterAttribute($attribute) ?>
                <?php endforeach; ?>
            </div>
        </div>
    </div>

<?php ActiveForm::end(); ?>