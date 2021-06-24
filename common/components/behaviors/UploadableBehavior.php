<?php
/*
 * (c) 2amigOS! <http://2amigos.us/>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace common\components\behaviors;

use common\models\File;
use common\models\Image;
use yii\base\Behavior;
use yii\web\UploadedFile;
use yii\db\BaseActiveRecord;

class UploadableBehavior extends Behavior
{
    public $fileKey = 'id';
    public $imageKey = 'image_id';

    public $fileAttributes = [];
    public $imageAttributes = [];

    /**
     * @inheritdoc
     */
    public function events()
    {
        return [
            BaseActiveRecord::EVENT_BEFORE_VALIDATE => 'processUploadedFiles'
        ];
    }

    /**
     * @inheritdoc
     */
    public function processUploadedFiles()
    {
        foreach ($this->fileAttributes as $idKey => $uploadKey) {
            $this->processUploadedObject(new File(['scenario' => File::SCENARIO_FILE_UPLOAD]), $idKey, $uploadKey);
        }

        foreach ($this->imageAttributes as $idKey => $uploadKey) {
            $this->processUploadedObject(new File(['scenario' => File::SCENARIO_FILE_UPLOAD]), $idKey, $uploadKey, true);
        }
    }

    protected function processUploadedObject($object, $idKey, $uploadKey, $isImage = false)
    {
        if ($this->owner->{$uploadKey} instanceof UploadedFile) {
            $object->file = $this->owner->{$uploadKey};
        } else {
            $object->file = UploadedFile::getInstance($this->owner, $uploadKey);
        }

        $this->owner->{$uploadKey} = $object->file;

        if (empty($object->file)) {
            return;
        }

        if ($object->save()) {
            $this->owner->{$idKey} = $isImage ? $object->{$this->imageKey} : $object->{$this->fileKey};
        } else{
            $this->owner->addError($uploadKey, 'There was an error when trying to save ' . get_class($object));
        }
    }
}