<?php

/*
 * Nikola Kukric <info@singularity.is>
 * Company: Singularity Solution <https://singularity.is>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace api\versions\v1;

use \yii\base\Module as BaseModule;
use Yii;

class Module extends BaseModule
{
    public $controllerNamespace = 'api\versions\v1\controllers';

    public function init()
    {
        parent::init();
        Yii::$app->user->enableSession = false;
    }
}
