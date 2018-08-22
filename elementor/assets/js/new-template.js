/*! elementor - v2.1.8 - 21-08-2018 */
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var BaseModalLayout = require( 'elementor-templates/views/base-modal-layout' ),
	NewTemplateView = require( 'elementor-admin/new-template/view' );

module.exports = BaseModalLayout.extend( {

	getModalOptions: function() {

		return {
			id: 'elementor-new-template-modal'
		};
	},

	getLogoOptions: function() {

		return {
			title: elementorAdmin.config.i18n.new_template
		};
	},

	initialize: function() {
		BaseModalLayout.prototype.initialize.apply( this, arguments );

		this.showLogo();

		this.showContentView();
	},

	getDialogsManager: function() {
		return elementorAdmin.getDialogsManager();
	},

	showContentView: function() {
		this.modalContent.show( new NewTemplateView() );
	}
} );

},{"elementor-admin/new-template/view":3,"elementor-templates/views/base-modal-layout":4}],2:[function(require,module,exports){
var ViewModule = require( 'elementor-utils/view-module' ),
	NewTemplateLayout = require( 'elementor-admin/new-template/layout' );

var NewTemplateModule = ViewModule.extend( {

	getDefaultSettings: function() {

		return {
			selectors: {
				addButton: '.page-title-action:first, #elementor-template-library-add-new'
			}
		};
	},

	getDefaultElements: function() {
		var selectors = this.getSettings( 'selectors' );

		return {
			$addButton: jQuery( selectors.addButton )
		};
	},

	bindEvents: function() {
		this.elements.$addButton.on( 'click', this.onAddButtonClick );
	},

	onInit: function() {
		ViewModule.prototype.onInit.apply( this, arguments );

		this.layout = new NewTemplateLayout();
	},

	onAddButtonClick: function( event ) {
		event.preventDefault();

		this.layout.showModal();
	}
} );

jQuery( function() {
	new NewTemplateModule();
} );

},{"elementor-admin/new-template/layout":1,"elementor-utils/view-module":9}],3:[function(require,module,exports){
module.exports = Marionette.ItemView.extend( {

	id: 'elementor-new-template-dialog-content',

	template: '#tmpl-elementor-new-template',

	ui: {},

	events: {},

	onRender: function() {}
} );

},{}],4:[function(require,module,exports){
var TemplateLibraryHeaderView = require( 'elementor-templates/views/parts/header' ),
	TemplateLibraryHeaderLogoView = require( 'elementor-templates/views/parts/header-parts/logo' ),
	TemplateLibraryLoadingView = require( 'elementor-templates/views/parts/loading' );

module.exports = Marionette.LayoutView.extend( {
	el: function() {
		return this.modal.getElements( 'widget' );
	},

	modal: null,

	regions: function() {
		return {
			modalHeader: '.dialog-header',
			modalContent: '.dialog-lightbox-content',
			modalLoading: '.dialog-lightbox-loading'
		};
	},

	constructor: function() {
		this.initModal();

		Marionette.LayoutView.prototype.constructor.apply( this, arguments );
	},

	initialize: function() {
		this.modalHeader.show( new TemplateLibraryHeaderView( this.getHeaderOptions() ) );
	},

	initModal: function() {
		var modalOptions = {
			className: 'elementor-templates-modal',
			closeButton: false,
			hide: {
				onOutsideClick: false
			}
		};

		jQuery.extend( true, modalOptions, this.getModalOptions() );

		this.modal = this.getDialogsManager().createWidget( 'lightbox', modalOptions );

		this.modal.getElements( 'message' ).append( this.modal.addElement( 'content' ), this.modal.addElement( 'loading' ) );
	},

	getDialogsManager: function() {
		return elementor.dialogsManager;
	},

	showModal: function() {
		this.modal.show();
	},

	hideModal: function() {
		this.modal.hide();
	},

	getModalOptions: function() {
		return {};
	},

	getLogoOptions: function() {
		return {};
	},

	getHeaderOptions: function() {
		return {};
	},

	getHeaderView: function() {
		return this.modalHeader.currentView;
	},

	showLoadingView: function() {
		this.modalLoading.show( new TemplateLibraryLoadingView() );

		this.modalLoading.$el.show();

		this.modalContent.$el.hide();
	},

	hideLoadingView: function() {
		this.modalContent.$el.show();

		this.modalLoading.$el.hide();
	},

	showLogo: function() {
		this.getHeaderView().logoArea.show( new TemplateLibraryHeaderLogoView( this.getLogoOptions() ) );
	}
} );

},{"elementor-templates/views/parts/header":6,"elementor-templates/views/parts/header-parts/logo":5,"elementor-templates/views/parts/loading":7}],5:[function(require,module,exports){
module.exports = Marionette.ItemView.extend( {
	template: '#tmpl-elementor-templates-modal__header__logo',

	className: 'elementor-templates-modal__header__logo',

	events: {
		'click': 'onClick'
	},

	templateHelpers: function() {
		return {
			title: this.getOption( 'title' )
		};
	},

	onClick: function() {
		var clickCallback = this.getOption( 'click' );

		if ( clickCallback ) {
			clickCallback();
		}
	}
} );

},{}],6:[function(require,module,exports){
var TemplateLibraryHeaderView;

TemplateLibraryHeaderView = Marionette.LayoutView.extend( {

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

	templateHelpers: function() {
		return {
			closeType: this.getOption( 'closeType' )
		};
	},

	onCloseModalClick: function() {
		this._parent._parent._parent.hideModal();
	}
} );

module.exports = TemplateLibraryHeaderView;

},{}],7:[function(require,module,exports){
var TemplateLibraryLoadingView;

TemplateLibraryLoadingView = Marionette.ItemView.extend( {
	id: 'elementor-template-library-loading',

	template: '#tmpl-elementor-template-library-loading'
} );

module.exports = TemplateLibraryLoadingView;

},{}],8:[function(require,module,exports){
var Module = function() {
	var $ = jQuery,
		instanceParams = arguments,
		self = this,
		settings,
		events = {};

	var ensureClosureMethods = function() {
		$.each( self, function( methodName ) {
			var oldMethod = self[ methodName ];

			if ( 'function' !== typeof oldMethod ) {
				return;
			}

			self[ methodName ] = function() {
				return oldMethod.apply( self, arguments );
			};
		});
	};

	var initSettings = function() {
		settings = self.getDefaultSettings();

		var instanceSettings = instanceParams[0];

		if ( instanceSettings ) {
			$.extend( settings, instanceSettings );
		}
	};

	var init = function() {
		self.__construct.apply( self, instanceParams );

		ensureClosureMethods();

		initSettings();

		self.trigger( 'init' );
	};

	this.getItems = function( items, itemKey ) {
		if ( itemKey ) {
			var keyStack = itemKey.split( '.' ),
				currentKey = keyStack.splice( 0, 1 );

			if ( ! keyStack.length ) {
				return items[ currentKey ];
			}

			if ( ! items[ currentKey ] ) {
				return;
			}

			return this.getItems(  items[ currentKey ], keyStack.join( '.' ) );
		}

		return items;
	};

	this.getSettings = function( setting ) {
		return this.getItems( settings, setting );
	};

	this.setSettings = function( settingKey, value, settingsContainer ) {
		if ( ! settingsContainer ) {
			settingsContainer = settings;
		}

		if ( 'object' === typeof settingKey ) {
			$.extend( settingsContainer, settingKey );

			return self;
		}

		var keyStack = settingKey.split( '.' ),
			currentKey = keyStack.splice( 0, 1 );

		if ( ! keyStack.length ) {
			settingsContainer[ currentKey ] = value;

			return self;
		}

		if ( ! settingsContainer[ currentKey ] ) {
			settingsContainer[ currentKey ] = {};
		}

		return self.setSettings( keyStack.join( '.' ), value, settingsContainer[ currentKey ] );
	};

	this.forceMethodImplementation = function( methodArguments ) {
		var functionName = methodArguments.callee.name;

		throw new ReferenceError( 'The method ' + functionName + ' must to be implemented in the inheritor child.' );
	};

	this.on = function( eventName, callback ) {
		if ( 'object' === typeof eventName ) {
			$.each( eventName, function( singleEventName ) {
				self.on( singleEventName, this );
			} );

			return self;
		}

		var eventNames = eventName.split( ' ' );

		eventNames.forEach( function( singleEventName ) {
			if ( ! events[ singleEventName ] ) {
				events[ singleEventName ] = [];
			}

			events[ singleEventName ].push( callback );
		} );

		return self;
	};

	this.off = function( eventName, callback ) {
		if ( ! events[ eventName ] ) {
			return self;
		}

		if ( ! callback ) {
			delete events[ eventName ];

			return self;
		}

		var callbackIndex = events[ eventName ].indexOf( callback );

		if ( -1 !== callbackIndex ) {
			delete events[ eventName ][ callbackIndex ];
		}

		return self;
	};

	this.trigger = function( eventName ) {
		var methodName = 'on' + eventName[ 0 ].toUpperCase() + eventName.slice( 1 ),
			params = Array.prototype.slice.call( arguments, 1 );

		if ( self[ methodName ] ) {
			self[ methodName ].apply( self, params );
		}

		var callbacks = events[ eventName ];

		if ( ! callbacks ) {
			return self;
		}

		$.each( callbacks, function( index, callback ) {
			callback.apply( self, params );
		} );

		return self;
	};

	init();
};

Module.prototype.__construct = function() {};

Module.prototype.getDefaultSettings = function() {
	return {};
};

Module.extendsCount = 0;

Module.extend = function( properties ) {
	var $ = jQuery,
		parent = this;

	var child = function() {
		return parent.apply( this, arguments );
	};

	$.extend( child, parent );

	child.prototype = Object.create( $.extend( {}, parent.prototype, properties ) );

	child.prototype.constructor = child;

	/*
	 * Constructor ID is used to set an unique ID
     * to every extend of the Module.
     *
	 * It's useful in some cases such as unique
	 * listener for frontend handlers.
	 */
	var constructorID = ++Module.extendsCount;

	child.prototype.getConstructorID = function() {
		return constructorID;
	};

	child.__super__ = parent.prototype;

	return child;
};

module.exports = Module;

},{}],9:[function(require,module,exports){
var Module = require( './module' ),
	ViewModule;

ViewModule = Module.extend( {
	elements: null,

	getDefaultElements: function() {
		return {};
	},

	bindEvents: function() {},

	onInit: function() {
		this.initElements();

		this.bindEvents();
	},

	initElements: function() {
		this.elements = this.getDefaultElements();
	}
} );

module.exports = ViewModule;

},{"./module":8}]},{},[2])
//# sourceMappingURL=new-template.js.map
