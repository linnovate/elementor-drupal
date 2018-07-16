/*! elementor - v2.1.3 - 16-07-2018 */
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/* global jQuery, ElementorGutenbergSettings */
( function( $ ) {
	'use strict';

	var ElementorGutenbergApp = {

		cacheElements: function() {
			this.isElementorMode = '1' === ElementorGutenbergSettings.isElementorMode;

			this.cache = {};

			this.cache.$gutenberg = $( '#editor' );
			this.cache.$switchMode = $( $( '#elementor-gutenberg-button-switch-mode' ).html() );

			this.cache.$gutenberg.find( '.edit-post-header-toolbar' ).append( this.cache.$switchMode );
			this.cache.$switchModeButton = this.cache.$switchMode.find( '#elementor-switch-mode-button' );

			this.toggleStatus();
			this.buildPanel();

			var self = this;

			wp.data.subscribe( function() {
				setTimeout( function() {
					self.buildPanel();
				}, 1 );
			} );
		},

		buildPanel: function() {
			var self = this;

			if ( ! $( '#elementor-editor' ).length ) {
				self.cache.$editorPanel = $( $( '#elementor-gutenberg-panel' ).html() );
				self.cache.$gurenbergBlockList = self.cache.$gutenberg.find( '.editor-block-list__layout, .editor-post-text-editor' );
				self.cache.$gurenbergBlockList.after( self.cache.$editorPanel );

				self.cache.$editorPanelButton = self.cache.$editorPanel.find( '#elementor-go-to-edit-page-link' );

				self.cache.$editorPanelButton.on( 'click', function( event ) {
					event.preventDefault();

					self.animateLoader();

					var documentTitle = wp.data.select( 'core/editor' ).getEditedPostAttribute( 'title' );
					if ( ! documentTitle ) {
						wp.data.dispatch( 'core/editor' ).editPost( { title: 'Elementor #' + $( '#post_ID' ).val() } );
					}

					wp.data.dispatch( 'core/editor' ).savePost();
					self.redirectWhenSave();
				} );
			}
		},

		bindEvents: function() {
			var self = this;

			self.cache.$switchModeButton.on( 'click', function() {
				self.isElementorMode = ! self.isElementorMode;

				self.toggleStatus();

				if ( self.isElementorMode ) {
					self.cache.$editorPanelButton.trigger( 'click' );
				} else {
					var wpEditor = wp.data.dispatch( 'core/editor' );

					wpEditor.editPost( { gutenberg_elementor_mode: false } );
					wpEditor.savePost();
				}
			} );
		},

		redirectWhenSave: function() {
			var self = this;

			setTimeout( function() {
				if ( wp.data.select( 'core/editor' ).isSavingPost() ) {
					self.redirectWhenSave();
				} else {
					location.href = ElementorGutenbergSettings.editLink;
				}
			}, 300 );
		},

		animateLoader: function() {
			this.cache.$editorPanelButton.addClass( 'elementor-animate' );
		},

		toggleStatus: function() {
			jQuery( 'body' )
				.toggleClass( 'elementor-editor-active', this.isElementorMode )
				.toggleClass( 'elementor-editor-inactive', ! this.isElementorMode );
		},

		init: function() {
			var self = this;
			setTimeout( function() {
				self.cacheElements();
				self.bindEvents();
			}, 1 );
		}
	};

	$( function() {
		ElementorGutenbergApp.init();
	} );

}( jQuery ) );

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvZGV2L2pzL2FkbWluL2d1dGVuYmVyZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qIGdsb2JhbCBqUXVlcnksIEVsZW1lbnRvckd1dGVuYmVyZ1NldHRpbmdzICovXG4oIGZ1bmN0aW9uKCAkICkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIEVsZW1lbnRvckd1dGVuYmVyZ0FwcCA9IHtcblxuXHRcdGNhY2hlRWxlbWVudHM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5pc0VsZW1lbnRvck1vZGUgPSAnMScgPT09IEVsZW1lbnRvckd1dGVuYmVyZ1NldHRpbmdzLmlzRWxlbWVudG9yTW9kZTtcblxuXHRcdFx0dGhpcy5jYWNoZSA9IHt9O1xuXG5cdFx0XHR0aGlzLmNhY2hlLiRndXRlbmJlcmcgPSAkKCAnI2VkaXRvcicgKTtcblx0XHRcdHRoaXMuY2FjaGUuJHN3aXRjaE1vZGUgPSAkKCAkKCAnI2VsZW1lbnRvci1ndXRlbmJlcmctYnV0dG9uLXN3aXRjaC1tb2RlJyApLmh0bWwoKSApO1xuXG5cdFx0XHR0aGlzLmNhY2hlLiRndXRlbmJlcmcuZmluZCggJy5lZGl0LXBvc3QtaGVhZGVyLXRvb2xiYXInICkuYXBwZW5kKCB0aGlzLmNhY2hlLiRzd2l0Y2hNb2RlICk7XG5cdFx0XHR0aGlzLmNhY2hlLiRzd2l0Y2hNb2RlQnV0dG9uID0gdGhpcy5jYWNoZS4kc3dpdGNoTW9kZS5maW5kKCAnI2VsZW1lbnRvci1zd2l0Y2gtbW9kZS1idXR0b24nICk7XG5cblx0XHRcdHRoaXMudG9nZ2xlU3RhdHVzKCk7XG5cdFx0XHR0aGlzLmJ1aWxkUGFuZWwoKTtcblxuXHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdFx0XHR3cC5kYXRhLnN1YnNjcmliZSggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHNlbGYuYnVpbGRQYW5lbCgpO1xuXHRcdFx0XHR9LCAxICk7XG5cdFx0XHR9ICk7XG5cdFx0fSxcblxuXHRcdGJ1aWxkUGFuZWw6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdFx0XHRpZiAoICEgJCggJyNlbGVtZW50b3ItZWRpdG9yJyApLmxlbmd0aCApIHtcblx0XHRcdFx0c2VsZi5jYWNoZS4kZWRpdG9yUGFuZWwgPSAkKCAkKCAnI2VsZW1lbnRvci1ndXRlbmJlcmctcGFuZWwnICkuaHRtbCgpICk7XG5cdFx0XHRcdHNlbGYuY2FjaGUuJGd1cmVuYmVyZ0Jsb2NrTGlzdCA9IHNlbGYuY2FjaGUuJGd1dGVuYmVyZy5maW5kKCAnLmVkaXRvci1ibG9jay1saXN0X19sYXlvdXQsIC5lZGl0b3ItcG9zdC10ZXh0LWVkaXRvcicgKTtcblx0XHRcdFx0c2VsZi5jYWNoZS4kZ3VyZW5iZXJnQmxvY2tMaXN0LmFmdGVyKCBzZWxmLmNhY2hlLiRlZGl0b3JQYW5lbCApO1xuXG5cdFx0XHRcdHNlbGYuY2FjaGUuJGVkaXRvclBhbmVsQnV0dG9uID0gc2VsZi5jYWNoZS4kZWRpdG9yUGFuZWwuZmluZCggJyNlbGVtZW50b3ItZ28tdG8tZWRpdC1wYWdlLWxpbmsnICk7XG5cblx0XHRcdFx0c2VsZi5jYWNoZS4kZWRpdG9yUGFuZWxCdXR0b24ub24oICdjbGljaycsIGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRcdFx0c2VsZi5hbmltYXRlTG9hZGVyKCk7XG5cblx0XHRcdFx0XHR2YXIgZG9jdW1lbnRUaXRsZSA9IHdwLmRhdGEuc2VsZWN0KCAnY29yZS9lZGl0b3InICkuZ2V0RWRpdGVkUG9zdEF0dHJpYnV0ZSggJ3RpdGxlJyApO1xuXHRcdFx0XHRcdGlmICggISBkb2N1bWVudFRpdGxlICkge1xuXHRcdFx0XHRcdFx0d3AuZGF0YS5kaXNwYXRjaCggJ2NvcmUvZWRpdG9yJyApLmVkaXRQb3N0KCB7IHRpdGxlOiAnRWxlbWVudG9yICMnICsgJCggJyNwb3N0X0lEJyApLnZhbCgpIH0gKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR3cC5kYXRhLmRpc3BhdGNoKCAnY29yZS9lZGl0b3InICkuc2F2ZVBvc3QoKTtcblx0XHRcdFx0XHRzZWxmLnJlZGlyZWN0V2hlblNhdmUoKTtcblx0XHRcdFx0fSApO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRiaW5kRXZlbnRzOiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBzZWxmID0gdGhpcztcblxuXHRcdFx0c2VsZi5jYWNoZS4kc3dpdGNoTW9kZUJ1dHRvbi5vbiggJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHNlbGYuaXNFbGVtZW50b3JNb2RlID0gISBzZWxmLmlzRWxlbWVudG9yTW9kZTtcblxuXHRcdFx0XHRzZWxmLnRvZ2dsZVN0YXR1cygpO1xuXG5cdFx0XHRcdGlmICggc2VsZi5pc0VsZW1lbnRvck1vZGUgKSB7XG5cdFx0XHRcdFx0c2VsZi5jYWNoZS4kZWRpdG9yUGFuZWxCdXR0b24udHJpZ2dlciggJ2NsaWNrJyApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZhciB3cEVkaXRvciA9IHdwLmRhdGEuZGlzcGF0Y2goICdjb3JlL2VkaXRvcicgKTtcblxuXHRcdFx0XHRcdHdwRWRpdG9yLmVkaXRQb3N0KCB7IGd1dGVuYmVyZ19lbGVtZW50b3JfbW9kZTogZmFsc2UgfSApO1xuXHRcdFx0XHRcdHdwRWRpdG9yLnNhdmVQb3N0KCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gKTtcblx0XHR9LFxuXG5cdFx0cmVkaXJlY3RXaGVuU2F2ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0XHRcdHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIHdwLmRhdGEuc2VsZWN0KCAnY29yZS9lZGl0b3InICkuaXNTYXZpbmdQb3N0KCkgKSB7XG5cdFx0XHRcdFx0c2VsZi5yZWRpcmVjdFdoZW5TYXZlKCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bG9jYXRpb24uaHJlZiA9IEVsZW1lbnRvckd1dGVuYmVyZ1NldHRpbmdzLmVkaXRMaW5rO1xuXHRcdFx0XHR9XG5cdFx0XHR9LCAzMDAgKTtcblx0XHR9LFxuXG5cdFx0YW5pbWF0ZUxvYWRlcjogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmNhY2hlLiRlZGl0b3JQYW5lbEJ1dHRvbi5hZGRDbGFzcyggJ2VsZW1lbnRvci1hbmltYXRlJyApO1xuXHRcdH0sXG5cblx0XHR0b2dnbGVTdGF0dXM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0alF1ZXJ5KCAnYm9keScgKVxuXHRcdFx0XHQudG9nZ2xlQ2xhc3MoICdlbGVtZW50b3ItZWRpdG9yLWFjdGl2ZScsIHRoaXMuaXNFbGVtZW50b3JNb2RlIClcblx0XHRcdFx0LnRvZ2dsZUNsYXNzKCAnZWxlbWVudG9yLWVkaXRvci1pbmFjdGl2ZScsICEgdGhpcy5pc0VsZW1lbnRvck1vZGUgKTtcblx0XHR9LFxuXG5cdFx0aW5pdDogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0XHRzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcblx0XHRcdFx0c2VsZi5jYWNoZUVsZW1lbnRzKCk7XG5cdFx0XHRcdHNlbGYuYmluZEV2ZW50cygpO1xuXHRcdFx0fSwgMSApO1xuXHRcdH1cblx0fTtcblxuXHQkKCBmdW5jdGlvbigpIHtcblx0XHRFbGVtZW50b3JHdXRlbmJlcmdBcHAuaW5pdCgpO1xuXHR9ICk7XG5cbn0oIGpRdWVyeSApICk7XG4iXX0=
