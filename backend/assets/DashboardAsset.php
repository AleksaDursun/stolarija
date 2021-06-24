<?php

namespace backend\assets;

use yii\web\AssetBundle;

/**
 * Main backend application asset bundle.
 */
class DashboardAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';

    public $css = [
        'css/custom.css'
    ];

    public $js = [
        'js/dashboard.js'
    ];

    public $depends = [
        'backend\assets\AppAsset',
    ];
}
