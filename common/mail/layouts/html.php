<?php
/*
 * Nikola Radovic <info@singulaity.is>
 * Company: Singularity Solution <https://singulaity.is>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

?>
<?php

use yii\helpers\Html;
use yii\helpers\Url;
use yii\mail\BaseMessage;

/**
 * @var \yii\web\View $this
 * @var BaseMessage $content
 */

$options = array_merge([
    'title' => '',
    'closing' => '',
    'preview' => '',
], (isset($this->params['options']) ? $this->params['options'] : []));

$options['title'] = str_replace('<span>', '<span style="color: #ff6a58;">', $options['title']);
$frontendUri = Yii::$app->params['shop.site'];

?>

<?php $this->beginPage() ?>
<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
      xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <title><?= Html::encode($this->title) ?></title>
    <!--[if !mso]><!-- -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=<?= Yii::$app->charset ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style type="text/css">
        #outlook a {
            padding: 0;
        }

        .ReadMsgBody {
            width: 100%;
        }

        .ExternalClass {
            width: 100%;
        }

        .ExternalClass * {
            line-height: 100%;
        }

        body {
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        table,
        td {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
        }

        p {
            font-family: Arial, sans-serif;
            display: block;
            margin: 13px 0;
            line-height: 1.5;
        }
    </style>
    <!--[if !mso]><!-->
    <style type="text/css">
        @media only screen and (max-width: 480px) {
            @-ms-viewport {
                width: 320px;
            }
            @viewport {
                width: 320px;
            }
        }
    </style>
    <!--<![endif]-->
    <!--[if mso]>
    <xml>
        <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <!--[if lte mso 11]>
    <style type="text/css">
        .outlook-group-fix {
            width: 100% !important;
        }
    </style>
    <![endif]-->
    <style type="text/css">
        @media only screen and (max-width: 480px) {
            .text h2 {
                font-size: 26px !important;
            }

            .text p {
                font-size: 16px !important;
            }

            .text p.smaller {
                font-size: 14px !important;
            }

            .text a {
                font-size: 15px !important;
            }
        }
    </style>
    <style type="text/css">
        @media only screen and (min-width: 480px) {
            .mj-column-per-100 {
                width: 100% !important;
            }
        }
    </style>
    <?php $this->head() ?>
</head>

<body style="text-rendering: optimizeLegibility; -moz-osx-font-smoothing: grayscale; font-smoothing: antialiased; -webkit-font-smoothing: antialiased; background: #f1f7f9
;">
<?php $this->beginBody() ?>

<div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
    <?= $options['preview'] ?>
</div>
<div class="mj-container" style="background-color:#f1f7f9;">
    <!--[if mso | IE]>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" align="center"
           style="width:600px;">
        <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
    <![endif]-->
    <div style="margin:0px auto;max-width:600px;">
        <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" align="center"
               border="0">
            <tbody>
            <tr>
                <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:20px 7% 20px;">
                    <!--[if mso | IE]>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="vertical-align:top;width:600px;">
                    <![endif]-->
                    <div class="mj-column-per-100 outlook-group-fix"
                         style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
                        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                            <tr>
                                <td style="word-wrap:break-word;font-size:0px;padding:0px;" align="right">
                                    <div style="cursor:auto;color:#b3aebb;font-family:Arial, sans-serif;font-size:12.2px;font-weight:400;line-height:20px;text-align:right;">
                                        <?= Yii::t('app', 'Trebate pomoć?') ?>
                                        <a href="mailto:<?= Yii::$app->params['support.email'] ?>" class="link-outside"
                                           style="white-space: nowrap; color: inherit; text-decoration: underline; padding: 0 5px;"><?= Yii::$app->params['support.email'] ?></a>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--[if mso | IE]>
                    </td></tr></table>
                    <![endif]-->
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    <!--[if mso | IE]>
    </td></tr></table>
    <![endif]-->
    <!--[if mso | IE]>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" align="center"
           style="width:600px;">
        <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
    <![endif]-->
    <div style="margin:0px auto;max-width:600px;background:#fff;">
        <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#fff;"
               align="center" border="0">
            <tbody>
            <tr>
                <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:30px 7%;">
                    <!--[if mso | IE]>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="vertical-align:top;width:600px;">
                    <![endif]-->
                    <div class="mj-column-per-100 outlook-group-fix"
                         style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
                        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                            <tr>
                                <td style="word-wrap:break-word;font-size:0px;padding:0px;">
                                    <table role="presentation" cellpadding="0" cellspacing="0"
                                           style="background:none;border-radius:0;" border="0">
                                        <tbody>
                                        <tr>
                                            <td style="vertical-align:middle;text-align:left;width:150px;height:78px;">
                                                <a href="<?= $frontendUri ?>" target="_blank">
                                                    <img alt="Umjetnost u Drvetu" title="" height="101" width="368"
                                                         src="<?= Url::to('/img/logo/logo.png', true) ?>"
                                                         style="border:none;border-radius:0px;display:block;font-size:13px;outline:none;text-decoration:none;width:150px;height:auto;">
                                                </a>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr class="text"
                                style="overflow-wrap: break-word; word-wrap: break-word; -ms-word-break: break-all; word-break: break-all; word-break: break-word;">
                                <td style="margin: 0; word-wrap: break-word; font-size: 0px; padding: 0px;"
                                    align="left">
                                    <div style="margin: 0; cursor: auto; color: #000000; font-family: Arial, sans-serif; font-size: 13px; font-weight: 400; line-height: 1.5; text-align: left;">
                                        <h2 style="margin: 0; font-size: 32px; font-weight: 700; line-height: 1.2; margin-bottom: 0px; color: #333333; text-align: center;">
                                            <?= $options['title'] ?>
                                        </h2>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--[if mso | IE]>
                    </td></tr></table>
                    <![endif]-->
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    <!--[if mso | IE]>
    </td></tr></table>
    <![endif]-->
    <!--[if mso | IE]>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" align="center"
           style="width:600px;">
        <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
    <![endif]-->
    <div style="margin:0px auto;max-width:600px;background:#fff;">
        <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#fff;"
               align="center" border="0">
            <tbody>
            <tr>
                <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0 7%;">
                    <!--[if mso | IE]>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="vertical-align:top;width:600px;">
                    <![endif]-->
                    <?= $content ?>
                    <!--[if mso | IE]>
                    </td></tr></table>
                    <![endif]-->
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    <!--[if mso | IE]>
    </td></tr></table>
    <![endif]-->
    <!--[if mso | IE]>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" align="center"
           style="width:600px;">
        <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
    <![endif]-->
    <div style="margin:0px auto;max-width:600px;background:#fff;">
        <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#fff;"
               align="center" border="0">
            <tbody>
            <tr>
                <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 7%;">
                    <!--[if mso | IE]>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="vertical-align:top;width:600px;">
                    <![endif]-->
                    <div class="mj-column-per-100 outlook-group-fix"
                         style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
                        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                            <tr class="text"
                                style="overflow-wrap: break-word; word-wrap: break-word; -ms-word-break: break-all; word-break: break-all; word-break: break-word;">
                                <td style="margin: 0; word-wrap: break-word; font-size: 0px; padding: 0px;"
                                    align="left">
                                    <div style="margin: 0; cursor: auto; color: #000000; font-family: Arial, sans-serif; font-size: 13px; font-weight: 400; line-height: 1.5; text-align: left;">
                                        <p class="smaller"
                                           style="margin: 0; line-height: 1.4; color: #76747b; margin-bottom: 0; font-size: 16px;">
                                            <?= $options['closing'] ?>
                                        </p>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--[if mso | IE]>
                    </td></tr></table>
                    <![endif]-->
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    <!--[if mso | IE]>
    </td></tr></table>
    <![endif]-->
    <!--[if mso | IE]>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" align="center"
           style="width:600px;">
        <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
    <![endif]-->
    <div style="margin:0px auto;max-width:600px;">
        <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" align="center"
               border="0">
            <tbody>
            <tr>
                <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 7% 0px;">
                    <!--[if mso | IE]>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="vertical-align:top;width:600px;">
                    <![endif]-->
                    <div class="mj-column-per-100 outlook-group-fix"
                         style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
                        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                            <tr>
                                <td style="word-wrap:break-word;font-size:0px;padding:0px;" align="center">
                                    <div>
                                        <!--[if mso | IE]>
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0"
                                               align="undefined">
                                            <tr>
                                                <td>
                                        <![endif]-->
                                        <?php if (Yii::$app->params['social.facebook']): ?>
                                            <table role="presentation" cellpadding="0" cellspacing="0"
                                                   style="float:none;display:inline-table;" align="center" border="0">
                                                <tbody>
                                                <tr>
                                                    <td style="padding:0px 5px;vertical-align:middle;">
                                                        <table role="presentation" cellpadding="0" cellspacing="0"
                                                               style="background:none;border-radius:3px;width:18px;"
                                                               border="0">
                                                            <tbody>
                                                            <tr>
                                                                <td style="vertical-align:middle;width:18px;height:18px;">
                                                                    <a href="<?= Yii::$app->params['social.facebook'] ?>">
                                                                        <img alt="social-facebook" height="18"
                                                                             src="<?= Url::to('/img/mail/social-facebook.png', true) ?>"
                                                                             style="display:block;border-radius:3px;"
                                                                             width="18">
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                            <!--[if mso | IE]>
                                            </td>
                                            <td>
                                            <![endif]-->
                                        <?php endif; ?>
                                        <?php if (Yii::$app->params['social.youtube']): ?>
                                            <table role="presentation" cellpadding="0" cellspacing="0"
                                                   style="float:none;display:inline-table;" align="center" border="0">
                                                <tbody>
                                                <tr>
                                                    <td style="padding:0px 5px;vertical-align:middle;">
                                                        <table role="presentation" cellpadding="0" cellspacing="0"
                                                               style="background:none;border-radius:3px;width:18px;"
                                                               border="0">
                                                            <tbody>
                                                            <tr>
                                                                <td style="vertical-align:middle;width:18px;height:18px;">
                                                                    <a href="<?= Yii::$app->params['social.youtube'] ?>">
                                                                        <img alt="social-twitter" height="18"
                                                                             src="<?= Url::to('/img/mail/social-youtube.png', true) ?>"
                                                                             style="display:block;border-radius:3px;"
                                                                             width="18">
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                            <!--[if mso | IE]>
                                            </td>
                                            <td>
                                            <![endif]-->
                                        <?php endif; ?>
                                        <?php if (Yii::$app->params['social.twitter']): ?>
                                            <table role="presentation" cellpadding="0" cellspacing="0"
                                                   style="float:none;display:inline-table;" align="center" border="0">
                                                <tbody>
                                                <tr>
                                                    <td style="padding:0px 5px;vertical-align:middle;">
                                                        <table role="presentation" cellpadding="0" cellspacing="0"
                                                               style="background:none;border-radius:3px;width:18px;"
                                                               border="0">
                                                            <tbody>
                                                            <tr>
                                                                <td style="vertical-align:middle;width:18px;height:18px;">
                                                                    <a href="<?= Yii::$app->params['social.twitter'] ?>">
                                                                        <img alt="social-twitter" height="18"
                                                                             src="<?= Url::to('/img/mail/social-twitter.png', true) ?>"
                                                                             style="display:block;border-radius:3px;"
                                                                             width="18">
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                            <!--[if mso | IE]>
                                            </td>
                                            <td>
                                            <![endif]-->
                                        <?php endif; ?>
                                        <?php if (Yii::$app->params['social.instagram']): ?>
                                            <table role="presentation" cellpadding="0" cellspacing="0"
                                                   style="float:none;display:inline-table;" align="center" border="0">
                                                <tbody>
                                                <tr>
                                                    <td style="padding:0px 5px;vertical-align:middle;">
                                                        <table role="presentation" cellpadding="0" cellspacing="0"
                                                               style="background:none;border-radius:3px;width:18px;"
                                                               border="0">
                                                            <tbody>
                                                            <tr>
                                                                <td style="vertical-align:middle;width:18px;height:18px;">
                                                                    <a href="<?= Yii::$app->params['social.instagram'] ?>">
                                                                        <img alt="social-instagram" height="18"
                                                                             src="<?= Url::to('/img/mail/social-instagram.png', true) ?>"
                                                                             style="display:block;border-radius:3px;"
                                                                             width="18">
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                            <!--[if mso | IE]>
                                            </td>
                                            <td>
                                            <![endif]-->
                                        <?php endif; ?>
                                        <?php if (Yii::$app->params['social.github']): ?>
                                            <table role="presentation" cellpadding="0" cellspacing="0"
                                                   style="float:none;display:inline-table;" align="center" border="0">
                                                <tbody>
                                                <tr>
                                                    <td style="padding:0px 5px;vertical-align:middle;">
                                                        <table role="presentation" cellpadding="0" cellspacing="0"
                                                               style="background:none;border-radius:3px;width:18px;"
                                                               border="0">
                                                            <tbody>
                                                            <tr>
                                                                <td style="vertical-align:middle;width:18px;height:18px;">
                                                                    <a href="<?= Yii::$app->params['social.github'] ?>">
                                                                        <img alt="social-github" height="18"
                                                                             src="<?= Url::to('/img/mail/social-github.png', true) ?>"
                                                                             style="display:block;border-radius:3px;"
                                                                             width="18">
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        <?php endif; ?>
                                        <!--[if mso | IE]>
                                        </td></tr></table>
                                        <![endif]-->
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--[if mso | IE]>
                    </td></tr></table>
                    <![endif]-->
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    <!--[if mso | IE]>
    </td></tr></table>
    <![endif]-->
    <!--[if mso | IE]>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" align="center"
           style="width:600px;">
        <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
    <![endif]-->
    <div style="margin:0px auto;max-width:600px;">
        <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" align="center"
               border="0">
            <tbody>
            <tr>
                <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:20px 7% 30px;">
                    <!--[if mso | IE]>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="vertical-align:top;width:600px;">
                    <![endif]-->
                    <div class="mj-column-per-100 outlook-group-fix"
                         style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
                        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                            <tr>
                                <td style="word-wrap:break-word;font-size:0px;padding:0px;" align="center">
                                    <div style="cursor:auto;color:#b3aebb;font-family:Arial, sans-serif;font-size:12px;font-weight:400;line-height:1.3;text-align:center;">
                                        Copyright © <?= date('Y') ?> umjetnostudrvetu.ba, sva prava zadržana.
                                        <br><?= Yii::$app->params['support.email'] ?><br><br>
                                        <a href="https://umjetnostudrvetu.ba" class="link-outside"
                                           style="white-space: nowrap; color: inherit; text-decoration: underline; padding: 0 5px;">www.umjetnostudrvetu.ba</a>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--[if mso | IE]>
                    </td></tr></table>
                    <![endif]-->
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    <!--[if mso | IE]>
    </td></tr></table>
    <![endif]-->
</div>

<?php $this->endBody() ?>
</body>

</html>
<?php $this->endPage() ?>
