<?php
/**
 * @var $this \yii\base\View
 * @var $context \notes\widgets\notes\RichNote
 */

use yii\widgets\ListView;
use yii\helpers\Html;

$context = $this->context; ?>


<div class="chat-conversation">
    <?php if (!empty($context->noteListProvider)): ?>
        <?= Html::hiddenInput('notes_count', $context->noteListProvider->getTotalCount(), ['id' => 'noteListCount']) ?>
        <?= ListView::widget([
            'dataProvider' => $context->noteListProvider,
            'emptyText' => 'No notes found.',
            'itemView' => '_note_item',
            'summary' => '',
            'options' => ['tag' => 'ul', 'class' => 'conversation-list'],
            'itemOptions' => ['tag' => 'li', 'class' => 'clearfix'],
            'pager' => [
                'prevPageLabel' => false,
                'nextPageLabel' => false,
                'pageCssClass' => 'page-item',
                'firstPageCssClass' => 'page-item',
                'lastPageCssClass' => 'page-item',
                'nextPageCssClass' => 'page-item',
                'prevPageCssClass' => 'page-item',
                'options' => [
                    'class' => 'pagination justify-content-end mb-0',
                ],
                'linkOptions' => ['class' => 'page-link'],
            ],
        ]); ?>
    <?php endif; ?>
</div>
