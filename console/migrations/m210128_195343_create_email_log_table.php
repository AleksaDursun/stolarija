<?php

use yii\db\Migration;

/**
 * Handles the creation of table `email_log`.
 */
class m210128_195343_create_email_log_table extends Migration
{
    /**
     * {@inheritdoc}
     */

    public function safeUp()
    {
        $tableOptions = 'CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE=InnoDB';
        $this->createTable('email_log', [
            'id' => $this->primaryKey(),
            'attachment_id' =>  $this->integer(),
            'subject' => $this->string(512),
            'from' => $this->string(255),
            'to' => $this->text(),
            'reply_to' => $this->string(255),
            'cc' => $this->text(),
            'bcc' => $this->text(),
            'view' => $this->string(),
            'params' => 'BLOB',
            'num_attempts' => $this->integer()->defaultValue(0),
            'last_attempt_at' => $this->integer(),
            'status' => $this->string(45),
            'created_at' => $this->integer(),
            'created_by' => $this->integer(),
            'is_deleted' => $this->boolean()->defaultValue(0),
        ], $tableOptions);

        $this->addForeignKey('FK_email_log_attachment', 'email_log', 'attachment_id', 'file', 'id');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropForeignKey('FK_email_log_attachment', 'email_log');
        $this->dropTable('email_log');
    }
}
