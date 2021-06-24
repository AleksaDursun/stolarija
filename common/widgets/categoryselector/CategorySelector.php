<?php
/*
 * Nikola Kukric <info@singulaity.is>
 * Company: Singularity Solution <https://singulaity.is>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */


namespace common\widgets\categoryselector;

use common\helpers\CategoryHelper;
use common\helpers\TreeHelper;
use common\models\Category;
use Yii;
use yii\base\Widget;
use yii\helpers\Html;
use yii\helpers\Inflector;
use yii\helpers\Json;

class CategorySelector extends Widget
{
    public $linkClass = 'text-gray-dark';

    public $listClass = 'list-group';

    public $listItemClass = 'list-group-item list-group-item-action pointer';

    public $clientOptions = [];

    public $clientEvents = [];

    public function init()
    {
        $this->clientOptions = [
            'active_parent_class' => 'border-0',
            'header_list_class' => 'breadcrumb mt-3 py-3',
            'default_text' => Yii::t('app-category', 'Select category'),
        ];

        parent::init();
    }

    /**
     * Runs the widget.
     */
    public function run()
    {
        $this->registerJs();

        return $this->renderCategorySelector();
    }

    protected function registerJs()
    {
        $js = [];
        $view = $this->getView();
        $id = $this->getId();
        $options = Json::encode($this->clientOptions);
        CategorySelectorAssets::register($view);

        $js[] = "$('#{$id}').drilldown({$options});";

        foreach ($this->clientEvents as $event => $handler) {
            $js[] = "$('#{$id}').on('{$event}', {$handler});";
        }

        $view->registerJs(implode("\n", $js));
    }

    protected function getCategoryTree()
    {
        $categories = Category::find()->orderBy('order ASC')->all();

        return TreeHelper::buildChildrenArrayFrom($categories);
    }

    protected function renderCategorySelector()
    {
        $content = '';
        $content .= Html::beginTag('ul', ['id' => $this->getId(), 'class' => $this->listClass]);

        foreach ($this->getCategoryTree() as $node) {
            $content .= $this->renderNode($node);
        }

        $content .= Html::endTag('ul');
        return $content;
    }

    protected function renderNode($node)
    {
        $content = '';
        $content .= Html::beginTag('li', ['class' => $this->listItemClass, 'data-id' => $node->id]);
        $content .= Html::a($node->name, 'javascript:void(0)', [
            'class' => $this->linkClass,
            'data-id' => $node->id,
            'data-text' => CategoryHelper::getCategoryPathStringFor($node->id),
        ]);

        if ($node->_children) {
            $content .= Html::beginTag('ul', ['class' => $this->listClass]);
            foreach ($node->_children as $child) {
                $content .= $this->renderNode($child);
            }
            $content .= Html::endTag('ul');
        }

        $content .= Html::endTag('li');

        return $content;
    }
}
