<?php
/**
 * Igor Golub <hola@2amigos.us>
 * Company: 2amigOS! <https://2amigos.us>
 */

namespace notes\components\traits;

use notes\models\Note;
use yii\db\ActiveQuery;
use yii\helpers\Inflector;

trait NoteTrait
{
    public function getNoteCount()
    {
        /** @var ActiveQuery $noteQuery */
        $noteQuery = $this->hasOne(Note::class, ['model_id' => 'id'])
            ->andWhere(['model_name' => get_class($this)]);

        return $noteQuery->count();
    }

    public function getNoteUrl()
    {
        return ['/' . Inflector::camel2id($this->formName()) . '/notes', 'id' => $this->primaryKey];
    }

    public function getModelId()
    {
        return Inflector::camel2id($this->formName()) . '-' . $this->primaryKey;
    }
}