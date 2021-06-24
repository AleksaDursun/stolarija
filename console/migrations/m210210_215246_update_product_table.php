<?php

use yii\db\Migration;

/**
 * Class m210210_215246_update_product_table
 */
class m210210_215246_update_product_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('product', 'manufacturer', $this->string()->after('name'));
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('product', 'manufacturer');
    }
}
