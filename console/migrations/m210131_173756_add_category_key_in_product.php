<?php

use yii\db\Migration;

/**
 * Class m210131_173756_add_category_key_in_product
 */
class m210131_173756_add_category_key_in_product extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('product', 'category_id', $this->integer()->after('id'));
        $this->addForeignKey('FK_product_category', 'product', 'category_id', 'category', 'id');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropForeignKey('FK_product_category', 'product');
        $this->dropColumn('product', 'category_id');

    }

}
