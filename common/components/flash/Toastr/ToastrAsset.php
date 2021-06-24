<?php

namespace common\components\flash\Toastr;

use yii\web\AssetBundle;

/**
 * Asset bundle for the Toastr css and js files.
 */
class ToastrAsset extends AssetBundle
{
    public $sourcePath = '@root/node_modules/toastr';

    public $css = [
        'build/toastr.min.css',
    ];

    public $js = [
        'build/toastr.min.js',
    ];
}