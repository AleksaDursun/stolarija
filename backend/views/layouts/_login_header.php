<?php
/*
 * Nikola Kukrić
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

use yii\helpers\Html; ?>

<nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top text-white">
    <div class="container">
        <div class="navbar-wrapper">
            <a class="navbar-brand" href="https://humandiplomacy.org">
                <?= Html::img( ['/img/logo/logo.png'], [
                    'alt' => Yii::$app->name,
                    'height' => '50px',
                ])?>
            </a>
        </div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index"
                aria-expanded="false" aria-label="Toggle navigation">
            <span class="sr-only">Toggle navigation</span>
            <span class="navbar-toggler-icon icon-bar"></span>
            <span class="navbar-toggler-icon icon-bar"></span>
            <span class="navbar-toggler-icon icon-bar"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a href="/" class="nav-link">
                        <i class="material-icons">dashboard</i> Dashboard
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>
