<?php
/**
 * Nikola Jankovic  <hello@singularity.is>
 * Company: Singularity Solution <https://singularity.is>
 */

namespace common\widgets;


use common\helpers\CurrencyHelper;
use Yii;
use yii\base\Widget;
use common\components\orm\ActiveRecord;
use yii\helpers\Html;


/**
 * Class CurrencyPicker
 * @package common\widgets
 *
 * @property string $pjaxId
 * @property string $activeClass
 * @property string $currencyAttribute
 * @property string $overrideAttribute
 * @property ActiveRecord $model
 */
class CurrencyPicker extends Widget
{
    public $pjaxId;

    public $model;

    public $activeClass = 'bg-lightest';

    public $currencyAttribute = 'currency';

    public $overrideAttribute = null;

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
        $inputName = Html::getInputName($this->model, $this->currencyAttribute);
        $isActive = empty($this->overrideAttribute) || empty($this->model->{$this->overrideAttribute});
        $selectedCurrency = CurrencyHelper::getCurrencyByKey('code', $this->model->{$this->currencyAttribute});
        $selectedCurrencyText = "{$selectedCurrency['code']} ({$selectedCurrency['symbol']})";
        $options = [
            'class' => 'nav-link pl-1 pl-sm-3 currency-picker-link ' . ($isActive ? '' : ' disabled'),
            'data-toggle' => 'dropdown'
        ];

        $currencyPicker = Html::a(
            "<span class='nav-link-inner--text currency-picker-text m-r-5'>{$selectedCurrencyText}</span><i class='fal fa-angle-down'></i>",
            'javascript:void(0)', $options);

        foreach (CurrencyHelper::$availableCurrencies as $currencyCode) {
            $currency = CurrencyHelper::getCurrencyByKey('code', $currencyCode);
            $currencyText = "{$currency['code']} ({$currency['symbol']})";
            $dropdown .= Html::a("<span>{$currencyText}</span>", ['', $inputName => $currencyCode], [
                    'class' => 'dropdown-item ' . ($currencyCode == $selectedCurrency['code'] ? $this->activeClass : ''),
                    'data-attribute' => $inputName,
                    'data-value' => $currency['code'],
                    'data-text' => $currencyText,
                    'data-pjax' => 0
                ]) . "\n";
        }

        return Html::tag('div', "{$currencyPicker}\n<div class='dropdown-menu'>{$dropdown}</div>", [
            'id' => $this->getId(),
            'class' => 'nav-item dropdown dropdown-rounded responsive currency-picker ' . $this->containerCssClass
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
                var dropdown = $(this).closest('.dropdown.currency-picker'),
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
                dropdown.find('.currency-picker-text').text(text);
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