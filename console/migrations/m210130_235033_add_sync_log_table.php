<?php

use yii\db\Migration;

/**
 * Class m210130_235033_add_sync_log_table
 */
class m210130_235033_add_sync_log_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('sync_log', [
            'id' => $this->primaryKey(),
            'command' => $this->string(),
            'run_time' => $this->integer(),
            'updated_items' => $this->integer(),
            'created_new_items' => $this->integer(),
            'status' => $this->string()->defaultValue('pending')->notNull(),
            'exception' => $this->text()
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('sync_log');
    }
}
