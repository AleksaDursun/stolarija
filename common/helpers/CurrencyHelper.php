<?php
/**
 * Nikola Kukric <hola@2amigos.us>
 * Company: 2amigOS! <https://2amigos.us>.
 */

namespace common\helpers;


use BenMajor\ExchangeRatesAPI\ExchangeRatesAPI;
use Yii;

class CurrencyHelper
{
    public static function format($value, $decimals = 2, $sale = null): string
    {
        return $sale ? '<p class="m-0"><s class="text-danger">' . number_format($value, $decimals) . '</s>' .number_format($sale) . ' KM</p>'
            : '<p class="m-0">' . number_format($value, $decimals) . ' KM</p>' ;
    }

}