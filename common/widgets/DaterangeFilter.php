<?php
/**
 * Nikola Kukric <hola@2amigos.us>
 * Company: 2amigOS! <https://2amigos.us>.
 */

namespace common\widgets;


use common\components\orm\ActiveRecord;
use common\helpers\TimeHelper;
use singularity\daterangepicker\DaterangepickerAsset;
use yii\base\Widget;
use yii\helpers\Html;
use yii\helpers\Json;
use yii\web\JsExpression;

/**
 * Class YearPicker
 * @package common\widgets
 *
 * @property string $pjaxId
 * @property ActiveRecord $model
 * @property string $attribute
 * @property array $clientOptions
 *
 */
class DaterangeFilter extends Widget
{
    public $pjaxId;

    public $model;

    public $attribute = 'date';

    public $clientOptions = [];

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
        $inputName = Html::getInputName($this->model, $this->attribute);

        return "<div id='{$this->getId()}' data-name='{$inputName}' class='d-inline-block text-white text-sm mr-2 pointer'>
                    <i class='fal fa-calendar'></i>
                    <span>{$this->getFormattedRange()}</span>
                    <i class='fal fa-angle-down'></i>
                </div>";
    }

    protected function registerJs()
    {
        $js = [];
        $view = $this->getView();
        $options = Json::encode($this->clientOptions);
        DaterangepickerAsset::register($view);

        $js[] = "var start = moment().subtract(29, 'days'), end = moment();";
        $js[] = new JsExpression("function cb(start, end) {
            $('#{$this->getId()} span').html(start.format('{$this->getDateFormat()}') + ' - ' + end.format('{$this->getDateFormat()}'));
        }");

        $js[] = "$('#{$this->getId()}').daterangepicker({$options}, cb);";

        if ($this->pjaxId) {
            $js[] = "$('#{$this->getId()}').on('apply.daterangepicker', function(ev, picker) {
                
                var name = $('#{$this->getId()}').data('name'), 
                    value = $('#{$this->getId()} span').text();
                
                $.pjax.reload({
                    container:'#{$this->pjaxId}',
                    push: false, 
                    data: {[name]: value},
                    replace: false, 
                    timeout: 10000
                });
            });
            ";
        }

        $view->registerJs(implode("\n", $js));
    }

    private function getFormattedRange()
    {
        return $this->model->{$this->attribute};
    }

    private function getDateFormat()
    {
        return TimeHelper::getMomentDatePickerFormat();
    }

}