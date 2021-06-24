<?php

/*
 * Nikola Kukric <info@singularity.is>
 * Company: Singularity Solution <https://singularity.is>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

return [
    [
        'class' => 'yii\rest\UrlRule',
        'controller' => 'v1/test',
        'pluralize' => false,
        'patterns' => [
            'GET index' => 'index',
            '' => 'options',
        ],
    ],
    [
        'class' => 'yii\rest\UrlRule',
        'controller' => 'v1/test',
        'pluralize' => false,
        'patterns' => [
            'GET index' => 'index',
            '' => 'options',
        ],
    ],
    [
        'class' => 'yii\rest\UrlRule',
        'controller' => 'v1/subscriber',
        'patterns' => [
            'POST' => 'create',
            '' => 'options',
        ],
    ],
    [
        'class' => 'yii\rest\UrlRule',
        'controller' => 'v1/category',
        'patterns' => [
            'GET' => 'index',
            '' => 'options',
        ],
    ],
    [
        'class' => 'yii\rest\UrlRule',
        'controller' => 'v1/product',
        'patterns' => [
            'GET' => 'index',
            '' => 'options',
        ],
    ],
    [
        'class' => 'yii\rest\UrlRule',
        'controller' => 'v1/category',
        'patterns' => [
            'GET' => 'index',
            '' => 'options',
        ],
    ],
    [
        'class' => 'yii\rest\UrlRule',
        'controller' => 'v1/order',
        'patterns' => [
            'POST' => 'create',
            '' => 'options',
        ],
    ],
];
