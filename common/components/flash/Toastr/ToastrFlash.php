<?php
/**
 * by Borisa Eric <borisa123@hotmail.com>
 * Company: 2amigOS!
 *
 **/

namespace common\components\flash\Toastr;

use common\components\flash\FlashBaseWidget;

/**
 * ToastrFlash widget renders a message from flash component. All flash messages are displayed
 * in the sequence they were assigned using methods from flash component.
 * You can set message as following:
 *
 * ```php
 * Yii::$app->flash->success('This is the message');
 * Yii::$app->flash->error('This is the message');
 * Yii::$app->flash->info('This is the message');
 * Yii::$app->flash->warning('This is the message');
 * ```
 *
 */
class ToastrFlash extends FlashBaseWidget
{
    protected function setJs($type, $message) {
        $this->js .= "toastr.{$type}('{$message}');";
    }

    protected function setClientOptionsJs($clientOptionsJson)
    {
        $this->clientOptionsJs = "toastr.options = {$clientOptionsJson};";
    }

    protected function registerAsset()
    {
//        ToastrAsset::register($this->getView());
    }
}
