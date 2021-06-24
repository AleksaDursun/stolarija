<?php

/* @var $this yii\web\View */
/* @var $name string */
/* @var $message string */
/* @var $exception Exception */

use yii\helpers\Html;
use yii\web\HttpException;

$this->title = $name;
$code = $exception instanceof HttpException ? $exception->statusCode : $exception->getCode();

?>

<div class="container mt--8 pb-5">
    <!-- Table -->
    <div class="row justify-content-center">
        <div class="col-lg-6 col-md-8">
            <div class="text-center">
                <div class="site-error">

                    <h1 class="error-code"><?= $code ?></h1>

                    <h2><?= Html::encode($this->title) ?></h2>

                    <p class="mt-4 text-strong">
                        <?= nl2br(Html::encode($message)) ?>
                    </p>

                    <p>
                        The above error occurred while the Web server was processing your request.<br>
                        Please contact us if you think this is a server error. Thank you.
                    </p>

                    <?= Html::a('Go home', ['/'], ['class' => 'btn btn-primary']) ?>

                </div>
            </div>
        </div>
    </div>
</div>
