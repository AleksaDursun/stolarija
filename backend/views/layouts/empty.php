<?php
/*
 * Nikola Kukrić
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */
/* @var $this \yii\web\View */

/* @var $content string */

use yii\helpers\Html;
use backend\assets\AppAsset;

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
    <link href="/img/brand/favicon-sunspalato.png" rel="icon" type="image/png">
</head>
<body>
<?php $this->beginBody() ?>

<div class="main-content" id="panel">
    <?= $content ?>
</div>

<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
