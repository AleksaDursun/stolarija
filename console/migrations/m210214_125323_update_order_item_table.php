<?php

use yii\db\Migration;

/**
 * Class m210214_125323_update_order_item_table
 */
class m210214_125323_update_order_item_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->alterColumn('order_item', 'product_price', $this->float()->notNull()->after('quantity'));
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->alterColumn('order_item', 'product_price', $this->integer()->notNull()->after('quantity'));
    }

}
