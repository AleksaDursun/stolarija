/*
 * Nikola Kukric <info@singularity.is>
 * Company: Singularity Solution <https://singularity.is>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

var main = {}; // namespace

$ = jQuery.noConflict();

$(function () {

    main.ui.init();

});

/**
 * main namespace for helper declarative methods
 */

main.ui = (function ($) {

    return {
        cachedTemplates: {},
        modal: null,
        loadingIcon: '<i class="fa fa-spinner fa-spin mr-0"></i> ',
        hiddenLoadingIcon: '<i class="fa fa-spinner fa-spin hidden"></i> ',
        buttonLoadingText: '<i class="fa fa-spinner fa-spin"></i> Loading...',
        buttonSavingText: '<i class="fa fa-spinner fa-spin"></i> Saving...',
        defaultConfirmMessage: 'Do you wish to delete this item?',
        messageDuration: 6000,
        color: {
            primary: '#5e72e4',
            secondary: '#f7fafc',
            danger: '#f5365c',
            success: '#2dce89',
            info: '#11cdef'
        },
        unmask: function (val) {
            return Number(val.replace(/[^0-9\.-]+/g, ""));
        },

        confirm: function (message, type, title) {
            type = type || 'error';

            return swal({
                type: type,
                title: message,
                showCancelButton: true,
                confirmButtonColor: type === 'error' ? this.color.danger : this.color.primary,
                confirmButtonText: 'Yes'
            });
        },

        notify: function (message, type) {

            if (!message) {
                return;
            }

            if (type) {
                switch (type) {
                    case 'success':
                        type = 'success';
                        break;
                    case 'warning':
                        type = 'warning';
                        break;
                    case 'error':
                        type = 'danger';
                        break;
                }
            } else {
                type = 'info';
            }

            $.notify({icon: "add_alert", message: message}, {
                type: type,
                timer: 3000,
                z_index: 1081,
                placement: {
                    from: 'top',
                    align: 'right'
                }
            });

            return this;
        },

        loading: function (state) {
            if (state) {
                $('.loading-overlay').show();
            } else {
                $('.loading-overlay').hide();
            }
        },

        controlAjaxSubmit: function (e) {
            e.preventDefault();
            var self = $(this);

            if (self.hasClass('disabled')) {
                return false;
            }
            var frm = this.form ? $(this.form) : self.data('form-id') ? $('#' + self.data('form-id')) : self.closest('form')[0];
            var url = self.attr('data-href') || frm.attr('action');

            main.ui.buttonLoading(self, true);

            $.ajax({
                url: url,
                type: 'post',
                data: frm.serialize(),
                dataType: 'json',
                success: function (data) {
                    if (data.success) {
                        main.ui.refreshNotificationWidgets();
                    } else {
                        main.yiiactiveform.updateInputs(frm, data.errors || []);
                    }

                    main.ui.notify(data.message, data.success ? 'success' : 'error');
                    main.ui.buttonLoading(self, false);

                    self.trigger('ajax-form-submitted', [data, self, frm]);
                },
                error: function (XHR) {
                    frm.parent().html(XHR.responseText);
                    main.ui.buttonLoading(self, false);
                }
            });
            return false;
        },

        controlPjaxAction: function () {
            var self = $(this), data = {},
                gridId = self.data('grid'),
                confirmMsg = self.data('confirm-msg') || false,
                confirmType = self.data('confirm-type') || '',
                type = self.data('type') || 'get',
                url = self.prop('href') || self.attr('data-href');

            if (self.hasClass('disabled') || !url) {
                return false;
            }

            main.ui.buttonLoading(self, true);

            $.each(self.data(), function (key, value) {
                data[key] = value;
            });

            var sendRequest = function (confirmResponse) {
                if (confirmResponse.value !== true) {
                    main.ui.buttonLoading(self, false);
                    return false;
                }

                $.ajax({
                    url: url,
                    type: type,
                    data: data,
                    dataType: 'json',
                    success: function (data) {
                        if (data.success && $('#' + gridId).length) {
                            $.pjax.reload({container: '#' + gridId, timeout: 5000});

                            main.ui.refreshNotificationWidgets();
                        }

                        main.ui.notify(data.message, data.success ? 'success' : 'error');
                        main.ui.buttonLoading(self, false);

                        $(document).trigger('pjax-action-submitted', [data, self, gridId]);
                    },
                    error: function (XHR) {
                        main.ui.notify(XHR.responseText, 'error');
                        main.ui.buttonLoading(self, false);
                    }
                });
            };

            if (confirmMsg) {
                main.ui.confirm(confirmMsg, confirmType).then(sendRequest);
                return false;
            }

            sendRequest({value: true});

            return false;
        },

        controlConfirm: function (e) {
            var self = $(this);

            if (self.hasClass('disabled')) {
                return false;
            }

            var msg = self.attr('data-msg') || main.ui.defaultConfirmMessage;
            var url = self.prop('href') || self.attr('data-url');
            var pjaxId = self.data('pjax-id');
            var method = self.data('method') || 'POST';
            var hasLoader = self.data('loader') !== undefined ? self.data('loader') : true;
            var isJsonResponse = (self.data('json-response') == 1);

            main.ui.confirm(msg).then(result => {
                if (!result.value) {
                    return false;
                }

                main.ui.loading(true);

                if (!isJsonResponse) {
                    return document.location.href = url;
                }

                if (hasLoader) {
                    main.ui.buttonLoading(self, true);
                }

                $.ajax({
                    url: url,
                    type: method,
                    success: function (data) {
                        if (data.success && $('#' + pjaxId).length) {
                            $.pjax.reload({container: '#' + pjaxId, timeout: 5000});

                            main.ui.refreshNotificationWidgets();
                        }

                        main.ui.notify(data.message, data.success ? 'success' : 'error');
                        main.ui.loading(false);

                        main.ui.buttonLoading(self, false);

                        $(document).trigger('confirm-action-submitted', [data, self, pjaxId]);
                    },
                    error: function (error) {
                        if (error.responseText) {
                            main.ui.notify(error.responseText, 'error');
                            main.ui.buttonLoading(self, false);
                        }

                        main.ui.loading(false);
                    }
                });

                return true;
            });

            return false;
        },

        buttonLoading: function (btn, loading) {
            if (loading) {
                btn.attr('disabled', true).addClass('disabled');
                btn.find('[class*="fa-"]').hide();
                btn.prepend(main.ui.loadingIcon);
            } else {
                btn.removeAttr('disabled').removeClass('disabled');
                btn.find('.fa-spinner').remove();
                btn.find('[class*="fa-"]').show();
            }
        },

        alert: function (message, callback) {
            bootbox.alert(message, callback);
        },

        initButtonSpinners: function () {
            $('.btn-loading').closest('form').on('submit', function () {
                var form = $(this), btn = form.find(':submit');
                main.ui.buttonLoading(btn, true);

                setTimeout(function () {
                    if (form.find('.is-invalid').length > 0) {
                        main.ui.buttonLoading(btn, false);
                    }
                }, 300);
            });
        },

        initNicescroll: function (selector = '.nicescroll') {
            $(selector).niceScroll({
                cursorcolor: main.ui.color.primary,
                cursorwidth: '6px',
                cursorborderradius: '5px',
                spacebarenabled: false
            });
        },

        yiiConfirm: function (message, ok, cancel) {
            main.ui.confirm(message, function (result) {
                if (result) {
                    !ok || ok();
                    return;
                }

                !cancel || cancel();
            });
        },

        refreshNotificationWidgets: function () {
            setTimeout(function () {
                $.pjax.reload({
                    container: '#notification-pjax-container',
                    url: window.location.origin + '/site/header',
                    data: {page: 1, 'per-page': 5},
                    push: false,
                    replace: false,
                    timeout: 10000
                });
            }, 1000);
        }
        ,

        removeDuplicateUrlParams: function (url) {
            var params = new URLSearchParams(url);
            var result = {},
                isArrayKey,
                arrayKey,
                prevArrayKey = '';

            for (var p of params.entries()) {
                isArrayKey = p[0].indexOf('[]', p[0].length - 2) !== -1;
                if (isArrayKey) {
                    arrayKey = p[0].substr(0, p[0].length - 2);
                    if (arrayKey === prevArrayKey) {
                        result[arrayKey].push(p[1]);
                    } else {
                        result[arrayKey] = [p[1]];
                    }
                    prevArrayKey = arrayKey;
                } else {
                    result[p[0]] = p[1];
                    prevArrayKey = '';
                }
            }

            return $.param(result);
        },
        /**
         * module init
         */
        init: function () {

            Dropzone.autoDiscover = false;

            modal.init();
            main.ui.initButtonSpinners();

            $(document)
                .on('click', '.btn-control-confirm', this.controlConfirm)
                .on('click', '.btn-control-ajax-submit', this.controlAjaxSubmit)
                .on('click', '.btn-control-pjax-action', this.controlPjaxAction)
                .on('click', '.allow-focus .dropdown-menu', function (e) {
                    e.stopPropagation();
                })
                .on('shown.bs.modal', function () {
                    // main.ui.initNicescroll();
                })
                .on('pjax:beforeSend', function (event, xhr, options) {
                    var url = new URL(options.url, window.location.origin) || null;
                    if (url && url.search) {
                        options.url = url.origin + url.pathname + '?' + main.ui.removeDuplicateUrlParams(url.search);
                    }
                    return true;
                });

            yii.confirm = main.ui.yiiConfirm;

            $('[data-toggle="popover"]').popover();
            $('[data-toggle="tooltip"]').tooltip({container: 'body'});

            $.fn.modal.Constructor.prototype.enforceFocus = $.noop;
        }
    };
})
(jQuery);

/**
 * Lot ot yiiactiveform.js code, so active form javascript can be used internaly
 *
 * @type {{submit, validate, updateSummary, addAttribute, createAttribute, updateInputs, updateInput, findInput, getValue, updateAriaInvalid}}
 */
main.yiiactiveform = (function ($) {
    return {
        submit: function ($form, $trigger) {
            var url = $form.attr('action');
            $.ajax({
                url: url,
                data: $form.serialize(),
                type: 'post',
                dataType: 'json',
                success: function (data) {
                    var reset = $trigger.attr('data-reset');
                    if (reset) {
                        $form[0].reset();
                    }
                    $trigger.button('reset');
                },
                error: function (xhr) {
                    $trigger.button('reset');
                    var reset = $trigger.attr('data-reset');
                    if (reset) {
                        $form[0].reset();
                    }
                }
            });
        },
        validate: function ($form, $trigger) {
            var settings = $.fn.yiiactiveform.getSettings($form);
            if ($trigger.length === 0) {
                $trigger = $("div[class$='-submit'],div[class*='-submit ']");
            }
            if (!settings.validateOnSubmit) {
                return main.yiiactiveform.submit($form, $trigger);
            }
            settings.submitting = true;
            $.fn.yiiactiveform.validate($form, function (messages) {
                if ($.isEmptyObject(messages)) {
                    $.each(settings.attributes, function () {
                        $.fn.yiiactiveform.updateInput(this, messages, $form);
                    });
                    main.yiiactiveform.submit($form, $trigger);
                    return true;
                } else {
                    settings = $.fn.yiiactiveform.getSettings($form);
                    $.each(settings.attributes, function () {
                        $.fn.yiiactiveform.updateInput(this, messages, $form);
                    });
                    settings.submitting = false;
                    main.yiiactiveform.updateSummary($form, messages);
                    $trigger.button('reset');
                    return false;
                }
            });
        },
        updateSummary: function ($form, messages) {
            var settings = $.fn.yiiactiveform.getSettings($form),
                heading = '<p>Please fix the following input errors:</p>',
                list = '';

            $.each(settings.attributes, function () {
                if (messages && $.isArray(messages[this.id])) {
                    $.each(messages[this.id], function (j, message) {
                        list = list + '<li>' + message + '</li>';
                    });
                }
            });
        },
        addAttribute: function ($form, attribute) {
          var settings = $.fn.yiiactiveform.getSettings($form);
          settings.attributes.push(attribute);
          $form.data('settings', settings);
          /*
           * returns the value of the CActiveForm input field
           * performs additional checks to get proper values for checkbox / radiobutton / checkBoxList / radioButtonList
           * @param o object the jQuery object of the input element
           */
          var getAFValue = function (o) {
            var type;
            if (!o.length)
              return undefined;
            if (o[0].tagName.toLowerCase() == 'span') {
              var c = [];
              o.find(':checked').each(function () {
                c.push(this.value);
              });
              return c.join(',');
            }
            type = o.attr('type');
            if (type === 'checkbox' || type === 'radio') {
              return o.filter(':checked').val();
            } else {
              return o.val();
            }
          };
          var validate = function (attribute, forceValidate) {
            if (forceValidate) {
              attribute.status = 2;
            }
            $.each(settings.attributes, function () {
              if (this.value !== getAFValue($form.find('#' + this.inputID))) {
                this.status = 2;
                forceValidate = true;
              }
            });
            if (!forceValidate) {
              return;
            }

            if (settings.timer !== undefined) {
              clearTimeout(settings.timer);
            }
            settings.timer = setTimeout(function () {
              if (settings.submitting || $form.is(':hidden')) {
                return;
              }
              if (attribute.beforeValidateAttribute === undefined || attribute.beforeValidateAttribute($form, attribute)) {
                $.each(settings.attributes, function () {
                  if (this.status === 2) {
                    this.status = 3;
                    $.fn.yiiactiveform.getInputContainer(this, $form).addClass(this.validatingCssClass);
                  }
                });
                $.fn.yiiactiveform.validate($form, function (data) {
                  var hasError = false;
                  $.each(settings.attributes, function () {
                    if (this.status === 2 || this.status === 3) {
                      hasError = $.fn.yiiactiveform.updateInput(this, data, $form) || hasError;
                    }
                  });
                  if (attribute.afterValidateAttribute !== undefined) {
                    attribute.afterValidateAttribute($form, attribute, data, hasError);
                  }
                });
              }
            }, attribute.validationDelay);
          };
          if (attribute.validateOnChange) {
            $form.find('#' + attribute.inputID).change(function () {
              validate(attribute, false);
            }).blur(function () {
              if (attribute.status !== 2 && attribute.status !== 3) {
                validate(attribute, !attribute.status);
              }
            });
          }
          /*
* Nikola Kukric <info@singularity.is>
* Company: Singularity Solution <https://singularity.is>
*
* For the full copyright and license information, please view
* the LICENSE file that was distributed with this source code.
*/

          var main = {}; // namespace

          $ = jQuery.noConflict();

          $(function () {

            main.ui.init();

          });

          /**
           * main namespace for helper declarative methods
           */

          main.ui = (function ($) {

            return {
              cachedTemplates: {},
              modal: null,
              loadingIcon: '<i class="fa fa-spinner fa-spin mr-0"></i> ',
              hiddenLoadingIcon: '<i class="fa fa-spinner fa-spin hidden"></i> ',
              buttonLoadingText: '<i class="fa fa-spinner fa-spin"></i> Loading...',
              buttonSavingText: '<i class="fa fa-spinner fa-spin"></i> Saving...',
              defaultConfirmMessage: 'Do you wish to delete this item?',
              messageDuration: 6000,
              color: {
                primary: '#5e72e4',
                secondary: '#f7fafc',
                danger: '#f5365c',
                success: '#2dce89',
                info: '#11cdef'
              },
              unmask: function (val) {
                return Number(val.replace(/[^0-9\.-]+/g, ""));
              },

              confirm: function (message, type, title) {
                type = type || 'error';

                return swal({
                  type: type,
                  title: message,
                  showCancelButton: true,
                  confirmButtonColor: type === 'error' ? this.color.danger : this.color.primary,
                  confirmButtonText: 'Yes'
                });
              },

              notify: function (message, type) {

                if (!message) {
                  return;
                }

                if (type) {
                  switch (type) {
                    case 'success':
                      type = 'success';
                      break;
                    case 'warning':
                      type = 'warning';
                      break;
                    case 'error':
                      type = 'danger';
                      break;
                  }
                } else {
                  type = 'info';
                }

                $.notify({icon: "add_alert", message: message}, {
                  type: type,
                  timer: 3000,
                  z_index: 1081,
                  placement: {
                    from: 'top',
                    align: 'right'
                  }
                });

                return this;
              },

              loading: function (state) {
                if (state) {
                  $('.loading-overlay').show();
                } else {
                  $('.loading-overlay').hide();
                }
              },

              controlAjaxSubmit: function (e) {
                e.preventDefault();
                var self = $(this);

                if (self.hasClass('disabled')) {
                  return false;
                }
                var frm = this.form ? $(this.form) : self.data('form-id') ? $('#' + self.data('form-id')) : self.closest('form')[0];
                var url = self.attr('data-href') || frm.attr('action');

                main.ui.buttonLoading(self, true);

                $.ajax({
                  url: url,
                  type: 'post',
                  data: frm.serialize(),
                  dataType: 'json',
                  success: function (data) {
                    if (data.success) {
                      main.ui.refreshNotificationWidgets();
                    } else {
                      main.yiiactiveform.updateInputs(frm, data.errors || []);
                    }

                    main.ui.notify(data.message, data.success ? 'success' : 'error');
                    main.ui.buttonLoading(self, false);

                    self.trigger('ajax-form-submitted', [data, self, frm]);
                  },
                  error: function (XHR) {
                    frm.parent().html(XHR.responseText);
                    main.ui.buttonLoading(self, false);
                  }
                });
                return false;
              },

              controlPjaxAction: function () {
                var self = $(this), data = {},
                  gridId = self.data('grid'),
                  confirmMsg = self.data('confirm-msg') || false,
                  confirmType = self.data('confirm-type') || '',
                  type = self.data('type') || 'get',
                  url = self.prop('href') || self.attr('data-href');

                if (self.hasClass('disabled') || !url) {
                  return false;
                }

                main.ui.buttonLoading(self, true);

                $.each(self.data(), function (key, value) {
                  data[key] = value;
                });

                var sendRequest = function (confirmResponse) {
                  if (confirmResponse.value !== true) {
                    main.ui.buttonLoading(self, false);
                    return false;
                  }

                  $.ajax({
                    url: url,
                    type: type,
                    data: data,
                    dataType: 'json',
                    success: function (data) {
                      if (data.success && $('#' + gridId).length) {
                        $.pjax.reload({container: '#' + gridId, timeout: 5000});

                        main.ui.refreshNotificationWidgets();
                      }

                      main.ui.notify(data.message, data.success ? 'success' : 'error');
                      main.ui.buttonLoading(self, false);

                      $(document).trigger('pjax-action-submitted', [data, self, gridId]);
                    },
                    error: function (XHR) {
                      main.ui.notify(XHR.responseText, 'error');
                      main.ui.buttonLoading(self, false);
                    }
                  });
                };

                if (confirmMsg) {
                  main.ui.confirm(confirmMsg, confirmType).then(sendRequest);
                  return false;
                }

                sendRequest({value: true});

                return false;
              },

              controlConfirm: function (e) {
                var self = $(this);

                if (self.hasClass('disabled')) {
                  return false;
                }

                var msg = self.attr('data-msg') || main.ui.defaultConfirmMessage;
                var url = self.prop('href') || self.attr('data-url');
                var pjaxId = self.data('pjax-id');
                var method = self.data('method') || 'POST';
                var hasLoader = self.data('loader') !== undefined ? self.data('loader') : true;
                var isJsonResponse = (self.data('json-response') == 1);

                main.ui.confirm(msg).then(result => {
                  if (!result.value) {
                    return false;
                  }

                  main.ui.loading(true);

                  if (!isJsonResponse) {
                    return document.location.href = url;
                  }

                  if (hasLoader) {
                    main.ui.buttonLoading(self, true);
                  }

                  $.ajax({
                    url: url,
                    type: method,
                    success: function (data) {
                      if (data.success && $('#' + pjaxId).length) {
                        $.pjax.reload({container: '#' + pjaxId, timeout: 5000});

                        main.ui.refreshNotificationWidgets();
                      }

                      main.ui.notify(data.message, data.success ? 'success' : 'error');
                      main.ui.loading(false);

                      main.ui.buttonLoading(self, false);

                      $(document).trigger('confirm-action-submitted', [data, self, pjaxId]);
                    },
                    error: function (error) {
                      if (error.responseText) {
                        main.ui.notify(error.responseText, 'error');
                        main.ui.buttonLoading(self, false);
                      }

                      main.ui.loading(false);
                    }
                  });

                  return true;
                });

                return false;
              },

              buttonLoading: function (btn, loading) {
                if (loading) {
                  btn.attr('disabled', true).addClass('disabled');
                  btn.find('[class*="fa-"]').hide();
                  btn.prepend(main.ui.loadingIcon);
                } else {
                  btn.removeAttr('disabled').removeClass('disabled');
                  btn.find('.fa-spinner').remove();
                  btn.find('[class*="fa-"]').show();
                }
              },

              alert: function (message, callback) {
                bootbox.alert(message, callback);
              },

              initButtonSpinners: function () {
                $('.btn-loading').closest('form').on('submit', function () {
                  var form = $(this), btn = form.find(':submit');
                  main.ui.buttonLoading(btn, true);

                  setTimeout(function () {
                    if (form.find('.is-invalid').length > 0) {
                      main.ui.buttonLoading(btn, false);
                    }
                  }, 300);
                });
              },

              initNicescroll: function (selector = '.nicescroll') {
                $(selector).niceScroll({
                  cursorcolor: main.ui.color.primary,
                  cursorwidth: '6px',
                  cursorborderradius: '5px',
                  spacebarenabled: false
                });
              },

              yiiConfirm: function (message, ok, cancel) {
                main.ui.confirm(message, function (result) {
                  if (result) {
                    !ok || ok();
                    return;
                  }

                  !cancel || cancel();
                });
              },

              refreshNotificationWidgets: function () {
                setTimeout(function () {
                  $.pjax.reload({
                    container: '#notification-pjax-container',
                    url: window.location.origin + '/site/header',
                    data: {page: 1, 'per-page': 5},
                    push: false,
                    replace: false,
                    timeout: 10000
                  });
                }, 1000);
              }
              ,

              removeDuplicateUrlParams: function (url) {
                var params = new URLSearchParams(url);
                var result = {},
                  isArrayKey,
                  arrayKey,
                  prevArrayKey = '';

                for (var p of params.entries()) {
                  isArrayKey = p[0].indexOf('[]', p[0].length - 2) !== -1;
                  if (isArrayKey) {
                    arrayKey = p[0].substr(0, p[0].length - 2);
                    if (arrayKey === prevArrayKey) {
                      result[arrayKey].push(p[1]);
                    } else {
                      result[arrayKey] = [p[1]];
                    }
                    prevArrayKey = arrayKey;
                  } else {
                    result[p[0]] = p[1];
                    prevArrayKey = '';
                  }
                }

                return $.param(result);
              },
              /**
               * module init
               */
              init: function () {

                Dropzone.autoDiscover = false;

                modal.init();
                main.ui.initButtonSpinners();

                $(document)
                  .on('click', '.btn-control-confirm', this.controlConfirm)
                  .on('click', '.btn-control-ajax-submit', this.controlAjaxSubmit)
                  .on('click', '.btn-control-pjax-action', this.controlPjaxAction)
                  .on('click', '.allow-focus .dropdown-menu', function (e) {
                    e.stopPropagation();
                  })
                  .on('shown.bs.modal', function () {
                    // main.ui.initNicescroll();
                  })
                  .on('pjax:beforeSend', function (event, xhr, options) {
                    var url = new URL(options.url, window.location.origin) || null;
                    if (url && url.search) {
                      options.url = url.origin + url.pathname + '?' + main.ui.removeDuplicateUrlParams(url.search);
                    }
                    return true;
                  });

                yii.confirm = main.ui.yiiConfirm;

                $('[data-toggle="popover"]').popover();
                $('[data-toggle="tooltip"]').tooltip({container: 'body'});

                $.fn.modal.Constructor.prototype.enforceFocus = $.noop;
              }
            };
          })
          (jQuery);

          /**
           * Lot ot yiiactiveform.js code, so active form javascript can be used internaly
           *
           * @type {{submit, validate, updateSummary, addAttribute, createAttribute, updateInputs, updateInput, findInput, getValue, updateAriaInvalid}}
           */
          main.yiiactiveform = (function ($) {
            return {
              submit: function ($form, $trigger) {
                var url = $form.attr('action');
                $.ajax({
                  url: url,
                  data: $form.serialize(),
                  type: 'post',
                  dataType: 'json',
                  success: function (data) {
                    var reset = $trigger.attr('data-reset');
                    if (reset) {
                      $form[0].reset();
                    }
                    $trigger.button('reset');
                  },
                  error: function (xhr) {
                    $trigger.button('reset');
                    var reset = $trigger.attr('data-reset');
                    if (reset) {
                      $form[0].reset();
                    }
                  }
                });
              },
              validate: function ($form, $trigger) {
                var settings = $.fn.yiiactiveform.getSettings($form);
                if ($trigger.length === 0) {
                  $trigger = $("div[class$='-submit'],div[class*='-submit ']");
                }
                if (!settings.validateOnSubmit) {
                  return main.yiiactiveform.submit($form, $trigger);
                }
                settings.submitting = true;
                $.fn.yiiactiveform.validate($form, function (messages) {
                  if ($.isEmptyObject(messages)) {
                    $.each(settings.attributes, function () {
                      $.fn.yiiactiveform.updateInput(this, messages, $form);
                    });
                    main.yiiactiveform.submit($form, $trigger);
                    return true;
                  } else {
                    settings = $.fn.yiiactiveform.getSettings($form);
                    $.each(settings.attributes, function () {
                      $.fn.yiiactiveform.updateInput(this, messages, $form);
                    });
                    settings.submitting = false;
                    main.yiiactiveform.updateSummary($form, messages);
                    $trigger.button('reset');
                    return false;
                  }
                });
              },
              updateSummary: function ($form, messages) {
                var settings = $.fn.yiiactiveform.getSettings($form),
                  heading = '<p>Please fix the following input errors:</p>',
                  list = '';

                $.each(settings.attributes, function () {
                  if (messages && $.isArray(messages[this.id])) {
                    $.each(messages[this.id], function (j, message) {
                      list = list + '<li>' + message + '</li>';
                    });
                  }
                });
              },
              addAttribute: function ($form, attribute) {
                var settings = $.fn.yiiactiveform.getSettings($form);
                settings.attributes.push(attribute);
                $form.data('settings', settings);
                /*
                 * returns the value of the CActiveForm input field
                 * performs additional checks to get proper values for checkbox / radiobutton / checkBoxList / radioButtonList
                 * @param o object the jQuery object of the input element
                 */
                var getAFValue = function (o) {
                  var type;
                  if (!o.length)
                    return undefined;
                  if (o[0].tagName.toLowerCase() == 'span') {
                    var c = [];
                    o.find(':checked').each(function () {
                      c.push(this.value);
                    });
                    return c.join(',');
                  }
                  type = o.attr('type');
                  if (type === 'checkbox' || type === 'radio') {
                    return o.filter(':checked').val();
                  } else {
                    return o.val();
                  }
                };
                var validate = function (attribute, forceValidate) {
                  if (forceValidate) {
                    attribute.status = 2;
                  }
                  $.each(settings.attributes, function () {
                    if (this.value !== getAFValue($form.find('#' + this.inputID))) {
                      this.status = 2;
                      forceValidate = true;
                    }
                  });
                  if (!forceValidate) {
                    return;
                  }

                  if (settings.timer !== undefined) {
                    clearTimeout(settings.timer);
                  }
                  settings.timer = setTimeout(function () {
                    if (settings.submitting || $form.is(':hidden')) {
                      return;
                    }
                    if (attribute.beforeValidateAttribute === undefined || attribute.beforeValidateAttribute($form, attribute)) {
                      $.each(settings.attributes, function () {
                        if (this.status === 2) {
                          this.status = 3;
                          $.fn.yiiactiveform.getInputContainer(this, $form).addClass(this.validatingCssClass);
                        }
                      });
                      $.fn.yiiactiveform.validate($form, function (data) {
                        var hasError = false;
                        $.each(settings.attributes, function () {
                          if (this.status === 2 || this.status === 3) {
                            hasError = $.fn.yiiactiveform.updateInput(this, data, $form) || hasError;
                          }
                        });
                        if (attribute.afterValidateAttribute !== undefined) {
                          attribute.afterValidateAttribute($form, attribute, data, hasError);
                        }
                      });
                    }
                  }, attribute.validationDelay);
                };
                if (attribute.validateOnChange) {
                  $form.find('#' + attribute.inputID).change(function () {
                    validate(attribute, false);
                  }).blur(function () {
                    if (attribute.status !== 2 && attribute.status !== 3) {
                      validate(attribute, !attribute.status);
                    }
                  });
                }
                if (attribute.validateOnType) {
                  $form.find('#' + attribute.inputID).keyup(function () {
                    if (attribute.value !== getAFValue($(attribute))) {
                      validate(attribute, false);
                    }
                  });
                }
              },
              createAttribute: function (model, id, name, options) {
                var defaults = {
                  enableAjaxValidation: true,
                  errorCssClass: "has-error",
                  errorID: id + '_em_',
                  hideErrorMessage: false,
                  id: id,
                  inputContainer: "div.form-group",
                  inputID: id,
                  model: model,
                  name: name,
                  status: 1,
                  successCssClass: 'has-success',
                  validateOnChange: true,
                  validateOnType: false,
                  validatingCssClass: 'validating',
                  validationDelay: 200
                };
                return $.extend({}, defaults, options);
              },
              /**
               * Updates the error messages and the input containers for all applicable attributes
               * @param $form the form jQuery object
               * @param messages array the validation error messages
               * @param submitting whether this method is called after validation triggered by form submission
               */
              updateInputs: function ($form, messages) {
                var data = $form.data('yiiActiveForm');

                if (data === undefined) {
                  return false;
                }

                $.each(data.attributes, function () {
                  main.yiiactiveform.updateInput($form, this, messages);
                });
              },
              /**
               * Updates the error message and the input container for a particular attribute.
               * @param $form the form jQuery object
               * @param attribute object the configuration for a particular attribute.
               * @param messages array the validation error messages
               * @return boolean whether there is a validation error for the specified attribute
               */
              updateInput: function ($form, attribute, messages) {
                var data = $form.data('yiiActiveForm'),
                  $input = main.yiiactiveform.findInput($form, attribute),
                  hasError = false;

                if (!$.isArray(messages[attribute.id])) {
                  messages[attribute.id] = [];
                }

                data.settings.successCssClass = ''; //disable successfully validated attributes highlight

                if ($input.length) {
                  hasError = messages[attribute.id].length > 0;
                  var $container = $form.find(attribute.container);
                  var $error = $container.find(attribute.error);
                  main.yiiactiveform.updateAriaInvalid($form, attribute, hasError);
                  if (hasError) {
                    if (attribute.encodeError) {
                      $error.text(messages[attribute.id][0]);
                    } else {
                      $error.html(messages[attribute.id][0]);
                    }
                    $container.removeClass(data.settings.validatingCssClass + ' ' + data.settings.successCssClass).addClass(data.settings.errorCssClass);
                  } else {
                    $error.empty();
                    $container.removeClass(data.settings.validatingCssClass + ' ' + data.settings.errorCssClass + ' ').addClass(data.settings.successCssClass);
                  }
                }
                return hasError;
              },
              findInput: function ($form, attribute) {
                var $input = $form.find(attribute.input);

                if ($input.length && $input[0].tagName.toLowerCase() === 'div') {
                  return $input.find('input');
                } else {
                  return $input;
                }
              },
              updateAriaInvalid: function ($form, attribute, hasError) {
                if (attribute.updateAriaInvalid) {
                  $form.find(attribute.input).attr('aria-invalid', hasError ? 'true' : 'false');
                }
              }
            };
          })(jQuery);

          main.search = (function () {

            return {
              init: function (config) {
                main.template.cache('search-widget-result-item', config.template);

                for (var iconName in config.iconList) {
                  main.template.cache('search-widget-type-' + iconName, config.iconList[iconName]);
                }

                for (var colorClass in config.colorList) {
                  main.template.cache('search-widget-color-class-' + colorClass, config.colorList[colorClass]);
                }

                var select2 = $('#' + config.id + '-search-box');

                select2.on('select2:select', function (e) {
                  $(this).val(null).trigger('change');

                  if (('showSearchResults' in e.params.data) && e.params.data.showSearchResults) {
                    modal.modalControl.call($('<a href="' + config.searchUrl + '?' + config.searchQuery + '=' + encodeURI(e.params.data.query) + '">'), {preventDefault: $.noop});
                    return;
                  }

                  $('#' + config.id + '-search-box + span input').val(e.params.data[config.resultTextParam]);

                  var widget = $('#' + config.id);
                  widget.find('.search-query').val(e.params.data[config.resultTextParam]);
                  widget.find('.search-model-id').val(e.params.data[config.resultModelIdParam]);
                  widget.find('.search-model-class').val(e.params.data[config.modelClassParam]);

                  widget.submit();
                });

                select2.on('select2:opening select2:closing', function (e) {
                  $(this).parents('.form-group').toggleClass('focused');
                });

                $(document).ready(function () {
                  var s2Api = select2.data('select2');
                  var oldDropDownPositionFunction = s2Api.dropdown._positionDropdown;

                  s2Api.dropdown._positionDropdown = function () {
                    oldDropDownPositionFunction.call(s2Api.dropdown);
                    var dropDownContainer = this.$dropdownContainer;
                    var width = $(document).width();

                    dropDownContainer.addClass('search-widget');
                    dropDownContainer.css('top', (dropDownContainer.offset().top + 3) + 'px');
                    dropDownContainer.css('left', (dropDownContainer.offset().left - 25) + 'px');
                    dropDownContainer.css('width', 'auto');

                    if (width > 992) {
                      dropDownContainer.css('width', '385px');
                    } else {
                      dropDownContainer.css('right', '36px');
                    }

                    this.$dropdown.attr('style', 'width: 100%; border-radius: 7px');
                  };

                  s2Api.dropdown._resizeDropdown = function () {
                    this.$dropdown.css({'width': '100%'});
                  };
                });

              }
            };
          })();

          main.template = (function () {
            var templateCache = {};


            return {
              cache: function (identifier, templateString) {
                templateCache[identifier] = _.template(templateString);
              },
              render: function (templateString, params) {
                var template = _.template(templateString);

                if (!params) {
                  params = {};
                }

                return template(params);
              },
              renderCached: function (templateIdentifier, params) {
                if (!(templateIdentifier in templateCache)) {
                  return '';
                }

                if (!params) {
                  params = {};
                }

                return templateCache[templateIdentifier](params);
              }
            }
          })();
        }
    }
});

