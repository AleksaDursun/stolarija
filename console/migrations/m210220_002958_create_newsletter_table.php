<?php

use yii\db\Migration;

/**
 * Handles the creation of table `newsletter`.
 */
class m210220_002958_create_newsletter_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $tableOptions = 'CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE=InnoDB';

        $this->createTable('newsletter', [
            'id' => $this->primaryKey(),
            'subject' => $this->string()->notNull(),
            'text' => $this->text(),
            'image_id' => $this->integer(),
            'created_at' => $this->integer(),
            'created_by' => $this->integer(),
            'updated_at' => $this->integer(),
            'updated_by' => $this->integer(),
            'is_deleted' => $this->boolean()->defaultValue(0)
        ], $tableOptions);

        $this->addForeignKey('FK_newsletter_file', 'newsletter', 'image_id', 'file', 'id');

    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropForeignKey('FK_newsletter_file', 'newsletter');
        $this->dropTable('newsletter');
    }
}
