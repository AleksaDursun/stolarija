<?php
/*
 * Nikola Kukrić
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

use common\components\image\ImageSpecification;
use common\helpers\RbacHelper;
use common\models\User;
use yii\helpers\Html;
use yii\widgets\Menu;

/**
 * @var User $user
 * @var WebUser $webUser
 */
$webUser = Yii::$app->user;

$user = Yii::$app->user->identity;


$isAdministration = in_array(Yii::$app->controller->id, ['user', 'email-log', 'push-notification', 'apple-redeem-code', 'location', 'group']);
$isSubscribe= in_array(Yii::$app->controller->id, ['team', 'advisory-board']);

$showAdministration = $isAdministration ? 'show' : '';
$showSubscribers  = $isSubscribe ? 'show' : '';

?>


<div class="sidebar" data-color="rose" data-background-color="black">
    <div class="logo text-center">
        <a href="/" class="simple-text logo-normal">
            <?= Html::img(['/img/logo/logo.png'], ['height' => 75]) ?>
        </a>
    </div>
    <div class="sidebar-wrapper">
        <div class="user">
            <div class="photo">
                <?= Html::img($user->getPhotoUrl(ImageSpecification::THUMB_SMALL))?>
            </div>
            <div class="user-info">
              <a href="javascript:void(0)" class="username">
                  <span>
                      <?= $user->getFullName() ?>
                  </span>
              </a>
            </div>
        </div>

        <?= Menu::widget([
            'encodeLabels' => false,
            'options' => ['class' => 'nav'],
            'itemOptions' => ['class' => 'nav-item'],
            'linkTemplate' => '<a href="{url}" class="nav-link">{label}</a>',
            'activateParents' => true,
            'activateItems' => true,
            'items' => [
                [
                    'label' => '<i class="fal fa-mobile-android"></i><p>Proizvodi</p>',
                    'url' => ['/product/index']
                ],
                [
                    'label' => '<i class="fal fa-tags"></i><p>Kategorije</p>',
                    'url' => ['/category/index']
                ],
                [
                    'label' => '<i class="fal fa-shopping-cart"></i><p>Narudžbe</p>',
                    'url' => ['/order/index']
                ],
                [
                    'label' => '<i class="fal fa-user-chart"></i><p>Preplatnici<b class="caret"></b></p>',
                    'template' => '<a class="nav-link" href="#navbar-subscribers" data-toggle="collapse" aria-controls="navbar-subscribers">{label}</a>',
                    'submenuTemplate' => "<div class='collapse {$showSubscribers}' id='navbar-subscribers'><ul class='nav'>{items}</ul></div>",
                    'items' => [
                        [
                            'label' => '<i class="fal fa-newspaper"></i><p>Newsletters</p>',
                            'url' => ['/newsletter/index']
                        ],
                        [
                            'label' => '<i class="fal fa-user-friends"></i><p>Lista preplatnika</p>',
                            'url' => ['/subscriber/index']
                        ],
                    ],
                ],
                [
                    'label' => '<i class="fal fa-cogs"></i><p>Administration<b class="caret"></b></p>',
                    'template' => '<a class="nav-link" href="#navbar-administration" data-toggle="collapse" aria-controls="navbar-administration">{label}</a>',
                    'submenuTemplate' => "<div class='collapse {$showAdministration}' id='navbar-administration'><ul class='nav'>{items}</ul></div>",
                    'visible' => $webUser->can(RbacHelper::PERM_ADMIN),
                    'items' => [
                        [
                            'label' => '<i class="fal fa-users"></i><p>Users</p>',
                            'url' => ['/user/index'],
                            'visible' => $webUser->can(RbacHelper::PERM_ADMIN)
                        ],
                        [
                            'label' => '<i class="fal fa-mailbox"></i><p>Emails Log</p>',
                            'url' => ['/email-log/index'],
                            'visible' => $webUser->can(RbacHelper::PERM_ADMIN)
                        ],
                    ],
                ],
            ],
        ]); ?>
    </div>
</div>
