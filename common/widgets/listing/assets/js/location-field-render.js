var locationFieldRender = (function ($) {
    return {
        options: {},
        initialize: function (config) {
            this.initOptions(config);
            this.initEventListeners();
        },
        initOptions: function (config) {
            var defaults = {
                addressToLatLngBtn: '#address-geo-locator',
                addressSelector: '#address-geo-locator',
                citySelector: '#address-geo-locator',
                stateSelector: '#address-geo-locator',
                zipSelector: '#address-geo-locator'
            };
            this.options = $.extend({}, defaults, config);
            this.options.map = window[this.options.mapId];
            this.options.marker = window[this.options.markerId];
        },
        initEventListeners: function () {
            var config = this.options;

            $(config.addressToLatLngBtn).on('click', function (e) {

                e.preventDefault();
                var btn = $(this);
                var data = {
                    address: $(config.addressSelector).val(),
                    city: $(config.citySelector).val(),
                    zip: $(config.zipSelector).val(),
                    state: $(config.stateSelector).val()
                };

                if (btn.hasClass('disabled')) {
                    return false;
                }

                main.ui.buttonLoading(btn, true);

                $.ajax({
                    url: '/location/lookup',
                    type: 'post',
                    data: data,
                    dataType: 'json',
                    success: function (data) {
                        if (data.success) {
                            updateLocationPin(data.results);
                        }

                        main.ui.notify(data.message, data.success ? 'success' : 'error');
                        main.ui.buttonLoading(btn, false);
                    },
                    error: function (XHR) {
                        main.ui.notify('Ooops, we maybe broke something :/', 'error');
                        main.ui.buttonLoading(btn, false);
                    }
                });

                function updateLocationPin(results) {
                    if (!results[0]) {
                        return;
                    }

                    config.marker.setPosition(results[0].geometry.location);
                    config.map.setCenter(results[0].geometry.location);

                    $(config.latSelector).val(results[0].geometry.location.lat);
                    $(config.lngSelector).val(results[0].geometry.location.lng);
                }
            });
        },
        updateAddress: function (location) {
            var config = this.options;
            var btn = $(config.addressToLatLngBtn);
            var hasAllAddressFields = $(config.addressSelector).val() &&
                $(config.stateSelector).val() &&
                $(config.citySelector).val() &&
                $(config.zipSelector).val();

            $(config.latSelector).val(location.lat());
            $(config.lngSelector).val(location.lng());

            if (hasAllAddressFields) {
                return;
            }

            main.ui.buttonLoading(btn, true);

            $.ajax({
                url: '/location/reverse',
                type: 'post',
                data: {
                    lat: location.lat(),
                    long: location.lng()
                },
                dataType: 'json',
                success: function (data) {
                    if (data.success) {
                        updateAddressFields(data.results);
                    }

                    main.ui.notify(data.message, data.success ? 'success' : 'error');
                    main.ui.buttonLoading(btn, false);
                },
                error: function (XHR) {
                    main.ui.notify('Ooops, we maybe broke something :/', 'error');
                    main.ui.buttonLoading(btn, false);
                }
            });

            function updateAddressFields(results) {
                if (!results[0]) {
                    return;
                }

                var address = getBestStreetAddressObject(results || []);

                if (!$(config.addressSelector).val()) {
                    $(config.addressSelector).val(address.street_number + ' ' + address.street);
                }

                if (!$(config.stateSelector).val()) {
                    $(config.stateSelector).val(address.region + ', ' + address.country);
                }

                if (!$(config.citySelector).val()) {
                    $(config.citySelector).val(address.city);
                }

                if (!$(config.zipSelector).val()) {
                    $(config.zipSelector).val(address.postal_code);
                }
            }

            function getBestStreetAddressObject(results) {
                var ShouldBeComponent = {
                    street_number: ["street_number"],
                    postal_code: ["postal_code"],
                    street: ["street_address", "route"],
                    region: [
                        "administrative_area_level_1",
                        "administrative_area_level_2",
                        "administrative_area_level_3",
                        "administrative_area_level_4",
                        "administrative_area_level_5"
                    ],
                    city: [
                        "locality",
                        "sublocality",
                        "sublocality_level_1",
                        "sublocality_level_2",
                        "sublocality_level_3",
                        "sublocality_level_4"
                    ],
                    country: ["country"]
                };
                var address = {
                    street_number: "",
                    postal_code: "",
                    street: "",
                    region: "",
                    city: "",
                    country: ""
                };

                var address_components = getStreetAddressComponents(results);

                address_components.forEach(component => {
                    for (var shouldBe in ShouldBeComponent) {
                        if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
                            if (shouldBe === "country") {
                                address[shouldBe] = component.short_name;
                            } else {
                                address[shouldBe] = component.long_name;
                            }
                        }
                    }
                });

                return address;
            }

            function getStreetAddressComponents(results) {
                var address_components = [];

                for (var result of results) {
                    for (var type of result.types) {
                        if (type === "street_address") {
                            address_components = result.address_components;
                            break;
                        }
                    }

                    if (address_components.length) {
                        break;
                    }
                }

                return address_components.length ? address_components : results[0].address_components;
            }
        }
    };
})(jQuery);



