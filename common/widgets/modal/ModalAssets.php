<?php
/**
 * Igor Golub <hola@2amigos.us>
 * Company: 2amigOS! <https://2amigos.us>
 */

namespace modal;


use yii\web\AssetBundle;

class ModalAssets extends AssetBundle
{
    public $sourcePath = '@common/widgets/modal/assets';

    public $css = [
        'css/modal.css'
    ];
    public $js = [
        'js/modal.js'
    ];
    public $depends = [
        'yii\bootstrap\BootstrapPluginAsset',
    ];
}