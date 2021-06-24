<?php
/*
 * Nikola Kukric <info@singularity.is>
 * Company: Singularity Solution <https://singularity.is>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace common\components\behaviors;


use common\components\orm\ActiveRecord;
use common\helpers\ArrayHelper;
use Exception;
use Yii;
use yii\base\Behavior;
use yii\db\BaseActiveRecord;
use yii\rbac\DbManager;
use yii\rbac\Role;

/**
 * Class RbacBehavior
 * @package common\components\behaviors
 *
 * @property ActiveRecord $owner
 * @property string $role
 *
 */
class RbacBehavior extends Behavior
{
    public $role;

    /**
     * @inheritdoc
     */
    public function events()
    {
        return [
            BaseActiveRecord::EVENT_AFTER_FIND => 'initializeRole',
            BaseActiveRecord::EVENT_AFTER_INSERT => 'assignRole',
            BaseActiveRecord::EVENT_AFTER_UPDATE => 'assignRole'
        ];
    }

    public function initializeRole()
    {
        $this->role = ArrayHelper::getValue($this->getRole(), 'name');
        $oldAttributes = $this->owner->getOldAttributes();
        $oldAttributes['role'] = $this->role;

        $this->owner->setOldAttributes($oldAttributes);
    }

    public function getRole()
    {
        if (!empty($this->role)) {
            return $this->role;
        }

        $roles = Yii::$app->getAuthManager()->getRolesByUser($this->owner->id);
        
        if (!$this->owner->isNewRecord && count($roles) > 1) {
            $count = count($roles);

            throw new Exception("Invalid number of roles assigned to user({$count})");
        }

        return $roles ? array_pop($roles) : '';
    }

    public function assignRole()
    {
        if (empty($this->role)) {
            return true;
        }

        /**
         * @var DbManager $auth
         * @var Role $role
         */
        $auth = Yii::$app->getAuthManager();

        $role = $auth->getRole($this->role);

        if (empty($role)) {
            throw new Exception('Could not assign non existing role.');
        }

        if ($auth->getAssignment($role->name, $this->owner->id)) {
            return $role;
        }

        foreach ($auth->getRoles() as $item) {
            $auth->revoke($item, $this->owner->id);
        }

        return $auth->assign($role, $this->owner->id);
    }
}