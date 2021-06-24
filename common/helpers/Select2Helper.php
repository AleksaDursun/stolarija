<?php
/*
 * Nikola Kukric <info@singulaity.is>
 * Company: Singularity Solution <https://singulaity.is>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace common\helpers;

use common\components\orm\ActiveRecord;
use common\models\Category;
use yii\helpers\Url;
use yii\helpers\Html;
use yii\helpers\Json;
use yii\web\JsExpression;

class Select2Helper
{
    /**
     * Configuration - Select2 configuration + additional configuration:
     * controllerId - ID of the controller which will be used for AJAX requests
     * includeAddNewAddon - Whether or not to include add new button next to select 2
     *
     * @param array $options
     * @return array Select2 Config
     */
    public static function getDefaultConfig($options = [])
    {
        $controllerId = ArrayHelper::remove($options, 'controllerId');
        $actionId = ArrayHelper::remove($options, 'actionId', 'autocomplete');
        $params = ArrayHelper::remove($options, 'urlParams', []);
        $url = ArrayHelper::merge(["/{$controllerId}/{$actionId}"], $params);

        $additionalItems = Json::encode(ArrayHelper::remove($options, 'additionalItems', []));
        $excludeIds = Json::encode(ArrayHelper::remove($options, 'excludedIds', []));

        $scopeParams = Json::encode(ArrayHelper::remove($options, 'scopes', []));

        $defaults = [
            'options' => [
                'prompt' => ' '
            ],
            'clientOptions' => [
                'allowClear' => true,
                'minimumInputLength' => 0,
                'templateResult' => new JsExpression("function (d) { return d.text; }"),
                'templateSelection' => new JsExpression("function (d) { return d.text; }"),
                'escapeMarkup' => new JsExpression("function (markup) { return markup; }"),
                'dropdownParent' => new JsExpression('$.trim($("#main-modal .modal-body").html()).length ? $("#main-modal .modal-content") : $(document.body)'),
                'ajax' => [
                    'url' => Url::to($url),
                    'dataType' => 'json',
                    'processResults' => new JsExpression("function (data) {
                        data.results.unshift({$additionalItems});
                        return data;
                    }"),
                    'data' => new JsExpression("function(params) {

                        var excludeIds = {$excludeIds};

                        return $.extend({
                            query: params.term,
                            except: excludeIds.join(',')
                        }, {$scopeParams});
                    }"),
                ]
            ]
        ];

        if ($initData = ArrayHelper::remove($options, 'initData', false)) {
            $defaults['items'] = [$initData['id'] => $initData['text']];;
        }

        if (ArrayHelper::remove($options, 'includeAddNewAddon', false)) {
            $action = ArrayHelper::remove($options, 'addNewAction', 'create');
            $options['template'] = '<div class="input-group">' . '{input}' .
                Html::tag('span', '<i class="fal fa-plus"></i>', [
                    'class' => 'input-group-addon btn btn-default btn-modal-control',
                    'href' => "/{$controllerId}/{$action}"
                ]) . '</div>';
        }

        return ArrayHelper::merge($defaults, $options);
    }

    public static function getProductCategoryConfig(ActiveRecord $model, $attribute = 'category_id', $includeAddNew = false, $options = [])
    {
        /* @var $productCategory Category */
        $productCategory = Category::findOne($model->{$attribute});

        $config = [
            'model' => $model,
            'attribute' => $attribute,
            'controllerId' => 'category',
            'includeAddNewAddon' => $includeAddNew,
            'addon' => Html::a("<i class='fa fa-plus'></i>", ['/category/create'], [
                'class' => 'btn ml-2 btn-sm btn-round btn-primary btn-just-icon btn-modal-control btn-loading'
            ])
        ];

        if ($productCategory && !ArrayHelper::getValue($options, 'clientOptions.data', false)) {
            $config['initData'] = [
                'id' => $productCategory->id,
                'text' => $productCategory->name
            ];
        }

        return static::getDefaultConfig(ArrayHelper::merge($config, $options));
    }

}