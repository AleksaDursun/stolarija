<?php
/**
 * Created by PhpStorm.
 * User: Nikola Kukric <nikola@2amigos.us>
 * Date: 12/1/2015
 * Time: 01:38 AM
 */

namespace common\components\image;

use yii\base\Exception;

class ImageSpecification
{
    private $width;
    private $height;
    private $forceSize = false;

    private $croppedWidth = null;
    private $croppedHeight = null;
    private $croppedX = null;
    private $croppedY = null;
    private $rotate = null;

    const PARAM_WIDTH = 'w';
    const PARAM_HEIGHT = 'h';
    const PARAM_ROTATE = 'r';
    const PARAM_FORCE_SIZE = 'fs';
    const PARAM_CROPPED_Y = 'cy';
    const PARAM_CROPPED_X = 'cx';
    const PARAM_CROPPED_HEIGHT = 'ch';
    const PARAM_CROPPED_WIDTH = 'cw';

    const THUMB_EXTRA_LARGE = 'w1200_h1200';
    const THUMB_LARGE = 'w200_h200';
    const THUMB_STANDARD = 'w100_h100';
    const THUMB_SMALL = 'w50_h50';
    const THUMB_LARGE_SQUARED = 'w200_h200_fs1';

    const LANDSCAPE = 'landscape';
    const PORTRAIT = 'portrait';

    public function __construct($spec = null)
    {
        if (!empty($spec)) {
            $this->setSpec($spec);
        }
    }

    public function setSpec($spec)
    {
        if (is_array($spec)) {
            $this->initFromArray($spec);
        } else if (is_string($spec)) {
            $this->tryParsingSpecKey($spec);
        } else if ($spec instanceof self) {
            $this->initFromOtherSpecObject($spec);
        } else {
            throw new ImageSpecificationException();
        }
    }

    public function setDimensions($width, $height)
    {
        $this->width = (int)$width;
        $this->height = (int)$height;
    }

    public function setCropParams($cropWidth, $cropHeight, $x, $y)
    {
        $this->croppedWidth = (int)$cropWidth;
        $this->croppedHeight = (int)$cropHeight;
        $this->croppedX = (int)$x;
        $this->croppedY = (int)$y;
    }

    private function initFromOtherSpecObject(ImageSpecification $spec)
    {
        $this->width = $spec->width;
        $this->height = $spec->height;
        $this->forceSize = $spec->forceSize;

        $this->croppedWidth = $spec->croppedWidth;
        $this->croppedHeight = $spec->croppedHeight;
        $this->croppedX = $spec->croppedX;
        $this->croppedY = $spec->croppedY;
        $this->rotate = $spec->rotate;
    }

    private function initFromArray(array $spec)
    {
        if (empty($spec['width']) && empty($spec['height'])) {
            throw new ImageSpecificationParsingException();
        }

        if (!empty($spec['width'])) {
            $this->width = (int)$spec['width'];
        }

        if (!empty($spec['height'])) {
            $this->height = (int)$spec['height'];
        }

        if (!empty($spec['rotate'])) {
            $this->rotate = (int)$spec['rotate'];
        }

        if (!empty($spec['forceSize'])) {
            $this->forceSize = (bool)$spec['forceSize'];
        }
    }

    private function tryParsingSpecKey($spec)
    {
        $params = explode('_', $spec);
        $this->trySettingWidth($params);
        $this->trySettingHeight($params);
        $this->trySettingCropParams($params);
        $this->trySettingRotateParams($params);
        $this->trySettingForceSizeParams($params);

    }

    private function trySettingWidth($params)
    {
        foreach ($params as $p) {
            if ($this->paramStartsWith($p, self::PARAM_WIDTH)) {
                $this->width = (int)substr($p, strlen(self::PARAM_WIDTH));
                return;
            }
        }
    }

    private function trySettingHeight($params)
    {
        foreach ($params as $p) {
            if ($this->paramStartsWith($p, self::PARAM_HEIGHT)) {
                $this->height = (int)substr($p, strlen(self::PARAM_HEIGHT));
                return;
            }
        }
    }

    private function trySettingRotateParams($params)
    {
        foreach ($params as $p) {
            if ($this->paramStartsWith($p, self::PARAM_ROTATE)) {
                $this->rotate = (int)substr($p, strlen(self::PARAM_ROTATE));
                return;
            }
        }
    }

    private function trySettingForceSizeParams($params)
    {
        foreach ($params as $p) {
            if ($this->paramStartsWith($p, self::PARAM_FORCE_SIZE)) {
                $this->forceSize = (bool)substr($p, strlen(self::PARAM_FORCE_SIZE));
                return;
            }
        }
    }

    private function trySettingCropParams($params)
    {
        foreach ($params as $p) {
            if ($this->paramStartsWith($p, self::PARAM_CROPPED_WIDTH)) {
                $this->croppedWidth = (int)substr($p, strlen(self::PARAM_CROPPED_WIDTH));
            }
        }

        foreach ($params as $p) {
            if ($this->paramStartsWith($p, self::PARAM_CROPPED_HEIGHT)) {
                $this->croppedHeight = (int)substr($p, strlen(self::PARAM_CROPPED_HEIGHT));
            }
        }

        foreach ($params as $p) {
            if ($this->paramStartsWith($p, self::PARAM_CROPPED_X)) {
                $this->croppedX = (int)substr($p, strlen(self::PARAM_CROPPED_X));
            }
        }

        foreach ($params as $p) {
            if ($this->paramStartsWith($p, self::PARAM_CROPPED_Y)) {
                $this->croppedY = (int)substr($p, strlen(self::PARAM_CROPPED_Y));
            }
        }
    }

    public function isEvenSize()
    {
        return ($this->width == $this->height);
    }

    public function isLandscape()
    {
        return $this->width > $this->height;
    }

    public function getKey()
    {
        $specs = array();

        if (!empty($this->width)) {
            $specs[] = self::PARAM_WIDTH . $this->width;
        }
        if (!empty($this->height)) {
            $specs[] = self::PARAM_HEIGHT . $this->height;
        }

        if (!empty($this->croppedWidth) || $this->croppedWidth === 0) {
            $specs[] = self::PARAM_CROPPED_WIDTH . $this->croppedWidth;
        }

        if (!empty($this->croppedHeight) || $this->croppedHeight === 0) {
            $specs[] = self::PARAM_CROPPED_HEIGHT . $this->croppedHeight;
        }

        if (!empty($this->croppedX) || $this->croppedX === 0) {
            $specs[] = self::PARAM_CROPPED_X . $this->croppedX;
        }

        if (!empty($this->croppedY) || $this->croppedY === 0) {
            $specs[] = self::PARAM_CROPPED_Y . $this->croppedY;
        }

        if (!empty($this->rotate) || $this->rotate === 0) {
            $specs[] = self::PARAM_ROTATE . $this->rotate;
        }

        if ($this->forceSize) {
            $specs[] = self::PARAM_FORCE_SIZE . ((int) $this->forceSize);
        }

        return implode('_', $specs);
    }

    public function hasResizeParams()
    {
        return ($this->width !== null) || ($this->height !== null);
    }

    public function getWidth()
    {
        return $this->width;
    }

    public function getHeight()
    {
        return $this->height;
    }

    public function getShouldForceSize()
    {
        return $this->forceSize;
    }

    public function hasCroppedParams()
    {
        return ($this->croppedWidth !== null)
        && ($this->croppedHeight !== null)
        && ($this->croppedX !== null)
        && ($this->croppedY !== null);
    }

    public function getCroppedWidth()
    {
        return $this->croppedWidth;
    }

    public function getCroppedHeight()
    {
        return $this->croppedHeight;
    }

    public function getCroppedX()
    {
        return $this->croppedX;
    }

    public function getCroppedY()
    {
        return $this->croppedY;
    }

    public function hasRotateParams()
    {
        return !empty($this->rotate);
    }

    public function getRotate()
    {
        return $this->rotate;
    }

    private function paramStartsWith($haystack, $needle)
    {
        return !strncmp($haystack, $needle, strlen($needle));
    }

    public function swapDimensions()
    {
        $temp = $this->width;
        $this->width = $this->height;
        $this->height = $temp;
    }
}

class ImageSpecificationException extends Exception
{

}

class ImageSpecificationParsingException extends ImageSpecificationException
{

}