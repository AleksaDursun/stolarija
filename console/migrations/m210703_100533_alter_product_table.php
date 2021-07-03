<?php

use yii\db\Migration;

/**
 * Class m210703_100533_alter_product_table
 */
class m210703_100533_alter_product_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
      $this->dropColumn('product', 'manufacturer');
      $this->dropColumn('product', 'code');
      $this->dropColumn('product', 'is_on_auction');
      $this->dropColumn('product', 'short_description');
      $this->dropColumn('product', 'price');
      $this->dropColumn('product', 'retail_price');
      $this->dropColumn('product', 'selling_price');
      $this->dropColumn('product', 'is_used');
      $this->dropColumn('product', 'is_on_carousel');
      $this->addColumn('product', 'name_en', $this->string()->after('name'));
      $this->addColumn('product', 'name_de', $this->string()->after('name_en'));
      $this->addColumn('product', 'description_en', $this->string()->after('description'));
      $this->addColumn('product', 'description_de', $this->string()->after('description_en'));
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        echo "m210703_100533_alter_product_table cannot be reverted.\n";

        return false;
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m210703_100533_alter_product_table cannot be reverted.\n";

        return false;
    }
    */
}
