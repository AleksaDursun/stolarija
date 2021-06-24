<?php
/**
 * /**
 * Aleksandar Panic <hola@2amigos.us>
 * Company: 2amigOS! <https://2amigos.us>
 *
 *
 * @var $model \common\modules\notes\models\Note
 */

use common\helpers\ArrayHelper;
use common\helpers\IconHelper;
use common\helpers\TimeHelper;
use common\widgets\popover\Popover;
use common\components\image\ImageSpecification;
use yii\helpers\Html;
use yii\helpers\Url;

$userName = ArrayHelper::getValue($model, 'createdBy.fullName', 'Unknown');

$context = $this->context;

$isOdd = $context->getIsOdd($model, $widget->itemOptions['class']);
$widget->itemOptions['class'] = !$isOdd ? 'clearfix' : 'clearfix odd';
$buttonsClass = $isOdd ? 'hidden pull-left' : 'hidden pull-right';
?>

    <div class="chat-avatar">
        <?= Html::img($model->createdBy->getPhotoUrl(ImageSpecification::THUMB_SMALL),
            [
                'width' => '40',
                'class' => 'img-responsive',
                'alt' => $userName
            ]
        ); ?>
    </div>
    <div class="conversation-text">
        <div class="ctext-wrap">
            <span>
                <i class="fal fa-user d-inline-block mr-1"></i><?= $userName ?><i class="fal fa-clock d-inline-block ml-2"></i>
                <?= TimeHelper::format($model->created_at, TimeHelper::DATETIME_FORMAT); ?>
                <?php if (Yii::$app->user->isAdmin() || $model->created_by == Yii::$app->user->id): ?>
                    <?= Html::a('<span class="fal fa-times"></span>', '#', [
                        'class' => 'd-none delete-note ' . $buttonsClass,
                        'data-id' => $model->id,
                        'data-delete-url' => Url::to([$context->deleteAction, 'id' => $model->id])
                    ]) ?>
                    <?= Html::a('<span class="fal fa-pencil"></span>', '#', [
                        'class' => 'd-none update-note-btn ' . $buttonsClass,
                        'data-id' => $model->id,
                        'data-update-url' => Url::to([$context->updateAction, 'id' => $model->id])
                    ]) ?>
                <?php endif ?>
            </span>

            <div class="text"><?= $model->content ?></div>

            <?php if (!empty($model->files)): ?>
                <div class="note-files m-t-10">
                    <?php foreach ($model->files as $file): ?>
                        <span class="thumb-container img-thumbnail m-0">
                            <span class="thumb-preview loader-bg"
                                  title="<?= $file->original_name . ' | ' . Yii::$app->formatter->asShortSize($file->size, 2) ?>">
                                <?= Html::a(
                                    empty($file->thumbImage) ?
                                        IconHelper::getByMimeType($file->mime_type, ['class' => 'icon file']) :
                                        Html::img($file->thumbImage->getImageUrl(), ['class' => 'img-responsive']),
                                    ['/file/download', 'id' => $file->id],
                                    ['target' => '_blank', 'data-pjax' => 0]
                                ) ?>
                            </span>
                        </span>
                    <?php endforeach; ?>
                </div>
            <?php endif ?>
        </div>
    </div>


<?php $context->previousItem = $model;