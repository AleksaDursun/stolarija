<?php
/**
 * Aleksandar Panic <hola@2amigos.us>
 * Company: 2amigOS! <https://2amigos.us>
 **/

use common\helpers\IconHelper;
use yii\helpers\Url;

?>

<?php foreach ($files as $file): ?>
    <div class="attachment">
        <a target="_blank" href="<?= Url::to(['/file/download', 'id' => $file->id]); ?>" data-pjax="0">
            <i class="<?= IconHelper::getFaByMimeType($file->mime_type) ?>"></i> <?= $file->original_name ?>
        </a>
    </div>
<?php endforeach; ?>