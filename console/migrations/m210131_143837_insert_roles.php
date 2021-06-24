<?php

use yii\db\Migration;

/**
 * Class m210131_143837_insert_roles
 */
class m210131_143837_insert_roles extends Migration
{
    public function safeUp()
    {
        $this->insert('auth_item', [
            'name' => 'user',
            'description' => 'User role',
            'type' => 1,
        ]);

        $this->insert('auth_item', [
            'name' => 'user-permission',
            'description' => 'user permission',
            'type' => 2,
        ]);

        $this->insert('auth_item_child', [
            'parent' => 'user',
            'child' => 'user-permission',
        ]);

    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        echo "m190918_185545_insert_roles cannot be reverted.\n";

        return false;
    }
}
