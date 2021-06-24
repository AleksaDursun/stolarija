<?php

Yii::$container->set('yii\bootstrap4\ActiveForm', [
    'validationStateOn' => 'container',
    'errorCssClass' => 'is-invalid has-danger',
]);

Yii::$container->set('yii\bootstrap4\ActiveField', [
    'options' => ['class' => ['widget' => 'form-group flex-column']],
    'errorOptions' => ['class' => 'invalid-feedback error'],
    'checkTemplate' => "<div class=\"form-check custom-control custom-checkbox\">\n{input}\n{label}\n{error}\n{hint}\n</div>",
    'checkEnclosedTemplate' => "<div class=\"form-check\">\n{beginLabel}\n{input}\n{labelTitle}\n<span class=\"form-check-sign\"><span class=\"check\"></span></span>\n{endLabel}\n{error}\n{hint}\n</div>"
]);


Yii::$container->set('dosamigos\selectize\SelectizeAsset', [
    'depends' => [],
    'css' => ['/vendor/selectize/css/selectize.bootstrap4.css'],
]);

Yii::$container->set('dosamigos\switchery\Switchery', [
    'clientOptions' => [
        'color' => '#2479b2'
    ]
]);

Yii::$container->set('common\components\multipleinput\MultipleInputSwitchery', [
    'clientOptions' => [
        'color' => '#2479b2'
    ]
]);

Yii::$container->set('singularity\daterangepicker\Daterangepicker', [
    'clientOptions' => [
        'locale' => [
            'format' => \common\helpers\TimeHelper::getMomentDatePickerFormat()
        ]
    ]
]);

