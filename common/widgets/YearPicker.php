<?php
/**
 * Nikola Kukric <hola@2amigos.us>
 * Company: 2amigOS! <https://2amigos.us>.
 */

namespace common\widgets;


use common\components\orm\ActiveRecord;
use yii\base\Widget;
use yii\helpers\Html;

/**
 * Class YearPicker
 * @package common\widgets
 *
 * @property string $pjaxId
 * @property ActiveRecord $model
 * @property string $dateAttribute
 * @property string $yearAttribute
 * @property string $overrideAttribute
 * @property string $activeClass
 * @property bool $isDateAttributeTimestamp
 */
class YearPicker extends Widget
{
    public $model;

    public $pjaxId;

    public $dateAttribute = 'date';

    public $yearAttribute = 'year';

    public $overrideAttribute = null;

    public $isDateAttributeTimestamp = false;

    public $activeClass = 'bg-lightest';

    public $cssClass = '';

    public $containerCssClass = 'py-1 ml-auto';

    /**
     * Runs the widget.
     */
    public function run()
    {
        $this->registerJs();

        return $this->renderDropdown();
    }

    protected function renderDropdown()
    {
        $dropdown = '';
        $availableYears = $this->getAvailableYears();
        $selectedYear = $this->model->{$this->yearAttribute};
        $isActive = empty($this->overrideAttribute) || empty($this->model->{$this->overrideAttribute});
        $inputName = Html::getInputName($this->model, $this->yearAttribute);
        $options = [
            'class' => 'nav-link pl-1 pl-sm-3 year-picker-link ' . ($isActive ? '' : ' disabled'),
            'data-toggle' => 'dropdown'
        ];
        Html::addCssClass($options, $this->cssClass);


        $yearPicker = Html::a(
            "<span class='nav-link-inner--text year-picker-text m-r-5'>{$selectedYear}</span><i class='fal fa-angle-down'></i>",
            'javascript:void(0)', $options);

        foreach ($availableYears as $year) {
            $dropdown .= Html::a("<span>{$year}</span>", ['', $inputName => $year], [
                    'class' => 'dropdown-item ' . ($year == $selectedYear ? $this->activeClass : ''),
                    'data-attribute' => $inputName,
                    'data-value' => $year,
                    'data-pjax' => 0
                ]) . "\n";
        }

        return Html::tag('div', "{$yearPicker}\n<div class='dropdown-menu dropdown-menu-right'>{$dropdown}</div>", [
            'id' => $this->getId(),
            'class' => 'nav-item dropdown dropdown-rounded responsive mr-0 year-picker ' . $this->containerCssClass
        ]);
    }

    protected function registerJs()
    {
        if ($this->pjaxId) {
            $view = $this->getView();

            $view->registerJs("
            $(document).on('click', '#{$this->getId()} .dropdown-item', function(e) {
                e.preventDefault();
                
                var self = $(this);
                var dropdown = $(this).closest('.dropdown.year-picker');
                var name = $(this).data('attribute'), value = $(this).data('value');
                
                $.pjax.reload({
                    container:'#{$this->pjaxId}',
                    data: {[name]: value},
                    push: true, 
                    replace: true, 
                    timeout: 10000
                });
                
                dropdown.find('.dropdown-item').removeClass('{$this->activeClass}');
                dropdown.find('.year-picker-text').text(value);
                dropdown.find('.dropdown-menu').removeClass('show');
                dropdown.removeClass('show');
                self.addClass('{$this->activeClass}');
                return false;
            });
            
            $(document).off('pjax:success', '#{$this->pjaxId}').on('pjax:success', '#{$this->pjaxId}', function(e) {
                $('[data-toggle=\"tooltip\"]').tooltip();
            });
            ");
        }
    }

    private function getAvailableYears()
    {
        if (method_exists($this->model, 'getAvailableYears')) {
            return $this->model->getAvailableYears();
        }

        $class = get_class($this->model);
        $baseQuery = $class::find()
            ->select($this->getSelect())
            ->filterWhere(['property_id' => $this->model->property_id]);

        if ($this->model->hasProperty('type')) {
            $baseQuery->andFilterWhere(['type' => $this->model->type]);
        }

        return $baseQuery->orderBy('`year` DESC')->column() ?: [$this->model->{$this->yearAttribute}];
    }

    private function getSelect()
    {
        $column = $this->isDateAttributeTimestamp ? "FROM_UNIXTIME(`{$this->dateAttribute}`)" : "`{$this->dateAttribute}`";

        return ["DISTINCT YEAR({$column}) AS `year`"];
    }

}