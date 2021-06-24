/**
 * Created by Aleksandar Panic on 30-Aug-16.
 */

(function ($) {
    $.fn.initRichNote = function (config) {

        var self = this;

        if (typeof self.data('richNote') !== 'undefined') {
            return;
        }

        var dropzone;

        var settings = $.extend({
            serverResponseIdParam: 'id',
            widgetContainerId: '',
            updateNoteContainer: '',
            summernote: {
                addNewTarget: '',
                updateExistingTarget: ''
            },
            dropzone: {
                target: '.dropzone-uploads',
                updateTarget: '.existing-dropzone-uploads',
                options: $.extend(config.dropzone.options || {}, {
                    success: processUploadedDropzoneFile
                })
            }
        }, config);

        if (settings.dropzone.options) {
            initDropzone();
        } else {
            removeAttachmentArea();
        }

        initListeners();

        function initListeners() {
            $(document).off('pjax:success').on('pjax:success', '#' + settings.pjaxContainerId, function (event) {
                // $('[data-toggle=\"popover\"]').popover();
                updateGridNoteCount();
                initNiceScroll();
            });

            $(document).on('modal-submitted', function (e, data, btn, form) {
                if (data.success) {
                    reloadNoteList();
                    clearEditors();
                    clearDropzone();
                }
            });

            $(document).on('hide.bs.modal', function () {
                $('.popover-opened', '#' + settings.formContainerId).popover('destroy');
            });

            $(document).on('shown.bs.modal', function () {
                initNiceScroll();
            });
        }

        function initNiceScroll() {
            $('.note-list.nicescroll').niceScroll({
                cursorcolor: main.ui.color.primary,
                cursorwidth: '6px',
                cursorborderradius: '5px',
                spacebarenabled: false
            });
        }

        function updateGridNoteCount() {
            var count = $('#noteListCount').val();

            if (count) {
                $('#' + settings.invokerButtonId + ' .note-count').text(count).show();
            }

        }

        function reloadNoteList() {
            $.pjax.reload({
                container: '#' + settings.pjaxContainerId,
                url: $('#' + settings.formContainerId).attr('action'),
                replace: false,
                push: false,
                timeout: 10000
            });
        }

        function clearEditors() {
            CKEDITOR.instances['note-content-summernote'].setData('');
            CKEDITOR.instances['note-content-summernote-existing'].setData('');
        }

        function initDropzone() {
            dropzone = new Dropzone($(settings.dropzone.target)[0], settings.dropzone.options);

            self.find('.clear-all-button').click(clearDropzone);
            dropzone.on('success', processUploadedDropzoneFile);
            dropzone.on('error', processErrorOnUpload);
            dropzone.on('sending', function (file, xhr, formData) {
                disableClearAttachmentButton(false);
                formData.append(yii.getCsrfParam(), yii.getCsrfToken());
            });
        }

        function clearDropzone() {
            dropzone.removeAllFiles(true);
            disableClearAttachmentButton(true);
        }

        function disableClearAttachmentButton(disabled) {
            self.find('.clear-all-button').prop('disabled', disabled);
        }

        function processErrorOnUpload(file, message) {
            var node, _i, _len, _ref, _results;
            if (file.previewElement) {
                file.previewElement.classList.add('dz-error');
                if (typeof message !== 'String' && message.message) {
                    message = message.message;
                }
                _ref = file.previewElement.querySelectorAll('[data-dz-errormessage]');
                _results = [];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    node = _ref[_i];
                    _results.push(node.textContent = message);
                }
                main.ui.notify('File couldn\'t be uploaded!', 'error', message);
                return _results;
            }
        }

        function processUploadedDropzoneFile(file, serverResponse) {
            if (!$.isPlainObject(serverResponse)) {
                $(file.previewElement).find('.dz-file-id').val(serverResponse);
                return;
            }

            $(file.previewElement).find('.dz-file-id').val(serverResponse[settings.serverResponseIdParam]);
        }

        function removeAttachmentArea() {
            self.find('.attachment-area').remove();
            self.find('.note-area')
                .removeClass('col-md-9')
                .addClass('col-md-12');
        }

    }

})(jQuery);