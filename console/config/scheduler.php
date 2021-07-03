<?php
/*
 * Nikola Kukric <info@singularity-solution.com>
 * Company: Singularity Solution <https://singularity-solution.com>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

use omnilight\scheduling\Schedule;

/** @var $schedule Schedule */

// run jobs from queue
$schedule->command('queue/run')->everyMinute();

