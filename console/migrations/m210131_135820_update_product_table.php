<?php

use yii\db\Migration;

/**
 * Class m210131_135820_update_product_table
 */
class m210131_135820_update_product_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('product', 'company', $this->string(255)->after('code'));
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('product', 'company');
    }

}
