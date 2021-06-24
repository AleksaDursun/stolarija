<?php
/*
 * Nikola Kukric <info@singulaity.is>
 * Company: Singularity Solution <https://singulaity.is>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */


namespace common\widgets\categoryselector;


use yii\web\AssetBundle;

class CategorySelectorAssets extends AssetBundle
{
    public $sourcePath = '@common/widgets/categoryselector/assets';

    public $css = [
        'css/category-selector.css'
    ];

    public $js = [
        'js/category-selector.js'
    ];

    public $depends = [
        'yii\web\YiiAsset',
    ];
}