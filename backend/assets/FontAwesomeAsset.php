<?php

namespace backend\assets;

use yii\web\AssetBundle;

class FontAwesomeAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';

    public $css = [
        'vendor/fontawesome-pro/css/all.min.css',
    ];

    public $js = [];

    public $depends = [
        'yii\web\YiiAsset',
    ];
}
