<?php

namespace common\components\grid;

use \yii\grid\ActionColumn;

/**
 * Created by PhpStorm.
 * User: nikola
 * Date: 24.6.2018.
 * Time: 00:37
 */

class GridView extends \yii\grid\GridView
{
    public $pjaxId;
    public $dataColumnClass = DataColumn::class;
    public $tableOptions = ['class' => 'table align-items-center table-flush m-0 table-responsive-lg'];
    public $layout =  "{items}<div class='row'><div class='col-sm-12 col-md-5'>{summary}</div><div class='col-sm-12 col-md-7 text-right'>{pager}</div></div>";
    public $onAfterPjaxReload = '';
    public $summaryOptions =['class' => 'text-sm'];
    public $pager = [
        'firstPageLabel' => '<i class="fal fa-chevron-double-left"></i>',
        'lastPageLabel' => '<i class="fal fa-chevron-double-right"></i>',
        'prevPageLabel' => '<i class="fal fa-chevron-left"></i>',
        'nextPageLabel' => '<i class="fal fa-chevron-right"></i>',
        'maxButtonCount' => 3,
        'pageCssClass' => 'page-item',
        'firstPageCssClass' => 'page-item',
        'lastPageCssClass' => 'page-item',
        'nextPageCssClass' => 'page-item',
        'prevPageCssClass' => 'page-item',
        'options' => [
            'class' => 'pagination justify-content-end',
        ],
        'linkOptions' => ['class' => 'page-link'],
    ];

    /**
     * Runs the widget.
     */
    public function run()
    {
        if ($this->pjaxId) {
            $view = $this->getView();

            $afterPjax = '';
            if($this->onAfterPjaxReload) {
                $afterPjax = "$('#{$this->pjaxId}').on('pjax:complete', {$this->onAfterPjaxReload});";
            }

            $view->registerJs("$(document).on('modal-submitted', function(e, xhr, btn, frm, data) {
                
                if (xhr.success && data.pjax_id == '{$this->pjaxId}' && $('#{$this->pjaxId}').length) { 
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

    /**
     * Creates column objects and initializes them.
     */
    protected function initColumns()
    {
        parent::initColumns();

        foreach ($this->columns as &$column) {
            if ($column instanceof ActionColumn) {
                $btnCount = count($column->buttons);

                $column->headerOptions = ['class' => "action-col p-0 col-btns-{$btnCount}"];
                $column->filterOptions = ['class' => "action-col p-0 col-btns-{$btnCount}"];
                $column->contentOptions = ['class' => "action-col p-0 col-btns-{$btnCount}"];
            }

            if ($column->hasProperty('attribute') && $column->attribute == 'id') {
                $column->headerOptions = ['class' => "id-col w-80"];
                $column->filterOptions = ['class' => "id-col w-80"];
                $column->contentOptions = ['class' => "id-col w-80"];
            }

            if ($column->hasProperty('format') && $column->format == 'boolean') {
                $column->headerOptions = ['class' => "bool-col w-100"];
                $column->filterOptions = ['class' => "bool-col w-100"];
                $column->contentOptions = ['class' => "bool-col w-100"];
            }
        }
    }
}