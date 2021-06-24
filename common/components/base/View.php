<?php
/**
 * Nikola Kukric <hola@2amigos.us>
 * Company: 2amigOS! <https://2amigos.us>.
 */

namespace common\components\base;


class View extends \yii\web\View
{
    public function isViewExists($path, $context = null)
    {

        $viewPath = $this->findViewFile($path, $context);

        return file_exists($viewPath) && is_readable($viewPath);
    }

}