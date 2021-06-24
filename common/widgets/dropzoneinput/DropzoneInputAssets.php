<?php
/*
 * Nikola Kukric <info@singularity.is>
 * Company: Singularity Solution <https://singularity.is>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace common\widgets\dropzoneinput;


use yii\web\AssetBundle;

class DropzoneInputAssets extends AssetBundle
{
    public $sourcePath = '@common/widgets/dropzoneinput/assets';

    public $css = [
        'css/dropzone-input.css'
    ];

    public $js = [
        'js/dropzone-input.js'
    ];

}