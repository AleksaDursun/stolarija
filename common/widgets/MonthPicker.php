<?php
/**
 * Nikola Kukric <hola@2amigos.us>
 * Company: 2amigOS! <https://2amigos.us>.
 */

namespace common\widgets;


use common\components\orm\ActiveRecord;
use common\helpers\TimeHelper;
use Yii;
use yii\base\Widget;
use yii\helpers\Html;

/**
 * Class MonthPicker
 * @package common\widgets
 *
 * @property string $pjaxId
 * @property string $activeClass
 * @property string $monthAttribute
 * @property string $overrideAttribute
 * @property ActiveRecord $model
 */
class MonthPicker extends Widget
{
    public $pjaxId;

    public $model;

    public $activeClass = 'bg-lightest';

    public $monthAttribute = 'month';

    public $overrideAttribute = null;

    public $hasAllMonthsOption = true;

    public $cssClass = '';

    public $containerCssClass = 'mr-0 py-1 ml-auto';

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
        $monthList = TimeHelper::getMonthList() + ($this->hasAllMonthsOption ? ['' => Yii::t('app', 'All months')] : []);
        $inputName = Html::getInputName($this->model, $this->monthAttribute);
        $isActive = empty($this->overrideAttribute) || empty($this->model->{$this->overrideAttribute});
        $selectedMonth = $this->model->{$this->monthAttribute};
        $selectedMonthName = $monthList[$selectedMonth];
        $options = [
            'class' => 'nav-link pl-1 pl-sm-3 month-picker-link ' . ($isActive ? '' : ' disabled'),
            'data-toggle' => 'dropdown'
        ];
        Html::addCssClass($options, $this->cssClass);

        $monthPicker = Html::a(
            "<span class='nav-link-inner--text month-picker-text m-r-5'>{$selectedMonthName}</span><i class='fal fa-angle-down'></i>",
            'javascript:void(0)', $options);

        foreach ($monthList as $monthNum => $monthName) {
            $dropdown .= Html::a("<span>{$monthName}</span>", ['', $inputName => $monthNum], [
                    'class' => 'dropdown-item ' . ($monthNum == $selectedMonth ? $this->activeClass : ''),
                    'data-attribute' => $inputName,
                    'data-value' => $monthNum,
                    'data-text' => $monthName,
                    'data-pjax' => 0
                ]) . "\n";
        }

        return Html::tag('div', "{$monthPicker}\n<div class='dropdown-menu dropdown-menu-right'>{$dropdown}</div>", [
            'id' => $this->getId(),
            'class' => 'nav-item dropdown dropdown-rounded responsive month-picker ' . $this->containerCssClass
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
                var dropdown = $(this).closest('.dropdown.month-picker'),
                    attribute = $(this).data('attribute'), 
                    value = $(this).data('value'),
                    text = $(this).data('text');
                
                $.pjax.reload({
                    container:'#{$this->pjaxId}',
                    data: {[attribute]: value},
                    push: true, 
                    replace: true, 
                    timeout: 10000
                });
                
                dropdown.find('.dropdown-item').removeClass('{$this->activeClass}');
                dropdown.find('.month-picker-text').text(text);
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
}
