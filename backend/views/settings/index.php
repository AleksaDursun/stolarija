<?php

/** @var $model \common\models\SettingsForm */
/** @var \yii\web\View $this */

$title = Yii::t('app', 'Settings');
$subTitle = Yii::t('app', 'Application Settings');

/**
 * @var \backend\models\forms\PasswordChangeForm $passwordForm
 */

?>

<div class="header bg-sunspalato pb-6">
    <div class="container-fluid">
        <div class="header-body">
            <div class="row align-items-center py-4">
                <div class="col-7">
                    <h6 class="h2 d-inline-block mb-0"><?= $title; ?></h6>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="container-fluid mt--6">
    <div class="card">
        <div class="card-header">
            <div class="row">
                <div class="col-6">
                    <h3 class="mb-0"><?= $subTitle; ?></h3>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-sm-12">
                    <?= $this->render('_form', [
                        'model' => $model,
                    ]) ?>
                </div>
            </div>
        </div>
    </div>
</div>
