<?php
/*
 * Nikola Kukric <info@singularity-solution.com>
 * Company: Singularity Solution <https://singularity-solution.com>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace common\helpers;


use common\models\Category;

class TreeHelper
{
    public static $levelString = '    ';

    public static function getFlatArrayFrom(array $models)
    {
        $childrenArray = static::buildChildrenArrayFrom($models);

        return static::flattenChildrenArray($childrenArray);
    }

    public static function buildChildrenArrayFrom(array $models, $parentId = '')
    {
        $tree = [];

        foreach ($models as $model) {
            if ($model->parent_id == $parentId) {
                $m = new \StdClass();
                $m->{"id"} = $model->id;
                $m->{"parent_id"} = $model->parent_id;
                $m->{"name"} = $model->name;
                $m->{"_children"} = static::buildChildrenArrayFrom($models, $model->id);
                $model = $m;

                $tree[] = $model;
            }
        }
        return $tree;
    }

    public static function flattenChildrenArray(array $models, $level = 0, $parentId = null)
    {
        $nodes = [];

        foreach ($models as $model) {

            $childNodes = [];
            $prefix = empty($model->parent_id) ? '' : str_repeat(static::$levelString, $level);
            $nodes[$model->id] = "{$prefix} {$model->name}";

            if (!empty($model->_children)) {
                $childNodes = static::flattenChildrenArray($model->_children, $level + 1, $model->parent_id);
            }

            $nodes = $nodes + $childNodes;
        }

        return $nodes;
    }

    public static function getCategoryPathFor($categoryId = null)
    {
        foreach (self::getAllCategories() as $category) {
            if ($category->id == $categoryId) {
                return empty($category->parent_id) ? [$category] : ArrayHelper::merge(static::getCategoryPathFor($category->parent_id), [$category]);
            }
        }

        return [];
    }

    private static $_categories = [];

    private static function getAllCategories()
    {
        if (empty(static::$_categories)) {
            static::$_categories = Category::find()->all();
        }

        return static::$_categories;
    }

    public static function isCategoryDescendant($parent, $child)
    {
        $categories = Category::find()->select('id, parent_id')->asArray()->all();

        $tree = static::buildTreeArrayFrom($categories);
        $parentSubTree = static::getSubTreeFor($parent, $tree);

        return static::isInTree($child, $parentSubTree);
    }

    public static function buildTreeArrayFrom(array $models, $parentId = '')
    {
        $tree = [];

        foreach ($models as $model) {
            if ($model['parent_id'] == $parentId) {

                $model['children'] = static::buildTreeArrayFrom($models, $model['id']);

                $tree[] = $model;
            }
        }
        return $tree;
    }

    public static function getSubTreeFor($id, array $tree)
    {
        foreach ($tree as $node) {
            if ($node['id'] == $id) {
                return $node['children'] ? : [];
            }

            if (!empty($node['children'])) {
                $subTree = static::getSubTreeFor($id, $node['children']);
                if ($subTree !== null) {
                    return $subTree;
                }
            }
        }

        return null;
    }

    public static function extractIdsFromTree(array $tree)
    {
        $result = [];

        foreach ($tree as $node) {
            $result[] = $node['id'];

            if (!empty($node['children'])) {
                $result = ArrayHelper::merge($result, static::extractIdsFromTree($node['children']));
            }
        }

        return $result;
    }

    public static function isInTree($id, array $tree)
    {
        foreach ($tree as $node) {
            if ($node['id'] == $id) {
                return true;
            }

            if (!empty($node['children']) && static::isInTree($id, $node['children'])) {
                return true;
            }
        }

        return false;
    }
}