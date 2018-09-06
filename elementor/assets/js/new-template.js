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
/******/ 	return __webpack_require__(__webpack_require__.s = 164);
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

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TemplateLibraryHeaderView;

TemplateLibraryHeaderView = Marionette.LayoutView.extend({

	className: 'elementor-templates-modal__header',

	template: '#tmpl-elementor-templates-modal__header',

	regions: {
		logoArea: '.elementor-templates-modal__header__logo-area',
		tools: '#elementor-template-library-header-tools',
		menuArea: '.elementor-templates-modal__header__menu-area'
	},

	ui: {
		closeModal: '.elementor-templates-modal__header__close'
	},

	events: {
		'click @ui.closeModal': 'onCloseModalClick'
	},

	templateHelpers: function templateHelpers() {
		return {
			closeType: this.getOption('closeType')
		};
	},

	onCloseModalClick: function onCloseModalClick() {
		this._parent._parent._parent.hideModal();
	}
});

module.exports = TemplateLibraryHeaderView;

/***/ }),

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TemplateLibraryLoadingView;

TemplateLibraryLoadingView = Marionette.ItemView.extend({
	id: 'elementor-template-library-loading',

	template: '#tmpl-elementor-template-library-loading'
});

module.exports = TemplateLibraryLoadingView;

/***/ }),

/***/ 164:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ViewModule = __webpack_require__(1),
    NewTemplateLayout = __webpack_require__(165);

var NewTemplateModule = ViewModule.extend({

	getDefaultSettings: function getDefaultSettings() {
		return {
			selectors: {
				addButton: '.page-title-action:first, #elementor-template-library-add-new'
			}
		};
	},

	getDefaultElements: function getDefaultElements() {
		var selectors = this.getSettings('selectors');

		return {
			$addButton: jQuery(selectors.addButton)
		};
	},

	bindEvents: function bindEvents() {
		this.elements.$addButton.on('click', this.onAddButtonClick);
	},

	onInit: function onInit() {
		ViewModule.prototype.onInit.apply(this, arguments);

		this.layout = new NewTemplateLayout();
	},

	onAddButtonClick: function onAddButtonClick(event) {
		event.preventDefault();

		this.layout.showModal();
	}
});

jQuery(function () {
	window.elementorNewTemplate = new NewTemplateModule();
});

/***/ }),

/***/ 165:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BaseModalLayout = __webpack_require__(8),
    NewTemplateView = __webpack_require__(166);

module.exports = BaseModalLayout.extend({

	getModalOptions: function getModalOptions() {
		return {
			id: 'elementor-new-template-modal'
		};
	},

	getLogoOptions: function getLogoOptions() {
		return {
			title: elementorAdmin.config.i18n.new_template
		};
	},

	initialize: function initialize() {
		BaseModalLayout.prototype.initialize.apply(this, arguments);

		this.showLogo();

		this.showContentView();
	},

	getDialogsManager: function getDialogsManager() {
		return elementorAdmin.getDialogsManager();
	},

	showContentView: function showContentView() {
		this.modalContent.show(new NewTemplateView());
	}
});

/***/ }),

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Marionette.ItemView.extend({

	id: 'elementor-new-template-dialog-content',

	template: '#tmpl-elementor-new-template',

	ui: {},

	events: {},

	onRender: function onRender() {}
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

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TemplateLibraryHeaderView = __webpack_require__(14),
    TemplateLibraryHeaderLogoView = __webpack_require__(9),
    TemplateLibraryLoadingView = __webpack_require__(15);

module.exports = Marionette.LayoutView.extend({
	el: function el() {
		return this.modal.getElements('widget');
	},

	modal: null,

	regions: function regions() {
		return {
			modalHeader: '.dialog-header',
			modalContent: '.dialog-lightbox-content',
			modalLoading: '.dialog-lightbox-loading'
		};
	},

	constructor: function constructor() {
		this.initModal();

		Marionette.LayoutView.prototype.constructor.apply(this, arguments);
	},

	initialize: function initialize() {
		this.modalHeader.show(new TemplateLibraryHeaderView(this.getHeaderOptions()));
	},

	initModal: function initModal() {
		var modalOptions = {
			className: 'elementor-templates-modal',
			closeButton: false,
			hide: {
				onOutsideClick: false
			}
		};

		jQuery.extend(true, modalOptions, this.getModalOptions());

		this.modal = this.getDialogsManager().createWidget('lightbox', modalOptions);

		this.modal.getElements('message').append(this.modal.addElement('content'), this.modal.addElement('loading'));
	},

	getDialogsManager: function getDialogsManager() {
		return elementor.dialogsManager;
	},

	showModal: function showModal() {
		this.modal.show();
	},

	hideModal: function hideModal() {
		this.modal.hide();
	},

	getModalOptions: function getModalOptions() {
		return {};
	},

	getLogoOptions: function getLogoOptions() {
		return {};
	},

	getHeaderOptions: function getHeaderOptions() {
		return {};
	},

	getHeaderView: function getHeaderView() {
		return this.modalHeader.currentView;
	},

	showLoadingView: function showLoadingView() {
		this.modalLoading.show(new TemplateLibraryLoadingView());

		this.modalLoading.$el.show();

		this.modalContent.$el.hide();
	},

	hideLoadingView: function hideLoadingView() {
		this.modalContent.$el.show();

		this.modalLoading.$el.hide();
	},

	showLogo: function showLogo() {
		this.getHeaderView().logoArea.show(new TemplateLibraryHeaderLogoView(this.getLogoOptions()));
	}
});

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Marionette.ItemView.extend({
	template: '#tmpl-elementor-templates-modal__header__logo',

	className: 'elementor-templates-modal__header__logo',

	events: {
		'click': 'onClick'
	},

	templateHelpers: function templateHelpers() {
		return {
			title: this.getOption('title')
		};
	},

	onClick: function onClick() {
		var clickCallback = this.getOption('click');

		if (clickCallback) {
			clickCallback();
		}
	}
});

/***/ })

/******/ });
//# sourceMappingURL=new-template.js.map