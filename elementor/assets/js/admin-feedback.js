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
/******/ 	return __webpack_require__(__webpack_require__.s = 162);
/******/ })
/************************************************************************/
/******/ ({

/***/ 162:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global jQuery, ElementorAdminFeedbackArgs */
(function ($) {
	'use strict';

	var ElementorAdminDialogApp = {

		cacheElements: function cacheElements() {
			this.cache = {
				$deactivateLink: $('#the-list').find('[data-slug="elementor"] span.deactivate a'),
				$dialogHeader: $('#elementor-deactivate-feedback-dialog-header'),
				$dialogForm: $('#elementor-deactivate-feedback-dialog-form')
			};
		},

		bindEvents: function bindEvents() {
			var self = this;

			self.cache.$deactivateLink.on('click', function (event) {
				event.preventDefault();

				self.getModal().show();
			});
		},

		deactivate: function deactivate() {
			location.href = this.cache.$deactivateLink.attr('href');
		},

		initModal: function initModal() {
			var self = this,
			    modal;

			self.getModal = function () {
				if (!modal) {
					modal = elementorAdmin.getDialogsManager().createWidget('lightbox', {
						id: 'elementor-deactivate-feedback-modal',
						headerMessage: self.cache.$dialogHeader,
						message: self.cache.$dialogForm,
						hide: {
							onButtonClick: false
						},
						position: {
							my: 'center',
							at: 'center'
						},
						onReady: function onReady() {
							DialogsManager.getWidgetType('lightbox').prototype.onReady.apply(this, arguments);

							this.addButton({
								name: 'submit',
								text: ElementorAdminFeedbackArgs.i18n.submit_n_deactivate,
								callback: self.sendFeedback.bind(self)
							});

							if (!ElementorAdminFeedbackArgs.is_tracker_opted_in) {
								this.addButton({
									name: 'skip',
									text: ElementorAdminFeedbackArgs.i18n.skip_n_deactivate,
									callback: function callback() {
										self.deactivate();
									}
								});
							}
						},

						onShow: function onShow() {
							var $dialogModal = $('#elementor-deactivate-feedback-modal'),
							    radioSelector = '.elementor-deactivate-feedback-dialog-input';

							$dialogModal.find(radioSelector).on('change', function () {
								$dialogModal.attr('data-feedback-selected', $(this).val());
							});

							$dialogModal.find(radioSelector + ':checked').trigger('change');
						}
					});
				}

				return modal;
			};
		},

		sendFeedback: function sendFeedback() {
			var self = this,
			    formData = self.cache.$dialogForm.serialize();

			self.getModal().getElements('submit').text('').addClass('elementor-loading');

			$.post(ajaxurl, formData, this.deactivate.bind(this));
		},

		init: function init() {
			this.initModal();
			this.cacheElements();
			this.bindEvents();
		}
	};

	$(function () {
		ElementorAdminDialogApp.init();
	});
})(jQuery);

/***/ })

/******/ });
//# sourceMappingURL=admin-feedback.js.map