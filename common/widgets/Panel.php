<?php

namespace common\widgets;

use Yii;
use yii\base\Widget;
use yii\helpers\Url;
use yii\bootstrap\Html;
use yii\helpers\Inflector;
use common\helpers\ArrayHelper;


/**
 * Igor Golub <hola@2amigos.us>
 * Company: 2amigOS! <https://2amigos.us>.
 */
class Panel extends Widget
{
    public $htmlOptions = ['class' => 'card'];

    public $title;
    public $titleOptions = [];

    public $subtitle;
    public $subtitleOptions = ['class' => 'text-muted font-13'];

    public $actionsLabel = 'Create';
    public $actions = [];

    public static function begin($config = [])
    {
        /* @var $self self */
        $self = parent::begin($config);

        echo Html::beginTag('div', $self->htmlOptions);
        echo Html::beginTag('div', ['class' => 'header']);

        if ($self->title || $self->actions) {

            if (!empty($self->title)) {
                echo Html::tag('h2', $self->title, $self->titleOptions);
            }

            if ($self->actions) {
                echo '<ul id="' . $self->getId() . '" class="header-dropdown m-t--5">';
                echo "<li class='dropdown'><a class='dropdown-toggle btn btn-circle' href='javascript:void(0);' data-toggle='dropdown'><i class='fal fa-ellipsis-v'></i></a>";
                echo '<ul class="dropdown-menu pull-right">';

                foreach ($self->getPreparedActions() as $action) {
                    echo '<li>' . Html::a($action['label'], $action['url'], $action['options']) . '</li>';
                }

                echo '</ul>';
                echo '</li>';
                echo '</ul>';
            }
        }

        if (!empty($self->subtitle)) {
            echo Html::tag('p', $self->subtitle, $self->subtitleOptions);
        }

        echo Html::endTag('div');

        echo Html::beginTag('div', ['class' => 'body']);

        return $self;
    }

    public static function end()
    {
        echo Html::tag('div', '', ['class' => 'clearfix']);

        echo Html::endTag('div');
        echo Html::endTag('div');

        return parent::end();
    }

    private function getPreparedActions()
    {
        $actions = [];
        foreach ($this->actions as $action) {
            $actions[] = $this->getActionConfig($action);
        }

        return $actions;
    }

    private function getActionConfig(& $action)
    {
        $controllerName = $this->getControllerName();
        $label = Inflector::humanize($controllerName, true);
        $url = Yii::$app->request->resolve()[0];

        if (is_array($action)) {
            return ArrayHelper::merge(['label' => $label, 'url' => '', 'options' => []], $action);
        }

        $config = [];
        $config['label'] = $label;
        $config['url'] = Url::to("/{$controllerName}/{$action}");
        $config['options'] = ['class' => 'btn-modal-control waves-effect waves-block'];
        $config['active'] = in_array($url, ["/{$controllerName}/{$action}"]);

        return $config;
    }

    private function getControllerName()
    {
        return Yii::$app->controller->id;
    }
}