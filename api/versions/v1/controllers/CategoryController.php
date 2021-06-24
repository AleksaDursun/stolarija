<?php
/*
 * Nikola Kukric <info@singularity.is>
 * Company: Singularity Solution <https://singularity.is>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace api\versions\v1\controllers;

use api\components\actions\SearchAction;
use api\components\web\BaseApiController;
use api\models\Category;
use api\models\CategorySearch;
use yii\rest\OptionsAction;

/**
 * Class FuelController
 * @package api\versions\v1\controllers
 *
 */
class CategoryController extends BaseApiController
{

    public $modelClass = Category::class;
    public $searchModelClass = CategorySearch::class;
    public $enableCsrfValidation = false;

    public function accessRules()
    {
        return [
            [
                'allow' => true,
                'roles' => ['?'],
            ]
        ];
    }

    public function actions()
    {
        return [
            /**
             * @rest\endpoint products
             * @rest\method GET Products.
             * @rest\description Fetch products
             * @rest\tags Product
             * @rest\consumes application/json
             * @rest\produces application/json
             * @rest\response 201 array(AddressModel)
             */
            'index' => [
                'class' => SearchAction::class,
                'modelClass' => $this->searchModelClass,

            ],
            'options' => [
                'class' => OptionsAction::class
            ]
        ];
    }

}
