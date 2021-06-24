<?php

use yii\db\Migration;

/**
 * Class m210131_171603_update_product_table
 */
class m210131_171603_update_product_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->alterColumn('product', 'short_description', $this->text());
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->alterColumn('product', 'short_description', $this->string(255));
    }


}
