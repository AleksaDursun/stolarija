<?php


namespace common\widgets;

use yii\base\Widget;

class Switchy extends Widget
{
    public $disabled;
    public $title;
    public $confirmationMessage;
    public $url;
    public $pjaxId;
    public $checked;

    public function run()
    {
        return "<div class='form-check'>
                    <label class='custom-toggle form-check-label btn-control-confirm {$this->disabled}' title={$this->title}
                    data-msg='{$this->confirmationMessage}' data-json-response = 1
                     data-url='{$this->url}' data-loader = 0 data-pjax-id = {$this->pjaxId}>
                        <input class='form-check-input' type='checkbox' {$this->disabled} {$this->checked}>
                        <span class='form-check-sign'>
                          <span class='check'></span>
                        </span>
                     </label>
                 </div>";
    }

}