<?php

use yii\db\Migration;

/**
 * Class m210209_222356_update_product_table
 */
class m210209_222356_update_product_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('product', 'is_used', $this->tinyInteger()->after('selling_price')->defaultValue(0));
        $this->addColumn('product', 'is_on_carousel', $this->tinyInteger()->after('is_used')->defaultValue(0));
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('product', 'is_used');
        $this->dropColumn('product', 'is_on_carousel');
    }

}
