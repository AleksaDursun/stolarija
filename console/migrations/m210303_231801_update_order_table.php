<?php

use yii\db\Migration;

/**
 * Class m210303_231801_update_order_table
 */
class m210303_231801_update_order_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('order', 'company_id', $this->string()->after('notes'));
        $this->addColumn('order', 'company_name', $this->string()->after('company_id'));
        $this->addColumn('order', 'company_address', $this->string()->after('company_name'));

    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('order', 'company_id');
        $this->dropColumn('order', 'company_name');
        $this->dropColumn('order', 'company_address');
    }

}
