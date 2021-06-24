<?php


namespace common\widgets\maskinput;

use common\helpers\ArrayHelper;
use common\widgets\listinggallery\ListingGalleryAsset;
use Yii;
use yii\bootstrap4\Html;
use yii\helpers\Json;
use yii\web\JsExpression;
use yii\widgets\InputWidget;

class MoneyInput extends MaskInput
{
    public $clientOptions = [];

    public function init()
    {
        $this->clientOptions = [
            'mask' => new JsExpression('Number'),  // enable number mask
            // other options are optional with defaults below
            'scale' => 2,  // digits after point, 0 for integers
            'signed' => false,  // disallow negative
            'thousandsSeparator' => '',  // any single char
            'padFractionalZeros' => false,  // if true, then pads zeros at end to the length of scale
            'normalizeZeros' => true,  // appends or removes zeros at ends
            'radix' => '.',  // fractional delimiter
            'mapToRadix' => [',']  // symbols to process as radix
        ];
        parent::init();
    }
}