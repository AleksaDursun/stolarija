<?php
/**
 * Nikola Jankovic  <hello@singularity.is>
 * Company: Singularity Solution <https://singularity.is>
 */

namespace common\widgets;


use common\helpers\ArrayHelper;
use Yii;
use yii\base\Widget;
use yii\helpers\Html;
use yii\helpers\Json;

class TabsFilter extends Widget
{
    public $filteredCategories;
    public $allCategories;
    public $searchModel;
    public $categoryAttribute = 'category_id';
    public $urlParams;
    public $pjaxId;
    public $queryParams;
    public $activeClass = 'tablink-active';
    public $backgroundLightestClass = 'bg-lightest';

    public function run()
    {
        $this->registerJs();

        return $this->renderTabs();
    }

    public function renderTabs()
    {
        $tabs = '';

        $allListingsLabel = Yii::t('app', 'All listings');

        $this->urlParams = $this->urlParams ?: [$this->categoryAttribute];

        $queryParams = Yii::$app->getRequest()->getQueryParams();
        $categoryIdParam = $queryParams ? ArrayHelper::getValue($queryParams, 'ListingSearch.category_id') : '';

        $allListingsActive = $categoryIdParam == '' ? $this->activeClass : '';

        $tabs .= "<li class=\"d-none d-md-inline-block\">" . Html::a($allListingsLabel, [$this->queryParams], [
                'class' => "tablink tablink-cutomize " . ($allListingsActive),
                'id' => $this->getId() . "All",
                'data-value' => '',
                'data-text' => $allListingsLabel,
                'data-pjax' => 0
            ]) . "</li>";

        foreach ($this->filteredCategories as $filteredCategory) {
            $urlParams = [];
            foreach ($this->urlParams as $attribute) {
                $urlParams[Html::getInputName($this->searchModel, $attribute)] = $filteredCategory['id'];
            }
            $tabs .= "<li class=\"d-none d-md-inline-block\">" . Html::a($filteredCategory['name'], [$this->queryParams . $filteredCategory['id']], [
                    'class' => "tablink tablink-cutomize " . ($filteredCategory['id'] == $categoryIdParam ? $this->activeClass : ''),
                    'id' => $this->getId() . $filteredCategory['id'],
                    'data-attributes' => Json::encode($urlParams),
                    'data-value' => intval($filteredCategory['id']),
                    'data-text' => $filteredCategory['name'],
                    'data-pjax' => 0
                ]) . "</li>";
        }
        return "<ul class=\"collection-tabs small--hide\" id='{$this->getId()}'>" . $tabs . $this->renderMobileView() . $this->renderOtherCategories() . '</ul>';
    }

    public function renderOtherCategories()
    {
        $tabs = '';

        $otherFiltersLabel = Yii::t('app', 'Other filters');

        $this->urlParams = $this->urlParams ?: [$this->categoryAttribute];

        $queryParams = Yii::$app->getRequest()->getQueryParams();
        $categoryIdParam = $queryParams ? ArrayHelper::getValue($queryParams, 'ListingSearch.category_id') : '';


        $allCategoryIds = [];

        foreach ($this->allCategories as $category) {
            array_push($allCategoryIds,$category['id']);
        }

        $otherFilterActive = in_array($categoryIdParam, $allCategoryIds) ? $this->activeClass : '';

        $tabs .= "<a class=\"tablink {$otherFilterActive} dropdown-toggle\" id=\"dropdownMenuButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">
                      {$otherFiltersLabel}
                  </a>";
        $tabs .= "<div class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuButton\">";

        foreach ($this->allCategories as $filteredCategory) {
            $urlParams = [];
            foreach ($this->urlParams as $attribute) {
                $urlParams[Html::getInputName($this->searchModel, $attribute)] = $filteredCategory['id'];
            }
            $tabs .= Html::a($filteredCategory['name'], [$this->queryParams . $filteredCategory['id']], [
                    'class' => "dropdown-item " . ($filteredCategory['id'] == $categoryIdParam ? $this->backgroundLightestClass : ''),
                    'id' => $this->getId() . $filteredCategory['id'],
                    'data-attributes' => Json::encode($urlParams),
                    'data-value' => intval($filteredCategory['id']),
                    'data-text' => $filteredCategory['name'],
                    'data-pjax' => 0
                ]) ;
        }
        $tabs .= "</div>";
        return "<li class=\"dropdown cursor-pointer\" id='{$this->getId()}'>" . $tabs . '</li>';
    }

    public function renderMobileView()
    {
        $tabs = '';

        $chooseCategoryLabel = Yii::t('app', 'Choose category');

        $this->urlParams = $this->urlParams ?: [$this->categoryAttribute];

        $queryParams = Yii::$app->getRequest()->getQueryParams();
        $categoryIdParam = $queryParams ? ArrayHelper::getValue($queryParams, 'ListingSearch.category_id') : '';

        $allListingsLabel = Yii::t('app', 'All listings');
        $allListingsActive = $categoryIdParam == '' ? $this->backgroundLightestClass : '';

        $queryParams = Yii::$app->getRequest()->getQueryParams();
        $categoryIdParam = $queryParams ? ArrayHelper::getValue($queryParams, 'ListingSearch.category_id') : '';

        $tabs .= "<a class=\"tablink dropdown-toggle\" id=\"dropdownMenuButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">
                      {$chooseCategoryLabel}
                  </a>";
        $tabs .= "<div class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuButton\">";

        $tabs .=  Html::a($allListingsLabel, [$this->queryParams], [
                'class' => "dropdown-item  " . ($allListingsActive),
                'id' => $this->getId() . "All",
                'data-value' => '',
                'data-text' => $allListingsLabel,
                'data-pjax' => 0
            ]) ;

        foreach ($this->filteredCategories as $filteredCategory) {
            $urlParams = [];
            foreach ($this->urlParams as $attribute) {
                $urlParams[Html::getInputName($this->searchModel, $attribute)] = $filteredCategory['id'];
            }
            $tabs .= Html::a($filteredCategory['name'], [$this->queryParams . $filteredCategory['id']], [
                'class' => "dropdown-item  " . ($filteredCategory['id'] == $categoryIdParam ? $this->backgroundLightestClass : ''),
                'id' => $this->getId() . $filteredCategory['id'],
                'data-attributes' => Json::encode($urlParams),
                'data-value' => intval($filteredCategory['id']),
                'data-text' => $filteredCategory['name'],
                'data-pjax' => 0
            ]) ;
        }
        $tabs .= "</div>";
        return "<li class=\"dropdown d-md-none cursor-pointer\" id='{$this->getId()}'>" . $tabs . '</li>';
    }

    protected function registerJs()
    {
        if ($this->pjaxId) {
            $view = $this->getView();
            $view->registerJs("
            $(document)
            .off('click', '#{$this->getId()}')
            .on('click', '#{$this->getId()}', function(e) {
                e.preventDefault();
                var self = $(this);
                var params = $('#'+event.target.id).data('attributes'), 
                    value = $('#'+event.target.id).data('value'),
                    text = $('#'+event.target.id).data('text');
                
                $.pjax.reload({
                    container:'#{$this->pjaxId}',
                    data: params,
                    push: false, 
                    replace: false, 
                    timeout: 10000
                });
                
                return false;
            })
            .off('pjax:success', '#{$this->pjaxId}')
            .on('pjax:success', '#{$this->pjaxId}', function(e) {
                $('[data-toggle=\"tooltip\"]').tooltip();
            });
            ");
        }

    }

}

