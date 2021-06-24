<?php


namespace common\widgets\datepicker;

use common\helpers\ArrayHelper;
use common\helpers\TimeHelper;
use Yii;
use yii\bootstrap4\Html;
use yii\helpers\Json;
use yii\widgets\InputWidget;

/**
 * Class DatePicker
 * @package common\widgets\datepicker
 *
 * @property $clientOptions array
 * @property $clientEvents array
 * @property $hasAddon bool
 * @property $addonIcon string
 */
class DatePicker extends InputWidget
{
    /**
     * @var array the options for the Bootstrap DatePicker plugin.
     * Please refer to the Bootstrap DatePicker plugin Web page for possible options.
     * @see http://bootstrap-datepicker.readthedocs.org/en/release/options.html
     */
    public $clientOptions = [];
    /**
     * @var array the event handlers for the underlying Bootstrap DatePicker plugin.
     * Please refer to the [DatePicker](http://bootstrap-datepicker.readthedocs.org/en/release/events.html) plugin
     * Web page for possible events.
     */
    public $clientEvents = [];

    public $hasAddon = true;

    public $addonIcon = '<i class="fal fa-calendar-alt"></i>';


    public function init()
    {
        $this->initClientOptions();

        parent::init();
    }

    public function run()
    {
        Html::addCssClass($this->options, 'form-control');

        $input = $this->hasModel()
            ? Html::activeTextInput($this->model, $this->attribute, $this->options)
            : Html::textInput($this->name, $this->value, $this->options);

        $addon = "<a href='javascript:void(0)' class='btn ml-2 btn-sm btn-link btn-just-icon'>{$this->addonIcon}</a>";

        $this->registerClientScript();

        return $this->hasAddon ? Html::tag('div', $input . $addon, ['class' => 'input-group']) : $input;
    }

    /**
     * Registers required script for the plugin to work as DatePicker
     */
    public function registerClientScript()
    {
        $js = [];
        $view = $this->getView();

        $selector = ";jQuery('#{$this->options['id']}')";
        $options = Json::encode($this->clientOptions);
        $js[] = "$selector.datetimepicker({$options});";

        if ($this->hasAddon) {
            $js[] = "$selector.siblings('a').on('click', function() { $selector.data('DateTimePicker').toggle(); });";
        }

        if (!empty($this->clientEvents)) {
            foreach ($this->clientEvents as $event => $handler) {
                $js[] = "$selector.on('$event', $handler);";
            }
        }

        $view->registerJs(implode("\n", $js));
    }

    private function initClientOptions()
    {
        $defaults = [
            'useCurrent' => false,
            'format' => TimeHelper::getMomentDatePickerFormat(),
            'icons' => [
                'time' => "fal fa-clock",
                'date' => "fal fa-calendar",
                'up' => "fa fa-chevron-up",
                'down' => "fa fa-chevron-down",
                'previous' => "fa fa-chevron-left",
                'next' => "fa fa-chevron-right",
                'today' => "fa fa-screenshot",
                'clear' => "fa fa-trash",
                'close' => "fa fa-remove"
            ]
        ];

        $this->clientOptions = ArrayHelper::merge($defaults, $this->clientOptions);
    }

}
