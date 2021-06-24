<?php
/*
 * Nikola Kukric <info@singularity.is>
 * Company: Singularity Solution <https://singularity.is>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace api\models;

class Subscriber extends \common\models\Subscriber
{
    public function fields()
    {
        return [
            'id',
            'email'
        ];
    }


}