<?php
$params = array_merge(
    require __DIR__ . '/../../common/config/params.php',
    require __DIR__ . '/../../common/config/params-local.php',
    require __DIR__ . '/params.php',
    require __DIR__ . '/params-local.php'
);

return [
    'id' => 'app-backend',
    'name' => 'Umjetnost u Drvetu',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'homeUrl'=>'/dashboard/index',
    'controllerNamespace' => 'backend\controllers',
    'components' => [
//        'i18n' => [
//            'translations' => [
//                'app*' => [
//                    'class' => 'yii\i18n\DbMessageSource',
//                ],
//            ],
//        ],
        'assetManager' => [
            'linkAssets' => true,
        ],
        'request' => [
            'csrfParam' => '_csrf-backend',
        ],
        'flash' => \common\components\flash\Flash::class,
        'user' => [
            'class' => \common\components\WebUser::class,
            'identityClass' => 'common\models\User',
            'enableAutoLogin' => true,
            'identityCookie' => ['name' => '_identity-backend', 'httpOnly' => true],
        ],
        'session' => [
            // this is the name of the session cookie used for login on the backend
            'name' => 'advanced-backend',
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\DbTarget',
                    'levels' => ['error'],
                ],
            ],
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'rules' => [
                '' => '/dashboard',
                'login' => '/site/login',
                'signup' => '/site/signup',
                'profile' => '/user/profile',
                'request-password-reset' => '/site/request-password-reset',
                'password-reset' => '/site/password-reset',
            ],
        ],
    ],
    'params' => $params,
];
