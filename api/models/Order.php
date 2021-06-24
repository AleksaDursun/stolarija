<?php


namespace api\models;


use common\models\OrderItem;
use Exception;
use Yii;

class Order extends \common\models\Order
{
    public $order_items;

    public function rules()
    {
        return [
            [['address', 'city', 'email', 'first_name', 'last_name', 'phone', 'zip_code', 'order_items'], 'required'],
            [['address', 'city', 'zip_code', 'email', 'phone', 'first_name', 'last_name', 'notes',
                'company_id', 'company_name', 'company_address'], 'string', 'max' => 255],
            ['order_items', 'checkOrderItems']
        ];
    }

    public function checkOrderItems()
    {
        if (!is_array($this->order_items) || count($this->order_items) > 50) {
            $this->addError('order_items', 'Error with products!');
        }

        foreach ($this->order_items as $product) {
            if (!isset($product['product']) || !isset($product['quantity']) || !Product::find()->where(['id' => $product['product']])->exists()) {
                $this->addError('order_items', 'Error with products exist!');
            }
        }

    }

    public function save($runValidation = true, $attributeNames = null)
    {

        if (!$this->validate()) {
            return false;
        }

        $this->status = self::STATUS_ZAPRIMLJENA;
        $this->price = 0;

        $transaction = Yii::$app->db->beginTransaction();

        try {

            if(!parent::save(false)){
                throw new Exception("Unable to create order!");
            }


            $totalPrice = 0;
            foreach ($this->order_items as $order_item) {
                /** @var Product $product */
                $product = Product::findOne($order_item['product']);

                if($product && $product->quantity>0) {
                    $orderItem = new OrderItem();
                    $orderItem->product_id = $product->id;
                    $orderItem->quantity = $order_item['quantity'];
                    $orderItem->product_price = $product->getProductSellingPrice();
                    $orderItem->order_id = $this->id;

                    if (!$orderItem->save()) {
                        throw new Exception("Unable to create order item!");
                    }

                    $totalPrice+= ($orderItem->product_price * $orderItem->quantity);
                }
            }

            $this->price = $totalPrice;
            $this->updateAttributes(['price']);

            $transaction->commit();

        } catch (\Exception $e) {
            $this->addError('period', $e->getMessage());
            $transaction->rollBack();

            return false;
        }

        return true;
    }



}