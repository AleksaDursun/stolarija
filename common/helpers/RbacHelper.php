<?php
/**
 * Nikola Jankovic <jannikola@gmail.com>
 */

namespace common\helpers;

use common\models\Team;
use common\models\User;
use Yii;

class RbacHelper
{
    const ROLE_ADMIN = 'admin';
    const ROLE_USER = 'user';

    const PERM_ADMIN = 'admin-permission';
    const PERM_USER = 'user-permission';


    public static function getRoles()
    {
        return [
            self::ROLE_ADMIN => 'Administrator',
            self::ROLE_USER => 'User'
        ];
    }

    public static function getPermissionList()
    {
        return [
            static::PERM_ADMIN => Yii::t('app', 'Administrator permission'),
            static::PERM_USER => Yii::t('app', 'User permission'),
        ];
    }

    public static function getAdminIds()
    {
        return Yii::$app->authManager->getUserIdsByRole(static::ROLE_ADMIN);
    }

    public static function getColorForRole($role)
    {
        switch ($role) {
            case self::ROLE_ADMIN:
                return 'success';
            case self::ROLE_USER:
                return 'info';
            default:
                return 'default';
        }
    }


}