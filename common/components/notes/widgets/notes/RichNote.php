<?php
/**
 * Aleksandar Panic <hola@2amigos.us>
 * Company: 2amigOS! <https://2amigos.us>
 */

namespace notes\widgets\notes;


use common\helpers\ArrayHelper;
use yii\data\ActiveDataProvider;
use yii\helpers\Json;
use yii\widgets\InputWidget;

class RichNote extends InputWidget
{
    /** @var string */
    public $fileTemplate = '_dropzone_preview';

    /** @var bool */
    public $attachmentUploadUrl = false;

    /** @var array */
    public $dropzoneOptions = [];

    /** @var string */
    public $uploadFileParam = 'file';

    /** @var string */
    public $attachmentIdName = 'attachmentId[]';

    /** @var string */
    public $serverResponseIdParam = 'id';

    /** @var ActiveDataProvider */
    public $noteListProvider;

    public $invokerButtonId;

    public $formContainerId;

    public $pjaxContainerId = 'general-notes-pjax';

    public $pjaxActionUrl;

    public $deleteAction = 'note/delete';
    public $updateAction = 'note/update';
    public $previousItem = null;

    /**
     * @var array
     * Note list config in style:
     * [
     *     'nameAttribute'
     * ]
     */
    public $noteListConfig;

    public $disableNoteAdd = false;
    public $disableNoteList = false;

    public $noteClientOptions = [];

    public function run()
    {
        $this->registerAssets();

        return $this->render('note');
    }

    public function getId($autoGenerate = true)
    {
        return empty($this->options['id']) ? parent::getId($autoGenerate) : $this->options['id'];
    }

    public function registerAssets()
    {
        $view = $this->getView();
        RichNoteAsset::register($view);

        $widgetId = $this->getId();

        $jsonOptions = Json::encode([
            'serverResponseIdParam' => $this->serverResponseIdParam,
            'dropzone' => $this->getDropzoneConfig(),
            'widgetContainerId' => $this->getId() . '-container',
            'updateNoteContainer' => $this->getId() . '-update-note',
            'pjaxActionUrl' => $this->pjaxActionUrl,
            'pjaxContainerId' => $this->pjaxContainerId,
            'invokerButtonId' => $this->invokerButtonId,
            'formContainerId' => $this->formContainerId,
            'summernote' => [
                'addNewTarget' => '#' . $this->getId() . '-summernote',
                'updateExistingTarget' => '#' . $this->getId() . '-summernote-existing',
            ]
        ]);

        $view->registerJs("
            (function() {
                $('#{$widgetId}-container').initRichNote({$jsonOptions});
            })();
        ");
    }

    public function getIsOdd($currentModel, $currentClass)
    {
        if (empty($this->previousItem)) {
            return false;
        }

        $isChanged = $this->previousItem->created_by !== $currentModel->created_by;
        $isOdd = strpos($currentClass, 'odd') !== false;

        return $isChanged ? !$isOdd : $isOdd;
    }


    protected function getDropzoneConfig()
    {
        $widgetId = $this->getId();

        $dropzoneConfig = !empty($this->attachmentUploadUrl) ? [
            'target' => "#{$widgetId}-container .dropzone-uploads",
            'updateTarget' => "#{$widgetId}-container .existing-dropzone-uploads",
            'options' => [
                'url' => $this->attachmentUploadUrl,
                'paramName' => $this->uploadFileParam,
                'previewTemplate' => $this->render($this->fileTemplate, [
                    'fileIdName' => $this->attachmentIdName
                ]),
                "thumbnailWidth" => 50,
                "thumbnailHeight" => 50,
                "dictCancelUpload" => '',
                "dictRemoveFile" => ''
            ]
        ] : [];

        return ArrayHelper::merge($dropzoneConfig, $this->dropzoneOptions);
    }

    public function getCkeditorOptions()
    {
        return [
            'height' => 100,
            'toolbar' => [
                [ 'name' => 'basicstyles', 'items' => [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-' ] ],
                [ 'name' => 'paragraph', 'items' => [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] ],
            ],
        ];
    }
}