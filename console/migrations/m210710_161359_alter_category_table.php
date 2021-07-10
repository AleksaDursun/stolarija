<?php

use yii\db\Migration;

/**
 * Class m210710_161359_alter_category_table
 */
class m210710_161359_alter_category_table extends Migration
{
  static $TABLE_NAME = 'category';
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
      $this->dropColumn(self::$TABLE_NAME, 'have_used_items');
      $this->addColumn(self::$TABLE_NAME, 'name_en', $this->string()->after('name'));
      $this->addColumn(self::$TABLE_NAME, 'name_de', $this->string()->after('name'));
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn(self::$TABLE_NAME, 'name_en');
        $this->dropColumn(self::$TABLE_NAME, 'name_de');
        $this->addColumn(self::$TABLE_NAME, 'have_used_items', $this->tinyInteger()->after('sort'));
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m210710_161359_alter_category_table cannot be reverted.\n";

        return false;
    }
    */
}
