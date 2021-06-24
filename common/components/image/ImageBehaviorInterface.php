<?php
/**
 * Date: 12/11/2015
 * Time: 6:53 PM
 * Author: Igor Golub <goolub.igor@gmail.com>
 */

namespace common\components\image;


interface ImageBehaviorInterface
{
    /**
     * Resize image
     * @param $width
     * @param $height
     * @param bool $outbound
     */
    public function resize($width, $height, $outbound = false);

    /**
     * Crop image
     * @param $x
     * @param $y
     * @param $width
     * @param $height
     * @param string $extension
     */
    public function crop($x, $y, $width, $height, $extension = '');

    /**
     * Rotate image
     * @param $angle
     */
    public function rotate($angle);
}