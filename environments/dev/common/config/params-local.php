<?php

return [
    'resourceManager' => [
        's3.path.prefix' => 'dev',
        's3.file.prefix' => '',
        'image.thumb.path' => 'thumbs/', //relative from path prefix
        's3.expire.time' => '+20 minutes',
        'image.thumb.expire' => '+20 minutes'
    ],
    'backend.baseUri' => 'http://media-market-admin.bcreativeapp.com', //backend link
];