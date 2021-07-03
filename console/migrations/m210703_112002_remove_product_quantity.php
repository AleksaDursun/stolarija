<?php

use yii\db\Migration;

/**
 * Class m210703_112002_remove_product_quantity
 */
class m210703_112002_remove_product_quantity extends Migration
{
  /**
   * {@inheritdoc}
   */
  public function safeUp()
  {
    $this->dropColumn('product', 'quantity');
    $this->dropColumn('product', 'sale');
  }

  /**
   * {@inheritdoc}
   */
  public function safeDown()
  {
    $this->addColumn('product', 'quantity', $this->integer()->after('company'));
    $this->addColumn('product', 'sale', $this->integer()->after('quantity'));
  }

  /*
  // Use up()/down() to run migration code without a transaction.
  public function up()
  {

  }

  public function down()
  {
      echo "m210703_112002_remove_product_quantity cannot be reverted.\n";

      return false;
  }
  */
}
