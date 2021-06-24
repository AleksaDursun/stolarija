<?php
/*
 * Nikola Kukric <info@singularity-solution.com>
 * Company: Singularity Solution <https://singularity-solution.com>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace common\widgets\breadcrumbs;


use yii\base\Widget;

class Breadcrumbs extends Widget
{
    public $items = [];

    public $currentItem;

    public function run()
    {
        return $this->render('breadcrumbs', [
            'items' => $this->items,
            'currentItem' => $this->currentItem,
        ]);
    }
}