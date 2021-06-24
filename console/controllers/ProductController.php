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

    public function actionComtradeUpdate($hard = false)
    {
        $this->stdout("Starting Comtrade products update..." . PHP_EOL, Console::FG_YELLOW);

        ini_set('default_socket_timeout', 5000);
        $soapclient = new \SoapClient(
            'http://www.ct4partners.ba/webservices/ctproductsinstock.asmx?wsdl',
            [
                'connection_timeout' => 5000,
                'cache_wsdl' => WSDL_CACHE_NONE,
                'keep_alive' => false,
                'trace' => 1
            ]);


        $param = array(
            'username' => 'MediaSA',
            'password' => 'almin2020'
        );

        $allProducts = 0;
        $newProducts = 0;
        $updatedProducts = 0;
        try {

            $start_time = microtime(true);
            $soapclient->GetCTProducts_WithAttributes($param); 			//download svih proizvoda sa atributima
          //  $soapclient->GetCTProducts($param); 						//download svih proizvoda bez atributa
            $xmlString = $soapclient->__getLastResponse();

            $xml = simplexml_load_string($xmlString);
            $response = $xml->children('http://schemas.xmlsoap.org/soap/envelope/')->Body->children()->GetCTProducts_WithAttributesResponse->GetCTProducts_WithAttributesResult;
           // $response = $xml->children('http://schemas.xmlsoap.org/soap/envelope/')->Body->children()->GetCTProductsResponse->GetCTProductsResponse;

            if($hard){
                Product::hardDeleteAll();
            }

            foreach ($response->CTPRODUCT as $product) {
                $allProducts++;

                $code = (string)$product->CODE;
                $name = (string)$product->NAME;
                $category = (string)$product->PRODUCTGROUPCODE;
                $manufacturer = (string)$product->MANUFACTURER;
                $quantity = (string)$product->QTTYINSTOCK;
                $quantity =  $this->startsWith($quantity, '>') ? substr($quantity, 1) : $quantity;
                $price = floatval((string)$product->PRICE);
                $retail_price = floatval((string)$product->RETAILPRICE);
                $short_description = (string)$product->SHORT_DESCRIPTION;
                $imageURL = (string)$product->IMAGE_URLS->URL;

                /**
                 * @var Product $exist
                 */
                $exist = Product::find()->where([
                    'code' => $code
                ])->one();

                if(!$exist) {
                    $item = new Product();
                    $item->code = $code;
                    $item->name = $name;
                    $item->manufacturer = $manufacturer;
                    $item->quantity = $quantity ;
                    $item->is_active = 0;
                    $item->short_description = $short_description;
                    $item->price = $price;
                    $item->retail_price = $retail_price;
                    $item->selling_price = $retail_price;
                    $item->image_url = $imageURL;
                    $item->company = Product::COMPANY_COMTRADE;
                    $item->category_id = Category::find()->where(['code' => $category])->one()->id ?? null;

                    if($item->validate()){
                        $item->save();
                        $newProducts++;

                        $this->stdout("{$newProducts}. " . $code . " - " . $name . " - " . $manufacturer . " - " . $quantity . " - " . $price . " - "
                            . $retail_price . " - " . $short_description . " - " . $imageURL . PHP_EOL, Console::FG_GREEN);
                    } else {
                        $this->stdout("{$newProducts}. " . $code . " - " . $name . " - " . $manufacturer . " - " . $quantity . " - " . $price . " - "
                            . $retail_price . " - " . $short_description . " - " . $imageURL . PHP_EOL, Console::FG_RED);
                    }
                } else {
                    $updatedProducts++;

                    $exist->quantity = $quantity;
                    $exist->price = $price;
                    $exist->retail_price = $retail_price;
                    $exist->image_url = $exist->image_url ? $exist->image_url : $imageURL;
                    $exist->save();

                    $this->stdout("{$newProducts}. " . $code . " - " . $name . " - " . $manufacturer . " - " . $quantity . " - " . $price . " - "
                        . $retail_price . " - " . $short_description . " - " . $imageURL . PHP_EOL, Console::FG_BLUE);
                }


            }

        } catch (\Exception $e) {
            $this->stdout("Error: " . $e . PHP_EOL, Console::FG_RED);
            return false;
        }

        $end_time = microtime(true);
        $execution_time = ($end_time - $start_time);
        $execution_time = number_format($execution_time, 2);
        $this->stdout("Finished! All: {$allProducts}, Updated: {$updatedProducts}, Created: {$newProducts} Time:  " . $execution_time . PHP_EOL, Console::FG_GREEN);
    }


    public function actionComtradeUpdateCategory()
    {
        $this->stdout("Starting Comtrade category update..." . PHP_EOL, Console::FG_YELLOW);


        $soapclient = new \SoapClient(
            'http://www.ct4partners.ba/webservices/ctproductsinstock.asmx?wsdl',
            [

                'cache_wsdl' => WSDL_CACHE_NONE,
                'keep_alive' => false,
                'trace' => 1
            ]);

        $param = array(
            'username' => 'MediaSA',
            'password' => 'almin2020'
        );

        $allCategory= 0;
        $newCategory = 0;
        try {

            $start_time = microtime(true);
            $soapclient->GetCTProductGroups($param); 			//download svih proizvoda sa atributima
            $xmlString = $soapclient->__getLastResponse();

            $xml = simplexml_load_string($xmlString);
            $response = $xml->children('http://schemas.xmlsoap.org/soap/envelope/')->Body->children()->GetCTProductGroupsResponse->GetCTProductGroupsResult;

            foreach ($response->ProductGroup as $group) {
                $allCategory ++;

                $code = (string)$group->Code;
                $name = (string)$group->GroupDescription;

                $category = Category::find()->where(
                    ['code' => $code]
                )->one();

                if(!$category) {
                    $new = new Category();
                    $new->name = $name;
                    $new->code = $code;
                    if($new->save()) {
                        $newCategory++;
                        $this->stdout("{$newCategory}. " . $code . " - " . $name . PHP_EOL, Console::FG_GREEN);
                    }
                } else {
                    $this->stdout("{$newCategory}. " . $code . " - " . $name . PHP_EOL, Console::FG_BLUE);
                }
            }


        } catch (\Exception $e) {
            $this->stdout("Error: " . $e . PHP_EOL, Console::FG_RED);
            return false;
        }

        $end_time = microtime(true);
        $execution_time = ($end_time - $start_time);
        $execution_time = number_format($execution_time, 2);
        $this->stdout("Finished! All: {$allCategory},  Created: {$newCategory} Time:  " . $execution_time . PHP_EOL, Console::FG_GREEN);
    }


    private function getKimTecProduct($url) {
        $basePath = \Yii::$app->basePath . '/certs';

        $ch = curl_init();
        curl_setopt($ch,
            CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_VERBOSE, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 1);
        //  curl_setopt($ch, CURLOPT_SSLVERSION,3);
        curl_setopt($ch, CURLOPT_CAINFO, $basePath . "/ca.pem");
        curl_setopt ($ch, CURLOPT_SSLCERT, $basePath . "/client.pem");
        curl_setopt($ch, CURLOPT_SSLKEY, $basePath . "/key.pem");
        curl_setopt($ch, CURLOPT_SSLKEYPASSWD, "2843"); // pin vezan za B2B certifikat


        $result= curl_exec($ch);
        $err = curl_error($ch);

        curl_close($ch);

        if ($err) {
            throw new Exception($err);
        }

        return $result;

    }

    public function actionKimtec()
    {
        $productList = "https://b2b.kimtec.ba/B2BService/HTTP/Product/GetProductsList.aspx";
        $productPriceList = "https://b2b.kimtec.ba/B2BService/HTTP/Product/GetProductsPriceList.aspx";
        $productQuantity = "https://b2b.kimtec.ba/B2BService/HTTP/Product/GetProductsAvailability.aspx";
        $this->stdout("Starting Kimtec products update..." . PHP_EOL, Console::FG_YELLOW);
        $start_time = microtime(true);

        $allProducts = 0;
        $newProducts = 0;
        $updatedProducts = 0;




        try {

            $result = $this->getKimTecProduct($productList);

            if($result) {

                $xml = simplexml_load_string($result);
                $priceList = $this->getKimTecProduct($productPriceList);

                foreach ($xml->Table as $product) {
                    $allProducts++;

                    $code = trim((string)$product->ProductCode);
                    $name = trim((string)$product->ProductName);
                    $manufacturer =  trim((string)$product->Brand);
                    $short_description = trim((string)$product->TechnicalDescription);
                    $detail_description = trim((string)$product->MarketingDescription);
                    $imageURL = trim((string)$product->ProductImageUrl);

                    /**
                     * @var Product $exist
                     */
                    $exist = Product::find()->where([
                        'code' => $code
                    ])->one();

                    if(!$exist) {
                        $item = new Product();
                        $item->code = $code;
                        $item->name = $name;
                        $item->is_active = 0;
                        $item->manufacturer = $manufacturer;
                        $item->short_description = $short_description;
                        $item->image_url = $imageURL;
                        $item->company = Product::COMPANY_KIMTEC;
                        $item->description = $detail_description;
                        $item->price = 0;
                        $item->retail_price = 0;
                        $item->selling_price = 0;
                        $item->quantity = 0 ;

                        if ($item->validate()) {
                            $item->save();
                            $newProducts++;
                            $this->stdout("{$newProducts} " . PHP_EOL, Console::FG_GREEN);
                        } else {
                            $errors =  implode('<br>', $item->getFirstErrors());
                            $this->stdout("Error: {$errors}. " . PHP_EOL, Console::FG_RED);
                        }
                    }
                    $this->stdout("Finished! Added: {$newProducts}; All: {$allProducts}" . PHP_EOL, Console::FG_GREEN);
                }

                $priceUpdatedNumber = 0;
                $xml = simplexml_load_string($priceList);
                foreach ($xml->Table as $product) {
                    $code = trim((string)$product->ProductCode);
                    $price = floatval((float)$product->ProductPartnerPrice);
                    $retail_price = floatval((float)$product->RecommendedRetailPrice);
                    $quantity = trim((string)$product->ProductAvailability);


                    $exist = Product::find()->where([
                        'code' => $code
                    ])->one();

                    if($exist) {
                        $priceUpdatedNumber ++;
                        $exist->price = $price;
                        $exist->retail_price = $retail_price;
                        $exist->selling_price = $exist->selling_price == 0 ? $retail_price : $exist->selling_price ;
                        $exist->quantity = $quantity ;

                        $exist->save();

                        $this->stdout("Finished! PriceAndQuantityUpdated: {$priceUpdatedNumber};" . PHP_EOL, Console::FG_GREEN);
                    }
                }

            }


        } catch (\Exception $e) {
            $this->stdout("Error: " . $e . PHP_EOL, Console::FG_RED);
            return false;
        }

    }

    public function actionUniExpert()
    {

        $this->stdout("Starting UniExport products update..." . PHP_EOL, Console::FG_YELLOW);
        $start_time = microtime(true);



        $allProducts = 0;
        $newProducts = 0;
        $updatedProducts = 0;
        try {

            $response = $this->getClient()->get('https://www.ue.ba/ekupi.xml');
            $xml = simplexml_load_string($response->getBody(), "SimpleXMLElement", LIBXML_NOCDATA);

            if ($xml === false) {
                $this->stdout("Error..." . PHP_EOL, Console::FG_RED);
                return false;
            }


            foreach ($xml->item as $product) {
                $allProducts++;

                $code = trim((string)$product->Sifra);
                $name = trim((string)$product->Naziv);
                $quantity = trim((string)$product->Kolicina);
                $price = floatval((float)$product->{'Nabavna-cijena'});
                $retail_price = floatval((float)$product->{'Preporucena-cijena'});
                $short_description = trim((string)$product->Specifikacija);
                $detail_description = trim((string)$product->Opis);
                $imageURL = trim((string)$product->Slika1);

                /**
                 * @var Product $exist
                 */
                $exist = Product::find()->where([
                    'code' => $code
                ])->one();


                if(!$exist) {
                    $item = new Product();
                    $item->code = $code;
                    $item->name = $name;
                    $item->quantity = $quantity ;
                    $item->is_active = 0;
                    $item->short_description = $short_description;
                    $item->price = $price;
                    $item->retail_price = $retail_price;
                    $item->selling_price = $retail_price;
                    $item->image_url = $imageURL;
                    $item->company = Product::COMPANY_UNI_EXPERT;
                    $item->description = $detail_description;

                    if($item->validate()){
                        $item->save();
                        $newProducts++;

                        $this->stdout("{$newProducts}. " . $code . " - " . $name .  " - " . $quantity . " - " . $price . " - "
                            . $retail_price . " - " . $short_description . " - " . $imageURL . PHP_EOL, Console::FG_GREEN);
                    } else {
                        $this->stdout("{$newProducts}. " . $code . " - " . $name . " - " . $quantity . " - " . $price . " - "
                            . $retail_price . " - " . $short_description . " - " . $imageURL . PHP_EOL, Console::FG_RED);
                    }
                } else {
                    $updatedProducts++;

                    $exist->quantity = $quantity;
                    $exist->price = $price;
                    $exist->retail_price = $retail_price;
                    $exist->image_url = $exist->image_url ? $exist->image_url : $imageURL;
                    $exist->save();

                    $this->stdout("{$newProducts}. " . $code . " - " . $name  . " - " . $quantity . " - " . $price . " - "
                        . $retail_price . " - " . $short_description . " - " . $imageURL . PHP_EOL, Console::FG_BLUE);
                }

            }

        } catch (\Exception $e) {
            $this->stdout("Error: " . $e . PHP_EOL, Console::FG_RED);
            return false;
        }

        $end_time = microtime(true);
        $execution_time = ($end_time - $start_time);
        $execution_time = number_format($execution_time, 2);
        $this->stdout("Finished! All: {$allProducts}, Updated: {$updatedProducts}, Created: {$newProducts} Time:  " . $execution_time . PHP_EOL, Console::FG_GREEN);
    }

}