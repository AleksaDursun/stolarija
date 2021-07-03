<?php
/*
 * Nikola Kukric <info@singularity-solution.com>
 * Company: Singularity Solution <https://singularity-solution.com>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */
namespace console\controllers;


use common\models\Category;
use common\models\Product;
use Exception;
use GuzzleHttp\Client as HttpClient;
use GuzzleHttp\Exception\RequestException;
use yii\base\Event;
use yii\helpers\Console;

class ProductController extends \yii\console\Controller
{
    private $_guzzle;
    function startsWith ($string, $startString)
    {
        $len = strlen($startString);
        return (substr($string, 0, $len) === $startString);
    }

    protected function getClient()
    {
        if ($this->_guzzle === null) {
            $this->_guzzle = new HttpClient();
        }
        return $this->_guzzle;
    }

    public function convertToFloat($input)
    {
        return floatval(preg_replace('/[^-0-9\.]/',"", $input));
    }
}
