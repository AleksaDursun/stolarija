<?php

use yii\db\Migration;

/**
 * Class m210207_205323_update_product_table
 */
class m210207_205323_update_product_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('product', 'selling_price', $this->float()->after('retail_price')->notNull());
        $this->addColumn('product', 'sale', $this->float()->after('selling_price'));
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('product', 'selling_price');
        $this->dropColumn('product', 'sale');
    }

}
