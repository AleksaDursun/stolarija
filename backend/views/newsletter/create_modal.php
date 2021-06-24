<?php
/*
 * Nikola Kukric <info@singularity.is>
 * Company: Singularity Solution <https://singularity.is>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

use common\widgets\modal\ModalContent;

?>

<div>

    <?php ModalContent::begin([
        'title' => 'Dodavanje',
    ]) ?>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

    <?php ModalContent::end(); ?>

</div>
