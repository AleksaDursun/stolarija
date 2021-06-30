<?php

namespace backend\assets;

use yii\web\AssetBundle;

/**
 * Main backend application asset bundle.
 */
class AppAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';

    public $css = [
        '//fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons',
        'dist/css/script.min.css',
        'css/custom.css'
    ];

    public $js = [
        'dist/js/script.min.js'
    ];

    public $depends = [
        'yii\web\YiiAsset',
        'yii\bootstrap4\BootstrapPluginAsset',
        'backend\assets\FontAwesomeAsset',
        'notes\widgets\notes\RichNoteAsset',
        '\dosamigos\select2\Select2Asset'
    ];
}
