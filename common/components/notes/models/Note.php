<?php
/**
 * Igor Golub <hola@2amigos.us>
 * Company: 2amigOS! <https://2amigos.us>
 */

namespace notes\models;

use common\components\orm\ActiveRecord;
use common\helpers\ArrayHelper;
use Yii;
use common\models\File;
use common\models\User;
use yii\helpers\StringHelper;
use common\components\base\ActionLogHandler;
use common\components\base\NotificationHandler;
use common\components\base\interfaces\ILoggable;
use common\components\base\interfaces\INotifiable;
use common\components\base\traits\ObservableTrait;

/**
 * This is the model class for table "note".
 *
 * @property integer $id
 * @property string $model_name
 * @property integer $model_id
 * @property string $content
 * @property integer $created_by
 * @property integer $created_at
 * @property integer $updated_by
 * @property integer $updated_at
 * @property integer $is_deleted
 */
class Note extends ActiveRecord implements INotifiable, ILoggable
{
    const EVENT_INSERT = 'event_note_create';
    const EVENT_UPDATE = 'event_note_update';
    const EVENT_DELETE = 'event_note_delete';

    use ObservableTrait;

    public $noteFileIds;

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'note';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['model_id'], 'integer'],
            [['content'], 'string'],
            [['noteFileIds'], 'safe'],
            [['model_name'], 'string', 'max' => 255],
        ];
    }

    public function events()
    {
        return [
            self::EVENT_AFTER_INSERT => [
                new ActionLogHandler([
                    'model_id' => function () {
                        return $this->model_id;
                    },
                    'model_name' => function () {
                        return StringHelper::basename($this->model_name);
                    },
                    'title' => function () {
                        return strip_tags($this->content);
                    },
                    'action_type' => 'created note'
                ]),
                new NotificationHandler([
                    'title' => function () {
                        $title = Yii::t('app', 'Note added');

                        return $title;
                    },
                    'message' => function () {
                        $userName = ArrayHelper::getValue($this, 'createdBy.fullName', '');
                        $content = strip_tags($this->content);
                        $userLabel = Yii::t('app', 'User');
                        $message = Yii::t('app', 'left a message');

                        return "{$userLabel} <b>{$userName}</b> {$message} : <i>{$content}</i>";
                    },
                ])
            ],
            self::EVENT_AFTER_DELETE => [
                new ActionLogHandler([
                    'model_id' => function () {
                        return $this->model_id;
                    },
                    'model_name' => function () {
                        return StringHelper::basename($this->model_name);
                    },
                    'title' => function () {
                        return strip_tags($this->content);
                    },
                    'action_type' => 'removed note'
                ]),
                new NotificationHandler([
                    'title' => function () {
                        $title = Yii::t('app', 'Note edited');

                        return $title;
                    },
                    'message' => function () {
                        $userName = ArrayHelper::getValue($this, 'updatedBy.fullName', '');
                        $content = strip_tags($this->content);
                        $userLabel = Yii::t('app', 'User');
                        $message = Yii::t('app', 'edited message');

                        return "{$userLabel} <b>{$userName}</b> {$message} : <i>{$content}</i>";
                    },
                ])
            ],
            self::EVENT_AFTER_UPDATE => [
                new ActionLogHandler([
                    'model_id' => function () {
                        return $this->model_id;
                    },
                    'model_name' => function () {
                        return StringHelper::basename($this->model_name);
                    },
                    'title' => function () {
                        return strip_tags($this->content);
                    },
                    'action_type' => 'updated note'
                ]),
                new NotificationHandler([
                    'title' => function () {
                        $title = Yii::t('app', 'Note deleted');

                        return $title;
                    },
                    'message' => function () {
                        $userName = ArrayHelper::getValue($this, 'updatedBy.fullName', '');
                        $userLabel = Yii::t('app', 'User');
                        $message = Yii::t('app', 'deleted message');

                        return "{$userLabel} <b>{$userName}</b> {$message}";
                    },
                ])
            ]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'model_name' => 'Model Name',
            'model_id' => 'Model ID',
            'content' => 'Content',
        ];
    }

    public function getCreatedBy()
    {
        return $this->hasOne(User::class, ['id' => 'created_by']);
    }

    public function getUpdatedBy()
    {
        return $this->hasOne(User::class, ['id' => 'updated_by']);
    }

    public function getNoteFiles()
    {
        return $this->hasMany(NoteFile::class, ['note_id' => 'id']);
    }

    public function getFiles()
    {
        return $this->hasMany(File::class, ['id' => 'file_id'])->via('noteFiles');
    }

    public function afterSave($insert, $changedAttributes)
    {
        parent::afterSave($insert, $changedAttributes);

        if ($insert && !empty($this->noteFileIds)) {
            NoteFile::deleteAll(['note_id' => $this->id]);

            /** @var File $file */
            foreach ($this->noteFileIds as $fileId) {
                (new NoteFile(['note_id' => $this->id, 'file_id' => $fileId]))->save();
            }
        }
    }

    public function getNotificationReceivers($event)
    {
        $class = $this->model_name;
        $model = $class::findOne($this->model_id);

        return $model->getNotificationReceivers($event);
    }
}
