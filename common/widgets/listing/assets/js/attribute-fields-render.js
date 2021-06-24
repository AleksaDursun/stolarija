
var AttributeFieldsRender = function(config) {
    this.defaults = {
        attributeContainerSelector: '.attribute-container',
        attributeItemSelector: '.attribute-item',
        attributeColumnWidthSelector: '.attribute-sizer',
    };
    this.options = $.extend({}, this.defaults, config);
};

AttributeFieldsRender.prototype.init = function() {
    this.initMasonry();
    this.initListeners();
};

AttributeFieldsRender.prototype.initMasonry = function() {
    var config = this.options;

    $(config.attributeContainerSelector).masonry({
        itemSelector: config.attributeItemSelector,
        columnWidth: config.attributeColumnWidthSelector,
        percentPosition: true
    });
};

AttributeFieldsRender.prototype.initListeners = function() {
    var self = this;
    var config = this.options;
    var attributeSelector = config.attributeContainerSelector + ' ' + config.attributeItemSelector;

    $(document).on('shown.bs.tab', function(event) {
        self.initMasonry();
    });

    $(attributeSelector + ' .form-control').on('change', function () {
        var self = $(this);
        var childAttribute = $('[data-scope-model='+ self.data('model') + ']');

        if (!self.val()) {
            childAttribute.attr('disabled', true);
            return;
        }

        var selectedChildOption = childAttribute.find('[data-id="' + childAttribute.val() + '"]');
        if (selectedChildOption.data('scope') != self.val()) {
            childAttribute.val('');
        }

        childAttribute.attr('disabled', false);
        childAttribute.find('.form-check').hide();
        childAttribute.find('[data-scope=' + self.val() + ']').closest('.form-check').show();

        childAttribute.find('option').hide();
        childAttribute.find('[value=""]').show();
        childAttribute.find('[data-scope=' + self.val() + ']').show();
    });

    $(attributeSelector + ' .form-check-input').on('change', function () {
        var self = $(this);
        var childAttribute = $('[data-scope-model='+ self.data('model') + ']');
        var checkedElements = self.closest('.list-container').find(':checked');

        childAttribute.find('option').hide();
        childAttribute.find('.form-check').hide();

        $.each(checkedElements, function(i, element) {
            childAttribute.find('[data-scope=' + $(element).data('id') + ']').show();
            childAttribute.find('[data-scope=' + $(element).data('id') + ']').closest('.form-check').show();
        });

    });

    $(attributeSelector + ' .form-control').trigger('change');
    $(attributeSelector + ' .form-check-input').trigger('change');
};
