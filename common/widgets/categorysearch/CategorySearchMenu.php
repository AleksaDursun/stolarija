<?php
/*
 * Nikola Kukric <info@singularity-solution.com>
 * Company: Singularity Solution <https://singularity-solution.com>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace common\widgets\categorysearch;

use common\helpers\CategoryHelper;
use common\models\CategoryAttribute;
use common\models\ListingForm;
use yii\base\Widget;
use yii\helpers\Json;

/**
 * Class AttributeValueRenderer
 *
 * @property CategoryAttribute[] $categoryAttributes
 * @property ListingForm[] $model
 */
class CategorySearchMenu extends Widget
{
    public $model;

    /**
     * Runs the widget.
     */
    public function run()
    {
        return $this->render('category-search-menu', [
            'model' => $this->model,
            'columnClass' => $this->getColumnClass(),
            'categories' => $this->getRootCategories(),
        ]);
    }

    private $_rootCategories = [];

    private function getRootCategories()
    {
        if ($this->_rootCategories) {
            return $this->_rootCategories;
        }

        return $this->_rootCategories = CategoryHelper::getRootCategories();
    }

    private function getColumnClass()
    {
        $columnSize = 0;
        $bsGridSize = 12;
        $categoryCnt = count($this->getRootCategories());

        if ($bsGridSize / $categoryCnt >= 1) {
            $columnSize = floor($bsGridSize / $categoryCnt);
        }

        return $columnSize ? "col-2 col-lg-{$columnSize}" : 'col';
    }

}