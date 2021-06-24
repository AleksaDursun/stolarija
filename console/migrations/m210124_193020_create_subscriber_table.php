<?php

use yii\db\Migration;

/**
 * Handles the creation of table `subscriber`.
 */
class m210124_193020_create_subscriber_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('subscriber', [
            'id' => $this->primaryKey(),
            'email' => $this->string(255)->notNull(),
            'is_active' => $this->boolean()->defaultValue(1),
            'created_at' => $this->integer(),
            'created_by' => $this->integer(),
            'updated_at' => $this->integer(),
            'updated_by' => $this->integer(),
            'is_deleted' => $this->boolean()->defaultValue(0)
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('subscriber');
    }
}
