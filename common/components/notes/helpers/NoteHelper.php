<?php
/**
 * Aleksandar Panic <hola@2amigos.us>
 * Company: 2amigOS! <https://2amigos.us>
 */

namespace notes\helpers;

use Yii;
use yii\helpers\Html;
use yii\db\ActiveRecord;
use yii\helpers\ArrayHelper;

class NoteHelper
{
    public static function initGridNoteButton($pjaxId) {
        return function ($url, $model, $key) use ($pjaxId) {
            $options = [
                'data-grid-pjax-id' => $pjaxId
            ];

            return self::getNoteButton($model, $url, $options);
        };
    }

    public static function getNoteButton(ActiveRecord $model, $url, $options = [])
    {
        $options = ArrayHelper::merge([
            'id' => $model->getModelId(),
            'title' => Yii::t('yii', 'Note'),
            'aria-label' => Yii::t('yii', 'Note'),
            'data-pjax' => '0',
            'class' => 'btn btn-sm btn-icon-only rounded-circle btn-modal-control btn-note'
        ], $options);
        return Html::a('<i class="fal fa-comment-alt primary-color"></i>' . static::getNoteCount($model), $url, $options);
    }

    public static function getNoteCount(ActiveRecord $model)
    {
        $noteCount = $model->noteCount;

        return $noteCount ?
            "<span class='badge badge-info note-count'>{$noteCount}</span>" :
            '<span class="badge badge-info note-count" style="display: none;">0</span>';
    }

}