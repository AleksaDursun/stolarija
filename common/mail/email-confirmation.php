<?php
/*
 * Nikola Kukric <info@singularity-solution.com>
 * Company: Singularity Solution <https://singularity-solution.com>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

use common\models\Profile;
use common\models\Shop;
use common\models\User;
use yii\helpers\Html;
use yii\helpers\Url;


/**
 * @var User $user
 * @var Profile $profile
 * @var Shop $shop
 */

$emailConfirmationUrl = Url::to(['site/verify-email', 'hash' => $user->auth_key], true);

?>

<div class="mj-column-per-100 outlook-group-fix"
     style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
        <tr>
            <td style="word-wrap:break-word;font-size:15px;padding:0px;">
                <p>
                    <?= Yii::t('app', 'Click the link below to verify your {:chicagoOglasi} account.', [
                        ':chicagoOglasi' => Html::a(Yii::t('app', 'ChicagoOglasi', ['/']))
                    ]) ?>
                </p>
                <p>
                    <?= Yii::t('app', 'This link will expire in 15 days and can only be used once.') ?>
                </p>
            </td>
        </tr>
        <tr>
            <td style="word-wrap:break-word;font-size:0px;padding:0px;padding-top:40px;" align="center">
                <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate;width:100%;"
                       align="center" border="0">
                    <tbody>
                    <tr>
                        <td style="border:none;border-radius:26px;color:#fff;cursor:auto;height:52px;padding:0px 0px;"
                            align="center" valign="middle" bgcolor="#1db8ac">
                            <a href="<?= $emailConfirmationUrl ?>"
                               style="display:inline-block;letter-spacing: 0px;padding:14px 18px 14px 18px; text-align: center;text-decoration: none;background: #1db8ac;color: #ffffff;font-family: Arial, sans-serif;font-size: 16px;font-weight: 700;line-height: 1;text-transform: none;margin: 0px;"
                               target="_blank"><?= Yii::t('app', 'Verify Email') ?></a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr class="text"
            style="overflow-wrap: break-word; word-wrap: break-word; -ms-word-break: break-all; word-break: break-all; word-break: break-word;">
            <td style="margin: 0; word-wrap: break-word; font-size: 0px; padding: 0px; padding-top: 15px;" align="left">
                <div style="margin: 0; cursor: auto; color: #000000; font-family: Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 1.5; text-align: left;">
                    <?= Yii::t('app', 'If the button above doesn’t work, paste this link into your web browser: {:url}', [
                        ':url' => '<p>' . Html::a($emailConfirmationUrl, $emailConfirmationUrl) . '</p>'
                    ]) ?>
                </div>
            </td>
        </tr>
        <tr class="text"
            style="overflow-wrap: break-word; word-wrap: break-word; -ms-word-break: break-all; word-break: break-all; word-break: break-word;">
            <td style="margin: 0; word-wrap: break-word; font-size: 0px; padding: 0px; padding-top: 15px;"
                align="center">
                <div style="margin: 0; cursor: auto; color: #cccccc; font-family: Arial, sans-serif; font-size: 13px; font-weight: 400; line-height: 1.5; text-align: center;">
                    <?= Yii::t('app', 'If you did not make this request, you can safely ignore this email.') ?>
                </div>
            </td>
        </tr>
        </tbody>
    </table>
</div>