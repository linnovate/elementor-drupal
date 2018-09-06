/*! elementor - v2.2.1 - 03-09-2018 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 167);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Module = __webpack_require__(2),
    ViewModule;

ViewModule = Module.extend({
	elements: null,

	getDefaultElements: function getDefaultElements() {
		return {};
	},

	bindEvents: function bindEvents() {},

	onInit: function onInit() {
		this.initElements();

		this.bindEvents();
	},

	initElements: function initElements() {
		this.elements = this.getDefaultElements();
	}
});

module.exports = ViewModule;

/***/ }),

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ViewModule = __webpack_require__(1);

module.exports = ViewModule.extend({

	getDefaultSettings: function getDefaultSettings() {
		return {
			container: null,
			items: null,
			columnsCount: 3,
			verticalSpaceBetween: 30
		};
	},

	getDefaultElements: function getDefaultElements() {
		return {
			$container: jQuery(this.getSettings('container')),
			$items: jQuery(this.getSettings('items'))
		};
	},

	run: function run() {
		var heights = [],
		    distanceFromTop = this.elements.$container.position().top,
		    settings = this.getSettings(),
		    columnsCount = settings.columnsCount;

		distanceFromTop += parseInt(this.elements.$container.css('margin-top'), 10);

		this.elements.$items.each(function (index) {
			var row = Math.floor(index / columnsCount),
			    $item = jQuery(this),
			    itemHeight = $item[0].getBoundingClientRect().height + settings.verticalSpaceBetween;

			if (row) {
				var itemPosition = $item.position(),
				    indexAtRow = index % columnsCount,
				    pullHeight = itemPosition.top - distanceFromTop - heights[indexAtRow];

				pullHeight -= parseInt($item.css('margin-top'), 10);

				pullHeight *= -1;

				$item.css('margin-top', pullHeight + 'px');

				heights[indexAtRow] += itemHeight;
			} else {
				heights.push(itemHeight);
			}
		});
	}
});

/***/ }),

/***/ 167:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global elementorFrontendConfig */
(function ($) {
	var elements = {},
	    EventManager = __webpack_require__(20),
	    Module = __webpack_require__(5),
	    ElementsHandler = __webpack_require__(168),
	    YouTubeModule = __webpack_require__(180),
	    AnchorsModule = __webpack_require__(181),
	    LightboxModule = __webpack_require__(182);

	var ElementorFrontend = function ElementorFrontend() {
		var self = this,
		    dialogsManager;

		this.config = elementorFrontendConfig;

		this.Module = Module;

		var setDeviceModeData = function setDeviceModeData() {
			elements.$body.attr('data-elementor-device-mode', self.getCurrentDeviceMode());
		};

		var initElements = function initElements() {
			elements.window = window;

			elements.$window = $(window);

			elements.$document = $(document);

			elements.$body = $('body');

			elements.$elementor = elements.$document.find('.elementor');

			elements.$wpAdminBar = elements.$document.find('#wpadminbar');
		};

		var bindEvents = function bindEvents() {
			elements.$window.on('resize', setDeviceModeData);
		};

		var initOnReadyComponents = function initOnReadyComponents() {
			self.utils = {
				youtube: new YouTubeModule(),
				anchors: new AnchorsModule(),
				lightbox: new LightboxModule()
			};

			self.modules = {
				StretchElement: __webpack_require__(183),
				Masonry: __webpack_require__(16)
			};

			self.elementsHandler = new ElementsHandler($);
		};

		var initHotKeys = function initHotKeys() {
			self.hotKeys = __webpack_require__(17);

			self.hotKeys.bindListener(elements.$window);
		};

		var getSiteSettings = function getSiteSettings(settingType, settingName) {
			var settingsObject = self.isEditMode() ? elementor.settings[settingType].model.attributes : self.config.settings[settingType];

			if (settingName) {
				return settingsObject[settingName];
			}

			return settingsObject;
		};

		var addIeCompatibility = function addIeCompatibility() {
			var isIE = 'Microsoft Internet Explorer' === navigator.appName || !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g) || !!navigator.userAgent.match(/rv:11/);

			if (!isIE) {
				return;
			}
			elements.$body.addClass('elementor-msie');

			var $frontendCss = jQuery('#elementor-frontend-css'),
			    msieCss = $frontendCss[0].outerHTML.replace('css/frontend', 'css/frontend-msie').replace('elementor-frontend-css', 'elementor-frontend-msie-css');

			$frontendCss.after(msieCss);
		};

		this.init = function () {
			self.hooks = new EventManager();

			initElements();

			addIeCompatibility();

			bindEvents();

			setDeviceModeData();

			elements.$window.trigger('elementor/frontend/init');

			if (!self.isEditMode()) {
				initHotKeys();
			}

			initOnReadyComponents();
		};

		this.getElements = function (element) {
			if (element) {
				return elements[element];
			}

			return elements;
		};

		this.getDialogsManager = function () {
			if (!dialogsManager) {
				dialogsManager = new DialogsManager.Instance();
			}

			return dialogsManager;
		};

		this.getPageSettings = function (settingName) {
			return getSiteSettings('page', settingName);
		};

		this.getGeneralSettings = function (settingName) {
			return getSiteSettings('general', settingName);
		};

		this.isEditMode = function () {
			return self.config.isEditMode;
		};

		// Based on underscore function
		this.throttle = function (func, wait) {
			var timeout,
			    context,
			    args,
			    result,
			    previous = 0;

			var later = function later() {
				previous = Date.now();
				timeout = null;
				result = func.apply(context, args);

				if (!timeout) {
					context = args = null;
				}
			};

			return function () {
				var now = Date.now(),
				    remaining = wait - (now - previous);

				context = this;
				args = arguments;

				if (remaining <= 0 || remaining > wait) {
					if (timeout) {
						clearTimeout(timeout);
						timeout = null;
					}

					previous = now;
					result = func.apply(context, args);

					if (!timeout) {
						context = args = null;
					}
				} else if (!timeout) {
					timeout = setTimeout(later, remaining);
				}

				return result;
			};
		};

		this.addListenerOnce = function (listenerID, event, callback, to) {
			if (!to) {
				to = self.getElements('$window');
			}

			if (!self.isEditMode()) {
				to.on(event, callback);

				return;
			}

			this.removeListeners(listenerID, event, to);

			if (to instanceof jQuery) {
				var eventNS = event + '.' + listenerID;

				to.on(eventNS, callback);
			} else {
				to.on(event, callback, listenerID);
			}
		};

		this.removeListeners = function (listenerID, event, callback, from) {
			if (!from) {
				from = self.getElements('$window');
			}

			if (from instanceof jQuery) {
				var eventNS = event + '.' + listenerID;

				from.off(eventNS, callback);
			} else {
				from.off(event, callback, listenerID);
			}
		};

		this.getCurrentDeviceMode = function () {
			return getComputedStyle(elements.$elementor[0], ':after').content.replace(/"/g, '');
		};

		this.waypoint = function ($element, callback, options) {
			var defaultOptions = {
				offset: '100%',
				triggerOnce: true
			};

			options = $.extend(defaultOptions, options);

			var correctCallback = function correctCallback() {
				var element = this.element || this,
				    result = callback.apply(element, arguments);

				// If is Waypoint new API and is frontend
				if (options.triggerOnce && this.destroy) {
					this.destroy();
				}

				return result;
			};

			return $element.elementorWaypoint(correctCallback, options);
		};
	};

	window.elementorFrontend = new ElementorFrontend();
})(jQuery);

if (!elementorFrontend.isEditMode()) {
	jQuery(elementorFrontend.init);
}

/***/ }),

/***/ 168:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ElementsHandler;

ElementsHandler = function ElementsHandler($) {
	var self = this;

	// element-type.skin-type
	var handlers = {
		// Elements
		'section': __webpack_require__(169),

		// Widgets
		'accordion.default': __webpack_require__(170),
		'alert.default': __webpack_require__(171),
		'counter.default': __webpack_require__(172),
		'progress.default': __webpack_require__(173),
		'tabs.default': __webpack_require__(174),
		'toggle.default': __webpack_require__(175),
		'video.default': __webpack_require__(176),
		'image-carousel.default': __webpack_require__(177),
		'text-editor.default': __webpack_require__(178)
	};

	var addGlobalHandlers = function addGlobalHandlers() {
		elementorFrontend.hooks.addAction('frontend/element_ready/global', __webpack_require__(179));
	};

	var addElementsHandlers = function addElementsHandlers() {
		$.each(handlers, function (elementName, funcCallback) {
			elementorFrontend.hooks.addAction('frontend/element_ready/' + elementName, funcCallback);
		});
	};

	var runElementsHandlers = function runElementsHandlers() {
		var $elements;

		if (elementorFrontend.isEditMode()) {
			// Elements outside from the Preview
			$elements = jQuery('.elementor-element', '.elementor:not(.elementor-edit-mode)');
		} else {
			$elements = $('.elementor-element');
		}

		$elements.each(function () {
			self.runReadyTrigger($(this));
		});
	};

	var init = function init() {
		if (!elementorFrontend.isEditMode()) {
			self.initHandlers();
		}
	};

	this.initHandlers = function () {
		addGlobalHandlers();

		addElementsHandlers();

		runElementsHandlers();
	};

	this.getHandlers = function (handlerName) {
		if (handlerName) {
			return handlers[handlerName];
		}

		return handlers;
	};

	this.runReadyTrigger = function ($scope) {
		var elementType = $scope.attr('data-element_type');

		if (!elementType) {
			return;
		}

		// Initializing the `$scope` as frontend jQuery instance
		$scope = jQuery($scope);

		elementorFrontend.hooks.doAction('frontend/element_ready/global', $scope, $);

		var isWidgetType = -1 === ['section', 'column'].indexOf(elementType);

		if (isWidgetType) {
			elementorFrontend.hooks.doAction('frontend/element_ready/widget', $scope, $);
		}

		elementorFrontend.hooks.doAction('frontend/element_ready/' + elementType, $scope, $);
	};

	init();
};

module.exports = ElementsHandler;

/***/ }),

/***/ 169:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var HandlerModule = __webpack_require__(5);

var BackgroundVideo = HandlerModule.extend({
	player: null,

	isYTVideo: null,

	getDefaultSettings: function getDefaultSettings() {
		return {
			selectors: {
				backgroundVideoContainer: '.elementor-background-video-container',
				backgroundVideoEmbed: '.elementor-background-video-embed',
				backgroundVideoHosted: '.elementor-background-video-hosted'
			}
		};
	},

	getDefaultElements: function getDefaultElements() {
		var selectors = this.getSettings('selectors'),
		    elements = {
			$backgroundVideoContainer: this.$element.find(selectors.backgroundVideoContainer)
		};

		elements.$backgroundVideoEmbed = elements.$backgroundVideoContainer.children(selectors.backgroundVideoEmbed);

		elements.$backgroundVideoHosted = elements.$backgroundVideoContainer.children(selectors.backgroundVideoHosted);

		return elements;
	},

	calcVideosSize: function calcVideosSize() {
		var containerWidth = this.elements.$backgroundVideoContainer.outerWidth(),
		    containerHeight = this.elements.$backgroundVideoContainer.outerHeight(),
		    aspectRatioSetting = '16:9',
		    //TEMP
		aspectRatioArray = aspectRatioSetting.split(':'),
		    aspectRatio = aspectRatioArray[0] / aspectRatioArray[1],
		    ratioWidth = containerWidth / aspectRatio,
		    ratioHeight = containerHeight * aspectRatio,
		    isWidthFixed = containerWidth / containerHeight > aspectRatio;

		return {
			width: isWidthFixed ? containerWidth : ratioHeight,
			height: isWidthFixed ? ratioWidth : containerHeight
		};
	},

	changeVideoSize: function changeVideoSize() {
		var $video = this.isYTVideo ? jQuery(this.player.getIframe()) : this.elements.$backgroundVideoHosted,
		    size = this.calcVideosSize();

		$video.width(size.width).height(size.height);
	},

	startVideoLoop: function startVideoLoop() {
		var self = this;

		// If the section has been removed
		if (!self.player.getIframe().contentWindow) {
			return;
		}

		var elementSettings = self.getElementSettings(),
		    startPoint = elementSettings.background_video_start || 0,
		    endPoint = elementSettings.background_video_end;

		self.player.seekTo(startPoint);

		if (endPoint) {
			var durationToEnd = endPoint - startPoint + 1;

			setTimeout(function () {
				self.startVideoLoop();
			}, durationToEnd * 1000);
		}
	},

	prepareYTVideo: function prepareYTVideo(YT, videoID) {
		var self = this,
		    $backgroundVideoContainer = self.elements.$backgroundVideoContainer,
		    elementSettings = self.getElementSettings(),
		    startStateCode = YT.PlayerState.PLAYING;

		// Since version 67, Chrome doesn't fire the `PLAYING` state at start time
		if (window.chrome) {
			startStateCode = YT.PlayerState.UNSTARTED;
		}

		$backgroundVideoContainer.addClass('elementor-loading elementor-invisible');

		self.player = new YT.Player(self.elements.$backgroundVideoEmbed[0], {
			videoId: videoID,
			events: {
				onReady: function onReady() {
					self.player.mute();

					self.changeVideoSize();

					self.startVideoLoop();

					self.player.playVideo();
				},
				onStateChange: function onStateChange(event) {
					switch (event.data) {
						case startStateCode:
							$backgroundVideoContainer.removeClass('elementor-invisible elementor-loading');

							break;
						case YT.PlayerState.ENDED:
							self.player.seekTo(elementSettings.background_video_start || 0);
					}
				}
			},
			playerVars: {
				controls: 0,
				showinfo: 0,
				rel: 0
			}
		});

		elementorFrontend.getElements('$window').on('resize', self.changeVideoSize);
	},

	activate: function activate() {
		var self = this,
		    videoLink = self.getElementSettings('background_video_link'),
		    videoID = elementorFrontend.utils.youtube.getYoutubeIDFromURL(videoLink);

		self.isYTVideo = !!videoID;

		if (videoID) {
			elementorFrontend.utils.youtube.onYoutubeApiReady(function (YT) {
				setTimeout(function () {
					self.prepareYTVideo(YT, videoID);
				}, 1);
			});
		} else {
			self.elements.$backgroundVideoHosted.attr('src', videoLink).one('canplay', self.changeVideoSize);
		}
	},

	deactivate: function deactivate() {
		if (this.isYTVideo && this.player.getIframe()) {
			this.player.destroy();
		} else {
			this.elements.$backgroundVideoHosted.removeAttr('src');
		}
	},

	run: function run() {
		var elementSettings = this.getElementSettings();

		if ('video' === elementSettings.background_background && elementSettings.background_video_link) {
			this.activate();
		} else {
			this.deactivate();
		}
	},

	onInit: function onInit() {
		HandlerModule.prototype.onInit.apply(this, arguments);

		this.run();
	},

	onElementChange: function onElementChange(propertyName) {
		if ('background_background' === propertyName) {
			this.run();
		}
	}
});

var StretchedSection = HandlerModule.extend({

	stretchElement: null,

	bindEvents: function bindEvents() {
		var handlerID = this.getUniqueHandlerID();

		elementorFrontend.addListenerOnce(handlerID, 'resize', this.stretch);

		elementorFrontend.addListenerOnce(handlerID, 'sticky:stick', this.stretch, this.$element);

		elementorFrontend.addListenerOnce(handlerID, 'sticky:unstick', this.stretch, this.$element);
	},

	unbindEvents: function unbindEvents() {
		elementorFrontend.removeListeners(this.getUniqueHandlerID(), 'resize', this.stretch);
	},

	initStretch: function initStretch() {
		this.stretchElement = new elementorFrontend.modules.StretchElement({
			element: this.$element,
			selectors: {
				container: this.getStretchContainer()
			}
		});
	},

	getStretchContainer: function getStretchContainer() {
		return elementorFrontend.getGeneralSettings('elementor_stretched_section_container') || window;
	},

	stretch: function stretch() {
		if (!this.getElementSettings('stretch_section')) {
			return;
		}

		this.stretchElement.stretch();
	},

	onInit: function onInit() {
		HandlerModule.prototype.onInit.apply(this, arguments);

		this.initStretch();

		this.stretch();
	},

	onElementChange: function onElementChange(propertyName) {
		if ('stretch_section' === propertyName) {
			if (this.getElementSettings('stretch_section')) {
				this.stretch();
			} else {
				this.stretchElement.reset();
			}
		}
	},

	onGeneralSettingsChange: function onGeneralSettingsChange(changed) {
		if ('elementor_stretched_section_container' in changed) {
			this.stretchElement.setSettings('selectors.container', this.getStretchContainer());

			this.stretch();
		}
	}
});

var Shapes = HandlerModule.extend({

	getDefaultSettings: function getDefaultSettings() {
		return {
			selectors: {
				container: '> .elementor-shape-%s'
			},
			svgURL: elementorFrontend.config.urls.assets + 'shapes/'
		};
	},

	getDefaultElements: function getDefaultElements() {
		var elements = {},
		    selectors = this.getSettings('selectors');

		elements.$topContainer = this.$element.find(selectors.container.replace('%s', 'top'));

		elements.$bottomContainer = this.$element.find(selectors.container.replace('%s', 'bottom'));

		return elements;
	},

	buildSVG: function buildSVG(side) {
		var self = this,
		    baseSettingKey = 'shape_divider_' + side,
		    shapeType = self.getElementSettings(baseSettingKey),
		    $svgContainer = this.elements['$' + side + 'Container'];

		$svgContainer.empty().attr('data-shape', shapeType);

		if (!shapeType) {
			return;
		}

		var fileName = shapeType;

		if (self.getElementSettings(baseSettingKey + '_negative')) {
			fileName += '-negative';
		}

		var svgURL = self.getSettings('svgURL') + fileName + '.svg';

		jQuery.get(svgURL, function (data) {
			$svgContainer.append(data.childNodes[0]);
		});

		this.setNegative(side);
	},

	setNegative: function setNegative(side) {
		this.elements['$' + side + 'Container'].attr('data-negative', !!this.getElementSettings('shape_divider_' + side + '_negative'));
	},

	onInit: function onInit() {
		var self = this;

		HandlerModule.prototype.onInit.apply(self, arguments);

		['top', 'bottom'].forEach(function (side) {
			if (self.getElementSettings('shape_divider_' + side)) {
				self.buildSVG(side);
			}
		});
	},

	onElementChange: function onElementChange(propertyName) {
		var shapeChange = propertyName.match(/^shape_divider_(top|bottom)$/);

		if (shapeChange) {
			this.buildSVG(shapeChange[1]);

			return;
		}

		var negativeChange = propertyName.match(/^shape_divider_(top|bottom)_negative$/);

		if (negativeChange) {
			this.buildSVG(negativeChange[1]);

			this.setNegative(negativeChange[1]);
		}
	}
});

var HandlesPosition = HandlerModule.extend({

	isFirst: function isFirst() {
		return this.$element.is('.elementor-edit-mode .elementor-top-section:first');
	},

	getOffset: function getOffset() {
		return this.$element.offset().top;
	},

	setHandlesPosition: function setHandlesPosition() {
		var self = this;

		if (self.isFirst()) {
			var offset = self.getOffset(),
			    $handlesElement = self.$element.find('> .elementor-element-overlay > .elementor-editor-section-settings'),
			    insideHandleClass = 'elementor-section--handles-inside';

			if (offset < 25) {
				self.$element.addClass(insideHandleClass);

				if (offset < -5) {
					$handlesElement.css('top', -offset);
				} else {
					$handlesElement.css('top', '');
				}
			} else {
				self.$element.removeClass(insideHandleClass);
			}
		}
	},

	onInit: function onInit() {
		this.setHandlesPosition();
		this.$element.on('mouseenter', this.setHandlesPosition);
	}
});

module.exports = function ($scope) {
	if (elementorFrontend.isEditMode() || $scope.hasClass('elementor-section-stretched')) {
		new StretchedSection({ $element: $scope });
	}

	if (elementorFrontend.isEditMode()) {
		new Shapes({ $element: $scope });
		new HandlesPosition({ $element: $scope });
	}

	new BackgroundVideo({ $element: $scope });
};

/***/ }),

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var HotKeys = function HotKeys() {
	var hotKeysHandlers = {};

	var applyHotKey = function applyHotKey(event) {
		var handlers = hotKeysHandlers[event.which];

		if (!handlers) {
			return;
		}

		jQuery.each(handlers, function () {
			var handler = this;

			if (handler.isWorthHandling && !handler.isWorthHandling(event)) {
				return;
			}

			// Fix for some keyboard sources that consider alt key as ctrl key
			if (!handler.allowAltKey && event.altKey) {
				return;
			}

			event.preventDefault();

			handler.handle(event);
		});
	};

	this.isControlEvent = function (event) {
		return event[elementor.envData.mac ? 'metaKey' : 'ctrlKey'];
	};

	this.addHotKeyHandler = function (keyCode, handlerName, handler) {
		if (!hotKeysHandlers[keyCode]) {
			hotKeysHandlers[keyCode] = {};
		}

		hotKeysHandlers[keyCode][handlerName] = handler;
	};

	this.bindListener = function ($listener) {
		$listener.on('keydown', applyHotKey);
	};
};

module.exports = new HotKeys();

/***/ }),

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TabsModule = __webpack_require__(22);

module.exports = function ($scope) {
	new TabsModule({
		$element: $scope,
		showTabFn: 'slideDown',
		hideTabFn: 'slideUp'
	});
};

/***/ }),

/***/ 171:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function ($scope, $) {
	$scope.find('.elementor-alert-dismiss').on('click', function () {
		$(this).parent().fadeOut();
	});
};

/***/ }),

/***/ 172:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function ($scope, $) {
	elementorFrontend.waypoint($scope.find('.elementor-counter-number'), function () {
		var $number = $(this),
		    data = $number.data();

		var decimalDigits = data.toValue.toString().match(/\.(.*)/);

		if (decimalDigits) {
			data.rounding = decimalDigits[1].length;
		}

		$number.numerator(data);
	});
};

/***/ }),

/***/ 173:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function ($scope, $) {
	elementorFrontend.waypoint($scope.find('.elementor-progress-bar'), function () {
		var $progressbar = $(this);

		$progressbar.css('width', $progressbar.data('max') + '%');
	});
};

/***/ }),

/***/ 174:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TabsModule = __webpack_require__(22);

module.exports = function ($scope) {
	new TabsModule({
		$element: $scope,
		toggleSelf: false
	});
};

/***/ }),

/***/ 175:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TabsModule = __webpack_require__(22);

module.exports = function ($scope) {
	new TabsModule({
		$element: $scope,
		showTabFn: 'slideDown',
		hideTabFn: 'slideUp',
		hidePrevious: false,
		autoExpand: 'editor'
	});
};

/***/ }),

/***/ 176:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var HandlerModule = __webpack_require__(5),
    VideoModule;

VideoModule = HandlerModule.extend({
	getDefaultSettings: function getDefaultSettings() {
		return {
			selectors: {
				imageOverlay: '.elementor-custom-embed-image-overlay',
				video: '.elementor-video',
				videoIframe: '.elementor-video-iframe'
			}
		};
	},

	getDefaultElements: function getDefaultElements() {
		var selectors = this.getSettings('selectors');

		return {
			$imageOverlay: this.$element.find(selectors.imageOverlay),
			$video: this.$element.find(selectors.video),
			$videoIframe: this.$element.find(selectors.videoIframe)
		};
	},

	getLightBox: function getLightBox() {
		return elementorFrontend.utils.lightbox;
	},

	handleVideo: function handleVideo() {
		if (!this.getElementSettings('lightbox')) {
			this.elements.$imageOverlay.remove();

			this.playVideo();
		}
	},

	playVideo: function playVideo() {
		if (this.elements.$video.length) {
			this.elements.$video[0].play();

			return;
		}

		var $videoIframe = this.elements.$videoIframe,
		    lazyLoad = $videoIframe.data('lazy-load');

		if (lazyLoad) {
			$videoIframe.attr('src', lazyLoad);
		}

		var newSourceUrl = $videoIframe[0].src.replace('&autoplay=0', '');

		$videoIframe[0].src = newSourceUrl + '&autoplay=1';
	},

	animateVideo: function animateVideo() {
		this.getLightBox().setEntranceAnimation(this.getElementSettings('lightbox_content_animation'));
	},

	handleAspectRatio: function handleAspectRatio() {
		this.getLightBox().setVideoAspectRatio(this.getElementSettings('aspect_ratio'));
	},

	bindEvents: function bindEvents() {
		this.elements.$imageOverlay.on('click', this.handleVideo);
	},

	onElementChange: function onElementChange(propertyName) {
		if ('lightbox_content_animation' === propertyName) {
			this.animateVideo();

			return;
		}

		var isLightBoxEnabled = this.getElementSettings('lightbox');

		if ('lightbox' === propertyName && !isLightBoxEnabled) {
			this.getLightBox().getModal().hide();

			return;
		}

		if ('aspect_ratio' === propertyName && isLightBoxEnabled) {
			this.handleAspectRatio();
		}
	}
});

module.exports = function ($scope) {
	new VideoModule({ $element: $scope });
};

/***/ }),

/***/ 177:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var HandlerModule = __webpack_require__(5),
    ImageCarouselHandler;

ImageCarouselHandler = HandlerModule.extend({
	getDefaultSettings: function getDefaultSettings() {
		return {
			selectors: {
				carousel: '.elementor-image-carousel'
			}
		};
	},

	getDefaultElements: function getDefaultElements() {
		var selectors = this.getSettings('selectors');

		return {
			$carousel: this.$element.find(selectors.carousel)
		};
	},

	onInit: function onInit() {
		HandlerModule.prototype.onInit.apply(this, arguments);

		var elementSettings = this.getElementSettings(),
		    slidesToShow = +elementSettings.slides_to_show || 3,
		    isSingleSlide = 1 === slidesToShow,
		    breakpoints = elementorFrontend.config.breakpoints;

		var slickOptions = {
			slidesToShow: slidesToShow,
			autoplay: 'yes' === elementSettings.autoplay,
			autoplaySpeed: elementSettings.autoplay_speed,
			infinite: 'yes' === elementSettings.infinite,
			pauseOnHover: 'yes' === elementSettings.pause_on_hover,
			speed: elementSettings.speed,
			arrows: -1 !== ['arrows', 'both'].indexOf(elementSettings.navigation),
			dots: -1 !== ['dots', 'both'].indexOf(elementSettings.navigation),
			rtl: 'rtl' === elementSettings.direction,
			responsive: [{
				breakpoint: breakpoints.lg,
				settings: {
					slidesToShow: +elementSettings.slides_to_show_tablet || (isSingleSlide ? 1 : 2),
					slidesToScroll: 1
				}
			}, {
				breakpoint: breakpoints.md,
				settings: {
					slidesToShow: +elementSettings.slides_to_show_mobile || 1,
					slidesToScroll: 1
				}
			}]
		};

		if (isSingleSlide) {
			slickOptions.fade = 'fade' === elementSettings.effect;
		} else {
			slickOptions.slidesToScroll = +elementSettings.slides_to_scroll;
		}

		this.elements.$carousel.slick(slickOptions);
	}
});

module.exports = function ($scope) {
	new ImageCarouselHandler({ $element: $scope });
};

/***/ }),

/***/ 178:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var HandlerModule = __webpack_require__(5),
    TextEditor;

TextEditor = HandlerModule.extend({
	dropCapLetter: '',

	getDefaultSettings: function getDefaultSettings() {
		return {
			selectors: {
				paragraph: 'p:first'
			},
			classes: {
				dropCap: 'elementor-drop-cap',
				dropCapLetter: 'elementor-drop-cap-letter'
			}
		};
	},

	getDefaultElements: function getDefaultElements() {
		var selectors = this.getSettings('selectors'),
		    classes = this.getSettings('classes'),
		    $dropCap = jQuery('<span>', { 'class': classes.dropCap }),
		    $dropCapLetter = jQuery('<span>', { 'class': classes.dropCapLetter });

		$dropCap.append($dropCapLetter);

		return {
			$paragraph: this.$element.find(selectors.paragraph),
			$dropCap: $dropCap,
			$dropCapLetter: $dropCapLetter
		};
	},

	getElementName: function getElementName() {
		return 'text-editor';
	},

	wrapDropCap: function wrapDropCap() {
		var isDropCapEnabled = this.getElementSettings('drop_cap');

		if (!isDropCapEnabled) {
			// If there is an old drop cap inside the paragraph
			if (this.dropCapLetter) {
				this.elements.$dropCap.remove();

				this.elements.$paragraph.prepend(this.dropCapLetter);

				this.dropCapLetter = '';
			}

			return;
		}

		var $paragraph = this.elements.$paragraph;

		if (!$paragraph.length) {
			return;
		}

		var paragraphContent = $paragraph.html().replace(/&nbsp;/g, ' '),
		    firstLetterMatch = paragraphContent.match(/^ *([^ ] ?)/);

		if (!firstLetterMatch) {
			return;
		}

		var firstLetter = firstLetterMatch[1],
		    trimmedFirstLetter = firstLetter.trim();

		// Don't apply drop cap when the content starting with an HTML tag
		if ('<' === trimmedFirstLetter) {
			return;
		}

		this.dropCapLetter = firstLetter;

		this.elements.$dropCapLetter.text(trimmedFirstLetter);

		var restoredParagraphContent = paragraphContent.slice(firstLetter.length).replace(/^ */, function (match) {
			return new Array(match.length + 1).join('&nbsp;');
		});

		$paragraph.html(restoredParagraphContent).prepend(this.elements.$dropCap);
	},

	onInit: function onInit() {
		HandlerModule.prototype.onInit.apply(this, arguments);

		this.wrapDropCap();
	},

	onElementChange: function onElementChange(propertyName) {
		if ('drop_cap' === propertyName) {
			this.wrapDropCap();
		}
	}
});

module.exports = function ($scope) {
	new TextEditor({ $element: $scope });
};

/***/ }),

/***/ 179:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var HandlerModule = __webpack_require__(5),
    GlobalHandler;

GlobalHandler = HandlerModule.extend({
	getElementName: function getElementName() {
		return 'global';
	},
	animate: function animate() {
		var $element = this.$element,
		    animation = this.getAnimation(),
		    elementSettings = this.getElementSettings(),
		    animationDelay = elementSettings._animation_delay || elementSettings.animation_delay || 0;

		$element.removeClass(animation);

		setTimeout(function () {
			$element.removeClass('elementor-invisible').addClass(animation);
		}, animationDelay);
	},
	getAnimation: function getAnimation() {
		var elementSettings = this.getElementSettings();

		return elementSettings.animation || elementSettings._animation;
	},
	onInit: function onInit() {
		HandlerModule.prototype.onInit.apply(this, arguments);

		var animation = this.getAnimation();

		if (!animation) {
			return;
		}

		this.$element.removeClass(animation);

		elementorFrontend.waypoint(this.$element, this.animate.bind(this));
	},
	onElementChange: function onElementChange(propertyName) {
		if (/^_?animation/.test(propertyName)) {
			this.animate();
		}
	}
});

module.exports = function ($scope) {
	new GlobalHandler({ $element: $scope });
};

/***/ }),

/***/ 180:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ViewModule = __webpack_require__(1);

module.exports = ViewModule.extend({
	getDefaultSettings: function getDefaultSettings() {
		return {
			isInserted: false,
			APISrc: 'https://www.youtube.com/iframe_api',
			selectors: {
				firstScript: 'script:first'
			}
		};
	},

	getDefaultElements: function getDefaultElements() {
		return {
			$firstScript: jQuery(this.getSettings('selectors.firstScript'))
		};
	},

	insertYTAPI: function insertYTAPI() {
		this.setSettings('isInserted', true);

		this.elements.$firstScript.before(jQuery('<script>', { src: this.getSettings('APISrc') }));
	},

	onYoutubeApiReady: function onYoutubeApiReady(callback) {
		var self = this;

		if (!self.getSettings('IsInserted')) {
			self.insertYTAPI();
		}

		if (window.YT && YT.loaded) {
			callback(YT);
		} else {
			// If not ready check again by timeout..
			setTimeout(function () {
				self.onYoutubeApiReady(callback);
			}, 350);
		}
	},

	getYoutubeIDFromURL: function getYoutubeIDFromURL(url) {
		var videoIDParts = url.match(/^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?vi?=|(?:embed|v|vi|user)\/))([^?&"'>]+)/);

		return videoIDParts && videoIDParts[1];
	}
});

/***/ }),

/***/ 181:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ViewModule = __webpack_require__(1);

module.exports = ViewModule.extend({
	getDefaultSettings: function getDefaultSettings() {
		return {
			scrollDuration: 500,
			selectors: {
				links: 'a[href*="#"]',
				targets: '.elementor-element, .elementor-menu-anchor',
				scrollable: 'html, body'
			}
		};
	},

	getDefaultElements: function getDefaultElements() {
		var $ = jQuery,
		    selectors = this.getSettings('selectors');

		return {
			$scrollable: $(selectors.scrollable)
		};
	},

	bindEvents: function bindEvents() {
		elementorFrontend.getElements('$document').on('click', this.getSettings('selectors.links'), this.handleAnchorLinks);
	},

	handleAnchorLinks: function handleAnchorLinks(event) {
		var clickedLink = event.currentTarget,
		    isSamePathname = location.pathname === clickedLink.pathname,
		    isSameHostname = location.hostname === clickedLink.hostname;

		if (!isSameHostname || !isSamePathname || clickedLink.hash.length < 2) {
			return;
		}

		var $anchor = jQuery(clickedLink.hash).filter(this.getSettings('selectors.targets'));

		if (!$anchor.length) {
			return;
		}

		var scrollTop = $anchor.offset().top,
		    $wpAdminBar = elementorFrontend.getElements('$wpAdminBar'),
		    $activeStickies = jQuery('.elementor-sticky--active'),
		    maxStickyHeight = 0;

		if ($wpAdminBar.length > 0) {
			scrollTop -= $wpAdminBar.height();
		}

		// Offset height of tallest sticky
		if ($activeStickies.length > 0) {
			maxStickyHeight = Math.max.apply(null, $activeStickies.map(function () {
				return jQuery(this).outerHeight();
			}).get());

			scrollTop -= maxStickyHeight;
		}

		event.preventDefault();

		scrollTop = elementorFrontend.hooks.applyFilters('frontend/handlers/menu_anchor/scroll_top_distance', scrollTop);

		this.elements.$scrollable.animate({
			scrollTop: scrollTop
		}, this.getSettings('scrollDuration'), 'linear');
	},

	onInit: function onInit() {
		ViewModule.prototype.onInit.apply(this, arguments);

		this.bindEvents();
	}
});

/***/ }),

/***/ 182:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ViewModule = __webpack_require__(1),
    LightboxModule;

LightboxModule = ViewModule.extend({
	oldAspectRatio: null,

	oldAnimation: null,

	swiper: null,

	getDefaultSettings: function getDefaultSettings() {
		return {
			classes: {
				aspectRatio: 'elementor-aspect-ratio-%s',
				item: 'elementor-lightbox-item',
				image: 'elementor-lightbox-image',
				videoContainer: 'elementor-video-container',
				videoWrapper: 'elementor-fit-aspect-ratio',
				playButton: 'elementor-custom-embed-play',
				playButtonIcon: 'fa',
				playing: 'elementor-playing',
				hidden: 'elementor-hidden',
				invisible: 'elementor-invisible',
				preventClose: 'elementor-lightbox-prevent-close',
				slideshow: {
					container: 'swiper-container',
					slidesWrapper: 'swiper-wrapper',
					prevButton: 'elementor-swiper-button elementor-swiper-button-prev',
					nextButton: 'elementor-swiper-button elementor-swiper-button-next',
					prevButtonIcon: 'eicon-chevron-left',
					nextButtonIcon: 'eicon-chevron-right',
					slide: 'swiper-slide'
				}
			},
			selectors: {
				links: 'a, [data-elementor-lightbox]',
				slideshow: {
					activeSlide: '.swiper-slide-active',
					prevSlide: '.swiper-slide-prev',
					nextSlide: '.swiper-slide-next'
				}
			},
			modalOptions: {
				id: 'elementor-lightbox',
				entranceAnimation: 'zoomIn',
				videoAspectRatio: 169,
				position: {
					enable: false
				}
			}
		};
	},

	getModal: function getModal() {
		if (!LightboxModule.modal) {
			this.initModal();
		}

		return LightboxModule.modal;
	},

	initModal: function initModal() {
		var modal = LightboxModule.modal = elementorFrontend.getDialogsManager().createWidget('lightbox', {
			className: 'elementor-lightbox',
			closeButton: true,
			closeButtonClass: 'eicon-close',
			selectors: {
				preventClose: '.' + this.getSettings('classes.preventClose')
			},
			hide: {
				onClick: true
			}
		});

		modal.on('hide', function () {
			modal.setMessage('');
		});
	},

	showModal: function showModal(options) {
		var self = this,
		    defaultOptions = self.getDefaultSettings().modalOptions;

		self.setSettings('modalOptions', jQuery.extend(defaultOptions, options.modalOptions));

		var modal = self.getModal();

		modal.setID(self.getSettings('modalOptions.id'));

		modal.onShow = function () {
			DialogsManager.getWidgetType('lightbox').prototype.onShow.apply(modal, arguments);

			setTimeout(function () {
				self.setEntranceAnimation();
			}, 10);
		};

		modal.onHide = function () {
			DialogsManager.getWidgetType('lightbox').prototype.onHide.apply(modal, arguments);

			modal.getElements('widgetContent').removeClass('animated');
		};

		switch (options.type) {
			case 'image':
				self.setImageContent(options.url);

				break;
			case 'video':
				self.setVideoContent(options);

				break;
			case 'slideshow':
				self.setSlideshowContent(options.slideshow);

				break;
			default:
				self.setHTMLContent(options.html);
		}

		modal.show();
	},

	setHTMLContent: function setHTMLContent(html) {
		this.getModal().setMessage(html);
	},

	setImageContent: function setImageContent(imageURL) {
		var self = this,
		    classes = self.getSettings('classes'),
		    $item = jQuery('<div>', { 'class': classes.item }),
		    $image = jQuery('<img>', { src: imageURL, 'class': classes.image + ' ' + classes.preventClose });

		$item.append($image);

		self.getModal().setMessage($item);
	},

	setVideoContent: function setVideoContent(options) {
		var classes = this.getSettings('classes'),
		    $videoContainer = jQuery('<div>', { 'class': classes.videoContainer }),
		    $videoWrapper = jQuery('<div>', { 'class': classes.videoWrapper }),
		    $videoElement,
		    modal = this.getModal();

		if ('hosted' === options.videoType) {
			var videoParams = { src: options.url, autoplay: '' };

			options.videoParams.forEach(function (param) {
				videoParams[param] = '';
			});

			$videoElement = jQuery('<video>', videoParams);
		} else {
			var videoURL = options.url.replace('&autoplay=0', '') + '&autoplay=1';

			$videoElement = jQuery('<iframe>', { src: videoURL, allowfullscreen: 1 });
		}

		$videoContainer.append($videoWrapper);

		$videoWrapper.append($videoElement);

		modal.setMessage($videoContainer);

		this.setVideoAspectRatio();

		var onHideMethod = modal.onHide;

		modal.onHide = function () {
			onHideMethod();

			modal.getElements('message').removeClass('elementor-fit-aspect-ratio');
		};
	},

	setSlideshowContent: function setSlideshowContent(options) {
		var $ = jQuery,
		    self = this,
		    classes = self.getSettings('classes'),
		    slideshowClasses = classes.slideshow,
		    $container = $('<div>', { 'class': slideshowClasses.container }),
		    $slidesWrapper = $('<div>', { 'class': slideshowClasses.slidesWrapper }),
		    $prevButton = $('<div>', { 'class': slideshowClasses.prevButton + ' ' + classes.preventClose }).html($('<i>', { 'class': slideshowClasses.prevButtonIcon })),
		    $nextButton = $('<div>', { 'class': slideshowClasses.nextButton + ' ' + classes.preventClose }).html($('<i>', { 'class': slideshowClasses.nextButtonIcon }));

		options.slides.forEach(function (slide) {
			var slideClass = slideshowClasses.slide + ' ' + classes.item;

			if (slide.video) {
				slideClass += ' ' + classes.video;
			}

			var $slide = $('<div>', { 'class': slideClass });

			if (slide.video) {
				$slide.attr('data-elementor-slideshow-video', slide.video);

				var $playIcon = $('<div>', { 'class': classes.playButton }).html($('<i>', { 'class': classes.playButtonIcon }));

				$slide.append($playIcon);
			} else {
				var $zoomContainer = $('<div>', { 'class': 'swiper-zoom-container' }),
				    $slideImage = $('<img>', { 'class': classes.image + ' ' + classes.preventClose, src: slide.image });

				$zoomContainer.append($slideImage);

				$slide.append($zoomContainer);
			}

			$slidesWrapper.append($slide);
		});

		$container.append($slidesWrapper, $prevButton, $nextButton);

		var modal = self.getModal();

		modal.setMessage($container);

		var onShowMethod = modal.onShow;

		modal.onShow = function () {
			onShowMethod();

			var swiperOptions = {
				navigation: {
					prevEl: $prevButton,
					nextEl: $nextButton
				},
				pagination: {
					clickable: true
				},
				on: {
					slideChangeTransitionEnd: self.onSlideChange
				},
				grabCursor: true,
				runCallbacksOnInit: false,
				loop: true,
				keyboard: true
			};

			if (options.swiper) {
				$.extend(swiperOptions, options.swiper);
			}

			self.swiper = new Swiper($container, swiperOptions);

			self.setVideoAspectRatio();

			self.playSlideVideo();
		};
	},

	setVideoAspectRatio: function setVideoAspectRatio(aspectRatio) {
		aspectRatio = aspectRatio || this.getSettings('modalOptions.videoAspectRatio');

		var $widgetContent = this.getModal().getElements('widgetContent'),
		    oldAspectRatio = this.oldAspectRatio,
		    aspectRatioClass = this.getSettings('classes.aspectRatio');

		this.oldAspectRatio = aspectRatio;

		if (oldAspectRatio) {
			$widgetContent.removeClass(aspectRatioClass.replace('%s', oldAspectRatio));
		}

		if (aspectRatio) {
			$widgetContent.addClass(aspectRatioClass.replace('%s', aspectRatio));
		}
	},

	getSlide: function getSlide(slideState) {
		return jQuery(this.swiper.slides).filter(this.getSettings('selectors.slideshow.' + slideState + 'Slide'));
	},

	playSlideVideo: function playSlideVideo() {
		var $activeSlide = this.getSlide('active'),
		    videoURL = $activeSlide.data('elementor-slideshow-video');

		if (!videoURL) {
			return;
		}

		var classes = this.getSettings('classes'),
		    $videoContainer = jQuery('<div>', { 'class': classes.videoContainer + ' ' + classes.invisible }),
		    $videoWrapper = jQuery('<div>', { 'class': classes.videoWrapper }),
		    $videoFrame = jQuery('<iframe>', { src: videoURL }),
		    $playIcon = $activeSlide.children('.' + classes.playButton);

		$videoContainer.append($videoWrapper);

		$videoWrapper.append($videoFrame);

		$activeSlide.append($videoContainer);

		$playIcon.addClass(classes.playing).removeClass(classes.hidden);

		$videoFrame.on('load', function () {
			$playIcon.addClass(classes.hidden);

			$videoContainer.removeClass(classes.invisible);
		});
	},

	setEntranceAnimation: function setEntranceAnimation(animation) {
		animation = animation || this.getSettings('modalOptions.entranceAnimation');

		var $widgetMessage = this.getModal().getElements('message');

		if (this.oldAnimation) {
			$widgetMessage.removeClass(this.oldAnimation);
		}

		this.oldAnimation = animation;

		if (animation) {
			$widgetMessage.addClass('animated ' + animation);
		}
	},

	isLightboxLink: function isLightboxLink(element) {
		if ('A' === element.tagName && !/\.(png|jpe?g|gif|svg)$/i.test(element.href)) {
			return false;
		}

		var generalOpenInLightbox = elementorFrontend.getGeneralSettings('elementor_global_image_lightbox'),
		    currentLinkOpenInLightbox = element.dataset.elementorOpenLightbox;

		return 'yes' === currentLinkOpenInLightbox || generalOpenInLightbox && 'no' !== currentLinkOpenInLightbox;
	},

	openLink: function openLink(event) {
		var element = event.currentTarget,
		    $target = jQuery(event.target),
		    editMode = elementorFrontend.isEditMode(),
		    isClickInsideElementor = !!$target.closest('#elementor').length;

		if (!this.isLightboxLink(element)) {

			if (editMode && isClickInsideElementor) {
				event.preventDefault();
			}

			return;
		}

		event.preventDefault();

		if (editMode && !elementorFrontend.getGeneralSettings('elementor_enable_lightbox_in_editor')) {
			return;
		}

		var lightboxData = {};

		if (element.dataset.elementorLightbox) {
			lightboxData = JSON.parse(element.dataset.elementorLightbox);
		}

		if (lightboxData.type && 'slideshow' !== lightboxData.type) {
			this.showModal(lightboxData);

			return;
		}

		if (!element.dataset.elementorLightboxSlideshow) {
			this.showModal({
				type: 'image',
				url: element.href
			});

			return;
		}

		var slideshowID = element.dataset.elementorLightboxSlideshow;

		var $allSlideshowLinks = jQuery(this.getSettings('selectors.links')).filter(function () {
			return slideshowID === this.dataset.elementorLightboxSlideshow;
		});

		var slides = [],
		    uniqueLinks = {};

		$allSlideshowLinks.each(function () {
			var slideVideo = this.dataset.elementorLightboxVideo,
			    uniqueID = slideVideo || this.href;

			if (uniqueLinks[uniqueID]) {
				return;
			}

			uniqueLinks[uniqueID] = true;

			var slideIndex = this.dataset.elementorLightboxIndex;

			if (undefined === slideIndex) {
				slideIndex = $allSlideshowLinks.index(this);
			}

			var slideData = {
				image: this.href,
				index: slideIndex
			};

			if (slideVideo) {
				slideData.video = slideVideo;
			}

			slides.push(slideData);
		});

		slides.sort(function (a, b) {
			return a.index - b.index;
		});

		var initialSlide = element.dataset.elementorLightboxIndex;

		if (undefined === initialSlide) {
			initialSlide = $allSlideshowLinks.index(element);
		}

		this.showModal({
			type: 'slideshow',
			modalOptions: {
				id: 'elementor-lightbox-slideshow-' + slideshowID
			},
			slideshow: {
				slides: slides,
				swiper: {
					initialSlide: +initialSlide
				}
			}
		});
	},

	bindEvents: function bindEvents() {
		elementorFrontend.getElements('$document').on('click', this.getSettings('selectors.links'), this.openLink);
	},

	onInit: function onInit() {
		ViewModule.prototype.onInit.apply(this, arguments);

		if (elementorFrontend.isEditMode()) {
			elementor.settings.general.model.on('change', this.onGeneralSettingsChange);
		}
	},

	onGeneralSettingsChange: function onGeneralSettingsChange(model) {
		if ('elementor_lightbox_content_animation' in model.changed) {
			this.setSettings('modalOptions.entranceAnimation', model.changed.elementor_lightbox_content_animation);

			this.setEntranceAnimation();
		}
	},

	onSlideChange: function onSlideChange() {
		this.getSlide('prev').add(this.getSlide('next')).add(this.getSlide('active')).find('.' + this.getSettings('classes.videoWrapper')).remove();

		this.playSlideVideo();
	}
});

module.exports = LightboxModule;

/***/ }),

/***/ 183:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ViewModule = __webpack_require__(1);

module.exports = ViewModule.extend({
	getDefaultSettings: function getDefaultSettings() {
		return {
			element: null,
			direction: elementorFrontend.config.is_rtl ? 'right' : 'left',
			selectors: {
				container: window
			}
		};
	},

	getDefaultElements: function getDefaultElements() {
		return {
			$element: jQuery(this.getSettings('element'))
		};
	},

	stretch: function stretch() {
		var containerSelector = this.getSettings('selectors.container'),
		    $container;

		try {
			$container = jQuery(containerSelector);
		} catch (e) {}

		if (!$container || !$container.length) {
			$container = jQuery(this.getDefaultSettings().selectors.container);
		}

		this.reset();

		var $element = this.elements.$element,
		    containerWidth = $container.outerWidth(),
		    elementOffset = $element.offset().left,
		    isFixed = 'fixed' === $element.css('position'),
		    correctOffset = isFixed ? 0 : elementOffset;

		if (window !== $container[0]) {
			var containerOffset = $container.offset().left;

			if (isFixed) {
				correctOffset = containerOffset;
			} else {
				if (elementOffset > containerOffset) {
					correctOffset = elementOffset - containerOffset;
				}
			}
		}

		if (!isFixed) {
			if (elementorFrontend.config.is_rtl) {
				correctOffset = containerWidth - ($element.outerWidth() + correctOffset);
			}

			correctOffset = -correctOffset;
		}

		var css = {};

		css.width = containerWidth + 'px';

		css[this.getSettings('direction')] = correctOffset + 'px';

		$element.css(css);
	},

	reset: function reset() {
		var css = {};

		css.width = '';

		css[this.getSettings('direction')] = '';

		this.elements.$element.css(css);
	}
});

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Module = function Module() {
	var $ = jQuery,
	    instanceParams = arguments,
	    self = this,
	    settings,
	    events = {};

	var ensureClosureMethods = function ensureClosureMethods() {
		$.each(self, function (methodName) {
			var oldMethod = self[methodName];

			if ('function' !== typeof oldMethod) {
				return;
			}

			self[methodName] = function () {
				return oldMethod.apply(self, arguments);
			};
		});
	};

	var initSettings = function initSettings() {
		settings = self.getDefaultSettings();

		var instanceSettings = instanceParams[0];

		if (instanceSettings) {
			$.extend(settings, instanceSettings);
		}
	};

	var init = function init() {
		self.__construct.apply(self, instanceParams);

		ensureClosureMethods();

		initSettings();

		self.trigger('init');
	};

	this.getItems = function (items, itemKey) {
		if (itemKey) {
			var keyStack = itemKey.split('.'),
			    currentKey = keyStack.splice(0, 1);

			if (!keyStack.length) {
				return items[currentKey];
			}

			if (!items[currentKey]) {
				return;
			}

			return this.getItems(items[currentKey], keyStack.join('.'));
		}

		return items;
	};

	this.getSettings = function (setting) {
		return this.getItems(settings, setting);
	};

	this.setSettings = function (settingKey, value, settingsContainer) {
		if (!settingsContainer) {
			settingsContainer = settings;
		}

		if ('object' === (typeof settingKey === 'undefined' ? 'undefined' : _typeof(settingKey))) {
			$.extend(settingsContainer, settingKey);

			return self;
		}

		var keyStack = settingKey.split('.'),
		    currentKey = keyStack.splice(0, 1);

		if (!keyStack.length) {
			settingsContainer[currentKey] = value;

			return self;
		}

		if (!settingsContainer[currentKey]) {
			settingsContainer[currentKey] = {};
		}

		return self.setSettings(keyStack.join('.'), value, settingsContainer[currentKey]);
	};

	this.forceMethodImplementation = function (methodArguments) {
		var functionName = methodArguments.callee.name;

		throw new ReferenceError('The method ' + functionName + ' must to be implemented in the inheritor child.');
	};

	this.on = function (eventName, callback) {
		if ('object' === (typeof eventName === 'undefined' ? 'undefined' : _typeof(eventName))) {
			$.each(eventName, function (singleEventName) {
				self.on(singleEventName, this);
			});

			return self;
		}

		var eventNames = eventName.split(' ');

		eventNames.forEach(function (singleEventName) {
			if (!events[singleEventName]) {
				events[singleEventName] = [];
			}

			events[singleEventName].push(callback);
		});

		return self;
	};

	this.off = function (eventName, callback) {
		if (!events[eventName]) {
			return self;
		}

		if (!callback) {
			delete events[eventName];

			return self;
		}

		var callbackIndex = events[eventName].indexOf(callback);

		if (-1 !== callbackIndex) {
			delete events[eventName][callbackIndex];
		}

		return self;
	};

	this.trigger = function (eventName) {
		var methodName = 'on' + eventName[0].toUpperCase() + eventName.slice(1),
		    params = Array.prototype.slice.call(arguments, 1);

		if (self[methodName]) {
			self[methodName].apply(self, params);
		}

		var callbacks = events[eventName];

		if (!callbacks) {
			return self;
		}

		$.each(callbacks, function (index, callback) {
			callback.apply(self, params);
		});

		return self;
	};

	init();
};

Module.prototype.__construct = function () {};

Module.prototype.getDefaultSettings = function () {
	return {};
};

Module.extendsCount = 0;

Module.extend = function (properties) {
	var $ = jQuery,
	    parent = this;

	var child = function child() {
		return parent.apply(this, arguments);
	};

	$.extend(child, parent);

	child.prototype = Object.create($.extend({}, parent.prototype, properties));

	child.prototype.constructor = child;

	/*
  * Constructor ID is used to set an unique ID
     * to every extend of the Module.
     *
  * It's useful in some cases such as unique
  * listener for frontend handlers.
  */
	var constructorID = ++Module.extendsCount;

	child.prototype.getConstructorID = function () {
		return constructorID;
	};

	child.__super__ = parent.prototype;

	return child;
};

module.exports = Module;

/***/ }),

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Handles managing all events for whatever you plug it into. Priorities for hooks are based on lowest to highest in
 * that, lowest priority hooks are fired first.
 */

var EventManager = function EventManager() {
	var slice = Array.prototype.slice,
	    MethodsAvailable;

	/**
  * Contains the hooks that get registered with this EventManager. The array for storage utilizes a "flat"
  * object literal such that looking up the hook utilizes the native object literal hash.
  */
	var STORAGE = {
		actions: {},
		filters: {}
	};

	/**
  * Removes the specified hook by resetting the value of it.
  *
  * @param type Type of hook, either 'actions' or 'filters'
  * @param hook The hook (namespace.identifier) to remove
  *
  * @private
  */
	function _removeHook(type, hook, callback, context) {
		var handlers, handler, i;

		if (!STORAGE[type][hook]) {
			return;
		}
		if (!callback) {
			STORAGE[type][hook] = [];
		} else {
			handlers = STORAGE[type][hook];
			if (!context) {
				for (i = handlers.length; i--;) {
					if (handlers[i].callback === callback) {
						handlers.splice(i, 1);
					}
				}
			} else {
				for (i = handlers.length; i--;) {
					handler = handlers[i];
					if (handler.callback === callback && handler.context === context) {
						handlers.splice(i, 1);
					}
				}
			}
		}
	}

	/**
  * Use an insert sort for keeping our hooks organized based on priority. This function is ridiculously faster
  * than bubble sort, etc: http://jsperf.com/javascript-sort
  *
  * @param hooks The custom array containing all of the appropriate hooks to perform an insert sort on.
  * @private
  */
	function _hookInsertSort(hooks) {
		var tmpHook, j, prevHook;
		for (var i = 1, len = hooks.length; i < len; i++) {
			tmpHook = hooks[i];
			j = i;
			while ((prevHook = hooks[j - 1]) && prevHook.priority > tmpHook.priority) {
				hooks[j] = hooks[j - 1];
				--j;
			}
			hooks[j] = tmpHook;
		}

		return hooks;
	}

	/**
  * Adds the hook to the appropriate storage container
  *
  * @param type 'actions' or 'filters'
  * @param hook The hook (namespace.identifier) to add to our event manager
  * @param callback The function that will be called when the hook is executed.
  * @param priority The priority of this hook. Must be an integer.
  * @param [context] A value to be used for this
  * @private
  */
	function _addHook(type, hook, callback, priority, context) {
		var hookObject = {
			callback: callback,
			priority: priority,
			context: context
		};

		// Utilize 'prop itself' : http://jsperf.com/hasownproperty-vs-in-vs-undefined/19
		var hooks = STORAGE[type][hook];
		if (hooks) {
			// TEMP FIX BUG
			var hasSameCallback = false;
			jQuery.each(hooks, function () {
				if (this.callback === callback) {
					hasSameCallback = true;
					return false;
				}
			});

			if (hasSameCallback) {
				return;
			}
			// END TEMP FIX BUG

			hooks.push(hookObject);
			hooks = _hookInsertSort(hooks);
		} else {
			hooks = [hookObject];
		}

		STORAGE[type][hook] = hooks;
	}

	/**
  * Runs the specified hook. If it is an action, the value is not modified but if it is a filter, it is.
  *
  * @param type 'actions' or 'filters'
  * @param hook The hook ( namespace.identifier ) to be ran.
  * @param args Arguments to pass to the action/filter. If it's a filter, args is actually a single parameter.
  * @private
  */
	function _runHook(type, hook, args) {
		var handlers = STORAGE[type][hook],
		    i,
		    len;

		if (!handlers) {
			return 'filters' === type ? args[0] : false;
		}

		len = handlers.length;
		if ('filters' === type) {
			for (i = 0; i < len; i++) {
				args[0] = handlers[i].callback.apply(handlers[i].context, args);
			}
		} else {
			for (i = 0; i < len; i++) {
				handlers[i].callback.apply(handlers[i].context, args);
			}
		}

		return 'filters' === type ? args[0] : true;
	}

	/**
  * Adds an action to the event manager.
  *
  * @param action Must contain namespace.identifier
  * @param callback Must be a valid callback function before this action is added
  * @param [priority=10] Used to control when the function is executed in relation to other callbacks bound to the same hook
  * @param [context] Supply a value to be used for this
  */
	function addAction(action, callback, priority, context) {
		if ('string' === typeof action && 'function' === typeof callback) {
			priority = parseInt(priority || 10, 10);
			_addHook('actions', action, callback, priority, context);
		}

		return MethodsAvailable;
	}

	/**
  * Performs an action if it exists. You can pass as many arguments as you want to this function; the only rule is
  * that the first argument must always be the action.
  */
	function doAction() /* action, arg1, arg2, ... */{
		var args = slice.call(arguments);
		var action = args.shift();

		if ('string' === typeof action) {
			_runHook('actions', action, args);
		}

		return MethodsAvailable;
	}

	/**
  * Removes the specified action if it contains a namespace.identifier & exists.
  *
  * @param action The action to remove
  * @param [callback] Callback function to remove
  */
	function removeAction(action, callback) {
		if ('string' === typeof action) {
			_removeHook('actions', action, callback);
		}

		return MethodsAvailable;
	}

	/**
  * Adds a filter to the event manager.
  *
  * @param filter Must contain namespace.identifier
  * @param callback Must be a valid callback function before this action is added
  * @param [priority=10] Used to control when the function is executed in relation to other callbacks bound to the same hook
  * @param [context] Supply a value to be used for this
  */
	function addFilter(filter, callback, priority, context) {
		if ('string' === typeof filter && 'function' === typeof callback) {
			priority = parseInt(priority || 10, 10);
			_addHook('filters', filter, callback, priority, context);
		}

		return MethodsAvailable;
	}

	/**
  * Performs a filter if it exists. You should only ever pass 1 argument to be filtered. The only rule is that
  * the first argument must always be the filter.
  */
	function applyFilters() /* filter, filtered arg, arg2, ... */{
		var args = slice.call(arguments);
		var filter = args.shift();

		if ('string' === typeof filter) {
			return _runHook('filters', filter, args);
		}

		return MethodsAvailable;
	}

	/**
  * Removes the specified filter if it contains a namespace.identifier & exists.
  *
  * @param filter The action to remove
  * @param [callback] Callback function to remove
  */
	function removeFilter(filter, callback) {
		if ('string' === typeof filter) {
			_removeHook('filters', filter, callback);
		}

		return MethodsAvailable;
	}

	/**
  * Maintain a reference to the object scope so our public methods never get confusing.
  */
	MethodsAvailable = {
		removeFilter: removeFilter,
		applyFilters: applyFilters,
		addFilter: addFilter,
		removeAction: removeAction,
		doAction: doAction,
		addAction: addAction
	};

	// return all of the publicly available methods
	return MethodsAvailable;
};

module.exports = EventManager;

/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var HandlerModule = __webpack_require__(5);

module.exports = HandlerModule.extend({
	$activeContent: null,

	getDefaultSettings: function getDefaultSettings() {
		return {
			selectors: {
				tabTitle: '.elementor-tab-title',
				tabContent: '.elementor-tab-content'
			},
			classes: {
				active: 'elementor-active'
			},
			showTabFn: 'show',
			hideTabFn: 'hide',
			toggleSelf: true,
			hidePrevious: true,
			autoExpand: true
		};
	},

	getDefaultElements: function getDefaultElements() {
		var selectors = this.getSettings('selectors');

		return {
			$tabTitles: this.findElement(selectors.tabTitle),
			$tabContents: this.findElement(selectors.tabContent)
		};
	},

	activateDefaultTab: function activateDefaultTab() {
		var settings = this.getSettings();

		if (!settings.autoExpand || 'editor' === settings.autoExpand && !this.isEdit) {
			return;
		}

		var defaultActiveTab = this.getEditSettings('activeItemIndex') || 1,
		    originalToggleMethods = {
			showTabFn: settings.showTabFn,
			hideTabFn: settings.hideTabFn
		};

		// Toggle tabs without animation to avoid jumping
		this.setSettings({
			showTabFn: 'show',
			hideTabFn: 'hide'
		});

		this.changeActiveTab(defaultActiveTab);

		// Return back original toggle effects
		this.setSettings(originalToggleMethods);
	},

	deactivateActiveTab: function deactivateActiveTab(tabIndex) {
		var settings = this.getSettings(),
		    activeClass = settings.classes.active,
		    activeFilter = tabIndex ? '[data-tab="' + tabIndex + '"]' : '.' + activeClass,
		    $activeTitle = this.elements.$tabTitles.filter(activeFilter),
		    $activeContent = this.elements.$tabContents.filter(activeFilter);

		$activeTitle.add($activeContent).removeClass(activeClass);

		$activeContent[settings.hideTabFn]();
	},

	activateTab: function activateTab(tabIndex) {
		var settings = this.getSettings(),
		    activeClass = settings.classes.active,
		    $requestedTitle = this.elements.$tabTitles.filter('[data-tab="' + tabIndex + '"]'),
		    $requestedContent = this.elements.$tabContents.filter('[data-tab="' + tabIndex + '"]');

		$requestedTitle.add($requestedContent).addClass(activeClass);

		$requestedContent[settings.showTabFn]();
	},

	isActiveTab: function isActiveTab(tabIndex) {
		return this.elements.$tabTitles.filter('[data-tab="' + tabIndex + '"]').hasClass(this.getSettings('classes.active'));
	},

	bindEvents: function bindEvents() {
		var self = this;

		self.elements.$tabTitles.on('focus', function (event) {
			self.changeActiveTab(event.currentTarget.dataset.tab);
		});

		if (self.getSettings('toggleSelf')) {
			self.elements.$tabTitles.on('mousedown', function (event) {
				if (jQuery(event.currentTarget).is(':focus')) {
					self.changeActiveTab(event.currentTarget.dataset.tab);
				}
			});
		}
	},

	onInit: function onInit() {
		HandlerModule.prototype.onInit.apply(this, arguments);

		this.activateDefaultTab();
	},

	onEditSettingsChange: function onEditSettingsChange(propertyName) {
		if ('activeItemIndex' === propertyName) {
			this.activateDefaultTab();
		}
	},

	changeActiveTab: function changeActiveTab(tabIndex) {
		var isActiveTab = this.isActiveTab(tabIndex),
		    settings = this.getSettings();

		if ((settings.toggleSelf || !isActiveTab) && settings.hidePrevious) {
			this.deactivateActiveTab();
		}

		if (!settings.hidePrevious && isActiveTab) {
			this.deactivateActiveTab(tabIndex);
		}

		if (!isActiveTab) {
			this.activateTab(tabIndex);
		}
	}
});

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ViewModule = __webpack_require__(1),
    HandlerModule;

HandlerModule = ViewModule.extend({
	$element: null,

	editorListeners: null,

	onElementChange: null,

	onEditSettingsChange: null,

	onGeneralSettingsChange: null,

	onPageSettingsChange: null,

	isEdit: null,

	__construct: function __construct(settings) {
		this.$element = settings.$element;

		this.isEdit = this.$element.hasClass('elementor-element-edit-mode');

		if (this.isEdit) {
			this.addEditorListeners();
		}
	},

	findElement: function findElement(selector) {
		var $mainElement = this.$element;

		return $mainElement.find(selector).filter(function () {
			return jQuery(this).closest('.elementor-element').is($mainElement);
		});
	},

	getUniqueHandlerID: function getUniqueHandlerID(cid, $element) {
		if (!cid) {
			cid = this.getModelCID();
		}

		if (!$element) {
			$element = this.$element;
		}

		return cid + $element.attr('data-element_type') + this.getConstructorID();
	},

	initEditorListeners: function initEditorListeners() {
		var self = this;

		self.editorListeners = [{
			event: 'element:destroy',
			to: elementor.channels.data,
			callback: function callback(removedModel) {
				if (removedModel.cid !== self.getModelCID()) {
					return;
				}

				self.onDestroy();
			}
		}];

		if (self.onElementChange) {
			var elementName = self.getElementName(),
			    eventName = 'change';

			if ('global' !== elementName) {
				eventName += ':' + elementName;
			}

			self.editorListeners.push({
				event: eventName,
				to: elementor.channels.editor,
				callback: function callback(controlView, elementView) {
					var elementViewHandlerID = self.getUniqueHandlerID(elementView.model.cid, elementView.$el);

					if (elementViewHandlerID !== self.getUniqueHandlerID()) {
						return;
					}

					self.onElementChange(controlView.model.get('name'), controlView, elementView);
				}
			});
		}

		if (self.onEditSettingsChange) {
			self.editorListeners.push({
				event: 'change:editSettings',
				to: elementor.channels.editor,
				callback: function callback(changedModel, view) {
					if (view.model.cid !== self.getModelCID()) {
						return;
					}

					self.onEditSettingsChange(Object.keys(changedModel.changed)[0]);
				}
			});
		}

		['page', 'general'].forEach(function (settingsType) {
			var listenerMethodName = 'on' + elementor.helpers.firstLetterUppercase(settingsType) + 'SettingsChange';

			if (self[listenerMethodName]) {
				self.editorListeners.push({
					event: 'change',
					to: elementor.settings[settingsType].model,
					callback: function callback(model) {
						self[listenerMethodName](model.changed);
					}
				});
			}
		});
	},

	getEditorListeners: function getEditorListeners() {
		if (!this.editorListeners) {
			this.initEditorListeners();
		}

		return this.editorListeners;
	},

	addEditorListeners: function addEditorListeners() {
		var uniqueHandlerID = this.getUniqueHandlerID();

		this.getEditorListeners().forEach(function (listener) {
			elementorFrontend.addListenerOnce(uniqueHandlerID, listener.event, listener.callback, listener.to);
		});
	},

	removeEditorListeners: function removeEditorListeners() {
		var uniqueHandlerID = this.getUniqueHandlerID();

		this.getEditorListeners().forEach(function (listener) {
			elementorFrontend.removeListeners(uniqueHandlerID, listener.event, null, listener.to);
		});
	},

	getElementName: function getElementName() {
		return this.$element.data('element_type').split('.')[0];
	},

	getID: function getID() {
		return this.$element.data('id');
	},

	getModelCID: function getModelCID() {
		return this.$element.data('model-cid');
	},

	getElementSettings: function getElementSettings(setting) {
		var elementSettings = {},
		    modelCID = this.getModelCID();

		if (this.isEdit && modelCID) {
			var settings = elementorFrontend.config.elements.data[modelCID],
			    settingsKeys = elementorFrontend.config.elements.keys[settings.attributes.widgetType || settings.attributes.elType];

			jQuery.each(settings.getActiveControls(), function (controlKey) {
				if (-1 !== settingsKeys.indexOf(controlKey)) {
					elementSettings[controlKey] = settings.attributes[controlKey];
				}
			});
		} else {
			elementSettings = this.$element.data('settings') || {};
		}

		return this.getItems(elementSettings, setting);
	},

	getEditSettings: function getEditSettings(setting) {
		var attributes = {};

		if (this.isEdit) {
			attributes = elementorFrontend.config.elements.editSettings[this.getModelCID()].attributes;
		}

		return this.getItems(attributes, setting);
	},

	onDestroy: function onDestroy() {
		this.removeEditorListeners();

		if (this.unbindEvents) {
			this.unbindEvents();
		}
	}
});

module.exports = HandlerModule;

/***/ })

/******/ });
//# sourceMappingURL=frontend.js.map