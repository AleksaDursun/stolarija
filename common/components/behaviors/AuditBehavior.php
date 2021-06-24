<?php

namespace common\components\behaviors;

use common\components\orm\ActiveRecord;
use Yii;
use yii\base\Behavior;
use yii\base\Exception;
use yii\db\BaseActiveRecord;
use common\models\AuditLog;
use yii\helpers\Json;

class AuditBehavior extends Behavior
{
    const ACTION_FIND = 'find';
    const ACTION_INSERT = 'insert';
    const ACTION_UPDATE = 'update';
    const ACTION_DELETE = 'delete';

    public $ignoredAttributes = [
        'id', 'created_at', 'updated_at'
    ];

    private $_ownerOldAttributes = [];

    public function events()
    {
        return [
            BaseActiveRecord::EVENT_AFTER_FIND => 'populateAttributes',
            BaseActiveRecord::EVENT_AFTER_INSERT => 'leaveInsertTrail',
            BaseActiveRecord::EVENT_AFTER_UPDATE => 'leaveUpdateTrail',
            BaseActiveRecord::EVENT_AFTER_DELETE => 'leaveDeleteTrail',
        ];
    }

    public function populateAttributes()
    {
        $this->setOwnerOldAttributes($this->owner->getAttributes());
    }

    public function leaveInsertTrail()
    {
        $this->leaveTrail(self::ACTION_INSERT);
    }

    public function leaveUpdateTrail()
    {
        $this->leaveTrail(self::ACTION_UPDATE);
    }

    public function leaveDeleteTrail()
    {
        $this->leaveTrail(self::ACTION_DELETE);
    }

    public function leaveTrail($action)
    {
        /**
         * @var $owner ActiveRecord
         */
        $owner = $this->owner;
        $oldAttributes = $this->getOwnerOldAttributes();
        $newAttributes = $owner->getAttributes();

        foreach ($this->ignoredAttributes as $ignoredAttribute) {
            if (array_key_exists($ignoredAttribute, $oldAttributes)) {
                unset($oldAttributes[$ignoredAttribute]);
            }

            if (array_key_exists($ignoredAttribute, $newAttributes)) {
                unset($newAttributes[$ignoredAttribute]);
            }
        }

        foreach ($newAttributes as $field => $newValue) {
            $oldValue = isset($oldAttributes[$field]) ? $oldAttributes[$field] : null;
            if ($newValue != $oldValue) {
                $auditLog = new AuditLog();
                $auditLog->field = $field;
                $auditLog->action = $action;
                $auditLog->property_id = $this->getPropertyId();
                $auditLog->parent_id = $this->getBucket($action)->id;
                $auditLog->model_id = $this->getNormalizedPk();
                $auditLog->model_name = $owner->getBaseName();
                $auditLog->old_value = $oldValue;
                $auditLog->new_value = $newValue;

                if (!$auditLog->save()) {
                    throw new Exception('Unable to save changelog!'. implode('<br>', $auditLog->getFirstErrors()));
                }
            }
        }

        $this->emptyBucket();
    }

    private $_bucket = null;

    /**
     * @param $action
     * @return AuditLog
     * @throws Exception
     */
    protected function getBucket($action)
    {
        if (isset($this->_bucket[$action])) {
            return $this->_bucket[$action];
        }

        return $this->_bucket[$action] = $this->createBucket($action);
    }
    /**
     * @param $action
     * @return AuditLog
     * @throws Exception
     */
    protected function createBucket($action)
    {
        /**
         * @var $owner ActiveRecord
         */
        $owner = $this->owner;
        $auditLog = new AuditLog();
        $auditLog->action = $action;
        $auditLog->property_id = $this->getPropertyId();
        $auditLog->model_id = $this->getNormalizedPk();
        $auditLog->model_name = $owner->getBaseName();

        if (!$auditLog->save()) {
            throw new Exception('Unable to save changelog bucket!');
        }

        return $auditLog;
    }

    protected function emptyBucket()
    {
        $this->_bucket = null;
    }

    protected function getNormalizedPk()
    {
        /**
         * @var $owner ActiveRecord
         */
        $owner = $this->owner;
        $pk = $owner->getPrimaryKey();
        return is_array($pk) ? Json::encode($pk) : $pk;
    }

    protected function getPropertyId()
    {
        /**
         * @var $owner ActiveRecord
         */
        $owner = $this->owner;
        return $owner->hasAttribute('property_id') ? $owner->property_id : null;
    }

    protected function getOwnerOldAttributes()
    {
        return $this->_ownerOldAttributes;
    }

    protected function setOwnerOldAttributes($attributes)
    {
        $this->_ownerOldAttributes = $attributes;
    }
}
