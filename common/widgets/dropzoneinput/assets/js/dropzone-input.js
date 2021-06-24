var DropzoneInput = {
    config: {},
    options: {},
    dropzone: null,
    init: function (config, options) {
        var self = this;
        this.config = config;

        var defaults = {
            sending: function (file, xhr, formData) {
                formData.append(yii.getCsrfParam(), yii.getCsrfToken());
            },
            success: function (file, xhr) {
                if (xhr.success !== true) {
                    return;
                }

                self.config.files.push({
                    id: xhr.data[0].file_id,
                    uuid: file.upload.uuid
                });
                self.updateInput();
            },
            successmultiple: function (files, xhr) {
                if (xhr.success !== true) {
                    return;
                }

                $.each(files, function (key) {
                    self.config.files.push({
                        id: xhr.data[key].file_id,
                        uuid: this.upload.uuid
                    });
                });
                self.updateInput();
            },
            removedfile: function (file) {

                self.showMessageDiv(false);

                main.ui.confirm('Are you sure?').then(function (response) {
                    if (!response.value) {
                        return false;
                    }

                    self.config.files = self.config.files.filter(function (item) {
                        return file.upload && item.uuid !== file.upload.uuid;
                    });

                    $(file.previewElement).remove();

                    if (self.config.files.length === 0) {
                        self.showMessageDiv(true);
                    }

                    self.updateInput();
                });

                return false;
            }
        };

        this.options = $.extend({}, defaults, options);

        this.dropzone = new Dropzone(this.config.el, this.options);

        this.initExistingFiles();
        this.updateInput();
    },
    initExistingFiles: function () {
        var self = this;

        $.each(self.config.files, function (key, file) {
            self.dropzone.emit('addedfile', file);
            self.dropzone.emit('complete', file);
            self.dropzone.emit('thumbnail', file, file.url);
        });
    },
    updateInput: function () {
        var ids = [];
        var self = this;
        var inputVal;

        $.each(self.config.files, function (key, file) {
            ids.push(file.id);
        });

        if (self.options.maxFiles === 1) {
            inputVal = ids.length > 0 ? ids[0] : '';
        } else {
            inputVal = JSON.stringify(ids);
        }

        $(self.config.input).val(inputVal);

        if (ids.length === 0) {
            self.showMessageDiv(true);
        }
    },
    showMessageDiv: function (show) {
        if (show) {
            $(this.config.el + ' .dz-message').show();
        } else {
            $(this.config.el + ' .dz-message').hide();
        }
    }
};



