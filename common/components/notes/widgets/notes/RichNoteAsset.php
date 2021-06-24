<?php
/**
 * Aleksandar Panic <hola@2amigos.us>
 * Company: 2amigOS! <https://2amigos.us>
 */

namespace notes\widgets\notes;


use yii\web\AssetBundle;

class RichNoteAsset extends AssetBundle
{
    public function init()
    {
        $this->sourcePath = __DIR__ . '/assets';
        parent::init();
    }

    public $css = [
        'css/richnote.css'
    ];

    public $js = [
        'js/richnote.js'
    ];

    public $depends = [
    ];
}