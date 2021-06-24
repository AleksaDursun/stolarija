<?php

use yii\db\Migration;
use yii\helpers\Inflector;

/**
 * Class m190618_130100_initialize_database
 */
class m000000_000000_initialize_database extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        echo "*** Creating main database structure for Straight Line application. " . PHP_EOL;

        $query = file_get_contents(dirname(__FILE__) . "/../data/initial.sql");

        $this->execute($query);

        $this->insert('profile', [
            'first_name' => 'Media',
            'last_name' => 'Market',
            'created_at' => time(),
        ]);

        $this->insert('user', [
            'profile_id' => 1,
            'email' => 'aleksa@singularity.is',
            'username' => 'admin',
            'password_hash' => '$2a$13$hUjtMwR9BNTyjGXw7vOByeoC2d1dnuuAwfu4QP5lckP55KMACXtru', //admin
            'is_active' => 1,
            'created_at' => time(),
        ]);

        $this->insert('auth_item', [
            'name' => 'admin',
            'description' => 'Superuser role',
            'type' => 1,
        ]);

        $this->insert('auth_item', [
            'name' => 'admin-permission',
            'description' => 'Highest permission there is',
            'type' => 2,
        ]);

        $this->insert('auth_item_child', [
            'parent' => 'admin',
            'child' => 'admin-permission',
        ]);

        $this->insert('auth_assignment', [
            'item_name' => 'admin',
            'user_id' => 1,
            'created_at' => time(),
        ]);

        $faIcons = require __DIR__ . '/../data/fa-5-pro-icons.php';

        foreach ($faIcons as $fa) {
            $this->insert('icon', [
                'group' => $fa['group'],
                'name' => Inflector::camel2words(Inflector::id2camel($fa['name'])),
                'code' => $fa['name'],
                'type' => 'font-awesome'
            ]);
        }

    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        echo "m000000_000000_initialize_database cannot be reverted.\n";

        return false;
    }

}
