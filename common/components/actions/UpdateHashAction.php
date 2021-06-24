<?php

namespace common\components\actions;

use Yii;
use yii\web\Response;
use yii\db\BaseActiveRecord;
use yii\bootstrap\ActiveForm;
use common\helpers\FlashHelper;
use common\components\orm\ActiveRecord;

/**
 * Class UpdateAction
 *
 */
class UpdateHashAction extends UpdateAction
{
    /**
     * @inheritDoc
     */
    public function run($hash = null)
    {
        return parent::run($hash);
    }
}
