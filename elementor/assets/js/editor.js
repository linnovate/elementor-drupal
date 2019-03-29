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
/******/ 	return __webpack_require__(__webpack_require__.s = 45);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ControlBaseView = __webpack_require__(7),
    TagsBehavior = __webpack_require__(97),
    Validator = __webpack_require__(18),
    ControlBaseDataView;

ControlBaseDataView = ControlBaseView.extend({

	ui: function ui() {
		var ui = ControlBaseView.prototype.ui.apply(this, arguments);

		_.extend(ui, {
			input: 'input[data-setting][type!="checkbox"][type!="radio"]',
			checkbox: 'input[data-setting][type="checkbox"]',
			radio: 'input[data-setting][type="radio"]',
			select: 'select[data-setting]',
			textarea: 'textarea[data-setting]',
			responsiveSwitchers: '.elementor-responsive-switcher',
			contentEditable: '[contenteditable="true"]',
			tooltipTarget: '.tooltip-target'
		});

		return ui;
	},

	templateHelpers: function templateHelpers() {
		var controlData = ControlBaseView.prototype.templateHelpers.apply(this, arguments);

		controlData.data.controlValue = this.getControlValue();

		return controlData;
	},

	events: function events() {
		return {
			'input @ui.input': 'onBaseInputChange',
			'change @ui.checkbox': 'onBaseInputChange',
			'change @ui.radio': 'onBaseInputChange',
			'input @ui.textarea': 'onBaseInputChange',
			'change @ui.select': 'onBaseInputChange',
			'input @ui.contentEditable': 'onBaseInputChange',
			'click @ui.responsiveSwitchers': 'onResponsiveSwitchersClick'
		};
	},

	behaviors: function behaviors() {
		var behaviors = {},
		    dynamicSettings = this.options.model.get('dynamic');

		if (dynamicSettings && dynamicSettings.active) {
			var tags = _.filter(elementor.dynamicTags.getConfig('tags'), function (tag) {
				return _.intersection(tag.categories, dynamicSettings.categories).length;
			});

			if (tags.length) {
				behaviors.tags = {
					behaviorClass: TagsBehavior,
					tags: tags,
					dynamicSettings: dynamicSettings
				};
			}
		}

		return behaviors;
	},

	initialize: function initialize(options) {
		ControlBaseView.prototype.initialize.apply(this, arguments);

		this.registerValidators();

		this.listenTo(this.elementSettingsModel, 'change:external:' + this.model.get('name'), this.onAfterExternalChange);
	},

	getControlValue: function getControlValue() {
		return this.elementSettingsModel.get(this.model.get('name'));
	},

	setValue: function setValue(value) {
		this.setSettingsModel(value);
	},

	setSettingsModel: function setSettingsModel(value) {
		this.elementSettingsModel.set(this.model.get('name'), value);

		this.triggerMethod('settings:change');
	},

	applySavedValue: function applySavedValue() {
		this.setInputValue('[data-setting="' + this.model.get('name') + '"]', this.getControlValue());
	},

	getEditSettings: function getEditSettings(setting) {
		var settings = this.getOption('elementEditSettings').toJSON();

		if (setting) {
			return settings[setting];
		}

		return settings;
	},

	setEditSetting: function setEditSetting(settingKey, settingValue) {
		var settings = this.getOption('elementEditSettings');

		settings.set(settingKey, settingValue);
	},

	getInputValue: function getInputValue(input) {
		var $input = this.$(input);

		if ($input.is('[contenteditable="true"]')) {
			return $input.html();
		}

		var inputValue = $input.val(),
		    inputType = $input.attr('type');

		if (-1 !== ['radio', 'checkbox'].indexOf(inputType)) {
			return $input.prop('checked') ? inputValue : '';
		}

		if ('number' === inputType && _.isFinite(inputValue)) {
			return +inputValue;
		}

		// Temp fix for jQuery (< 3.0) that return null instead of empty array
		if ('SELECT' === input.tagName && $input.prop('multiple') && null === inputValue) {
			inputValue = [];
		}

		return inputValue;
	},

	setInputValue: function setInputValue(input, value) {
		var $input = this.$(input),
		    inputType = $input.attr('type');

		if ('checkbox' === inputType) {
			$input.prop('checked', !!value);
		} else if ('radio' === inputType) {
			$input.filter('[value="' + value + '"]').prop('checked', true);
		} else {
			$input.val(value);
		}
	},

	addValidator: function addValidator(validator) {
		this.validators.push(validator);
	},

	registerValidators: function registerValidators() {
		this.validators = [];

		var validationTerms = {};

		if (this.model.get('required')) {
			validationTerms.required = true;
		}

		if (!jQuery.isEmptyObject(validationTerms)) {
			this.addValidator(new Validator({
				validationTerms: validationTerms
			}));
		}
	},

	onRender: function onRender() {
		ControlBaseView.prototype.onRender.apply(this, arguments);

		if (this.model.get('responsive')) {
			this.renderResponsiveSwitchers();
		}

		this.applySavedValue();

		this.triggerMethod('ready');

		this.toggleControlVisibility();

		this.addTooltip();
	},

	onBaseInputChange: function onBaseInputChange(event) {
		clearTimeout(this.correctionTimeout);

		var input = event.currentTarget,
		    value = this.getInputValue(input),
		    validators = this.validators.slice(0),
		    settingsValidators = this.elementSettingsModel.validators[this.model.get('name')];

		if (settingsValidators) {
			validators = validators.concat(settingsValidators);
		}

		if (validators) {
			var oldValue = this.getControlValue(input.dataset.setting);

			var isValidValue = validators.every(function (validator) {
				return validator.isValid(value, oldValue);
			});

			if (!isValidValue) {
				this.correctionTimeout = setTimeout(this.setInputValue.bind(this, input, oldValue), 1200);

				return;
			}
		}

		this.updateElementModel(value, input);

		this.triggerMethod('input:change', event);
	},

	onResponsiveSwitchersClick: function onResponsiveSwitchersClick(event) {
		var device = jQuery(event.currentTarget).data('device');

		elementor.changeDeviceMode(device);

		this.triggerMethod('responsive:switcher:click', device);
	},

	renderResponsiveSwitchers: function renderResponsiveSwitchers() {
		var templateHtml = Marionette.Renderer.render('#tmpl-elementor-control-responsive-switchers', this.model.attributes);

		this.ui.controlTitle.after(templateHtml);
	},

	onAfterExternalChange: function onAfterExternalChange() {
		this.hideTooltip();

		this.applySavedValue();
	},

	addTooltip: function addTooltip() {
		if (!this.ui.tooltipTarget) {
			return;
		}

		// Create tooltip on controls
		this.ui.tooltipTarget.tipsy({
			gravity: function gravity() {
				// `n` for down, `s` for up
				var gravity = jQuery(this).data('tooltip-pos');

				if (undefined !== gravity) {
					return gravity;
				} else {
					return 'n';
				}
			},
			title: function title() {
				return this.getAttribute('data-tooltip');
			}
		});
	},

	hideTooltip: function hideTooltip() {
		if (this.ui.tooltipTarget) {
			this.ui.tooltipTarget.tipsy('hide');
		}
	},

	updateElementModel: function updateElementModel(value) {
		this.setValue(value);
	}
}, {
	// Static methods
	getStyleValue: function getStyleValue(placeholder, controlValue) {
		return controlValue;
	},

	onPasteStyle: function onPasteStyle() {
		return true;
	}
});

module.exports = ControlBaseDataView;

/***/ }),
/* 1 */
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
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var BaseSettingsModel;

BaseSettingsModel = Backbone.Model.extend({
	options: {},

	initialize: function initialize(data, options) {
		var self = this;

		// Keep the options for cloning
		self.options = options;

		self.controls = elementor.mergeControlsSettings(options.controls);

		self.validators = {};

		if (!self.controls) {
			return;
		}

		var attrs = data || {},
		    defaults = {};

		_.each(self.controls, function (control) {
			var isUIControl = -1 !== control.features.indexOf('ui');

			if (isUIControl) {
				return;
			}
			var controlName = control.name;

			defaults[controlName] = control['default'];

			var isDynamicControl = control.dynamic && control.dynamic.active,
			    hasDynamicSettings = isDynamicControl && attrs.__dynamic__ && attrs.__dynamic__[controlName];

			if (isDynamicControl && !hasDynamicSettings && control.dynamic['default']) {
				if (!attrs.__dynamic__) {
					attrs.__dynamic__ = {};
				}

				attrs.__dynamic__[controlName] = control.dynamic['default'];

				hasDynamicSettings = true;
			}

			// Check if the value is a plain object ( and not an array )
			var isMultipleControl = jQuery.isPlainObject(control['default']);

			if (undefined !== attrs[controlName] && isMultipleControl && !_.isObject(attrs[controlName]) && !hasDynamicSettings) {
				elementor.debug.addCustomError(new TypeError('An invalid argument supplied as multiple control value'), 'InvalidElementData', 'Element `' + (self.get('widgetType') || self.get('elType')) + '` got <' + attrs[controlName] + '> as `' + controlName + '` value. Expected array or object.');

				delete attrs[controlName];
			}

			if (undefined === attrs[controlName]) {
				attrs[controlName] = defaults[controlName];
			}
		});

		self.defaults = defaults;

		self.handleRepeaterData(attrs);

		self.set(attrs);
	},

	handleRepeaterData: function handleRepeaterData(attrs) {
		_.each(this.controls, function (field) {
			if (field.is_repeater) {
				// TODO: Apply defaults on each field in repeater fields
				if (!(attrs[field.name] instanceof Backbone.Collection)) {
					attrs[field.name] = new Backbone.Collection(attrs[field.name], {
						model: function model(attrs, options) {
							options = options || {};

							options.controls = field.fields;

							if (!attrs._id) {
								attrs._id = elementor.helpers.getUniqueID();
							}

							return new BaseSettingsModel(attrs, options);
						}
					});
				}
			}
		});
	},

	getFontControls: function getFontControls() {
		return _.filter(this.getActiveControls(), function (control) {
			return 'font' === control.type;
		});
	},

	getStyleControls: function getStyleControls(controls, attributes) {
		var self = this;

		controls = elementor.helpers.cloneObject(self.getActiveControls(controls, attributes));

		var styleControls = [];

		jQuery.each(controls, function () {
			var control = this,
			    controlDefaultSettings = elementor.config.controls[control.type];

			control = jQuery.extend({}, controlDefaultSettings, control);

			if (control.fields) {
				var styleFields = [];

				self.attributes[control.name].each(function (item) {
					styleFields.push(self.getStyleControls(control.fields, item.attributes));
				});

				control.styleFields = styleFields;
			}

			if (control.fields || control.dynamic && control.dynamic.active || self.isStyleControl(control.name, controls)) {
				styleControls.push(control);
			}
		});

		return styleControls;
	},

	isStyleControl: function isStyleControl(attribute, controls) {
		controls = controls || this.controls;

		var currentControl = _.find(controls, function (control) {
			return attribute === control.name;
		});

		return currentControl && !_.isEmpty(currentControl.selectors);
	},

	getClassControls: function getClassControls(controls) {
		controls = controls || this.controls;

		return _.filter(controls, function (control) {
			return !_.isUndefined(control.prefix_class);
		});
	},

	isClassControl: function isClassControl(attribute) {
		var currentControl = _.find(this.controls, function (control) {
			return attribute === control.name;
		});

		return currentControl && !_.isUndefined(currentControl.prefix_class);
	},

	getControl: function getControl(id) {
		return _.find(this.controls, function (control) {
			return id === control.name;
		});
	},

	getActiveControls: function getActiveControls(controls, attributes) {
		var activeControls = {};

		if (!controls) {
			controls = this.controls;
		}

		if (!attributes) {
			attributes = this.attributes;
		}

		_.each(controls, function (control, controlKey) {
			if (elementor.helpers.isActiveControl(control, attributes)) {
				activeControls[controlKey] = control;
			}
		});

		return activeControls;
	},

	clone: function clone() {
		return new BaseSettingsModel(elementor.helpers.cloneObject(this.attributes), elementor.helpers.cloneObject(this.options));
	},

	setExternalChange: function setExternalChange(key, value) {
		var self = this,
		    settingsToChange;

		if ('object' === (typeof key === 'undefined' ? 'undefined' : _typeof(key))) {
			settingsToChange = key;
		} else {
			settingsToChange = {};

			settingsToChange[key] = value;
		}

		self.set(settingsToChange);

		jQuery.each(settingsToChange, function (changedKey, changedValue) {
			self.trigger('change:external:' + changedKey, changedValue);
		});
	},

	parseDynamicSettings: function parseDynamicSettings(settings, options, controls) {
		var self = this;

		settings = elementor.helpers.cloneObject(settings || self.attributes);

		options = options || {};

		controls = controls || this.controls;

		jQuery.each(controls, function () {
			var control = this,
			    valueToParse;

			if ('repeater' === control.type) {
				valueToParse = settings[control.name];
				valueToParse.forEach(function (value, key) {
					valueToParse[key] = self.parseDynamicSettings(value, options, control.fields);
				});

				return;
			}

			valueToParse = settings.__dynamic__ && settings.__dynamic__[control.name];

			if (!valueToParse) {
				return;
			}

			var dynamicSettings = control.dynamic;

			if (undefined === dynamicSettings) {
				dynamicSettings = elementor.config.controls[control.type].dynamic;
			}

			if (!dynamicSettings || !dynamicSettings.active) {
				return;
			}

			var dynamicValue;

			try {
				dynamicValue = elementor.dynamicTags.parseTagsText(valueToParse, dynamicSettings, elementor.dynamicTags.getTagDataContent);
			} catch (error) {
				if (elementor.dynamicTags.CACHE_KEY_NOT_FOUND_ERROR !== error.message) {
					throw error;
				}

				dynamicValue = '';

				if (options.onServerRequestStart) {
					options.onServerRequestStart();
				}

				elementor.dynamicTags.refreshCacheFromServer(function () {
					if (options.onServerRequestEnd) {
						options.onServerRequestEnd();
					}
				});
			}

			if (dynamicSettings.property) {
				settings[control.name][dynamicSettings.property] = dynamicValue;
			} else {
				settings[control.name] = dynamicValue;
			}
		});

		return settings;
	},

	toJSON: function toJSON(options) {
		var data = Backbone.Model.prototype.toJSON.call(this);

		options = options || {};

		delete data.widgetType;
		delete data.elType;
		delete data.isInner;

		_.each(data, function (attribute, key) {
			if (attribute && attribute.toJSON) {
				data[key] = attribute.toJSON();
			}
		});

		if (options.removeDefault) {
			var controls = this.controls;

			_.each(data, function (value, key) {
				var control = controls[key];

				if (control) {
					// TODO: use `save_default` in text|textarea controls.
					if (control.save_default || ('text' === control.type || 'textarea' === control.type) && data[key]) {
						return;
					}

					if (data[key] && 'object' === _typeof(data[key])) {
						// First check length difference
						if (Object.keys(data[key]).length !== Object.keys(control['default']).length) {
							return;
						}

						// If it's equal length, loop over value
						var isEqual = true;

						_.each(data[key], function (propertyValue, propertyKey) {
							if (data[key][propertyKey] !== control['default'][propertyKey]) {
								return isEqual = false;
							}
						});

						if (isEqual) {
							delete data[key];
						}
					} else {
						if (data[key] === control['default']) {
							delete data[key];
						}
					}
				}
			});
		}

		return elementor.helpers.cloneObject(data);
	}
});

module.exports = BaseSettingsModel;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var ControlBaseDataView = __webpack_require__(0),
    ControlBaseMultipleItemView;

ControlBaseMultipleItemView = ControlBaseDataView.extend({

	applySavedValue: function applySavedValue() {
		var values = this.getControlValue(),
		    $inputs = this.$('[data-setting]'),
		    self = this;

		_.each(values, function (value, key) {
			var $input = $inputs.filter(function () {
				return key === this.dataset.setting;
			});

			self.setInputValue($input, value);
		});
	},

	getControlValue: function getControlValue(key) {
		var values = this.elementSettingsModel.get(this.model.get('name'));

		if (!jQuery.isPlainObject(values)) {
			return {};
		}

		if (key) {
			var value = values[key];

			if (undefined === value) {
				value = '';
			}

			return value;
		}

		return elementor.helpers.cloneObject(values);
	},

	setValue: function setValue(key, value) {
		var values = this.getControlValue();

		if ('object' === (typeof key === 'undefined' ? 'undefined' : _typeof(key))) {
			_.each(key, function (internalValue, internalKey) {
				values[internalKey] = internalValue;
			});
		} else {
			values[key] = value;
		}

		this.setSettingsModel(values);
	},

	updateElementModel: function updateElementModel(value, input) {
		var key = input.dataset.setting;

		this.setValue(key, value);
	}
}, {
	// Static methods
	getStyleValue: function getStyleValue(placeholder, controlValue) {
		if (!_.isObject(controlValue)) {
			return ''; // invalid
		}

		return controlValue[placeholder];
	}
});

module.exports = ControlBaseMultipleItemView;

/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ControlBaseDataView = __webpack_require__(0),
    ControlSelect2ItemView;

ControlSelect2ItemView = ControlBaseDataView.extend({
	getSelect2Placeholder: function getSelect2Placeholder() {
		return this.ui.select.children('option:first[value=""]').text();
	},

	getSelect2DefaultOptions: function getSelect2DefaultOptions() {
		return {
			allowClear: true,
			placeholder: this.getSelect2Placeholder(),
			dir: elementor.config.is_rtl ? 'rtl' : 'ltr'
		};
	},

	getSelect2Options: function getSelect2Options() {
		return jQuery.extend(this.getSelect2DefaultOptions(), this.model.get('select2options'));
	},

	onReady: function onReady() {
		this.ui.select.select2(this.getSelect2Options());
	},

	onBeforeDestroy: function onBeforeDestroy() {
		if (this.ui.select.data('select2')) {
			this.ui.select.select2('destroy');
		}

		this.$el.remove();
	}
});

module.exports = ControlSelect2ItemView;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ControlBaseView;

ControlBaseView = Marionette.CompositeView.extend({
	ui: function ui() {
		return {
			controlTitle: '.elementor-control-title'
		};
	},

	behaviors: function behaviors() {
		var behaviors = {};

		return elementor.hooks.applyFilters('controls/base/behaviors', behaviors, this);
	},

	getBehavior: function getBehavior(name) {
		return this._behaviors[Object.keys(this.behaviors()).indexOf(name)];
	},

	className: function className() {
		// TODO: Any better classes for that?
		var classes = 'elementor-control elementor-control-' + this.model.get('name') + ' elementor-control-type-' + this.model.get('type'),
		    modelClasses = this.model.get('classes'),
		    responsive = this.model.get('responsive');

		if (!_.isEmpty(modelClasses)) {
			classes += ' ' + modelClasses;
		}

		if (!_.isEmpty(responsive)) {
			classes += ' elementor-control-responsive-' + responsive.max;
		}

		return classes;
	},

	templateHelpers: function templateHelpers() {
		var controlData = {
			_cid: this.model.cid
		};

		return {
			data: _.extend({}, this.model.toJSON(), controlData)
		};
	},

	getTemplate: function getTemplate() {
		return Marionette.TemplateCache.get('#tmpl-elementor-control-' + this.model.get('type') + '-content');
	},

	initialize: function initialize(options) {
		this.elementSettingsModel = options.elementSettingsModel;

		var controlType = this.model.get('type'),
		    controlSettings = jQuery.extend(true, {}, elementor.config.controls[controlType], this.model.attributes);

		this.model.set(controlSettings);

		this.listenTo(this.elementSettingsModel, 'change', this.toggleControlVisibility);
	},

	toggleControlVisibility: function toggleControlVisibility() {
		var isVisible = elementor.helpers.isActiveControl(this.model, this.elementSettingsModel.attributes);

		this.$el.toggleClass('elementor-hidden-control', !isVisible);

		elementor.getPanelView().updateScrollbar();
	},

	onRender: function onRender() {
		var layoutType = this.model.get('label_block') ? 'block' : 'inline',
		    showLabel = this.model.get('show_label'),
		    elClasses = 'elementor-label-' + layoutType;

		elClasses += ' elementor-control-separator-' + this.model.get('separator');

		if (!showLabel) {
			elClasses += ' elementor-control-hidden-label';
		}

		this.$el.addClass(elClasses);

		this.toggleControlVisibility();
	}
});

module.exports = ControlBaseView;

/***/ }),
/* 8 */
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
/* 9 */
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

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var BaseSettingsModel = __webpack_require__(3),
    ControlsCSSParser = __webpack_require__(13),
    Validator = __webpack_require__(18),
    BaseContainer = __webpack_require__(28),
    BaseElementView;

BaseElementView = BaseContainer.extend({
	tagName: 'div',

	controlsCSSParser: null,

	allowRender: true,

	toggleEditTools: false,

	renderAttributes: {},

	className: function className() {
		var classes = 'elementor-element elementor-element-edit-mode ' + this.getElementUniqueID();

		if (this.toggleEditTools) {
			classes += ' elementor-element--toggle-edit-tools';
		}

		return classes;
	},

	attributes: function attributes() {
		var type = this.model.get('elType');

		if ('widget' === type) {
			type = this.model.get('widgetType');
		}

		return {
			'data-id': this.getID(),
			'data-element_type': type
		};
	},

	ui: function ui() {
		return {
			tools: '> .elementor-element-overlay > .elementor-editor-element-settings',
			editButton: '> .elementor-element-overlay .elementor-editor-element-edit',
			duplicateButton: '> .elementor-element-overlay .elementor-editor-element-duplicate',
			addButton: '> .elementor-element-overlay .elementor-editor-element-add',
			removeButton: '> .elementor-element-overlay .elementor-editor-element-remove'
		};
	},

	behaviors: function behaviors() {
		var groups = elementor.hooks.applyFilters('elements/' + this.options.model.get('elType') + '/contextMenuGroups', this.getContextMenuGroups(), this);

		var behaviors = {
			contextMenu: {
				behaviorClass: __webpack_require__(11),
				groups: groups
			}
		};

		return elementor.hooks.applyFilters('elements/base/behaviors', behaviors, this);
	},

	getBehavior: function getBehavior(name) {
		return this._behaviors[Object.keys(this.behaviors()).indexOf(name)];
	},

	events: function events() {
		return {
			'mousedown': 'onMouseDown',
			'click @ui.editButton': 'onEditButtonClick',
			'click @ui.duplicateButton': 'onDuplicateButtonClick',
			'click @ui.addButton': 'onAddButtonClick',
			'click @ui.removeButton': 'onRemoveButtonClick'
		};
	},

	getElementType: function getElementType() {
		return this.model.get('elType');
	},

	getIDInt: function getIDInt() {
		return parseInt(this.getID(), 16);
	},

	getChildType: function getChildType() {
		return elementor.helpers.getElementChildType(this.getElementType());
	},

	getChildView: function getChildView(model) {
		var ChildView,
		    elType = model.get('elType');

		if ('section' === elType) {
			ChildView = __webpack_require__(29);
		} else if ('column' === elType) {
			ChildView = __webpack_require__(90);
		} else {
			ChildView = elementor.modules.elements.views.Widget;
		}

		return elementor.hooks.applyFilters('element/view', ChildView, model, this);
	},

	// TODO: backward compatibility method since 1.8.0
	templateHelpers: function templateHelpers() {
		var templateHelpers = BaseContainer.prototype.templateHelpers.apply(this, arguments);

		return jQuery.extend(templateHelpers, {
			editModel: this.getEditModel() // @deprecated. Use view.getEditModel() instead.
		});
	},

	getTemplateType: function getTemplateType() {
		return 'js';
	},

	getEditModel: function getEditModel() {
		return this.model;
	},

	getContextMenuGroups: function getContextMenuGroups() {
		var elementType = this.options.model.get('elType'),
		    controlSign = elementor.envData.mac ? '⌘' : '^';

		return [{
			name: 'general',
			actions: [{
				name: 'edit',
				icon: 'eicon-edit',
				title: elementor.translate('edit_element', [elementor.helpers.firstLetterUppercase(elementType)]),
				callback: this.options.model.trigger.bind(this.options.model, 'request:edit')
			}, {
				name: 'duplicate',
				icon: 'eicon-clone',
				title: elementor.translate('duplicate'),
				shortcut: controlSign + '+D',
				callback: this.duplicate.bind(this)
			}]
		}, {
			name: 'transfer',
			actions: [{
				name: 'copy',
				title: elementor.translate('copy'),
				shortcut: controlSign + '+C',
				callback: this.copy.bind(this)
			}, {
				name: 'paste',
				title: elementor.translate('paste'),
				shortcut: controlSign + '+V',
				callback: this.paste.bind(this),
				isEnabled: this.isPasteEnabled.bind(this)
			}, {
				name: 'pasteStyle',
				title: elementor.translate('paste_style'),
				shortcut: controlSign + '+⇧+V',
				callback: this.pasteStyle.bind(this),
				isEnabled: function isEnabled() {
					return !!elementor.getStorage('transfer');
				}
			}, {
				name: 'resetStyle',
				title: elementor.translate('reset_style'),
				callback: this.resetStyle.bind(this)
			}]
		}, {
			name: 'delete',
			actions: [{
				name: 'delete',
				icon: 'eicon-trash',
				title: elementor.translate('delete'),
				shortcut: '⌦',
				callback: this.removeElement.bind(this)
			}]
		}];
	},

	initialize: function initialize() {
		BaseContainer.prototype.initialize.apply(this, arguments);

		if (this.collection) {
			this.listenTo(this.collection, 'add remove reset', this.onCollectionChanged, this);
		}

		var editModel = this.getEditModel();

		this.listenTo(editModel.get('settings'), 'change', this.onSettingsChanged).listenTo(editModel.get('editSettings'), 'change', this.onEditSettingsChanged).listenTo(this.model, 'request:edit', this.onEditRequest).listenTo(this.model, 'request:toggleVisibility', this.toggleVisibility);

		this.initControlsCSSParser();
	},

	startTransport: function startTransport(type) {
		elementor.setStorage('transfer', {
			type: type,
			elementsType: this.getElementType(),
			elements: [this.model.toJSON({ copyHtmlCache: true })]
		});
	},

	copy: function copy() {
		this.startTransport('copy');
	},

	cut: function cut() {
		this.startTransport('cut');
	},

	paste: function paste() {
		this.trigger('request:paste');
	},

	isPasteEnabled: function isPasteEnabled() {
		var transferData = elementor.getStorage('transfer');

		if (!transferData || this.isCollectionFilled()) {
			return false;
		}

		return this.getElementType() === transferData.elementsType;
	},

	isStyleTransferControl: function isStyleTransferControl(control) {
		if (undefined !== control.style_transfer) {
			return control.style_transfer;
		}

		return 'content' !== control.tab || control.selectors || control.prefix_class;
	},

	duplicate: function duplicate() {
		var oldTransport = elementor.getStorage('transfer');

		this.copy();

		this.paste();

		elementor.setStorage('transfer', oldTransport);
	},

	pasteStyle: function pasteStyle() {
		var self = this,
		    transferData = elementor.getStorage('transfer'),
		    sourceElement = transferData.elements[0],
		    sourceSettings = sourceElement.settings,
		    editModel = self.getEditModel(),
		    settings = editModel.get('settings'),
		    settingsAttributes = settings.attributes,
		    controls = settings.controls,
		    diffSettings = {};

		jQuery.each(controls, function (controlName, control) {
			if (!self.isStyleTransferControl(control)) {
				return;
			}

			var sourceValue = sourceSettings[controlName],
			    targetValue = settingsAttributes[controlName];

			if (undefined === sourceValue || undefined === targetValue) {
				return;
			}

			if ('object' === (typeof sourceValue === 'undefined' ? 'undefined' : _typeof(sourceValue))) {
				if ('object' !== (typeof targetValue === 'undefined' ? 'undefined' : _typeof(targetValue))) {
					return;
				}

				var isEqual = true;

				jQuery.each(sourceValue, function (propertyKey) {
					if (sourceValue[propertyKey] !== targetValue[propertyKey]) {
						return isEqual = false;
					}
				});

				if (isEqual) {
					return;
				}
			} else {
				if (sourceValue === targetValue) {
					return;
				}
			}

			var ControlView = elementor.getControlView(control.type);

			if (!ControlView.onPasteStyle(control, sourceValue)) {
				return;
			}

			diffSettings[controlName] = sourceValue;
		});

		self.allowRender = false;

		elementor.channels.data.trigger('element:before:paste:style', editModel);

		editModel.setSetting(diffSettings);

		elementor.channels.data.trigger('element:after:paste:style', editModel);

		self.allowRender = true;

		self.renderOnChange();
	},

	resetStyle: function resetStyle() {
		var self = this,
		    editModel = self.getEditModel(),
		    controls = editModel.get('settings').controls,
		    defaultValues = {};

		self.allowRender = false;

		elementor.channels.data.trigger('element:before:reset:style', editModel);

		jQuery.each(controls, function (controlName, control) {
			if (!self.isStyleTransferControl(control)) {
				return;
			}

			defaultValues[controlName] = control['default'];
		});

		editModel.setSetting(defaultValues);

		elementor.channels.data.trigger('element:after:reset:style', editModel);

		self.allowRender = true;

		self.renderOnChange();
	},

	toggleVisibility: function toggleVisibility() {
		this.model.set('hidden', !this.model.get('hidden'));

		this.toggleVisibilityClass();
	},

	toggleVisibilityClass: function toggleVisibilityClass() {
		this.$el.toggleClass('elementor-edit-hidden', !!this.model.get('hidden'));
	},

	addElementFromPanel: function addElementFromPanel(options) {
		options = options || {};

		var elementView = elementor.channels.panelElements.request('element:selected');

		var itemData = {
			elType: elementView.model.get('elType')
		};

		if ('widget' === itemData.elType) {
			itemData.widgetType = elementView.model.get('widgetType');
		} else if ('section' === itemData.elType) {
			itemData.isInner = true;
		} else {
			return;
		}

		var customData = elementView.model.get('custom');

		if (customData) {
			jQuery.extend(itemData, customData);
		}

		options.trigger = {
			beforeAdd: 'element:before:add',
			afterAdd: 'element:after:add'
		};

		options.onAfterAdd = function (newModel, newView) {
			if ('section' === newView.getElementType() && newView.isInner()) {
				newView.addChildElement();
			}
		};

		this.addChildElement(itemData, options);
	},

	addControlValidator: function addControlValidator(controlName, validationCallback) {
		validationCallback = validationCallback.bind(this);

		var validator = new Validator({ customValidationMethod: validationCallback }),
		    validators = this.getEditModel().get('settings').validators;

		if (!validators[controlName]) {
			validators[controlName] = [];
		}

		validators[controlName].push(validator);
	},

	addRenderAttribute: function addRenderAttribute(element, key, value, overwrite) {
		var self = this;

		if ('object' === (typeof element === 'undefined' ? 'undefined' : _typeof(element))) {
			jQuery.each(element, function (elementKey) {
				self.addRenderAttribute(elementKey, this, null, overwrite);
			});

			return self;
		}

		if ('object' === (typeof key === 'undefined' ? 'undefined' : _typeof(key))) {
			jQuery.each(key, function (attributeKey) {
				self.addRenderAttribute(element, attributeKey, this, overwrite);
			});

			return self;
		}

		if (!self.renderAttributes[element]) {
			self.renderAttributes[element] = {};
		}

		if (!self.renderAttributes[element][key]) {
			self.renderAttributes[element][key] = [];
		}

		if (!Array.isArray(value)) {
			value = [value];
		}

		if (overwrite) {
			self.renderAttributes[element][key] = value;
		} else {
			self.renderAttributes[element][key] = self.renderAttributes[element][key].concat(value);
		}
	},

	getRenderAttributeString: function getRenderAttributeString(element) {
		if (!this.renderAttributes[element]) {
			return '';
		}

		var renderAttributes = this.renderAttributes[element],
		    attributes = [];

		jQuery.each(renderAttributes, function (attributeKey) {
			attributes.push(attributeKey + '="' + _.escape(this.join(' ')) + '"');
		});

		return attributes.join(' ');
	},

	isInner: function isInner() {
		return !!this.model.get('isInner');
	},

	initControlsCSSParser: function initControlsCSSParser() {
		this.controlsCSSParser = new ControlsCSSParser({
			id: this.model.cid,
			settingsModel: this.getEditModel().get('settings'),
			dynamicParsing: this.getDynamicParsingSettings()
		});
	},

	enqueueFonts: function enqueueFonts() {
		var editModel = this.getEditModel(),
		    settings = editModel.get('settings');

		_.each(settings.getFontControls(), function (control) {
			var fontFamilyName = editModel.getSetting(control.name);

			if (_.isEmpty(fontFamilyName)) {
				return;
			}

			elementor.helpers.enqueueFont(fontFamilyName);
		});
	},

	renderStyles: function renderStyles(settings) {
		if (!settings) {
			settings = this.getEditModel().get('settings');
		}

		this.controlsCSSParser.stylesheet.empty();

		this.controlsCSSParser.addStyleRules(settings.getStyleControls(), settings.attributes, this.getEditModel().get('settings').controls, [/{{ID}}/g, /{{WRAPPER}}/g], [this.getID(), '#elementor .' + this.getElementUniqueID()]);

		this.controlsCSSParser.addStyleToDocument();

		var extraCSS = elementor.hooks.applyFilters('editor/style/styleText', '', this);

		if (extraCSS) {
			this.controlsCSSParser.elements.$stylesheetElement.append(extraCSS);
		}
	},

	renderCustomClasses: function renderCustomClasses() {
		var self = this;

		var settings = self.getEditModel().get('settings'),
		    classControls = settings.getClassControls();

		// Remove all previous classes
		_.each(classControls, function (control) {
			var previousClassValue = settings.previous(control.name);

			if (control.classes_dictionary) {
				if (undefined !== control.classes_dictionary[previousClassValue]) {
					previousClassValue = control.classes_dictionary[previousClassValue];
				}
			}

			self.$el.removeClass(control.prefix_class + previousClassValue);
		});

		// Add new classes
		_.each(classControls, function (control) {
			var value = settings.attributes[control.name],
			    classValue = value;

			if (control.classes_dictionary) {
				if (undefined !== control.classes_dictionary[value]) {
					classValue = control.classes_dictionary[value];
				}
			}

			var isVisible = elementor.helpers.isActiveControl(control, settings.attributes);

			if (isVisible && (classValue || 0 === classValue)) {
				self.$el.addClass(control.prefix_class + classValue);
			}
		});

		self.$el.addClass(_.result(self, 'className'));

		self.toggleVisibilityClass();
	},

	renderCustomElementID: function renderCustomElementID() {
		var customElementID = this.getEditModel().get('settings').get('_element_id');

		this.$el.attr('id', customElementID);
	},

	renderUI: function renderUI() {
		this.renderStyles();
		this.renderCustomClasses();
		this.renderCustomElementID();
		this.enqueueFonts();
	},

	runReadyTrigger: function runReadyTrigger() {
		var self = this;

		_.defer(function () {
			elementorFrontend.elementsHandler.runReadyTrigger(self.$el);

			if (!elementorFrontend.isEditMode()) {
				return;
			}

			// In edit mode - handle an external elements which loaded by another elements like shortcode etc.
			self.$el.find('.elementor-element.elementor-' + self.model.get('elType') + ':not(.elementor-element-edit-mode)').each(function () {
				elementorFrontend.elementsHandler.runReadyTrigger(jQuery(this));
			});
		});
	},

	getID: function getID() {
		return this.model.get('id');
	},

	getElementUniqueID: function getElementUniqueID() {
		return 'elementor-element-' + this.getID();
	},

	renderOnChange: function renderOnChange(settings) {
		if (!this.allowRender) {
			return;
		}

		// Make sure is correct model
		if (settings instanceof BaseSettingsModel) {
			var hasChanged = settings.hasChanged(),
			    isContentChanged = !hasChanged,
			    isRenderRequired = !hasChanged;

			_.each(settings.changedAttributes(), function (settingValue, settingKey) {
				var control = settings.getControl(settingKey);

				if ('_column_size' === settingKey) {
					isRenderRequired = true;
					return;
				}

				if (!control) {
					isRenderRequired = true;
					isContentChanged = true;
					return;
				}

				if ('none' !== control.render_type) {
					isRenderRequired = true;
				}

				if (-1 !== ['none', 'ui'].indexOf(control.render_type)) {
					return;
				}

				if ('template' === control.render_type || !settings.isStyleControl(settingKey) && !settings.isClassControl(settingKey) && '_element_id' !== settingKey) {
					isContentChanged = true;
				}
			});

			if (!isRenderRequired) {
				return;
			}

			if (!isContentChanged) {
				this.renderUI();
				return;
			}
		}

		// Re-render the template
		var templateType = this.getTemplateType(),
		    editModel = this.getEditModel();

		if ('js' === templateType) {
			this.getEditModel().setHtmlCache();
			this.render();
			editModel.renderOnLeave = true;
		} else {
			editModel.renderRemoteServer();
		}
	},

	getDynamicParsingSettings: function getDynamicParsingSettings() {
		var self = this;

		return {
			onServerRequestStart: function onServerRequestStart() {
				self.$el.addClass('elementor-loading');
			},
			onServerRequestEnd: function onServerRequestEnd() {
				self.render();

				self.$el.removeClass('elementor-loading');
			}
		};
	},

	serializeData: function serializeData() {
		var data = BaseContainer.prototype.serializeData.apply(this, arguments);

		data.settings = this.getEditModel().get('settings').parseDynamicSettings(data.settings, this.getDynamicParsingSettings());

		return data;
	},

	save: function save() {
		var model = this.model;

		elementor.templates.startModal({
			onReady: function onReady() {
				elementor.templates.getLayout().showSaveTemplateView(model);
			}
		});
	},

	removeElement: function removeElement() {
		elementor.channels.data.trigger('element:before:remove', this.model);

		var parent = this._parent;

		parent.isManualRemoving = true;

		this.model.destroy();

		parent.isManualRemoving = false;

		elementor.channels.data.trigger('element:after:remove', this.model);
	},

	onBeforeRender: function onBeforeRender() {
		this.renderAttributes = {};
	},

	onRender: function onRender() {
		this.renderUI();

		this.runReadyTrigger();

		if (this.toggleEditTools) {
			var editButton = this.ui.editButton;

			this.ui.tools.hoverIntent(function () {
				editButton.addClass('elementor-active');
			}, function () {
				editButton.removeClass('elementor-active');
			}, { timeout: 500 });
		}
	},

	onCollectionChanged: function onCollectionChanged() {
		elementor.saver.setFlagEditorChange(true);
	},

	onEditSettingsChanged: function onEditSettingsChanged(changedModel) {
		elementor.channels.editor.trigger('change:editSettings', changedModel, this);
	},

	onSettingsChanged: function onSettingsChanged(changedModel) {
		elementor.saver.setFlagEditorChange(true);

		this.renderOnChange(changedModel);
	},

	onEditButtonClick: function onEditButtonClick() {
		this.model.trigger('request:edit');
	},

	onEditRequest: function onEditRequest() {
		var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		if ('edit' !== elementor.channels.dataEditMode.request('activeMode')) {
			return;
		}

		var model = this.getEditModel(),
		    panel = elementor.getPanelView();

		if ('editor' === panel.getCurrentPageName() && panel.getCurrentPageView().model === model) {
			return;
		}

		if (options.scrollIntoView) {
			elementor.helpers.scrollToView(this.$el, 200);
		}

		panel.openEditor(model, this);
	},

	onDuplicateButtonClick: function onDuplicateButtonClick(event) {
		event.stopPropagation();

		this.duplicate();
	},

	onRemoveButtonClick: function onRemoveButtonClick(event) {
		event.stopPropagation();

		this.removeElement();
	},

	/* jQuery ui sortable preventing any `mousedown` event above any element, and as a result is preventing the `blur`
  * event on the currently active element. Therefor, we need to blur the active element manually.
  */
	onMouseDown: function onMouseDown(event) {
		if (jQuery(event.target).closest('.elementor-inline-editing').length) {
			return;
		}

		elementorFrontend.getElements('$document')[0].activeElement.blur();
	},

	onDestroy: function onDestroy() {
		this.controlsCSSParser.removeStyleFromDocument();

		elementor.channels.data.trigger('element:destroy', this.model);
	}
});

module.exports = BaseElementView;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ContextMenu = __webpack_require__(88);

module.exports = Marionette.Behavior.extend({

	defaults: {
		groups: [],
		eventTargets: ['el']
	},

	events: function events() {
		var events = {};

		this.getOption('eventTargets').forEach(function (eventTarget) {
			var eventName = 'contextmenu';

			if ('el' !== eventTarget) {
				eventName += ' ' + eventTarget;
			}

			events[eventName] = 'onContextMenu';
		});

		return events;
	},

	initialize: function initialize() {
		this.listenTo(this.view.options.model, 'request:contextmenu', this.onRequestContextMenu);
	},

	initContextMenu: function initContextMenu() {
		var contextMenuGroups = this.getOption('groups'),
		    deleteGroup = _.findWhere(contextMenuGroups, { name: 'delete' }),
		    afterGroupIndex = contextMenuGroups.indexOf(deleteGroup);

		if (-1 === afterGroupIndex) {
			afterGroupIndex = contextMenuGroups.length;
		}

		contextMenuGroups.splice(afterGroupIndex, 0, {
			name: 'tools',
			actions: [{
				name: 'navigator',
				title: elementor.translate('navigator'),
				callback: elementor.navigator.open.bind(elementor.navigator, this.view.model)
			}]
		});

		this.contextMenu = new ContextMenu({
			groups: contextMenuGroups
		});

		this.contextMenu.getModal().on('hide', this.onContextMenuHide);
	},

	getContextMenu: function getContextMenu() {
		if (!this.contextMenu) {
			this.initContextMenu();
		}

		return this.contextMenu;
	},

	onContextMenu: function onContextMenu(event) {
		if (elementor.hotKeys.isControlEvent(event) || !elementor.userCan('design')) {
			return;
		}

		if ('edit' !== elementor.channels.dataEditMode.request('activeMode')) {
			return;
		}

		event.preventDefault();

		event.stopPropagation();

		this.getContextMenu().show(event);

		elementor.channels.editor.reply('contextMenu:targetView', this.view);
	},

	onRequestContextMenu: function onRequestContextMenu(event) {
		var modal = this.getContextMenu().getModal(),
		    iframe = modal.getSettings('iframe'),
		    toolsGroup = _.findWhere(this.contextMenu.getSettings('groups'), { name: 'tools' });

		toolsGroup.isVisible = false;

		modal.setSettings('iframe', null);

		this.onContextMenu(event);

		toolsGroup.isVisible = true;

		modal.setSettings('iframe', iframe);
	},

	onContextMenuHide: function onContextMenuHide() {
		elementor.channels.editor.reply('contextMenu:targetView', null);
	},

	onDestroy: function onDestroy() {
		if (this.contextMenu) {
			this.contextMenu.destroy();
		}
	}
});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ControlsStack;

ControlsStack = Marionette.CompositeView.extend({
	className: 'elementor-panel-controls-stack',

	classes: {
		popover: 'elementor-controls-popover'
	},

	activeTab: null,

	activeSection: null,

	templateHelpers: function templateHelpers() {
		return {
			elementData: elementor.getElementData(this.model)
		};
	},

	ui: function ui() {
		return {
			tabs: '.elementor-panel-navigation-tab',
			reloadButton: '.elementor-update-preview-button'
		};
	},

	events: function events() {
		return {
			'click @ui.tabs': 'onClickTabControl',
			'click @ui.reloadButton': 'onReloadButtonClick'
		};
	},

	modelEvents: {
		'destroy': 'onModelDestroy'
	},

	behaviors: {
		HandleInnerTabs: {
			behaviorClass: __webpack_require__(31)
		}
	},

	initialize: function initialize() {
		this.initCollection();

		this.listenTo(elementor.channels.deviceMode, 'change', this.onDeviceModeChange);
	},

	initCollection: function initCollection() {
		this.collection = new Backbone.Collection(_.values(elementor.mergeControlsSettings(this.getOption('controls'))));
	},

	filter: function filter(controlModel) {
		if (controlModel.get('tab') !== this.activeTab) {
			return false;
		}

		if ('section' === controlModel.get('type')) {
			return true;
		}

		var section = controlModel.get('section');

		return !section || section === this.activeSection;
	},

	isVisibleSectionControl: function isVisibleSectionControl(sectionControlModel) {
		return this.activeTab === sectionControlModel.get('tab');
	},

	activateTab: function activateTab(tabName) {
		this.activeTab = tabName;

		this.ui.tabs.removeClass('elementor-active').filter('[data-tab="' + tabName + '"]').addClass('elementor-active');

		this.activateFirstSection();
	},

	activateSection: function activateSection(sectionName) {
		this.activeSection = sectionName;
	},

	activateFirstSection: function activateFirstSection() {
		var self = this;

		var sectionControls = self.collection.filter(function (controlModel) {
			return 'section' === controlModel.get('type') && self.isVisibleSectionControl(controlModel);
		});

		if (!sectionControls[0]) {
			return;
		}

		var preActivatedSection = sectionControls.filter(function (controlModel) {
			return self.activeSection === controlModel.get('name');
		});

		if (preActivatedSection[0]) {
			return;
		}

		self.activateSection(sectionControls[0].get('name'));
	},

	getChildView: function getChildView(item) {
		var controlType = item.get('type');

		return elementor.getControlView(controlType);
	},

	handlePopovers: function handlePopovers() {
		var self = this,
		    popoverStarted = false,
		    $popover;

		self.removePopovers();

		self.children.each(function (child) {
			if (popoverStarted) {
				$popover.append(child.$el);
			}

			var popover = child.model.get('popover');

			if (!popover) {
				return;
			}

			if (popover.start) {
				popoverStarted = true;

				$popover = jQuery('<div>', { 'class': self.classes.popover });

				child.$el.before($popover);

				$popover.append(child.$el);
			}

			if (popover.end) {
				popoverStarted = false;
			}
		});
	},

	removePopovers: function removePopovers() {
		this.$el.find('.' + this.classes.popover).remove();
	},

	openActiveSection: function openActiveSection() {
		var activeSection = this.activeSection,
		    activeSectionView = this.children.filter(function (view) {
			return activeSection === view.model.get('name');
		});

		if (activeSectionView[0]) {
			activeSectionView[0].$el.addClass('elementor-open');
		}
	},

	onRenderCollection: function onRenderCollection() {
		this.openActiveSection();

		this.handlePopovers();
	},

	onRenderTemplate: function onRenderTemplate() {
		this.activateTab(this.activeTab || this.ui.tabs.eq(0).data('tab'));
	},

	onModelDestroy: function onModelDestroy() {
		this.destroy();
	},

	onClickTabControl: function onClickTabControl(event) {
		event.preventDefault();

		var $tab = this.$(event.currentTarget),
		    tabName = $tab.data('tab');

		if (this.activeTab === tabName) {
			return;
		}

		this.activateTab(tabName);

		this._renderChildren();
	},

	onReloadButtonClick: function onReloadButtonClick() {
		elementor.reloadPreview();
	},

	onDeviceModeChange: function onDeviceModeChange() {
		this.$el.removeClass('elementor-responsive-switchers-open');
	},

	onChildviewControlSectionClicked: function onChildviewControlSectionClicked(childView) {
		var isSectionOpen = childView.$el.hasClass('elementor-open');

		this.activateSection(isSectionOpen ? null : childView.model.get('name'));

		this._renderChildren();
	},

	onChildviewResponsiveSwitcherClick: function onChildviewResponsiveSwitcherClick(childView, device) {
		if ('desktop' === device) {
			this.$el.toggleClass('elementor-responsive-switchers-open');
		}
	}
});

module.exports = ControlsStack;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ViewModule = __webpack_require__(1),
    Stylesheet = __webpack_require__(24),
    ControlsCSSParser;

ControlsCSSParser = ViewModule.extend({
	stylesheet: null,

	getDefaultSettings: function getDefaultSettings() {
		return {
			id: 0,
			settingsModel: null,
			dynamicParsing: {}
		};
	},

	getDefaultElements: function getDefaultElements() {
		return {
			$stylesheetElement: jQuery('<style>', { id: 'elementor-style-' + this.getSettings('id') })
		};
	},

	initStylesheet: function initStylesheet() {
		var breakpoints = elementorFrontend.config.breakpoints;

		this.stylesheet = new Stylesheet();

		this.stylesheet.addDevice('mobile', 0).addDevice('tablet', breakpoints.md).addDevice('desktop', breakpoints.lg);
	},

	addStyleRules: function addStyleRules(styleControls, values, controls, placeholders, replacements) {
		var self = this,
		    dynamicParsedValues = self.getSettings('settingsModel').parseDynamicSettings(values, self.getSettings('dynamicParsing'), styleControls);

		_.each(styleControls, function (control) {
			if (control.styleFields && control.styleFields.length) {
				self.addRepeaterControlsStyleRules(values[control.name], control.styleFields, controls, placeholders, replacements);
			}

			if (control.dynamic && control.dynamic.active && values.__dynamic__ && values.__dynamic__[control.name]) {
				self.addDynamicControlStyleRules(values.__dynamic__[control.name], control);
			}

			if (!control.selectors) {
				return;
			}

			self.addControlStyleRules(control, dynamicParsedValues, controls, placeholders, replacements);
		});
	},

	addControlStyleRules: function addControlStyleRules(control, values, controls, placeholders, replacements) {
		var self = this;

		ControlsCSSParser.addControlStyleRules(self.stylesheet, control, controls, function (control) {
			return self.getStyleControlValue(control, values);
		}, placeholders, replacements);
	},

	getStyleControlValue: function getStyleControlValue(control, values) {
		var value = values[control.name];

		if (control.selectors_dictionary) {
			value = control.selectors_dictionary[value] || value;
		}

		if (!_.isNumber(value) && _.isEmpty(value)) {
			return;
		}

		return value;
	},

	addRepeaterControlsStyleRules: function addRepeaterControlsStyleRules(repeaterValues, repeaterControlsItems, controls, placeholders, replacements) {
		var self = this;

		repeaterControlsItems.forEach(function (item, index) {
			var itemModel = repeaterValues.models[index];

			self.addStyleRules(item, itemModel.attributes, controls, placeholders.concat(['{{CURRENT_ITEM}}']), replacements.concat(['.elementor-repeater-item-' + itemModel.get('_id')]));
		});
	},

	addDynamicControlStyleRules: function addDynamicControlStyleRules(value, control) {
		var self = this;

		elementor.dynamicTags.parseTagsText(value, control.dynamic, function (id, name, settings) {
			var tag = elementor.dynamicTags.createTag(id, name, settings);

			if (!tag) {
				return;
			}

			var tagSettingsModel = tag.model,
			    styleControls = tagSettingsModel.getStyleControls();

			if (!styleControls.length) {
				return;
			}

			self.addStyleRules(tagSettingsModel.getStyleControls(), tagSettingsModel.attributes, tagSettingsModel.controls, ['{{WRAPPER}}'], ['#elementor-tag-' + id]);
		});
	},

	addStyleToDocument: function addStyleToDocument() {
		elementor.$previewContents.find('head').append(this.elements.$stylesheetElement);

		this.elements.$stylesheetElement.text(this.stylesheet);
	},

	removeStyleFromDocument: function removeStyleFromDocument() {
		this.elements.$stylesheetElement.remove();
	},

	onInit: function onInit() {
		ViewModule.prototype.onInit.apply(this, arguments);

		this.initStylesheet();
	}
});

ControlsCSSParser.addControlStyleRules = function (stylesheet, control, controls, valueCallback, placeholders, replacements) {
	var value = valueCallback(control);

	if (undefined === value) {
		return;
	}

	_.each(control.selectors, function (cssProperty, selector) {
		var outputCssProperty;

		try {
			outputCssProperty = cssProperty.replace(/{{(?:([^.}]+)\.)?([^}]*)}}/g, function (originalPhrase, controlName, placeholder) {
				var parserControl = control,
				    valueToInsert = value;

				if (controlName) {
					parserControl = _.findWhere(controls, { name: controlName });

					if (!parserControl) {
						return '';
					}

					valueToInsert = valueCallback(parserControl);
				}

				var parsedValue = elementor.getControlView(parserControl.type).getStyleValue(placeholder.toLowerCase(), valueToInsert);

				if ('' === parsedValue) {
					throw '';
				}

				return parsedValue;
			});
		} catch (e) {
			return;
		}

		if (_.isEmpty(outputCssProperty)) {
			return;
		}

		var devicePattern = /^(?:\([^)]+\)){1,2}/,
		    deviceRules = selector.match(devicePattern),
		    query = {};

		if (deviceRules) {
			deviceRules = deviceRules[0];

			selector = selector.replace(devicePattern, '');

			var pureDevicePattern = /\(([^)]+)\)/g,
			    pureDeviceRules = [],
			    matches;

			while (matches = pureDevicePattern.exec(deviceRules)) {
				pureDeviceRules.push(matches[1]);
			}

			_.each(pureDeviceRules, function (deviceRule) {
				if ('desktop' === deviceRule) {
					return;
				}

				var device = deviceRule.replace(/\+$/, ''),
				    endPoint = device === deviceRule ? 'max' : 'min';

				query[endPoint] = device;
			});
		}

		_.each(placeholders, function (placeholder, index) {
			// Check if it's a RegExp
			var regexp = placeholder.source ? placeholder.source : placeholder,
			    placeholderPattern = new RegExp(regexp, 'g');

			selector = selector.replace(placeholderPattern, replacements[index]);
		});

		if (!Object.keys(query).length && control.responsive) {
			query = _.pick(elementor.helpers.cloneObject(control.responsive), ['min', 'max']);

			if ('desktop' === query.max) {
				delete query.max;
			}
		}

		stylesheet.addRules(selector, outputCssProperty, query);
	});
};

module.exports = ControlsCSSParser;

/***/ }),
/* 14 */
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TemplateLibraryLoadingView;

TemplateLibraryLoadingView = Marionette.ItemView.extend({
	id: 'elementor-template-library-loading',

	template: '#tmpl-elementor-template-library-loading'
});

module.exports = TemplateLibraryLoadingView;

/***/ }),
/* 16 */
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
/* 17 */
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Module = __webpack_require__(2),
    Validator;

Validator = Module.extend({
	errors: [],

	__construct: function __construct(settings) {
		var customValidationMethod = settings.customValidationMethod;

		if (customValidationMethod) {
			this.validationMethod = customValidationMethod;
		}
	},

	getDefaultSettings: function getDefaultSettings() {
		return {
			validationTerms: {}
		};
	},

	isValid: function isValid() {
		var validationErrors = this.validationMethod.apply(this, arguments);

		if (validationErrors.length) {
			this.errors = validationErrors;

			return false;
		}

		return true;
	},

	validationMethod: function validationMethod(newValue) {
		var validationTerms = this.getSettings('validationTerms'),
		    errors = [];

		if (validationTerms.required) {
			if (!('' + newValue).length) {
				errors.push('Required value is empty');
			}
		}

		return errors;
	}
});

module.exports = Validator;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SortableBehavior;

SortableBehavior = Marionette.Behavior.extend({
	defaults: {
		elChildType: 'widget'
	},

	events: {
		sortstart: 'onSortStart',
		sortreceive: 'onSortReceive',
		sortupdate: 'onSortUpdate',
		sortover: 'onSortOver',
		sortout: 'onSortOut'
	},

	initialize: function initialize() {
		this.listenTo(elementor.channels.dataEditMode, 'switch', this.onEditModeSwitched).listenTo(this.view.options.model, 'request:sort:start', this.startSort).listenTo(this.view.options.model, 'request:sort:update', this.updateSort).listenTo(this.view.options.model, 'request:sort:receive', this.receiveSort);
	},

	onEditModeSwitched: function onEditModeSwitched(activeMode) {
		if ('edit' === activeMode) {
			this.activate();
		} else {
			this.deactivate();
		}
	},

	onRender: function onRender() {
		var self = this;

		_.defer(function () {
			self.onEditModeSwitched(elementor.channels.dataEditMode.request('activeMode'));
		});
	},

	onDestroy: function onDestroy() {
		this.deactivate();
	},

	activate: function activate() {
		if (!elementor.userCan('design')) {
			return;
		}

		if (this.getChildViewContainer().sortable('instance')) {
			return;
		}

		var $childViewContainer = this.getChildViewContainer(),
		    defaultSortableOptions = {
			connectWith: $childViewContainer.selector,
			placeholder: 'elementor-sortable-placeholder elementor-' + this.getOption('elChildType') + '-placeholder',
			cursorAt: {
				top: 20,
				left: 25
			},
			helper: this._getSortableHelper.bind(this),
			cancel: 'input, textarea, button, select, option, .elementor-inline-editing, .elementor-tab-title'

		},
		    sortableOptions = _.extend(defaultSortableOptions, this.view.getSortableOptions());

		$childViewContainer.sortable(sortableOptions);
	},

	_getSortableHelper: function _getSortableHelper(event, $item) {
		var model = this.view.collection.get({
			cid: $item.data('model-cid')
		});

		return '<div style="height: 84px; width: 125px;" class="elementor-sortable-helper elementor-sortable-helper-' + model.get('elType') + '"><div class="icon"><i class="' + model.getIcon() + '"></i></div><div class="elementor-element-title-wrapper"><div class="title">' + model.getTitle() + '</div></div></div>';
	},

	getChildViewContainer: function getChildViewContainer() {
		return this.view.getChildViewContainer(this.view);
	},

	deactivate: function deactivate() {
		var childViewContainer = this.getChildViewContainer();

		if (childViewContainer.sortable('instance')) {
			childViewContainer.sortable('destroy');
		}
	},

	startSort: function startSort(event, ui) {
		event.stopPropagation();

		var model = this.view.collection.get({
			cid: ui.item.data('model-cid')
		});

		elementor.channels.data.reply('dragging:model', model).reply('dragging:parent:view', this.view).trigger('drag:start', model).trigger(model.get('elType') + ':drag:start');
	},

	updateSort: function updateSort(ui) {
		var model = elementor.channels.data.request('dragging:model'),
		    $childElement = ui.item,
		    collection = this.view.collection,
		    newIndex = $childElement.parent().children().index($childElement),
		    child = this.view.children.findByModelCid(model.cid);

		this.view.addChildElement(model.clone(), {
			at: newIndex,
			trigger: {
				beforeAdd: 'drag:before:update',
				afterAdd: 'drag:after:update'
			},
			onBeforeAdd: function onBeforeAdd() {
				child._isRendering = true;

				collection.remove(model);
			}
		});

		elementor.saver.setFlagEditorChange(true);
	},

	receiveSort: function receiveSort(event, ui) {
		event.stopPropagation();

		if (this.view.isCollectionFilled()) {
			jQuery(ui.sender).sortable('cancel');

			return;
		}

		var model = elementor.channels.data.request('dragging:model'),
		    draggedElType = model.get('elType'),
		    draggedIsInnerSection = 'section' === draggedElType && model.get('isInner'),
		    targetIsInnerColumn = 'column' === this.view.getElementType() && this.view.isInner();

		if (draggedIsInnerSection && targetIsInnerColumn) {
			jQuery(ui.sender).sortable('cancel');

			return;
		}

		var newIndex = ui.item.index(),
		    modelData = model.toJSON({ copyHtmlCache: true });

		this.view.addChildElement(modelData, {
			at: newIndex,
			trigger: {
				beforeAdd: 'drag:before:update',
				afterAdd: 'drag:after:update'
			},
			onAfterAdd: function onAfterAdd() {
				var senderSection = elementor.channels.data.request('dragging:parent:view');

				senderSection.isManualRemoving = true;

				model.destroy();

				senderSection.isManualRemoving = false;
			}
		});
	},

	onSortStart: function onSortStart(event, ui) {
		if ('column' === this.options.elChildType) {
			var uiData = ui.item.data('sortableItem'),
			    uiItems = uiData.items,
			    itemHeight = 0;

			uiItems.forEach(function (item) {
				if (item.item[0] === ui.item[0]) {
					itemHeight = item.height;
					return false;
				}
			});

			ui.placeholder.height(itemHeight);
		}

		this.startSort(event, ui);
	},

	onSortOver: function onSortOver(event) {
		event.stopPropagation();

		var model = elementor.channels.data.request('dragging:model');

		jQuery(event.target).addClass('elementor-draggable-over').attr({
			'data-dragged-element': model.get('elType'),
			'data-dragged-is-inner': model.get('isInner')
		});

		this.$el.addClass('elementor-dragging-on-child');
	},

	onSortOut: function onSortOut(event) {
		event.stopPropagation();

		jQuery(event.target).removeClass('elementor-draggable-over').removeAttr('data-dragged-element data-dragged-is-inner');

		this.$el.removeClass('elementor-dragging-on-child');
	},

	onSortReceive: function onSortReceive(event, ui) {
		this.receiveSort(event, ui);
	},

	onSortUpdate: function onSortUpdate(event, ui) {
		event.stopPropagation();

		if (this.getChildViewContainer()[0] !== ui.item.parent()[0]) {
			return;
		}

		this.updateSort(ui);
	},

	onAddChild: function onAddChild(view) {
		view.$el.attr('data-model-cid', view.model.cid);
	}
});

module.exports = SortableBehavior;

/***/ }),
/* 20 */
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ViewModule = __webpack_require__(1),
    SettingsModel = __webpack_require__(3),
    ControlsCSSParser = __webpack_require__(13);

module.exports = ViewModule.extend({
	model: null,

	hasChange: false,

	changeCallbacks: {},

	addChangeCallback: function addChangeCallback(attribute, callback) {
		this.changeCallbacks[attribute] = callback;
	},

	bindEvents: function bindEvents() {
		elementor.on('preview:loaded', this.onElementorPreviewLoaded);

		this.model.on('change', this.onModelChange);
	},

	addPanelPage: function addPanelPage() {
		var name = this.getSettings('name');

		elementor.getPanelView().addPage(name + '_settings', {
			view: elementor.settings.panelPages[name] || elementor.settings.panelPages.base,
			title: this.getSettings('panelPage.title'),
			options: {
				model: this.model,
				controls: this.model.controls,
				name: name
			}
		});
	},

	updateStylesheet: function updateStylesheet(keepOldEntries) {
		var controlsCSS = this.getControlsCSS();

		if (!keepOldEntries) {
			controlsCSS.stylesheet.empty();
		}

		controlsCSS.addStyleRules(this.model.getStyleControls(), this.model.attributes, this.model.controls, [/{{WRAPPER}}/g], [this.getSettings('cssWrapperSelector')]);

		controlsCSS.addStyleToDocument();
	},

	initModel: function initModel() {
		this.model = new SettingsModel(this.getSettings('settings'), {
			controls: this.getSettings('controls')
		});
	},

	initControlsCSSParser: function initControlsCSSParser() {
		var controlsCSS;

		this.getControlsCSS = function () {
			if (!controlsCSS) {
				controlsCSS = new ControlsCSSParser({
					id: this.getSettings('name'),
					settingsModel: this.model
				});

				/*
     * @deprecated 2.1.0
     */
				this.controlsCSS = controlsCSS;
			}

			return controlsCSS;
		};
	},

	getDataToSave: function getDataToSave(data) {
		return data;
	},

	save: function save(callback) {
		var self = this;

		if (!self.hasChange) {
			return;
		}

		var settings = this.model.toJSON({ removeDefault: true }),
		    data = this.getDataToSave({
			data: settings
		});

		NProgress.start();

		elementor.ajax.addRequest('save_' + this.getSettings('name') + '_settings', {
			data: data,
			success: function success() {
				NProgress.done();

				self.setSettings('settings', settings);

				self.hasChange = false;

				if (callback) {
					callback.apply(self, arguments);
				}
			},
			error: function error() {
				alert('An error occurred');
			}
		});
	},

	addPanelMenuItem: function addPanelMenuItem() {
		var menuSettings = this.getSettings('panelPage.menu');

		if (!menuSettings) {
			return;
		}

		var menuItemOptions = {
			icon: menuSettings.icon,
			title: this.getSettings('panelPage.title'),
			type: 'page',
			pageName: this.getSettings('name') + '_settings'
		};

		elementor.modules.layouts.panel.pages.menu.Menu.addItem(menuItemOptions, 'settings', menuSettings.beforeItem);
	},

	onInit: function onInit() {
		this.initModel();

		this.initControlsCSSParser();

		this.addPanelMenuItem();

		this.debounceSave = _.debounce(this.save, 3000);

		ViewModule.prototype.onInit.apply(this, arguments);
	},

	onModelChange: function onModelChange(model) {
		var self = this;

		self.hasChange = true;

		this.getControlsCSS().stylesheet.empty();

		_.each(model.changed, function (value, key) {
			if (self.changeCallbacks[key]) {
				self.changeCallbacks[key].call(self, value);
			}
		});

		self.updateStylesheet(true);

		self.debounceSave();
	},

	onElementorPreviewLoaded: function onElementorPreviewLoaded() {
		this.updateStylesheet();

		this.addPanelPage();

		if (!elementor.userCan('design')) {
			elementor.panel.currentView.setPage('page_settings');
		}
	}
});

/***/ }),
/* 22 */,
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Marionette.Region.extend({

	storage: null,

	storageSizeKeys: null,

	constructor: function constructor() {
		Marionette.Region.prototype.constructor.apply(this, arguments);

		var savedStorage = elementor.getStorage(this.getStorageKey());

		this.storage = savedStorage ? savedStorage : this.getDefaultStorage();

		this.storageSizeKeys = Object.keys(this.storage.size);
	},

	saveStorage: function saveStorage(key, value) {
		this.storage[key] = value;

		elementor.setStorage(this.getStorageKey(), this.storage);
	},

	saveSize: function saveSize() {
		this.saveStorage('size', elementor.helpers.getElementInlineStyle(this.$el, this.storageSizeKeys));
	}
});

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function ($) {

	var Stylesheet = function Stylesheet() {
		var self = this,
		    rules = {},
		    rawCSS = {},
		    devices = {};

		var getDeviceMaxValue = function getDeviceMaxValue(deviceName) {
			var deviceNames = Object.keys(devices),
			    deviceNameIndex = deviceNames.indexOf(deviceName),
			    nextIndex = deviceNameIndex + 1;

			if (nextIndex >= deviceNames.length) {
				throw new RangeError('Max value for this device is out of range.');
			}

			return devices[deviceNames[nextIndex]] - 1;
		};

		var queryToHash = function queryToHash(query) {
			var hash = [];

			$.each(query, function (endPoint) {
				hash.push(endPoint + '_' + this);
			});

			return hash.join('-');
		};

		var hashToQuery = function hashToQuery(hash) {
			var query = {};

			hash = hash.split('-').filter(String);

			hash.forEach(function (singleQuery) {
				var queryParts = singleQuery.split('_'),
				    endPoint = queryParts[0],
				    deviceName = queryParts[1];

				query[endPoint] = 'max' === endPoint ? getDeviceMaxValue(deviceName) : devices[deviceName];
			});

			return query;
		};

		var addQueryHash = function addQueryHash(queryHash) {
			rules[queryHash] = {};

			var hashes = Object.keys(rules);

			if (hashes.length < 2) {
				return;
			}

			// Sort the devices from narrowest to widest
			hashes.sort(function (a, b) {
				if ('all' === a) {
					return -1;
				}

				if ('all' === b) {
					return 1;
				}

				var aQuery = hashToQuery(a),
				    bQuery = hashToQuery(b);

				return bQuery.max - aQuery.max;
			});

			var sortedRules = {};

			hashes.forEach(function (deviceName) {
				sortedRules[deviceName] = rules[deviceName];
			});

			rules = sortedRules;
		};

		var getQueryHashStyleFormat = function getQueryHashStyleFormat(queryHash) {
			var query = hashToQuery(queryHash),
			    styleFormat = [];

			$.each(query, function (endPoint) {
				styleFormat.push('(' + endPoint + '-width:' + this + 'px)');
			});

			return '@media' + styleFormat.join(' and ');
		};

		this.addDevice = function (deviceName, deviceValue) {
			devices[deviceName] = deviceValue;

			var deviceNames = Object.keys(devices);

			if (deviceNames.length < 2) {
				return self;
			}

			// Sort the devices from narrowest to widest
			deviceNames.sort(function (a, b) {
				return devices[a] - devices[b];
			});

			var sortedDevices = {};

			deviceNames.forEach(function (deviceName) {
				sortedDevices[deviceName] = devices[deviceName];
			});

			devices = sortedDevices;

			return self;
		};

		this.addRawCSS = function (key, css) {
			rawCSS[key] = css;
		};

		this.addRules = function (selector, styleRules, query) {
			var queryHash = 'all';

			if (!_.isEmpty(query)) {
				queryHash = queryToHash(query);
			}

			if (!rules[queryHash]) {
				addQueryHash(queryHash);
			}

			if (!styleRules) {
				var parsedRules = selector.match(/[^{]+\{[^}]+}/g);

				$.each(parsedRules, function () {
					var parsedRule = this.match(/([^{]+)\{([^}]+)}/);

					if (parsedRule) {
						self.addRules(parsedRule[1].trim(), parsedRule[2].trim(), query);
					}
				});

				return;
			}

			if (!rules[queryHash][selector]) {
				rules[queryHash][selector] = {};
			}

			if ('string' === typeof styleRules) {
				styleRules = styleRules.split(';').filter(String);

				var orderedRules = {};

				try {
					$.each(styleRules, function () {
						var property = this.split(/:(.*)?/);

						orderedRules[property[0].trim()] = property[1].trim().replace(';', '');
					});
				} catch (error) {
					// At least one of the properties is incorrect
					return;
				}

				styleRules = orderedRules;
			}

			$.extend(rules[queryHash][selector], styleRules);

			return self;
		};

		this.getRules = function () {
			return rules;
		};

		this.empty = function () {
			rules = {};
			rawCSS = {};
		};

		this.toString = function () {
			var styleText = '';

			$.each(rules, function (queryHash) {
				var deviceText = Stylesheet.parseRules(this);

				if ('all' !== queryHash) {
					deviceText = getQueryHashStyleFormat(queryHash) + '{' + deviceText + '}';
				}

				styleText += deviceText;
			});

			$.each(rawCSS, function () {
				styleText += this;
			});

			return styleText;
		};
	};

	Stylesheet.parseRules = function (rules) {
		var parsedRules = '';

		$.each(rules, function (selector) {
			var selectorContent = Stylesheet.parseProperties(this);

			if (selectorContent) {
				parsedRules += selector + '{' + selectorContent + '}';
			}
		});

		return parsedRules;
	};

	Stylesheet.parseProperties = function (properties) {
		var parsedProperties = '';

		$.each(properties, function (propertyKey) {
			if (this) {
				parsedProperties += propertyKey + ':' + this + ';';
			}
		});

		return parsedProperties;
	};

	module.exports = Stylesheet;
})(jQuery);

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var InsertTemplateHandler;

InsertTemplateHandler = Marionette.Behavior.extend({
	ui: {
		insertButton: '.elementor-template-library-template-insert'
	},

	events: {
		'click @ui.insertButton': 'onInsertButtonClick'
	},

	onInsertButtonClick: function onInsertButtonClick() {
		if (this.view.model.get('hasPageSettings')) {
			InsertTemplateHandler.showImportDialog(this.view.model);
			return;
		}

		elementor.templates.importTemplate(this.view.model);
	}
}, {
	dialog: null,

	showImportDialog: function showImportDialog(model) {
		var dialog = InsertTemplateHandler.getDialog();

		dialog.onConfirm = function () {
			elementor.templates.importTemplate(model, { withPageSettings: true });
		};

		dialog.onCancel = function () {
			elementor.templates.importTemplate(model);
		};

		dialog.show();
	},

	initDialog: function initDialog() {
		InsertTemplateHandler.dialog = elementor.dialogsManager.createWidget('confirm', {
			id: 'elementor-insert-template-settings-dialog',
			headerMessage: elementor.translate('import_template_dialog_header'),
			message: elementor.translate('import_template_dialog_message') + '<br>' + elementor.translate('import_template_dialog_message_attention'),
			strings: {
				confirm: elementor.translate('yes'),
				cancel: elementor.translate('no')
			}
		});
	},

	getDialog: function getDialog() {
		if (!InsertTemplateHandler.dialog) {
			InsertTemplateHandler.initDialog();
		}

		return InsertTemplateHandler.dialog;
	}
});

module.exports = InsertTemplateHandler;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TemplateLibraryInsertTemplateBehavior = __webpack_require__(25),
    TemplateLibraryTemplateView;

TemplateLibraryTemplateView = Marionette.ItemView.extend({
	className: function className() {
		var classes = 'elementor-template-library-template',
		    source = this.model.get('source');

		classes += ' elementor-template-library-template-' + source;

		if ('remote' === source) {
			classes += ' elementor-template-library-template-' + this.model.get('type');
		}

		if (this.model.get('isPro')) {
			classes += ' elementor-template-library-pro-template';
		}

		return classes;
	},

	ui: function ui() {
		return {
			previewButton: '.elementor-template-library-template-preview'
		};
	},

	events: function events() {
		return {
			'click @ui.previewButton': 'onPreviewButtonClick'
		};
	},

	behaviors: {
		insertTemplate: {
			behaviorClass: TemplateLibraryInsertTemplateBehavior
		}
	}
});

module.exports = TemplateLibraryTemplateView;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Backbone.Model.extend({
	defaults: {
		id: 0,
		type: '',
		elementType: '',
		status: 'not_applied',
		title: '',
		subTitle: '',
		action: '',
		history: {}
	},

	initialize: function initialize() {
		this.set('items', new Backbone.Collection());
	}
});

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Marionette.CompositeView.extend({

	templateHelpers: function templateHelpers() {
		return {
			view: this
		};
	},

	getBehavior: function getBehavior(name) {
		return this._behaviors[Object.keys(this.behaviors()).indexOf(name)];
	},

	initialize: function initialize() {
		this.collection = this.model.get('elements');
	},

	addChildModel: function addChildModel(model, options) {
		return this.collection.add(model, options, true);
	},

	addChildElement: function addChildElement(data, options) {
		if (this.isCollectionFilled()) {
			return;
		}

		options = jQuery.extend({
			trigger: false,
			edit: true,
			onBeforeAdd: null,
			onAfterAdd: null
		}, options);

		var childTypes = this.getChildType(),
		    newItem,
		    elType;

		if (data instanceof Backbone.Model) {
			newItem = data;

			elType = newItem.get('elType');
		} else {
			newItem = {
				id: elementor.helpers.getUniqueID(),
				elType: childTypes[0],
				settings: {},
				elements: []
			};

			if (data) {
				jQuery.extend(newItem, data);
			}

			elType = newItem.elType;
		}

		if (-1 === childTypes.indexOf(elType)) {
			return this.children.last().addChildElement(newItem, options);
		}

		if (options.clone) {
			newItem = this.cloneItem(newItem);
		}

		if (options.trigger) {
			elementor.channels.data.trigger(options.trigger.beforeAdd, newItem);
		}

		if (options.onBeforeAdd) {
			options.onBeforeAdd();
		}

		var newModel = this.addChildModel(newItem, { at: options.at }),
		    newView = this.children.findByModel(newModel);

		if (options.onAfterAdd) {
			options.onAfterAdd(newModel, newView);
		}

		if (options.trigger) {
			elementor.channels.data.trigger(options.trigger.afterAdd, newItem);
		}

		if (options.edit) {
			newModel.trigger('request:edit');
		}

		return newView;
	},

	cloneItem: function cloneItem(item) {
		var self = this;

		if (item instanceof Backbone.Model) {
			return item.clone();
		}

		item.id = elementor.helpers.getUniqueID();

		item.settings._element_id = '';

		item.elements.forEach(function (childItem, index) {
			item.elements[index] = self.cloneItem(childItem);
		});

		return item;
	},

	isCollectionFilled: function isCollectionFilled() {
		return false;
	},

	onChildviewRequestAddNew: function onChildviewRequestAddNew(childView) {
		this.addChildElement({}, {
			at: childView.$el.index() + 1,
			trigger: {
				beforeAdd: 'element:before:add',
				afterAdd: 'element:after:add'
			}
		});
	},

	onChildviewRequestPaste: function onChildviewRequestPaste(childView) {
		var self = this;

		if (self.isCollectionFilled()) {
			return;
		}

		var elements = elementor.getStorage('transfer').elements,
		    index = self.collection.indexOf(childView.model);

		elementor.channels.data.trigger('element:before:add', elements[0]);

		elements.forEach(function (item) {
			index++;

			self.addChildElement(item, { at: index, clone: true });
		});

		elementor.channels.data.trigger('element:after:add', elements[0]);
	}
});

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _inline = __webpack_require__(89);

var _inline2 = _interopRequireDefault(_inline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseElementView = __webpack_require__(10),
    SectionView;

SectionView = BaseElementView.extend({
	template: Marionette.TemplateCache.get('#tmpl-elementor-section-content'),

	addSectionView: null,

	className: function className() {
		var classes = BaseElementView.prototype.className.apply(this, arguments),
		    type = this.isInner() ? 'inner' : 'top';

		return classes + ' elementor-section elementor-' + type + '-section';
	},

	tagName: function tagName() {
		return this.model.getSetting('html_tag') || 'section';
	},

	childViewContainer: '> .elementor-container > .elementor-row',

	behaviors: function behaviors() {
		var behaviors = BaseElementView.prototype.behaviors.apply(this, arguments);

		_.extend(behaviors, {
			Sortable: {
				behaviorClass: __webpack_require__(19),
				elChildType: 'column'
			}
		});

		return elementor.hooks.applyFilters('elements/section/behaviors', behaviors, this);
	},

	errors: {
		columnWidthTooLarge: 'New column width is too large',
		columnWidthTooSmall: 'New column width is too small'
	},

	initialize: function initialize() {
		BaseElementView.prototype.initialize.apply(this, arguments);

		this.listenTo(this.collection, 'add remove reset', this._checkIsFull);

		this._checkIsEmpty();
	},

	getContextMenuGroups: function getContextMenuGroups() {
		var groups = BaseElementView.prototype.getContextMenuGroups.apply(this, arguments),
		    transferGroupIndex = groups.indexOf(_.findWhere(groups, { name: 'transfer' }));

		groups.splice(transferGroupIndex + 1, 0, {
			name: 'save',
			actions: [{
				name: 'save',
				title: elementor.translate('save_as_block'),
				callback: this.save.bind(this)
			}]
		});

		return groups;
	},

	addChildModel: function addChildModel(model, options) {
		var isModelInstance = model instanceof Backbone.Model,
		    isInner = this.isInner();

		if (isModelInstance) {
			model.set('isInner', isInner);
		} else {
			model.isInner = isInner;
		}

		return BaseElementView.prototype.addChildModel.apply(this, arguments);
	},

	getSortableOptions: function getSortableOptions() {
		var sectionConnectClass = this.isInner() ? '.elementor-inner-section' : '.elementor-top-section';

		return {
			connectWith: sectionConnectClass + ' > .elementor-container > .elementor-row',
			handle: '> .elementor-element-overlay .elementor-editor-element-edit',
			items: '> .elementor-column',
			forcePlaceholderSize: true,
			tolerance: 'pointer'
		};
	},

	getColumnPercentSize: function getColumnPercentSize(element, size) {
		return +(size / element.parent().width() * 100).toFixed(3);
	},

	getDefaultStructure: function getDefaultStructure() {
		return this.collection.length + '0';
	},

	getStructure: function getStructure() {
		return this.model.getSetting('structure');
	},

	setStructure: function setStructure(structure) {
		var parsedStructure = elementor.presetsFactory.getParsedStructure(structure);

		if (+parsedStructure.columnsCount !== this.collection.length) {
			throw new TypeError('The provided structure doesn\'t match the columns count.');
		}

		this.model.setSetting('structure', structure);
	},

	redefineLayout: function redefineLayout() {
		var preset = elementor.presetsFactory.getPresetByStructure(this.getStructure());

		this.collection.each(function (model, index) {
			model.setSetting('_column_size', preset.preset[index]);
			model.setSetting('_inline_size', null);
		});
	},

	resetLayout: function resetLayout() {
		this.setStructure(this.getDefaultStructure());
	},

	resetColumnsCustomSize: function resetColumnsCustomSize() {
		this.collection.each(function (model) {
			model.setSetting('_inline_size', null);
		});
	},

	isCollectionFilled: function isCollectionFilled() {
		var MAX_SIZE = 10,
		    columnsCount = this.collection.length;

		return MAX_SIZE <= columnsCount;
	},

	_checkIsFull: function _checkIsFull() {
		this.$el.toggleClass('elementor-section-filled', this.isCollectionFilled());
	},

	_checkIsEmpty: function _checkIsEmpty() {
		if (!this.collection.length && !this.model.get('allowEmpty')) {
			this.addChildElement(null, { edit: false });
		}
	},

	getColumnAt: function getColumnAt(index) {
		var model = this.collection.at(index);

		return model ? this.children.findByModelCid(model.cid) : null;
	},

	getNextColumn: function getNextColumn(columnView) {
		return this.getColumnAt(this.collection.indexOf(columnView.model) + 1);
	},

	getPreviousColumn: function getPreviousColumn(columnView) {
		return this.getColumnAt(this.collection.indexOf(columnView.model) - 1);
	},

	showChildrenPercentsTooltip: function showChildrenPercentsTooltip(columnView, nextColumnView) {
		columnView.ui.percentsTooltip.show();

		columnView.ui.percentsTooltip.attr('data-side', elementor.config.is_rtl ? 'right' : 'left');

		nextColumnView.ui.percentsTooltip.show();

		nextColumnView.ui.percentsTooltip.attr('data-side', elementor.config.is_rtl ? 'left' : 'right');
	},

	hideChildrenPercentsTooltip: function hideChildrenPercentsTooltip(columnView, nextColumnView) {
		columnView.ui.percentsTooltip.hide();

		nextColumnView.ui.percentsTooltip.hide();
	},

	resizeChild: function resizeChild(childView, currentSize, newSize) {
		var nextChildView = this.getNextColumn(childView) || this.getPreviousColumn(childView);

		if (!nextChildView) {
			throw new ReferenceError('There is not any next column');
		}

		var minColumnSize = 2,
		    $nextElement = nextChildView.$el,
		    nextElementCurrentSize = +nextChildView.model.getSetting('_inline_size') || this.getColumnPercentSize($nextElement, $nextElement[0].getBoundingClientRect().width),
		    nextElementNewSize = +(currentSize + nextElementCurrentSize - newSize).toFixed(3);

		if (nextElementNewSize < minColumnSize) {
			throw new RangeError(this.errors.columnWidthTooLarge);
		}

		if (newSize < minColumnSize) {
			throw new RangeError(this.errors.columnWidthTooSmall);
		}

		nextChildView.model.setSetting('_inline_size', nextElementNewSize);

		return true;
	},

	destroyAddSectionView: function destroyAddSectionView() {
		if (this.addSectionView && !this.addSectionView.isDestroyed) {
			this.addSectionView.destroy();
		}
	},

	onRender: function onRender() {
		BaseElementView.prototype.onRender.apply(this, arguments);

		this._checkIsFull();
	},

	onSettingsChanged: function onSettingsChanged(settingsModel) {
		BaseElementView.prototype.onSettingsChanged.apply(this, arguments);

		if (settingsModel.changed.structure) {
			this.redefineLayout();
		}
	},

	onAddButtonClick: function onAddButtonClick() {
		if (this.addSectionView && !this.addSectionView.isDestroyed) {
			this.addSectionView.fadeToDeath();

			return;
		}

		var myIndex = this.model.collection.indexOf(this.model),
		    addSectionView = new _inline2.default({
			at: myIndex
		});

		addSectionView.render();

		this.$el.before(addSectionView.$el);

		addSectionView.$el.hide();

		// Delaying the slide down for slow-render browsers (such as FF)
		setTimeout(function () {
			addSectionView.$el.slideDown();
		});

		this.addSectionView = addSectionView;
	},

	onAddChild: function onAddChild() {
		if (!this.isBuffering && !this.model.get('allowEmpty')) {
			// Reset the layout just when we have really add/remove element.
			this.resetLayout();
		}
	},

	onRemoveChild: function onRemoveChild() {
		if (!this.isManualRemoving) {
			return;
		}

		// If it's the last column, please create new one.
		this._checkIsEmpty();

		this.resetLayout();
	},

	onChildviewRequestResizeStart: function onChildviewRequestResizeStart(columnView) {
		var nextColumnView = this.getNextColumn(columnView);

		if (!nextColumnView) {
			return;
		}

		this.showChildrenPercentsTooltip(columnView, nextColumnView);

		var $iframes = columnView.$el.find('iframe').add(nextColumnView.$el.find('iframe'));

		elementor.helpers.disableElementEvents($iframes);
	},

	onChildviewRequestResizeStop: function onChildviewRequestResizeStop(columnView) {
		var nextColumnView = this.getNextColumn(columnView);

		if (!nextColumnView) {
			return;
		}

		this.hideChildrenPercentsTooltip(columnView, nextColumnView);

		var $iframes = columnView.$el.find('iframe').add(nextColumnView.$el.find('iframe'));

		elementor.helpers.enableElementEvents($iframes);
	},

	onChildviewRequestResize: function onChildviewRequestResize(columnView, ui) {
		// Get current column details
		var currentSize = +columnView.model.getSetting('_inline_size') || this.getColumnPercentSize(columnView.$el, columnView.$el.data('originalWidth'));

		ui.element.css({
			width: '',
			left: 'initial' // Fix for RTL resizing
		});

		var newSize = this.getColumnPercentSize(ui.element, ui.size.width);

		try {
			this.resizeChild(columnView, currentSize, newSize);
		} catch (e) {
			return;
		}

		columnView.model.setSetting('_inline_size', newSize);
	},

	onDestroy: function onDestroy() {
		BaseElementView.prototype.onDestroy.apply(this, arguments);

		this.destroyAddSectionView();
	}
});

module.exports = SectionView;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddSectionBase = function (_Marionette$ItemView) {
	_inherits(AddSectionBase, _Marionette$ItemView);

	function AddSectionBase() {
		_classCallCheck(this, AddSectionBase);

		return _possibleConstructorReturn(this, (AddSectionBase.__proto__ || Object.getPrototypeOf(AddSectionBase)).apply(this, arguments));
	}

	_createClass(AddSectionBase, [{
		key: 'template',
		value: function template() {
			return Marionette.TemplateCache.get('#tmpl-elementor-add-section');
		}
	}, {
		key: 'attributes',
		value: function attributes() {
			return {
				'data-view': 'choose-action'
			};
		}
	}, {
		key: 'ui',
		value: function ui() {
			return {
				addNewSection: '.elementor-add-new-section',
				closeButton: '.elementor-add-section-close',
				addSectionButton: '.elementor-add-section-button',
				addTemplateButton: '.elementor-add-template-button',
				selectPreset: '.elementor-select-preset',
				presets: '.elementor-preset'
			};
		}
	}, {
		key: 'events',
		value: function events() {
			return {
				'click @ui.addSectionButton': 'onAddSectionButtonClick',
				'click @ui.addTemplateButton': 'onAddTemplateButtonClick',
				'click @ui.closeButton': 'onCloseButtonClick',
				'click @ui.presets': 'onPresetSelected'
			};
		}
	}, {
		key: 'behaviors',
		value: function behaviors() {
			return {
				contextMenu: {
					behaviorClass: __webpack_require__(11),
					groups: this.getContextMenuGroups()
				}
			};
		}
	}, {
		key: 'className',
		value: function className() {
			return 'elementor-add-section elementor-visible-desktop';
		}
	}, {
		key: 'addSection',
		value: function addSection(properties, options) {
			return elementor.getPreviewView().addChildElement(properties, jQuery.extend({}, this.options, options));
		}
	}, {
		key: 'setView',
		value: function setView(view) {
			this.$el.attr('data-view', view);
		}
	}, {
		key: 'showSelectPresets',
		value: function showSelectPresets() {
			this.setView('select-preset');
		}
	}, {
		key: 'closeSelectPresets',
		value: function closeSelectPresets() {
			this.setView('choose-action');
		}
	}, {
		key: 'getTemplatesModalOptions',
		value: function getTemplatesModalOptions() {
			return {
				importOptions: {
					at: this.getOption('at')
				}
			};
		}
	}, {
		key: 'getContextMenuGroups',
		value: function getContextMenuGroups() {
			var hasContent = function hasContent() {
				return elementor.elements.length > 0;
			};

			return [{
				name: 'paste',
				actions: [{
					name: 'paste',
					title: elementor.translate('paste'),
					callback: this.paste.bind(this),
					isEnabled: this.isPasteEnabled.bind(this)
				}]
			}, {
				name: 'content',
				actions: [{
					name: 'copy_all_content',
					title: elementor.translate('copy_all_content'),
					callback: this.copy.bind(this),
					isEnabled: hasContent
				}, {
					name: 'delete_all_content',
					title: elementor.translate('delete_all_content'),
					callback: elementor.clearPage.bind(elementor),
					isEnabled: hasContent
				}]
			}];
		}
	}, {
		key: 'copy',
		value: function copy() {
			elementor.getPreviewView().copy();
		}
	}, {
		key: 'paste',
		value: function paste() {
			elementor.getPreviewView().paste(this.getOption('at'));
		}
	}, {
		key: 'isPasteEnabled',
		value: function isPasteEnabled() {
			return elementor.getStorage('transfer');
		}
	}, {
		key: 'onAddSectionButtonClick',
		value: function onAddSectionButtonClick() {
			this.showSelectPresets();
		}
	}, {
		key: 'onAddTemplateButtonClick',
		value: function onAddTemplateButtonClick() {
			elementor.templates.startModal(this.getTemplatesModalOptions());
		}
	}, {
		key: 'onRender',
		value: function onRender() {
			this.$el.html5Droppable({
				axis: ['vertical'],
				groups: ['elementor-element'],
				placeholder: false,
				currentElementClass: 'elementor-html5dnd-current-element',
				hasDraggingOnChildClass: 'elementor-dragging-on-child',
				onDropping: this.onDropping.bind(this)
			});
		}
	}, {
		key: 'onPresetSelected',
		value: function onPresetSelected(event) {
			this.closeSelectPresets();

			var selectedStructure = event.currentTarget.dataset.structure,
			    parsedStructure = elementor.presetsFactory.getParsedStructure(selectedStructure),
			    elements = [],
			    loopIndex;

			for (loopIndex = 0; loopIndex < parsedStructure.columnsCount; loopIndex++) {
				elements.push({
					id: elementor.helpers.getUniqueID(),
					elType: 'column',
					settings: {},
					elements: []
				});
			}

			elementor.channels.data.trigger('element:before:add', {
				elType: 'section'
			});

			var newSection = this.addSection({ elements: elements });

			newSection.setStructure(selectedStructure);

			elementor.channels.data.trigger('element:after:add');
		}
	}, {
		key: 'onDropping',
		value: function onDropping() {
			elementor.channels.data.trigger('section:before:drop');

			this.addSection().addElementFromPanel();

			elementor.channels.data.trigger('section:after:drop');
		}
	}]);

	return AddSectionBase;
}(Marionette.ItemView);

exports.default = AddSectionBase;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var InnerTabsBehavior;

InnerTabsBehavior = Marionette.Behavior.extend({

	onRenderCollection: function onRenderCollection() {
		this.handleInnerTabs(this.view);
	},

	handleInnerTabs: function handleInnerTabs(parent) {
		var closedClass = 'elementor-tab-close',
		    activeClass = 'elementor-tab-active',
		    tabsWrappers = parent.children.filter(function (view) {
			return 'tabs' === view.model.get('type');
		});

		_.each(tabsWrappers, function (view) {
			view.$el.find('.elementor-control-content').remove();

			var tabsId = view.model.get('name'),
			    tabs = parent.children.filter(function (childView) {
				return 'tab' === childView.model.get('type') && childView.model.get('tabs_wrapper') === tabsId;
			});

			_.each(tabs, function (childView, index) {
				view._addChildView(childView);

				var tabId = childView.model.get('name'),
				    controlsUnderTab = parent.children.filter(function (view) {
					return tabId === view.model.get('inner_tab');
				});

				if (0 === index) {
					childView.$el.addClass(activeClass);
				} else {
					_.each(controlsUnderTab, function (view) {
						view.$el.addClass(closedClass);
					});
				}
			});
		});
	},

	onChildviewControlTabClicked: function onChildviewControlTabClicked(childView) {
		var closedClass = 'elementor-tab-close',
		    activeClass = 'elementor-tab-active',
		    tabClicked = childView.model.get('name'),
		    childrenUnderTab = this.view.children.filter(function (view) {
			return 'tab' !== view.model.get('type') && childView.model.get('tabs_wrapper') === view.model.get('tabs_wrapper');
		}),
		    siblingTabs = this.view.children.filter(function (view) {
			return 'tab' === view.model.get('type') && childView.model.get('tabs_wrapper') === view.model.get('tabs_wrapper');
		});

		_.each(siblingTabs, function (view) {
			view.$el.removeClass(activeClass);
		});

		childView.$el.addClass(activeClass);

		_.each(childrenUnderTab, function (view) {
			if (view.model.get('inner_tab') === tabClicked) {
				view.$el.removeClass(closedClass);
			} else {
				view.$el.addClass(closedClass);
			}
		});

		elementor.getPanelView().updateScrollbar();
	}
});

module.exports = InnerTabsBehavior;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ControlMultipleBaseItemView = __webpack_require__(4),
    ControlBoxShadowItemView;

ControlBoxShadowItemView = ControlMultipleBaseItemView.extend({
	ui: function ui() {
		var ui = ControlMultipleBaseItemView.prototype.ui.apply(this, arguments);

		ui.sliders = '.elementor-slider';
		ui.colors = '.elementor-shadow-color-picker';

		return ui;
	},

	events: function events() {
		return _.extend(ControlMultipleBaseItemView.prototype.events.apply(this, arguments), {
			'slide @ui.sliders': 'onSlideChange'
		});
	},

	initSliders: function initSliders() {
		var value = this.getControlValue();

		this.ui.sliders.each(function () {
			var $slider = jQuery(this),
			    $input = $slider.next('.elementor-slider-input').find('input');

			$slider.slider({
				value: value[this.dataset.input],
				min: +$input.attr('min'),
				max: +$input.attr('max')
			});
		});
	},

	initColors: function initColors() {
		var self = this;

		elementor.helpers.wpColorPicker(this.ui.colors, {
			change: function change() {
				var $this = jQuery(this),
				    type = $this.data('setting');

				self.setValue(type, $this.wpColorPicker('color'));
			},

			clear: function clear() {
				self.setValue(this.dataset.setting, '');
			}
		});
	},

	onInputChange: function onInputChange(event) {
		var type = event.currentTarget.dataset.setting,
		    $slider = this.ui.sliders.filter('[data-input="' + type + '"]');

		$slider.slider('value', this.getControlValue(type));
	},

	onReady: function onReady() {
		this.initSliders();
		this.initColors();
	},

	onSlideChange: function onSlideChange(event, ui) {
		var type = event.currentTarget.dataset.input,
		    $input = this.ui.input.filter('[data-setting="' + type + '"]');

		$input.val(ui.value);
		this.setValue(type, ui.value);
	},

	onBeforeDestroy: function onBeforeDestroy() {
		this.ui.colors.each(function () {
			var $color = jQuery(this);

			if ($color.wpColorPicker('instance')) {
				$color.wpColorPicker('close');
			}
		});

		this.$el.remove();
	}
});

module.exports = ControlBoxShadowItemView;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ControlBaseDataView = __webpack_require__(0),
    ControlChooseItemView;

ControlChooseItemView = ControlBaseDataView.extend({
	ui: function ui() {
		var ui = ControlBaseDataView.prototype.ui.apply(this, arguments);

		ui.inputs = '[type="radio"]';

		return ui;
	},

	events: function events() {
		return _.extend(ControlBaseDataView.prototype.events.apply(this, arguments), {
			'mousedown label': 'onMouseDownLabel',
			'click @ui.inputs': 'onClickInput',
			'change @ui.inputs': 'onBaseInputChange'
		});
	},

	onMouseDownLabel: function onMouseDownLabel(event) {
		var $clickedLabel = this.$(event.currentTarget),
		    $selectedInput = this.$('#' + $clickedLabel.attr('for'));

		$selectedInput.data('checked', $selectedInput.prop('checked'));
	},

	onClickInput: function onClickInput(event) {
		if (!this.model.get('toggle')) {
			return;
		}

		var $selectedInput = this.$(event.currentTarget);

		if ($selectedInput.data('checked')) {
			$selectedInput.prop('checked', false).trigger('change');
		}
	},

	onRender: function onRender() {
		ControlBaseDataView.prototype.onRender.apply(this, arguments);

		var currentValue = this.getControlValue();

		if (currentValue) {
			this.ui.inputs.filter('[value="' + currentValue + '"]').prop('checked', true);
		}
	}
}, {

	onPasteStyle: function onPasteStyle(control, clipboardValue) {
		return '' === clipboardValue || undefined !== control.options[clipboardValue];
	}
});

module.exports = ControlChooseItemView;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ControlBaseMultipleItemView = __webpack_require__(4),
    ControlBaseUnitsItemView;

ControlBaseUnitsItemView = ControlBaseMultipleItemView.extend({

	getCurrentRange: function getCurrentRange() {
		return this.getUnitRange(this.getControlValue('unit'));
	},

	getUnitRange: function getUnitRange(unit) {
		var ranges = this.model.get('range');

		if (!ranges || !ranges[unit]) {
			return false;
		}

		return ranges[unit];
	}
});

module.exports = ControlBaseUnitsItemView;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ControlBaseDataView = __webpack_require__(0),
    RepeaterRowView;

RepeaterRowView = Marionette.CompositeView.extend({
	template: Marionette.TemplateCache.get('#tmpl-elementor-repeater-row'),

	className: 'elementor-repeater-fields',

	ui: {
		duplicateButton: '.elementor-repeater-tool-duplicate',
		editButton: '.elementor-repeater-tool-edit',
		removeButton: '.elementor-repeater-tool-remove',
		itemTitle: '.elementor-repeater-row-item-title'
	},

	behaviors: {
		HandleInnerTabs: {
			behaviorClass: __webpack_require__(31)
		}
	},

	triggers: {
		'click @ui.removeButton': 'click:remove',
		'click @ui.duplicateButton': 'click:duplicate',
		'click @ui.itemTitle': 'click:edit'
	},

	modelEvents: {
		change: 'onModelChange'
	},

	templateHelpers: function templateHelpers() {
		return {
			itemIndex: this.getOption('itemIndex')
		};
	},

	childViewContainer: '.elementor-repeater-row-controls',

	getChildView: function getChildView(item) {
		var controlType = item.get('type');

		return elementor.getControlView(controlType);
	},

	childViewOptions: function childViewOptions() {
		return {
			elementSettingsModel: this.model
		};
	},

	updateIndex: function updateIndex(newIndex) {
		this.itemIndex = newIndex;
	},

	setTitle: function setTitle() {
		var titleField = this.getOption('titleField'),
		    title = '';

		if (titleField) {
			var values = {};

			this.children.each(function (child) {
				if (!(child instanceof ControlBaseDataView)) {
					return;
				}

				values[child.model.get('name')] = child.getControlValue();
			});

			title = Marionette.TemplateCache.prototype.compileTemplate(titleField)(this.model.parseDynamicSettings());
		}

		if (!title) {
			title = elementor.translate('Item #{0}', [this.getOption('itemIndex')]);
		}

		this.ui.itemTitle.html(title);
	},

	initialize: function initialize(options) {
		this.itemIndex = 0;

		// Collection for Controls list
		this.collection = new Backbone.Collection(_.values(elementor.mergeControlsSettings(options.controlFields)));
	},

	onRender: function onRender() {
		this.setTitle();
	},

	onModelChange: function onModelChange() {
		if (this.getOption('titleField')) {
			this.setTitle();
		}
	},

	onChildviewResponsiveSwitcherClick: function onChildviewResponsiveSwitcherClick(childView, device) {
		if ('desktop' === device) {
			elementor.getPanelView().getCurrentPageView().$el.toggleClass('elementor-responsive-switchers-open');
		}
	}
});

module.exports = RepeaterRowView;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var BaseSettingsModel = __webpack_require__(3),
    ColumnSettingsModel = __webpack_require__(125),
    ElementModel;

ElementModel = Backbone.Model.extend({
	defaults: {
		id: '',
		elType: '',
		isInner: false,
		settings: {},
		defaultEditSettings: {}
	},

	remoteRender: false,
	_htmlCache: null,
	_jqueryXhr: null,
	renderOnLeave: false,

	initialize: function initialize(options) {
		var elType = this.get('elType'),
		    elements = this.get('elements');

		if (undefined !== elements) {
			var ElementsCollection = __webpack_require__(37);

			this.set('elements', new ElementsCollection(elements));
		}

		if ('widget' === elType) {
			this.remoteRender = true;
			this.setHtmlCache(options.htmlCache || '');
		}

		// No need this variable anymore
		delete options.htmlCache;

		// Make call to remote server as throttle function
		this.renderRemoteServer = _.throttle(this.renderRemoteServer, 1000);

		this.initSettings();

		this.initEditSettings();

		this.on({
			destroy: this.onDestroy,
			'editor:close': this.onCloseEditor
		});
	},

	initSettings: function initSettings() {
		var elType = this.get('elType'),
		    settings = this.get('settings'),
		    settingModels = {
			column: ColumnSettingsModel
		},
		    SettingsModel = settingModels[elType] || BaseSettingsModel;

		if (jQuery.isEmptyObject(settings)) {
			settings = elementor.helpers.cloneObject(settings);
		}

		if ('widget' === elType) {
			settings.widgetType = this.get('widgetType');
		}

		settings.elType = elType;
		settings.isInner = this.get('isInner');

		settings = new SettingsModel(settings, {
			controls: elementor.getElementControls(this)
		});

		this.set('settings', settings);

		elementorFrontend.config.elements.data[this.cid] = settings;
	},

	initEditSettings: function initEditSettings() {
		var editSettings = new Backbone.Model(this.get('defaultEditSettings'));

		this.set('editSettings', editSettings);

		elementorFrontend.config.elements.editSettings[this.cid] = editSettings;
	},

	setSetting: function setSetting(key, value) {
		var settings = this.get('settings');

		if ('object' !== (typeof key === 'undefined' ? 'undefined' : _typeof(key))) {
			var keyParts = key.split('.'),
			    isRepeaterKey = 3 === keyParts.length;

			key = keyParts[0];

			if (isRepeaterKey) {
				settings = settings.get(key).models[keyParts[1]];

				key = keyParts[2];
			}
		}

		settings.setExternalChange(key, value);
	},

	getSetting: function getSetting(key) {
		var keyParts = key.split('.'),
		    isRepeaterKey = 3 === keyParts.length,
		    settings = this.get('settings');

		key = keyParts[0];

		var value = settings.get(key);

		if (undefined === value) {
			return '';
		}

		if (isRepeaterKey) {
			value = value.models[keyParts[1]].get(keyParts[2]);
		}

		return value;
	},

	setHtmlCache: function setHtmlCache(htmlCache) {
		this._htmlCache = htmlCache;
	},

	getHtmlCache: function getHtmlCache() {
		return this._htmlCache;
	},

	getDefaultTitle: function getDefaultTitle() {
		return elementor.getElementData(this).title;
	},

	getTitle: function getTitle() {
		var title = this.getSetting('_title');

		if (!title) {
			title = this.getDefaultTitle();
		}

		return title;
	},

	getIcon: function getIcon() {
		return elementor.getElementData(this).icon;
	},

	createRemoteRenderRequest: function createRemoteRenderRequest() {
		var data = this.toJSON();

		return elementor.ajax.addRequest('render_widget', {
			unique_id: this.cid,
			data: {
				data: data
			},
			success: this.onRemoteGetHtml.bind(this)
		}, true).jqXhr;
	},

	renderRemoteServer: function renderRemoteServer() {
		if (!this.remoteRender) {
			return;
		}

		this.renderOnLeave = false;

		this.trigger('before:remote:render');

		if (this.isRemoteRequestActive()) {
			this._jqueryXhr.abort();
		}

		this._jqueryXhr = this.createRemoteRenderRequest();
	},

	isRemoteRequestActive: function isRemoteRequestActive() {
		return this._jqueryXhr && 4 !== this._jqueryXhr.readyState;
	},

	onRemoteGetHtml: function onRemoteGetHtml(data) {
		this.setHtmlCache(data.render);
		this.trigger('remote:render');
	},

	clone: function clone() {
		var newModel = new this.constructor(elementor.helpers.cloneObject(this.attributes));

		newModel.set('id', elementor.helpers.getUniqueID());

		newModel.setHtmlCache(this.getHtmlCache());

		var elements = this.get('elements');

		if (!_.isEmpty(elements)) {
			newModel.set('elements', elements.clone());
		}

		return newModel;
	},

	toJSON: function toJSON(options) {
		options = _.extend({ copyHtmlCache: false }, options);

		// Call parent's toJSON method
		var data = Backbone.Model.prototype.toJSON.call(this);

		_.each(data, function (attribute, key) {
			if (attribute && attribute.toJSON) {
				data[key] = attribute.toJSON(options);
			}
		});

		if (options.copyHtmlCache) {
			data.htmlCache = this.getHtmlCache();
		} else {
			delete data.htmlCache;
		}

		return data;
	},

	onCloseEditor: function onCloseEditor() {
		if (this.renderOnLeave) {
			this.renderRemoteServer();
		}
	},

	onDestroy: function onDestroy() {
		// Clean the memory for all use instances
		var settings = this.get('settings'),
		    elements = this.get('elements');

		if (undefined !== elements) {
			_.each(_.clone(elements.models), function (model) {
				model.destroy();
			});
		}

		settings.destroy();
	}

});

ElementModel.prototype.sync = ElementModel.prototype.fetch = ElementModel.prototype.save = _.noop;

module.exports = ElementModel;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ElementModel = __webpack_require__(36);

var ElementsCollection = Backbone.Collection.extend({
	add: function add(models, options, isCorrectSet) {
		if ((!options || !options.silent) && !isCorrectSet) {
			throw 'Call Error: Adding model to element collection is allowed only by the dedicated addChildModel() method.';
		}

		return Backbone.Collection.prototype.add.call(this, models, options);
	},

	model: function model(attrs, options) {
		var ModelClass = Backbone.Model;

		if (attrs.elType) {
			ModelClass = elementor.hooks.applyFilters('element/model', ElementModel, attrs);
		}

		return new ModelClass(attrs, options);
	},

	clone: function clone() {
		var tempCollection = Backbone.Collection.prototype.clone.apply(this, arguments),
		    newCollection = new ElementsCollection();

		tempCollection.forEach(function (model) {
			newCollection.add(model.clone(), null, true);
		});

		return newCollection;
	}
});

ElementsCollection.prototype.sync = ElementsCollection.prototype.fetch = ElementsCollection.prototype.save = _.noop;

module.exports = ElementsCollection;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Marionette.ItemView.extend({
	template: '#tmpl-elementor-panel-global',

	id: 'elementor-panel-global',

	initialize: function initialize() {
		elementor.getPanelView().getCurrentPageView().search.reset();
	},

	onDestroy: function onDestroy() {
		var panel = elementor.getPanelView();

		if ('elements' === panel.getCurrentPageName()) {
			setTimeout(function () {
				var elementsPageView = panel.getCurrentPageView();

				if (!elementsPageView.search.currentView) {
					elementsPageView.showView('search');
				}
			});
		}
	}
});

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PanelElementsElementView;

PanelElementsElementView = Marionette.ItemView.extend({
	template: '#tmpl-elementor-element-library-element',

	className: 'elementor-element-wrapper',

	onRender: function onRender() {
		var self = this;
		if (!elementor.userCan('design')) {
			return;
		}

		this.$el.html5Draggable({

			onDragStart: function onDragStart() {
				elementor.channels.panelElements.reply('element:selected', self).trigger('element:drag:start');
			},

			onDragEnd: function onDragEnd() {
				elementor.channels.panelElements.trigger('element:drag:end');
			},

			groups: ['elementor-element']
		});
	}
});

module.exports = PanelElementsElementView;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PanelElementsElementModel;

PanelElementsElementModel = Backbone.Model.extend({
	defaults: {
		title: '',
		categories: [],
		keywords: [],
		icon: '',
		elType: 'widget',
		widgetType: ''
	}
});

module.exports = PanelElementsElementModel;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PanelElementsElementModel = __webpack_require__(40),
    PanelElementsElementsCollection;

PanelElementsElementsCollection = Backbone.Collection.extend({
	model: PanelElementsElementModel /*,
                                  comparator: 'title'*/
});

module.exports = PanelElementsElementsCollection;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PanelSchemeBaseView = __webpack_require__(43),
    PanelSchemeColorsView;

PanelSchemeColorsView = PanelSchemeBaseView.extend({
	ui: function ui() {
		var ui = PanelSchemeBaseView.prototype.ui.apply(this, arguments);

		ui.systemSchemes = '.elementor-panel-scheme-color-system-scheme';

		return ui;
	},

	events: function events() {
		var events = PanelSchemeBaseView.prototype.events.apply(this, arguments);

		events['click @ui.systemSchemes'] = 'onSystemSchemeClick';

		return events;
	},

	getType: function getType() {
		return 'color';
	},

	onSystemSchemeClick: function onSystemSchemeClick(event) {
		var $schemeClicked = jQuery(event.currentTarget),
		    schemeName = $schemeClicked.data('schemeName'),
		    scheme = elementor.config.system_schemes[this.getType()][schemeName].items;

		this.changeChildrenUIValues(scheme);
	}
});

module.exports = PanelSchemeColorsView;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var childViewTypes = {
	color: __webpack_require__(149),
	typography: __webpack_require__(150)
},
    PanelSchemeBaseView;

PanelSchemeBaseView = Marionette.CompositeView.extend({
	id: function id() {
		return 'elementor-panel-scheme-' + this.getType();
	},

	className: function className() {
		return 'elementor-panel-scheme elementor-panel-scheme-' + this.getUIType();
	},

	childViewContainer: '.elementor-panel-scheme-items',

	getTemplate: function getTemplate() {
		return Marionette.TemplateCache.get('#tmpl-elementor-panel-schemes-' + this.getType());
	},

	getChildView: function getChildView() {
		return childViewTypes[this.getUIType()];
	},

	getUIType: function getUIType() {
		return this.getType();
	},

	ui: function ui() {
		return {
			saveButton: '.elementor-panel-scheme-save .elementor-button',
			discardButton: '.elementor-panel-scheme-discard .elementor-button',
			resetButton: '.elementor-panel-scheme-reset .elementor-button'
		};
	},

	events: function events() {
		return {
			'click @ui.saveButton': 'saveScheme',
			'click @ui.discardButton': 'discardScheme',
			'click @ui.resetButton': 'setDefaultScheme'
		};
	},

	initialize: function initialize() {
		this.model = new Backbone.Model();

		this.resetScheme();
	},

	getType: function getType() {},

	getScheme: function getScheme() {
		return elementor.schemes.getScheme(this.getType());
	},

	changeChildrenUIValues: function changeChildrenUIValues(schemeItems) {
		var self = this;

		_.each(schemeItems, function (value, key) {
			var model = self.collection.findWhere({ key: key }),
			    childView = self.children.findByModelCid(model.cid);

			childView.changeUIValue(value);
		});
	},

	discardScheme: function discardScheme() {
		elementor.schemes.resetSchemes(this.getType());

		this.onSchemeChange();

		this.ui.saveButton.prop('disabled', true);

		this._renderChildren();
	},

	setSchemeValue: function setSchemeValue(key, value) {
		elementor.schemes.setSchemeValue(this.getType(), key, value);

		this.onSchemeChange();
	},

	saveScheme: function saveScheme() {
		elementor.schemes.saveScheme(this.getType());

		this.ui.saveButton.prop('disabled', true);

		this.resetScheme();

		this._renderChildren();
	},

	setDefaultScheme: function setDefaultScheme() {
		var defaultScheme = elementor.config.default_schemes[this.getType()].items;

		this.changeChildrenUIValues(defaultScheme);
	},

	resetItems: function resetItems() {
		this.model.set('items', this.getScheme().items);
	},

	resetCollection: function resetCollection() {
		var self = this,
		    items = self.model.get('items');

		self.collection = new Backbone.Collection();

		_.each(items, function (item, key) {
			item.type = self.getType();
			item.key = key;

			self.collection.add(item);
		});
	},

	resetScheme: function resetScheme() {
		this.resetItems();
		this.resetCollection();
	},

	onSchemeChange: function onSchemeChange() {
		elementor.schemes.printSchemesStyle();
	},

	onChildviewValueChange: function onChildviewValueChange(childView, newValue) {
		this.ui.saveButton.removeProp('disabled');

		this.setSchemeValue(childView.model.get('key'), newValue);
	}
});

module.exports = PanelSchemeBaseView;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PanelSchemeItemView;

PanelSchemeItemView = Marionette.ItemView.extend({
	getTemplate: function getTemplate() {
		return Marionette.TemplateCache.get('#tmpl-elementor-panel-scheme-' + this.getUIType() + '-item');
	},

	className: function className() {
		return 'elementor-panel-scheme-item';
	}
});

module.exports = PanelSchemeItemView;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(46);
__webpack_require__(47);
module.exports = __webpack_require__(48);


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * jQuery Serialize Object v1.0.1
 */
(function ($) {
	$.fn.elementorSerializeObject = function () {
		var serializedArray = this.serializeArray(),
		    data = {};

		var parseObject = function parseObject(dataContainer, key, value) {
			var isArrayKey = /^[^\[\]]+\[]/.test(key),
			    isObjectKey = /^[^\[\]]+\[[^\[\]]+]/.test(key),
			    keyName = key.replace(/\[.*/, '');

			if (isArrayKey) {
				if (!dataContainer[keyName]) {
					dataContainer[keyName] = [];
				}
			} else {
				if (!isObjectKey) {
					if (dataContainer.push) {
						dataContainer.push(value);
					} else {
						dataContainer[keyName] = value;
					}

					return;
				}

				if (!dataContainer[keyName]) {
					dataContainer[keyName] = {};
				}
			}

			var nextKeys = key.match(/\[[^\[\]]*]/g);

			nextKeys[0] = nextKeys[0].replace(/\[|]/g, '');

			return parseObject(dataContainer[keyName], nextKeys.join(''), value);
		};

		$.each(serializedArray, function () {
			parseObject(data, this.name, this.value);
		});
		return data;
	};
})(jQuery);

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * HTML5 - Drag and Drop
 */
;(function ($) {

	var hasFullDataTransferSupport = function hasFullDataTransferSupport(event) {
		try {
			event.originalEvent.dataTransfer.setData('test', 'test');

			event.originalEvent.dataTransfer.clearData('test');

			return true;
		} catch (e) {
			return false;
		}
	};

	var Draggable = function Draggable(userSettings) {
		var self = this,
		    settings = {},
		    elementsCache = {},
		    defaultSettings = {
			element: '',
			groups: null,
			onDragStart: null,
			onDragEnd: null
		};

		var initSettings = function initSettings() {
			$.extend(true, settings, defaultSettings, userSettings);
		};

		var initElementsCache = function initElementsCache() {
			elementsCache.$element = $(settings.element);
		};

		var buildElements = function buildElements() {
			elementsCache.$element.attr('draggable', true);
		};

		var onDragEnd = function onDragEnd(event) {
			if ($.isFunction(settings.onDragEnd)) {
				settings.onDragEnd.call(elementsCache.$element, event, self);
			}
		};

		var onDragStart = function onDragStart(event) {
			var groups = settings.groups || [],
			    dataContainer = {
				groups: groups
			};

			if (hasFullDataTransferSupport(event)) {
				event.originalEvent.dataTransfer.setData(JSON.stringify(dataContainer), true);
			}

			if ($.isFunction(settings.onDragStart)) {
				settings.onDragStart.call(elementsCache.$element, event, self);
			}
		};

		var attachEvents = function attachEvents() {
			elementsCache.$element.on('dragstart', onDragStart).on('dragend', onDragEnd);
		};

		var init = function init() {
			initSettings();

			initElementsCache();

			buildElements();

			attachEvents();
		};

		this.destroy = function () {
			elementsCache.$element.off('dragstart', onDragStart);

			elementsCache.$element.removeAttr('draggable');
		};

		init();
	};

	var Droppable = function Droppable(userSettings) {
		var self = this,
		    settings = {},
		    elementsCache = {},
		    currentElement,
		    currentSide,
		    defaultSettings = {
			element: '',
			items: '>',
			horizontalSensitivity: '10%',
			axis: ['vertical', 'horizontal'],
			placeholder: true,
			currentElementClass: 'html5dnd-current-element',
			placeholderClass: 'html5dnd-placeholder',
			hasDraggingOnChildClass: 'html5dnd-has-dragging-on-child',
			groups: null,
			isDroppingAllowed: null,
			onDragEnter: null,
			onDragging: null,
			onDropping: null,
			onDragLeave: null
		};

		var initSettings = function initSettings() {
			$.extend(settings, defaultSettings, userSettings);
		};

		var initElementsCache = function initElementsCache() {
			elementsCache.$element = $(settings.element);

			elementsCache.$placeholder = $('<div>', { 'class': settings.placeholderClass });
		};

		var hasHorizontalDetection = function hasHorizontalDetection() {
			return -1 !== settings.axis.indexOf('horizontal');
		};

		var hasVerticalDetection = function hasVerticalDetection() {
			return -1 !== settings.axis.indexOf('vertical');
		};

		var checkHorizontal = function checkHorizontal(offsetX, elementWidth) {
			var isPercentValue, sensitivity;

			if (!hasHorizontalDetection()) {
				return false;
			}

			if (!hasVerticalDetection()) {
				return offsetX > elementWidth / 2 ? 'right' : 'left';
			}

			sensitivity = settings.horizontalSensitivity.match(/\d+/);

			if (!sensitivity) {
				return false;
			}

			sensitivity = sensitivity[0];

			isPercentValue = /%$/.test(settings.horizontalSensitivity);

			if (isPercentValue) {
				sensitivity = elementWidth / sensitivity;
			}

			if (offsetX > elementWidth - sensitivity) {
				return 'right';
			} else if (offsetX < sensitivity) {
				return 'left';
			}

			return false;
		};

		var setSide = function setSide(event) {
			var $element = $(currentElement),
			    elementHeight = $element.outerHeight() - elementsCache.$placeholder.outerHeight(),
			    elementWidth = $element.outerWidth();

			event = event.originalEvent;

			if (currentSide = checkHorizontal(event.offsetX, elementWidth)) {
				return;
			}

			if (!hasVerticalDetection()) {
				currentSide = null;

				return;
			}

			var elementPosition = currentElement.getBoundingClientRect();

			currentSide = event.clientY > elementPosition.top + elementHeight / 2 ? 'bottom' : 'top';
		};

		var insertPlaceholder = function insertPlaceholder() {
			if (!settings.placeholder) {
				return;
			}

			var insertMethod = 'top' === currentSide ? 'prependTo' : 'appendTo';

			elementsCache.$placeholder[insertMethod](currentElement);
		};

		var isDroppingAllowed = function isDroppingAllowed(event) {
			var dataTransferTypes, draggableGroups, isGroupMatch, isDroppingAllowed;

			if (settings.groups && hasFullDataTransferSupport(event)) {
				dataTransferTypes = event.originalEvent.dataTransfer.types;

				isGroupMatch = false;

				dataTransferTypes = Array.prototype.slice.apply(dataTransferTypes); // Convert to array, since Firefox hold it as DOMStringList

				dataTransferTypes.forEach(function (type) {
					try {
						draggableGroups = JSON.parse(type);

						if (!draggableGroups.groups.slice) {
							return;
						}

						settings.groups.forEach(function (groupName) {

							if (-1 !== draggableGroups.groups.indexOf(groupName)) {
								isGroupMatch = true;

								return false; // stops the forEach from extra loops
							}
						});
					} catch (e) {}
				});

				if (!isGroupMatch) {
					return false;
				}
			}

			if ($.isFunction(settings.isDroppingAllowed)) {

				isDroppingAllowed = settings.isDroppingAllowed.call(currentElement, currentSide, event, self);

				if (!isDroppingAllowed) {
					return false;
				}
			}

			return true;
		};

		var onDragEnter = function onDragEnter(event) {
			event.stopPropagation();

			if (currentElement) {
				return;
			}

			currentElement = this;

			elementsCache.$element.parents().each(function () {
				var droppableInstance = $(this).data('html5Droppable');

				if (!droppableInstance) {
					return;
				}

				droppableInstance.doDragLeave();
			});

			setSide(event);

			if (!isDroppingAllowed(event)) {
				return;
			}

			insertPlaceholder();

			elementsCache.$element.addClass(settings.hasDraggingOnChildClass);

			$(currentElement).addClass(settings.currentElementClass);

			if ($.isFunction(settings.onDragEnter)) {
				settings.onDragEnter.call(currentElement, currentSide, event, self);
			}
		};

		var onDragOver = function onDragOver(event) {
			event.stopPropagation();

			if (!currentElement) {
				onDragEnter.call(this, event);
			}

			var oldSide = currentSide;

			setSide(event);

			if (!isDroppingAllowed(event)) {
				return;
			}

			event.preventDefault();

			if (oldSide !== currentSide) {
				insertPlaceholder();
			}

			if ($.isFunction(settings.onDragging)) {
				settings.onDragging.call(this, currentSide, event, self);
			}
		};

		var onDragLeave = function onDragLeave(event) {
			var elementPosition = this.getBoundingClientRect();

			if ('dragleave' === event.type && !(event.clientX < elementPosition.left || event.clientX >= elementPosition.right || event.clientY < elementPosition.top || event.clientY >= elementPosition.bottom)) {
				return;
			}

			$(currentElement).removeClass(settings.currentElementClass);

			self.doDragLeave();
		};

		var onDrop = function onDrop(event) {
			setSide(event);

			if (!isDroppingAllowed(event)) {
				return;
			}

			event.preventDefault();

			if ($.isFunction(settings.onDropping)) {
				settings.onDropping.call(this, currentSide, event, self);
			}
		};

		var attachEvents = function attachEvents() {
			elementsCache.$element.on('dragenter', settings.items, onDragEnter).on('dragover', settings.items, onDragOver).on('drop', settings.items, onDrop).on('dragleave drop', settings.items, onDragLeave);
		};

		var init = function init() {
			initSettings();

			initElementsCache();

			attachEvents();
		};

		this.doDragLeave = function () {
			if (settings.placeholder) {
				elementsCache.$placeholder.remove();
			}

			elementsCache.$element.removeClass(settings.hasDraggingOnChildClass);

			if ($.isFunction(settings.onDragLeave)) {
				settings.onDragLeave.call(currentElement, event, self);
			}

			currentElement = currentSide = null;
		};

		this.destroy = function () {
			elementsCache.$element.off('dragenter', settings.items, onDragEnter).off('dragover', settings.items, onDragOver).off('drop', settings.items, onDrop).off('dragleave drop', settings.items, onDragLeave);
		};

		init();
	};

	var plugins = {
		html5Draggable: Draggable,
		html5Droppable: Droppable
	};

	$.each(plugins, function (pluginName, Plugin) {
		$.fn[pluginName] = function (options) {
			options = options || {};

			this.each(function () {
				var instance = $.data(this, pluginName),
				    hasInstance = instance instanceof Plugin;

				if (hasInstance) {

					if ('destroy' === options) {

						instance.destroy();

						$.removeData(this, pluginName);
					}

					return;
				}

				options.element = this;

				$.data(this, pluginName, new Plugin(options));
			});

			return this;
		};
	});
})(jQuery);

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _heartbeat = __webpack_require__(49);

var _heartbeat2 = _interopRequireDefault(_heartbeat);

var _navigator = __webpack_require__(50);

var _navigator2 = _interopRequireDefault(_navigator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global ElementorConfig */
Marionette.TemplateCache.prototype.compileTemplate = function (rawTemplate, options) {
	options = {
		evaluate: /<#([\s\S]+?)#>/g,
		interpolate: /{{{([\s\S]+?)}}}/g,
		escape: /{{([^}]+?)}}(?!})/g
	};

	return _.template(rawTemplate, options);
};

var App = Marionette.Application.extend({
	previewLoadedOnce: false,

	helpers: __webpack_require__(55),
	imagesManager: __webpack_require__(56),
	debug: __webpack_require__(57),
	schemes: __webpack_require__(58),
	presetsFactory: __webpack_require__(59),
	templates: __webpack_require__(60),
	ajax: __webpack_require__(75),
	conditions: __webpack_require__(76),
	hotKeys: __webpack_require__(17),
	history: __webpack_require__(77),

	channels: {
		editor: Backbone.Radio.channel('ELEMENTOR:editor'),
		data: Backbone.Radio.channel('ELEMENTOR:data'),
		panelElements: Backbone.Radio.channel('ELEMENTOR:panelElements'),
		dataEditMode: Backbone.Radio.channel('ELEMENTOR:editmode'),
		deviceMode: Backbone.Radio.channel('ELEMENTOR:deviceMode'),
		templates: Backbone.Radio.channel('ELEMENTOR:templates')
	},

	// Exporting modules that can be used externally
	modules: {
		Module: __webpack_require__(2),
		components: {
			templateLibrary: {
				views: {
					parts: {
						headerParts: {
							logo: __webpack_require__(9)
						}
					},
					BaseModalLayout: __webpack_require__(8)
				}
			},
			saver: {
				behaviors: {
					FooterSaver: __webpack_require__(96)
				}
			}
		},
		controls: {
			Animation: __webpack_require__(6),
			Base: __webpack_require__(7),
			BaseData: __webpack_require__(0),
			BaseMultiple: __webpack_require__(4),
			Box_shadow: __webpack_require__(32),
			Button: __webpack_require__(101),
			Choose: __webpack_require__(33),
			Code: __webpack_require__(102),
			Color: __webpack_require__(103),
			Date_time: __webpack_require__(104),
			Dimensions: __webpack_require__(105),
			Font: __webpack_require__(106),
			Gallery: __webpack_require__(107),
			Hover_animation: __webpack_require__(6),
			Icon: __webpack_require__(108),
			Image_dimensions: __webpack_require__(109),
			Media: __webpack_require__(110),
			Number: __webpack_require__(111),
			Order: __webpack_require__(113),
			Popover_toggle: __webpack_require__(114),
			Repeater: __webpack_require__(115),
			RepeaterRow: __webpack_require__(35),
			Section: __webpack_require__(116),
			Select: __webpack_require__(117),
			Select2: __webpack_require__(6),
			Slider: __webpack_require__(118),
			Structure: __webpack_require__(119),
			Switcher: __webpack_require__(120),
			Tab: __webpack_require__(121),
			Text_shadow: __webpack_require__(32),
			Url: __webpack_require__(122),
			Wp_widget: __webpack_require__(123),
			Wysiwyg: __webpack_require__(124)
		},
		elements: {
			models: {
				BaseSettings: __webpack_require__(3),
				Element: __webpack_require__(36)
			},
			views: {
				Widget: __webpack_require__(126)
			}
		},
		layouts: {
			panel: {
				pages: {
					elements: {
						views: {
							Global: __webpack_require__(38),
							Elements: __webpack_require__(128)
						}
					},
					menu: {
						Menu: __webpack_require__(129)
					}
				}
			}
		},
		views: {
			ControlsStack: __webpack_require__(12)
		}
	},

	backgroundClickListeners: {
		popover: {
			element: '.elementor-controls-popover',
			ignore: '.elementor-control-popover-toggle-toggle, .elementor-control-popover-toggle-toggle-label, .select2-container'
		},
		tagsList: {
			element: '.elementor-tags-list',
			ignore: '.elementor-control-dynamic-switcher'
		}
	},

	// TODO: Temp modules bc method since 2.0.0
	initModulesBC: function initModulesBC() {
		var bcModules = {
			ControlsStack: this.modules.views.ControlsStack,
			element: {
				Model: this.modules.elements.models.Element
			},
			RepeaterRowView: this.modules.controls.RepeaterRow,
			WidgetView: this.modules.elements.views.Widget,
			panel: {
				Menu: this.modules.layouts.panel.pages.menu.Menu
			},
			saver: {
				footerBehavior: this.modules.components.saver.behaviors.FooterSaver
			},
			SettingsModel: this.modules.elements.models.BaseSettings,
			templateLibrary: {
				ElementsCollectionView: this.modules.layouts.panel.pages.elements.views.Elements
			}
		};

		jQuery.extend(this.modules, bcModules);
	},

	userCan: function userCan(capability) {
		return -1 === this.config.user.restrictions.indexOf(capability);
	},

	_defaultDeviceMode: 'desktop',

	addControlView: function addControlView(controlID, ControlView) {
		this.modules.controls[elementor.helpers.firstLetterUppercase(controlID)] = ControlView;
	},

	checkEnvCompatibility: function checkEnvCompatibility() {
		return this.envData.gecko || this.envData.webkit;
	},

	getElementData: function getElementData(model) {
		var elType = model.get('elType');

		if ('widget' === elType) {
			var widgetType = model.get('widgetType');

			if (!this.config.widgets[widgetType]) {
				return false;
			}

			return this.config.widgets[widgetType];
		}

		if (!this.config.elements[elType]) {
			return false;
		}

		var elementConfig = this.helpers.cloneObject(this.config.elements[elType]);

		if ('section' === elType && model.get('isInner')) {
			elementConfig.title = elementor.translate('inner_section');
		}

		return elementConfig;
	},

	getElementControls: function getElementControls(modelElement) {
		var self = this,
		    elementData = self.getElementData(modelElement);

		if (!elementData) {
			return false;
		}

		var isInner = modelElement.get('isInner'),
		    controls = {};

		_.each(elementData.controls, function (controlData, controlKey) {
			if (isInner && controlData.hide_in_inner || !isInner && controlData.hide_in_top) {
				return;
			}

			controls[controlKey] = controlData;
		});

		return controls;
	},

	mergeControlsSettings: function mergeControlsSettings(controls) {
		var self = this;

		_.each(controls, function (controlData, controlKey) {
			controls[controlKey] = jQuery.extend(true, {}, self.config.controls[controlData.type], controlData);
		});

		return controls;
	},

	getControlView: function getControlView(controlID) {
		var capitalizedControlName = elementor.helpers.firstLetterUppercase(controlID),
		    View = this.modules.controls[capitalizedControlName];

		if (!View) {
			var controlData = this.config.controls[controlID],
			    isUIControl = -1 !== controlData.features.indexOf('ui');

			View = this.modules.controls[isUIControl ? 'Base' : 'BaseData'];
		}

		return View;
	},

	getPanelView: function getPanelView() {
		return this.panel.currentView;
	},

	getPreviewView: function getPreviewView() {
		return this.sections.currentView;
	},

	initEnvData: function initEnvData() {
		this.envData = _.pick(tinymce.Env, ['desktop', 'mac', 'webkit', 'gecko', 'ie', 'opera']);
	},

	initComponents: function initComponents() {
		var EventManager = __webpack_require__(20),
		    DynamicTags = __webpack_require__(132),
		    Settings = __webpack_require__(134),
		    Saver = __webpack_require__(138),
		    Notifications = __webpack_require__(139);

		this.hooks = new EventManager();

		this.saver = new Saver();

		this.settings = new Settings();

		this.dynamicTags = new DynamicTags();

		/**
   * @deprecated 1.6.0 - use `this.settings.page` instead
   */
		this.pageSettings = this.settings.page;

		this.templates.init();

		this.initDialogsManager();

		this.notifications = new Notifications();

		this.ajax.init();

		this.initHotKeys();

		this.initEnvData();
	},

	initDialogsManager: function initDialogsManager() {
		this.dialogsManager = new DialogsManager.Instance();
	},

	initElements: function initElements() {
		var ElementCollection = __webpack_require__(37),
		    config = this.config.data;

		// If it's an reload, use the not-saved data
		if (this.elements) {
			config = this.elements.toJSON();
		}

		this.elements = new ElementCollection(config);

		this.elementsModel = new Backbone.Model({
			elements: this.elements
		});
	},

	initPreview: function initPreview() {
		var $ = jQuery;

		this.$previewWrapper = $('#elementor-preview');

		this.$previewResponsiveWrapper = $('#elementor-preview-responsive-wrapper');

		var previewIframeId = 'elementor-preview-iframe';

		// Make sure the iFrame does not exist.
		if (!this.$preview) {
			this.$preview = $('<iframe>', {
				id: previewIframeId,
				src: this.config.document.urls.preview,
				allowfullscreen: 1
			});

			this.$previewResponsiveWrapper.append(this.$preview);
		}

		this.$preview.on('load', this.onPreviewLoaded.bind(this));
	},

	initFrontend: function initFrontend() {
		var frontendWindow = this.$preview[0].contentWindow;

		window.elementorFrontend = frontendWindow.elementorFrontend;

		frontendWindow.elementor = this;

		elementorFrontend.init();

		elementorFrontend.elementsHandler.initHandlers();

		this.trigger('frontend:init');
	},

	initClearPageDialog: function initClearPageDialog() {
		var self = this,
		    dialog;

		self.getClearPageDialog = function () {
			if (dialog) {
				return dialog;
			}

			dialog = this.dialogsManager.createWidget('confirm', {
				id: 'elementor-clear-page-dialog',
				headerMessage: elementor.translate('clear_page'),
				message: elementor.translate('dialog_confirm_clear_page'),
				position: {
					my: 'center center',
					at: 'center center'
				},
				strings: {
					confirm: elementor.translate('delete'),
					cancel: elementor.translate('cancel')
				},
				onConfirm: function onConfirm() {
					self.elements.reset();
				}
			});

			return dialog;
		};
	},

	initHotKeys: function initHotKeys() {
		var keysDictionary = {
			c: 67,
			d: 68,
			i: 73,
			l: 76,
			m: 77,
			p: 80,
			s: 83,
			v: 86,
			del: 46
		};

		var $ = jQuery,
		    hotKeysHandlers = {},
		    hotKeysManager = this.hotKeys;

		hotKeysHandlers[keysDictionary.c] = {
			copyElement: {
				isWorthHandling: function isWorthHandling(event) {
					if (!hotKeysManager.isControlEvent(event)) {
						return false;
					}

					var isEditorOpen = 'editor' === elementor.getPanelView().getCurrentPageName();

					if (!isEditorOpen) {
						return false;
					}

					var frontendWindow = elementorFrontend.getElements('window'),
					    textSelection = getSelection() + frontendWindow.getSelection();

					if (!textSelection && elementor.envData.gecko) {
						textSelection = [window, frontendWindow].some(function (window) {
							var activeElement = window.document.activeElement;

							if (!activeElement || -1 === ['INPUT', 'TEXTAREA'].indexOf(activeElement.tagName)) {
								return;
							}

							var originalInputType;

							// Some of input types can't retrieve a selection
							if ('INPUT' === activeElement.tagName) {
								originalInputType = activeElement.type;

								activeElement.type = 'text';
							}

							var selection = activeElement.value.substring(activeElement.selectionStart, activeElement.selectionEnd);

							activeElement.type = originalInputType;

							return !!selection;
						});
					}

					return !textSelection;
				},
				handle: function handle() {
					elementor.getPanelView().getCurrentPageView().getOption('editedElementView').copy();
				}
			}
		};

		hotKeysHandlers[keysDictionary.d] = {
			duplicateElement: {
				isWorthHandling: function isWorthHandling(event) {
					return hotKeysManager.isControlEvent(event);
				},
				handle: function handle() {
					var panel = elementor.getPanelView();

					if ('editor' !== panel.getCurrentPageName()) {
						return;
					}

					panel.getCurrentPageView().getOption('editedElementView').duplicate();
				}
			}
		};

		hotKeysHandlers[keysDictionary.i] = {
			navigator: {
				isWorthHandling: function isWorthHandling(event) {
					return hotKeysManager.isControlEvent(event) && 'edit' === elementor.channels.dataEditMode.request('activeMode');
				},
				handle: function handle() {
					if (elementor.navigator.storage.visible) {
						elementor.navigator.close();
					} else {
						elementor.navigator.open();
					}
				}
			}
		};

		hotKeysHandlers[keysDictionary.l] = {
			showTemplateLibrary: {
				isWorthHandling: function isWorthHandling(event) {
					return hotKeysManager.isControlEvent(event) && event.shiftKey;
				},
				handle: function handle() {
					elementor.templates.startModal();
				}
			}
		};

		hotKeysHandlers[keysDictionary.m] = {
			changeDeviceMode: {
				devices: ['desktop', 'tablet', 'mobile'],
				isWorthHandling: function isWorthHandling(event) {
					return hotKeysManager.isControlEvent(event) && event.shiftKey;
				},
				handle: function handle() {
					var currentDeviceMode = elementor.channels.deviceMode.request('currentMode'),
					    modeIndex = this.devices.indexOf(currentDeviceMode);

					modeIndex++;

					if (modeIndex >= this.devices.length) {
						modeIndex = 0;
					}

					elementor.changeDeviceMode(this.devices[modeIndex]);
				}
			}
		};

		hotKeysHandlers[keysDictionary.p] = {
			changeEditMode: {
				isWorthHandling: function isWorthHandling(event) {
					return hotKeysManager.isControlEvent(event);
				},
				handle: function handle() {
					elementor.getPanelView().modeSwitcher.currentView.toggleMode();
				}
			}
		};

		hotKeysHandlers[keysDictionary.s] = {
			saveEditor: {
				isWorthHandling: function isWorthHandling(event) {
					return hotKeysManager.isControlEvent(event);
				},
				handle: function handle() {
					elementor.saver.saveDraft();
				}
			}
		};

		hotKeysHandlers[keysDictionary.v] = {
			pasteElement: {
				isWorthHandling: function isWorthHandling(event) {
					if (!hotKeysManager.isControlEvent(event)) {
						return false;
					}

					return -1 !== ['BODY', 'IFRAME'].indexOf(document.activeElement.tagName) && 'BODY' === elementorFrontend.getElements('window').document.activeElement.tagName;
				},
				handle: function handle(event) {
					var targetElement = elementor.channels.editor.request('contextMenu:targetView');

					if (!targetElement) {
						var panel = elementor.getPanelView();

						if ('editor' === panel.getCurrentPageName()) {
							targetElement = panel.getCurrentPageView().getOption('editedElementView');
						}
					}

					if (event.shiftKey) {
						if (targetElement && targetElement.pasteStyle && elementor.getStorage('transfer')) {
							targetElement.pasteStyle();
						}

						return;
					}

					if (!targetElement) {
						targetElement = elementor.getPreviewView();
					}

					if (targetElement.isPasteEnabled()) {
						targetElement.paste();
					}
				}
			}
		};

		hotKeysHandlers[keysDictionary.del] = {
			deleteElement: {
				isWorthHandling: function isWorthHandling(event) {
					var isEditorOpen = 'editor' === elementor.getPanelView().getCurrentPageName();

					if (!isEditorOpen) {
						return false;
					}

					var $target = $(event.target);

					if ($target.is(':input, .elementor-input')) {
						return false;
					}

					return !$target.closest('[contenteditable="true"]').length;
				},
				handle: function handle() {
					elementor.getPanelView().getCurrentPageView().getOption('editedElementView').removeElement();
				}
			}
		};

		_.each(hotKeysHandlers, function (handlers, keyCode) {
			_.each(handlers, function (handler, handlerName) {
				hotKeysManager.addHotKeyHandler(keyCode, handlerName, handler);
			});
		});

		hotKeysManager.bindListener(this.$window);
	},

	initPanel: function initPanel() {
		this.addRegions({ panel: __webpack_require__(140) });
	},

	initNavigator: function initNavigator() {
		this.addRegions({
			navigator: {
				el: '#elementor-navigator',
				regionClass: _navigator2.default
			}
		});
	},

	preventClicksInsideEditor: function preventClicksInsideEditor() {
		this.$previewContents.on('submit', function (event) {
			event.preventDefault();
		});

		this.$previewContents.on('click', function (event) {
			var $target = jQuery(event.target),
			    editMode = elementor.channels.dataEditMode.request('activeMode'),
			    isClickInsideElementor = !!$target.closest('#elementor, .pen-menu').length,
			    isTargetInsideDocument = this.contains($target[0]);

			if (isClickInsideElementor && 'edit' === editMode || !isTargetInsideDocument) {
				return;
			}

			if ($target.closest('a:not(.elementor-clickable)').length) {
				event.preventDefault();
			}

			if (!isClickInsideElementor) {
				var panelView = elementor.getPanelView();

				if ('elements' !== panelView.getCurrentPageName()) {
					panelView.setPage('elements');
				}
			}
		});
	},

	addBackgroundClickArea: function addBackgroundClickArea(element) {
		element.addEventListener('click', this.onBackgroundClick.bind(this), true);
	},

	addBackgroundClickListener: function addBackgroundClickListener(key, listener) {
		this.backgroundClickListeners[key] = listener;
	},

	removeBackgroundClickListener: function removeBackgroundClickListener(key) {
		delete this.backgroundClickListeners[key];
	},

	showFatalErrorDialog: function showFatalErrorDialog(options) {
		var defaultOptions = {
			id: 'elementor-fatal-error-dialog',
			headerMessage: '',
			message: '',
			position: {
				my: 'center center',
				at: 'center center'
			},
			strings: {
				confirm: elementor.translate('learn_more'),
				cancel: elementor.translate('go_back')
			},
			onConfirm: null,
			onCancel: function onCancel() {
				parent.history.go(-1);
			},
			hide: {
				onBackgroundClick: false,
				onButtonClick: false
			}
		};

		options = jQuery.extend(true, defaultOptions, options);

		this.dialogsManager.createWidget('confirm', options).show();
	},

	checkPageStatus: function checkPageStatus() {
		if (elementor.config.current_revision_id !== elementor.config.document.id) {
			this.notifications.showToast({
				message: this.translate('working_on_draft_notification'),
				buttons: [{
					name: 'view_revisions',
					text: elementor.translate('view_all_revisions'),
					callback: function callback() {
						var panel = elementor.getPanelView();

						panel.setPage('historyPage');
						panel.getCurrentPageView().activateTab('revisions');
					}
				}]
			});
		}
	},

	getStorage: function getStorage(key) {
		var elementorStorage = localStorage.getItem('elementor');

		if (elementorStorage) {
			elementorStorage = JSON.parse(elementorStorage);
		} else {
			elementorStorage = {};
		}

		if (key) {
			return elementorStorage[key];
		}

		return elementorStorage;
	},

	setStorage: function setStorage(key, value) {
		var elementorStorage = this.getStorage();

		elementorStorage[key] = value;

		localStorage.setItem('elementor', JSON.stringify(elementorStorage));
	},

	openLibraryOnStart: function openLibraryOnStart() {
		if ('#library' === location.hash) {
			elementor.templates.startModal();

			location.hash = '';
		}
	},

	enterPreviewMode: function enterPreviewMode(hidePanel) {
		var $elements = elementorFrontend.getElements('$body');

		if (hidePanel) {
			$elements = $elements.add(this.$body);
		}

		$elements.removeClass('elementor-editor-active').addClass('elementor-editor-preview');

		this.$previewElementorEl.removeClass('elementor-edit-area-active').addClass('elementor-edit-area-preview');

		if (hidePanel) {
			// Handle panel resize
			this.$previewWrapper.css(this.config.is_rtl ? 'right' : 'left', '');

			this.panel.$el.css('width', '');
		}
	},

	exitPreviewMode: function exitPreviewMode() {
		elementorFrontend.getElements('$body').add(this.$body).removeClass('elementor-editor-preview').addClass('elementor-editor-active');

		this.$previewElementorEl.removeClass('elementor-edit-area-preview').addClass('elementor-edit-area-active');
	},

	changeEditMode: function changeEditMode(newMode) {
		var dataEditMode = elementor.channels.dataEditMode,
		    oldEditMode = dataEditMode.request('activeMode');

		dataEditMode.reply('activeMode', newMode);

		if (newMode !== oldEditMode) {
			dataEditMode.trigger('switch', newMode);
		}
	},

	reloadPreview: function reloadPreview() {
		jQuery('#elementor-preview-loading').show();

		this.$preview[0].contentWindow.location.reload(true);
	},

	clearPage: function clearPage() {
		this.getClearPageDialog().show();
	},

	changeDeviceMode: function changeDeviceMode(newDeviceMode) {
		var oldDeviceMode = this.channels.deviceMode.request('currentMode');

		if (oldDeviceMode === newDeviceMode) {
			return;
		}

		this.$body.removeClass('elementor-device-' + oldDeviceMode).addClass('elementor-device-' + newDeviceMode);

		this.channels.deviceMode.reply('previousMode', oldDeviceMode).reply('currentMode', newDeviceMode).trigger('change');
	},

	enqueueTypographyFonts: function enqueueTypographyFonts() {
		var self = this,
		    typographyScheme = this.schemes.getScheme('typography');

		self.helpers.resetEnqueuedFontsCache();

		_.each(typographyScheme.items, function (item) {
			self.helpers.enqueueFont(item.value.font_family);
		});
	},

	translate: function translate(stringKey, templateArgs, i18nStack) {
		if (!i18nStack) {
			i18nStack = this.config.i18n;
		}

		var string = i18nStack[stringKey];

		if (undefined === string) {
			string = stringKey;
		}

		if (templateArgs) {
			// TODO: bc since 2.0.4
			string = string.replace(/{(\d+)}/g, function (match, number) {
				return undefined !== templateArgs[number] ? templateArgs[number] : match;
			});

			string = string.replace(/%(?:(\d+)\$)?s/g, function (match, number) {
				if (!number) {
					number = 1;
				}

				number--;

				return undefined !== templateArgs[number] ? templateArgs[number] : match;
			});
		}

		return string;
	},

	logSite: function logSite() {
		var text = '',
		    style = '';

		if (this.envData.gecko) {
			var asciiText = [' ;;;;;;;;;;;;;;; ', ';;;  ;;       ;;;', ';;;  ;;;;;;;;;;;;', ';;;  ;;;;;;;;;;;;', ';;;  ;;       ;;;', ';;;  ;;;;;;;;;;;;', ';;;  ;;;;;;;;;;;;', ';;;  ;;       ;;;', ' ;;;;;;;;;;;;;;; '];

			text += '%c' + asciiText.join('\n') + '\n';

			style = 'color: #C42961';
		} else {
			text += '%c00';

			style = 'font-size: 22px; background-image: url("' + elementor.config.assets_url + 'images/logo-icon.png"); color: transparent; background-repeat: no-repeat';
		}

		setTimeout(console.log.bind(console, text, style));

		text = '%cLove using Elementor? Join our growing community of Elementor developers: %chttps://github.com/pojome/elementor';

		setTimeout(console.log.bind(console, text, 'color: #9B0A46', ''));
	},

	onStart: function onStart() {
		this.$window = jQuery(window);

		this.$body = jQuery('body');

		NProgress.start();
		NProgress.inc(0.2);

		this.config = ElementorConfig;

		Backbone.Radio.DEBUG = false;
		Backbone.Radio.tuneIn('ELEMENTOR');

		this.initModulesBC();

		this.initComponents();

		if (!this.checkEnvCompatibility()) {
			this.onEnvNotCompatible();
		}

		this.channels.dataEditMode.reply('activeMode', 'edit');

		this.listenTo(this.channels.dataEditMode, 'switch', this.onEditModeSwitched);

		this.initClearPageDialog();

		this.addBackgroundClickArea(document);

		this.$window.trigger('elementor:init');

		this.initPreview();

		this.logSite();
	},

	onPreviewLoaded: function onPreviewLoaded() {
		NProgress.done();

		var previewWindow = this.$preview[0].contentWindow;

		if (!previewWindow.elementorFrontend) {
			this.onPreviewLoadingError();

			return;
		}

		this.$previewContents = this.$preview.contents();
		this.$previewElementorEl = this.$previewContents.find('#elementor');

		if (!this.$previewElementorEl.length) {
			this.onPreviewElNotFound();

			return;
		}

		this.initFrontend();

		this.initElements();

		var iframeRegion = new Marionette.Region({
			// Make sure you get the DOM object out of the jQuery object
			el: this.$previewElementorEl[0]
		});

		this.schemes.init();
		this.schemes.printSchemesStyle();

		this.preventClicksInsideEditor();

		this.addBackgroundClickArea(elementorFrontend.getElements('$document')[0]);

		if (this.previewLoadedOnce) {
			this.getPanelView().setPage('elements', null, { autoFocusSearch: false });
		} else {
			this.onFirstPreviewLoaded();
		}

		this.initNavigator();

		this.addRegions({
			sections: iframeRegion
		});

		var Preview = __webpack_require__(156);

		this.sections.show(new Preview({ model: this.elementsModel }));

		this.$previewContents.children().addClass('elementor-html');

		elementorFrontend.getElements('$body').addClass('elementor-editor-active');

		if (!elementor.userCan('design')) {
			elementorFrontend.getElements('$body').addClass('elementor-editor-content-only');
		}

		this.changeDeviceMode(this._defaultDeviceMode);

		jQuery('#elementor-loading, #elementor-preview-loading').fadeOut(600);

		_.defer(function () {
			elementorFrontend.getElements('window').jQuery.holdReady(false);
		});

		this.enqueueTypographyFonts();

		this.onEditModeSwitched();

		this.hotKeys.bindListener(elementorFrontend.getElements('$window'));

		this.trigger('preview:loaded');
	},

	onFirstPreviewLoaded: function onFirstPreviewLoaded() {
		this.initPanel();

		this.heartbeat = new _heartbeat2.default();

		this.checkPageStatus();

		this.openLibraryOnStart();

		this.previewLoadedOnce = true;
	},

	onEditModeSwitched: function onEditModeSwitched() {
		var activeMode = this.channels.dataEditMode.request('activeMode');

		if ('edit' === activeMode) {
			this.exitPreviewMode();
		} else {
			this.enterPreviewMode('preview' === activeMode);
		}
	},

	onEnvNotCompatible: function onEnvNotCompatible() {
		this.showFatalErrorDialog({
			headerMessage: this.translate('device_incompatible_header'),
			message: this.translate('device_incompatible_message'),
			strings: {
				confirm: elementor.translate('proceed_anyway')
			},
			hide: {
				onButtonClick: true
			},
			onConfirm: function onConfirm() {
				this.hide();
			}
		});
	},

	onPreviewLoadingError: function onPreviewLoadingError() {
		this.showFatalErrorDialog({
			headerMessage: this.translate('preview_not_loading_header'),
			message: this.translate('preview_not_loading_message'),
			onConfirm: function onConfirm() {
				open(elementor.config.help_preview_error_url, '_blank');
			}
		});
	},

	onPreviewElNotFound: function onPreviewElNotFound() {
		var args = this.$preview[0].contentWindow.elementorPreviewErrorArgs;

		if (!args) {
			args = {
				headerMessage: this.translate('preview_el_not_found_header'),
				message: this.translate('preview_el_not_found_message'),
				confirmURL: elementor.config.help_the_content_url
			};
		}

		args.onConfirm = function () {
			open(args.confirmURL, '_blank');
		};

		this.showFatalErrorDialog(args);
	},

	onBackgroundClick: function onBackgroundClick(event) {
		jQuery.each(this.backgroundClickListeners, function () {
			var $clickedTarget = jQuery(event.target);

			// If it's a label that associated with an input
			if ($clickedTarget[0].control) {
				$clickedTarget = $clickedTarget.add($clickedTarget[0].control);
			}

			if (this.ignore && $clickedTarget.closest(this.ignore).length) {
				return;
			}

			if (this.callback) {
				this.callback();

				return;
			}

			var $clickedTargetClosestElement = $clickedTarget.closest(this.element);

			jQuery(this.element).not($clickedTargetClosestElement).hide();
		});
	}
});

module.exports = (window.elementor = new App()).start();

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Heartbeat = function () {
	function Heartbeat() {
		var _this = this;

		_classCallCheck(this, Heartbeat);

		var modal = void 0;

		this.getModal = function () {
			if (!modal) {
				modal = _this.initModal();
			}

			return modal;
		};

		jQuery(document).on({
			'heartbeat-send': function heartbeatSend(event, data) {
				data.elementor_post_lock = {
					post_ID: elementor.config.document.id
				};
			},
			'heartbeat-tick': function heartbeatTick(event, response) {
				if (response.locked_user) {
					if (elementor.saver.isEditorChanged()) {
						elementor.saver.saveEditor({
							status: 'autosave'
						});
					}

					_this.showLockMessage(response.locked_user);
				} else {
					_this.getModal().hide();
				}

				elementor.config.nonce = response.elementorNonce;
			},
			'heartbeat-tick.wp-refresh-nonces': function heartbeatTickWpRefreshNonces(event, response) {
				var nonces = response['elementor-refresh-nonces'];

				if (nonces) {
					if (nonces.heartbeatNonce) {
						elementor.config.nonce = nonces.elementorNonce;
					}

					if (nonces.heartbeatNonce) {
						window.heartbeatSettings.nonce = nonces.heartbeatNonce;
					}
				}
			}
		});

		if (elementor.config.locked_user) {
			this.showLockMessage(elementor.config.locked_user);
		}
	}

	_createClass(Heartbeat, [{
		key: 'initModal',
		value: function initModal() {
			var modal = elementor.dialogsManager.createWidget('lightbox', {
				headerMessage: elementor.translate('take_over')
			});

			modal.addButton({
				name: 'go_back',
				text: elementor.translate('go_back'),
				callback: function callback() {
					parent.history.go(-1);
				}
			});

			modal.addButton({
				name: 'take_over',
				text: elementor.translate('take_over'),
				callback: function callback() {
					wp.heartbeat.enqueue('elementor_force_post_lock', true);
					wp.heartbeat.connectNow();
				}
			});

			return modal;
		}
	}, {
		key: 'showLockMessage',
		value: function showLockMessage(lockedUser) {
			var modal = this.getModal();

			modal.setMessage(elementor.translate('dialog_user_taken_over', [lockedUser])).show();
		}
	}]);

	return Heartbeat;
}();

exports.default = Heartbeat;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _layout = __webpack_require__(51);

var _layout2 = _interopRequireDefault(_layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseRegion = __webpack_require__(23);

var _class = function (_BaseRegion) {
	_inherits(_class, _BaseRegion);

	function _class(options) {
		_classCallCheck(this, _class);

		var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, options));

		_this.isDocked = false;

		_this.opened = false;

		_this.ensurePosition = _this.ensurePosition.bind(_this);

		_this.listenTo(elementor.channels.dataEditMode, 'switch', _this.onEditModeSwitched);

		if (_this.storage.visible) {
			_this.open();
		}
		return _this;
	}

	_createClass(_class, [{
		key: 'getStorageKey',
		value: function getStorageKey() {
			return 'navigator';
		}
	}, {
		key: 'getDefaultStorage',
		value: function getDefaultStorage() {
			return {
				visible: false,
				size: {
					width: '',
					height: '',
					top: '',
					bottom: '',
					right: '',
					left: ''
				}
			};
		}
	}, {
		key: 'getLayout',
		value: function getLayout() {
			return this.currentView;
		}
	}, {
		key: 'getDraggableOptions',
		value: function getDraggableOptions() {
			return {
				iframeFix: true,
				handle: '#elementor-navigator__header',
				drag: this.onDrag.bind(this),
				stop: this.onDragStop.bind(this)
			};
		}
	}, {
		key: 'getResizableOptions',
		value: function getResizableOptions() {
			var _this2 = this;

			return {
				handles: 'all',
				containment: 'document',
				minWidth: 150,
				maxWidth: 500,
				minHeight: 240,
				start: function start() {
					elementor.$previewWrapper.addClass('ui-resizable-resizing');
				},
				stop: function stop() {
					elementor.$previewWrapper.removeClass('ui-resizable-resizing');

					if (_this2.isDocked) {
						_this2.storage.size.width = elementor.helpers.getElementInlineStyle(_this2.$el, ['width']).width;

						elementor.setStorage('navigator', _this2.storage);
					} else {
						_this2.saveSize();
					}
				}
			};
		}
	}, {
		key: 'beforeFirstOpen',
		value: function beforeFirstOpen() {
			this.show(new _layout2.default());

			this.$el.draggable(this.getDraggableOptions());

			this.$el.resizable(this.getResizableOptions());
		}
	}, {
		key: 'open',
		value: function open(model) {
			if (!this.opened) {
				this.beforeFirstOpen();

				this.opened = true;
			}

			this.$el.show();

			if (this.storage.docked) {
				this.dock();

				this.setDockedSize();
			} else {
				this.setSize();
			}

			if (model) {
				model.trigger('request:edit');
			}

			this.saveStorage('visible', true);

			this.ensurePosition();

			elementor.$window.on('resize', this.ensurePosition);
		}
	}, {
		key: 'close',
		value: function close(silent) {
			this.$el.hide();

			if (this.isDocked) {
				this.undock(true);
			}

			if (!silent) {
				this.saveStorage('visible', false);
			}

			elementor.$window.off('resize', this.ensurePosition);
		}
	}, {
		key: 'isOpen',
		value: function isOpen() {
			return this.$el.is(':visible');
		}
	}, {
		key: 'dock',
		value: function dock() {
			elementor.$body.addClass('elementor-navigator-docked');

			var side = elementor.config.is_rtl ? 'left' : 'right',
			    resizableOptions = this.getResizableOptions();

			this.$el.css({
				height: '',
				top: '',
				bottom: '',
				left: '',
				right: ''
			});

			elementor.$previewWrapper.css(side, this.storage.size.width);

			this.$el.resizable('destroy');

			resizableOptions.handles = elementor.config.is_rtl ? 'e' : 'w';

			resizableOptions.resize = function (event, ui) {
				elementor.$previewWrapper.css(side, ui.size.width);
			};

			this.$el.resizable(resizableOptions);

			this.isDocked = true;

			this.saveStorage('docked', true);
		}
	}, {
		key: 'undock',
		value: function undock(silent) {
			elementor.$body.removeClass('elementor-navigator-docked');

			elementor.$previewWrapper.css(elementor.config.is_rtl ? 'left' : 'right', '');

			this.setSize();

			this.$el.resizable('destroy');

			this.$el.resizable(this.getResizableOptions());

			this.isDocked = false;

			if (!silent) {
				this.saveStorage('docked', false);
			}
		}
	}, {
		key: 'setSize',
		value: function setSize() {
			if (this.storage.size) {
				this.$el.css(this.storage.size);
			}
		}
	}, {
		key: 'setDockedSize',
		value: function setDockedSize() {
			this.$el.css('width', this.storage.size.width);
		}
	}, {
		key: 'ensurePosition',
		value: function ensurePosition() {
			if (this.isDocked) {
				return;
			}

			var offset = this.$el.offset();

			if (offset.left > innerWidth) {
				this.$el.css({
					left: '',
					right: ''
				});
			}

			if (offset.top > innerHeight) {
				this.$el.css({
					top: '',
					bottom: ''
				});
			}
		}
	}, {
		key: 'onDrag',
		value: function onDrag(event, ui) {
			if (this.isDocked) {
				if (ui.position.left === ui.originalPosition.left) {
					if (ui.position.top !== ui.originalPosition.top) {
						return false;
					}
				} else {
					this.undock();
				}

				return;
			}

			if (0 > ui.position.top) {
				ui.position.top = 0;
			}

			var isOutOfLeft = 0 > ui.position.left,
			    isOutOfRight = ui.position.left + this.el.offsetWidth > innerWidth;

			if (elementor.config.is_rtl) {
				if (isOutOfRight) {
					ui.position.left = innerWidth - this.el.offsetWidth;
				}
			} else if (isOutOfLeft) {
				ui.position.left = 0;
			}

			elementor.$body.toggleClass('elementor-navigator--dock-hint', elementor.config.is_rtl ? isOutOfLeft : isOutOfRight);
		}
	}, {
		key: 'onDragStop',
		value: function onDragStop(event, ui) {
			if (this.isDocked) {
				return;
			}

			this.saveSize();

			var elementRight = ui.position.left + this.el.offsetWidth;

			if (0 > ui.position.left || elementRight > innerWidth) {
				this.dock();
			}

			elementor.$body.removeClass('elementor-navigator--dock-hint');
		}
	}, {
		key: 'onEditModeSwitched',
		value: function onEditModeSwitched(activeMode) {
			if ('edit' === activeMode && this.storage.visible) {
				this.open();
			} else {
				this.close(true);
			}
		}
	}]);

	return _class;
}(BaseRegion);

exports.default = _class;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _element = __webpack_require__(52);

var _element2 = _interopRequireDefault(_element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Marionette$LayoutVie) {
	_inherits(_class, _Marionette$LayoutVie);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
	}

	_createClass(_class, [{
		key: 'getTemplate',
		value: function getTemplate() {
			return '#tmpl-elementor-navigator';
		}
	}, {
		key: 'id',
		value: function id() {
			return 'elementor-navigator__inner';
		}
	}, {
		key: 'ui',
		value: function ui() {
			return {
				toggleAll: '#elementor-navigator__toggle-all',
				close: '#elementor-navigator__close'
			};
		}
	}, {
		key: 'events',
		value: function events() {
			return {
				'click @ui.toggleAll': 'toggleAll',
				'click @ui.close': 'onCloseClick'
			};
		}
	}, {
		key: 'regions',
		value: function regions() {
			return {
				elements: '#elementor-navigator__elements'
			};
		}
	}, {
		key: 'toggleAll',
		value: function toggleAll() {
			var state = 'expand' === this.ui.toggleAll.data('elementor-action'),
			    classes = ['eicon-collapse', 'eicon-expand'];

			this.ui.toggleAll.data('elementor-action', state ? 'collapse' : 'expand').removeClass(classes[+state]).addClass(classes[+!state]);

			this.elements.currentView.recursiveChildInvoke('toggleList', state);
		}
	}, {
		key: 'activateElementsMouseInteraction',
		value: function activateElementsMouseInteraction() {
			this.elements.currentView.recursiveChildInvoke('activateMouseInteraction');
		}
	}, {
		key: 'deactivateElementsMouseInteraction',
		value: function deactivateElementsMouseInteraction() {
			this.elements.currentView.recursiveChildInvoke('deactivateMouseInteraction');
		}
	}, {
		key: 'onShow',
		value: function onShow() {
			this.elements.show(new _element2.default({
				model: elementor.elementsModel
			}));
		}
	}, {
		key: 'onCloseClick',
		value: function onCloseClick() {
			elementor.navigator.close();
		}
	}]);

	return _class;
}(Marionette.LayoutView);

exports.default = _class;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _elementEmpty = __webpack_require__(53);

var _elementEmpty2 = _interopRequireDefault(_elementEmpty);

var _rootEmpty = __webpack_require__(54);

var _rootEmpty2 = _interopRequireDefault(_rootEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Marionette$Composite) {
	_inherits(_class, _Marionette$Composite);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
	}

	_createClass(_class, [{
		key: 'getTemplate',
		value: function getTemplate() {
			return '#tmpl-elementor-navigator__elements';
		}
	}, {
		key: 'ui',
		value: function ui() {
			return {
				item: '> .elementor-navigator__item',
				title: '> .elementor-navigator__item .elementor-navigator__element__title__text',
				toggle: '> .elementor-navigator__item > .elementor-navigator__element__toggle',
				toggleList: '> .elementor-navigator__item > .elementor-navigator__element__list-toggle',
				elements: '> .elementor-navigator__elements'
			};
		}
	}, {
		key: 'events',
		value: function events() {
			return {
				'contextmenu': 'onContextMenu',
				'click @ui.item': 'onItemClick',
				'click @ui.toggle': 'onToggleClick',
				'click @ui.toggleList': 'onToggleListClick',
				'dblclick @ui.title': 'onTitleDoubleClick',
				'keydown @ui.title': 'onTitleKeyDown',
				'paste @ui.title': 'onTitlePaste',
				'sortstart @ui.elements': 'onSortStart',
				'sortover @ui.elements': 'onSortOver',
				'sortout @ui.elements': 'onSortOut',
				'sortstop @ui.elements': 'onSortStop',
				'sortupdate @ui.elements': 'onSortUpdate',
				'sortreceive @ui.elements': 'onSortReceive'
			};
		}
	}, {
		key: 'getEmptyView',
		value: function getEmptyView() {
			if (this.isRoot()) {
				return _rootEmpty2.default;
			}

			if (this.hasChildren()) {
				return _elementEmpty2.default;
			}

			return null;
		}
	}, {
		key: 'childViewOptions',
		value: function childViewOptions() {
			return {
				indent: this.getIndent() + 10
			};
		}
	}, {
		key: 'className',
		value: function className() {
			var elType = this.model.get('elType');

			var classes = 'elementor-navigator__element';

			if (elType) {
				classes += ' elementor-navigator__element-' + elType;
			}

			if (this.hasChildren()) {
				classes += ' elementor-navigator__element--has-children';
			}

			return classes;
		}
	}, {
		key: 'attributes',
		value: function attributes() {
			return {
				'data-model-cid': this.model.cid
			};
		}
	}, {
		key: 'templateHelpers',
		value: function templateHelpers() {
			var helpers = {};

			if (!this.isRoot()) {
				helpers.title = this.model.getTitle();

				helpers.icon = 'section' === this.model.get('elType') ? '' : this.model.getIcon();
			}

			return helpers;
		}
	}, {
		key: 'initialize',
		value: function initialize() {
			this.collection = this.model.get('elements');

			this.childViewContainer = '.elementor-navigator__elements';

			this.listenTo(this.model, 'request:edit', this.onEditRequest).listenTo(this.model, 'change', this.onModelChange).listenTo(this.model.get('settings'), 'change', this.onModelSettingsChange);
		}
	}, {
		key: 'getIndent',
		value: function getIndent() {
			return this.getOption('indent') || 0;
		}
	}, {
		key: 'isRoot',
		value: function isRoot() {
			return !this.model.get('elType');
		}
	}, {
		key: 'hasChildren',
		value: function hasChildren() {
			return 'widget' !== this.model.get('elType');
		}
	}, {
		key: 'toggleList',
		value: function toggleList(state, callback) {
			if (!this.hasChildren() || this.isRoot()) {
				return;
			}

			var isActive = this.ui.item.hasClass('elementor-active');

			if (isActive === state) {
				return;
			}

			this.ui.item.toggleClass('elementor-active', state);

			var slideMethod = 'slideToggle';

			if (undefined !== state) {
				slideMethod = 'slide' + (state ? 'Down' : 'Up');
			}

			this.ui.elements[slideMethod](300, callback);
		}
	}, {
		key: 'toggleHiddenClass',
		value: function toggleHiddenClass() {
			this.$el.toggleClass('elementor-navigator__element--hidden', !!this.model.get('hidden'));
		}
	}, {
		key: 'recursiveChildInvoke',
		value: function recursiveChildInvoke(method) {
			var _this2 = this,
			    _arguments = arguments;

			for (var _len = arguments.length, restArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				restArgs[_key - 1] = arguments[_key];
			}

			this[method].apply(this, restArgs);

			this.children.each(function (child) {
				if (!(child instanceof _this2.constructor)) {
					return;
				}

				child.recursiveChildInvoke.apply(child, _arguments);
			});
		}
	}, {
		key: 'recursiveParentInvoke',
		value: function recursiveParentInvoke(method) {
			for (var _len2 = arguments.length, restArgs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
				restArgs[_key2 - 1] = arguments[_key2];
			}

			if (!(this._parent instanceof this.constructor)) {
				return;
			}

			this._parent[method].apply(this._parent, restArgs);

			this._parent.recursiveParentInvoke.apply(this._parent, arguments);
		}
	}, {
		key: 'recursiveChildAgreement',
		value: function recursiveChildAgreement(method) {
			for (var _len3 = arguments.length, restArgs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
				restArgs[_key3 - 1] = arguments[_key3];
			}

			if (!this[method].apply(this, restArgs)) {
				return false;
			}

			var hasAgreement = true;

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = Object.values(this.children._views)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var child = _step.value;

					if (!(child instanceof this.constructor)) {
						continue;
					}

					if (!child.recursiveChildAgreement.apply(child, arguments)) {
						hasAgreement = false;

						break;
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return hasAgreement;
		}
	}, {
		key: 'activateMouseInteraction',
		value: function activateMouseInteraction() {
			this.$el.on({
				mouseenter: this.onMouseEnter.bind(this),
				mouseleave: this.onMouseLeave.bind(this)
			});
		}
	}, {
		key: 'deactivateMouseInteraction',
		value: function deactivateMouseInteraction() {
			this.$el.off('mouseenter mouseleave');
		}
	}, {
		key: 'dragShouldBeIgnored',
		value: function dragShouldBeIgnored(draggedModel) {
			var childTypes = elementor.helpers.getElementChildType(this.model.get('elType')),
			    draggedElType = draggedModel.get('elType');

			if ('section' === draggedElType && !draggedModel.get('isInner')) {
				return true;
			}

			return !childTypes || -1 === childTypes.indexOf(draggedModel.get('elType'));
		}
	}, {
		key: 'addEditingClass',
		value: function addEditingClass() {
			this.ui.item.addClass('elementor-editing');
		}
	}, {
		key: 'removeEditingClass',
		value: function removeEditingClass() {
			this.ui.item.removeClass('elementor-editing');
		}
	}, {
		key: 'enterTitleEditing',
		value: function enterTitleEditing() {
			this.ui.title.attr('contenteditable', true).focus();

			document.execCommand('selectAll');

			elementor.addBackgroundClickListener('navigator', {
				ignore: this.ui.title,
				callback: this.exitTitleEditing.bind(this)
			});
		}
	}, {
		key: 'exitTitleEditing',
		value: function exitTitleEditing() {
			this.ui.title.attr('contenteditable', false);

			var newTitle = this.ui.title.text().trim();

			this.model.get('settings').set('_title', newTitle);

			elementor.removeBackgroundClickListener('navigator');
		}
	}, {
		key: 'activateSortable',
		value: function activateSortable() {
			if (!elementor.userCan('design')) {
				return;
			}

			this.ui.elements.sortable({
				items: '> .elementor-navigator__element',
				placeholder: 'ui-sortable-placeholder',
				axis: 'y',
				forcePlaceholderSize: true,
				connectWith: '.elementor-navigator__element-' + this.model.get('elType') + ' ' + this.ui.elements.selector,
				cancel: '[contenteditable="true"]'
			});
		}
	}, {
		key: 'onRender',
		value: function onRender() {
			this.activateSortable();

			this.ui.item.css('padding-' + (elementor.config.is_rtl ? 'right' : 'left'), this.getIndent());

			this.toggleHiddenClass();
		}
	}, {
		key: 'onModelChange',
		value: function onModelChange() {
			if (undefined !== this.model.changed.hidden) {
				this.toggleHiddenClass();
			}
		}
	}, {
		key: 'onModelSettingsChange',
		value: function onModelSettingsChange(settingsModel) {
			if (undefined !== settingsModel.changed._title) {
				this.ui.title.text(this.model.getTitle());
			}
		}
	}, {
		key: 'onItemClick',
		value: function onItemClick() {
			this.model.trigger('request:edit', { scrollIntoView: true });
		}
	}, {
		key: 'onToggleClick',
		value: function onToggleClick(event) {
			event.stopPropagation();

			this.model.trigger('request:toggleVisibility');
		}
	}, {
		key: 'onTitleDoubleClick',
		value: function onTitleDoubleClick() {
			this.enterTitleEditing();
		}
	}, {
		key: 'onTitleKeyDown',
		value: function onTitleKeyDown(event) {
			var ENTER_KEY = 13;

			if (ENTER_KEY === event.which) {
				event.preventDefault();

				this.exitTitleEditing();
			}
		}
	}, {
		key: 'onTitlePaste',
		value: function onTitlePaste(event) {
			event.preventDefault();

			document.execCommand('insertHTML', false, event.originalEvent.clipboardData.getData('text/plain'));
		}
	}, {
		key: 'onToggleListClick',
		value: function onToggleListClick(event) {
			event.stopPropagation();

			this.toggleList();
		}
	}, {
		key: 'onSortStart',
		value: function onSortStart(event, ui) {
			this.model.trigger('request:sort:start', event, ui);

			jQuery(ui.item).children('.elementor-navigator__item').trigger('click');

			elementor.navigator.getLayout().activateElementsMouseInteraction();
		}
	}, {
		key: 'onSortStop',
		value: function onSortStop() {
			elementor.navigator.getLayout().deactivateElementsMouseInteraction();
		}
	}, {
		key: 'onSortOver',
		value: function onSortOver(event) {
			event.stopPropagation();

			this.$el.addClass('elementor-dragging-on-child');
		}
	}, {
		key: 'onSortOut',
		value: function onSortOut(event) {
			event.stopPropagation();

			this.$el.removeClass('elementor-dragging-on-child');
		}
	}, {
		key: 'onSortUpdate',
		value: function onSortUpdate(event, ui) {
			event.stopPropagation();

			if (!this.ui.elements.is(ui.item.parent())) {
				return;
			}

			this.model.trigger('request:sort:update', ui);
		}
	}, {
		key: 'onSortReceive',
		value: function onSortReceive(event, ui) {
			this.model.trigger('request:sort:receive', event, ui);
		}
	}, {
		key: 'onMouseEnter',
		value: function onMouseEnter(event) {
			var _this3 = this;

			event.stopPropagation();

			var dragShouldBeIgnored = this.recursiveChildAgreement('dragShouldBeIgnored', elementor.channels.data.request('dragging:model'));

			if (dragShouldBeIgnored) {
				return;
			}

			this.autoExpandTimeout = setTimeout(function () {
				_this3.toggleList(true, function () {
					_this3.ui.elements.sortable('refreshPositions');
				});
			}, 500);
		}
	}, {
		key: 'onMouseLeave',
		value: function onMouseLeave(event) {
			event.stopPropagation();

			clearTimeout(this.autoExpandTimeout);
		}
	}, {
		key: 'onContextMenu',
		value: function onContextMenu(event) {
			this.model.trigger('request:contextmenu', event);
		}
	}, {
		key: 'onEditRequest',
		value: function onEditRequest() {
			this.recursiveParentInvoke('toggleList', true);

			elementor.navigator.getLayout().elements.currentView.recursiveChildInvoke('removeEditingClass');

			this.addEditingClass();

			elementor.helpers.scrollToView(this.$el, 400, elementor.navigator.getLayout().elements.$el);
		}
	}]);

	return _class;
}(Marionette.CompositeView);

exports.default = _class;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Marionette$ItemView) {
	_inherits(_class, _Marionette$ItemView);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
	}

	_createClass(_class, [{
		key: 'getTemplate',
		value: function getTemplate() {
			return '#tmpl-elementor-navigator__elements--empty';
		}
	}, {
		key: 'className',
		value: function className() {
			return 'elementor-empty-view';
		}
	}, {
		key: 'onRendr',
		value: function onRendr() {
			this.$el.css('padding-' + (elementor.config.is_rtl ? 'right' : 'left'), this.getOption('indent'));
		}
	}]);

	return _class;
}(Marionette.ItemView);

exports.default = _class;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Marionette$ItemView) {
	_inherits(_class, _Marionette$ItemView);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
	}

	_createClass(_class, [{
		key: 'getTemplate',
		value: function getTemplate() {
			return '#tmpl-elementor-navigator__root--empty';
		}
	}, {
		key: 'className',
		value: function className() {
			return 'elementor-nerd-box';
		}
	}]);

	return _class;
}(Marionette.ItemView);

exports.default = _class;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var helpers;

helpers = {
	_enqueuedFonts: [],

	elementsHierarchy: {
		section: {
			column: {
				widget: null,
				section: null
			}
		}
	},

	enqueueFont: function enqueueFont(font) {
		if (-1 !== this._enqueuedFonts.indexOf(font)) {
			return;
		}

		var fontType = elementor.config.controls.font.options[font],
		    fontUrl,
		    subsets = {
			'ru_RU': 'cyrillic',
			'uk': 'cyrillic',
			'bg_BG': 'cyrillic',
			'vi': 'vietnamese',
			'el': 'greek',
			'he_IL': 'hebrew'
		};

		switch (fontType) {
			case 'googlefonts':
				fontUrl = 'https://fonts.googleapis.com/css?family=' + font + ':100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic';

				if (subsets[elementor.config.locale]) {
					fontUrl += '&subset=' + subsets[elementor.config.locale];
				}

				break;

			case 'earlyaccess':
				var fontLowerString = font.replace(/\s+/g, '').toLowerCase();
				fontUrl = 'https://fonts.googleapis.com/earlyaccess/' + fontLowerString + '.css';
				break;
		}

		if (!_.isEmpty(fontUrl)) {
			elementor.$previewContents.find('link:last').after('<link href="' + fontUrl + '" rel="stylesheet" type="text/css">');
		}

		this._enqueuedFonts.push(font);

		elementor.channels.editor.trigger('font:insertion', fontType, font);
	},

	resetEnqueuedFontsCache: function resetEnqueuedFontsCache() {
		this._enqueuedFonts = [];
	},

	getElementChildType: function getElementChildType(elementType, container) {
		if (!container) {
			container = this.elementsHierarchy;
		}

		if (undefined !== container[elementType]) {

			if (jQuery.isPlainObject(container[elementType])) {
				return Object.keys(container[elementType]);
			}

			return null;
		}

		for (var type in container) {

			if (!container.hasOwnProperty(type)) {
				continue;
			}

			if (!jQuery.isPlainObject(container[type])) {
				continue;
			}

			var result = this.getElementChildType(elementType, container[type]);

			if (result) {
				return result;
			}
		}

		return null;
	},

	getUniqueID: function getUniqueID() {
		return Math.random().toString(16).substr(2, 7);
	},

	/*
  * @deprecated 2.0.0
  */
	stringReplaceAll: function stringReplaceAll(string, replaces) {
		var re = new RegExp(Object.keys(replaces).join('|'), 'gi');

		return string.replace(re, function (matched) {
			return replaces[matched];
		});
	},

	isActiveControl: function isActiveControl(controlModel, values) {
		var condition, conditions;

		// TODO: Better way to get this?
		if (_.isFunction(controlModel.get)) {
			condition = controlModel.get('condition');
			conditions = controlModel.get('conditions');
		} else {
			condition = controlModel.condition;
			conditions = controlModel.conditions;
		}

		// Multiple conditions with relations.
		if (conditions) {
			return elementor.conditions.check(conditions, values);
		}

		if (_.isEmpty(condition)) {
			return true;
		}

		var hasFields = _.filter(condition, function (conditionValue, conditionName) {
			var conditionNameParts = conditionName.match(/([a-z_0-9]+)(?:\[([a-z_]+)])?(!?)$/i),
			    conditionRealName = conditionNameParts[1],
			    conditionSubKey = conditionNameParts[2],
			    isNegativeCondition = !!conditionNameParts[3],
			    controlValue = values[conditionRealName];

			if (values.__dynamic__ && values.__dynamic__[conditionRealName]) {
				controlValue = values.__dynamic__[conditionRealName];
			}

			if (undefined === controlValue) {
				return true;
			}

			if (conditionSubKey && 'object' === (typeof controlValue === 'undefined' ? 'undefined' : _typeof(controlValue))) {
				controlValue = controlValue[conditionSubKey];
			}

			// If it's a non empty array - check if the conditionValue contains the controlValue,
			// If the controlValue is a non empty array - check if the controlValue contains the conditionValue
			// otherwise check if they are equal. ( and give the ability to check if the value is an empty array )
			var isContains;

			if (_.isArray(conditionValue) && !_.isEmpty(conditionValue)) {
				isContains = _.contains(conditionValue, controlValue);
			} else if (_.isArray(controlValue) && !_.isEmpty(controlValue)) {
				isContains = _.contains(controlValue, conditionValue);
			} else {
				isContains = _.isEqual(conditionValue, controlValue);
			}

			return isNegativeCondition ? isContains : !isContains;
		});

		return _.isEmpty(hasFields);
	},

	cloneObject: function cloneObject(object) {
		return JSON.parse(JSON.stringify(object));
	},

	firstLetterUppercase: function firstLetterUppercase(string) {
		return string[0].toUpperCase() + string.slice(1);
	},

	disableElementEvents: function disableElementEvents($element) {
		$element.each(function () {
			var currentPointerEvents = this.style.pointerEvents;

			if ('none' === currentPointerEvents) {
				return;
			}

			jQuery(this).data('backup-pointer-events', currentPointerEvents).css('pointer-events', 'none');
		});
	},

	enableElementEvents: function enableElementEvents($element) {
		$element.each(function () {
			var $this = jQuery(this),
			    backupPointerEvents = $this.data('backup-pointer-events');

			if (undefined === backupPointerEvents) {
				return;
			}

			$this.removeData('backup-pointer-events').css('pointer-events', backupPointerEvents);
		});
	},

	getColorPickerPaletteIndex: function getColorPickerPaletteIndex(paletteKey) {
		return ['7', '8', '1', '5', '2', '3', '6', '4'].indexOf(paletteKey);
	},

	wpColorPicker: function wpColorPicker($element, options) {
		var self = this,
		    colorPickerScheme = elementor.schemes.getScheme('color-picker'),
		    items = _.sortBy(colorPickerScheme.items, function (item) {
			return self.getColorPickerPaletteIndex(item.key);
		}),
		    defaultOptions = {
			width: window.innerWidth >= 1440 ? 271 : 251,
			palettes: _.pluck(items, 'value')
		};

		if (options) {
			_.extend(defaultOptions, options);
		}

		return $element.wpColorPicker(defaultOptions);
	},

	isInViewport: function isInViewport(element, html) {
		var rect = element.getBoundingClientRect();
		html = html || document.documentElement;
		return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || html.clientHeight) && rect.right <= (window.innerWidth || html.clientWidth);
	},

	scrollToView: function scrollToView($element, timeout, $parent) {
		if (undefined === timeout) {
			timeout = 500;
		}

		var $scrolled = $parent,
		    $elementorFrontendWindow = elementorFrontend.getElements('$window');

		if (!$parent) {
			$parent = $elementorFrontendWindow;

			$scrolled = elementor.$previewContents.find('html, body');
		}

		setTimeout(function () {
			var parentHeight = $parent.height(),
			    parentScrollTop = $parent.scrollTop(),
			    elementTop = $parent === $elementorFrontendWindow ? $element.offset().top : $element[0].offsetTop,
			    topToCheck = elementTop - parentScrollTop;

			if (topToCheck > 0 && topToCheck < parentHeight) {
				return;
			}

			var scrolling = elementTop - parentHeight / 2;

			$scrolled.stop(true).animate({ scrollTop: scrolling }, 1000);
		}, timeout);
	},

	getElementInlineStyle: function getElementInlineStyle($element, properties) {
		var style = {},
		    elementStyle = $element[0].style;

		properties.forEach(function (property) {
			style[property] = undefined !== elementStyle[property] ? elementStyle[property] : '';
		});

		return style;
	},

	cssWithBackup: function cssWithBackup($element, backupState, rules) {
		var cssBackup = this.getElementInlineStyle($element, Object.keys(rules));

		$element.data('css-backup-' + backupState, cssBackup).css(rules);
	},

	recoverCSSBackup: function recoverCSSBackup($element, backupState) {
		var backupKey = 'css-backup-' + backupState;

		$element.css($element.data(backupKey));

		$element.removeData(backupKey);
	},

	compareVersions: function compareVersions(versionA, versionB, operator) {
		var prepareVersion = function prepareVersion(version) {
			version = version + '';

			return version.replace(/[^\d.]+/, '.-1.');
		};

		versionA = prepareVersion(versionA);
		versionB = prepareVersion(versionB);

		if (versionA === versionB) {
			return !operator || /^={2,3}$/.test(operator);
		}

		var versionAParts = versionA.split('.').map(Number),
		    versionBParts = versionB.split('.').map(Number),
		    longestVersionParts = Math.max(versionAParts.length, versionBParts.length);

		for (var i = 0; i < longestVersionParts; i++) {
			var valueA = versionAParts[i] || 0,
			    valueB = versionBParts[i] || 0;

			if (valueA !== valueB) {
				return this.conditions.compare(valueA, valueB, operator);
			}
		}
	}
};

module.exports = helpers;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ImagesManager;

ImagesManager = function ImagesManager() {
	var self = this;

	var cache = {};

	var debounceDelay = 300;

	var registeredItems = [];

	var getNormalizedSize = function getNormalizedSize(image) {
		var size,
		    imageSize = image.size;

		if ('custom' === imageSize) {
			var customDimension = image.dimension;

			if (customDimension.width || customDimension.height) {
				size = 'custom_' + customDimension.width + 'x' + customDimension.height;
			} else {
				return 'full';
			}
		} else {
			size = imageSize;
		}

		return size;
	};

	self.onceTriggerChange = _.once(function (model) {
		setTimeout(function () {
			model.get('settings').trigger('change', model.get('settings'));
		}, 700);
	});

	self.getImageUrl = function (image) {
		// Register for AJAX checking
		self.registerItem(image);

		var imageUrl = self.getItem(image);

		// If it's not in cache, like a new dropped widget or a custom size - get from settings
		if (!imageUrl) {

			if ('custom' === image.size) {

				if (elementor.getPanelView() && 'editor' === elementor.getPanelView().getCurrentPageName() && image.model) {
					// Trigger change again, so it's will load from the cache
					self.onceTriggerChange(image.model);
				}

				return;
			}

			// If it's a new dropped widget
			imageUrl = image.url;
		}

		return imageUrl;
	};

	self.getItem = function (image) {
		var size = getNormalizedSize(image),
		    id = image.id;

		if (!size) {
			return false;
		}

		if (cache[id] && cache[id][size]) {
			return cache[id][size];
		}

		return false;
	};

	self.registerItem = function (image) {
		if ('' === image.id) {
			// It's a new dropped widget
			return;
		}

		if (self.getItem(image)) {
			// It's already in cache
			return;
		}

		registeredItems.push(image);

		self.debounceGetRemoteItems();
	};

	self.getRemoteItems = function () {
		var requestedItems = [],
		    registeredItemsLength = Object.keys(registeredItems).length,
		    image,
		    index;

		// It's one item, so we can render it from remote server
		if (0 === registeredItemsLength) {
			return;
		} else if (1 === registeredItemsLength) {
			image = registeredItems[Object.keys(registeredItems)[0]];

			if (image && image.model) {
				image.model.renderRemoteServer();
				return;
			}
		}

		for (index in registeredItems) {
			image = registeredItems[index];

			var size = getNormalizedSize(image),
			    id = image.id,
			    isFirstTime = !cache[id] || 0 === Object.keys(cache[id]).length;

			requestedItems.push({
				id: id,
				size: size,
				is_first_time: isFirstTime
			});
		}

		elementor.ajax.send('get_images_details', {
			data: {
				items: requestedItems
			},
			success: function success(data) {
				var id, size;

				for (id in data) {
					if (!cache[id]) {
						cache[id] = {};
					}

					for (size in data[id]) {
						cache[id][size] = data[id][size];
					}
				}
				registeredItems = [];
			}
		});
	};

	self.debounceGetRemoteItems = _.debounce(self.getRemoteItems, debounceDelay);
};

module.exports = new ImagesManager();

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Debug = function Debug() {
	var self = this,
	    errorStack = [],
	    settings = {},
	    elements = {};

	var initSettings = function initSettings() {
		settings = {
			debounceDelay: 500,
			urlsToWatch: ['elementor/assets']
		};
	};

	var initElements = function initElements() {
		elements.$window = jQuery(window);
	};

	var onError = function onError(event) {
		var originalEvent = event.originalEvent,
		    error = originalEvent.error;

		if (!error) {
			return;
		}

		var isInWatchList = false,
		    urlsToWatch = settings.urlsToWatch;

		jQuery.each(urlsToWatch, function () {
			if (-1 !== error.stack.indexOf(this)) {
				isInWatchList = true;

				return false;
			}
		});

		if (!isInWatchList) {
			return;
		}

		self.addError({
			type: error.name,
			message: error.message,
			url: originalEvent.filename,
			line: originalEvent.lineno,
			column: originalEvent.colno
		});
	};

	var bindEvents = function bindEvents() {
		elements.$window.on('error', onError);
	};

	var init = function init() {
		initSettings();

		initElements();

		bindEvents();

		self.sendErrors = _.debounce(self.sendErrors, settings.debounceDelay);
	};

	this.addURLToWatch = function (url) {
		settings.urlsToWatch.push(url);
	};

	this.addCustomError = function (error, category, tag) {
		var errorInfo = {
			type: error.name,
			message: error.message,
			url: error.fileName || error.sourceURL,
			line: error.lineNumber || error.line,
			column: error.columnNumber || error.column,
			customFields: {
				category: category || 'general',
				tag: tag
			}
		};

		if (!errorInfo.url) {
			var stackInfo = error.stack.match(/\n {4}at (.*?(?=:(\d+):(\d+)))/);

			if (stackInfo) {
				errorInfo.url = stackInfo[1];
				errorInfo.line = stackInfo[2];
				errorInfo.column = stackInfo[3];
			}
		}

		this.addError(errorInfo);
	};

	this.addError = function (errorParams) {
		var defaultParams = {
			type: 'Error',
			timestamp: Math.floor(new Date().getTime() / 1000),
			message: null,
			url: null,
			line: null,
			column: null,
			customFields: {}
		};

		errorStack.push(jQuery.extend(true, defaultParams, errorParams));

		self.sendErrors();
	};

	this.sendErrors = function () {
		// Avoid recursions on errors in ajax
		elements.$window.off('error', onError);

		jQuery.ajax({
			url: ElementorConfig.ajaxurl,
			method: 'POST',
			data: {
				action: 'elementor_debug_log',
				data: errorStack
			},
			success: function success() {
				errorStack = [];

				// Restore error handler
				elements.$window.on('error', onError);
			}
		});
	};

	init();
};

module.exports = new Debug();

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Schemes,
    Stylesheet = __webpack_require__(24),
    ControlsCSSParser = __webpack_require__(13);

Schemes = function Schemes() {
	var self = this,
	    stylesheet = new Stylesheet(),
	    schemes = {},
	    settings = {
		selectorWrapperPrefix: '.elementor-widget-'
	},
	    elements = {};

	var buildUI = function buildUI() {
		elements.$previewHead.append(elements.$style);
	};

	var initElements = function initElements() {
		elements.$style = jQuery('<style>', {
			id: 'elementor-style-scheme'
		});

		elements.$previewHead = elementor.$previewContents.find('head');
	};

	var initSchemes = function initSchemes() {
		schemes = elementor.helpers.cloneObject(elementor.config.schemes.items);
	};

	var fetchControlStyles = function fetchControlStyles(control, controlsStack, widgetType) {
		ControlsCSSParser.addControlStyleRules(stylesheet, control, controlsStack, function (control) {
			return self.getSchemeValue(control.scheme.type, control.scheme.value, control.scheme.key).value;
		}, ['{{WRAPPER}}'], [settings.selectorWrapperPrefix + widgetType]);
	};

	var fetchWidgetControlsStyles = function fetchWidgetControlsStyles(widget) {
		var widgetSchemeControls = self.getWidgetSchemeControls(widget);

		_.each(widgetSchemeControls, function (control) {
			fetchControlStyles(control, widgetSchemeControls, widget.widget_type);
		});
	};

	var fetchAllWidgetsSchemesStyle = function fetchAllWidgetsSchemesStyle() {
		_.each(elementor.config.widgets, function (widget) {
			fetchWidgetControlsStyles(widget);
		});
	};

	this.init = function () {
		initElements();
		buildUI();
		initSchemes();

		return self;
	};

	this.getWidgetSchemeControls = function (widget) {
		return _.filter(widget.controls, function (control) {
			return _.isObject(control.scheme);
		});
	};

	this.getSchemes = function () {
		return schemes;
	};

	this.getEnabledSchemesTypes = function () {
		return elementor.config.schemes.enabled_schemes;
	};

	this.getScheme = function (schemeType) {
		return schemes[schemeType];
	};

	this.getSchemeValue = function (schemeType, value, key) {
		if (this.getEnabledSchemesTypes().indexOf(schemeType) < 0) {
			return false;
		}

		var scheme = self.getScheme(schemeType),
		    schemeValue = scheme.items[value];

		if (key && _.isObject(schemeValue)) {
			var clonedSchemeValue = elementor.helpers.cloneObject(schemeValue);

			clonedSchemeValue.value = schemeValue.value[key];

			return clonedSchemeValue;
		}

		return schemeValue;
	};

	this.printSchemesStyle = function () {
		stylesheet.empty();

		fetchAllWidgetsSchemesStyle();

		elements.$style.text(stylesheet);
	};

	this.resetSchemes = function (schemeName) {
		schemes[schemeName] = elementor.helpers.cloneObject(elementor.config.schemes.items[schemeName]);
	};

	this.saveScheme = function (schemeName) {
		elementor.config.schemes.items[schemeName].items = elementor.helpers.cloneObject(schemes[schemeName].items);

		var itemsToSave = {};

		_.each(schemes[schemeName].items, function (item, key) {
			itemsToSave[key] = item.value;
		});

		NProgress.start();

		elementor.ajax.send('apply_scheme', {
			data: {
				scheme_name: schemeName,
				data: JSON.stringify(itemsToSave)
			},
			success: function success() {
				NProgress.done();
			}
		});
	};

	this.setSchemeValue = function (schemeName, itemKey, value) {
		schemes[schemeName].items[itemKey].value = value;
	};
};

module.exports = new Schemes();

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var presetsFactory;

presetsFactory = {

	getPresetsDictionary: function getPresetsDictionary() {
		return {
			11: 100 / 9,
			12: 100 / 8,
			14: 100 / 7,
			16: 100 / 6,
			33: 100 / 3,
			66: 2 / 3 * 100,
			83: 5 / 6 * 100
		};
	},

	getAbsolutePresetValues: function getAbsolutePresetValues(preset) {
		var clonedPreset = elementor.helpers.cloneObject(preset),
		    presetDictionary = this.getPresetsDictionary();

		_.each(clonedPreset, function (unitValue, unitIndex) {
			if (presetDictionary[unitValue]) {
				clonedPreset[unitIndex] = presetDictionary[unitValue];
			}
		});

		return clonedPreset;
	},

	getPresets: function getPresets(columnsCount, presetIndex) {
		var presets = elementor.helpers.cloneObject(elementor.config.elements.section.presets);

		if (columnsCount) {
			presets = presets[columnsCount];
		}

		if (presetIndex) {
			presets = presets[presetIndex];
		}

		return presets;
	},

	getPresetByStructure: function getPresetByStructure(structure) {
		var parsedStructure = this.getParsedStructure(structure);

		return this.getPresets(parsedStructure.columnsCount, parsedStructure.presetIndex);
	},

	getParsedStructure: function getParsedStructure(structure) {
		structure += ''; // Make sure this is a string

		return {
			columnsCount: structure.slice(0, -1),
			presetIndex: structure.substr(-1)
		};
	},

	getPresetSVG: function getPresetSVG(preset, svgWidth, svgHeight, separatorWidth) {
		svgWidth = svgWidth || 100;
		svgHeight = svgHeight || 50;
		separatorWidth = separatorWidth || 2;

		var absolutePresetValues = this.getAbsolutePresetValues(preset),
		    presetSVGPath = this._generatePresetSVGPath(absolutePresetValues, svgWidth, svgHeight, separatorWidth);

		return this._createSVGPreset(presetSVGPath, svgWidth, svgHeight);
	},

	_createSVGPreset: function _createSVGPreset(presetPath, svgWidth, svgHeight) {
		var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

		svg.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
		svg.setAttribute('viewBox', '0 0 ' + svgWidth + ' ' + svgHeight);

		var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

		path.setAttribute('d', presetPath);

		svg.appendChild(path);

		return svg;
	},

	_generatePresetSVGPath: function _generatePresetSVGPath(preset, svgWidth, svgHeight, separatorWidth) {
		var DRAW_SIZE = svgWidth - separatorWidth * (preset.length - 1);

		var xPointer = 0,
		    dOutput = '';

		for (var i = 0; i < preset.length; i++) {
			if (i) {
				dOutput += ' ';
			}

			var increment = preset[i] / 100 * DRAW_SIZE;

			xPointer += increment;

			dOutput += 'M' + +xPointer.toFixed(4) + ',0';

			dOutput += 'V' + svgHeight;

			dOutput += 'H' + +(xPointer - increment).toFixed(4);

			dOutput += 'V0Z';

			xPointer += separatorWidth;
		}

		return dOutput;
	}
};

module.exports = presetsFactory;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var TemplateLibraryLayoutView = __webpack_require__(61),
    TemplateLibraryCollection = __webpack_require__(73),
    TemplateLibraryManager;

TemplateLibraryManager = function TemplateLibraryManager() {
	var self = this,
	    deleteDialog,
	    errorDialog,
	    layout,
	    config = {},
	    startIntent = {},
	    templateTypes = {},
	    filterTerms = {},
	    templatesCollection;

	var initLayout = function initLayout() {
		layout = new TemplateLibraryLayoutView();
	};

	var registerDefaultTemplateTypes = function registerDefaultTemplateTypes() {
		var data = {
			saveDialog: {
				description: elementor.translate('save_your_template_description')
			},
			ajaxParams: {
				success: function success(data) {
					self.getTemplatesCollection().add(data);

					self.setTemplatesPage('local');
				},
				error: function error(data) {
					self.showErrorDialog(data);
				}
			}
		};

		_.each(['page', 'section'], function (type) {
			var safeData = jQuery.extend(true, {}, data, {
				saveDialog: {
					title: elementor.translate('save_your_template', [elementor.translate(type)])
				}
			});

			self.registerTemplateType(type, safeData);
		});
	};

	var registerDefaultFilterTerms = function registerDefaultFilterTerms() {
		filterTerms = {
			text: {
				callback: function callback(value) {
					value = value.toLowerCase();

					if (this.get('title').toLowerCase().indexOf(value) >= 0) {
						return true;
					}

					return _.any(this.get('tags'), function (tag) {
						return tag.toLowerCase().indexOf(value) >= 0;
					});
				}
			},
			type: {},
			subtype: {},
			favorite: {}
		};
	};

	var setIntentFilters = function setIntentFilters() {
		jQuery.each(startIntent.filters, function (filterKey, filterValue) {
			self.setFilter(filterKey, filterValue, true);
		});
	};

	this.init = function () {
		registerDefaultTemplateTypes();

		registerDefaultFilterTerms();

		elementor.addBackgroundClickListener('libraryToggleMore', {
			element: '.elementor-template-library-template-more'
		});
	};

	this.getTemplateTypes = function (type) {
		if (type) {
			return templateTypes[type];
		}

		return templateTypes;
	};

	this.registerTemplateType = function (type, data) {
		templateTypes[type] = data;
	};

	this.deleteTemplate = function (templateModel, options) {
		var dialog = self.getDeleteDialog();

		dialog.onConfirm = function () {
			if (options.onConfirm) {
				options.onConfirm();
			}

			elementor.ajax.send('delete_template', {
				data: {
					source: templateModel.get('source'),
					template_id: templateModel.get('template_id')
				},
				success: function success(response) {
					templatesCollection.remove(templateModel, { silent: true });

					if (options.onSuccess) {
						options.onSuccess(response);
					}
				}
			});
		};

		dialog.show();
	};

	this.importTemplate = function (templateModel, options) {
		options = options || {};

		layout.showLoadingView();

		self.requestTemplateContent(templateModel.get('source'), templateModel.get('template_id'), {
			data: {
				page_settings: options.withPageSettings
			},
			success: function success(data) {
				self.closeModal();

				elementor.channels.data.trigger('template:before:insert', templateModel);

				elementor.getPreviewView().addChildModel(data.content, startIntent.importOptions || {});

				elementor.channels.data.trigger('template:after:insert', templateModel);

				if (options.withPageSettings) {
					elementor.settings.page.model.set(data.page_settings);
				}
			},
			error: function error(data) {
				self.showErrorDialog(data);
			},
			complete: function complete() {
				layout.hideLoadingView();
			}
		});
	};

	this.saveTemplate = function (type, data) {
		var templateType = templateTypes[type];

		_.extend(data, {
			source: 'local',
			type: type
		});

		if (templateType.prepareSavedData) {
			data = templateType.prepareSavedData(data);
		}

		data.content = JSON.stringify(data.content);

		var ajaxParams = { data: data };

		if (templateType.ajaxParams) {
			_.extend(ajaxParams, templateType.ajaxParams);
		}

		elementor.ajax.send('save_template', ajaxParams);
	};

	this.requestTemplateContent = function (source, id, ajaxOptions) {
		var options = {
			data: {
				source: source,
				edit_mode: true,
				display: true,
				template_id: id
			}
		};

		if (ajaxOptions) {
			jQuery.extend(true, options, ajaxOptions);
		}

		return elementor.ajax.send('get_template_data', options);
	};

	this.markAsFavorite = function (templateModel, favorite) {
		var options = {
			data: {
				source: templateModel.get('source'),
				template_id: templateModel.get('template_id'),
				favorite: favorite
			}
		};

		return elementor.ajax.send('mark_template_as_favorite', options);
	};

	this.getDeleteDialog = function () {
		if (!deleteDialog) {
			deleteDialog = elementor.dialogsManager.createWidget('confirm', {
				id: 'elementor-template-library-delete-dialog',
				headerMessage: elementor.translate('delete_template'),
				message: elementor.translate('delete_template_confirm'),
				strings: {
					confirm: elementor.translate('delete')
				}
			});
		}

		return deleteDialog;
	};

	this.getErrorDialog = function () {
		if (!errorDialog) {
			errorDialog = elementor.dialogsManager.createWidget('alert', {
				id: 'elementor-template-library-error-dialog',
				headerMessage: elementor.translate('an_error_occurred')
			});
		}

		return errorDialog;
	};

	this.getLayout = function () {
		return layout;
	};

	this.getTemplatesCollection = function () {
		return templatesCollection;
	};

	this.getConfig = function (item) {
		if (item) {
			return config[item];
		}

		return config;
	};

	this.requestLibraryData = function (options) {
		if (templatesCollection && !options.forceUpdate) {
			if (options.onUpdate) {
				options.onUpdate();
			}

			return;
		}

		if (options.onBeforeUpdate) {
			options.onBeforeUpdate();
		}

		var ajaxOptions = {
			data: {},
			success: function success(data) {
				templatesCollection = new TemplateLibraryCollection(data.templates);

				config = data.config;

				if (options.onUpdate) {
					options.onUpdate();
				}
			}
		};

		if (options.forceSync) {
			ajaxOptions.data.sync = true;
		}

		elementor.ajax.send('get_library_data', ajaxOptions);
	};

	this.startModal = function (customStartIntent) {
		if (!layout) {
			initLayout();
		}

		layout.showModal();

		self.requestLibraryData({
			onBeforeUpdate: layout.showLoadingView.bind(layout),
			onUpdate: function onUpdate() {
				var documentType = elementor.config.document.remote_type,
				    isBlockType = -1 !== config.categories.indexOf(documentType),
				    oldStartIntent = Object.create(startIntent);

				startIntent = jQuery.extend({
					filters: {
						source: 'remote',
						type: isBlockType ? 'block' : 'page',
						subtype: isBlockType ? documentType : null
					},
					onReady: self.showTemplates
				}, customStartIntent);

				var isSameIntent = _.isEqual(Object.getPrototypeOf(oldStartIntent), startIntent);

				if (isSameIntent && 'elementor-template-library-templates' === layout.modalContent.currentView.id) {
					return;
				}

				layout.hideLoadingView();

				setIntentFilters();

				startIntent.onReady();
			}
		});
	};

	this.closeModal = function () {
		layout.hideModal();
	};

	this.getFilter = function (name) {
		return elementor.channels.templates.request('filter:' + name);
	};

	this.setFilter = function (name, value, silent) {
		elementor.channels.templates.reply('filter:' + name, value);

		if (!silent) {
			elementor.channels.templates.trigger('filter:change');
		}
	};

	this.getFilterTerms = function (termName) {
		if (termName) {
			return filterTerms[termName];
		}

		return filterTerms;
	};

	this.setTemplatesPage = function (source, type, silent) {
		elementor.channels.templates.stopReplying();

		self.setFilter('source', source, true);

		if (type) {
			self.setFilter('type', type, true);
		}

		if (!silent) {
			self.showTemplates();
		}
	};

	this.showTemplates = function () {
		var activeSource = self.getFilter('source');

		var templatesToShow = templatesCollection.filter(function (model) {
			if (activeSource !== model.get('source')) {
				return false;
			}

			var typeInfo = templateTypes[model.get('type')];

			return !typeInfo || false !== typeInfo.showInLibrary;
		});

		layout.showTemplatesView(new TemplateLibraryCollection(templatesToShow));
	};

	this.showErrorDialog = function (errorMessage) {
		if ('object' === (typeof errorMessage === 'undefined' ? 'undefined' : _typeof(errorMessage))) {
			var message = '';

			_.each(errorMessage, function (error) {
				message += '<div>' + error.message + '.</div>';
			});

			errorMessage = message;
		} else if (errorMessage) {
			errorMessage += '.';
		} else {
			errorMessage = '<i>&#60;The error message is empty&#62;</i>';
		}

		self.getErrorDialog().setMessage(elementor.translate('templates_request_error') + '<div id="elementor-template-library-error-info">' + errorMessage + '</div>').show();
	};
};

module.exports = new TemplateLibraryManager();

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BaseModalLayout = __webpack_require__(8),
    TemplateLibraryHeaderActionsView = __webpack_require__(62),
    TemplateLibraryHeaderMenuView = __webpack_require__(63),
    TemplateLibraryHeaderPreviewView = __webpack_require__(64),
    TemplateLibraryHeaderBackView = __webpack_require__(65),
    TemplateLibraryCollectionView = __webpack_require__(66),
    TemplateLibrarySaveTemplateView = __webpack_require__(70),
    TemplateLibraryImportView = __webpack_require__(71),
    TemplateLibraryPreviewView = __webpack_require__(72);

module.exports = BaseModalLayout.extend({

	getModalOptions: function getModalOptions() {
		return {
			id: 'elementor-template-library-modal'
		};
	},

	getLogoOptions: function getLogoOptions() {
		return {
			title: elementor.translate('library'),
			click: function click() {
				elementor.templates.setTemplatesPage('remote', 'page');
			}
		};
	},

	getTemplateActionButton: function getTemplateActionButton(templateData) {
		var viewId = '#tmpl-elementor-template-library-' + (templateData.isPro ? 'get-pro-button' : 'insert-button');

		viewId = elementor.hooks.applyFilters('elementor/editor/template-library/template/action-button', viewId, templateData);

		var template = Marionette.TemplateCache.get(viewId);

		return Marionette.Renderer.render(template);
	},

	setHeaderDefaultParts: function setHeaderDefaultParts() {
		var headerView = this.getHeaderView();

		headerView.tools.show(new TemplateLibraryHeaderActionsView());
		headerView.menuArea.show(new TemplateLibraryHeaderMenuView());

		this.showLogo();
	},

	showTemplatesView: function showTemplatesView(templatesCollection) {
		this.modalContent.show(new TemplateLibraryCollectionView({
			collection: templatesCollection
		}));

		this.setHeaderDefaultParts();
	},

	showImportView: function showImportView() {
		this.getHeaderView().menuArea.reset();

		this.modalContent.show(new TemplateLibraryImportView());
	},

	showSaveTemplateView: function showSaveTemplateView(elementModel) {
		this.getHeaderView().menuArea.reset();

		this.modalContent.show(new TemplateLibrarySaveTemplateView({ model: elementModel }));
	},

	showPreviewView: function showPreviewView(templateModel) {
		this.modalContent.show(new TemplateLibraryPreviewView({
			url: templateModel.get('url')
		}));

		var headerView = this.getHeaderView();

		headerView.menuArea.reset();

		headerView.tools.show(new TemplateLibraryHeaderPreviewView({
			model: templateModel
		}));

		headerView.logoArea.show(new TemplateLibraryHeaderBackView());
	}
});

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Marionette.ItemView.extend({
	template: '#tmpl-elementor-template-library-header-actions',

	id: 'elementor-template-library-header-actions',

	ui: {
		'import': '#elementor-template-library-header-import i',
		sync: '#elementor-template-library-header-sync i',
		save: '#elementor-template-library-header-save i'
	},

	events: {
		'click @ui.import': 'onImportClick',
		'click @ui.sync': 'onSyncClick',
		'click @ui.save': 'onSaveClick'
	},

	onImportClick: function onImportClick() {
		elementor.templates.getLayout().showImportView();
	},

	onSyncClick: function onSyncClick() {
		var self = this;

		self.ui.sync.addClass('eicon-animation-spin');

		elementor.templates.requestLibraryData({
			onUpdate: function onUpdate() {
				self.ui.sync.removeClass('eicon-animation-spin');

				elementor.templates.setTemplatesPage(elementor.templates.getFilter('source'), elementor.templates.getFilter('type'));
			},
			forceUpdate: true,
			forceSync: true
		});
	},

	onSaveClick: function onSaveClick() {
		elementor.templates.getLayout().showSaveTemplateView();
	}
});

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Marionette.ItemView.extend({
	options: {
		activeClass: 'elementor-active'
	},

	template: '#tmpl-elementor-template-library-header-menu',

	id: 'elementor-template-library-header-menu',

	ui: {
		menuItems: '.elementor-template-library-menu-item'
	},

	events: {
		'click @ui.menuItems': 'onMenuItemClick'
	},

	$activeItem: null,

	activateMenuItem: function activateMenuItem($item) {
		var activeClass = this.getOption('activeClass');

		if (this.$activeItem === $item) {
			return;
		}

		if (this.$activeItem) {
			this.$activeItem.removeClass(activeClass);
		}

		$item.addClass(activeClass);

		this.$activeItem = $item;
	},

	onRender: function onRender() {
		var currentSource = elementor.templates.getFilter('source'),
		    $sourceItem = this.ui.menuItems.filter('[data-template-source="' + currentSource + '"]');

		if ('remote' === currentSource) {
			$sourceItem = $sourceItem.filter('[data-template-type="' + elementor.templates.getFilter('type') + '"]');
		}

		this.activateMenuItem($sourceItem);
	},

	onMenuItemClick: function onMenuItemClick(event) {
		var item = event.currentTarget,
		    itemData = item.dataset;

		this.activateMenuItem(jQuery(item));

		elementor.templates.setTemplatesPage(item.dataset.templateSource, itemData.templateType);
	}
});

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TemplateLibraryInsertTemplateBehavior = __webpack_require__(25);

module.exports = Marionette.ItemView.extend({
	template: '#tmpl-elementor-template-library-header-preview',

	id: 'elementor-template-library-header-preview',

	behaviors: {
		insertTemplate: {
			behaviorClass: TemplateLibraryInsertTemplateBehavior
		}
	}
});

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Marionette.ItemView.extend({
	template: '#tmpl-elementor-template-library-header-back',

	id: 'elementor-template-library-header-preview-back',

	events: {
		'click': 'onClick'
	},

	onClick: function onClick() {
		elementor.templates.showTemplates();
	}
});

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TemplateLibraryTemplateLocalView = __webpack_require__(67),
    TemplateLibraryTemplateRemoteView = __webpack_require__(68),
    Masonry = __webpack_require__(16),
    TemplateLibraryCollectionView;

TemplateLibraryCollectionView = Marionette.CompositeView.extend({
	template: '#tmpl-elementor-template-library-templates',

	id: 'elementor-template-library-templates',

	childViewContainer: '#elementor-template-library-templates-container',

	reorderOnSort: true,

	emptyView: function emptyView() {
		var EmptyView = __webpack_require__(69);

		return new EmptyView();
	},

	ui: {
		textFilter: '#elementor-template-library-filter-text',
		selectFilter: '.elementor-template-library-filter-select',
		myFavoritesFilter: '#elementor-template-library-filter-my-favorites',
		orderInputs: '.elementor-template-library-order-input',
		orderLabels: '.elementor-template-library-order-label'
	},

	events: {
		'input @ui.textFilter': 'onTextFilterInput',
		'change @ui.selectFilter': 'onSelectFilterChange',
		'change @ui.myFavoritesFilter': 'onMyFavoritesFilterChange',
		'mousedown @ui.orderLabels': 'onOrderLabelsClick'
	},

	comparators: {
		title: function title(model) {
			return model.get('title').toLowerCase();
		},
		popularityIndex: function popularityIndex(model) {
			var popularityIndex = model.get('popularityIndex');

			if (!popularityIndex) {
				popularityIndex = model.get('date');
			}

			return -popularityIndex;
		},
		trendIndex: function trendIndex(model) {
			var trendIndex = model.get('trendIndex');

			if (!trendIndex) {
				trendIndex = model.get('date');
			}

			return -trendIndex;
		}
	},

	getChildView: function getChildView(childModel) {
		if ('remote' === childModel.get('source')) {
			return TemplateLibraryTemplateRemoteView;
		}

		return TemplateLibraryTemplateLocalView;
	},

	initialize: function initialize() {
		this.listenTo(elementor.channels.templates, 'filter:change', this._renderChildren);
	},

	filter: function filter(childModel) {
		var filterTerms = elementor.templates.getFilterTerms(),
		    passingFilter = true;

		jQuery.each(filterTerms, function (filterTermName) {
			var filterValue = elementor.templates.getFilter(filterTermName);

			if (!filterValue) {
				return;
			}

			if (this.callback) {
				var callbackResult = this.callback.call(childModel, filterValue);

				if (!callbackResult) {
					passingFilter = false;
				}

				return callbackResult;
			}

			var filterResult = filterValue === childModel.get(filterTermName);

			if (!filterResult) {
				passingFilter = false;
			}

			return filterResult;
		});

		return passingFilter;
	},

	order: function order(by, reverseOrder) {
		var comparator = this.comparators[by] || by;

		if (reverseOrder) {
			comparator = this.reverseOrder(comparator);
		}

		this.collection.comparator = comparator;

		this.collection.sort();
	},

	reverseOrder: function reverseOrder(comparator) {
		if ('function' !== typeof comparator) {
			var comparatorValue = comparator;

			comparator = function comparator(model) {
				return model.get(comparatorValue);
			};
		}

		return function (left, right) {
			var l = comparator(left),
			    r = comparator(right);

			if (undefined === l) {
				return -1;
			}

			if (undefined === r) {
				return 1;
			}

			return l < r ? 1 : l > r ? -1 : 0;
		};
	},

	addSourceData: function addSourceData() {
		var isEmpty = this.children.isEmpty();

		this.$el.attr('data-template-source', isEmpty ? 'empty' : elementor.templates.getFilter('source'));
	},

	setFiltersUI: function setFiltersUI() {
		var $filters = this.$(this.ui.selectFilter);

		$filters.select2({
			placeholder: elementor.translate('category'),
			allowClear: true,
			width: 150
		});
	},

	setMasonrySkin: function setMasonrySkin() {
		var masonry = new Masonry({
			container: this.$childViewContainer,
			items: this.$childViewContainer.children()
		});

		this.$childViewContainer.imagesLoaded(masonry.run.bind(masonry));
	},

	toggleFilterClass: function toggleFilterClass() {
		this.$el.toggleClass('elementor-templates-filter-active', !!(elementor.templates.getFilter('text') || elementor.templates.getFilter('favorite')));
	},

	onRenderCollection: function onRenderCollection() {
		this.addSourceData();

		this.toggleFilterClass();

		if ('remote' === elementor.templates.getFilter('source') && 'block' === elementor.templates.getFilter('type')) {
			this.setFiltersUI();

			this.setMasonrySkin();
		}
	},

	onBeforeRenderEmpty: function onBeforeRenderEmpty() {
		this.addSourceData();
	},

	onTextFilterInput: function onTextFilterInput() {
		elementor.templates.setFilter('text', this.ui.textFilter.val());
	},

	onSelectFilterChange: function onSelectFilterChange(event) {
		var $select = jQuery(event.currentTarget),
		    filterName = $select.data('elementor-filter');

		elementor.templates.setFilter(filterName, $select.val());
	},

	onMyFavoritesFilterChange: function onMyFavoritesFilterChange() {
		elementor.templates.setFilter('favorite', this.ui.myFavoritesFilter[0].checked);
	},

	onOrderLabelsClick: function onOrderLabelsClick(event) {
		var $clickedInput = jQuery(event.currentTarget.control),
		    toggle;

		if (!$clickedInput[0].checked) {
			toggle = 'asc' !== $clickedInput.data('default-ordering-direction');
		}

		$clickedInput.toggleClass('elementor-template-library-order-reverse', toggle);

		this.order($clickedInput.val(), $clickedInput.hasClass('elementor-template-library-order-reverse'));
	}
});

module.exports = TemplateLibraryCollectionView;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TemplateLibraryTemplateView = __webpack_require__(26),
    TemplateLibraryTemplateLocalView;

TemplateLibraryTemplateLocalView = TemplateLibraryTemplateView.extend({
	template: '#tmpl-elementor-template-library-template-local',

	ui: function ui() {
		return _.extend(TemplateLibraryTemplateView.prototype.ui.apply(this, arguments), {
			deleteButton: '.elementor-template-library-template-delete',
			morePopup: '.elementor-template-library-template-more',
			toggleMore: '.elementor-template-library-template-more-toggle',
			toggleMoreIcon: '.elementor-template-library-template-more-toggle i'
		});
	},

	events: function events() {
		return _.extend(TemplateLibraryTemplateView.prototype.events.apply(this, arguments), {
			'click @ui.deleteButton': 'onDeleteButtonClick',
			'click @ui.toggleMore': 'onToggleMoreClick'
		});
	},

	onDeleteButtonClick: function onDeleteButtonClick() {
		var toggleMoreIcon = this.ui.toggleMoreIcon;

		elementor.templates.deleteTemplate(this.model, {
			onConfirm: function onConfirm() {
				toggleMoreIcon.removeClass('eicon-ellipsis-h').addClass('fa fa-circle-o-notch fa-spin');
			},
			onSuccess: function onSuccess() {
				elementor.templates.showTemplates();
			}
		});
	},

	onToggleMoreClick: function onToggleMoreClick() {
		this.ui.morePopup.show();
	},

	onPreviewButtonClick: function onPreviewButtonClick() {
		open(this.model.get('url'), '_blank');
	}
});

module.exports = TemplateLibraryTemplateLocalView;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TemplateLibraryTemplateView = __webpack_require__(26),
    TemplateLibraryTemplateRemoteView;

TemplateLibraryTemplateRemoteView = TemplateLibraryTemplateView.extend({
	template: '#tmpl-elementor-template-library-template-remote',

	ui: function ui() {
		return jQuery.extend(TemplateLibraryTemplateView.prototype.ui.apply(this, arguments), {
			favoriteCheckbox: '.elementor-template-library-template-favorite-input'
		});
	},

	events: function events() {
		return jQuery.extend(TemplateLibraryTemplateView.prototype.events.apply(this, arguments), {
			'change @ui.favoriteCheckbox': 'onFavoriteCheckboxChange'
		});
	},

	onPreviewButtonClick: function onPreviewButtonClick() {
		elementor.templates.getLayout().showPreviewView(this.model);
	},

	onFavoriteCheckboxChange: function onFavoriteCheckboxChange() {
		var isFavorite = this.ui.favoriteCheckbox[0].checked;

		this.model.set('favorite', isFavorite);

		elementor.templates.markAsFavorite(this.model, isFavorite);

		if (!isFavorite && elementor.templates.getFilter('favorite')) {
			elementor.channels.templates.trigger('filter:change');
		}
	}
});

module.exports = TemplateLibraryTemplateRemoteView;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TemplateLibraryTemplatesEmptyView;

TemplateLibraryTemplatesEmptyView = Marionette.ItemView.extend({
	id: 'elementor-template-library-templates-empty',

	template: '#tmpl-elementor-template-library-templates-empty',

	ui: {
		title: '.elementor-template-library-blank-title',
		message: '.elementor-template-library-blank-message'
	},

	modesStrings: {
		empty: {
			title: elementor.translate('templates_empty_title'),
			message: elementor.translate('templates_empty_message')
		},
		noResults: {
			title: elementor.translate('templates_no_results_title'),
			message: elementor.translate('templates_no_results_message')
		},
		noFavorites: {
			title: elementor.translate('templates_no_favorites_title'),
			message: elementor.translate('templates_no_favorites_message')
		}
	},

	getCurrentMode: function getCurrentMode() {
		if (elementor.templates.getFilter('text')) {
			return 'noResults';
		}

		if (elementor.templates.getFilter('favorite')) {
			return 'noFavorites';
		}

		return 'empty';
	},

	onRender: function onRender() {
		var modeStrings = this.modesStrings[this.getCurrentMode()];

		this.ui.title.html(modeStrings.title);

		this.ui.message.html(modeStrings.message);
	}
});

module.exports = TemplateLibraryTemplatesEmptyView;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TemplateLibrarySaveTemplateView;

TemplateLibrarySaveTemplateView = Marionette.ItemView.extend({
	id: 'elementor-template-library-save-template',

	template: '#tmpl-elementor-template-library-save-template',

	ui: {
		form: '#elementor-template-library-save-template-form',
		submitButton: '#elementor-template-library-save-template-submit'
	},

	events: {
		'submit @ui.form': 'onFormSubmit'
	},

	getSaveType: function getSaveType() {
		return this.model ? this.model.get('elType') : 'page';
	},

	templateHelpers: function templateHelpers() {
		var saveType = this.getSaveType(),
		    templateType = elementor.templates.getTemplateTypes(saveType);

		return templateType.saveDialog;
	},

	onFormSubmit: function onFormSubmit(event) {
		event.preventDefault();

		var formData = this.ui.form.elementorSerializeObject(),
		    saveType = this.model ? this.model.get('elType') : 'page',
		    JSONParams = { removeDefault: true };

		formData.content = this.model ? [this.model.toJSON(JSONParams)] : elementor.elements.toJSON(JSONParams);

		this.ui.submitButton.addClass('elementor-button-state');

		elementor.templates.saveTemplate(saveType, formData);
	}
});

module.exports = TemplateLibrarySaveTemplateView;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TemplateLibraryImportView;

TemplateLibraryImportView = Marionette.ItemView.extend({
	template: '#tmpl-elementor-template-library-import',

	id: 'elementor-template-library-import',

	ui: {
		uploadForm: '#elementor-template-library-import-form',
		fileInput: '#elementor-template-library-import-form-input'
	},

	events: {
		'change @ui.fileInput': 'onFileInputChange'
	},

	droppedFiles: null,

	submitForm: function submitForm() {
		var layout = elementor.templates.getLayout(),
		    data = new FormData();

		if (this.droppedFiles) {
			data.append('file', this.droppedFiles[0]);

			this.droppedFiles = null;
		} else {
			data.append('file', this.ui.fileInput[0].files[0]);

			this.ui.uploadForm[0].reset();
		}

		var options = {
			data: data,
			processData: false,
			contentType: false,
			success: function success(data) {
				elementor.templates.getTemplatesCollection().add(data);

				elementor.templates.setTemplatesPage('local');
			},
			error: function error(data) {
				elementor.templates.showErrorDialog(data);

				layout.showImportView();
			},
			complete: function complete() {
				layout.hideLoadingView();
			}
		};

		elementor.ajax.send('import_template', options);

		layout.showLoadingView();
	},

	onRender: function onRender() {
		this.ui.uploadForm.on({
			'drag dragstart dragend dragover dragenter dragleave drop': this.onFormActions.bind(this),
			dragenter: this.onFormDragEnter.bind(this),
			'dragleave drop': this.onFormDragLeave.bind(this),
			drop: this.onFormDrop.bind(this)
		});
	},

	onFormActions: function onFormActions(event) {
		event.preventDefault();
		event.stopPropagation();
	},

	onFormDragEnter: function onFormDragEnter() {
		this.ui.uploadForm.addClass('elementor-drag-over');
	},

	onFormDragLeave: function onFormDragLeave(event) {
		if (jQuery(event.relatedTarget).closest(this.ui.uploadForm).length) {
			return;
		}

		this.ui.uploadForm.removeClass('elementor-drag-over');
	},

	onFormDrop: function onFormDrop(event) {
		this.droppedFiles = event.originalEvent.dataTransfer.files;

		this.submitForm();
	},

	onFileInputChange: function onFileInputChange() {
		this.submitForm();
	}
});

module.exports = TemplateLibraryImportView;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TemplateLibraryPreviewView;

TemplateLibraryPreviewView = Marionette.ItemView.extend({
	template: '#tmpl-elementor-template-library-preview',

	id: 'elementor-template-library-preview',

	ui: {
		iframe: '> iframe'
	},

	onRender: function onRender() {
		this.ui.iframe.attr('src', this.getOption('url'));
	}
});

module.exports = TemplateLibraryPreviewView;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TemplateLibraryTemplateModel = __webpack_require__(74),
    TemplateLibraryCollection;

TemplateLibraryCollection = Backbone.Collection.extend({
	model: TemplateLibraryTemplateModel
});

module.exports = TemplateLibraryCollection;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Backbone.Model.extend({
	defaults: {
		template_id: 0,
		title: '',
		source: '',
		type: '',
		subtype: '',
		author: '',
		thumbnail: '',
		url: '',
		export_link: '',
		tags: []
	}
});

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Ajax;

Ajax = {
	config: {},
	requests: {},
	cache: {},

	initConfig: function initConfig() {
		this.config = {
			ajaxParams: {
				type: 'POST',
				url: elementor.config.ajaxurl,
				data: {}
			},
			actionPrefix: 'elementor_'
		};
	},

	init: function init() {
		this.initConfig();

		this.debounceSendBatch = _.debounce(this.sendBatch.bind(this), 500);
	},

	getCacheKey: function getCacheKey(request) {
		return JSON.stringify({
			unique_id: request.unique_id,
			data: request.data
		});
	},

	loadObjects: function loadObjects(options) {
		var self = this,
		    dataCollection = {},
		    deferredArray = [];

		if (options.before) {
			options.before();
		}

		options.ids.forEach(function (objectId) {
			deferredArray.push(self.load({
				action: options.action,
				unique_id: options.data.unique_id + objectId,
				data: jQuery.extend({ id: objectId }, options.data)
			}).done(function (data) {
				dataCollection = jQuery.extend(dataCollection, data);
			}));
		});

		jQuery.when.apply(jQuery, deferredArray).done(function () {
			options.success(dataCollection);
		});
	},

	load: function load(request) {
		var self = this;
		if (!request.unique_id) {
			request.unique_id = request.action;
		}

		if (request.before) {
			request.before();
		}

		var deferred,
		    cacheKey = self.getCacheKey(request);

		if (_.has(self.cache, cacheKey)) {
			deferred = jQuery.Deferred().done(request.success).resolve(self.cache[cacheKey]);
		} else {
			deferred = self.addRequest(request.action, {
				data: request.data,
				unique_id: request.unique_id,
				success: function success(data) {
					self.cache[cacheKey] = data;
				}
			}).done(request.success);
		}

		return deferred;
	},

	addRequest: function addRequest(action, options, immediately) {
		options = options || {};

		if (!options.unique_id) {
			options.unique_id = action;
		}

		options.deferred = jQuery.Deferred().done(options.success).fail(options.error).always(options.complete);

		var request = {
			action: action,
			options: options
		};

		if (immediately) {
			var requests = {};
			requests[options.unique_id] = request;
			options.deferred.jqXhr = this.sendBatch(requests);
		} else {
			this.requests[options.unique_id] = request;
			this.debounceSendBatch();
		}

		return options.deferred;
	},

	sendBatch: function sendBatch(requests) {
		var actions = {};

		if (!requests) {
			requests = this.requests;

			// Empty for next batch.
			this.requests = {};
		}

		_(requests).each(function (request, id) {
			actions[id] = {
				action: request.action,
				data: request.options.data
			};
		});

		return this.send('ajax', {
			data: {
				actions: JSON.stringify(actions)
			},
			success: function success(data) {
				_.each(data.responses, function (response, id) {
					var options = requests[id].options;
					if (options) {
						if (response.success) {
							options.deferred.resolve(response.data);
						} else if (!response.success) {
							options.deferred.reject(response.data);
						}
					}
				});
			},
			error: function error(data) {
				_.each(requests, function (args) {
					if (args.options) {
						args.options.deferred.reject(data);
					}
				});
			}
		});
	},

	send: function send(action, options) {
		var self = this,
		    ajaxParams = elementor.helpers.cloneObject(this.config.ajaxParams);

		options = options || {};

		action = this.config.actionPrefix + action;

		jQuery.extend(ajaxParams, options);

		if (ajaxParams.data instanceof FormData) {
			ajaxParams.data.append('action', action);
			ajaxParams.data.append('_nonce', elementor.config.nonce);
			ajaxParams.data.append('editor_post_id', elementor.config.document.id);
		} else {
			ajaxParams.data.action = action;
			ajaxParams.data._nonce = elementor.config.nonce;
			ajaxParams.data.editor_post_id = elementor.config.document.id;
		}

		var successCallback = ajaxParams.success,
		    errorCallback = ajaxParams.error;

		if (successCallback || errorCallback) {
			ajaxParams.success = function (response) {
				if (response.success && successCallback) {
					successCallback(response.data);
				}

				if (!response.success && errorCallback) {
					errorCallback(response.data);
				}
			};

			if (errorCallback) {
				ajaxParams.error = function (data) {
					errorCallback(data);
				};
			} else {
				ajaxParams.error = function (XMLHttpRequest) {
					if (0 === XMLHttpRequest.readyState && 'abort' === XMLHttpRequest.statusText) {
						return;
					}

					var message = self.createErrorMessage(XMLHttpRequest);

					elementor.notifications.showToast({
						message: message
					});
				};
			}
		}

		return jQuery.ajax(ajaxParams);
	},

	createErrorMessage: function createErrorMessage(XMLHttpRequest) {
		var message;
		if (4 === XMLHttpRequest.readyState) {
			message = elementor.translate('server_error');
			if (200 !== XMLHttpRequest.status) {
				message += ' (' + XMLHttpRequest.status + ' ' + XMLHttpRequest.statusText + ')';
			}
		} else if (0 === XMLHttpRequest.readyState) {
			message = elementor.translate('server_connection_lost');
		} else {
			message = elementor.translate('unknown_error');
		}

		return message + '.';
	}
};

module.exports = Ajax;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Conditions;

Conditions = function Conditions() {
	var self = this;

	this.compare = function (leftValue, rightValue, operator) {
		switch (operator) {
			/* eslint-disable eqeqeq */
			case '==':
				return leftValue == rightValue;
			case '!=':
				return leftValue != rightValue;
			/* eslint-enable eqeqeq */
			case '!==':
				return leftValue !== rightValue;
			case 'in':
				return -1 !== rightValue.indexOf(leftValue);
			case '!in':
				return -1 === rightValue.indexOf(leftValue);
			case 'contains':
				return -1 !== leftValue.indexOf(rightValue);
			case '!contains':
				return -1 === leftValue.indexOf(rightValue);
			case '<':
				return leftValue < rightValue;
			case '<=':
				return leftValue <= rightValue;
			case '>':
				return leftValue > rightValue;
			case '>=':
				return leftValue >= rightValue;
			default:
				return leftValue === rightValue;
		}
	};

	this.check = function (conditions, comparisonObject) {
		var isOrCondition = 'or' === conditions.relation,
		    conditionSucceed = !isOrCondition;

		jQuery.each(conditions.terms, function () {
			var term = this,
			    comparisonResult;

			if (term.terms) {
				comparisonResult = self.check(term, comparisonObject);
			} else {
				var parsedName = term.name.match(/(\w+)(?:\[(\w+)])?/),
				    value = comparisonObject[parsedName[1]];

				if (parsedName[2]) {
					value = value[parsedName[2]];
				}

				comparisonResult = self.compare(value, term.value, term.operator);
			}

			if (isOrCondition) {
				if (comparisonResult) {
					conditionSucceed = true;
				}

				return !comparisonResult;
			}

			if (!comparisonResult) {
				return conditionSucceed = false;
			}
		});

		return conditionSucceed;
	};
};

module.exports = new Conditions();

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var HistoryPageView = __webpack_require__(78),
    Manager;

Manager = function Manager() {
	var self = this;

	var addPanelPage = function addPanelPage() {
		elementor.getPanelView().addPage('historyPage', {
			view: HistoryPageView,
			title: elementor.translate('history')
		});
	};

	var init = function init() {
		elementor.on('preview:loaded', addPanelPage);

		self.history = __webpack_require__(84);

		self.revisions = __webpack_require__(93);

		self.revisions.init();
	};

	jQuery(window).on('elementor:init', init);
};

module.exports = new Manager();

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TabHistoryView = __webpack_require__(79),
    TabHistoryEmpty = __webpack_require__(80),
    TabRevisionsView = __webpack_require__(81),
    TabRevisionsEmpty = __webpack_require__(83);

module.exports = Marionette.LayoutView.extend({
	template: '#tmpl-elementor-panel-history-page',

	regions: {
		content: '#elementor-panel-history-content'
	},

	ui: {
		tabs: '.elementor-panel-navigation-tab'
	},

	events: {
		'click @ui.tabs': 'onTabClick'
	},

	regionViews: {},

	currentTab: null,

	initialize: function initialize() {
		this.initRegionViews();
	},

	initRegionViews: function initRegionViews() {
		var historyItems = elementor.history.history.getItems(),
		    revisionsItems = elementor.history.revisions.getItems();

		this.regionViews = {
			history: {
				region: this.content,
				view: function view() {
					if (historyItems.length) {
						return TabHistoryView;
					}

					return TabHistoryEmpty;
				},
				options: {
					collection: historyItems
				}
			},
			revisions: {
				region: this.content,
				view: function view() {
					if (revisionsItems.length) {
						return TabRevisionsView;
					}

					return TabRevisionsEmpty;
				},

				options: {
					collection: revisionsItems
				}
			}
		};
	},

	activateTab: function activateTab(tabName) {
		this.ui.tabs.removeClass('elementor-active').filter('[data-view="' + tabName + '"]').addClass('elementor-active');

		this.showView(tabName);
	},

	getCurrentTab: function getCurrentTab() {
		return this.currentTab;
	},

	showView: function showView(viewName) {
		var viewDetails = this.regionViews[viewName],
		    options = viewDetails.options || {},
		    View = viewDetails.view;

		if ('function' === typeof View) {
			View = viewDetails.view();
		}

		options.viewName = viewName;
		this.currentTab = new View(options);

		viewDetails.region.show(this.currentTab);
	},

	onRender: function onRender() {
		this.showView('history');
	},

	onTabClick: function onTabClick(event) {
		this.activateTab(event.currentTarget.dataset.view);
	},

	onDestroy: function onDestroy() {
		elementor.getPanelView().getFooterView().ui.history.removeClass('elementor-open');
	}
});

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Marionette.CompositeView.extend({
	id: 'elementor-panel-history',

	template: '#tmpl-elementor-panel-history-tab',

	childView: Marionette.ItemView.extend({
		template: '#tmpl-elementor-panel-history-item',
		ui: {
			item: '.elementor-history-item'
		},
		triggers: {
			'click @ui.item': 'item:click'
		}
	}),

	childViewContainer: '#elementor-history-list',

	currentItem: null,

	onRender: function onRender() {
		var self = this;

		_.defer(function () {
			// Set current item - the first not applied item
			if (self.children.length) {
				var currentItem = self.collection.find(function (model) {
					return 'not_applied' === model.get('status');
				}),
				    currentView = self.children.findByModel(currentItem);

				self.updateCurrentItem(currentView.$el);
			}
		});
	},

	updateCurrentItem: function updateCurrentItem(element) {
		var currentItemClass = 'elementor-history-item-current';

		if (this.currentItem) {
			this.currentItem.removeClass(currentItemClass);
		}

		this.currentItem = element;

		this.currentItem.addClass(currentItemClass);
	},

	onChildviewItemClick: function onChildviewItemClick(childView, event) {
		if (childView.$el === this.currentItem) {
			return;
		}

		var collection = event.model.collection,
		    itemIndex = collection.findIndex(event.model);

		elementor.history.history.doItem(itemIndex);

		this.updateCurrentItem(childView.$el);

		if (!this.isDestroyed) {
			this.render();
		}
	}
});

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Marionette.ItemView.extend({
	template: '#tmpl-elementor-panel-history-no-items',
	id: 'elementor-panel-history-no-items',
	className: 'elementor-nerd-box'
});

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Marionette.CompositeView.extend({
	id: 'elementor-panel-revisions',

	template: '#tmpl-elementor-panel-revisions',

	childView: __webpack_require__(82),

	childViewContainer: '#elementor-revisions-list',

	ui: {
		discard: '.elementor-panel-scheme-discard .elementor-button',
		apply: '.elementor-panel-scheme-save .elementor-button'
	},

	events: {
		'click @ui.discard': 'onDiscardClick',
		'click @ui.apply': 'onApplyClick'
	},

	isRevisionApplied: false,

	jqueryXhr: null,

	currentPreviewId: null,

	currentPreviewItem: null,

	initialize: function initialize() {
		this.listenTo(elementor.channels.editor, 'saved', this.onEditorSaved);
		this.currentPreviewId = elementor.config.current_revision_id;
	},

	getRevisionViewData: function getRevisionViewData(revisionView) {
		var self = this;

		this.jqueryXhr = elementor.history.revisions.getRevisionDataAsync(revisionView.model.get('id'), {
			success: function success(data) {
				elementor.history.revisions.setEditorData(data.elements);
				elementor.settings.page.model.set(data.settings);

				self.setRevisionsButtonsActive(true);

				self.jqueryXhr = null;

				revisionView.$el.removeClass('elementor-revision-item-loading');

				self.enterReviewMode();
			},
			error: function error() {
				revisionView.$el.removeClass('elementor-revision-item-loading');

				if ('abort' === self.jqueryXhr.statusText) {
					return;
				}

				self.currentPreviewItem = null;

				self.currentPreviewId = null;

				alert('An error occurred');
			}
		});
	},

	setRevisionsButtonsActive: function setRevisionsButtonsActive(active) {
		this.ui.apply.add(this.ui.discard).prop('disabled', !active);
	},

	deleteRevision: function deleteRevision(revisionView) {
		var self = this;

		revisionView.$el.addClass('elementor-revision-item-loading');

		elementor.history.revisions.deleteRevision(revisionView.model, {
			success: function success() {
				if (revisionView.model.get('id') === self.currentPreviewId) {
					self.onDiscardClick();
				}

				self.currentPreviewId = null;
			},
			error: function error() {
				revisionView.$el.removeClass('elementor-revision-item-loading');

				alert('An error occurred');
			}
		});
	},

	enterReviewMode: function enterReviewMode() {
		elementor.changeEditMode('review');
	},

	exitReviewMode: function exitReviewMode() {
		elementor.changeEditMode('edit');
	},

	navigate: function navigate(reverse) {
		var currentPreviewItemIndex = this.collection.indexOf(this.currentPreviewItem.model),
		    requiredIndex = reverse ? currentPreviewItemIndex - 1 : currentPreviewItemIndex + 1;

		if (requiredIndex < 0) {
			requiredIndex = this.collection.length - 1;
		}

		if (requiredIndex >= this.collection.length) {
			requiredIndex = 0;
		}

		this.children.findByIndex(requiredIndex).ui.detailsArea.trigger('click');
	},

	onEditorSaved: function onEditorSaved() {
		this.exitReviewMode();

		this.setRevisionsButtonsActive(false);

		this.currentPreviewId = elementor.config.current_revision_id;
	},

	onApplyClick: function onApplyClick() {
		elementor.saver.setFlagEditorChange(true);

		elementor.saver.saveAutoSave();

		this.isRevisionApplied = true;

		this.currentPreviewId = null;

		elementor.history.history.getItems().reset();
	},

	onDiscardClick: function onDiscardClick() {
		elementor.history.revisions.setEditorData(elementor.config.data);

		elementor.saver.setFlagEditorChange(this.isRevisionApplied);

		this.isRevisionApplied = false;

		this.setRevisionsButtonsActive(false);

		this.currentPreviewId = null;

		this.exitReviewMode();

		if (this.currentPreviewItem) {
			this.currentPreviewItem.$el.removeClass('elementor-revision-current-preview');
		}
	},

	onDestroy: function onDestroy() {
		if (this.currentPreviewId && this.currentPreviewId !== elementor.config.current_revision_id) {
			this.onDiscardClick();
		}
	},

	onRenderCollection: function onRenderCollection() {
		if (!this.currentPreviewId) {
			return;
		}

		var currentPreviewModel = this.collection.findWhere({ id: this.currentPreviewId });

		// Ensure the model is exist and not deleted during a save.
		if (currentPreviewModel) {
			this.currentPreviewItem = this.children.findByModelCid(currentPreviewModel.cid);
			this.currentPreviewItem.$el.addClass('elementor-revision-current-preview');
		}
	},

	onChildviewDetailsAreaClick: function onChildviewDetailsAreaClick(childView) {
		var self = this,
		    revisionID = childView.model.get('id');

		if (revisionID === self.currentPreviewId) {
			return;
		}

		if (this.jqueryXhr) {
			this.jqueryXhr.abort();
		}

		if (self.currentPreviewItem) {
			self.currentPreviewItem.$el.removeClass('elementor-revision-current-preview');
		}

		childView.$el.addClass('elementor-revision-current-preview elementor-revision-item-loading');

		if (elementor.saver.isEditorChanged() && null === self.currentPreviewId) {
			elementor.saver.saveEditor({
				status: 'autosave',
				onSuccess: function onSuccess() {
					self.getRevisionViewData(childView);
				}
			});
		} else {
			self.getRevisionViewData(childView);
		}

		self.currentPreviewItem = childView;

		self.currentPreviewId = revisionID;
	},

	onChildviewDeleteClick: function onChildviewDeleteClick(childView) {
		var self = this,
		    type = childView.model.get('type');

		var removeDialog = elementor.dialogsManager.createWidget('confirm', {
			message: elementor.translate('dialog_confirm_delete', [type]),
			headerMessage: elementor.translate('delete_element', [type]),
			strings: {
				confirm: elementor.translate('delete'),
				cancel: elementor.translate('cancel')
			},
			defaultOption: 'confirm',
			onConfirm: function onConfirm() {
				self.deleteRevision(childView);
			}
		});

		removeDialog.show();
	}
});

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Marionette.ItemView.extend({
	template: '#tmpl-elementor-panel-revisions-revision-item',

	className: 'elementor-revision-item',

	ui: {
		detailsArea: '.elementor-revision-item__details',
		deleteButton: '.elementor-revision-item__tools-delete'
	},

	triggers: {
		'click @ui.detailsArea': 'detailsArea:click',
		'click @ui.deleteButton': 'delete:click'
	}
});

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Marionette.ItemView.extend({
	template: '#tmpl-elementor-panel-revisions-no-revisions',
	id: 'elementor-panel-revisions-no-revisions',
	className: 'elementor-nerd-box'
});

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var HistoryCollection = __webpack_require__(85),
    HistoryItem = __webpack_require__(27),
    ElementHistoryBehavior = __webpack_require__(86),
    CollectionHistoryBehavior = __webpack_require__(87);

var Manager = function Manager() {
	var self = this,
	    currentItemID = null,
	    items = new HistoryCollection(),
	    editorSaved = false,
	    active = true;

	var translations = {
		add: elementor.translate('added'),
		remove: elementor.translate('removed'),
		change: elementor.translate('edited'),
		move: elementor.translate('moved'),
		paste_style: elementor.translate('style_pasted'),
		reset_style: elementor.translate('style_reset')
	};

	var addBehaviors = function addBehaviors(behaviors) {
		behaviors.ElementHistory = {
			behaviorClass: ElementHistoryBehavior
		};

		behaviors.CollectionHistory = {
			behaviorClass: CollectionHistoryBehavior
		};

		return behaviors;
	};

	var addCollectionBehavior = function addCollectionBehavior(behaviors) {
		behaviors.CollectionHistory = {
			behaviorClass: CollectionHistoryBehavior
		};

		return behaviors;
	};

	var getActionLabel = function getActionLabel(itemData) {
		if (translations[itemData.type]) {
			return translations[itemData.type];
		}

		return itemData.type;
	};

	var navigate = function navigate(isRedo) {
		var currentItem = items.find(function (model) {
			return 'not_applied' === model.get('status');
		}),
		    currentItemIndex = items.indexOf(currentItem),
		    requiredIndex = isRedo ? currentItemIndex - 1 : currentItemIndex + 1;

		if (!isRedo && !currentItem || requiredIndex < 0 || requiredIndex >= items.length) {
			return;
		}

		self.doItem(requiredIndex);
	};

	var addHotKeys = function addHotKeys() {
		var H_KEY = 72,
		    Y_KEY = 89,
		    Z_KEY = 90;

		elementor.hotKeys.addHotKeyHandler(H_KEY, 'showHistoryPage', {
			isWorthHandling: function isWorthHandling(event) {
				return elementor.hotKeys.isControlEvent(event) && event.shiftKey;
			},
			handle: function handle() {
				elementor.getPanelView().setPage('historyPage');
			}
		});

		var navigationWorthHandling = function navigationWorthHandling(event) {
			return items.length && elementor.hotKeys.isControlEvent(event) && !jQuery(event.target).is('input, textarea, [contenteditable=true]');
		};

		elementor.hotKeys.addHotKeyHandler(Y_KEY, 'historyNavigationRedo', {
			isWorthHandling: navigationWorthHandling,
			handle: function handle(event) {
				navigate(true);
			}
		});

		elementor.hotKeys.addHotKeyHandler(Z_KEY, 'historyNavigation', {
			isWorthHandling: navigationWorthHandling,
			handle: function handle(event) {
				navigate(event.shiftKey);
			}
		});
	};

	var onPanelSave = function onPanelSave() {
		if (items.length >= 2) {
			// Check if it's a save after made changes, `items.length - 1` is the `Editing Started Item
			var firstEditItem = items.at(items.length - 2);
			editorSaved = 'not_applied' === firstEditItem.get('status');
		}
	};

	var init = function init() {
		addHotKeys();

		elementor.hooks.addFilter('elements/base/behaviors', addBehaviors);
		elementor.hooks.addFilter('elements/base-section-container/behaviors', addCollectionBehavior);

		elementor.channels.data.on('drag:before:update', self.startMovingItem).on('drag:after:update', self.endItem).on('element:before:add', self.startAddElement).on('element:after:add', self.endItem).on('element:before:remove', self.startRemoveElement).on('element:after:remove', self.endItem).on('element:before:paste:style', self.startPasteStyle).on('element:after:paste:style', self.endItem).on('element:before:reset:style', self.startResetStyle).on('element:after:reset:style', self.endItem).on('section:before:drop', self.startDropElement).on('section:after:drop', self.endItem).on('template:before:insert', self.startInsertTemplate).on('template:after:insert', self.endItem);

		elementor.channels.editor.on('saved', onPanelSave);
	};

	this.setActive = function (value) {
		active = value;
	};

	this.getActive = function () {
		return active;
	};

	this.getItems = function () {
		return items;
	};

	this.startItem = function (itemData) {
		currentItemID = this.addItem(itemData);
	};

	this.endItem = function () {
		currentItemID = null;
	};

	this.isItemStarted = function () {
		return null !== currentItemID;
	};

	this.addItem = function (itemData) {
		if (!this.getActive()) {
			return;
		}

		if (!items.length) {
			items.add({
				status: 'not_applied',
				title: elementor.translate('editing_started'),
				subTitle: '',
				action: '',
				editing_started: true
			});
		}

		// Remove old applied items from top of list
		while (items.length && 'applied' === items.first().get('status')) {
			items.shift();
		}

		var id = currentItemID ? currentItemID : new Date().getTime();

		var currentItem = items.findWhere({
			id: id
		});

		if (!currentItem) {
			currentItem = new HistoryItem({
				id: id,
				title: itemData.title,
				subTitle: itemData.subTitle,
				action: getActionLabel(itemData),
				type: itemData.type,
				elementType: itemData.elementType
			});

			self.startItemTitle = '';
			self.startItemAction = '';
		}

		var position = 0;

		// Temp fix. On move a column - insert the `remove` subItem before the section changes subItem.
		// In a multi columns section - the structure has been changed,
		// In a one column section - it's filled with an empty column,
		// The order is important for the `redoItem`, that needed to change the section first
		// and only after that - to remove the column.
		if ('column' === itemData.elementType && 'remove' === itemData.type && 'column' === currentItem.get('elementType')) {
			position = 1;
		}

		currentItem.get('items').add(itemData, { at: position });

		items.add(currentItem, { at: 0 });

		var panel = elementor.getPanelView();

		if ('historyPage' === panel.getCurrentPageName()) {
			panel.getCurrentPageView().render();
		}

		return id;
	};

	this.doItem = function (index) {
		// Don't track while restoring the item
		this.setActive(false);

		var item = items.at(index);

		if ('not_applied' === item.get('status')) {
			this.undoItem(index);
		} else {
			this.redoItem(index);
		}

		this.setActive(true);

		var panel = elementor.getPanelView(),
		    panelPage = panel.getCurrentPageView(),
		    viewToScroll;

		if ('editor' === panel.getCurrentPageName()) {
			if (panelPage.getOption('editedElementView').isDestroyed) {
				// If the the element isn't exist - show the history panel
				panel.setPage('historyPage');
			} else {
				// If element exist - render again, maybe the settings has been changed
				viewToScroll = panelPage.getOption('editedElementView');
			}
		} else {
			if ('historyPage' === panel.getCurrentPageName()) {
				panelPage.render();
			}

			// Try scroll to affected element.
			if (item instanceof Backbone.Model && item.get('items').length) {
				var history = item.get('items').first().get('history');

				if (history && history.behavior.view.model) {
					viewToScroll = self.findView(history.behavior.view.model.get('id'));
				}
			}
		}

		if (viewToScroll && !elementor.helpers.isInViewport(viewToScroll.$el[0], elementor.$previewContents.find('html')[0])) {
			elementor.helpers.scrollToView(viewToScroll.$el);
		}

		if (item.get('editing_started')) {
			if (!editorSaved) {
				elementor.saver.setFlagEditorChange(false);
			}
		}
	};

	this.undoItem = function (index) {
		var item;

		for (var stepNum = 0; stepNum < index; stepNum++) {
			item = items.at(stepNum);

			if ('not_applied' === item.get('status')) {
				item.get('items').each(function (subItem) {
					var history = subItem.get('history');

					if (history) {
						/* type duplicate first items hasn't history */
						history.behavior.restore(subItem);
					}
				});

				item.set('status', 'applied');
			}
		}
	};

	this.redoItem = function (index) {
		for (var stepNum = items.length - 1; stepNum >= index; stepNum--) {
			var item = items.at(stepNum);

			if ('applied' === item.get('status')) {
				var reversedSubItems = _.toArray(item.get('items').models).reverse();

				_(reversedSubItems).each(function (subItem) {
					var history = subItem.get('history');

					if (history) {
						/* type duplicate first items hasn't history */
						history.behavior.restore(subItem, true);
					}
				});

				item.set('status', 'not_applied');
			}
		}
	};

	this.getModelLabel = function (model) {
		if (!(model instanceof Backbone.Model)) {
			model = new Backbone.Model(model);
		}

		return elementor.getElementData(model).title;
	};

	this.findView = function (modelID, views) {
		var self = this,
		    founded = false;

		if (!views) {
			views = elementor.getPreviewView().children;
		}

		_.each(views._views, function (view) {
			if (founded) {
				return;
			}
			// Widget global used getEditModel
			var model = view.getEditModel ? view.getEditModel() : view.model;

			if (modelID === model.get('id')) {
				founded = view;
			} else if (view.children && view.children.length) {
				founded = self.findView(modelID, view.children);
			}
		});

		return founded;
	};

	this.startMovingItem = function (model) {
		elementor.history.history.startItem({
			type: 'move',
			title: self.getModelLabel(model),
			elementType: model.elType || model.get('elType')
		});
	};

	this.startInsertTemplate = function (model) {
		elementor.history.history.startItem({
			type: 'add',
			title: elementor.translate('template'),
			subTitle: model.get('title'),
			elementType: 'template'
		});
	};

	this.startDropElement = function () {
		var elementView = elementor.channels.panelElements.request('element:selected');
		elementor.history.history.startItem({
			type: 'add',
			title: self.getModelLabel(elementView.model),
			elementType: elementView.model.get('widgetType') || elementView.model.get('elType')
		});
	};

	this.startAddElement = function (model) {
		elementor.history.history.startItem({
			type: 'add',
			title: self.getModelLabel(model),
			elementType: model.elType
		});
	};

	this.startPasteStyle = function (model) {
		elementor.history.history.startItem({
			type: 'paste_style',
			title: self.getModelLabel(model),
			elementType: model.get('elType')
		});
	};

	this.startResetStyle = function (model) {
		elementor.history.history.startItem({
			type: 'reset_style',
			title: self.getModelLabel(model),
			elementType: model.get('elType')
		});
	};

	this.startRemoveElement = function (model) {
		elementor.history.history.startItem({
			type: 'remove',
			title: self.getModelLabel(model),
			elementType: model.get('elType')
		});
	};

	init();
};

module.exports = new Manager();

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ItemModel = __webpack_require__(27);

module.exports = Backbone.Collection.extend({
	model: ItemModel
});

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Marionette.Behavior.extend({
	oldValues: [],

	listenerAttached: false,

	initialize: function initialize() {
		this.lazySaveTextHistory = _.debounce(this.saveTextHistory.bind(this), 800);
	},

	// use beforeRender that runs after the settingsModel is exist
	onBeforeRender: function onBeforeRender() {
		if (!this.listenerAttached) {
			this.listenTo(this.view.getEditModel().get('settings'), 'change', this.saveHistory);
			this.listenerAttached = true;
		}
	},

	saveTextHistory: function saveTextHistory(model, changed, control) {
		var changedAttributes = {},
		    currentValue = model.get(control.name),
		    newValue;

		if (currentValue instanceof Backbone.Collection) {
			// Deep clone.
			newValue = currentValue.toJSON();
		} else {
			newValue = currentValue;
		}

		changedAttributes[control.name] = {
			old: this.oldValues[control.name],
			'new': newValue
		};

		var historyItem = {
			type: 'change',
			elementType: 'control',
			title: elementor.history.history.getModelLabel(model),
			subTitle: control.label,
			history: {
				behavior: this,
				changed: changedAttributes,
				model: this.view.getEditModel().toJSON()
			}
		};

		elementor.history.history.addItem(historyItem);

		delete this.oldValues[control.name];
	},

	saveHistory: function saveHistory(model, options) {
		if (!elementor.history.history.getActive()) {
			return;
		}

		var self = this,
		    changed = Object.keys(model.changed),
		    control = model.controls[changed[0]];

		if (!control && options && options.control) {
			control = options.control;
		}

		if (!changed.length || !control) {
			return;
		}

		if (1 === changed.length) {
			if (_.isUndefined(self.oldValues[control.name])) {
				self.oldValues[control.name] = model.previous(control.name);
			}

			if (elementor.history.history.isItemStarted()) {
				// Do not delay the execution
				self.saveTextHistory(model, changed, control);
			} else {
				self.lazySaveTextHistory(model, changed, control);
			}

			return;
		}

		var changedAttributes = {};

		_.each(changed, function (controlName) {
			changedAttributes[controlName] = {
				old: model.previous(controlName),
				'new': model.get(controlName)
			};
		});

		var historyItem = {
			type: 'change',
			elementType: 'control',
			title: elementor.history.history.getModelLabel(model),
			history: {
				behavior: this,
				changed: changedAttributes,
				model: this.view.getEditModel().toJSON()
			}
		};

		if (1 === changed.length) {
			historyItem.subTitle = control.label;
		}

		elementor.history.history.addItem(historyItem);
	},

	restore: function restore(historyItem, isRedo) {
		var history = historyItem.get('history'),
		    modelID = history.model.id,
		    view = elementor.history.history.findView(modelID);

		if (!view) {
			return;
		}

		var model = view.getEditModel ? view.getEditModel() : view.model,
		    settings = model.get('settings'),
		    behavior = view.getBehavior('ElementHistory');

		// Stop listen to restore actions
		behavior.stopListening(settings, 'change', this.saveHistory);

		var restoredValues = {};
		_.each(history.changed, function (values, key) {
			if (isRedo) {
				restoredValues[key] = values['new'];
			} else {
				restoredValues[key] = values.old;
			}
		});

		// Set at once.
		settings.setExternalChange(restoredValues);

		historyItem.set('status', isRedo ? 'not_applied' : 'applied');

		// Listen again
		behavior.listenTo(settings, 'change', this.saveHistory);
	}
});

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Marionette.Behavior.extend({
	listenerAttached: false,

	// use beforeRender that runs after the collection is exist
	onBeforeRender: function onBeforeRender() {
		if (this.view.collection && !this.listenerAttached) {
			this.view.collection.on('update', this.saveCollectionHistory, this).on('reset', this.onDeleteAllContent, this);
			this.listenerAttached = true;
		}
	},

	onDeleteAllContent: function onDeleteAllContent(collection, event) {
		if (!elementor.history.history.getActive()) {
			// On Redo the History Listener is not active - stop here for better performance.
			return;
		}

		var modelsJSON = [];

		_.each(event.previousModels, function (model) {
			modelsJSON.push(model.toJSON({ copyHtmlCache: true }));
		});

		var historyItem = {
			type: 'remove',
			elementType: 'section',
			title: elementor.translate('all_content'),
			history: {
				behavior: this,
				collection: event.previousModels,
				event: event,
				models: modelsJSON
			}
		};

		elementor.history.history.addItem(historyItem);
	},

	saveCollectionHistory: function saveCollectionHistory(collection, event) {
		if (!elementor.history.history.getActive()) {
			// On Redo the History Listener is not active - stop here for better performance.
			return;
		}

		var historyItem, models, firstModel, type;

		if (event.add) {
			models = event.changes.added;
			firstModel = models[0];
			type = 'add';
		} else {
			models = event.changes.removed;
			firstModel = models[0];
			type = 'remove';
		}

		var title = elementor.history.history.getModelLabel(firstModel);

		// If it's an unknown model - don't save
		if (!title) {
			return;
		}

		var modelsJSON = [];

		_.each(models, function (model) {
			modelsJSON.push(model.toJSON({ copyHtmlCache: true }));
		});

		historyItem = {
			type: type,
			elementType: firstModel.get('elType'),
			elementID: firstModel.get('id'),
			title: title,
			history: {
				behavior: this,
				collection: collection,
				event: event,
				models: modelsJSON
			}
		};

		elementor.history.history.addItem(historyItem);
	},

	add: function add(models, toView, position) {
		if ('section' === models[0].elType) {
			_.each(models, function (model) {
				model.allowEmpty = true;
			});
		}

		// Fix for case the iframe has been reloaded and the old `elementor-inner` is not exist.
		if (toView.$el.hasClass('elementor-inner') && toView.$el[0].ownerDocument !== elementor.$previewContents[0]) {
			toView = elementor.getPreviewView();
		}

		toView.addChildModel(models, { at: position, silent: 0 });
	},

	remove: function remove(models, fromCollection) {
		fromCollection.remove(models, { silent: 0 });
	},

	restore: function restore(historyItem, isRedo) {
		var type = historyItem.get('type'),
		    history = historyItem.get('history'),
		    didAction = false,
		    behavior;

		var BaseElementView = __webpack_require__(10);

		// Find the new behavior and work with him.
		if (history.behavior.view instanceof BaseElementView) {
			var modelID = history.behavior.view.model.get('id'),
			    view = elementor.history.history.findView(modelID);
			if (view) {
				behavior = view.getBehavior('CollectionHistory');
			}
		}

		// Container or new Elements - Doesn't have a new behavior
		if (!behavior) {
			behavior = history.behavior;
		}

		// Stop listen to undo actions
		behavior.view.collection.off('update', behavior.saveCollectionHistory);

		switch (type) {
			case 'add':
				if (isRedo) {
					this.add(history.models, behavior.view, history.event.index);
				} else {
					this.remove(history.models, behavior.view.collection);
				}

				didAction = true;
				break;
			case 'remove':
				if (isRedo) {
					this.remove(history.models, behavior.view.collection);
				} else {
					this.add(history.models, behavior.view, history.event.index);
				}

				didAction = true;
				break;
		}

		// Listen again
		behavior.view.collection.on('update', behavior.saveCollectionHistory, history.behavior);

		return didAction;
	}
});

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Module = __webpack_require__(2),
    ContextMenu;

ContextMenu = Module.extend({

	getDefaultSettings: function getDefaultSettings() {
		return {
			actions: {},
			classes: {
				list: 'elementor-context-menu-list',
				group: 'elementor-context-menu-list__group',
				groupPrefix: 'elementor-context-menu-list__group-',
				item: 'elementor-context-menu-list__item',
				itemTypePrefix: 'elementor-context-menu-list__item-',
				itemTitle: 'elementor-context-menu-list__item__title',
				itemShortcut: 'elementor-context-menu-list__item__shortcut',
				iconShortcut: 'elementor-context-menu-list__item__icon',
				itemDisabled: 'elementor-context-menu-list__item--disabled',
				divider: 'elementor-context-menu-list__divider',
				hidden: 'elementor-hidden'
			}
		};
	},

	buildActionItem: function buildActionItem(action) {
		var self = this,
		    classes = self.getSettings('classes'),
		    $item = jQuery('<div>', { 'class': classes.item + ' ' + classes.itemTypePrefix + action.name }),
		    $itemTitle = jQuery('<div>', { 'class': classes.itemTitle }).text(action.title),
		    $itemIcon = jQuery('<div>', { 'class': classes.iconShortcut });

		if (action.icon) {
			$itemIcon.html(jQuery('<i>', { 'class': action.icon }));
		}

		$item.append($itemIcon, $itemTitle);

		if (action.shortcut) {
			var $itemShortcut = jQuery('<div>', { 'class': classes.itemShortcut }).html(action.shortcut);

			$item.append($itemShortcut);
		}

		if (action.callback) {
			$item.on('click', function () {
				self.runAction(action);
			});
		}

		action.$item = $item;

		return $item;
	},

	buildActionsList: function buildActionsList() {
		var self = this,
		    classes = self.getSettings('classes'),
		    groups = self.getSettings('groups'),
		    $list = jQuery('<div>', { 'class': classes.list });

		groups.forEach(function (group) {
			var $group = jQuery('<div>', { 'class': classes.group + ' ' + classes.groupPrefix + group.name });

			group.actions.forEach(function (action) {
				$group.append(self.buildActionItem(action));
			});

			$list.append($group);

			group.$item = $group;
		});

		return $list;
	},

	toggleGroupVisibility: function toggleGroupVisibility(group, state) {
		group.$item.toggleClass(this.getSettings('classes.hidden'), !state);
	},

	toggleActionVisibility: function toggleActionVisibility(action, state) {
		action.$item.toggleClass(this.getSettings('classes.hidden'), !state);
	},

	toggleActionUsability: function toggleActionUsability(action, state) {
		action.$item.toggleClass(this.getSettings('classes.itemDisabled'), !state);
	},

	isActionEnabled: function isActionEnabled(action) {
		if (!action.callback && !action.groups) {
			return false;
		}

		return action.isEnabled ? action.isEnabled() : true;
	},

	runAction: function runAction(action) {
		if (!this.isActionEnabled(action)) {
			return;
		}

		action.callback();

		this.getModal().hide();
	},

	initModal: function initModal() {
		var modal;

		this.getModal = function () {
			if (!modal) {
				modal = elementor.dialogsManager.createWidget('simple', {
					className: 'elementor-context-menu',
					message: this.buildActionsList(),
					iframe: elementor.$preview,
					effects: {
						hide: 'hide',
						show: 'show'
					},
					hide: {
						onOutsideContextMenu: true
					},
					position: {
						my: (elementor.config.is_rtl ? 'right' : 'left') + ' top',
						collision: 'fit'
					}
				});
			}

			return modal;
		};
	},

	show: function show(event) {
		var self = this,
		    modal = self.getModal();

		modal.setSettings('position', {
			of: event
		});

		self.getSettings('groups').forEach(function (group) {
			var isGroupVisible = false !== group.isVisible;

			self.toggleGroupVisibility(group, isGroupVisible);

			if (isGroupVisible) {
				group.actions.forEach(function (action) {
					var isActionVisible = false !== action.isVisible;

					self.toggleActionVisibility(action, isActionVisible);

					if (isActionVisible) {
						self.toggleActionUsability(action, self.isActionEnabled(action));
					}
				});
			}
		});

		modal.show();
	},

	destroy: function destroy() {
		this.getModal().destroy();
	},

	onInit: function onInit() {
		this.initModal();
	}
});

module.exports = ContextMenu;

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _base = __webpack_require__(30);

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddSectionView = function (_BaseAddSectionView) {
	_inherits(AddSectionView, _BaseAddSectionView);

	function AddSectionView() {
		_classCallCheck(this, AddSectionView);

		return _possibleConstructorReturn(this, (AddSectionView.__proto__ || Object.getPrototypeOf(AddSectionView)).apply(this, arguments));
	}

	_createClass(AddSectionView, [{
		key: 'className',
		value: function className() {
			return _get(AddSectionView.prototype.__proto__ || Object.getPrototypeOf(AddSectionView.prototype), 'className', this).call(this) + ' elementor-add-section-inline';
		}
	}, {
		key: 'fadeToDeath',
		value: function fadeToDeath() {
			var self = this;

			self.$el.slideUp(function () {
				self.destroy();
			});
		}
	}, {
		key: 'paste',
		value: function paste() {
			_get(AddSectionView.prototype.__proto__ || Object.getPrototypeOf(AddSectionView.prototype), 'paste', this).call(this);

			this.destroy();
		}
	}, {
		key: 'onCloseButtonClick',
		value: function onCloseButtonClick() {
			this.fadeToDeath();
		}
	}, {
		key: 'onPresetSelected',
		value: function onPresetSelected(event) {
			_get(AddSectionView.prototype.__proto__ || Object.getPrototypeOf(AddSectionView.prototype), 'onPresetSelected', this).call(this, event);

			this.destroy();
		}
	}, {
		key: 'onAddTemplateButtonClick',
		value: function onAddTemplateButtonClick() {
			_get(AddSectionView.prototype.__proto__ || Object.getPrototypeOf(AddSectionView.prototype), 'onAddTemplateButtonClick', this).call(this);

			this.destroy();
		}
	}, {
		key: 'onDropping',
		value: function onDropping() {
			_get(AddSectionView.prototype.__proto__ || Object.getPrototypeOf(AddSectionView.prototype), 'onDropping', this).call(this);

			this.destroy();
		}
	}]);

	return AddSectionView;
}(_base2.default);

exports.default = AddSectionView;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BaseElementView = __webpack_require__(10),
    ColumnEmptyView = __webpack_require__(91),
    ColumnView;

ColumnView = BaseElementView.extend({
	template: Marionette.TemplateCache.get('#tmpl-elementor-column-content'),

	emptyView: ColumnEmptyView,

	childViewContainer: '> .elementor-column-wrap > .elementor-widget-wrap',

	toggleEditTools: true,

	behaviors: function behaviors() {
		var behaviors = BaseElementView.prototype.behaviors.apply(this, arguments);

		_.extend(behaviors, {
			Sortable: {
				behaviorClass: __webpack_require__(19),
				elChildType: 'widget'
			},
			Resizable: {
				behaviorClass: __webpack_require__(92)
			}
		});

		return elementor.hooks.applyFilters('elements/column/behaviors', behaviors, this);
	},

	className: function className() {
		var classes = BaseElementView.prototype.className.apply(this, arguments),
		    type = this.isInner() ? 'inner' : 'top';

		return classes + ' elementor-column elementor-' + type + '-column';
	},

	tagName: function tagName() {
		return this.model.getSetting('html_tag') || 'div';
	},

	ui: function ui() {
		var ui = BaseElementView.prototype.ui.apply(this, arguments);

		ui.columnInner = '> .elementor-column-wrap';

		ui.percentsTooltip = '> .elementor-element-overlay .elementor-column-percents-tooltip';

		return ui;
	},

	initialize: function initialize() {
		BaseElementView.prototype.initialize.apply(this, arguments);

		this.addControlValidator('_inline_size', this.onEditorInlineSizeInputChange);
	},

	getContextMenuGroups: function getContextMenuGroups() {
		var groups = BaseElementView.prototype.getContextMenuGroups.apply(this, arguments),
		    generalGroupIndex = groups.indexOf(_.findWhere(groups, { name: 'general' }));

		groups.splice(generalGroupIndex + 1, 0, {
			name: 'addNew',
			actions: [{
				name: 'addNew',
				icon: 'eicon-plus',
				title: elementor.translate('new_column'),
				callback: this.addNewColumn.bind(this)
			}]
		});

		return groups;
	},

	isDroppingAllowed: function isDroppingAllowed() {
		var elementView = elementor.channels.panelElements.request('element:selected');

		if (!elementView) {
			return false;
		}

		var elType = elementView.model.get('elType');

		if ('section' === elType) {
			return !this.isInner();
		}

		return 'widget' === elType;
	},

	getPercentsForDisplay: function getPercentsForDisplay() {
		var inlineSize = +this.model.getSetting('_inline_size') || this.getPercentSize();

		return inlineSize.toFixed(1) + '%';
	},

	changeSizeUI: function changeSizeUI() {
		var self = this,
		    columnSize = self.model.getSetting('_column_size');

		self.$el.attr('data-col', columnSize);

		_.defer(function () {
			// Wait for the column size to be applied
			if (self.ui.percentsTooltip) {
				self.ui.percentsTooltip.text(self.getPercentsForDisplay());
			}
		});
	},

	getPercentSize: function getPercentSize(size) {
		if (!size) {
			size = this.el.getBoundingClientRect().width;
		}

		return +(size / this.$el.parent().width() * 100).toFixed(3);
	},

	getSortableOptions: function getSortableOptions() {
		return {
			connectWith: '.elementor-widget-wrap',
			items: '> .elementor-element'
		};
	},

	changeChildContainerClasses: function changeChildContainerClasses() {
		var emptyClass = 'elementor-element-empty',
		    populatedClass = 'elementor-element-populated';

		if (this.collection.isEmpty()) {
			this.ui.columnInner.removeClass(populatedClass).addClass(emptyClass);
		} else {
			this.ui.columnInner.removeClass(emptyClass).addClass(populatedClass);
		}
	},

	addNewColumn: function addNewColumn() {
		this.trigger('request:add:new');
	},

	// Events
	onCollectionChanged: function onCollectionChanged() {
		BaseElementView.prototype.onCollectionChanged.apply(this, arguments);

		this.changeChildContainerClasses();
	},

	onRender: function onRender() {
		var self = this;

		BaseElementView.prototype.onRender.apply(self, arguments);

		self.changeChildContainerClasses();

		self.changeSizeUI();

		self.$el.html5Droppable({
			items: ' > .elementor-column-wrap > .elementor-widget-wrap > .elementor-element, >.elementor-column-wrap > .elementor-widget-wrap > .elementor-empty-view > .elementor-first-add',
			axis: ['vertical'],
			groups: ['elementor-element'],
			isDroppingAllowed: self.isDroppingAllowed.bind(self),
			currentElementClass: 'elementor-html5dnd-current-element',
			placeholderClass: 'elementor-sortable-placeholder elementor-widget-placeholder',
			hasDraggingOnChildClass: 'elementor-dragging-on-child',
			onDropping: function onDropping(side, event) {
				event.stopPropagation();

				var newIndex = jQuery(this).index();

				if ('bottom' === side) {
					newIndex++;
				}

				self.addElementFromPanel({ at: newIndex });
			}
		});
	},

	onSettingsChanged: function onSettingsChanged(settings) {
		BaseElementView.prototype.onSettingsChanged.apply(this, arguments);

		var changedAttributes = settings.changedAttributes();

		if ('_column_size' in changedAttributes || '_inline_size' in changedAttributes) {
			this.changeSizeUI();
		}
	},

	onEditorInlineSizeInputChange: function onEditorInlineSizeInputChange(newValue, oldValue) {
		var errors = [],
		    columnSize = this.model.getSetting('_column_size');

		// If there's only one column
		if (100 === columnSize) {
			errors.push('Could not resize one column');

			return errors;
		}

		if (!oldValue) {
			oldValue = columnSize;
		}

		try {
			this._parent.resizeChild(this, +oldValue, +newValue);
		} catch (e) {
			if (e.message === this._parent.errors.columnWidthTooLarge) {
				errors.push(e.message);
			}
		}

		return errors;
	},

	onAddButtonClick: function onAddButtonClick(event) {
		event.stopPropagation();

		this.addNewColumn();
	}
});

module.exports = ColumnView;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Marionette.ItemView.extend({
	template: '#tmpl-elementor-empty-preview',

	className: 'elementor-empty-view',

	events: {
		'click': 'onClickAdd'
	},

	behaviors: function behaviors() {
		return {
			contextMenu: {
				behaviorClass: __webpack_require__(11),
				groups: this.getContextMenuGroups()
			}
		};
	},

	getContextMenuGroups: function getContextMenuGroups() {
		return [{
			name: 'general',
			actions: [{
				name: 'paste',
				title: elementor.translate('paste'),
				callback: this.paste.bind(this),
				isEnabled: this.isPasteEnabled.bind(this)
			}]
		}];
	},

	paste: function paste() {
		var self = this,
		    elements = elementor.getStorage('transfer').elements,
		    index = 0;

		elements.forEach(function (item) {
			self._parent.addChildElement(item, { at: index, clone: true });

			index++;
		});
	},

	isPasteEnabled: function isPasteEnabled() {
		var transferData = elementor.getStorage('transfer');

		if (!transferData) {
			return false;
		}

		if ('section' === transferData.elementsType) {
			return transferData.elements[0].isInner && !this._parent.isInner();
		}

		return 'widget' === transferData.elementsType;
	},

	onClickAdd: function onClickAdd() {
		elementor.getPanelView().setPage('elements');
	}
});

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ResizableBehavior;

ResizableBehavior = Marionette.Behavior.extend({
	defaults: {
		handles: elementor.config.is_rtl ? 'w' : 'e'
	},

	events: {
		resizestart: 'onResizeStart',
		resizestop: 'onResizeStop',
		resize: 'onResize'
	},

	initialize: function initialize() {
		Marionette.Behavior.prototype.initialize.apply(this, arguments);

		this.listenTo(elementor.channels.dataEditMode, 'switch', this.onEditModeSwitched);
	},

	active: function active() {
		if (!elementor.userCan('design')) {
			return;
		}
		this.deactivate();

		var options = _.clone(this.options);

		delete options.behaviorClass;

		var $childViewContainer = this.getChildViewContainer(),
		    defaultResizableOptions = {},
		    resizableOptions = _.extend(defaultResizableOptions, options);

		$childViewContainer.resizable(resizableOptions);
	},

	deactivate: function deactivate() {
		if (this.getChildViewContainer().resizable('instance')) {
			this.getChildViewContainer().resizable('destroy');
		}
	},

	onEditModeSwitched: function onEditModeSwitched(activeMode) {
		if ('edit' === activeMode) {
			this.active();
		} else {
			this.deactivate();
		}
	},

	onRender: function onRender() {
		var self = this;

		_.defer(function () {
			self.onEditModeSwitched(elementor.channels.dataEditMode.request('activeMode'));
		});
	},

	onDestroy: function onDestroy() {
		this.deactivate();
	},

	onResizeStart: function onResizeStart(event) {
		event.stopPropagation();

		this.view.$el.data('originalWidth', this.view.el.getBoundingClientRect().width);

		this.view.triggerMethod('request:resize:start', event);
	},

	onResizeStop: function onResizeStop(event) {
		event.stopPropagation();

		this.view.triggerMethod('request:resize:stop');
	},

	onResize: function onResize(event, ui) {
		event.stopPropagation();

		this.view.triggerMethod('request:resize', ui, event);
	},

	getChildViewContainer: function getChildViewContainer() {
		return this.$el;
	}
});

module.exports = ResizableBehavior;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var RevisionsCollection = __webpack_require__(94),
    RevisionsManager;

RevisionsManager = function RevisionsManager() {
	var self = this,
	    revisions;

	this.getItems = function () {
		return revisions;
	};

	var onEditorSaved = function onEditorSaved(data) {
		if (data.latest_revisions) {
			self.addRevisions(data.latest_revisions);
		}

		if (data.revisions_ids) {
			var revisionsToKeep = revisions.filter(function (revision) {
				return -1 !== data.revisions_ids.indexOf(revision.get('id'));
			});

			revisions.reset(revisionsToKeep);
		}
	};

	var attachEvents = function attachEvents() {
		elementor.channels.editor.on('saved', onEditorSaved);
	};

	var addHotKeys = function addHotKeys() {
		var UP_ARROW_KEY = 38,
		    DOWN_ARROW_KEY = 40;

		var navigationHandler = {
			isWorthHandling: function isWorthHandling() {
				var panel = elementor.getPanelView();

				if ('historyPage' !== panel.getCurrentPageName()) {
					return false;
				}

				var revisionsTab = panel.getCurrentPageView().getCurrentTab();

				return revisionsTab.currentPreviewId && revisionsTab.currentPreviewItem && revisionsTab.children.length > 1;
			},
			handle: function handle(event) {
				elementor.getPanelView().getCurrentPageView().getCurrentTab().navigate(UP_ARROW_KEY === event.which);
			}
		};

		elementor.hotKeys.addHotKeyHandler(UP_ARROW_KEY, 'revisionNavigation', navigationHandler);

		elementor.hotKeys.addHotKeyHandler(DOWN_ARROW_KEY, 'revisionNavigation', navigationHandler);
	};

	this.setEditorData = function (data) {
		var collection = elementor.getRegion('sections').currentView.collection;

		// Don't track in history.
		elementor.history.history.setActive(false);
		collection.reset(data);
		elementor.history.history.setActive(true);
	};

	this.getRevisionDataAsync = function (id, options) {
		_.extend(options, {
			data: {
				id: id
			}
		});

		return elementor.ajax.send('get_revision_data', options);
	};

	this.addRevisions = function (items) {
		items.forEach(function (item) {
			var existedModel = revisions.findWhere({
				id: item.id
			});

			if (existedModel) {
				revisions.remove(existedModel);
			}

			revisions.add(item);
		});
	};

	this.deleteRevision = function (revisionModel, options) {
		var params = {
			data: {
				id: revisionModel.get('id')
			},
			success: function success() {
				if (options.success) {
					options.success();
				}

				revisionModel.destroy();

				if (!revisions.length) {
					var panel = elementor.getPanelView();
					if ('historyPage' === panel.getCurrentPageName()) {
						panel.getCurrentPageView().activateTab('revisions');
					}
				}
			}
		};

		if (options.error) {
			params.error = options.error;
		}

		elementor.ajax.send('delete_revision', params);
	};

	this.init = function () {
		revisions = new RevisionsCollection(elementor.config.revisions);

		attachEvents();

		addHotKeys();
	};
};

module.exports = new RevisionsManager();

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var RevisionModel = __webpack_require__(95);

module.exports = Backbone.Collection.extend({
	model: RevisionModel,
	comparator: function comparator(model) {
		return -model.get('timestamp');
	}
});

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var RevisionModel;

RevisionModel = Backbone.Model.extend();

RevisionModel.prototype.sync = function () {
	return null;
};

module.exports = RevisionModel;

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Marionette.Behavior.extend({
	previewWindow: null,

	ui: function ui() {
		return {
			buttonPreview: '#elementor-panel-saver-button-preview',
			buttonPublish: '#elementor-panel-saver-button-publish',
			buttonSaveOptions: '#elementor-panel-saver-button-save-options',
			buttonPublishLabel: '#elementor-panel-saver-button-publish-label',
			menuSaveDraft: '#elementor-panel-saver-menu-save-draft',
			lastEditedWrapper: '.elementor-last-edited-wrapper'
		};
	},

	events: function events() {
		return {
			'click @ui.buttonPreview': 'onClickButtonPreview',
			'click @ui.buttonPublish': 'onClickButtonPublish',
			'click @ui.menuSaveDraft': 'onClickMenuSaveDraft'
		};
	},

	initialize: function initialize() {
		elementor.saver.on('before:save', this.onBeforeSave.bind(this)).on('after:save', this.onAfterSave.bind(this)).on('after:saveError', this.onAfterSaveError.bind(this)).on('page:status:change', this.onPageStatusChange);

		elementor.settings.page.model.on('change', this.onPageSettingsChange.bind(this));

		elementor.channels.editor.on('status:change', this.activateSaveButtons.bind(this));
	},

	activateSaveButtons: function activateSaveButtons(hasChanges) {
		hasChanges = hasChanges || 'draft' === elementor.settings.page.model.get('post_status');

		this.ui.buttonPublish.add(this.ui.menuSaveDraft).toggleClass('elementor-saver-disabled', !hasChanges);
		this.ui.buttonSaveOptions.toggleClass('elementor-saver-disabled', !hasChanges);
	},

	onRender: function onRender() {
		this.setMenuItems(elementor.settings.page.model.get('post_status'));
		this.addTooltip();
	},

	onPageSettingsChange: function onPageSettingsChange(settings) {
		var changed = settings.changed;

		if (!_.isUndefined(changed.post_status)) {
			this.setMenuItems(changed.post_status);

			this.refreshWpPreview();

			// Refresh page-settings post-status value.
			if ('page_settings' === elementor.getPanelView().getCurrentPageName()) {
				elementor.getPanelView().getCurrentPageView().render();
			}
		}
	},

	onPageStatusChange: function onPageStatusChange(newStatus) {
		if ('publish' === newStatus) {
			elementor.notifications.showToast({
				message: elementor.config.document.panel.messages.publish_notification,
				buttons: [{
					name: 'view_page',
					text: elementor.translate('have_a_look'),
					callback: function callback() {
						open(elementor.config.document.urls.permalink);
					}
				}]
			});
		}
	},

	onBeforeSave: function onBeforeSave(options) {
		NProgress.start();
		if ('autosave' === options.status) {
			this.ui.lastEditedWrapper.addClass('elementor-state-active');
		} else {
			this.ui.buttonPublish.addClass('elementor-button-state');
		}
	},

	onAfterSave: function onAfterSave(data) {
		NProgress.done();
		this.ui.buttonPublish.removeClass('elementor-button-state');
		this.ui.lastEditedWrapper.removeClass('elementor-state-active');
		this.refreshWpPreview();
		this.setLastEdited(data);
	},

	setLastEdited: function setLastEdited(data) {
		this.ui.lastEditedWrapper.removeClass('elementor-button-state').find('.elementor-last-edited').html(data.config.last_edited);
	},

	onAfterSaveError: function onAfterSaveError() {
		NProgress.done();
		this.ui.buttonPublish.removeClass('elementor-button-state');
	},

	onClickButtonPreview: function onClickButtonPreview() {
		// Open immediately in order to avoid popup blockers.
		this.previewWindow = open(elementor.config.document.urls.wp_preview, 'wp-preview-' + elementor.config.document.id);

		if (elementor.saver.isEditorChanged()) {
			// Force save even if it's saving now.
			if (elementor.saver.isSaving) {
				elementor.saver.isSaving = false;
			}

			elementor.saver.doAutoSave();
		}
	},

	onClickButtonPublish: function onClickButtonPublish() {
		var postStatus = elementor.settings.page.model.get('post_status');

		if (this.ui.buttonPublish.hasClass('elementor-saver-disabled')) {
			return;
		}

		switch (postStatus) {
			case 'publish':
			case 'private':
				elementor.saver.update();
				break;
			case 'draft':
				if (elementor.config.current_user_can_publish) {
					elementor.saver.publish();
				} else {
					elementor.saver.savePending();
				}
				break;
			case 'pending': // User cannot change post status
			case undefined:
				// TODO: as a contributor it's undefined instead of 'pending'.
				if (elementor.config.current_user_can_publish) {
					elementor.saver.publish();
				} else {
					elementor.saver.update();
				}
				break;
		}
	},

	onClickMenuSaveDraft: function onClickMenuSaveDraft() {
		elementor.saver.saveDraft();
	},

	setMenuItems: function setMenuItems(postStatus) {
		var publishLabel = 'publish';

		switch (postStatus) {
			case 'publish':
			case 'private':
				publishLabel = 'update';

				if (elementor.config.current_revision_id !== elementor.config.document.id) {
					this.activateSaveButtons(true);
				}

				break;
			case 'draft':
				if (!elementor.config.current_user_can_publish) {
					publishLabel = 'submit';
				}

				this.activateSaveButtons(true);
				break;
			case 'pending': // User cannot change post status
			case undefined:
				// TODO: as a contributor it's undefined instead of 'pending'.
				if (!elementor.config.current_user_can_publish) {
					publishLabel = 'update';
				}
				break;
		}

		this.ui.buttonPublishLabel.html(elementor.translate(publishLabel));
	},

	addTooltip: function addTooltip() {
		// Create tooltip on controls
		this.$el.find('.tooltip-target').tipsy({
			// `n` for down, `s` for up
			gravity: 's',
			title: function title() {
				return this.getAttribute('data-tooltip');
			}
		});
	},

	refreshWpPreview: function refreshWpPreview() {
		if (this.previewWindow) {
			// Refresh URL form updated config.
			try {
				this.previewWindow.location.href = elementor.config.document.urls.wp_preview;
			} catch (e) {
				// If the this.previewWindow is closed or it's domain was changed.
				// Do nothing.
			}
		}
	}
});

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TagPanelView = __webpack_require__(98);

module.exports = Marionette.Behavior.extend({

	tagView: null,

	listenerAttached: false,

	ui: {
		tagArea: '.elementor-control-tag-area',
		dynamicSwitcher: '.elementor-control-dynamic-switcher'
	},

	events: {
		'click @ui.dynamicSwitcher': 'onDynamicSwitcherClick'
	},

	initialize: function initialize() {
		if (!this.listenerAttached) {
			this.listenTo(this.view.options.elementSettingsModel, 'change:external:__dynamic__', this.onAfterExternalChange);
			this.listenerAttached = true;
		}
	},

	renderTools: function renderTools() {
		if (this.getOption('dynamicSettings')['default']) {
			return;
		}

		var $dynamicSwitcher = jQuery(Marionette.Renderer.render('#tmpl-elementor-control-dynamic-switcher'));

		this.ui.controlTitle[this.view.model.get('label_block') ? 'after' : 'before']($dynamicSwitcher);

		this.ui.dynamicSwitcher = this.$el.find(this.ui.dynamicSwitcher.selector);
	},

	toggleDynamicClass: function toggleDynamicClass() {
		this.$el.toggleClass('elementor-control-dynamic-value', this.isDynamicMode());
	},

	isDynamicMode: function isDynamicMode() {
		var dynamicSettings = this.view.elementSettingsModel.get('__dynamic__');

		return !!(dynamicSettings && dynamicSettings[this.view.model.get('name')]);
	},

	createTagsList: function createTagsList() {
		var tags = _.groupBy(this.getOption('tags'), 'group'),
		    groups = elementor.dynamicTags.getConfig('groups'),
		    $tagsList = this.ui.tagsList = jQuery('<div>', { 'class': 'elementor-tags-list' }),
		    $tagsListInner = jQuery('<div>', { 'class': 'elementor-tags-list__inner' });

		$tagsList.append($tagsListInner);

		jQuery.each(groups, function (groupName) {
			var groupTags = tags[groupName];

			if (!groupTags) {
				return;
			}

			var group = this,
			    $groupTitle = jQuery('<div>', { 'class': 'elementor-tags-list__group-title' }).text(group.title);

			$tagsListInner.append($groupTitle);

			groupTags.forEach(function (tag) {
				var $tag = jQuery('<div>', { 'class': 'elementor-tags-list__item' });

				$tag.text(tag.title).attr('data-tag-name', tag.name);

				$tagsListInner.append($tag);
			});
		});

		$tagsListInner.on('click', '.elementor-tags-list__item', this.onTagsListItemClick.bind(this));

		elementor.$body.append($tagsList);
	},

	getTagsList: function getTagsList() {
		if (!this.ui.tagsList) {
			this.createTagsList();
		}

		return this.ui.tagsList;
	},

	toggleTagsList: function toggleTagsList() {
		var $tagsList = this.getTagsList();

		if ($tagsList.is(':visible')) {
			$tagsList.hide();

			return;
		}

		$tagsList.show().position({
			my: 'right top',
			at: 'right bottom+5',
			of: this.ui.dynamicSwitcher
		});
	},

	setTagView: function setTagView(id, name, settings) {
		if (this.tagView) {
			this.tagView.destroy();
		}

		var tagView = this.tagView = new TagPanelView({
			id: id,
			name: name,
			settings: settings,
			dynamicSettings: this.getOption('dynamicSettings')
		});

		tagView.render();

		this.ui.tagArea.after(tagView.el);

		this.listenTo(tagView.model, 'change', this.onTagViewModelChange.bind(this)).listenTo(tagView, 'remove', this.onTagViewRemove.bind(this));
	},

	setDefaultTagView: function setDefaultTagView() {
		var tagData = elementor.dynamicTags.tagTextToTagData(this.getDynamicValue());

		this.setTagView(tagData.id, tagData.name, tagData.settings);
	},

	tagViewToTagText: function tagViewToTagText() {
		var tagView = this.tagView;

		return elementor.dynamicTags.tagDataToTagText(tagView.getOption('id'), tagView.getOption('name'), tagView.model);
	},

	getDynamicValue: function getDynamicValue() {
		return this.view.elementSettingsModel.get('__dynamic__')[this.view.model.get('name')];
	},

	getDynamicControlSettings: function getDynamicControlSettings() {
		return {
			control: {
				name: '__dynamic__',
				label: this.view.model.get('label')
			}
		};
	},

	setDynamicValue: function setDynamicValue(value) {
		var settingKey = this.view.model.get('name'),
		    dynamicSettings = this.view.elementSettingsModel.get('__dynamic__') || {};

		dynamicSettings = elementor.helpers.cloneObject(dynamicSettings);

		dynamicSettings[settingKey] = value;

		this.view.elementSettingsModel.set('__dynamic__', dynamicSettings, this.getDynamicControlSettings(settingKey));

		this.toggleDynamicClass();
	},

	destroyTagView: function destroyTagView() {
		if (this.tagView) {
			this.tagView.destroy();

			this.tagView = null;
		}
	},

	onRender: function onRender() {
		this.$el.addClass('elementor-control-dynamic');

		this.renderTools();

		this.toggleDynamicClass();

		if (this.isDynamicMode()) {
			this.setDefaultTagView();
		}
	},

	onDynamicSwitcherClick: function onDynamicSwitcherClick() {
		this.toggleTagsList();
	},

	onTagsListItemClick: function onTagsListItemClick(event) {
		var $tag = jQuery(event.currentTarget);

		this.setTagView(elementor.helpers.getUniqueID(), $tag.data('tagName'), {});

		this.setDynamicValue(this.tagViewToTagText());

		this.toggleTagsList();

		if (this.tagView.getTagConfig().settings_required) {
			this.tagView.showSettingsPopup();
		}
	},

	onTagViewModelChange: function onTagViewModelChange() {
		this.setDynamicValue(this.tagViewToTagText());
	},

	onTagViewRemove: function onTagViewRemove() {
		var settingKey = this.view.model.get('name'),
		    dynamicSettings = this.view.elementSettingsModel.get('__dynamic__');

		dynamicSettings = elementor.helpers.cloneObject(dynamicSettings);

		delete dynamicSettings[settingKey];

		if (Object.keys(dynamicSettings).length) {
			this.view.elementSettingsModel.set('__dynamic__', dynamicSettings, this.getDynamicControlSettings(settingKey));
		} else {
			this.view.elementSettingsModel.unset('__dynamic__', this.getDynamicControlSettings(settingKey));
		}

		this.toggleDynamicClass();
	},

	onAfterExternalChange: function onAfterExternalChange() {
		this.destroyTagView();

		if (this.isDynamicMode()) {
			this.setDefaultTagView();
		}

		this.toggleDynamicClass();
	},

	onDestroy: function onDestroy() {
		this.destroyTagView();
	}
});

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TagControlsStack = __webpack_require__(99),
    SettingsModel = __webpack_require__(3);

module.exports = Marionette.ItemView.extend({

	className: 'elementor-dynamic-cover elementor-input-style',

	tagControlsStack: null,

	templateHelpers: function templateHelpers() {
		var helpers = {};
		if (this.model) {
			helpers.controls = this.model.options.controls;
		}

		return helpers;
	},

	ui: {
		remove: '.elementor-dynamic-cover__remove'
	},

	events: function events() {
		var events = {
			'click @ui.remove': 'onRemoveClick'
		};

		if (this.hasSettings()) {
			events.click = 'onClick';
		}

		return events;
	},

	getTemplate: function getTemplate() {
		var config = this.getTagConfig(),
		    templateFunction = Marionette.TemplateCache.get('#tmpl-elementor-control-dynamic-cover'),
		    renderedTemplate = Marionette.Renderer.render(templateFunction, {
			hasSettings: this.hasSettings(),
			isRemovable: !this.getOption('dynamicSettings')['default'],
			title: config.title,
			content: config.panel_template
		});

		return Marionette.TemplateCache.prototype.compileTemplate(renderedTemplate.trim());
	},

	getTagConfig: function getTagConfig() {
		return elementor.dynamicTags.getConfig('tags.' + this.getOption('name'));
	},

	initSettingsPopup: function initSettingsPopup() {
		var settingsPopupOptions = {
			className: 'elementor-tag-settings-popup',
			position: {
				my: 'left top+5',
				at: 'left bottom',
				of: this.$el,
				autoRefresh: true
			}
		};

		var settingsPopup = elementor.dialogsManager.createWidget('buttons', settingsPopupOptions);

		this.getSettingsPopup = function () {
			return settingsPopup;
		};
	},

	hasSettings: function hasSettings() {
		return !!Object.values(this.getTagConfig().controls).length;
	},

	showSettingsPopup: function showSettingsPopup() {
		if (!this.tagControlsStack) {
			this.initTagControlsStack();
		}

		var settingsPopup = this.getSettingsPopup();

		if (settingsPopup.isVisible()) {
			return;
		}

		settingsPopup.show();
	},

	initTagControlsStack: function initTagControlsStack() {
		this.tagControlsStack = new TagControlsStack({
			model: this.model,
			controls: this.model.controls,
			el: this.getSettingsPopup().getElements('message')[0]
		});

		this.tagControlsStack.render();
	},

	initModel: function initModel() {
		this.model = new SettingsModel(this.getOption('settings'), {
			controls: this.getTagConfig().controls
		});
	},

	initialize: function initialize() {
		if (!this.hasSettings()) {
			return;
		}

		this.initModel();

		this.initSettingsPopup();

		this.listenTo(this.model, 'change', this.render);
	},

	onClick: function onClick() {
		this.showSettingsPopup();
	},

	onRemoveClick: function onRemoveClick(event) {
		event.stopPropagation();

		this.destroy();

		this.trigger('remove');
	},

	onDestroy: function onDestroy() {
		if (this.hasSettings()) {
			this.getSettingsPopup().destroy();
		}
	}
});

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ControlsStack = __webpack_require__(12),
    EmptyView = __webpack_require__(100);

module.exports = ControlsStack.extend({
	activeTab: 'content',

	template: _.noop,

	emptyView: EmptyView,

	isEmpty: function isEmpty() {
		// Ignore the section control
		return this.collection.length < 2;
	},

	childViewOptions: function childViewOptions() {
		return {
			elementSettingsModel: this.model
		};
	},

	onRenderTemplate: function onRenderTemplate() {
		this.activateFirstSection();
	}
});

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Marionette.ItemView.extend({
	className: 'elementor-tag-controls-stack-empty',

	template: '#tmpl-elementor-tag-controls-stack-empty'
});

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ControlBaseView = __webpack_require__(7);

module.exports = ControlBaseView.extend({

	ui: function ui() {
		var ui = ControlBaseView.prototype.ui.apply(this, arguments);

		ui.button = 'button';

		return ui;
	},

	events: {
		'click @ui.button': 'onButtonClick'
	},

	onButtonClick: function onButtonClick() {
		var eventName = this.model.get('event');

		elementor.channels.editor.trigger(eventName, this);
	}
});

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ControlBaseDataView = __webpack_require__(0),
    ControlCodeEditorItemView;

ControlCodeEditorItemView = ControlBaseDataView.extend({

	ui: function ui() {
		var ui = ControlBaseDataView.prototype.ui.apply(this, arguments);

		ui.editor = '.elementor-code-editor';

		return ui;
	},

	onReady: function onReady() {
		var self = this;

		if ('undefined' === typeof ace) {
			return;
		}

		var langTools = ace.require('ace/ext/language_tools');

		self.editor = ace.edit(this.ui.editor[0]);

		jQuery(self.editor.container).addClass('elementor-input-style elementor-code-editor');

		self.editor.setOptions({
			mode: 'ace/mode/' + self.model.attributes.language,
			minLines: 10,
			maxLines: Infinity,
			showGutter: true,
			useWorker: true,
			enableBasicAutocompletion: true,
			enableLiveAutocompletion: true
		});

		self.editor.getSession().setUseWrapMode(true);

		elementor.panel.$el.on('resize.aceEditor', self.onResize.bind(this));

		if ('css' === self.model.attributes.language) {
			var selectorCompleter = {
				getCompletions: function getCompletions(editor, session, pos, prefix, callback) {
					var list = [],
					    token = session.getTokenAt(pos.row, pos.column);

					if (0 < prefix.length && 'selector'.match(prefix) && 'constant' === token.type) {
						list = [{
							name: 'selector',
							value: 'selector',
							score: 1,
							meta: 'Elementor'
						}];
					}

					callback(null, list);
				}
			};

			langTools.addCompleter(selectorCompleter);
		}

		self.editor.setValue(self.getControlValue(), -1); // -1 =  move cursor to the start

		self.editor.on('change', function () {
			self.setValue(self.editor.getValue());
		});

		if ('html' === self.model.attributes.language) {
			// Remove the `doctype` annotation
			var session = self.editor.getSession();

			session.on('changeAnnotation', function () {
				var annotations = session.getAnnotations() || [],
				    annotationsLength = annotations.length,
				    index = annotations.length;

				while (index--) {
					if (/doctype first\. Expected/.test(annotations[index].text)) {
						annotations.splice(index, 1);
					}
				}

				if (annotationsLength > annotations.length) {
					session.setAnnotations(annotations);
				}
			});
		}
	},

	onResize: function onResize() {
		this.editor.resize();
	},

	onDestroy: function onDestroy() {
		elementor.panel.$el.off('resize.aceEditor');
	}
});

module.exports = ControlCodeEditorItemView;

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ControlBaseDataView = __webpack_require__(0),
    ControlColorItemView;

ControlColorItemView = ControlBaseDataView.extend({
	applySavedValue: function applySavedValue() {
		ControlBaseDataView.prototype.applySavedValue.apply(this, arguments);

		var self = this,
		    value = self.getControlValue(),
		    colorInstance = self.ui.input.wpColorPicker('instance');

		if (colorInstance) {
			self.ui.input.wpColorPicker('color', value);

			if (!value) {
				// Trigger `change` event manually, since it will not be triggered automatically on empty value
				self.ui.input.data('a8cIris')._change();
			}
		} else {
			elementor.helpers.wpColorPicker(self.ui.input, {
				change: function change() {
					self.setValue(self.ui.input.wpColorPicker('color'));
				},
				clear: function clear() {
					self.setValue('');
				}
			});
		}
	},

	onBeforeDestroy: function onBeforeDestroy() {
		if (this.ui.input.wpColorPicker('instance')) {
			this.ui.input.wpColorPicker('close');
		}

		this.$el.remove();
	}
});

module.exports = ControlColorItemView;

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ControlBaseDataView = __webpack_require__(0),
    ControlDateTimePickerItemView;

ControlDateTimePickerItemView = ControlBaseDataView.extend({

	onReady: function onReady() {
		var self = this;

		var options = _.extend({
			onClose: function onClose() {
				self.saveValue();
			},
			enableTime: true,
			minuteIncrement: 1
		}, this.model.get('picker_options'));

		this.ui.input.flatpickr(options);
	},

	saveValue: function saveValue() {
		this.setValue(this.ui.input.val());
	},

	onBeforeDestroy: function onBeforeDestroy() {
		this.saveValue();
		this.ui.input.flatpickr().destroy();
	}
});

module.exports = ControlDateTimePickerItemView;

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ControlBaseUnitsItemView = __webpack_require__(34),
    ControlDimensionsItemView;

ControlDimensionsItemView = ControlBaseUnitsItemView.extend({
	ui: function ui() {
		var ui = ControlBaseUnitsItemView.prototype.ui.apply(this, arguments);

		ui.controls = '.elementor-control-dimension > input:enabled';
		ui.link = 'button.elementor-link-dimensions';

		return ui;
	},

	events: function events() {
		return _.extend(ControlBaseUnitsItemView.prototype.events.apply(this, arguments), {
			'click @ui.link': 'onLinkDimensionsClicked'
		});
	},

	defaultDimensionValue: 0,

	initialize: function initialize() {
		ControlBaseUnitsItemView.prototype.initialize.apply(this, arguments);

		// TODO: Need to be in helpers, and not in variable
		this.model.set('allowed_dimensions', this.filterDimensions(this.model.get('allowed_dimensions')));
	},

	getPossibleDimensions: function getPossibleDimensions() {
		return ['top', 'right', 'bottom', 'left'];
	},

	filterDimensions: function filterDimensions(filter) {
		filter = filter || 'all';

		var dimensions = this.getPossibleDimensions();

		if ('all' === filter) {
			return dimensions;
		}

		if (!_.isArray(filter)) {
			if ('horizontal' === filter) {
				filter = ['right', 'left'];
			} else if ('vertical' === filter) {
				filter = ['top', 'bottom'];
			}
		}

		return filter;
	},

	onReady: function onReady() {
		var self = this,
		    currentValue = self.getControlValue();

		if (!self.isLinkedDimensions()) {
			self.ui.link.addClass('unlinked');

			self.ui.controls.each(function (index, element) {
				var value = currentValue[element.dataset.setting];

				if (_.isEmpty(value)) {
					value = self.defaultDimensionValue;
				}

				self.$(element).val(value);
			});
		}

		self.fillEmptyDimensions();
	},

	updateDimensionsValue: function updateDimensionsValue() {
		var currentValue = {},
		    dimensions = this.getPossibleDimensions(),
		    $controls = this.ui.controls,
		    defaultDimensionValue = this.defaultDimensionValue;

		dimensions.forEach(function (dimension) {
			var $element = $controls.filter('[data-setting="' + dimension + '"]');

			currentValue[dimension] = $element.length ? $element.val() : defaultDimensionValue;
		});

		this.setValue(currentValue);
	},

	fillEmptyDimensions: function fillEmptyDimensions() {
		var dimensions = this.getPossibleDimensions(),
		    allowedDimensions = this.model.get('allowed_dimensions'),
		    $controls = this.ui.controls,
		    defaultDimensionValue = this.defaultDimensionValue;

		if (this.isLinkedDimensions()) {
			return;
		}

		dimensions.forEach(function (dimension) {
			var $element = $controls.filter('[data-setting="' + dimension + '"]'),
			    isAllowedDimension = -1 !== _.indexOf(allowedDimensions, dimension);

			if (isAllowedDimension && $element.length && _.isEmpty($element.val())) {
				$element.val(defaultDimensionValue);
			}
		});
	},

	updateDimensions: function updateDimensions() {
		this.fillEmptyDimensions();
		this.updateDimensionsValue();
	},

	resetDimensions: function resetDimensions() {
		this.ui.controls.val('');

		this.updateDimensionsValue();
	},

	onInputChange: function onInputChange(event) {
		var inputSetting = event.target.dataset.setting;

		if ('unit' === inputSetting) {
			this.resetDimensions();
		}

		if (!_.contains(this.getPossibleDimensions(), inputSetting)) {
			return;
		}

		if (this.isLinkedDimensions()) {
			var $thisControl = this.$(event.target);

			this.ui.controls.val($thisControl.val());
		}

		this.updateDimensions();
	},

	onLinkDimensionsClicked: function onLinkDimensionsClicked(event) {
		event.preventDefault();
		event.stopPropagation();

		this.ui.link.toggleClass('unlinked');

		this.setValue('isLinked', !this.ui.link.hasClass('unlinked'));

		if (this.isLinkedDimensions()) {
			// Set all controls value from the first control.
			this.ui.controls.val(this.ui.controls.eq(0).val());
		}

		this.updateDimensions();
	},

	isLinkedDimensions: function isLinkedDimensions() {
		return this.getControlValue('isLinked');
	}
});

module.exports = ControlDimensionsItemView;

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ControlSelect2View = __webpack_require__(6);

module.exports = ControlSelect2View.extend({
	getSelect2Options: function getSelect2Options() {
		return {
			dir: elementor.config.is_rtl ? 'rtl' : 'ltr'
		};
	},

	templateHelpers: function templateHelpers() {
		var helpers = ControlSelect2View.prototype.templateHelpers.apply(this, arguments),
		    fonts = this.model.get('options');

		helpers.getFontsByGroups = function (groups) {
			var filteredFonts = {};

			_.each(fonts, function (fontType, fontName) {
				if (_.isArray(groups) && _.contains(groups, fontType) || fontType === groups) {
					filteredFonts[fontName] = fontName;
				}
			});

			return filteredFonts;
		};

		return helpers;
	}
});

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ControlBaseDataView = __webpack_require__(0),
    ControlMediaItemView;

ControlMediaItemView = ControlBaseDataView.extend({
	ui: function ui() {
		var ui = ControlBaseDataView.prototype.ui.apply(this, arguments);

		ui.addImages = '.elementor-control-gallery-add';
		ui.clearGallery = '.elementor-control-gallery-clear';
		ui.galleryThumbnails = '.elementor-control-gallery-thumbnails';
		ui.status = '.elementor-control-gallery-status-title';

		return ui;
	},

	events: function events() {
		return _.extend(ControlBaseDataView.prototype.events.apply(this, arguments), {
			'click @ui.addImages': 'onAddImagesClick',
			'click @ui.clearGallery': 'onClearGalleryClick',
			'click @ui.galleryThumbnails': 'onGalleryThumbnailsClick'
		});
	},

	onReady: function onReady() {
		this.initRemoveDialog();
	},

	applySavedValue: function applySavedValue() {
		var images = this.getControlValue(),
		    imagesCount = images.length,
		    hasImages = !!imagesCount;

		this.$el.toggleClass('elementor-gallery-has-images', hasImages).toggleClass('elementor-gallery-empty', !hasImages);

		var $galleryThumbnails = this.ui.galleryThumbnails;

		$galleryThumbnails.empty();

		this.ui.status.text(elementor.translate(hasImages ? 'gallery_images_selected' : 'gallery_no_images_selected', [imagesCount]));

		if (!hasImages) {
			return;
		}

		this.getControlValue().forEach(function (image) {
			var $thumbnail = jQuery('<div>', { 'class': 'elementor-control-gallery-thumbnail' });

			$thumbnail.css('background-image', 'url(' + image.url + ')');

			$galleryThumbnails.append($thumbnail);
		});
	},

	hasImages: function hasImages() {
		return !!this.getControlValue().length;
	},

	openFrame: function openFrame(action) {
		this.initFrame(action);

		this.frame.open();
	},

	initFrame: function initFrame(action) {
		var frameStates = {
			create: 'gallery',
			add: 'gallery-library',
			edit: 'gallery-edit'
		};

		var options = {
			frame: 'post',
			multiple: true,
			state: frameStates[action],
			button: {
				text: elementor.translate('insert_media')
			}
		};

		if (this.hasImages()) {
			options.selection = this.fetchSelection();
		}

		this.frame = wp.media(options);

		// When a file is selected, run a callback.
		this.frame.on({
			'update': this.select,
			'menu:render:default': this.menuRender,
			'content:render:browse': this.gallerySettings
		}, this);
	},

	menuRender: function menuRender(view) {
		view.unset('insert');
		view.unset('featured-image');
	},

	gallerySettings: function gallerySettings(browser) {
		browser.sidebar.on('ready', function () {
			browser.sidebar.unset('gallery');
		});
	},

	fetchSelection: function fetchSelection() {
		var attachments = wp.media.query({
			orderby: 'post__in',
			order: 'ASC',
			type: 'image',
			perPage: -1,
			post__in: _.pluck(this.getControlValue(), 'id')
		});

		return new wp.media.model.Selection(attachments.models, {
			props: attachments.props.toJSON(),
			multiple: true
		});
	},

	/**
  * Callback handler for when an attachment is selected in the media modal.
  * Gets the selected image information, and sets it within the control.
  */
	select: function select(selection) {
		var images = [];

		selection.each(function (image) {
			images.push({
				id: image.get('id'),
				url: image.get('url')
			});
		});

		this.setValue(images);

		this.applySavedValue();
	},

	onBeforeDestroy: function onBeforeDestroy() {
		if (this.frame) {
			this.frame.off();
		}

		this.$el.remove();
	},

	resetGallery: function resetGallery() {
		this.setValue('');

		this.applySavedValue();
	},

	initRemoveDialog: function initRemoveDialog() {
		var removeDialog;

		this.getRemoveDialog = function () {
			if (!removeDialog) {
				removeDialog = elementor.dialogsManager.createWidget('confirm', {
					message: elementor.translate('dialog_confirm_gallery_delete'),
					headerMessage: elementor.translate('delete_gallery'),
					strings: {
						confirm: elementor.translate('delete'),
						cancel: elementor.translate('cancel')
					},
					defaultOption: 'confirm',
					onConfirm: this.resetGallery.bind(this)
				});
			}

			return removeDialog;
		};
	},

	onAddImagesClick: function onAddImagesClick() {
		this.openFrame(this.hasImages() ? 'add' : 'create');
	},

	onClearGalleryClick: function onClearGalleryClick() {
		this.getRemoveDialog().show();
	},

	onGalleryThumbnailsClick: function onGalleryThumbnailsClick() {
		this.openFrame('edit');
	}
});

module.exports = ControlMediaItemView;

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ControlSelect2View = __webpack_require__(6),
    ControlIconView;

ControlIconView = ControlSelect2View.extend({

	initialize: function initialize() {
		ControlSelect2View.prototype.initialize.apply(this, arguments);

		this.filterIcons();
	},

	filterIcons: function filterIcons() {
		var icons = this.model.get('options'),
		    include = this.model.get('include'),
		    exclude = this.model.get('exclude');

		if (include) {
			var filteredIcons = {};

			_.each(include, function (iconKey) {
				filteredIcons[iconKey] = icons[iconKey];
			});

			this.model.set('options', filteredIcons);
			return;
		}

		if (exclude) {
			_.each(exclude, function (iconKey) {
				delete icons[iconKey];
			});
		}
	},

	iconsList: function iconsList(icon) {
		if (!icon.id) {
			return icon.text;
		}

		return jQuery('<span><i class="' + icon.id + '"></i> ' + icon.text + '</span>');
	},

	getSelect2Options: function getSelect2Options() {
		return {
			allowClear: true,
			templateResult: this.iconsList.bind(this),
			templateSelection: this.iconsList.bind(this)
		};
	}
});

module.exports = ControlIconView;

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ControlMultipleBaseItemView = __webpack_require__(4),
    ControlImageDimensionsItemView;

ControlImageDimensionsItemView = ControlMultipleBaseItemView.extend({
	ui: function ui() {
		return {
			inputWidth: 'input[data-setting="width"]',
			inputHeight: 'input[data-setting="height"]',

			btnApply: 'button.elementor-image-dimensions-apply-button'
		};
	},

	// Override the base events
	events: function events() {
		return {
			'click @ui.btnApply': 'onApplyClicked'
		};
	},

	onApplyClicked: function onApplyClicked(event) {
		event.preventDefault();

		this.setValue({
			width: this.ui.inputWidth.val(),
			height: this.ui.inputHeight.val()
		});
	}
});

module.exports = ControlImageDimensionsItemView;

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ControlMultipleBaseItemView = __webpack_require__(4),
    ControlMediaItemView;

ControlMediaItemView = ControlMultipleBaseItemView.extend({
	ui: function ui() {
		var ui = ControlMultipleBaseItemView.prototype.ui.apply(this, arguments);

		ui.controlMedia = '.elementor-control-media';
		ui.mediaImage = '.elementor-control-media-image';
		ui.mediaVideo = '.elementor-control-media-video';
		ui.frameOpeners = '.elementor-control-preview-area';
		ui.deleteButton = '.elementor-control-media-delete';

		return ui;
	},

	events: function events() {
		return _.extend(ControlMultipleBaseItemView.prototype.events.apply(this, arguments), {
			'click @ui.frameOpeners': 'openFrame',
			'click @ui.deleteButton': 'deleteImage'
		});
	},

	getMediaType: function getMediaType() {
		return this.model.get('media_type');
	},

	applySavedValue: function applySavedValue() {
		var url = this.getControlValue('url'),
		    mediaType = this.getMediaType();

		if ('image' === mediaType) {
			this.ui.mediaImage.css('background-image', url ? 'url(' + url + ')' : '');
		} else if ('video' === mediaType) {
			this.ui.mediaVideo.attr('src', url);
		}

		this.ui.controlMedia.toggleClass('elementor-media-empty', !url);
	},

	openFrame: function openFrame() {
		if (!this.frame) {
			this.initFrame();
		}

		this.frame.open();
	},

	deleteImage: function deleteImage(event) {
		event.stopPropagation();

		this.setValue({
			url: '',
			id: ''
		});

		this.applySavedValue();
	},

	/**
  * Create a media modal select frame, and store it so the instance can be reused when needed.
  */
	initFrame: function initFrame() {
		// Set current doc id to attach uploaded images.
		wp.media.view.settings.post.id = elementor.config.document.id;
		this.frame = wp.media({
			button: {
				text: elementor.translate('insert_media')
			},
			states: [new wp.media.controller.Library({
				title: elementor.translate('insert_media'),
				library: wp.media.query({ type: this.getMediaType() }),
				multiple: false,
				date: false
			})]
		});

		// When a file is selected, run a callback.
		this.frame.on('insert select', this.select.bind(this));
	},

	/**
  * Callback handler for when an attachment is selected in the media modal.
  * Gets the selected image information, and sets it within the control.
  */
	select: function select() {
		this.trigger('before:select');

		// Get the attachment from the modal frame.
		var attachment = this.frame.state().get('selection').first().toJSON();

		if (attachment.url) {
			this.setValue({
				url: attachment.url,
				id: attachment.id
			});

			this.applySavedValue();
		}

		this.trigger('after:select');
	},

	onBeforeDestroy: function onBeforeDestroy() {
		this.$el.remove();
	}
});

module.exports = ControlMediaItemView;

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ControlBaseDataView = __webpack_require__(0),
    NumberValidator = __webpack_require__(112),
    ControlNumberItemView;

ControlNumberItemView = ControlBaseDataView.extend({

	registerValidators: function registerValidators() {
		ControlBaseDataView.prototype.registerValidators.apply(this, arguments);

		var validationTerms = {},
		    model = this.model;

		['min', 'max'].forEach(function (term) {
			var termValue = model.get(term);

			if (_.isFinite(termValue)) {
				validationTerms[term] = termValue;
			}
		});

		if (!jQuery.isEmptyObject(validationTerms)) {
			this.addValidator(new NumberValidator({
				validationTerms: validationTerms
			}));
		}
	}
});

module.exports = ControlNumberItemView;

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Validator = __webpack_require__(18);

module.exports = Validator.extend({
	validationMethod: function validationMethod(newValue) {
		var validationTerms = this.getSettings('validationTerms'),
		    errors = [];

		if (_.isFinite(newValue)) {
			if (undefined !== validationTerms.min && newValue < validationTerms.min) {
				errors.push('Value is less than minimum');
			}

			if (undefined !== validationTerms.max && newValue > validationTerms.max) {
				errors.push('Value is greater than maximum');
			}
		}

		return errors;
	}
});

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ControlMultipleBaseItemView = __webpack_require__(4),
    ControlOrderItemView;

ControlOrderItemView = ControlMultipleBaseItemView.extend({
	ui: function ui() {
		var ui = ControlMultipleBaseItemView.prototype.ui.apply(this, arguments);

		ui.reverseOrderLabel = '.elementor-control-order-label';

		return ui;
	},

	changeLabelTitle: function changeLabelTitle() {
		var reverseOrder = this.getControlValue('reverse_order');

		this.ui.reverseOrderLabel.attr('title', elementor.translate(reverseOrder ? 'asc' : 'desc'));
	},

	onRender: function onRender() {
		ControlMultipleBaseItemView.prototype.onRender.apply(this, arguments);

		this.changeLabelTitle();
	},

	onInputChange: function onInputChange() {
		this.changeLabelTitle();
	}
});

module.exports = ControlOrderItemView;

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ControlChooseView = __webpack_require__(33),
    ControlPopoverStarterView;

ControlPopoverStarterView = ControlChooseView.extend({
	ui: function ui() {
		var ui = ControlChooseView.prototype.ui.apply(this, arguments);

		ui.popoverToggle = '.elementor-control-popover-toggle-toggle';

		return ui;
	},

	events: function events() {
		return _.extend(ControlChooseView.prototype.events.apply(this, arguments), {
			'click @ui.popoverToggle': 'onPopoverToggleClick'
		});
	},

	onPopoverToggleClick: function onPopoverToggleClick() {
		this.$el.next('.elementor-controls-popover').toggle();
	}
}, {

	onPasteStyle: function onPasteStyle(control, clipboardValue) {
		return !clipboardValue || clipboardValue === control.return_value;
	}
});

module.exports = ControlPopoverStarterView;

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ControlBaseDataView = __webpack_require__(0),
    RepeaterRowView = __webpack_require__(35),
    BaseSettingsModel = __webpack_require__(3),
    ControlRepeaterItemView;

ControlRepeaterItemView = ControlBaseDataView.extend({
	ui: {
		btnAddRow: '.elementor-repeater-add',
		fieldContainer: '.elementor-repeater-fields-wrapper'
	},

	events: function events() {
		return {
			'click @ui.btnAddRow': 'onButtonAddRowClick',
			'sortstart @ui.fieldContainer': 'onSortStart',
			'sortupdate @ui.fieldContainer': 'onSortUpdate',
			'sortstop @ui.fieldContainer': 'onSortStop'
		};
	},

	childView: RepeaterRowView,

	childViewContainer: '.elementor-repeater-fields-wrapper',

	templateHelpers: function templateHelpers() {
		return {
			data: _.extend({}, this.model.toJSON(), { controlValue: [] })
		};
	},

	childViewOptions: function childViewOptions() {
		return {
			controlFields: this.model.get('fields'),
			titleField: this.model.get('title_field')
		};
	},

	createItemModel: function createItemModel(attrs, options, controlView) {
		options = options || {};

		options.controls = controlView.model.get('fields');

		if (!attrs._id) {
			attrs._id = elementor.helpers.getUniqueID();
		}

		return new BaseSettingsModel(attrs, options);
	},

	fillCollection: function fillCollection() {
		var controlName = this.model.get('name');
		this.collection = this.elementSettingsModel.get(controlName);

		// Hack for history redo/undo
		if (!(this.collection instanceof Backbone.Collection)) {
			this.collection = new Backbone.Collection(this.collection, {
				// Use `partial` to supply the `this` as an argument, but not as context
				// the `_` is a place holder for original arguments: `attrs` & `options`
				model: _.partial(this.createItemModel, _, _, this)
			});

			// Set the value silent
			this.elementSettingsModel.set(controlName, this.collection, { silent: true });
			this.listenTo(this.collection, 'change', this.onRowControlChange);
			this.listenTo(this.collection, 'update', this.onRowUpdate, this);
		}
	},

	initialize: function initialize(options) {
		ControlBaseDataView.prototype.initialize.apply(this, arguments);

		this.fillCollection();

		this.listenTo(this.collection, 'change', this.onRowControlChange);
		this.listenTo(this.collection, 'update', this.onRowUpdate, this);
	},

	addRow: function addRow(data, options) {
		var id = elementor.helpers.getUniqueID();

		if (data instanceof Backbone.Model) {
			data.set('_id', id);
		} else {
			data._id = id;
		}

		return this.collection.add(data, options);
	},

	editRow: function editRow(rowView) {
		if (this.currentEditableChild) {
			var currentEditable = this.currentEditableChild.getChildViewContainer(this.currentEditableChild);
			currentEditable.removeClass('editable');

			// If the repeater contains TinyMCE editors, fire the `hide` trigger to hide floated toolbars
			currentEditable.find('.elementor-wp-editor').each(function () {
				tinymce.get(this.id).fire('hide');
			});
		}

		if (this.currentEditableChild === rowView) {
			delete this.currentEditableChild;
			return;
		}

		rowView.getChildViewContainer(rowView).addClass('editable');

		this.currentEditableChild = rowView;

		this.updateActiveRow();
	},

	toggleMinRowsClass: function toggleMinRowsClass() {
		if (!this.model.get('prevent_empty')) {
			return;
		}

		this.$el.toggleClass('elementor-repeater-has-minimum-rows', 1 >= this.collection.length);
	},

	updateActiveRow: function updateActiveRow() {
		var activeItemIndex = 1;

		if (this.currentEditableChild) {
			activeItemIndex = this.currentEditableChild.itemIndex;
		}

		this.setEditSetting('activeItemIndex', activeItemIndex);
	},

	updateChildIndexes: function updateChildIndexes() {
		var collection = this.collection;

		this.children.each(function (view) {
			view.updateIndex(collection.indexOf(view.model) + 1);

			view.setTitle();
		});
	},

	onRender: function onRender() {
		ControlBaseDataView.prototype.onRender.apply(this, arguments);

		this.ui.fieldContainer.sortable({ axis: 'y', handle: '.elementor-repeater-row-tools' });

		this.toggleMinRowsClass();
	},

	onSortStart: function onSortStart(event, ui) {
		ui.item.data('oldIndex', ui.item.index());
	},

	onSortStop: function onSortStop(event, ui) {
		// Reload TinyMCE editors (if exist), it's a bug that TinyMCE content is missing after stop dragging
		var self = this,
		    sortedIndex = ui.item.index();

		if (-1 === sortedIndex) {
			return;
		}

		var sortedRowView = self.children.findByIndex(ui.item.index()),
		    rowControls = sortedRowView.children._views;

		jQuery.each(rowControls, function () {
			if ('wysiwyg' === this.model.get('type')) {
				sortedRowView.render();

				delete self.currentEditableChild;

				return false;
			}
		});
	},

	onSortUpdate: function onSortUpdate(event, ui) {
		var oldIndex = ui.item.data('oldIndex'),
		    model = this.collection.at(oldIndex),
		    newIndex = ui.item.index();

		this.collection.remove(model);

		this.addRow(model, { at: newIndex });
	},

	onAddChild: function onAddChild() {
		this.updateChildIndexes();
		this.updateActiveRow();
	},

	onRowUpdate: function onRowUpdate(collection, event) {
		// Simulate `changed` and `_previousAttributes` values
		var settings = this.elementSettingsModel,
		    collectionCloned = collection.clone(),
		    controlName = this.model.get('name');

		if (event.add) {
			collectionCloned.remove(event.changes.added[0]);
		} else {
			collectionCloned.add(event.changes.removed[0], { at: event.index });
		}

		settings.changed = {};
		settings.changed[controlName] = collection;

		settings._previousAttributes = {};
		settings._previousAttributes[controlName] = collectionCloned.toJSON();

		settings.trigger('change', settings, settings._pending);

		delete settings.changed;
		delete settings._previousAttributes;

		this.toggleMinRowsClass();
	},

	onRowControlChange: function onRowControlChange(model) {
		// Simulate `changed` and `_previousAttributes` values
		var changed = Object.keys(model.changed);

		if (!changed.length) {
			return;
		}

		var collectionCloned = model.collection.toJSON(),
		    modelIndex = model.collection.findIndex(model),
		    element = this._parent.model,
		    settings = element.get('settings'),
		    controlName = this.model.get('name');

		// Save it with old values
		collectionCloned[modelIndex] = model._previousAttributes;

		settings.changed = {};
		settings.changed[controlName] = model.collection;

		settings._previousAttributes = {};
		settings._previousAttributes[controlName] = collectionCloned;

		settings.trigger('change', settings);

		delete settings.changed;
		delete settings._previousAttributes;
	},

	onButtonAddRowClick: function onButtonAddRowClick() {
		var defaults = {};
		_.each(this.model.get('fields'), function (field) {
			defaults[field.name] = field['default'];
		});

		var newModel = this.addRow(defaults),
		    newChildView = this.children.findByModel(newModel);

		this.editRow(newChildView);
	},

	onChildviewClickRemove: function onChildviewClickRemove(childView) {
		childView.model.destroy();

		if (childView === this.currentEditableChild) {
			delete this.currentEditableChild;
		}

		this.updateChildIndexes();

		this.updateActiveRow();
	},

	onChildviewClickDuplicate: function onChildviewClickDuplicate(childView) {
		var newModel = this.createItemModel(childView.model.toJSON(), {}, this);

		this.addRow(newModel, { at: childView.itemIndex });
	},

	onChildviewClickEdit: function onChildviewClickEdit(childView) {
		this.editRow(childView);
	},

	onAfterExternalChange: function onAfterExternalChange() {
		// Update the collection with current value
		this.fillCollection();

		ControlBaseDataView.prototype.onAfterExternalChange.apply(this, arguments);
	}
});

module.exports = ControlRepeaterItemView;

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ControlBaseView = __webpack_require__(7),
    ControlSectionItemView;

ControlSectionItemView = ControlBaseView.extend({
	ui: function ui() {
		var ui = ControlBaseView.prototype.ui.apply(this, arguments);

		ui.heading = '.elementor-panel-heading';

		return ui;
	},

	triggers: {
		'click': 'control:section:clicked'
	}
});

module.exports = ControlSectionItemView;

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ControlBaseDataView = __webpack_require__(0),
    ControlSelectItemView;

ControlSelectItemView = ControlBaseDataView.extend({}, {

	onPasteStyle: function onPasteStyle(control, clipboardValue) {
		if (control.groups) {
			return control.groups.some(function (group) {
				return ControlSelectItemView.onPasteStyle(group, clipboardValue);
			});
		}

		return undefined !== control.options[clipboardValue];
	}
});

module.exports = ControlSelectItemView;

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ControlBaseUnitsItemView = __webpack_require__(34),
    ControlSliderItemView;

ControlSliderItemView = ControlBaseUnitsItemView.extend({
	ui: function ui() {
		var ui = ControlBaseUnitsItemView.prototype.ui.apply(this, arguments);

		ui.slider = '.elementor-slider';

		return ui;
	},

	events: function events() {
		return _.extend(ControlBaseUnitsItemView.prototype.events.apply(this, arguments), {
			'slide @ui.slider': 'onSlideChange'
		});
	},

	initSlider: function initSlider() {
		var size = this.getControlValue('size'),
		    unitRange = this.getCurrentRange();

		this.ui.input.attr(unitRange).val(size);

		this.ui.slider.slider(_.extend({}, unitRange, { value: size }));
	},

	resetSize: function resetSize() {
		this.setValue('size', '');

		this.initSlider();
	},

	onReady: function onReady() {
		this.initSlider();
	},

	onSlideChange: function onSlideChange(event, ui) {
		this.setValue('size', ui.value);

		this.ui.input.val(ui.value);
	},

	onInputChange: function onInputChange(event) {
		var dataChanged = event.currentTarget.dataset.setting;

		if ('size' === dataChanged) {
			this.ui.slider.slider('value', this.getControlValue('size'));
		} else if ('unit' === dataChanged) {
			this.resetSize();
		}
	},

	onBeforeDestroy: function onBeforeDestroy() {
		if (this.ui.slider.data('uiSlider')) {
			this.ui.slider.slider('destroy');
		}

		this.$el.remove();
	}
});

module.exports = ControlSliderItemView;

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ControlBaseDataView = __webpack_require__(0),
    ControlStructureItemView;

ControlStructureItemView = ControlBaseDataView.extend({
	ui: function ui() {
		var ui = ControlBaseDataView.prototype.ui.apply(this, arguments);

		ui.resetStructure = '.elementor-control-structure-reset';

		return ui;
	},

	events: function events() {
		return _.extend(ControlBaseDataView.prototype.events.apply(this, arguments), {
			'click @ui.resetStructure': 'onResetStructureClick'
		});
	},

	templateHelpers: function templateHelpers() {
		var helpers = ControlBaseDataView.prototype.templateHelpers.apply(this, arguments);

		helpers.getMorePresets = this.getMorePresets.bind(this);

		return helpers;
	},

	getCurrentEditedSection: function getCurrentEditedSection() {
		var editor = elementor.getPanelView().getCurrentPageView();

		return editor.getOption('editedElementView');
	},

	getMorePresets: function getMorePresets() {
		var parsedStructure = elementor.presetsFactory.getParsedStructure(this.getControlValue());

		return elementor.presetsFactory.getPresets(parsedStructure.columnsCount);
	},

	onInputChange: function onInputChange() {
		this.getCurrentEditedSection().redefineLayout();

		this.render();
	},

	onResetStructureClick: function onResetStructureClick() {
		this.getCurrentEditedSection().resetColumnsCustomSize();
	}
});

module.exports = ControlStructureItemView;

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ControlBaseDataView = __webpack_require__(0);

module.exports = ControlBaseDataView.extend({

	setInputValue: function setInputValue(input, value) {
		this.$(input).prop('checked', this.model.get('return_value') === value);
	}
}, {

	onPasteStyle: function onPasteStyle(control, clipboardValue) {
		return !clipboardValue || clipboardValue === control.return_value;
	}
});

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ControlBaseView = __webpack_require__(7),
    ControlTabItemView;

ControlTabItemView = ControlBaseView.extend({
	triggers: {
		'click': {
			event: 'control:tab:clicked',
			stopPropagation: false
		}
	}
});

module.exports = ControlTabItemView;

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BaseMultiple = __webpack_require__(4);

module.exports = BaseMultiple.extend({

	onReady: function onReady() {
		var self = this,
		    positionBase = elementor.config.is_rtl ? 'right' : 'left',
		    last,
		    cache;

		// Based on /wp-includes/js/tinymce/plugins/wplink/plugin.js.
		this.ui.input.autocomplete({
			source: function source(request, response) {
				if (last === request.term) {
					response(cache);
					return;
				}

				if (/^https?:/.test(request.term) || request.term.indexOf('.') !== -1) {
					return response();
				}

				// Show Spinner.
				self.ui.input.prev().show();

				jQuery.post(window.ajaxurl, {
					editor: 'elementor',
					action: 'wp-link-ajax',
					page: 1,
					search: request.term,
					_ajax_linking_nonce: jQuery('#_ajax_linking_nonce').val()
				}, function (data) {
					cache = data;
					response(data);
				}, 'json').always(function () {
					// Hide Spinner.
					self.ui.input.prev().hide();
				});

				last = request.term;
			},
			focus: function focus(event, ui) {
				/*
     * Don't empty the URL input field, when using the arrow keys to
     * highlight items. See api.jqueryui.com/autocomplete/#event-focus
     */
				event.preventDefault();
			},
			select: function select(event, ui) {
				self.ui.input.val(ui.item.permalink);
				self.setValue('url', ui.item.permalink);
				return false;
			},
			open: function open(event) {
				jQuery(event.target).data('uiAutocomplete').menu.activeMenu.addClass('elementor-autocomplete-menu');
			},
			minLength: 2,
			position: {
				my: positionBase + ' top+2',
				at: positionBase + ' bottom'
			}
		})
		// The `_renderItem` cannot be override via the arguments.
		.autocomplete('instance')._renderItem = function (ul, item) {
			var fallbackTitle = window.wpLinkL10n ? window.wpLinkL10n.noTitle : '',
			    title = item.title ? item.title : fallbackTitle;

			return jQuery('<li role="option" id="mce-wp-autocomplete-' + item.ID + '">').append('<span>' + title + '</span>&nbsp;<span class="elementor-autocomplete-item-info">' + item.info + '</span>').appendTo(ul);
		};
	},

	onBeforeDestroy: function onBeforeDestroy() {
		if (this.ui.input.data('autocomplete')) {
			this.ui.input.autocomplete('destroy');
		}

		this.$el.remove();
	}
});

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ControlBaseDataView = __webpack_require__(0),
    ControlWPWidgetItemView;

ControlWPWidgetItemView = ControlBaseDataView.extend({
	ui: function ui() {
		var ui = ControlBaseDataView.prototype.ui.apply(this, arguments);

		ui.form = 'form';
		ui.loading = '.wp-widget-form-loading';

		return ui;
	},

	events: function events() {
		return {
			'keyup @ui.form :input': 'onFormChanged',
			'change @ui.form :input': 'onFormChanged'
		};
	},

	onFormChanged: function onFormChanged() {
		var idBase = 'widget-' + this.model.get('id_base'),
		    settings = this.ui.form.elementorSerializeObject()[idBase].REPLACE_TO_ID;

		this.setValue(settings);
	},

	onReady: function onReady() {
		var self = this;

		elementor.ajax.addRequest('editor_get_wp_widget_form', {
			data: {
				// Fake Widget ID
				id: self.model.cid,
				widget_type: self.model.get('widget'),
				data: self.elementSettingsModel.toJSON()
			},
			success: function success(data) {
				self.ui.form.html(data);
				// WP >= 4.8
				if (wp.textWidgets) {
					self.ui.form.addClass('open');
					var event = new jQuery.Event('widget-added');
					wp.textWidgets.handleWidgetAdded(event, self.ui.form);
					wp.mediaWidgets.handleWidgetAdded(event, self.ui.form);

					// WP >= 4.9
					if (wp.customHtmlWidgets) {
						wp.customHtmlWidgets.handleWidgetAdded(event, self.ui.form);
					}
				}

				elementor.hooks.doAction('panel/widgets/' + self.model.get('widget') + '/controls/wp_widget/loaded', self);
			}
		});
	}
});

module.exports = ControlWPWidgetItemView;

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ControlBaseDataView = __webpack_require__(0),
    ControlWysiwygItemView;

ControlWysiwygItemView = ControlBaseDataView.extend({

	editor: null,

	ui: function ui() {
		var ui = ControlBaseDataView.prototype.ui.apply(this, arguments);

		jQuery.extend(ui, {
			inputWrapper: '.elementor-control-input-wrapper'
		});

		return ui;
	},

	events: function events() {
		return _.extend(ControlBaseDataView.prototype.events.apply(this, arguments), {
			'keyup textarea.elementor-wp-editor': 'onBaseInputChange'
		});
	},

	// List of buttons to move {buttonToMove: afterButton}
	buttons: {
		addToBasic: {
			underline: 'italic'
		},
		addToAdvanced: {},
		moveToAdvanced: {
			blockquote: 'removeformat',
			alignleft: 'blockquote',
			aligncenter: 'alignleft',
			alignright: 'aligncenter'
		},
		moveToBasic: {},
		removeFromBasic: ['unlink', 'wp_more'],
		removeFromAdvanced: []
	},

	initialize: function initialize() {
		ControlBaseDataView.prototype.initialize.apply(this, arguments);

		var self = this;

		self.editorID = 'elementorwpeditor' + self.cid;

		// Wait a cycle before initializing the editors.
		_.defer(function () {
			// Initialize QuickTags, and set as the default mode.
			quicktags({
				buttons: 'strong,em,del,link,img,close',
				id: self.editorID
			});

			if (elementor.config.rich_editing_enabled) {
				switchEditors.go(self.editorID, 'tmce');
			}

			delete QTags.instances[0];
		});

		if (!elementor.config.rich_editing_enabled) {
			self.$el.addClass('elementor-rich-editing-disabled');

			return;
		}

		var editorConfig = {
			id: self.editorID,
			selector: '#' + self.editorID,
			setup: function setup(editor) {
				self.editor = editor;
			}
		};

		tinyMCEPreInit.mceInit[self.editorID] = _.extend(_.clone(tinyMCEPreInit.mceInit.elementorwpeditor), editorConfig);

		if (!elementor.config.tinymceHasCustomConfig) {
			self.rearrangeButtons();
		}
	},

	applySavedValue: function applySavedValue() {
		if (!this.editor) {
			return;
		}

		var controlValue = this.getControlValue();

		this.editor.setContent(controlValue);

		// Update also the plain textarea
		jQuery('#' + this.editorID).val(controlValue);
	},

	saveEditor: function saveEditor() {
		this.editor.save();

		this.setValue(this.editor.getContent());
	},

	moveButtons: function moveButtons(buttonsToMove, from, to) {
		if (!to) {
			to = from;

			from = null;
		}

		_.each(buttonsToMove, function (afterButton, button) {
			var afterButtonIndex = to.indexOf(afterButton);

			if (from) {
				var buttonIndex = from.indexOf(button);

				if (-1 === buttonIndex) {
					throw new ReferenceError('Trying to move non-existing button `' + button + '`');
				}

				from.splice(buttonIndex, 1);
			}

			if (-1 === afterButtonIndex) {
				throw new ReferenceError('Trying to move button after non-existing button `' + afterButton + '`');
			}

			to.splice(afterButtonIndex + 1, 0, button);
		});
	},

	rearrangeButtons: function rearrangeButtons() {
		var editorProps = tinyMCEPreInit.mceInit[this.editorID],
		    editorBasicToolbarButtons = editorProps.toolbar1.split(','),
		    editorAdvancedToolbarButtons = editorProps.toolbar2.split(',');

		editorBasicToolbarButtons = _.difference(editorBasicToolbarButtons, this.buttons.removeFromBasic);

		editorAdvancedToolbarButtons = _.difference(editorAdvancedToolbarButtons, this.buttons.removeFromAdvanced);

		this.moveButtons(this.buttons.moveToBasic, editorAdvancedToolbarButtons, editorBasicToolbarButtons);

		this.moveButtons(this.buttons.moveToAdvanced, editorBasicToolbarButtons, editorAdvancedToolbarButtons);

		this.moveButtons(this.buttons.addToBasic, editorBasicToolbarButtons);

		this.moveButtons(this.buttons.addToAdvanced, editorAdvancedToolbarButtons);

		editorProps.toolbar1 = editorBasicToolbarButtons.join(',');
		editorProps.toolbar2 = editorAdvancedToolbarButtons.join(',');
	},

	onReady: function onReady() {
		var self = this;

		var $editor = jQuery(elementor.config.wp_editor.replace(/elementorwpeditor/g, self.editorID).replace('%%EDITORCONTENT%%', self.getControlValue()));

		self.ui.inputWrapper.html($editor);

		setTimeout(function () {
			self.editor.on('keyup change undo redo SetContent', self.saveEditor.bind(self));
		}, 100);
	},

	onBeforeDestroy: function onBeforeDestroy() {
		// Remove TinyMCE and QuickTags instances
		delete QTags.instances[this.editorID];

		if (!elementor.config.rich_editing_enabled) {
			return;
		}

		tinymce.EditorManager.execCommand('mceRemoveEditor', true, this.editorID);

		// Cleanup PreInit data
		delete tinyMCEPreInit.mceInit[this.editorID];
		delete tinyMCEPreInit.qtInit[this.editorID];
	}
});

module.exports = ControlWysiwygItemView;

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BaseSettingsModel = __webpack_require__(3),
    ColumnSettingsModel;

ColumnSettingsModel = BaseSettingsModel.extend({
	defaults: {
		_column_size: 100
	}
});

module.exports = ColumnSettingsModel;

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BaseElementView = __webpack_require__(10),
    WidgetView;

WidgetView = BaseElementView.extend({
	_templateType: null,

	toggleEditTools: true,

	getTemplate: function getTemplate() {
		var editModel = this.getEditModel();

		if ('remote' !== this.getTemplateType()) {
			return Marionette.TemplateCache.get('#tmpl-elementor-' + editModel.get('widgetType') + '-content');
		} else {
			return _.template('');
		}
	},

	className: function className() {
		var baseClasses = BaseElementView.prototype.className.apply(this, arguments);

		return baseClasses + ' elementor-widget ' + elementor.getElementData(this.getEditModel()).html_wrapper_class;
	},

	events: function events() {
		var events = BaseElementView.prototype.events.apply(this, arguments);

		events.click = 'onClickEdit';

		return events;
	},

	behaviors: function behaviors() {
		var behaviors = BaseElementView.prototype.behaviors.apply(this, arguments);

		_.extend(behaviors, {
			InlineEditing: {
				behaviorClass: __webpack_require__(127),
				inlineEditingClass: 'elementor-inline-editing'
			}
		});

		return elementor.hooks.applyFilters('elements/widget/behaviors', behaviors, this);
	},

	initialize: function initialize() {
		BaseElementView.prototype.initialize.apply(this, arguments);

		var editModel = this.getEditModel();

		editModel.on({
			'before:remote:render': this.onModelBeforeRemoteRender.bind(this),
			'remote:render': this.onModelRemoteRender.bind(this)
		});

		if ('remote' === this.getTemplateType() && !this.getEditModel().getHtmlCache()) {
			editModel.renderRemoteServer();
		}

		var onRenderMethod = this.onRender;

		this.render = _.throttle(this.render, 300);

		this.onRender = function () {
			_.defer(onRenderMethod.bind(this));
		};
	},

	getContextMenuGroups: function getContextMenuGroups() {
		var groups = BaseElementView.prototype.getContextMenuGroups.apply(this, arguments),
		    transferGroupIndex = groups.indexOf(_.findWhere(groups, { name: 'transfer' }));

		groups.splice(transferGroupIndex + 1, 0, {
			name: 'save',
			actions: [{
				name: 'save',
				title: elementor.translate('save_as_global'),
				shortcut: jQuery('<i>', { 'class': 'eicon-pro-icon' })
			}]
		});

		return groups;
	},

	render: function render() {
		if (this.model.isRemoteRequestActive()) {
			this.handleEmptyWidget();

			this.$el.addClass('elementor-element');

			return;
		}

		Marionette.CompositeView.prototype.render.apply(this, arguments);
	},

	handleEmptyWidget: function handleEmptyWidget() {
		// TODO: REMOVE THIS !!
		// TEMP CODING !!
		this.$el.addClass('elementor-widget-empty').append('<i class="elementor-widget-empty-icon ' + this.getEditModel().getIcon() + '"></i>');
	},

	getTemplateType: function getTemplateType() {
		if (null === this._templateType) {
			var editModel = this.getEditModel(),
			    $template = jQuery('#tmpl-elementor-' + editModel.get('widgetType') + '-content');

			this._templateType = $template.length ? 'js' : 'remote';
		}

		return this._templateType;
	},

	getHTMLContent: function getHTMLContent(html) {
		var htmlCache = this.getEditModel().getHtmlCache();

		return htmlCache || html;
	},

	attachElContent: function attachElContent(html) {
		var self = this,
		    htmlContent = self.getHTMLContent(html);

		_.defer(function () {
			elementorFrontend.getElements('window').jQuery(self.el).html(htmlContent);

			self.bindUIElements(); // Build again the UI elements since the content attached just now
		});

		return this;
	},

	addInlineEditingAttributes: function addInlineEditingAttributes(key, toolbar) {
		this.addRenderAttribute(key, {
			'class': 'elementor-inline-editing',
			'data-elementor-setting-key': key
		});

		if (toolbar) {
			this.addRenderAttribute(key, {
				'data-elementor-inline-editing-toolbar': toolbar
			});
		}
	},

	getRepeaterSettingKey: function getRepeaterSettingKey(settingKey, repeaterKey, repeaterItemIndex) {
		return [repeaterKey, repeaterItemIndex, settingKey].join('.');
	},

	onModelBeforeRemoteRender: function onModelBeforeRemoteRender() {
		this.$el.addClass('elementor-loading');
	},

	onBeforeDestroy: function onBeforeDestroy() {
		// Remove old style from the DOM.
		elementor.$previewContents.find('#elementor-style-' + this.model.cid).remove();
	},

	onModelRemoteRender: function onModelRemoteRender() {
		if (this.isDestroyed) {
			return;
		}

		this.$el.removeClass('elementor-loading');
		this.render();
	},

	onRender: function onRender() {
		var self = this;

		BaseElementView.prototype.onRender.apply(self, arguments);

		var editModel = self.getEditModel(),
		    skinType = editModel.getSetting('_skin') || 'default';

		self.$el.attr('data-element_type', editModel.get('widgetType') + '.' + skinType).removeClass('elementor-widget-empty').children('.elementor-widget-empty-icon').remove();

		// TODO: Find better way to detect if all images are loaded
		self.$el.imagesLoaded().always(function () {
			setTimeout(function () {
				if (1 > self.$el.height()) {
					self.handleEmptyWidget();
				}
			}, 200);
			// Is element empty?
		});
	},

	onClickEdit: function onClickEdit() {
		this.model.trigger('request:edit');
	}
});

module.exports = WidgetView;

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var InlineEditingBehavior;

InlineEditingBehavior = Marionette.Behavior.extend({
	editing: false,

	$currentEditingArea: null,

	ui: function ui() {
		return {
			inlineEditingArea: '.' + this.getOption('inlineEditingClass')
		};
	},

	events: function events() {
		return {
			'click @ui.inlineEditingArea': 'onInlineEditingClick',
			'input @ui.inlineEditingArea': 'onInlineEditingUpdate'
		};
	},

	getEditingSettingKey: function getEditingSettingKey() {
		return this.$currentEditingArea.data().elementorSettingKey;
	},

	startEditing: function startEditing($element) {
		var elementorSettingKey = $element.data().elementorSettingKey,
		    settingKey = elementorSettingKey,
		    keyParts = elementorSettingKey.split('.'),
		    isRepeaterKey = 3 === keyParts.length,
		    settingsModel = this.view.getEditModel().get('settings');

		if (isRepeaterKey) {
			settingsModel = settingsModel.get(keyParts[0]).models[keyParts[1]];

			settingKey = keyParts[2];
		}

		var dynamicSettings = settingsModel.get('__dynamic__'),
		    isDynamic = dynamicSettings && dynamicSettings[settingKey];

		if (this.editing || isDynamic || 'edit' !== elementor.channels.dataEditMode.request('activeMode') || this.view.model.isRemoteRequestActive()) {
			return;
		}

		this.$currentEditingArea = $element;

		var elementData = this.$currentEditingArea.data(),
		    elementDataToolbar = elementData.elementorInlineEditingToolbar,
		    mode = 'advanced' === elementDataToolbar ? 'advanced' : 'basic',
		    editModel = this.view.getEditModel(),
		    inlineEditingConfig = elementor.config.inlineEditing,
		    contentHTML = editModel.getSetting(this.getEditingSettingKey());

		if ('advanced' === mode) {
			contentHTML = wp.editor.autop(contentHTML);
		}

		/**
   *  Replace rendered content with unrendered content.
   *  This way the user can edit the original content, before shortcodes and oEmbeds are fired.
   */
		this.$currentEditingArea.html(contentHTML);

		var ElementorInlineEditor = elementorFrontend.getElements('window').ElementorInlineEditor;

		this.editing = true;

		this.view.allowRender = false;

		// Avoid retrieving of old content (e.g. in case of sorting)
		this.view.model.setHtmlCache('');

		this.editor = new ElementorInlineEditor({
			linksInNewWindow: true,
			stay: false,
			editor: this.$currentEditingArea[0],
			mode: mode,
			list: 'none' === elementDataToolbar ? [] : inlineEditingConfig.toolbar[elementDataToolbar || 'basic'],
			cleanAttrs: ['id', 'class', 'name'],
			placeholder: elementor.translate('type_here') + '...',
			toolbarIconsPrefix: 'eicon-editor-',
			toolbarIconsDictionary: {
				externalLink: {
					className: 'eicon-editor-external-link'
				},
				list: {
					className: 'eicon-editor-list-ul'
				},
				insertOrderedList: {
					className: 'eicon-editor-list-ol'
				},
				insertUnorderedList: {
					className: 'eicon-editor-list-ul'
				},
				createlink: {
					className: 'eicon-editor-link'
				},
				unlink: {
					className: 'eicon-editor-unlink'
				},
				blockquote: {
					className: 'eicon-editor-quote'
				},
				p: {
					className: 'eicon-editor-paragraph'
				},
				pre: {
					className: 'eicon-editor-code'
				}
			}
		});

		var $menuItems = jQuery(this.editor._menu).children();

		/**
   * When the edit area is not focused (on blur) the inline editing is stopped.
   * In order to prevent blur event when the user clicks on toolbar buttons while editing the
   * content, we need the prevent their mousedown event. This also prevents the blur event.
   */
		$menuItems.on('mousedown', function (event) {
			event.preventDefault();
		});

		this.$currentEditingArea.on('blur', this.onInlineEditingBlur.bind(this));
	},

	stopEditing: function stopEditing() {
		this.editing = false;

		this.editor.destroy();

		this.view.allowRender = true;

		/**
   * Inline editing has several toolbar types (advanced, basic and none). When editing is stopped,
   * we need to rerender the area. To prevent multiple renderings, we will render only areas that
   * use advanced toolbars.
   */
		if ('advanced' === this.$currentEditingArea.data().elementorInlineEditingToolbar) {
			this.view.getEditModel().renderRemoteServer();
		}
	},

	onInlineEditingClick: function onInlineEditingClick(event) {
		var self = this,
		    $targetElement = jQuery(event.currentTarget);

		/**
   * When starting inline editing we need to set timeout, this allows other inline items to finish
   * their operations before focusing new editing area.
   */
		setTimeout(function () {
			self.startEditing($targetElement);
		}, 30);
	},

	onInlineEditingBlur: function onInlineEditingBlur() {
		var self = this;

		/**
   * When exiting inline editing we need to set timeout, to make sure there is no focus on internal
   * toolbar action. This prevent the blur and allows the user to continue the inline editing.
   */
		setTimeout(function () {
			var selection = elementorFrontend.getElements('window').getSelection(),
			    $focusNode = jQuery(selection.focusNode);

			if ($focusNode.closest('.pen-input-wrapper').length) {
				return;
			}

			self.stopEditing();
		}, 20);
	},

	onInlineEditingUpdate: function onInlineEditingUpdate() {
		this.view.getEditModel().setSetting(this.getEditingSettingKey(), this.editor.getContent());
	}
});

module.exports = InlineEditingBehavior;

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PanelElementsElementsView;

PanelElementsElementsView = Marionette.CollectionView.extend({
	childView: __webpack_require__(39),

	id: 'elementor-panel-elements',

	initialize: function initialize() {
		this.listenTo(elementor.channels.panelElements, 'filter:change', this.onFilterChanged);
	},

	filter: function filter(childModel) {
		var filterValue = elementor.channels.panelElements.request('filter:value');

		if (!filterValue) {
			return true;
		}

		if (-1 !== childModel.get('title').toLowerCase().indexOf(filterValue.toLowerCase())) {
			return true;
		}

		return _.any(childModel.get('keywords'), function (keyword) {
			return -1 !== keyword.toLowerCase().indexOf(filterValue.toLowerCase());
		});
	},

	onFilterChanged: function onFilterChanged() {
		var filterValue = elementor.channels.panelElements.request('filter:value');

		if (!filterValue) {
			this.onFilterEmpty();
		}

		this._renderChildren();

		this.triggerMethod('children:render');
	},

	onFilterEmpty: function onFilterEmpty() {
		elementor.getPanelView().getCurrentPageView().showView('categories');
	}
});

module.exports = PanelElementsElementsView;

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PanelMenuGroupView = __webpack_require__(130),
    PanelMenuPageView;

PanelMenuPageView = Marionette.CompositeView.extend({
	id: 'elementor-panel-page-menu',

	template: '#tmpl-elementor-panel-menu',

	childView: PanelMenuGroupView,

	childViewContainer: '#elementor-panel-page-menu-content',

	initialize: function initialize() {
		this.collection = PanelMenuPageView.getGroups();
	},

	onDestroy: function onDestroy() {
		var arrowClass = 'eicon-arrow-' + (elementor.config.is_rtl ? 'right' : 'left');

		elementor.panel.currentView.getHeaderView().ui.menuIcon.removeClass(arrowClass).addClass('eicon-menu-bar');
	}
}, {
	groups: null,

	initGroups: function initGroups() {
		var menus = [];

		if (elementor.config.user.is_administrator) {
			menus = [{
				name: 'style',
				title: elementor.translate('global_style'),
				items: [{
					name: 'global-colors',
					icon: 'fa fa-paint-brush',
					title: elementor.translate('global_colors'),
					type: 'page',
					pageName: 'colorScheme'
				}, {
					name: 'global-fonts',
					icon: 'fa fa-font',
					title: elementor.translate('global_fonts'),
					type: 'page',
					pageName: 'typographyScheme'
				}, {
					name: 'color-picker',
					icon: 'fa fa-eyedropper',
					title: elementor.translate('color_picker'),
					type: 'page',
					pageName: 'colorPickerScheme'
				}]
			}, {
				name: 'settings',
				title: elementor.translate('settings'),
				items: [{
					name: 'elementor-settings',
					icon: 'fa fa-external-link',
					title: elementor.translate('elementor_settings'),
					type: 'link',
					link: elementor.config.settings_page_link,
					newTab: true
				}, {
					name: 'about-elementor',
					icon: 'fa fa-info-circle',
					title: elementor.translate('about_elementor'),
					type: 'link',
					link: elementor.config.elementor_site,
					newTab: true
				}]
			}];
		}

		this.groups = new Backbone.Collection(menus);
	},

	getGroups: function getGroups() {
		if (!this.groups) {
			this.initGroups();
		}

		return this.groups;
	},

	addItem: function addItem(itemData, groupName, before) {
		var group = this.getGroups().findWhere({ name: groupName });

		if (!group) {
			return;
		}

		var items = group.get('items'),
		    beforeItem;

		if (before) {
			beforeItem = _.findWhere(items, { name: before });
		}

		if (beforeItem) {
			items.splice(items.indexOf(beforeItem), 0, itemData);
		} else {
			items.push(itemData);
		}
	}
});

module.exports = PanelMenuPageView;

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PanelMenuItemView = __webpack_require__(131);

module.exports = Marionette.CompositeView.extend({
	template: '#tmpl-elementor-panel-menu-group',

	className: 'elementor-panel-menu-group',

	childView: PanelMenuItemView,

	childViewContainer: '.elementor-panel-menu-items',

	initialize: function initialize() {
		this.collection = new Backbone.Collection(this.model.get('items'));
	},

	onChildviewClick: function onChildviewClick(childView) {
		var menuItemType = childView.model.get('type');

		switch (menuItemType) {
			case 'page':
				var pageName = childView.model.get('pageName'),
				    pageTitle = childView.model.get('title');

				elementor.getPanelView().setPage(pageName, pageTitle);

				break;

			case 'link':
				var link = childView.model.get('link'),
				    isNewTab = childView.model.get('newTab');

				if (isNewTab) {
					open(link, '_blank');
				} else {
					location.href = childView.model.get('link');
				}

				break;

			default:
				var callback = childView.model.get('callback');

				if (_.isFunction(callback)) {
					callback.call(childView);
				}
		}
	}
});

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Marionette.ItemView.extend({
	template: '#tmpl-elementor-panel-menu-item',

	className: 'elementor-panel-menu-item',

	triggers: {
		click: 'click'
	}
});

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Module = __webpack_require__(2),
    SettingsModel = __webpack_require__(3);

module.exports = Module.extend({

	CACHE_KEY_NOT_FOUND_ERROR: 'Cache key not found',

	tags: {
		Base: __webpack_require__(133)
	},

	cache: {},

	cacheRequests: {},

	cacheCallbacks: [],

	addCacheRequest: function addCacheRequest(tag) {
		this.cacheRequests[this.createCacheKey(tag)] = true;
	},

	createCacheKey: function createCacheKey(tag) {
		return btoa(tag.getOption('name')) + '-' + btoa(encodeURIComponent(JSON.stringify(tag.model)));
	},

	loadTagDataFromCache: function loadTagDataFromCache(tag) {
		var cacheKey = this.createCacheKey(tag);

		if (undefined !== this.cache[cacheKey]) {
			return this.cache[cacheKey];
		}

		if (!this.cacheRequests[cacheKey]) {
			this.addCacheRequest(tag);
		}
	},

	loadCacheRequests: function loadCacheRequests() {
		var cache = this.cache,
		    cacheRequests = this.cacheRequests,
		    cacheCallbacks = this.cacheCallbacks;

		this.cacheRequests = {};

		this.cacheCallbacks = [];

		elementor.ajax.send('render_tags', {
			data: {
				post_id: elementor.config.document.id,
				tags: Object.keys(cacheRequests)
			},
			success: function success(data) {
				jQuery.extend(cache, data);

				cacheCallbacks.forEach(function (callback) {
					callback();
				});
			}
		});
	},

	refreshCacheFromServer: function refreshCacheFromServer(callback) {
		this.cacheCallbacks.push(callback);

		this.loadCacheRequests();
	},

	getConfig: function getConfig(key) {
		return this.getItems(elementor.config.dynamicTags, key);
	},

	parseTagsText: function parseTagsText(text, settings, parseCallback) {
		var self = this;

		if ('object' === settings.returnType) {
			return self.parseTagText(text, settings, parseCallback);
		}

		return text.replace(/\[elementor-tag[^\]]+]/g, function (tagText) {
			return self.parseTagText(tagText, settings, parseCallback);
		});
	},

	parseTagText: function parseTagText(tagText, settings, parseCallback) {
		var tagData = this.tagTextToTagData(tagText);

		if (!tagData) {
			if ('object' === settings.returnType) {
				return {};
			}

			return '';
		}

		return parseCallback(tagData.id, tagData.name, tagData.settings);
	},

	tagTextToTagData: function tagTextToTagData(tagText) {
		var tagIDMatch = tagText.match(/id="(.*?(?="))"/),
		    tagNameMatch = tagText.match(/name="(.*?(?="))"/),
		    tagSettingsMatch = tagText.match(/settings="(.*?(?="]))/);

		if (!tagIDMatch || !tagNameMatch || !tagSettingsMatch) {
			return false;
		}

		return {
			id: tagIDMatch[1],
			name: tagNameMatch[1],
			settings: JSON.parse(decodeURIComponent(tagSettingsMatch[1]))
		};
	},

	createTag: function createTag(tagID, tagName, tagSettings) {
		var tagConfig = this.getConfig('tags.' + tagName);

		if (!tagConfig) {
			return;
		}

		var TagClass = this.tags[tagName] || this.tags.Base,
		    model = new SettingsModel(tagSettings, {
			controls: tagConfig.controls
		});

		return new TagClass({ id: tagID, name: tagName, model: model });
	},

	getTagDataContent: function getTagDataContent(tagID, tagName, tagSettings) {
		var tag = this.createTag(tagID, tagName, tagSettings);

		if (!tag) {
			return;
		}

		return tag.getContent();
	},

	tagDataToTagText: function tagDataToTagText(tagID, tagName, tagSettings) {
		tagSettings = encodeURIComponent(JSON.stringify(tagSettings && tagSettings.toJSON({ removeDefault: true }) || {}));

		return '[elementor-tag id="' + tagID + '" name="' + tagName + '" settings="' + tagSettings + '"]';
	},

	cleanCache: function cleanCache() {
		this.cache = {};
	},

	onInit: function onInit() {
		this.loadCacheRequests = _.debounce(this.loadCacheRequests, 300);
	}
});

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Marionette.ItemView.extend({

	hasTemplate: true,

	tagName: 'span',

	className: function className() {
		return 'elementor-tag';
	},

	getTemplate: function getTemplate() {
		if (!this.hasTemplate) {
			return false;
		}

		return Marionette.TemplateCache.get('#tmpl-elementor-tag-' + this.getOption('name') + '-content');
	},

	initialize: function initialize() {
		try {
			this.getTemplate();
		} catch (e) {
			this.hasTemplate = false;
		}
	},

	getConfig: function getConfig(key) {
		var config = elementor.dynamicTags.getConfig('tags.' + this.getOption('name'));

		if (key) {
			return config[key];
		}

		return config;
	},

	getContent: function getContent() {
		var contentType = this.getConfig('content_type'),
		    data;

		if (!this.hasTemplate) {
			data = elementor.dynamicTags.loadTagDataFromCache(this);

			if (undefined === data) {
				throw new Error(elementor.dynamicTags.CACHE_KEY_NOT_FOUND_ERROR);
			}
		}

		if ('ui' === contentType) {
			this.render();

			if (this.hasTemplate) {
				return this.el.outerHTML;
			}

			if (this.getConfig('wrapped_tag')) {
				data = jQuery(data).html();
			}

			this.$el.html(data);
		}

		return data;
	},

	onRender: function onRender() {
		this.el.id = 'elementor-tag-' + this.getOption('id');
	}
});

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Module = __webpack_require__(2);

module.exports = Module.extend({
	modules: {
		base: __webpack_require__(21),
		general: __webpack_require__(135),
		page: __webpack_require__(136)
	},

	panelPages: {
		base: __webpack_require__(137)
	},

	onInit: function onInit() {
		this.initSettings();
	},

	initSettings: function initSettings() {
		var self = this;

		_.each(elementor.config.settings, function (config, name) {
			var Manager = self.modules[name] || self.modules.base;

			self[name] = new Manager(config);
		});
	}
});

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BaseSettings = __webpack_require__(21);

module.exports = BaseSettings.extend({
	changeCallbacks: {
		elementor_page_title_selector: function elementor_page_title_selector(newValue) {
			var newSelector = newValue || 'h1.entry-title',
			    titleSelectors = elementor.settings.page.model.controls.hide_title.selectors = {};

			titleSelectors[newSelector] = 'display: none';

			elementor.settings.page.updateStylesheet();
		}
	}
});

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BaseSettings = __webpack_require__(21);

module.exports = BaseSettings.extend({

	save: function save() {},

	changeCallbacks: {
		post_title: function post_title(newValue) {
			var $title = elementorFrontend.getElements('$document').find(elementor.config.page_title_selector);

			$title.text(newValue);
		},

		template: function template() {
			elementor.saver.saveAutoSave({
				onSuccess: function onSuccess() {
					elementor.reloadPreview();

					elementor.once('preview:loaded', function () {
						elementor.getPanelView().setPage('page_settings');
					});
				}
			});
		}
	},

	onModelChange: function onModelChange() {
		elementor.saver.setFlagEditorChange(true);

		BaseSettings.prototype.onModelChange.apply(this, arguments);
	},

	getDataToSave: function getDataToSave(data) {
		data.id = elementor.config.document.id;

		return data;
	}
});

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ControlsStack = __webpack_require__(12);

module.exports = ControlsStack.extend({
	id: function id() {
		return 'elementor-panel-' + this.getOption('name') + '-settings';
	},

	getTemplate: function getTemplate() {
		return '#tmpl-elementor-panel-' + this.getOption('name') + '-settings';
	},

	childViewContainer: function childViewContainer() {
		return '#elementor-panel-' + this.getOption('name') + '-settings-controls';
	},

	childViewOptions: function childViewOptions() {
		return {
			elementSettingsModel: this.model
		};
	}
});

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Module = __webpack_require__(2);

module.exports = Module.extend({
	autoSaveTimer: null,

	autosaveInterval: elementor.config.autosave_interval * 1000,

	isSaving: false,

	isChangedDuringSave: false,

	__construct: function __construct() {
		this.setWorkSaver();
	},

	startTimer: function startTimer(hasChanges) {
		clearTimeout(this.autoSaveTimer);
		if (hasChanges) {
			this.autoSaveTimer = setTimeout(_.bind(this.doAutoSave, this), this.autosaveInterval);
		}
	},

	saveDraft: function saveDraft() {
		var postStatus = elementor.settings.page.model.get('post_status');

		if (!elementor.saver.isEditorChanged() && 'draft' !== postStatus) {
			return;
		}

		switch (postStatus) {
			case 'publish':
			case 'private':
				this.doAutoSave();
				break;
			default:
				// Update and create a revision
				this.update();
		}
	},

	doAutoSave: function doAutoSave() {
		var editorMode = elementor.channels.dataEditMode.request('activeMode');

		// Avoid auto save for Revisions Preview changes.
		if ('edit' !== editorMode) {
			return;
		}

		this.saveAutoSave();
	},

	saveAutoSave: function saveAutoSave(options) {
		if (!this.isEditorChanged()) {
			return;
		}

		options = _.extend({
			status: 'autosave'
		}, options);

		this.saveEditor(options);
	},

	savePending: function savePending(options) {
		options = _.extend({
			status: 'pending'
		}, options);

		this.saveEditor(options);
	},

	discard: function discard() {
		var self = this;
		elementor.ajax.addRequest('discard_changes', {
			success: function success() {
				self.setFlagEditorChange(false);
				location.href = elementor.config.document.urls.exit_to_dashboard;
			}
		});
	},

	update: function update(options) {
		options = _.extend({
			status: elementor.settings.page.model.get('post_status')
		}, options);

		this.saveEditor(options);
	},

	publish: function publish(options) {
		options = _.extend({
			status: 'publish'
		}, options);

		this.saveEditor(options);
	},

	setFlagEditorChange: function setFlagEditorChange(status) {
		if (status && this.isSaving) {
			this.isChangedDuringSave = true;
		}

		this.startTimer(status);

		elementor.channels.editor.reply('status', status).trigger('status:change', status);
	},

	isEditorChanged: function isEditorChanged() {
		return true === elementor.channels.editor.request('status');
	},

	setWorkSaver: function setWorkSaver() {
		var self = this;
		elementor.$window.on('beforeunload', function () {
			if (self.isEditorChanged()) {
				return elementor.translate('before_unload_alert');
			}
		});
	},

	saveEditor: function saveEditor(options) {
		if (this.isSaving) {
			return;
		}

		options = _.extend({
			status: 'draft',
			onSuccess: null
		}, options);

		var self = this,
		    elements = elementor.elements.toJSON({ removeDefault: true }),
		    settings = elementor.settings.page.model.toJSON({ removeDefault: true }),
		    oldStatus = elementor.settings.page.model.get('post_status'),
		    statusChanged = oldStatus !== options.status;

		self.trigger('before:save', options).trigger('before:save:' + options.status, options);

		self.isSaving = true;

		self.isChangedDuringSave = false;

		settings.post_status = options.status;

		elementor.ajax.addRequest('save_builder', {
			data: {
				status: options.status,
				elements: elements,
				settings: settings
			},

			success: function success(data) {
				self.afterAjax();

				if ('autosave' !== options.status) {
					if (statusChanged) {
						elementor.settings.page.model.set('post_status', options.status);
					}

					// Notice: Must be after update page.model.post_status to the new status.
					if (!self.isChangedDuringSave) {
						self.setFlagEditorChange(false);
					}
				}

				if (data.config) {
					jQuery.extend(true, elementor.config, data.config);
				}

				elementor.config.data = elements;

				elementor.channels.editor.trigger('saved', data);

				self.trigger('after:save', data).trigger('after:save:' + options.status, data);

				if (statusChanged) {
					self.trigger('page:status:change', options.status, oldStatus);
				}

				if (_.isFunction(options.onSuccess)) {
					options.onSuccess.call(this, data);
				}
			},
			error: function error(data) {
				self.afterAjax();

				self.trigger('after:saveError', data).trigger('after:saveError:' + options.status, data);

				var message;

				if (_.isString(data)) {
					message = data;
				} else if (data.statusText) {
					message = elementor.ajax.createErrorMessage(data);

					if (0 === data.readyState) {
						message += ' ' + elementor.translate('saving_disabled');
					}
				} else if (data[0] && data[0].code) {
					message = elementor.translate('server_error') + ' ' + data[0].code;
				}

				elementor.notifications.showToast({
					message: message
				});
			}
		});
	},

	afterAjax: function afterAjax() {
		this.isSaving = false;
	}
});

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Module = __webpack_require__(2);

module.exports = Module.extend({
	initToast: function initToast() {
		var toast = elementor.dialogsManager.createWidget('buttons', {
			id: 'elementor-toast',
			position: {
				my: 'center bottom',
				at: 'center bottom-10',
				of: '#elementor-panel-content-wrapper',
				autoRefresh: true
			},
			hide: {
				onClick: true,
				auto: true,
				autoDelay: 10000
			},
			effects: {
				show: function show() {
					var $widget = toast.getElements('widget');

					$widget.show();

					toast.refreshPosition();

					var top = parseInt($widget.css('top'), 10);

					$widget.hide().css('top', top + 100);

					$widget.animate({
						opacity: 'show',
						height: 'show',
						paddingBottom: 'show',
						paddingTop: 'show',
						top: top
					}, {
						easing: 'linear',
						duration: 300
					});
				},
				hide: function hide() {
					var $widget = toast.getElements('widget'),
					    top = parseInt($widget.css('top'), 10);

					$widget.animate({
						opacity: 'hide',
						height: 'hide',
						paddingBottom: 'hide',
						paddingTop: 'hide',
						top: top + 100
					}, {
						easing: 'linear',
						duration: 300
					});
				}
			},
			button: {
				tag: 'div'
			}
		});

		this.getToast = function () {
			return toast;
		};
	},

	showToast: function showToast(options) {
		var toast = this.getToast();

		toast.setMessage(options.message);

		toast.getElements('buttonsWrapper').empty();

		if (options.buttons) {
			options.buttons.forEach(function (button) {
				toast.addButton(button);
			});
		}

		toast.show();
	},

	onInit: function onInit() {
		this.initToast();
	}
});

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BaseRegion = __webpack_require__(23);

module.exports = BaseRegion.extend({
	el: '#elementor-panel',

	getStorageKey: function getStorageKey() {
		return 'panel';
	},

	getDefaultStorage: function getDefaultStorage() {
		return {
			size: {
				width: ''
			}
		};
	},

	constructor: function constructor() {
		BaseRegion.prototype.constructor.apply(this, arguments);

		var PanelLayoutView = __webpack_require__(141);

		this.show(new PanelLayoutView());

		this.resizable();

		this.setSize();

		this.listenTo(elementor.channels.dataEditMode, 'switch', this.onEditModeSwitched);
	},

	setSize: function setSize() {
		var width = this.storage.size.width,
		    side = elementor.config.is_rtl ? 'right' : 'left';

		this.$el.css('width', width);

		elementor.$previewWrapper.css(side, width);
	},

	resizable: function resizable() {
		var self = this,
		    side = elementor.config.is_rtl ? 'right' : 'left';

		self.$el.resizable({
			handles: elementor.config.is_rtl ? 'w' : 'e',
			minWidth: 200,
			maxWidth: 680,
			start: function start() {
				elementor.$previewWrapper.addClass('ui-resizable-resizing');
			},
			stop: function stop() {
				elementor.$previewWrapper.removeClass('ui-resizable-resizing');

				elementor.getPanelView().updateScrollbar();

				self.saveSize();
			},
			resize: function resize(event, ui) {
				elementor.$previewWrapper.css(side, ui.size.width);
			}
		});
	},

	onEditModeSwitched: function onEditModeSwitched(activeMode) {
		if ('edit' !== activeMode) {
			return;
		}

		this.setSize();
	}
});

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var EditModeItemView = __webpack_require__(142),
    PanelLayoutView;

PanelLayoutView = Marionette.LayoutView.extend({
	template: '#tmpl-elementor-panel',

	id: 'elementor-panel-inner',

	regions: {
		content: '#elementor-panel-content-wrapper',
		header: '#elementor-panel-header-wrapper',
		footer: '#elementor-panel-footer',
		modeSwitcher: '#elementor-mode-switcher'
	},

	pages: {},

	childEvents: {
		'click:add': function clickAdd() {
			this.setPage('elements');
		},
		'editor:destroy': function editorDestroy() {
			this.setPage('elements', null, { autoFocusSearch: false });
		}
	},

	currentPageName: null,

	currentPageView: null,

	_isScrollbarInitialized: false,

	initialize: function initialize() {
		this.initPages();
	},

	buildPages: function buildPages() {
		var pages = {
			elements: {
				view: __webpack_require__(143),
				title: '<img src="' + elementor.config.assets_url + 'images/logo-panel.svg">'
			},
			editor: {
				view: __webpack_require__(148)
			},
			menu: {
				view: elementor.modules.layouts.panel.pages.menu.Menu,
				title: '<img src="' + elementor.config.assets_url + 'images/logo-panel.svg">'
			},
			colorScheme: {
				view: __webpack_require__(42)
			},
			typographyScheme: {
				view: __webpack_require__(151)
			},
			colorPickerScheme: {
				view: __webpack_require__(152)
			}
		};

		var schemesTypes = Object.keys(elementor.schemes.getSchemes()),
		    disabledSchemes = _.difference(schemesTypes, elementor.schemes.getEnabledSchemesTypes());

		_.each(disabledSchemes, function (schemeType) {
			var scheme = elementor.schemes.getScheme(schemeType);

			pages[schemeType + 'Scheme'].view = __webpack_require__(153).extend({
				disabledTitle: scheme.disabled_title
			});
		});

		return pages;
	},

	initPages: function initPages() {
		var pages;

		this.getPages = function (page) {
			if (!pages) {
				pages = this.buildPages();
			}

			return page ? pages[page] : pages;
		};

		this.addPage = function (pageName, pageData) {
			if (!pages) {
				pages = this.buildPages();
			}

			pages[pageName] = pageData;
		};
	},

	getHeaderView: function getHeaderView() {
		return this.getChildView('header');
	},

	getFooterView: function getFooterView() {
		return this.getChildView('footer');
	},

	getCurrentPageName: function getCurrentPageName() {
		return this.currentPageName;
	},

	getCurrentPageView: function getCurrentPageView() {
		return this.currentPageView;
	},

	setPage: function setPage(page, title, viewOptions) {
		var pages = this.getPages();

		if ('elements' === page && !elementor.userCan('design')) {
			if (pages.page_settings) {
				page = 'page_settings';
			}
		}

		var pageData = pages[page];

		if (!pageData) {
			throw new ReferenceError('Elementor panel doesn\'t have page named \'' + page + '\'');
		}

		if (pageData.options) {
			viewOptions = _.extend(pageData.options, viewOptions);
		}

		var View = pageData.view;

		if (pageData.getView) {
			View = pageData.getView();
		}

		this.currentPageName = page;

		this.currentPageView = new View(viewOptions);

		this.showChildView('content', this.currentPageView);

		this.getHeaderView().setTitle(title || pageData.title);

		this.trigger('set:page', this.currentPageView).trigger('set:page:' + page, this.currentPageView);
	},

	openEditor: function openEditor(model, view) {
		this.setPage('editor', elementor.translate('edit_element', [elementor.getElementData(model).title]), {
			model: model,
			controls: elementor.getElementControls(model),
			editedElementView: view
		});

		var action = 'panel/open_editor/' + model.get('elType');

		// Example: panel/open_editor/widget
		elementor.hooks.doAction(action, this, model, view);

		// Example: panel/open_editor/widget/heading
		elementor.hooks.doAction(action + '/' + model.get('widgetType'), this, model, view);
	},

	onBeforeShow: function onBeforeShow() {
		var PanelFooterItemView = __webpack_require__(154),
		    PanelHeaderItemView = __webpack_require__(155);

		// Edit Mode
		this.showChildView('modeSwitcher', new EditModeItemView());

		// Header
		this.showChildView('header', new PanelHeaderItemView());

		// Footer
		this.showChildView('footer', new PanelFooterItemView());

		// Added Editor events
		this.updateScrollbar = _.throttle(this.updateScrollbar, 100);

		this.getRegion('content').on('before:show', this.onEditorBeforeShow.bind(this)).on('empty', this.onEditorEmpty.bind(this)).on('show', this.updateScrollbar.bind(this));

		// Set default page to elements
		this.setPage('elements');
	},

	onEditorBeforeShow: function onEditorBeforeShow() {
		_.defer(this.updateScrollbar.bind(this));
	},

	onEditorEmpty: function onEditorEmpty() {
		this.updateScrollbar();
	},

	updateScrollbar: function updateScrollbar() {
		var $panel = this.content.$el;

		if (!this._isScrollbarInitialized) {
			$panel.perfectScrollbar();
			this._isScrollbarInitialized = true;

			return;
		}

		$panel.perfectScrollbar('update');
	}
});

module.exports = PanelLayoutView;

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var EditModeItemView;

EditModeItemView = Marionette.ItemView.extend({
	template: '#tmpl-elementor-mode-switcher-content',

	id: 'elementor-mode-switcher-inner',

	ui: {
		previewButton: '#elementor-mode-switcher-preview-input',
		previewLabel: '#elementor-mode-switcher-preview',
		previewLabelA11y: '#elementor-mode-switcher-preview .elementor-screen-only'
	},

	events: {
		'change @ui.previewButton': 'onPreviewButtonChange'
	},

	initialize: function initialize() {
		this.listenTo(elementor.channels.dataEditMode, 'switch', this.onEditModeChanged);
	},

	getCurrentMode: function getCurrentMode() {
		return this.ui.previewButton.is(':checked') ? 'preview' : 'edit';
	},

	setMode: function setMode(mode) {
		this.ui.previewButton.prop('checked', 'preview' === mode).trigger('change');
	},

	toggleMode: function toggleMode() {
		this.setMode(this.ui.previewButton.prop('checked') ? 'edit' : 'preview');
	},

	onRender: function onRender() {
		this.onEditModeChanged();
	},

	onPreviewButtonChange: function onPreviewButtonChange() {
		elementor.changeEditMode(this.getCurrentMode());
	},

	onEditModeChanged: function onEditModeChanged() {
		var activeMode = elementor.channels.dataEditMode.request('activeMode'),
		    title = elementor.translate('preview' === activeMode ? 'back_to_editor' : 'preview');

		this.ui.previewLabel.attr('title', title);
		this.ui.previewLabelA11y.text(title);
	}
});

module.exports = EditModeItemView;

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PanelElementsCategoriesCollection = __webpack_require__(144),
    PanelElementsElementsCollection = __webpack_require__(41),
    PanelElementsCategoriesView = __webpack_require__(145),
    PanelElementsElementsView = elementor.modules.layouts.panel.pages.elements.views.Elements,
    PanelElementsSearchView = __webpack_require__(147),
    PanelElementsGlobalView = __webpack_require__(38),
    PanelElementsLayoutView;

PanelElementsLayoutView = Marionette.LayoutView.extend({
	template: '#tmpl-elementor-panel-elements',

	options: {
		autoFocusSearch: true
	},

	regions: {
		elements: '#elementor-panel-elements-wrapper',
		search: '#elementor-panel-elements-search-area'
	},

	ui: {
		tabs: '.elementor-panel-navigation-tab'
	},

	events: {
		'click @ui.tabs': 'onTabClick'
	},

	regionViews: {},

	elementsCollection: null,

	categoriesCollection: null,

	initialize: function initialize() {
		this.listenTo(elementor.channels.panelElements, 'element:selected', this.destroy);

		this.initElementsCollection();

		this.initCategoriesCollection();

		this.initRegionViews();
	},

	initRegionViews: function initRegionViews() {
		var regionViews = {
			elements: {
				region: this.elements,
				view: PanelElementsElementsView,
				options: { collection: this.elementsCollection }
			},
			categories: {
				region: this.elements,
				view: PanelElementsCategoriesView,
				options: { collection: this.categoriesCollection }
			},
			search: {
				region: this.search,
				view: PanelElementsSearchView
			},
			global: {
				region: this.elements,
				view: PanelElementsGlobalView
			}
		};

		this.regionViews = elementor.hooks.applyFilters('panel/elements/regionViews', regionViews);
	},

	initElementsCollection: function initElementsCollection() {
		var elementsCollection = new PanelElementsElementsCollection(),
		    sectionConfig = elementor.config.elements.section;

		elementsCollection.add({
			title: elementor.translate('inner_section'),
			elType: 'section',
			categories: ['basic'],
			keywords: ['row', 'columns', 'nested'],
			icon: sectionConfig.icon
		});

		// TODO: Change the array from server syntax, and no need each loop for initialize
		_.each(elementor.config.widgets, function (widget) {
			if (!widget.show_in_panel) {
				return;
			}

			elementsCollection.add({
				title: widget.title,
				elType: widget.elType,
				categories: widget.categories,
				keywords: widget.keywords,
				icon: widget.icon,
				widgetType: widget.widget_type,
				custom: widget.custom
			});
		});

		this.elementsCollection = elementsCollection;
	},

	initCategoriesCollection: function initCategoriesCollection() {
		var categories = {};

		this.elementsCollection.each(function (element) {
			_.each(element.get('categories'), function (category) {
				if (!categories[category]) {
					categories[category] = [];
				}

				categories[category].push(element);
			});
		});

		var categoriesCollection = new PanelElementsCategoriesCollection();

		_.each(elementor.config.document.panel.elements_categories, function (categoryConfig, categoryName) {
			if (!categories[categoryName]) {
				return;
			}

			// Set defaults.
			if ('undefined' === typeof categoryConfig.active) {
				categoryConfig.active = true;
			}

			if ('undefined' === typeof categoryConfig.icon) {
				categoryConfig.icon = 'font';
			}

			categoriesCollection.add({
				name: categoryName,
				title: categoryConfig.title,
				icon: categoryConfig.icon,
				defaultActive: categoryConfig.active,
				items: categories[categoryName]
			});
		});

		this.categoriesCollection = categoriesCollection;
	},

	activateTab: function activateTab(tabName) {
		this.ui.tabs.removeClass('elementor-active').filter('[data-view="' + tabName + '"]').addClass('elementor-active');

		this.showView(tabName);
	},

	showView: function showView(viewName) {
		var viewDetails = this.regionViews[viewName],
		    options = viewDetails.options || {};

		viewDetails.region.show(new viewDetails.view(options));
	},

	clearSearchInput: function clearSearchInput() {
		this.getChildView('search').clearInput();
	},

	changeFilter: function changeFilter(filterValue) {
		elementor.channels.panelElements.reply('filter:value', filterValue).trigger('filter:change');
	},

	clearFilters: function clearFilters() {
		this.changeFilter(null);
		this.clearSearchInput();
	},

	focusSearch: function focusSearch() {
		if (!elementor.userCan('design')) {
			return;
		}

		this.search.currentView.ui.input.focus();
	},

	onChildviewChildrenRender: function onChildviewChildrenRender() {
		elementor.getPanelView().updateScrollbar();
	},

	onChildviewSearchChangeInput: function onChildviewSearchChangeInput(child) {
		this.changeFilter(child.ui.input.val(), 'search');
	},

	onDestroy: function onDestroy() {
		elementor.channels.panelElements.reply('filter:value', null);
	},

	onShow: function onShow() {
		this.showView('categories');

		this.showView('search');

		if (this.options.autoFocusSearch) {
			setTimeout(this.focusSearch.bind(this));
		}
	},

	onTabClick: function onTabClick(event) {
		this.activateTab(event.currentTarget.dataset.view);
	}
});

module.exports = PanelElementsLayoutView;

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PanelElementsCategory = __webpack_require__(40),
    PanelElementsCategoriesCollection;

PanelElementsCategoriesCollection = Backbone.Collection.extend({
	model: PanelElementsCategory
});

module.exports = PanelElementsCategoriesCollection;

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PanelElementsCategoryView = __webpack_require__(146),
    PanelElementsCategoriesView;

PanelElementsCategoriesView = Marionette.CompositeView.extend({
	template: '#tmpl-elementor-panel-categories',

	childView: PanelElementsCategoryView,

	childViewContainer: '#elementor-panel-categories',

	id: 'elementor-panel-elements-categories',

	initialize: function initialize() {
		this.listenTo(elementor.channels.panelElements, 'filter:change', this.onPanelElementsFilterChange);
	},

	onPanelElementsFilterChange: function onPanelElementsFilterChange() {
		if (elementor.channels.panelElements.request('filter:value')) {
			elementor.getPanelView().getCurrentPageView().showView('elements');
		}
	}
});

module.exports = PanelElementsCategoriesView;

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PanelElementsElementsCollection = __webpack_require__(41),
    PanelElementsCategoryView;

PanelElementsCategoryView = Marionette.CompositeView.extend({
	template: '#tmpl-elementor-panel-elements-category',

	className: 'elementor-panel-category',

	ui: {
		title: '.elementor-panel-category-title',
		items: '.elementor-panel-category-items'
	},

	events: {
		'click @ui.title': 'onTitleClick'
	},

	id: function id() {
		return 'elementor-panel-category-' + this.model.get('name');
	},

	childView: __webpack_require__(39),

	childViewContainer: '.elementor-panel-category-items',

	initialize: function initialize() {
		this.collection = new PanelElementsElementsCollection(this.model.get('items'));
	},

	onRender: function onRender() {
		var isActive = elementor.channels.panelElements.request('category:' + this.model.get('name') + ':active');

		if (undefined === isActive) {
			isActive = this.model.get('defaultActive');
		}

		if (isActive) {
			this.$el.addClass('elementor-active');

			this.ui.items.show();
		}
	},

	onTitleClick: function onTitleClick() {
		var $items = this.ui.items,
		    activeClass = 'elementor-active',
		    isActive = this.$el.hasClass(activeClass),
		    slideFn = isActive ? 'slideUp' : 'slideDown';

		elementor.channels.panelElements.reply('category:' + this.model.get('name') + ':active', !isActive);

		this.$el.toggleClass(activeClass, !isActive);

		$items[slideFn](300, function () {
			elementor.getPanelView().updateScrollbar();
		});
	}
});

module.exports = PanelElementsCategoryView;

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PanelElementsSearchView;

PanelElementsSearchView = Marionette.ItemView.extend({
	template: '#tmpl-elementor-panel-element-search',

	id: 'elementor-panel-elements-search-wrapper',

	ui: {
		input: 'input'
	},

	events: {
		'input @ui.input': 'onInputChanged'
	},

	clearInput: function clearInput() {
		this.ui.input.val('');
	},

	onInputChanged: function onInputChanged(event) {
		var ESC_KEY = 27;

		if (ESC_KEY === event.keyCode) {
			this.clearInput();
		}

		this.triggerMethod('search:change:input');
	}
});

module.exports = PanelElementsSearchView;

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ControlsStack = __webpack_require__(12),
    EditorView;

EditorView = ControlsStack.extend({
	template: Marionette.TemplateCache.get('#tmpl-editor-content'),

	id: 'elementor-panel-page-editor',

	childViewContainer: '#elementor-controls',

	childViewOptions: function childViewOptions() {
		return {
			elementSettingsModel: this.model.get('settings'),
			elementEditSettings: this.model.get('editSettings')
		};
	},

	openActiveSection: function openActiveSection() {
		ControlsStack.prototype.openActiveSection.apply(this, arguments);

		elementor.channels.editor.trigger('section:activated', this.activeSection, this);
	},

	isVisibleSectionControl: function isVisibleSectionControl(sectionControlModel) {
		return ControlsStack.prototype.isVisibleSectionControl.apply(this, arguments) && elementor.helpers.isActiveControl(sectionControlModel, this.model.get('settings').attributes);
	},

	scrollToEditedElement: function scrollToEditedElement() {
		elementor.helpers.scrollToView(this.getOption('editedElementView').$el);
	},

	getControlView: function getControlView(name) {
		return this.children.findByModelCid(this.getControlModel(name).cid);
	},

	getControlModel: function getControlModel(name) {
		return this.collection.findWhere({ name: name });
	},

	onDestroy: function onDestroy() {
		var editedElementView = this.getOption('editedElementView');

		if (editedElementView) {
			editedElementView.$el.removeClass('elementor-element-editable');
		}

		this.model.trigger('editor:close');

		this.triggerMethod('editor:destroy');
	},

	onRender: function onRender() {
		var editedElementView = this.getOption('editedElementView');

		if (editedElementView) {
			editedElementView.$el.addClass('elementor-element-editable');
		}
	},

	onDeviceModeChange: function onDeviceModeChange() {
		ControlsStack.prototype.onDeviceModeChange.apply(this, arguments);

		this.scrollToEditedElement();
	},

	onChildviewSettingsChange: function onChildviewSettingsChange(childView) {
		var editedElementView = this.getOption('editedElementView'),
		    editedElementType = editedElementView.model.get('elType');

		if ('widget' === editedElementType) {
			editedElementType = editedElementView.model.get('widgetType');
		}

		elementor.channels.editor.trigger('change', childView, editedElementView).trigger('change:' + editedElementType, childView, editedElementView).trigger('change:' + editedElementType + ':' + childView.model.get('name'), childView, editedElementView);
	}
});

module.exports = EditorView;

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PanelSchemeItemView = __webpack_require__(44),
    PanelSchemeColorView;

PanelSchemeColorView = PanelSchemeItemView.extend({
	getUIType: function getUIType() {
		return 'color';
	},

	ui: {
		input: '.elementor-panel-scheme-color-value'
	},

	changeUIValue: function changeUIValue(newValue) {
		this.ui.input.wpColorPicker('color', newValue);
	},

	onBeforeDestroy: function onBeforeDestroy() {
		if (this.ui.input.wpColorPicker('instance')) {
			this.ui.input.wpColorPicker('close');
		}
	},

	onRender: function onRender() {
		var self = this;

		elementor.helpers.wpColorPicker(self.ui.input, {
			change: function change(event, ui) {
				self.triggerMethod('value:change', ui.color.toString());
			}
		});
	}
});

module.exports = PanelSchemeColorView;

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PanelSchemeItemView = __webpack_require__(44),
    PanelSchemeTypographyView;

PanelSchemeTypographyView = PanelSchemeItemView.extend({
	getUIType: function getUIType() {
		return 'typography';
	},

	className: function className() {
		var classes = PanelSchemeItemView.prototype.className.apply(this, arguments);

		return classes + ' elementor-panel-box';
	},

	ui: {
		heading: '.elementor-panel-heading',
		allFields: '.elementor-panel-scheme-typography-item-field',
		inputFields: 'input.elementor-panel-scheme-typography-item-field',
		selectFields: 'select.elementor-panel-scheme-typography-item-field',
		selectFamilyFields: 'select.elementor-panel-scheme-typography-item-field[name="font_family"]'
	},

	events: {
		'input @ui.inputFields': 'onFieldChange',
		'change @ui.selectFields': 'onFieldChange',
		'click @ui.heading': 'toggleVisibility'
	},

	onRender: function onRender() {
		var self = this;

		this.ui.inputFields.add(this.ui.selectFields).each(function () {
			var $this = jQuery(this),
			    name = $this.attr('name'),
			    value = self.model.get('value')[name];

			$this.val(value);
		});

		this.ui.selectFamilyFields.select2({
			dir: elementor.config.is_rtl ? 'rtl' : 'ltr'
		});
	},

	toggleVisibility: function toggleVisibility() {
		this.$el.toggleClass('elementor-open');
	},

	changeUIValue: function changeUIValue(newValue) {
		this.ui.allFields.each(function () {
			var $this = jQuery(this),
			    thisName = $this.attr('name'),
			    newFieldValue = newValue[thisName];

			$this.val(newFieldValue).trigger('change');
		});
	},

	onFieldChange: function onFieldChange(event) {
		var $select = this.$(event.currentTarget),
		    currentValue = elementor.schemes.getSchemeValue('typography', this.model.get('key')).value,
		    fieldKey = $select.attr('name');

		currentValue[fieldKey] = $select.val();

		if ('font_family' === fieldKey && !_.isEmpty(currentValue[fieldKey])) {
			elementor.helpers.enqueueFont(currentValue[fieldKey]);
		}

		this.triggerMethod('value:change', currentValue);
	}
});

module.exports = PanelSchemeTypographyView;

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PanelSchemeBaseView = __webpack_require__(43),
    PanelSchemeTypographyView;

PanelSchemeTypographyView = PanelSchemeBaseView.extend({
	getType: function getType() {
		return 'typography';
	}
});

module.exports = PanelSchemeTypographyView;

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PanelSchemeColorsView = __webpack_require__(42),
    PanelSchemeColorPickerView;

PanelSchemeColorPickerView = PanelSchemeColorsView.extend({
	getType: function getType() {
		return 'color-picker';
	},

	getUIType: function getUIType() {
		return 'color';
	},

	onSchemeChange: function onSchemeChange() {},

	getViewComparator: function getViewComparator() {
		return this.orderView;
	},

	orderView: function orderView(model) {
		return elementor.helpers.getColorPickerPaletteIndex(model.get('key'));
	}
});

module.exports = PanelSchemeColorPickerView;

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PanelSchemeDisabledView;

PanelSchemeDisabledView = Marionette.ItemView.extend({
	template: '#tmpl-elementor-panel-schemes-disabled',

	id: 'elementor-panel-schemes-disabled',

	className: 'elementor-nerd-box',

	disabledTitle: '',

	templateHelpers: function templateHelpers() {
		return {
			disabledTitle: this.disabledTitle
		};
	}
});

module.exports = PanelSchemeDisabledView;

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Marionette.ItemView.extend({
	template: '#tmpl-elementor-panel-footer-content',

	tagName: 'nav',

	id: 'elementor-panel-footer-tools',

	possibleRotateModes: ['portrait', 'landscape'],

	ui: {
		buttonSave: '#elementor-panel-saver-button-publish, #elementor-panel-saver-menu-save-draft', // TODO: remove. Compatibility for Pro <= 1.9.5
		menuButtons: '.elementor-panel-footer-tool',
		settings: '#elementor-panel-footer-settings',
		deviceModeIcon: '#elementor-panel-footer-responsive > i',
		deviceModeButtons: '#elementor-panel-footer-responsive .elementor-panel-footer-sub-menu-item',
		saveTemplate: '#elementor-panel-saver-menu-save-template',
		history: '#elementor-panel-footer-history',
		navigator: '#elementor-panel-footer-navigator'
	},

	events: {
		'click @ui.menuButtons': 'onMenuButtonsClick',
		'click @ui.settings': 'onSettingsClick',
		'click @ui.deviceModeButtons': 'onResponsiveButtonsClick',
		'click @ui.saveTemplate': 'onSaveTemplateClick',
		'click @ui.history': 'onHistoryClick',
		'click @ui.navigator': 'onNavigatorClick'
	},

	behaviors: function behaviors() {
		var behaviors = {
			saver: {
				behaviorClass: elementor.modules.components.saver.behaviors.FooterSaver
			}
		};

		return elementor.hooks.applyFilters('panel/footer/behaviors', behaviors, this);
	},

	initialize: function initialize() {
		this.listenTo(elementor.channels.deviceMode, 'change', this.onDeviceModeChange);
	},

	getDeviceModeButton: function getDeviceModeButton(deviceMode) {
		return this.ui.deviceModeButtons.filter('[data-device-mode="' + deviceMode + '"]');
	},

	onMenuButtonsClick: function onMenuButtonsClick(event) {
		var $tool = jQuery(event.currentTarget);

		// If the tool is not toggleable or the click is inside of a tool
		if (!$tool.hasClass('elementor-toggle-state') || jQuery(event.target).closest('.elementor-panel-footer-sub-menu-item').length) {
			return;
		}

		var isOpen = $tool.hasClass('elementor-open');

		this.ui.menuButtons.not('.elementor-leave-open').removeClass('elementor-open');

		if (!isOpen) {
			$tool.addClass('elementor-open');
		}
	},

	onSettingsClick: function onSettingsClick() {
		var self = this;

		if ('page_settings' !== elementor.getPanelView().getCurrentPageName()) {
			elementor.getPanelView().setPage('page_settings');

			elementor.getPanelView().getCurrentPageView().once('destroy', function () {
				self.ui.settings.removeClass('elementor-open');
			});
		}
	},

	onDeviceModeChange: function onDeviceModeChange() {
		var previousDeviceMode = elementor.channels.deviceMode.request('previousMode'),
		    currentDeviceMode = elementor.channels.deviceMode.request('currentMode');

		this.getDeviceModeButton(previousDeviceMode).removeClass('active');

		this.getDeviceModeButton(currentDeviceMode).addClass('active');

		// Change the footer icon
		this.ui.deviceModeIcon.removeClass('eicon-device-' + previousDeviceMode).addClass('eicon-device-' + currentDeviceMode);
	},

	onResponsiveButtonsClick: function onResponsiveButtonsClick(event) {
		var $clickedButton = this.$(event.currentTarget),
		    newDeviceMode = $clickedButton.data('device-mode');

		elementor.changeDeviceMode(newDeviceMode);
	},

	onSaveTemplateClick: function onSaveTemplateClick() {
		elementor.templates.startModal({
			onReady: function onReady() {
				elementor.templates.getLayout().showSaveTemplateView();
			}
		});
	},

	onHistoryClick: function onHistoryClick() {
		if ('historyPage' !== elementor.getPanelView().getCurrentPageName()) {
			elementor.getPanelView().setPage('historyPage');
		}
	},

	onNavigatorClick: function onNavigatorClick() {
		if (elementor.navigator.isOpen()) {
			elementor.navigator.close();
		} else {
			elementor.navigator.open();
		}
	}
});

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PanelHeaderItemView;

PanelHeaderItemView = Marionette.ItemView.extend({
	template: '#tmpl-elementor-panel-header',

	id: 'elementor-panel-header',

	ui: {
		menuButton: '#elementor-panel-header-menu-button',
		menuIcon: '#elementor-panel-header-menu-button i',
		title: '#elementor-panel-header-title',
		addButton: '#elementor-panel-header-add-button'
	},

	events: {
		'click @ui.addButton': 'onClickAdd',
		'click @ui.menuButton': 'onClickMenu'
	},

	setTitle: function setTitle(title) {
		this.ui.title.html(title);
	},

	onClickAdd: function onClickAdd() {
		elementor.getPanelView().setPage('elements');
	},

	onClickMenu: function onClickMenu() {
		var panel = elementor.getPanelView(),
		    currentPanelPageName = panel.getCurrentPageName(),
		    nextPage = 'menu' === currentPanelPageName ? 'elements' : 'menu';

		if ('menu' === nextPage) {
			var arrowClass = 'eicon-arrow-' + (elementor.config.is_rtl ? 'right' : 'left');

			this.ui.menuIcon.removeClass('eicon-menu-bar').addClass(arrowClass);
		}

		panel.setPage(nextPage);
	}
});

module.exports = PanelHeaderItemView;

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _independent = __webpack_require__(157);

var _independent2 = _interopRequireDefault(_independent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseSectionsContainerView = __webpack_require__(158),
    Preview;

Preview = BaseSectionsContainerView.extend({
	template: Marionette.TemplateCache.get('#tmpl-elementor-preview'),

	className: 'elementor-inner',

	childViewContainer: '.elementor-section-wrap',

	behaviors: function behaviors() {
		var parentBehaviors = BaseSectionsContainerView.prototype.behaviors.apply(this, arguments),
		    behaviors = {
			contextMenu: {
				behaviorClass: __webpack_require__(11),
				groups: this.getContextMenuGroups()
			}
		};

		if (elementor.config.user.introduction) {
			behaviors.introduction = {
				behaviorClass: __webpack_require__(159)
			};
		}

		return jQuery.extend(parentBehaviors, behaviors);
	},

	getContextMenuGroups: function getContextMenuGroups() {
		var hasContent = function hasContent() {
			return elementor.elements.length > 0;
		};

		return [{
			name: 'paste',
			actions: [{
				name: 'paste',
				title: elementor.translate('paste'),
				callback: this.paste.bind(this),
				isEnabled: this.isPasteEnabled.bind(this)
			}]
		}, {
			name: 'content',
			actions: [{
				name: 'copy_all_content',
				title: elementor.translate('copy_all_content'),
				callback: this.copy.bind(this),
				isEnabled: hasContent
			}, {
				name: 'delete_all_content',
				title: elementor.translate('delete_all_content'),
				callback: elementor.clearPage.bind(elementor),
				isEnabled: hasContent
			}]
		}];
	},

	copy: function copy() {
		elementor.setStorage('transfer', {
			type: 'copy',
			elementsType: 'section',
			elements: elementor.elements.toJSON({ copyHtmlCache: true })
		});
	},

	paste: function paste(atIndex) {
		var self = this,
		    transferData = elementor.getStorage('transfer'),
		    section,
		    index = undefined !== atIndex ? atIndex : this.collection.length;

		elementor.channels.data.trigger('element:before:add', transferData.elements[0]);

		if ('section' === transferData.elementsType) {
			transferData.elements.forEach(function (element) {
				self.addChildElement(element, {
					at: index,
					edit: false,
					clone: true
				});

				index++;
			});
		} else if ('column' === transferData.elementsType) {
			section = self.addChildElement({ allowEmpty: true }, { at: atIndex });

			section.model.unset('allowEmpty');

			index = 0;

			transferData.elements.forEach(function (element) {
				section.addChildElement(element, {
					at: index,
					clone: true
				});

				index++;
			});

			section.redefineLayout();
		} else {
			section = self.addChildElement(null, { at: atIndex });

			index = 0;

			transferData.elements.forEach(function (element) {
				section.addChildElement(element, {
					at: index,
					clone: true
				});

				index++;
			});
		}

		elementor.channels.data.trigger('element:after:add', transferData.elements[0]);
	},

	isPasteEnabled: function isPasteEnabled() {
		return elementor.getStorage('transfer');
	},

	onRender: function onRender() {
		if (!elementor.userCan('design')) {
			return;
		}
		var addNewSectionView = new _independent2.default();

		addNewSectionView.render();

		this.$el.append(addNewSectionView.$el);
	}
});

module.exports = Preview;

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = __webpack_require__(30);

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddSectionView = function (_BaseAddSectionView) {
	_inherits(AddSectionView, _BaseAddSectionView);

	function AddSectionView() {
		_classCallCheck(this, AddSectionView);

		return _possibleConstructorReturn(this, (AddSectionView.__proto__ || Object.getPrototypeOf(AddSectionView)).apply(this, arguments));
	}

	_createClass(AddSectionView, [{
		key: 'onCloseButtonClick',
		value: function onCloseButtonClick() {
			this.closeSelectPresets();
		}
	}, {
		key: 'id',
		get: function get() {
			return 'elementor-add-new-section';
		}
	}]);

	return AddSectionView;
}(_base2.default);

exports.default = AddSectionView;

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SectionView = __webpack_require__(29),
    BaseContainer = __webpack_require__(28),
    BaseSectionsContainerView;

BaseSectionsContainerView = BaseContainer.extend({
	childView: SectionView,

	behaviors: function behaviors() {
		var behaviors = {
			Sortable: {
				behaviorClass: __webpack_require__(19),
				elChildType: 'section'
			}
		};

		return elementor.hooks.applyFilters('elements/base-section-container/behaviors', behaviors, this);
	},

	getSortableOptions: function getSortableOptions() {
		return {
			handle: '> .elementor-element-overlay .elementor-editor-element-edit',
			items: '> .elementor-section'
		};
	},

	getChildType: function getChildType() {
		return ['section'];
	},

	initialize: function initialize() {
		BaseContainer.prototype.initialize.apply(this, arguments);

		this.listenTo(this.collection, 'add remove reset', this.onCollectionChanged).listenTo(elementor.channels.panelElements, 'element:drag:start', this.onPanelElementDragStart).listenTo(elementor.channels.panelElements, 'element:drag:end', this.onPanelElementDragEnd);
	},

	onCollectionChanged: function onCollectionChanged() {
		elementor.saver.setFlagEditorChange(true);
	},

	onPanelElementDragStart: function onPanelElementDragStart() {
		elementor.helpers.disableElementEvents(this.$el.find('iframe'));
	},

	onPanelElementDragEnd: function onPanelElementDragEnd() {
		elementor.helpers.enableElementEvents(this.$el.find('iframe'));
	}
});

module.exports = BaseSectionsContainerView;

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Marionette.Behavior.extend({

	introductionViewed: false,

	ui: {
		editButton: '.elementor-editor-element-edit'
	},

	events: {
		'click @ui.editButton': 'show'
	},

	initialize: function initialize() {
		this.initDialog();
	},

	initDialog: function initDialog() {
		var dialog;

		this.getDialog = function () {
			if (!dialog) {
				dialog = elementor.dialogsManager.createWidget('buttons', {
					className: 'elementor-introduction',
					headerMessage: elementor.translate('meet_right_click_header'),
					message: elementor.translate('meet_right_click_message'),
					iframe: elementor.$preview,
					position: {
						my: 'center top+5',
						at: 'center bottom',
						collision: 'fit'
					},
					effects: {
						hide: 'hide',
						show: 'show'
					},
					hide: {
						onBackgroundClick: false
					}
				});

				dialog.addButton({
					name: 'learn-more',
					text: elementor.translate('learn_more'),
					tag: 'div',
					callback: function callback() {
						open(elementor.config.help_right_click_url, '_blank');
					}
				});

				dialog.addButton({
					name: 'ok',
					text: elementor.translate('got_it'),
					callback: this.setIntroductionViewed.bind(this)
				});

				dialog.getElements('ok').addClass('elementor-button elementor-button-success');
			}

			return dialog;
		};
	},

	show: function show(event) {
		if (this.introductionViewed) {
			return;
		}

		var dialog = this.getDialog();

		dialog.setSettings('position', {
			of: event.currentTarget
		});

		dialog.show();
	},

	setIntroductionViewed: function setIntroductionViewed() {
		this.introductionViewed = true;

		elementor.ajax.addRequest('introduction_viewed');
	}
});

/***/ })
/******/ ]);
//# sourceMappingURL=editor.js.map