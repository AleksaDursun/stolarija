<?php

/* @var $this \yii\web\View */

/* @var $content string */

use yii\helpers\Html;
use yii\bootstrap4\Modal;
use backend\assets\AppAsset;
use common\components\flash\Toastr\ToastrFlash;

AppAsset::register($this);

?>

<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
    <link rel="manifest" href="/img/icons/site.webmanifest">
    <link rel="mask-icon" href="/img/icons/safari-pinned-tab.svg" color="#293241">
    <link rel="shortcut icon" href="/img/icons/favicon.ico">
    <meta name="msapplication-TileColor" content="#293241">
    <meta name="msapplication-config" content="/img/icons/browserconfig.xml">
    <meta name="theme-color" content="#293241">
</head>
<body>
<?php $this->beginBody() ?>

<div class="wrapper ">
<?= $this->render('_left_menu'); ?>

    <div class="main-panel">

        <?= $this->render('_header'); ?>

        <div class="content">
            <?= $content ?>
        </div>

    </div>
</div>

<?= ToastrFlash::widget(); ?>


<?= Modal::widget(['id' => 'main-modal', 'size' => Modal::SIZE_LARGE]); ?>

<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
