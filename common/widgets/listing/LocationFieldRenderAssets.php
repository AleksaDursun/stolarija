<?php
/*
 * Nikola Kukric <info@singularity-solution.com>
 * Company: Singularity Solution <https://singularity-solution.com>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace common\widgets\listing;


use yii\web\AssetBundle;

class LocationFieldRenderAssets extends AssetBundle
{
    public $sourcePath = '@common/widgets/listing/assets';

    public $css = [];

    public $js = [
        'js/location-field-render.js'
    ];

}