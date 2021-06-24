<?php

namespace common\components\listView;

use yii\widgets\ListView as ListV;


class ListView extends ListV
{

    public $pjaxId;
    public $onAfterPjaxReload = '';

    public function run()
    {
        if ($this->pjaxId) {
            $view = $this->getView();

            $afterPjax = '';
            if ($this->onAfterPjaxReload) {
                $afterPjax = "$('#{$this->pjaxId}').on('pjax:complete', {$this->onAfterPjaxReload});";
            }

            $view->registerJs("$(document).on('modal-submitted', function(event, responseData, btn, frm, data) {
                if (responseData.success && data.pjax_id == '{$this->pjaxId}' && $('#{$this->pjaxId}').length) { 
                    $.pjax.reload({
                        container:'#{$this->pjaxId}',
                        push: false, 
                        replace: false, 
                        timeout: 10000
                    });
                    
                    {$afterPjax}
                }
            });");
        }

        parent::run();
    }
}