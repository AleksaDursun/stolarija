<?php

/*
 * Nikola Kukric <info@singularity.is>
 * Company: Singularity Solution <https://singularity.is>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

use yii\helpers\ArrayHelper;

$params = array_merge(
    require __DIR__ . '/../../common/config/params.php',
    require __DIR__ . '/../../common/config/params-local.php',
    require __DIR__ . '/params.php',
    require __DIR__ . '/params-local.php'
);

$routes = require __DIR__ . '/routes.php';

return [
    'id' => 'straight-line-api',
    'version' => "1.0.0",
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'controllerNamespace' => 'api\controllers',
    'modules' => [
        'oauth2' => [
            'class' => 'filsh\yii2\oauth2server\Module',
            'tokenParamName' => 'access_token',
            'tokenAccessLifetime' => 864000, // 10 days
            'storageMap' => [
                'user_credentials' => 'api\models\User',
            ],
            'grantTypes' => [
                'user_credentials' => [
                    'class' => 'OAuth2\GrantType\UserCredentials',
                ],
                'client_credentials' => [
                    'class' => 'OAuth2\GrantType\ClientCredentials'
                ],
                'refresh_token' => [
                    'class' => 'OAuth2\GrantType\RefreshToken',
                    'always_issue_new_refresh_token' => true,
                    'refresh_token_lifetime' => 2592000, // 30 days
                ]
            ]
        ],
        'v1' => [
            'basePath' => '@api/versions/v1',
            'class' => 'api\versions\v1\Module'
        ],
    ],
    'components' => [
        'user' => [
            'identityClass' => 'api\models\User',
            'enableAutoLogin' => false,
            'loginUrl' => null,
            'enableSession' => false
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
        'authManager' => [
            'class' => 'yii\rbac\DbManager',
        ],
        'urlManager' => [
            'showScriptName' => false,
            'enablePrettyUrl' => true,
            'enableStrictParsing' => true,
            'rules' => $routes,
        ],
        'request' => [
            'parsers' => [
                'application/json' => 'yii\web\JsonParser'
            ]
        ],
        'response' => [
            'class' => 'yii\web\Response',
            'format' => \yii\web\Response::FORMAT_JSON,
            'on beforeSend' => function ($event) {
                $response = $event->sender;

                if ($response->data !== null) {
                    $data = [];
                    if (!$response->isSuccessful) {
                        $data['success'] = false;
                        $data['code'] = ArrayHelper::getValue($response->data, 'status', 200);
                        $data['errors'] = [ArrayHelper::getValue($response->data, 'message')];
                    } else {
                        $data = $response->data;
                    }
                    $response->data = $data;
                    $response->statusCode = ArrayHelper::getValue($data, 'code');
                }
            },
        ]
    ],

    'params' => $params,
];
