<?php
/*
 * Nikola Kukric <info@singulaity.is>
 * Company: Singularity Solution <https://singulaity.is>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace backend\controllers;


use common\components\actions\AutoCompleteAction;
use common\components\controllers\CrudController;
use common\models\Icon;
use common\models\search\IconSearch;

class IconController extends CrudController
{
    public $modelClass = Icon::class;
    public $searchModelClass = IconSearch::class;

    public function actions()
    {
        return array_merge(parent::actions(), [
            'autocomplete' => [
                'class' => AutoCompleteAction::class,
                'field' => ['name', 'code'],
                'modelClass' => $this->searchModelClass,
                'castToSelect2' => true,
                'limitSearch' => function ($query) {
                    $query->andWhere(['is_active' => 1]);
                },
                'returnValue' => function (Icon $model) {
                    return [
                        'id' => $model->id,
                        'text' => $model->getAutocompleteHtml()
                    ];
                }
            ]
        ]);
    }
}