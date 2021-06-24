<?php
/**
 * Aleksandar Panic <hola@2amigos.us>
 * Company: 2amigOS! <https://2amigos.us>
 */

namespace notes\components\actions;


use common\components\actions\Action;

class NoteAction extends Action
{
    public $noteTypeClass;
    public $viewFile;

    public $uploadFileParam = 'file';
    public $uploadFileIdAttribute = 'noteFileIds';
}