<?php
/*
 * Nikola Kukric <info@singularity.is>
 * Company: Singularity Solution <https://singularity.is>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace common\widgets\dropzoneinput;


use common\components\image\ImageSpecification;
use common\helpers\ArrayHelper;
use common\models\File;
use common\models\Image;
use Yii;
use yii\base\Model;
use yii\helpers\Html;
use yii\helpers\Inflector;
use yii\helpers\Json;
use yii\helpers\Url;
use yii\widgets\ActiveField;
use yii\widgets\ActiveForm;
use yii\widgets\InputWidget;

/**
 * Class AttributeFieldRender
 * @package common\widgets
 *
 * @property ActiveField $field
 * @property Model $model
 * @property string $attribute
 * @property string $fileAttribute
 * @property string $message
 * @property array $options
 * @property array $clientOptions
 * @property string $name
 * @property string $value
 */
class DropzoneInput extends InputWidget
{
    public $fileAttribute = '';
    public $message = 'Drag & Drop files or click to upload';
    public $clientOptions = [];
    public $url = '/file/upload';

    public function init()
    {
        $this->initOptions();
        $this->initClientOptions();

        parent::init();
    }

    /**
     * {@inheritdoc}
     */
    public function run()
    {
        $this->registerJs();

        return Html::tag('div', $this->getContent(), $this->options);
    }

    protected function registerJs()
    {
        $js = [];
        $view = $this->getView();
        DropzoneInputAssets::register($view);
        $options = Json::encode($this->clientOptions);
        $input = Html::getInputId($this->model, $this->attribute);
        $config = Json::encode([
            'el' => "#{$this->getDropzoneId()}",
            'input' => "#{$input}",
            'files' => $this->getFilesData()
        ]);

        $js[] = ";(function() {";
        $js[] = "var {$this->getDropzoneId()} = Object.create(DropzoneInput);";
        $js[] = "{$this->getDropzoneId()}.init({$config}, {$options});";
        $js[] = "})();";

        $view->registerJs(implode("\n", $js));
    }

    protected function initClientOptions()
    {
        $defaults = [
            'url' => Url::to([$this->url]),
            'paramName' => 'UploadFileForm[files][]',
            'acceptedFiles' => 'image/*',
            'addRemoveLinks' => true,
            'uploadMultiple' => true,
        ];
        $this->clientOptions = ArrayHelper::merge($defaults, $this->clientOptions);
    }

    protected function initOptions()
    {
        $this->options['id'] = $this->getDropzoneId();
        Html::addCssClass($this->options, 'chicago-dropzone');
    }

    protected function getDropzoneId()
    {
        return Inflector::variablize(ArrayHelper::getValue($this->options, 'id', "dropzone-input-{$this->getId()}"));
    }

    protected function getContent()
    {
        $input = Html::activeHiddenInput($this->model, $this->attribute, ['value' => '']);
        $content = "<div class='dz-message'>
                    <i class='fal fa-upload mb-3 d-block'></i>
                    {$this->message}
                  </div>";

        return $input . PHP_EOL . $content;

    }

    protected function getFilesData()
    {
        /** @var File[] $files */
        $data = [];

        if (!$this->fileAttribute) {
            return [];
        }

        $fileAttribute = $this->model->{$this->fileAttribute};

        if (!$fileAttribute) {
            return [];
        }

        $files = is_array($fileAttribute) ? $fileAttribute : [$fileAttribute];

        foreach ($files as $id => $file) {
            $data[] = [
                'id' => $file->id,
                'name' => $file->original_name,
                'size' => $file->size,
                'status' => 'success',
                'url' => $file->getUrl()
            ];
        }

        return $data;
    }


}
