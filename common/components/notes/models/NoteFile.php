<?php
/**
 * Igor Golub <hola@2amigos.us>
 * Company: 2amigOS! <https://2amigos.us>
 */

namespace notes\models;


use common\components\orm\ActiveRecord;
use common\models\File;

/**
 * This is the model class for table "note_file".
 *
 * @property int $id
 * @property int $file_id
 * @property int $note_id
 * @property string $content
 * @property int $created_at
 * @property int $created_by
 * @property int $updated_at
 * @property int $updated_by
 * @property int $is_deleted
 *
 * @property File $file
 * @property Note $note
 */
class NoteFile extends ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'note_file';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['file_id', 'note_id', 'created_at', 'created_by', 'updated_at', 'updated_by', 'is_deleted'], 'integer'],
            [['content'], 'string'],
            [['file_id'], 'exist', 'skipOnError' => true, 'targetClass' => File::class, 'targetAttribute' => ['file_id' => 'id']],
            [['note_id'], 'exist', 'skipOnError' => true, 'targetClass' => Note::class, 'targetAttribute' => ['note_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'file_id' => 'File ID',
            'note_id' => 'Note ID',
            'content' => 'Content',
            'created_at' => 'Created At',
            'created_by' => 'Created By',
            'updated_at' => 'Updated At',
            'updated_by' => 'Updated By',
            'is_deleted' => 'Is Deleted',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getFile()
    {
        return $this->hasOne(File::class, ['id' => 'file_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getNote()
    {
        return $this->hasOne(Note::class, ['id' => 'note_id']);
    }
}