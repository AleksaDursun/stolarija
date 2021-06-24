<?php


namespace common\widgets;

use Yii;
use yii\bootstrap4\Html;
use yii\widgets\InputWidget;

class FileInput extends InputWidget
{
    /**
     * {@inheritdoc}
     */
    public function run()
    {
        Html::addCssClass($this->options, 'custom-file-input form-control');
        $this->options['placeholder'] = isset($this->options['placeholder']) ? $this->options['placeholder'] : Yii::t('app', 'Select file...');

        if ($this->hasModel()) {
            $field = Html::activeFileInput($this->model, $this->attribute, $this->options);
        } else {
            $field = Html::fileInput($this->name, $this->value, $this->options);
        }

        $this->setFieldTemplate($field);

        $this->registerClientScript();
    }

    protected function setFieldTemplate($field)
    {
        $id = $this->options['id'];
        $label = Yii::t('app', 'Choose file...');

        $parts = [
            '{error}' => '',
            '{input}' => "<div class=\"form-group form-file-upload form-file-multiple\">
                            {$field}
                            <div class='input-group'>
                                <input type=\"text\" class=\"form-control inputFileVisible\" placeholder=\"Single File\">
                                <span class=\"input-group-btn\">
                                    <button type=\"button\" class=\"btn btn-fab btn-round btn-primary\">
                                        <i class=\"material-icons\">attach_file</i>
                                    </button>
                                </span>
                            </div>
                        </div>"
        ];

        $this->field->template = strtr($this->field->template, $parts);
    }

    /**
     * Registers Jason File Input Bootstrap plugin and the related events.
     */
    public function registerClientScript()
    {
        $view = $this->getView();
        $id = $this->options['id'];
        $js[] = ";jQuery('#{$id}').on('change', function(e){
            $('#{$id}-label').html(e.target.files[0].name);
        })";
        $view->registerJs(implode("\n", $js));
    }
}