<?php
return [
    'components' => [
        'db' => [
            'class' => 'yii\db\Connection',
            'dsn' => 'mysql:host=mariadb;dbname=umjetnost_u_drvetu',
            'username' => 'root',
            'password' => 'root',
            'charset' => 'utf8',
        ],
        'mailer' => [
            'class' => 'yii\swiftmailer\Mailer',
            'viewPath' => '@common/mail',
            'transport' => [
                'class' => 'Swift_SmtpTransport',
                'host' => 'mail.umjetnostudrvetu.com',
                'username' => 'podrska@umjetnostudrvetu.com',
                'password' => 'Mmarket123!1',
                'port' => '587',
                'encryption' => 'tls',
            ],
        ],
    ],
];
