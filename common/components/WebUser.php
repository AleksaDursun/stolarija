<?php
/*
 * Nikola Kukric <info@singularity.is>
 * Company: Singularity Solution <https://singularity.is>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace common\components;

use common\helpers\ArrayHelper;
use common\helpers\RbacHelper;
use common\models\Property;
use common\models\TeamProperty;
use common\models\TeamUser;
use common\models\User;
use Yii;

/**
 * Class WebUser
 * @package common\components
 *
 * @property User $identity
 */
class WebUser extends \yii\web\User
{

    public function getFullName()
    {
        return ArrayHelper::getValue($this, 'identity.fullName');
    }

    public function isAdmin()
    {
        return $this->can(RbacHelper::ROLE_ADMIN);
    }
}