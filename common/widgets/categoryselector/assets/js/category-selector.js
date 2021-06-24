/*
 * Mewsoft Bootstrap iPod Style jQuery Drill Down Menu Plugin v1.0
 * Dr. Ahmed Amin Elsheshtawy ahmed@mewsoft.com, Ph.D.
 * Copyright (c) 2015 Mewsoft, www.mewsoft.com
 * https://github.com/mewsoft
 * http://www.mewsoft.com/
 *
 * Original jquery ui plugin code by:
 * DC jQuery Drill Down Menu - jQuery drill down ipod menu
 * Copyright (c) 2011 Design Chemical
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

(function ($) {

    $.fn.drilldown = function (options) {

        var defaults = {
            wrapper_class: 'drilldown panel panel-success',
            menu_class: 'drilldown-menu',
            submenu_class: 'nav ',
            parent_class: 'dd-parent',
            parent_class_link: 'dd-parent-a',
            active_class: 'active',
            active_parent_class: 'active-parent',
            header_class: 'breadcrumb-wrapper',
            header_list_class: 'breadcrumb',
            header_item_class: 'breadcrumb-item',
            class_selected: 'selected',
            margin_offset: 10,
            height_offset: 10,
            event_type: 'click',
            hover_delay: 300,
            speed: 'fast',
            save_state: false,
            show_count: false,
            count_class: 'dd-count',
            icon_class: 'fal fa-chevron-right float-right dd-icon',
            link_type: 'breadcrumb', //breadcrumb , link, backlink
            reset_text: '<span class="fal fa-home"></span>', // All
            default_text: 'Select Category',
            show_end_nodes: false, // drill to final empty nodes
            hide_empty: true, // hide empty menu when menu_height is set, header no effected
            menu_height: false, // '200px' , false for auto height
            show_header: false,
            header_tag: 'div',// h3
            header_tag_class: 'list-group-item active' // hidden list-group-item active
        };

        //call in the default options
        var options = $.extend(defaults, options);

        //act upon the element that is passed into the design
        return this.each(function (options) {

            var $ddObj = this;

            $($ddObj).addClass(defaults.menu_class);
            $($ddObj).addClass(defaults.submenu_class);
            $($ddObj).removeClass('d-none');

            var $wrapperObj = '<div class="' + defaults.wrapper_class + '" />';

            $($ddObj).wrap($wrapperObj);

            var $wrapper = $($ddObj).parent();

            var objIndex = $($wrapper).index('.' + defaults.wrapper_class);

            var idHeader = defaults.header_class + '-' + objIndex;
            var idWrapper = defaults.wrapper_class + '-' + objIndex;

            $($wrapper).attr('id', idWrapper);

            var $header = '<div id="' + idHeader + '" class="' + defaults.header_class + '"></div>';

            setUpDrilldown();
            resetDrilldown($ddObj, $wrapper);

            $(window).resize(function () {
                resizeDrilldown($ddObj, $wrapper);
            });

            $('li a', $ddObj).click(function (e) {

                $link = this;
                $activeLi = $(this).parent('li').stop();
                $siblingsLi = $($activeLi).siblings();

                // Drilldown action
                if ($('> ul', $activeLi).length || defaults.show_end_nodes) {
                    if ($($link).hasClass(defaults.active_class)) {
                        $('ul a', $activeLi).removeClass(defaults.active_class);
                        resetDrilldown($ddObj, $wrapper);
                    } else {
                        actionDrillDown($activeLi, $wrapper, $ddObj);
                    }
                }

                $($wrapper, $ddObj).scrollTop(0);

                // Prevent browsing to link if has child links
                if ($(this).next('ul').length > 0) {
                    e.preventDefault();
                    e.stopPropagation();

                    $($ddObj).find('.' + defaults.active_parent_class).removeClass(defaults.active_parent_class);
                    $($link).parentsUntil($ddObj, 'li').addClass(defaults.active_parent_class);
                    $($link).trigger('drilldown.parentclick');
                } else {
                    $($link).closest('ul').find('a.' + defaults.active_class).removeClass(defaults.active_class);
                    $($link).addClass(defaults.active_class);
                }

                $($link).trigger('drilldown.linklclick');

            });

            // Breadcrumbs
            $('#' + idHeader).on('click', 'a', function (e) {

                if ($(this).hasClass('link-back')) {
                    linkIndex = $('#' + idWrapper + ' .' + defaults.parent_class_link + '.active').length;
                    linkIndex = linkIndex - 2;
                    $('a.' + defaults.active_class + ':last', $ddObj).removeClass(defaults.active_class);
                } else {
                    // Get link index
                    var linkIndex = parseInt($(this).index('#' + idHeader + ' a'));
                    if (linkIndex == 0) {
                        $('a', $ddObj).removeClass(defaults.active_class);
                    } else {
                        // Select equivalent active link
                        linkIndex = linkIndex - 1;
                        $('a.' + defaults.active_class + ':gt(' + linkIndex + ')', $ddObj).removeClass(defaults.active_class);
                    }
                }

                resetDrilldown($ddObj, $wrapper);

                e.preventDefault();

                $($ddObj).trigger('drilldown.linklclick');
            });

            function setUpDrilldown() {

                // mewsoft
                $('ul', $ddObj).each(function () {
                    $(this).addClass(defaults.submenu_class);
                });

                $($ddObj).before($header);

                $arrow = '<span class="' + defaults.icon_class + '"></span>';

                // Get width of menu container & height of list item
                var menuWidth = $($ddObj).outerWidth(true);
                // menuWidth += 'px';

                var itemHeight = $('li', $ddObj).outerHeight(true);

                // Get height of largest sub menu
                var objUl = $('ul', $ddObj);
                var maxItems = findMaxHeight(objUl);

                // Get level of largest sub menu
                var maxUl = $('[rel="' + maxItems + '"]', objUl);
                var getIndex = findMaxIndex(maxUl);

                // Set menu container height
                if (defaults.link_type == 'link') {
                    menuHeight = itemHeight * (maxItems + getIndex);
                } else {
                    menuHeight = itemHeight * maxItems;
                }
                //-------------------------------
                var showObj = $('> ul', $wrapper);
                var itemCount = $('>li', showObj).length;
                var menuHeight = itemHeight * itemCount + defaults.height_offset;
                var menuHeightAll = itemHeight * itemCount + $($header).height() + defaults.height_offset;

                if (defaults.menu_height) {
                    $($wrapper).css({
                        height: defaults.menu_height,
                        width: menuWidth,
                        'overflow-y': 'auto',
                        'overflow-x': 'hidden'
                    });
                } else {
                    $($wrapper).css({height: menuHeightAll + 'px', width: menuWidth});
                }

                $($ddObj).css({height: menuHeight + 'px', width: menuWidth});
                //-------------------------------
                // Set sub menu width and offset
                var marginRight = -(menuWidth + defaults.margin_offset);
                $('li', $ddObj).each(function () {
                    $(this).css({width: menuWidth});
                    $('ul', this).css({width: menuWidth, marginRight: marginRight, marginTop: '0'});
                    if ($('> ul', this).length) {
                        $(this).addClass(defaults.parent_class);
                        $('> a', this).addClass(defaults.parent_class_link).append($arrow);
                        if (defaults.show_count == true) {
                            var parentLink = $('a:not(.' + defaults.parent_class_link + ')', this);
                            var countParent = parseInt($(parentLink).length);
                            getCount = countParent;
                            $('> a', this).append(' <span class="' + defaults.count_class + '">(' + getCount + ')</span>');
                        }
                    }
                });
                //-------------------------------
                // Add css class
                $('ul', $wrapper).each(function () {
                    $('li:last', this).addClass('last');
                });

                $('> ul > li:last', $wrapper).addClass('last');

                if (defaults.link_type == 'link') {
                    $(objUl).css('top', itemHeight + 'px');
                }
            }
        });
        //-------------------------------------------------

        function actionDrillDown(element, wrapper, obj) {
            // Declare header
            var $header = $('.' + defaults.header_class, wrapper);
            var getNewBreadcrumb = $(defaults.header_tag, $header).text();
            var getNewHeaderText = $('> a', element).text();

            // Add new breadcrumb
            if (defaults.link_type == 'breadcrumb') {
                if (!$('ul', $header).length) {
                    $($header).prepend('<ul class="' + defaults.header_list_class + '"></ul>');
                }
                if (getNewBreadcrumb == defaults.default_text) {
                    $('ul li:last-child', $header).remove();
                    $('ul', $header).append('<li class="first ' + defaults.header_item_class + '"><a href="#">' + defaults.reset_text + '</a></li>');
                } else {
                    $('ul li:last-child', $header).remove();
                    $('ul', $header).append('<li class="' + defaults.header_item_class + '"><a href="#">' + getNewBreadcrumb + '</a></li>');
                }
                $('ul', $header).append('<li class="active ' + defaults.header_item_class + '">' + getNewHeaderText + '</li>');
            }

            if (defaults.link_type == 'backlink') {
                if (!$('a', $header).length) {
                    $($header).prepend('<a href="#" class="link-back">' + getNewBreadcrumb + '</a>');
                } else {
                    $('.link-back', $header).html(getNewBreadcrumb);
                }
            }

            if (defaults.link_type == 'link') {
                if (!$('a', $header).length) {
                    $($header).prepend('<ul><li class="first"><a href="#">' + defaults.reset_text + '</a></li></ul>');
                }
            }

            // Update header text
            updateHeader($header, getNewHeaderText);

            // declare child link
            var activeLink = $('> a', element);

            // add active class to link
            $(activeLink).addClass(defaults.active_class);
            //-----------------------------------
            var showObj = $('> ul', element);
            var itemHeight = $(element).outerHeight(true);
            var itemCount = $('>li', showObj).length;
            var menuHeight = itemHeight * itemCount + defaults.height_offset;
            $(obj).css({height: menuHeight + 'px'});

            var headerHeight = $($header).outerHeight(true);
            var menuHeightAll = menuHeight + headerHeight + defaults.height_offset;

            if (defaults.menu_height) {
                if (defaults.hide_empty && !itemCount) {
                    $(wrapper).css({height: headerHeight, 'overflow-y': 'hidden', 'overflow-x': 'hidden'});
                } else {
                    $(wrapper).css({height: defaults.menu_height, 'overflow-y': 'auto', 'overflow-x': 'hidden'});
                }
            } else {
                $(wrapper).css({height: menuHeightAll + 'px'});
            }

            //-----------------------------------
            $('> ul li', element).show();
            $('> ul', element).animate({"margin-right": 0}, defaults.speed);

            // Find all sibling items & hide
            var $siblingsLi = $(element).siblings();
            $($siblingsLi).hide();

            // If using breadcrumbs hide this element
            if (defaults.link_type != 'link') {
                $(activeLink).hide();
            }


            $(obj).find('.' + defaults.active_parent_class).removeClass(defaults.active_parent_class);
            $(element).addClass(defaults.active_parent_class);
            $(element).parentsUntil(obj, 'li').addClass(defaults.active_parent_class);
        }

        function updateHeader(obj, html) {
            if (!$(defaults.header_tag, obj).length) {
                if (defaults.show_header == true) {
                    $(obj).append('<' + defaults.header_tag + ' class="' + defaults.header_tag_class + '"</' + defaults.header_tag + '>');
                } else {
                    $(obj).append('<' + defaults.header_tag + ' class="d-none ' + defaults.header_tag_class + '"</' + defaults.header_tag + '>');
                }
            }

            $(defaults.header_tag, obj).html(html);
        }

        function resetDrilldown(obj, wrapper) {
            var $header = $('.' + defaults.header_class, wrapper);
            $('ul', $header).remove();
            $('a', $header).remove();
            $('li', obj).show();
            $('a', obj).show();
            var menuWidth = $(obj).outerWidth(true);
            var marginRight = -(menuWidth + defaults.margin_offset);

            if (defaults.link_type == "link") {
                if ($('a.' + defaults.active_class + ':last', obj).parent('li').length) {
                    var lastActive = $('a.' + defaults.active_class + ':last', obj).parent('li');
                    $('ul', lastActive).css('margin-right', marginRight);
                } else {
                    $('ul', obj).css('margin-right', marginRight);
                }
            } else {
                $('ul', obj).css('margin-right', marginRight);
            }

            updateHeader($header, defaults.default_text);

            // Add new breadcrumb
            if (defaults.link_type == 'breadcrumb') {
                var getNewBreadcrumb = $(defaults.header_tag, $header).text(); // .html()
                if (!$('ul', $header).length) {
                    // edit mewsoft
                    $($header).prepend('<ul class="' + defaults.header_list_class + '"></ul>');
                }
                if (getNewBreadcrumb == defaults.default_text) {
                    // edit mewsoft
                    $('ul', $header).append('<li class="active ' + defaults.header_item_class + '">' + defaults.default_text + '</li>');
                }
            }

            var activeObj = obj;

            $('a.' + defaults.active_class, obj).each(function (i) {
                var $activeLi = $(this).parent('li').stop();
                actionDrillDown($activeLi, wrapper, obj);
                activeObj = $(this).parent('li');
            });

            //-----------------------------------
            var showObj;
            if ($('> ul', activeObj).length) {
                showObj = $('> ul', activeObj);
            } else {
                // root ul
                var showObj = activeObj;
            }

            $(obj).find('.' + defaults.active_parent_class).removeClass(defaults.active_parent_class);
            $(showObj).parentsUntil(obj, 'li').addClass(defaults.active_parent_class);
            // console.log('nada?', activeObj); return;

            var itemCount = $('>li', showObj).length;
            var itemHeight = $('li', showObj).outerHeight(true);
            var menuHeight = (itemHeight * itemCount) + defaults.height_offset;
            var headerHeight = $($header).outerHeight(true);
            var menuHeightAll = (itemHeight * itemCount) + headerHeight + defaults.height_offset;

            if (defaults.menu_height) {
                if (defaults.hide_empty && !itemCount) {
                    $(wrapper).css({height: headerHeight, 'overflow-y': 'hidden', 'overflow-x': 'hidden'});
                } else {
                    $(wrapper).css({height: defaults.menu_height, 'overflow-y': 'auto', 'overflow-x': 'hidden'});
                }
                $(obj).css({height: menuHeight + 'px'});
            } else {
                $(wrapper).css({height: menuHeightAll + 'px'});
                $(obj).css({height: menuHeight + 'px'});
            }

            //-----------------------------------
        }

        function resizeDrilldown($ddObj, $wrapper) {
            // set wrapper to auto width to force resize
            $($wrapper).css({width: 'auto'});
            $($ddObj).css({width: 'auto'});
            var menuWidth = $($wrapper).outerWidth(true);
            // menuWidth += 'px';
            var marginRight = -(menuWidth + defaults.margin_offset);
            $($wrapper).css({width: menuWidth});
            $($ddObj).css({width: menuWidth});
            $('li', $ddObj).each(function () {
                $(this).css({width: menuWidth});
                $('ul', this).css({width: menuWidth, marginRight: marginRight, marginTop: '0'});
            });
            resetDrilldown($ddObj, $wrapper);
        }

        function findMaxHeight(element) {
            var maxValue = undefined;
            $(element).each(function () {
                var val = parseInt($('> li', this).length);
                $(this).attr('rel', val);
                if (maxValue === undefined || maxValue < val) {
                    maxValue = val;
                }
            });
            return maxValue;
        }

        function findMaxIndex(element) {
            var maxIndex = undefined;
            $(element).each(function () {
                var val = parseInt($(this).parents('li').length);
                if (maxIndex === undefined || maxIndex < val) {
                    maxIndex = val;
                }
            });
            return maxIndex;
        }

    };
})(jQuery);
