<?php

use yii\db\Migration;

/**
 * Class m210220_123627_update_category_table
 */
class m210220_123627_update_category_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('category', 'is_active', $this->tinyInteger()->after('parent_category_id')->defaultValue(0));

    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('category', 'is_active');
    }

}
