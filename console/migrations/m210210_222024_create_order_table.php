<?php

use yii\db\Migration;

/**
 * Handles the creation of table `order`.
 */
class m210210_222024_create_order_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $tableOptions = 'CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE=InnoDB';

        $this->createTable('order', [
            'id' => $this->primaryKey(),
            'status' => $this->string()->notNull()->defaultValue('ZAPRIMLJENA'),
            'price' => $this->float()->notNull(),
            'address' => $this->string()->notNull(),
            'city' => $this->string()->notNull(),
            'zip_code' => $this->string(),
            'email' => $this->string()->notNull(),
            'phone' => $this->string(),
            'first_name' => $this->string()->notNull(),
            'last_name' => $this->string()->notNull(),
            'notes' => $this->string(),
            'created_at' => $this->integer(),
            'created_by' => $this->integer(),
            'updated_at' => $this->integer(),
            'updated_by' => $this->integer(),
            'is_deleted' => $this->boolean()->defaultValue(0)
        ], $tableOptions);

        $this->createTable('order_item', [
            'id' => $this->primaryKey(),
            'product_id' => $this->integer()->notNull(),
            'quantity' => $this->integer()->notNull(),
            'product_price' => $this->integer()->notNull(),
            'order_id' => $this->integer()->notNull(),
            'created_at' => $this->integer(),
            'created_by' => $this->integer(),
            'updated_at' => $this->integer(),
            'updated_by' => $this->integer(),
            'is_deleted' => $this->boolean()->defaultValue(0)
        ], $tableOptions);

        $this->addForeignKey('FK_order_item_product', 'order_item', 'product_id', 'product', 'id');
        $this->addForeignKey('FK_order_item_order', 'order_item', 'order_id', 'order', 'id');

    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropForeignKey('FK_order_item_order', 'order_item');
        $this->dropForeignKey('FK_order_item_product', 'order_item');
        $this->dropTable('order_items');
        $this->dropTable('order');
    }
}
