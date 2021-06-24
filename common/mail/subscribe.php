<?php

use common\helpers\FrontendUrlHelper;
use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $user common\models\User */
/* @var $email string*/


?>

<div class="mj-column-per-100 outlook-group-fix"
     style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
        <tr>
            <td style="word-wrap:break-word;font-size:15px;padding:0px;">
                <p style="font-size:26px;padding:20px 0; font-weight:700;">
                    Poštovani,
                </p>
                <p>
                    <?= Yii::t('app', 'Izvršena je pretplata za Madia Market newsletter sa Vaše e-mail adrese {:email}.', [
                        ':email' => $email
                    ]) ?>
                </p>

            </td>
        </tr>

        <tr class="text"
            style="overflow-wrap: break-word; word-wrap: break-word; -ms-word-break: break-all; word-break: break-all; word-break: break-word;">
            <td style="margin: 0; word-wrap: break-word; font-size: 0px; padding: 0px; padding-top: 15px;"
                align="center">
                <div style="margin: 0; cursor: auto; color: #cccccc; font-family: Arial, sans-serif; font-size: 13px; font-weight: 400; line-height: 1.5; text-align: center;">
                    <p>Ukoliko niste lično izvršili registraciju, nego neko drugi koristeći Vašu e-mail adresu
                         obavijestite na putem e-maila <?= Yii::$app->params['support.email'] ?></p>
                </div>
            </td>
        </tr>
        </tbody>
    </table>
</div>
