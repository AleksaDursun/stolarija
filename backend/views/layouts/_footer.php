<?php
/*
 * Nikola Kukrić
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */
/**
 * @var bool $isFullWidth
 */

?>


<footer class="footer">
    <div class="<?= $isFullWidth ? 'container-fluid' : 'container' ?>">
        <nav class="float-left">
            <ul>
                <li>
                    <a href="/">
                        About Us
                    </a>
                </li>
                <li>
                    <a href="/">
                        Services
                    </a>
                </li>

            </ul>
        </nav>
        <div class="copyright float-right">
            &copy; <?= date('Y') ?>, made with <i class="fal fa-heart"></i> by
            <a href="https://ba.linkedin.com/in/nikola-kukric-4b236599" target="_blank">Nikola Kukrić</a> for a better future.
        </div>
    </div>
</footer>