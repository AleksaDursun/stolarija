<?php

use yii\db\Migration;

/**
 * Handles the creation of table `category`.
 */
class m210131_173142_create_category_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $tableOptions = 'CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE=InnoDB';

        $this->createTable('category', [
            'id' => $this->primaryKey(),
            'name' => $this->string(255)->notNull(),
            'code' => $this->string(255)->notNull()->unique(),
            'parent_category_id' => $this->integer(),
            'created_at' => $this->integer(),
            'created_by' => $this->integer(),
            'updated_at' => $this->integer(),
            'updated_by' => $this->integer(),
            'is_deleted' => $this->boolean()->defaultValue(0)
        ], $tableOptions);

        $this->createIndex('IDX_code', 'category', 'code');


    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropIndex('IDX_code', 'category');
        $this->dropTable('category');
    }
}
