<?php
/**
 * Nikola Jankovic  <hello@singularity.is>
 * Company: Singularity Solution <https://singularity.is>
 */

use yii\helpers\Url;

$resetLink = Yii::$app->urlManager->createAbsoluteUrl(['password-reset', 'token' => $model->password_reset_token]);
$this->params['options'] = isset($options) ? $options : [];
?>

<div class="mj-column-per-100 outlook-group-fix"
     style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
        <tr>
            <td style="word-wrap:break-word;font-size:15px;padding:0px;">
                <p>
                    <?= Yii::t('app', 'Follow the link below to reset your password') ?>:
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
                            <a href="<?= $resetLink ?>"
                               style="display:inline-block;letter-spacing: 0px;padding:14px 18px 14px 18px; text-align: center;text-decoration: none;background: #1db8ac;color: #ffffff;font-family: Arial, sans-serif;font-size: 16px;font-weight: 700;line-height: 1;text-transform: none;margin: 0px;"
                               target="_blank"><?= Yii::t('app', 'Reset Password') ?></a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr class="text"
            style="overflow-wrap: break-word; word-wrap: break-word; -ms-word-break: break-all; word-break: break-all; word-break: break-word;">
            <td style="margin: 0; word-wrap: break-word; font-size: 0px; padding: 0px; padding-top: 15px;"
                align="center">
                <div style="margin: 0; cursor: auto; color: #cccccc; font-family: Arial, sans-serif; font-size: 13px; font-weight: 400; line-height: 1.5; text-align: center;">
                    <?= Yii::t('app', 'If you did not initiate password reset request, ignore this email.') ?>
                </div>
            </td>
        </tr>
        </tbody>
    </table>
</div>