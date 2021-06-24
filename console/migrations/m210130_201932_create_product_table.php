<?php

use yii\db\Migration;

/**
 * Handles the creation of table `product`.
 */
class m210130_201932_create_product_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $tableOptions = 'CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE=InnoDB';
        $this->createTable('product', [
            'id' => $this->primaryKey(),
            'image_id' => $this->integer(),
            'image_url' => $this->string(),
            'name' => $this->string(255)->notNull(),
            'code' => $this->string(255)->notNull(),
            'quantity' => $this->integer()->notNull(),
            'is_on_auction' => $this->boolean()->defaultValue(0),
            'is_active' => $this->boolean()->defaultValue(1),
            'short_description' => $this->string(),
            'price' => $this->float()->notNull(),
            'retail_price' => $this->float()->notNull(),
            'description' => $this->text(),
            'created_at' => $this->integer(),
            'created_by' => $this->integer(),
            'updated_at' => $this->integer(),
            'updated_by' => $this->integer(),
            'is_deleted' => $this->boolean()->defaultValue(0)
        ], $tableOptions);

        $this->createIndex('IDX_code', 'product', 'code');
        $this->addForeignKey('FK_product_file', 'product', 'image_id', 'file', 'id');

    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropIndex('IDX_code', 'product');
        $this->dropForeignKey('FK_product_file', 'product');
        $this->dropTable('product');
    }
}
