<?php
/*
 * Nikola Kukric <info@singularity-solution.com>
 * Company: Singularity Solution <https://singularity-solution.com>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace common\widgets\listing;


use common\components\GlobalMap;
use common\components\GlobalMarker;
use common\helpers\ArrayHelper;
use common\models\CategoryAttribute;
use common\models\Listing;
use common\models\LocationForm;
use dosamigos\google\maps\Event;
use dosamigos\google\maps\LatLng;
use dosamigos\google\maps\overlays\InfoWindow;
use Yii;
use yii\base\Widget;
use yii\helpers\Inflector;
use yii\helpers\Json;
use yii\widgets\ActiveForm;

/**
 * Class AttributeFieldRender
 * @package common\widgets
 *
 * @property ActiveForm $form
 * @property Listing $model
 * @property string $attribute
 * @property array $listData
 * @property array $listOptions
 * @property array $fieldConfig
 * @property array $wrapperOptions
 * @property CategoryAttribute $attributeField
 */
class LocationFieldRender extends Widget
{
    public $model;

    public $clientOptions = [];

    protected $mapId;

    protected $markerId;

    public function init()
    {
        $this->mapId = 'map' . Inflector::variablize($this->getId());
        $this->markerId = 'marker' . Inflector::variablize($this->getId());

        parent::init();
    }

    /**
     * Runs the widget.
     */
    public function run()
    {
        $this->registerJs();

        return $this->renderMap();
    }

    protected function registerJs()
    {
        $js = [];
        $view = $this->getView();
        $options = Json::encode(ArrayHelper::merge($this->clientOptions, [
            'mapId' => $this->mapId,
            'markerId' => $this->markerId,
        ]));

        LocationFieldRenderAssets::register($view);

        $js[] = ";(function() {";
        $js[] = "locationFieldRender.initialize({$options});";
        $js[] = "})();";

        $view->registerJs(implode("\n", $js));
    }


    protected function renderMap()
    {
        $coord = $this->getCenterCoord();
        $marker = new GlobalMarker([
            'position' => $coord,
            'title' => Yii::t('app-listing', 'Listing location'),
            'draggable' => true
        ]);
        $marker->setName($this->markerId);
        $marker->addEvent($this->getMarkerEvent());
        $marker->attachInfoWindow(
            new InfoWindow([
                'content' => '<p>This is my super cool content</p>'
            ]), true
        );

        $map = new GlobalMap([
            'height' => '400',
            'width' => '100%',
            'center' => $coord,
            'zoom' => 14
        ]);

        $map->setName($this->mapId);

        $map->addOverlay($marker);

        return $map->display();
    }

    protected function getCenterCoord()
    {
        $coords = $this->model->lat && $this->model->long ? [
            'lat' => $this->model->lat,
            'lng' => $this->model->long
        ] : LocationForm::DEFAULT_COORDS;

        return new LatLng($coords);
    }

    protected function getMarkerEvent()
    {
        $event = new Event([
            'trigger' => 'dragend',
            'js' => "locationFieldRender.updateAddress(event.latLng);"
        ]);

        return $event;
    }

}
