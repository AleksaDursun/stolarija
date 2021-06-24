<?php

use yii\db\Migration;

/**
 * Class m210316_222141_update_category_table
 */
class m210316_222141_update_category_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('category', 'sort', $this->integer()->defaultValue(1)->after('is_active') );
        $this->addColumn('category', 'have_used_items', $this->tinyInteger()
            ->defaultValue(1)->after('sort') );

    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('category', 'sort');
        $this->dropColumn('category', 'have_used_items');
    }

}
