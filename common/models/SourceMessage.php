<?php
/**
 * Nikola Jankovic  <hello@singularity.is>
 * Company: Singularity Solution <https://singularity.is>
 */

namespace common\models;


use common\components\orm\ActiveRecord;
use Yii;

/**
 * This is the model class for table "source_message".
 *
 * @property int $id
 * @property string $category
 * @property string $message
 */

class SourceMessage extends ActiveRecord
{
    public static function tableName()
    {
        return 'source_message';
    }

    public function rules()
    {
        return [
            [['category'], 'string', 'max' => 255],
            [['category'], 'default', 'value' => 'app'],
            [['message'], 'string'],
        ];
    }

    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'category' => Yii::t('app', 'Category'),
            'message' => Yii::t('app', 'Message'),
            'translation_message' => Yii::t('app', 'Translation message'),
        ];
    }

    public function getMessage()
    {
        $this->hasOne(Message::class, ['id' => 'id']);
    }

}