<?php
return [
    'aliases' => [
        '@bower' => '@vendor/bower-asset',
        '@npm' => '@vendor/npm-asset',
    ],
    'vendorPath' => dirname(dirname(__DIR__)) . '/vendor',
    'bootstrap' => [
        'queue', // The component registers its own console commands
    ],
    'components' => [
        'cache' => [
            'class' => 'yii\caching\FileCache',
            'defaultDuration' => 86400, //day in seconds
        ],
        'settings' => [
            'class' => 'common\components\settings\SettingsComponent',
            'modelClass' => '\common\models\Settings'
        ],
        'queue' => [
            'class' => 'yii\queue\beanstalk\Queue',
            'host' => 'localhost',
            'port' => 11300,
            'tube' => 'queue',
            'ttr' => 60, // Max time for job execution
            'attempts' => 3, // Max number of attempts
        ],
        'authManager' => [
            'class' => 'yii\rbac\DbManager'
        ],

    ],
];
