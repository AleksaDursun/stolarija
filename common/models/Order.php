<?php

namespace common\models;

use common\components\orm\ActiveRecord;
use common\helpers\ArrayHelper;
use common\helpers\EmailHelper;
use Yii;
use yii\helpers\Html;
use Exception;


/**
 * This is the model class for table "order".
 *
 * @property int $id
 * @property string $status
 * @property float $price
 * @property string $address
 * @property string $city
 * @property string|null $zip_code
 * @property string $email
 * @property string|null $phone
 * @property string $first_name
 * @property string $last_name
 * @property string|null $notes
 * @property string|null $company_id
 * @property string|null $company_name
 * @property string|null $company_address
 * @property int|null $created_at
 * @property int|null $created_by
 * @property int|null $updated_at
 * @property int|null $updated_by
 * @property int|null $is_deleted
 *
 * @property OrderItem[] $orderItems
 */
class Order extends ActiveRecord
{
    const STATUS_ZAPRIMLJENA = 'ZAPRIMLJENA';
    const STATUS_POSLATO = 'POSLATO';
    const STATUS_DOSTAVLJENO = 'DOSTAVLJENO';
    const STATUS_OTKAZANO = 'OTKAZANO';



    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'order';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['price', 'address', 'city', 'email', 'first_name', 'last_name'], 'required'],
            [['price'], 'number'],
            [['created_at', 'created_by', 'updated_at', 'updated_by', 'is_deleted'], 'integer'],
            [['status', 'address', 'city', 'zip_code', 'email', 'phone', 'first_name', 'last_name', 'notes',
                'company_id', 'company_name', 'company_address'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'status' => 'Status',
            'price' => 'Price',
            'address' => 'Address',
            'city' => 'City',
            'zip_code' => 'Zip Code',
            'email' => 'Email',
            'phone' => 'Phone',
            'first_name' => 'First Name',
            'last_name' => 'Last Name',
            'notes' => 'Notes',
            'created_at' => 'Created At',
            'created_by' => 'Created By',
            'updated_at' => 'Updated At',
            'updated_by' => 'Updated By',
            'is_deleted' => 'Is Deleted',
        ];
    }

    /**
     * Gets query for [[OrderItems]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getOrderItems()
    {
        return $this->hasMany(OrderItem::class, ['order_id' => 'id']);
    }


    public function getOrderItemsList()
    {
        $items = '';
        foreach ($this->orderItems as $orderItem) {
            $items .= '<p class="my-1">' . $orderItem->product->name .
                ' - <span style="font-weight: bold" >' . $orderItem->product_price .  'KM x ' . $orderItem->quantity . ' = ' .
                $orderItem->product_price * $orderItem->quantity .  'KM</span></p>';
        }

        return $items;
    }

    public function getOrderAddressFormat()
    {
        $customer = $this->first_name . ' ' . $this->last_name . '<br>' .
            $this->address . '<br>' .
            $this->city . ', ' . $this->zip_code . '<br>' .
            $this->phone . '<br>' .
            $this->email . '<br>' ;

        $customer = $this->company_name ? $customer . $this->company_name . '<br>' . 'ID: ' . $this->company_id .'<br>' . $this->company_address : $customer;

        return $customer;
    }

    public function getStatusText()
    {
        $status = ArrayHelper::getValue($this->getStatusList(), $this->status, 'Unknown');

        return Html::tag('span', $status, ['class' => "badge badge-{$this->getStatusColor()}"]);
    }

    public function getEmailStatus() {
        switch ($this->status) {
            case static::STATUS_ZAPRIMLJENA:
                return  'zaprimljena!';
            case static::STATUS_POSLATO:
                return 'na putu ka Vama.';
            case static::STATUS_DOSTAVLJENO:
                return 'uspješno dostavljena! Hvala na saradnji!';
            case static::STATUS_OTKAZANO:
                return 'otkazana!';
            default:
                return 'sa nepoznatim statusom. Kontaktirajte nas!';

        }

    }


    public function getStatusList()
    {
        return [
            static::STATUS_ZAPRIMLJENA => 'Zaprimljena',
            static::STATUS_DOSTAVLJENO => 'Dostavljeno',
            static::STATUS_POSLATO => 'Poslato',
            static::STATUS_OTKAZANO => 'Otkazana',
        ];
    }

    public function getStatusColor()
    {
        switch ($this->status) {
            case static::STATUS_ZAPRIMLJENA:
                $color = 'warning';
                break;
            case static::STATUS_POSLATO:
                $color = 'primary';
                break;
            case static::STATUS_DOSTAVLJENO:
                $color = 'success';
                break;
            case static::STATUS_OTKAZANO:
                $color = 'danger';
                break;
            default:
                $color = 'light';
        }

        return $color;
    }

    public function getOrderStatusLabels()
    {
        return Html::a($this->getStatusText(), ['/order/status', 'id' => $this->id], [
                'data-pjax' => '0',
                'data-size' => 'modal-sm',
                'class' => 'btn-loading btn-modal-control',
            ]);
    }

    public function changeStatusTo($status)
    {
        if ($this->status == $status) {
            return true;
        }

        $this->status = $status;

;
        if($status != '') {
            $this->sendEmail();
        }

        return $this->updateAttributes(['status']);
    }

    public function sendEmail()
    {

        $from = [Yii::$app->params['support.email'] => Yii::$app->params['support.name']];
        $subject = 'Umjetnost u Drvetu - Narudžba ' . $this->getEmailStatus();
        $replay_to = $from;
        $to = $this->email;
        $params = [
            'email' => $this->email,
            'order' => $this
        ];
        $view = 'order';


        $mail = Yii::$app->mailer
            ->compose($view, $params)
            ->setSubject($subject)
            ->setFrom($from)
            ->setTo($to)
            ->setBcc('mostar@umjetnostudrvetu.com')
            ->setReplyTo($replay_to);

        try {
            $emailLog = EmailHelper::addToLog($to, $subject, $view, $params);
            if (!$mail->send()) {
                $emailLog->status = EmailLog::STATUS_SEND_FAILED;
                $emailLog->last_attempt_at = time();
                $emailLog->updateAttributes(['status', 'last_attempt_at']);
                throw new Exception("Unable to send email.");
            }

        } catch (Exception $e) {
            $emailLog->status = EmailLog::STATUS_SEND_FAILED;
            $emailLog->last_attempt_at = time();
            $emailLog->updateAttributes(['status', 'last_attempt_at']);
            Yii::error($e->getMessage());
            throw $e;
        }


        $emailLog->status = EmailLog::STATUS_SENT;
        $emailLog->updateAttributes(['status']);
        return true;

    }

}
