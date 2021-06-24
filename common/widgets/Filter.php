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
 * Class Filter
 * @package common\widgets
 *
 * @property string $pjaxId
 * @property ActiveRecord $model
 * @property string $viewFile
 */
class Filter extends Widget
{
    public $pjaxId;

    public $model;

    public $viewFile = 'filter';

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
        $filterToggler = Html::a(
            "<span class='nav-link-inner--text year-picker-text m-r-5'><i class='fal fa-filter m-r-5'></i>Filter</span><i class='fal fa-angle-down'></i>",
            'javascript:void(0)', [
            'class' => 'nav-link pl-3 year-picker-link',
            'data-toggle' => 'dropdown',
            'data-target' => $this->getId(),
        ]);

        $content = $this->getView()->render($this->viewFile, ['model' => $this->model]);

        return Html::tag('div', "{$filterToggler}\n<div class='dropdown-menu dropdown-menu-right'>{$content}</div>", [
            'class' => 'nav-item dropdown dropdown-rounded mr-0 py-1 ml-auto allow-focus',
            'id' => $this->getId() ,
        ]);
    }

    protected function registerJs()
    {
        if ($this->pjaxId) {
            $view = $this->getView();

            $view->registerJs("
            $(document)
                .off('submit', '#{$this->getId()} form')
                .off('click', '#{$this->getId()} .clear-form')
                .on('submit', '#{$this->getId()} form', function(e) {
                    e.preventDefault();
                    
                    var self = $(this);
                    
                    main.ui.buttonLoading(self.find('[type=\"submit\"]'), true);
                    
                    $.pjax.reload({
                        container:'#{$this->pjaxId}',
                        data: self.serialize(),
                        push: true, 
                        replace: true, 
                        timeout: 10000
                    });
                    
                    return false;
                })
                .on('click', '#{$this->getId()} .clear-form', function(e) {
                    e.preventDefault();
                    
                    var form = $('#{$this->getId()} form');
                    var elements = form[0].elements;
                    
                    for (i = 0; i < elements.length; i++) {
                        fieldType = elements[i].type.toLowerCase();
                        
                        switch (fieldType) {
                            case 'text':
                            case 'password':
                            case 'textarea':
                            case 'hidden':
                                elements[i].value = '';
                                break;
                            case 'radio':
                            case 'checkbox':
                                if (elements[i].checked) {
                                    elements[i].checked = false;
                                }
                                break;
                            case 'select-one':
                            case 'select-multiple':
                                elements[i].selectedIndex = -1;
                                if (elements[i].selectize) {
                                    elements[i].selectize.clear();
                                }
                                break;
                            default:
                                break;
                        }
                    }

                    return false;
                });
                
                var shouldCloseFilterForm = true;
                
                $('#{$this->getId()}').on('hide.bs.dropdown', function(event) {
                    return shouldCloseFilterForm;
                });
                
                $('#{$this->getId()} .daterangepicker-input')
                    .on('show.daterangepicker', function(ev, picker) {
                        shouldCloseFilterForm = false;
                    })
                    .on('hide.daterangepicker', function(ev, picker) {
                        setTimeout(function(){ shouldCloseFilterForm = true; }, 100);
                    })
                    .on('apply.daterangepicker', function(ev, picker) {
                        $(this).val(picker.startDate.format(picker.locale.format) + ' - ' + picker.endDate.format(picker.locale.format));
                    })
                    .on('cancel.daterangepicker', function(ev, picker) {
                        $(this).val('');
                    });
            
            ");
        }
    }
}