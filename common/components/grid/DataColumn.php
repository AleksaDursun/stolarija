<?php
/**
 * Created by PhpStorm.
 * User: nikola
 * Date: 24.6.2018.
 * Time: 00:41
 */

namespace common\components\grid;


use yii\base\Model;

class DataColumn extends \yii\grid\DataColumn
{
    public function renderFilterCellContent()
    {
        // $model = $this->grid->filterModel;
        // $isFilterable = $this->filter !== false && $model instanceof Model && $this->attribute !== null && $model->isAttributeActive($this->attribute);

        // return '<div class="form-group form-float ' . ($isFilterable ? 'filterable' : 'not-filterable') . '">
        //             <div class="form-line">
        //                 ' . parent::renderFilterCellContent() . '
        //                 <label class="form-label">' . $this->renderHeaderCellContent() . '</label>
        //             </div>
        //         </div>';
    }
}