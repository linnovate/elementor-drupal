<?php
namespace Elementor;

use Elementor\Core\Responsive\Responsive;
use Elementor\Core\Settings\Manager as SettingsManager;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Elementor editor.
 *
 * Elementor editor handler class is responsible for initializing Elementor
 * editor and register all the actions needed to display the editor.
 *
 * @since 1.0.0
 */
class Editor {

	/**
	 * The nonce key for Elementor editor.
	 */
	const EDITING_NONCE_KEY = 'elementor-editing';

	/**
	 * User capability required to access Elementor editor.
	 */
	const EDITING_CAPABILITY = 'edit_posts';

	/**
	 * Post ID.
	 *
	 * Holds the ID of the current post being edited.
	 *
	 * @since 1.0.0
	 * @access private
	 *
	 * @var int Post ID.
	 */
	private $_post_id;

	/**
	 * Whether the edit mode is active.
	 *
	 * Used to determine whether we are in edit mode.
	 *
	 * @since 1.0.0
	 * @access private
	 *
	 * @var bool Whether the edit mode is active.
	 */
	private $_is_edit_mode;

	/**
	 * Editor templates.
	 *
	 * Holds the editor templates used by Marionette.js.
	 *
	 * @since 1.0.0
	 * @access private
	 *
	 * @var array Editor templates.
	 */
	private $_editor_templates = [];

	/**
	 * Init.
	 *
	 * Initialize Elementor editor. Registers all needed actions to run Elementor,
	 * removes conflicting actions etc.
	 *
	 * Fired by `admin_action_elementor` action.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @param bool $die Optional. Whether to die at the end. Default is `true`.
	 */
	public function init( $die = true ) {
		if ( empty( $_REQUEST['post'] ) ) { // WPCS: CSRF ok.
			return;
		}

		$this->_post_id = absint_elementor_adapter( $_REQUEST['post'] );

		if ( ! $this->is_edit_mode( $this->_post_id ) ) {
			return;
		}

		// Send MIME Type header like WP admin-header.
		@header( 'Content-Type: ' . get_option_elementor_adapter( 'html_type' ) . '; charset=' . get_option_elementor_adapter( 'blog_charset' ) );

		// Use requested id and not the global in order to avoid conflicts with plugins that changes the global post.
		query_posts_elementor_adapter( [
			'p' => $this->_post_id,
			'post_type' => get_post_type_elementor_adapter( $this->_post_id ),
		] );

		Plugin::$instance->db->switch_to_post( $this->_post_id );

		add_filter_elementor_adapter( 'show_admin_bar', '__return_false' );

		// Remove all WordPress actions
		remove_all_actions( 'wp_head' );
		remove_all_actions( 'wp_print_styles' );
		remove_all_actions( 'wp_print_head_scripts' );
		remove_all_actions( 'wp_footer' );

		// Handle `wp_head`
		add_action_elementor_adapter( 'wp_head', 'wp_enqueue_scripts', 1 );
		add_action_elementor_adapter( 'wp_head', 'wp_print_styles', 8 );
		add_action_elementor_adapter( 'wp_head', 'wp_print_head_scripts', 9 );
		add_action_elementor_adapter( 'wp_head', 'wp_site_icon' );
		add_action_elementor_adapter( 'wp_head', [ $this, 'editor_head_trigger' ], 30 );

		// Handle `wp_footer`
		add_action_elementor_adapter( 'wp_footer', 'wp_print_footer_scripts', 20 );
		add_action_elementor_adapter( 'wp_footer', 'wp_auth_check_html', 30 );
		add_action_elementor_adapter( 'wp_footer', [ $this, 'wp_footer' ] );

		// Handle `wp_enqueue_scripts`
		remove_all_actions( 'wp_enqueue_scripts' );

		add_action_elementor_adapter( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ], 999999 );
		add_action_elementor_adapter( 'wp_enqueue_scripts', [ $this, 'enqueue_styles' ], 999999 );

		// Change mode to Builder
		Plugin::$instance->db->set_is_elementor_page( $this->_post_id );

		// Post Lock
		if ( ! $this->get_locked_user( $this->_post_id ) ) {
			$this->lock_post( $this->_post_id );
		}

		// Setup default heartbeat options
		add_filter_elementor_adapter( 'heartbeat_settings', function( $settings ) {
			$settings['interval'] = 15;
			return $settings;
		} );

		// Tell to WP Cache plugins do not cache this request.
		Utils::do_not_cache();

		$this->print_editor_template();

		// From the action it's an empty string, from tests its `false`
		if ( false !== $die ) {
			die;
		}
	}

	/**
	 * Retrieve post ID.
	 *
	 * Get the ID of the current post.
	 *
	 * @since 1.8.0
	 * @access public
	 *
	 * @return int Post ID.
	 */
	public function get_post_id() {
		return $this->_post_id;
	}

	/**
	 * Redirect to new URL.
	 *
	 * Used as a fallback function for the old URL structure of Elementor page
	 * edit URL.
	 *
	 * Fired by `template_redirect` action.
	 *
	 * @since 1.6.0
	 * @access public
	 */
	public function redirect_to_new_url() {
		if ( ! isset( $_GET['elementor'] ) ) {
			return;
		}

		$post_id = get_the_ID_elementor_adapter();

		if ( ! User::is_current_user_can_edit( $post_id ) || ! Plugin::$instance->db->is_built_with_elementor( $post_id ) ) {
			return;
		}

		wp_redirect_elementor_adapter( Utils::get_edit_link( $post_id ) );
		die;
	}

	/**
	 * Whether the edit mode is active.
	 *
	 * Used to determine whether we are in the edit mode.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @param int $post_id Optional. Post ID. Default is `null`, the current
	 *                     post ID.
	 *
	 * @return bool Whether the edit mode is active.
	 */
	public function is_edit_mode( $post_id = null ) {
		if ( null !== $this->_is_edit_mode ) {
			return $this->_is_edit_mode;
		}

		if ( empty( $post_id ) ) {
			$post_id = $this->_post_id;
		}

		if ( ! User::is_current_user_can_edit( $post_id ) ) {
			return false;
		}

		// Ajax request as Editor mode
		$actions = [
			'elementor',

			// Templates
			'elementor_get_templates',
			'elementor_save_template',
			'elementor_get_template',
			'elementor_delete_template',
			'elementor_export_template',
			'elementor_import_template',
		];

		if ( isset( $_REQUEST['action'] ) && in_array( $_REQUEST['action'], $actions ) ) {
			return true;
		}

		return false;
	}

	/**
	 * Lock post.
	 *
	 * Mark the post as currently being edited by the current user.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @param int $post_id The ID of the post being edited.
	 */
	public function lock_post( $post_id ) {
		if ( ! function_exists( 'wp_set_post_lock' ) ) {
			require_once( ABSPATH . 'wp-admin/includes/post.php' );
		}

		wp_set_post_lock( $post_id );
	}

	/**
	 * Get locked user.
	 *
	 * Check what user is currently editing the post.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @param int $post_id The ID of the post being edited.
	 *
	 * @return \WP_User|false User information or false if the post is not locked.
	 */
	public function get_locked_user( $post_id ) {
		if ( ! function_exists( 'wp_check_post_lock' ) ) {
			require_once( ABSPATH . 'wp-admin/includes/post.php' );
		}

		$locked_user = wp_check_post_lock( $post_id );
		if ( ! $locked_user ) {
			return false;
		}

		return get_user_by( 'id', $locked_user );
	}

	/**
	 * Print panel HTML.
	 *
	 * Include the wrapper template of the editor.
	 *
	 * @since 1.0.0
	 * @deprecated 2.2.0 Use `Editor::print_editor_template` instead
	 * @access public
	 */
	public function print_panel_html() {
		_deprecated_function( __METHOD__, '2.2.0', 'Editor::print_editor_template' );

		$this->print_editor_template();
	}

	/**
	 * Print Editor Template.
	 *
	 * Include the wrapper template of the editor.
	 *
	 * @since 2.2.0
	 * @access public
	 */
	public function print_editor_template() {
		include( 'editor-templates/editor-wrapper.php' );
	}

	/**
	 * Enqueue scripts.
	 *
	 * Registers all the editor scripts and enqueues them.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function enqueue_scripts() {
		remove_action_elementor_adapter( 'wp_enqueue_scripts', [ $this, __FUNCTION__ ], 999999 );

		// Set the global data like $post, $authordata and etc
		setup_postdata_elementor_adapter( $this->_post_id );

		global $wp_styles, $wp_scripts;

		$plugin = Plugin::$instance;

		// Reset global variable
		$wp_styles = new \WP_Styles(); // WPCS: override ok.
		$wp_scripts = new \WP_Scripts(); // WPCS: override ok.

		$suffix = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG || defined( 'ELEMENTOR_TESTS' ) && ELEMENTOR_TESTS ) ? '' : '.min';

		// Hack for waypoint with editor mode.
		wp_register_script_elementor_adapter(
			'elementor-waypoints',
			ELEMENTOR_ASSETS_URL . 'lib/waypoints/waypoints-for-editor.js',
			[
				'jquery',
			],
			'4.0.2',
			true
		);

		wp_register_script_elementor_adapter(
			'backbone-marionette',
			ELEMENTOR_ASSETS_URL . 'lib/backbone/backbone.marionette' . $suffix . '.js',
			[
				'backbone',
			],
			'2.4.5',
			true
		);

		wp_register_script_elementor_adapter(
			'backbone-radio',
			ELEMENTOR_ASSETS_URL . 'lib/backbone/backbone.radio' . $suffix . '.js',
			[
				'backbone',
			],
			'1.0.4',
			true
		);

		wp_register_script_elementor_adapter(
			'perfect-scrollbar',
			ELEMENTOR_ASSETS_URL . 'lib/perfect-scrollbar/perfect-scrollbar.jquery' . $suffix . '.js',
			[
				'jquery',
			],
			'0.6.12',
			true
		);

		wp_register_script_elementor_adapter(
			'jquery-easing',
			ELEMENTOR_ASSETS_URL . 'lib/jquery-easing/jquery-easing' . $suffix . '.js',
			[
				'jquery',
			],
			'1.3.2',
			true
		);

		wp_register_script_elementor_adapter(
			'nprogress',
			ELEMENTOR_ASSETS_URL . 'lib/nprogress/nprogress' . $suffix . '.js',
			[],
			'0.2.0',
			true
		);

		wp_register_script_elementor_adapter(
			'tipsy',
			ELEMENTOR_ASSETS_URL . 'lib/tipsy/tipsy' . $suffix . '.js',
			[
				'jquery',
			],
			'1.0.0',
			true
		);

		wp_register_script_elementor_adapter(
			'jquery-elementor-select2',
			ELEMENTOR_ASSETS_URL . 'lib/e-select2/js/e-select2.full' . $suffix . '.js',
			[
				'jquery',
			],
			'4.0.6-rc.1',
			true
		);

		wp_register_script_elementor_adapter(
			'flatpickr',
			ELEMENTOR_ASSETS_URL . 'lib/flatpickr/flatpickr' . $suffix . '.js',
			[
				'jquery',
			],
			'1.12.0',
			true
		);

		wp_register_script_elementor_adapter(
			'ace',
			'https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.5/ace.js',
			[],
			'1.2.5',
			true
		);

		wp_register_script_elementor_adapter(
			'ace-language-tools',
			'https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.5/ext-language_tools.js',
			[
				'ace',
			],
			'1.2.5',
			true
		);

		wp_register_script_elementor_adapter(
			'jquery-hover-intent',
			ELEMENTOR_ASSETS_URL . 'lib/jquery-hover-intent/jquery-hover-intent' . $suffix . '.js',
			[],
			'1.0.0',
			true
		);

		wp_register_script_elementor_adapter(
			'elementor-dialog',
			ELEMENTOR_ASSETS_URL . 'lib/dialog/dialog' . $suffix . '.js',
			[
				'jquery-ui-position',
			],
			'4.4.1',
			true
		);

		wp_register_script_elementor_adapter(
			'elementor-editor',
			ELEMENTOR_ASSETS_URL . 'js/editor' . $suffix . '.js',
			[
				'wp-auth-check',
				'jquery-ui-sortable',
				'jquery-ui-resizable',
				'backbone-marionette',
				'backbone-radio',
				'perfect-scrollbar',
				'nprogress',
				'tipsy',
				'imagesloaded',
				'heartbeat',
				'jquery-elementor-select2',
				'flatpickr',
				'elementor-dialog',
				'ace',
				'ace-language-tools',
				'jquery-hover-intent',
			],
			ELEMENTOR_VERSION,
			true
		);

		/**
		 * Before editor enqueue scripts.
		 *
		 * Fires before Elementor editor scripts are enqueued.
		 *
		 * @since 1.0.0
		 */
		do_action_elementor_adapter( 'elementor/editor/before_enqueue_scripts' );

		$document = Plugin::$instance->documents->get_doc_or_auto_save( $this->_post_id );

		// Get document data *after* the scripts hook - so plugins can run compatibility before get data, but *before* enqueue the editor script - so elements can enqueue their own scripts that depended in editor script.
		$editor_data = $document->get_elements_raw_data( null, true );

		wp_enqueue_script_elementor_adapter( 'elementor-editor' );

		// Tweak for WP Admin menu icons
		wp_print_styles( 'editor-buttons' );

		$locked_user = $this->get_locked_user( $this->_post_id );

		if ( $locked_user ) {
			$locked_user = $locked_user->display_name;
		}

		$page_title_selector = get_option_elementor_adapter( 'elementor_page_title_selector' );

		if ( empty( $page_title_selector ) ) {
			$page_title_selector = 'h1.entry-title';
		}

		$post_type_object = get_post_type_object_elementor_adapter( $document->get_main_post()->post_type );
		$current_user_can_publish = current_user_can( $post_type_object->cap->publish_posts );

		$config = [
			'version' => ELEMENTOR_VERSION,
			'ajaxurl' => admin_url_elementor_adapter( 'admin-ajax.php' ),
			'home_url' => home_url(),
			'nonce' => $this->create_nonce( get_post_type_elementor_adapter() ),
			'data' => $editor_data,
			// @TODO: `post_id` is bc since 2.0.0
			'post_id' => $this->_post_id,
			'document' => $document->get_config(),
			'autosave_interval' => AUTOSAVE_INTERVAL,
			'current_user_can_publish' => $current_user_can_publish,
			'controls' => $plugin->controls_manager->get_controls_data(),
			'elements' => $plugin->elements_manager->get_element_types_config(),
			'widgets' => $plugin->widgets_manager->get_widget_types_config(),
			'schemes' => [
				'items' => $plugin->schemes_manager->get_registered_schemes_data(),
				'enabled_schemes' => Schemes_Manager::get_enabled_schemes(),
			],
			'default_schemes' => $plugin->schemes_manager->get_schemes_defaults(),
			'settings' => SettingsManager::get_settings_managers_config(),
			'system_schemes' => $plugin->schemes_manager->get_system_schemes(),
			'wp_editor' => $this->get_wp_editor_config(),
			'settings_page_link' => Settings::get_url(),
			'elementor_site' => 'https://go.elementor.com/about-elementor/',
			'docs_elementor_site' => 'https://go.elementor.com/docs/',
			'help_the_content_url' => 'https://go.elementor.com/the-content-missing/',
			'help_preview_error_url' => 'https://go.elementor.com/preview-not-loaded/',
			'help_right_click_url' => 'https://go.elementor.com/meet-right-click/',
			'assets_url' => ELEMENTOR_ASSETS_URL,
			'locked_user' => $locked_user,
			'user' => [
				'restrictions' => $plugin->role_manager->get_user_restrictions_array(),
				'is_administrator' => current_user_can( 'manage_options' ),
				'introduction' => User::is_should_view_introduction(),
			],
			'is_rtl' => is_rtl_elementor_adapter(),
			'locale' => get_locale(),
			'rich_editing_enabled' => filter_var( get_user_meta_elementor_adapter( get_current_user_id_elementor_adapter(), 'rich_editing', true ), FILTER_VALIDATE_BOOLEAN ),
			'page_title_selector' => $page_title_selector,
			'tinymceHasCustomConfig' => class_exists( 'Tinymce_Advanced' ),
			'inlineEditing' => Plugin::$instance->widgets_manager->get_inline_editing_config(),
			'dynamicTags' => Plugin::$instance->dynamic_tags->get_config(),
			'i18n' => [
				'elementor' => ___elementor_adapter( 'Elementor', 'elementor' ),
				'delete' => ___elementor_adapter( 'Delete', 'elementor' ),
				'cancel' => ___elementor_adapter( 'Cancel', 'elementor' ),
				/* translators: %s: Element name. */
				'edit_element' => ___elementor_adapter( 'Edit %s', 'elementor' ),

				// Menu.
				'about_elementor' => ___elementor_adapter( 'About Elementor', 'elementor' ),
				'color_picker' => ___elementor_adapter( 'Color Picker', 'elementor' ),
				'elementor_settings' => ___elementor_adapter( 'Dashboard Settings', 'elementor' ),
				'global_colors' => ___elementor_adapter( 'Default Colors', 'elementor' ),
				'global_fonts' => ___elementor_adapter( 'Default Fonts', 'elementor' ),
				'global_style' => ___elementor_adapter( 'Style', 'elementor' ),
				'settings' => ___elementor_adapter( 'Settings', 'elementor' ),

				// Elements.
				'inner_section' => ___elementor_adapter( 'Columns', 'elementor' ),

				// Control Order.
				'asc' => ___elementor_adapter( 'Ascending order', 'elementor' ),
				'desc' => ___elementor_adapter( 'Descending order', 'elementor' ),

				// Clear Page.
				'clear_page' => ___elementor_adapter( 'Delete All Content', 'elementor' ),
				'dialog_confirm_clear_page' => ___elementor_adapter( 'Attention: We are going to DELETE ALL CONTENT from this page. Are you sure you want to do that?', 'elementor' ),

				// Panel Preview Mode.
				'back_to_editor' => ___elementor_adapter( 'Show Panel', 'elementor' ),
				'preview' => ___elementor_adapter( 'Hide Panel', 'elementor' ),

				// Inline Editing.
				'type_here' => ___elementor_adapter( 'Type Here', 'elementor' ),

				// Library.
				'an_error_occurred' => ___elementor_adapter( 'An error occurred', 'elementor' ),
				'category' => ___elementor_adapter( 'Category', 'elementor' ),
				'delete_template' => ___elementor_adapter( 'Delete Template', 'elementor' ),
				'delete_template_confirm' => ___elementor_adapter( 'Are you sure you want to delete this template?', 'elementor' ),
				'import_template_dialog_header' => ___elementor_adapter( 'Import Document Settings', 'elementor' ),
				'import_template_dialog_message' => ___elementor_adapter( 'Do you want to also import the document settings of the template?', 'elementor' ),
				'import_template_dialog_message_attention' => ___elementor_adapter( 'Attention: Importing may override previous settings.', 'elementor' ),
				'library' => ___elementor_adapter( 'Library', 'elementor' ),
				'no' => ___elementor_adapter( 'No', 'elementor' ),
				'page' => ___elementor_adapter( 'Page', 'elementor' ),
				/* translators: %s: Template type. */
				'save_your_template' => ___elementor_adapter( 'Save Your %s to Library', 'elementor' ),
				'save_your_template_description' => ___elementor_adapter( 'Your designs will be available for export and reuse on any page or website', 'elementor' ),
				'section' => ___elementor_adapter( 'Section', 'elementor' ),
				'templates_empty_message' => ___elementor_adapter( 'This is where your templates should be. Design it. Save it. Reuse it.', 'elementor' ),
				'templates_empty_title' => ___elementor_adapter( 'Haven’t Saved Templates Yet?', 'elementor' ),
				'templates_no_favorites_message' => ___elementor_adapter( 'You can mark any pre-designed template as a favorite.', 'elementor' ),
				'templates_no_favorites_title' => ___elementor_adapter( 'No Favorite Templates', 'elementor' ),
				'templates_no_results_message' => ___elementor_adapter( 'Please make sure your search is spelled correctly or try a different words.', 'elementor' ),
				'templates_no_results_title' => ___elementor_adapter( 'No Results Found', 'elementor' ),
				'templates_request_error' => ___elementor_adapter( 'The following error(s) occurred while processing the request:', 'elementor' ),
				'yes' => ___elementor_adapter( 'Yes', 'elementor' ),

				// Incompatible Device.
				'device_incompatible_header' => ___elementor_adapter( 'Your browser isn\'t compatible', 'elementor' ),
				'device_incompatible_message' => ___elementor_adapter( 'Your browser isn\'t compatible with all of Elementor\'s editing features. We recommend you switch to another browser like Chrome or Firefox.', 'elementor' ),
				'proceed_anyway' => ___elementor_adapter( 'Proceed Anyway', 'elementor' ),

				// Preview not loaded.
				'learn_more' => ___elementor_adapter( 'Learn More', 'elementor' ),
				'preview_el_not_found_header' => ___elementor_adapter( 'Sorry, the content area was not found in your page.', 'elementor' ),
				'preview_el_not_found_message' => ___elementor_adapter( 'You must call \'the_content\' function in the current template, in order for Elementor to work on this page.', 'elementor' ),
				'preview_not_loading_header' => ___elementor_adapter( 'The preview could not be loaded', 'elementor' ),
				'preview_not_loading_message' => ___elementor_adapter( 'We\'re sorry, but something went wrong. Click on \'Learn more\' and follow each of the steps to quickly solve it.', 'elementor' ),

				// Gallery.
				'delete_gallery' => ___elementor_adapter( 'Reset Gallery', 'elementor' ),
				'dialog_confirm_gallery_delete' => ___elementor_adapter( 'Are you sure you want to reset this gallery?', 'elementor' ),
				/* translators: %s: The number of images. */
				'gallery_images_selected' => ___elementor_adapter( '%s Images Selected', 'elementor' ),
				'gallery_no_images_selected' => ___elementor_adapter( 'No Images Selected', 'elementor' ),
				'insert_media' => ___elementor_adapter( 'Insert Media', 'elementor' ),

				// Take Over.
				/* translators: %s: User name. */
				'dialog_user_taken_over' => ___elementor_adapter( '%s has taken over and is currently editing. Do you want to take over this page editing?', 'elementor' ),
				'go_back' => ___elementor_adapter( 'Go Back', 'elementor' ),
				'take_over' => ___elementor_adapter( 'Take Over', 'elementor' ),

				// Revisions.
				/* translators: %s: Element type. */
				'delete_element' => ___elementor_adapter( 'Delete %s', 'elementor' ),
				/* translators: %s: Template type. */
				'dialog_confirm_delete' => ___elementor_adapter( 'Are you sure you want to remove this %s?', 'elementor' ),

				// Saver.
				'before_unload_alert' => ___elementor_adapter( 'Please note: All unsaved changes will be lost.', 'elementor' ),
				'published' => ___elementor_adapter( 'Published', 'elementor' ),
				'publish' => ___elementor_adapter( 'Publish', 'elementor' ),
				'save' => ___elementor_adapter( 'Save', 'elementor' ),
				'saved' => ___elementor_adapter( 'Saved', 'elementor' ),
				'update' => ___elementor_adapter( 'Update', 'elementor' ),
				'submit' => ___elementor_adapter( 'Submit', 'elementor' ),
				'working_on_draft_notification' => ___elementor_adapter( 'This is just a draft. Play around and when you\'re done - click update.', 'elementor' ),
				'keep_editing' => ___elementor_adapter( 'Keep Editing', 'elementor' ),
				'have_a_look' => ___elementor_adapter( 'Have a look', 'elementor' ),
				'view_all_revisions' => ___elementor_adapter( 'View All Revisions', 'elementor' ),
				'dismiss' => ___elementor_adapter( 'Dismiss', 'elementor' ),
				'saving_disabled' => ___elementor_adapter( 'Saving has been disabled until you’re reconnected.', 'elementor' ),

				// Ajax
				'server_error' => ___elementor_adapter( 'Server Error', 'elementor' ),
				'server_connection_lost' => ___elementor_adapter( 'Connection Lost', 'elementor' ),
				'unknown_error' => ___elementor_adapter( 'Unknown Error', 'elementor' ),

				// Context Menu
				'duplicate' => ___elementor_adapter( 'Duplicate', 'elementor' ),
				'copy' => ___elementor_adapter( 'Copy', 'elementor' ),
				'paste' => ___elementor_adapter( 'Paste', 'elementor' ),
				'copy_style' => ___elementor_adapter( 'Copy Style', 'elementor' ),
				'paste_style' => ___elementor_adapter( 'Paste Style', 'elementor' ),
				'reset_style' => ___elementor_adapter( 'Reset Style', 'elementor' ),
				'save_as_global' => ___elementor_adapter( 'Save as a Global', 'elementor' ),
				'save_as_block' => ___elementor_adapter( 'Save as Template', 'elementor' ),
				'new_column' => ___elementor_adapter( 'Add New Column', 'elementor' ),
				'copy_all_content' => ___elementor_adapter( 'Copy All Content', 'elementor' ),
				'delete_all_content' => ___elementor_adapter( 'Delete All Content', 'elementor' ),
				'navigator' => ___elementor_adapter( 'Navigator', 'elementor' ),

				// Right Click Introduction
				'meet_right_click_header' => ___elementor_adapter( 'Meet Right Click', 'elementor' ),
				'meet_right_click_message' => ___elementor_adapter( 'Now you can access all editing actions using right click.', 'elementor' ),
				'got_it' => ___elementor_adapter( 'Got It', 'elementor' ),

				// TODO: Remove.
				'autosave' => ___elementor_adapter( 'Autosave', 'elementor' ),
				'elementor_docs' => ___elementor_adapter( 'Documentation', 'elementor' ),
				'reload_page' => ___elementor_adapter( 'Reload Page', 'elementor' ),
				'session_expired_header' => ___elementor_adapter( 'Timeout', 'elementor' ),
				'session_expired_message' => ___elementor_adapter( 'Your session has expired. Please reload the page to continue editing.', 'elementor' ),
				'soon' => ___elementor_adapter( 'Soon', 'elementor' ),
				'unknown_value' => ___elementor_adapter( 'Unknown Value', 'elementor' ),
			],
		];

		$localized_settings = [];

		/**
		 * Localize editor settings.
		 *
		 * Filters the editor localized settings.
		 *
		 * @since 1.0.0
		 *
		 * @param array $localized_settings Localized settings.
		 * @param int   $post_id            The ID of the current post being edited.
		 */
		$localized_settings = apply_filters_elementor_adapter( 'elementor/editor/localize_settings', $localized_settings, $this->_post_id );

		if ( ! empty( $localized_settings ) ) {
			$config = array_replace_recursive( $config, $localized_settings );
		}

		echo '<script>' . PHP_EOL;
		echo '/* <![CDATA[ */' . PHP_EOL;
		$config_json = wp_json_encode_elementor_adapter( $config );
		unset( $config );

		if ( get_option_elementor_adapter( 'elementor_editor_break_lines' ) ) {
			// Add new lines to avoid memory limits in some hosting servers that handles the buffer output according to new line characters
			$config_json = str_replace( '}},"', '}},' . PHP_EOL . '"', $config_json );
		}

		echo 'var ElementorConfig = ' . $config_json . ';' . PHP_EOL;
		echo '/* ]]> */' . PHP_EOL;
		echo '</script>';

		$plugin->controls_manager->enqueue_control_scripts();

		/**
		 * After editor enqueue scripts.
		 *
		 * Fires after Elementor editor scripts are enqueued.
		 *
		 * @since 1.0.0
		 */
		do_action_elementor_adapter( 'elementor/editor/after_enqueue_scripts' );
	}

	/**
	 * Enqueue styles.
	 *
	 * Registers all the editor styles and enqueues them.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function enqueue_styles() {
		/**
		 * Before editor enqueue styles.
		 *
		 * Fires before Elementor editor styles are enqueued.
		 *
		 * @since 1.0.0
		 */
		do_action_elementor_adapter( 'elementor/editor/before_enqueue_styles' );

		$suffix = Utils::is_script_debug() ? '' : '.min';

		$direction_suffix = is_rtl_elementor_adapter() ? '-rtl' : '';

		wp_register_style(
			'font-awesome',
			ELEMENTOR_ASSETS_URL . 'lib/font-awesome/css/font-awesome' . $suffix . '.css',
			[],
			'4.7.0'
		);

		wp_register_style(
			'elementor-select2',
			ELEMENTOR_ASSETS_URL . 'lib/e-select2/css/e-select2' . $suffix . '.css',
			[],
			'4.0.6-rc.1'
		);

		wp_register_style(
			'elementor-icons',
			ELEMENTOR_ASSETS_URL . 'lib/eicons/css/elementor-icons' . $suffix . '.css',
			[],
			'3.8.0'
		);

		wp_register_style(
			'google-font-roboto',
			'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700',
			[],
			ELEMENTOR_VERSION
		);

		wp_register_style(
			'flatpickr',
			ELEMENTOR_ASSETS_URL . 'lib/flatpickr/flatpickr' . $suffix . '.css',
			[],
			'1.12.0'
		);

		wp_register_style(
			'elementor-editor',
			ELEMENTOR_ASSETS_URL . 'css/editor' . $direction_suffix . $suffix . '.css',
			[
				'font-awesome',
				'elementor-select2',
				'elementor-icons',
				'wp-auth-check',
				'google-font-roboto',
				'flatpickr',
			],
			ELEMENTOR_VERSION
		);

		wp_enqueue_style_elementor_adapter( 'elementor-editor' );

		if ( Responsive::has_custom_breakpoints() ) {
			$breakpoints = Responsive::get_breakpoints();

			wp_add_inline_style( 'elementor-editor', '.elementor-device-tablet #elementor-preview-responsive-wrapper { width: ' . $breakpoints['md'] . 'px; }' );
		}

		/**
		 * After editor enqueue styles.
		 *
		 * Fires after Elementor editor styles are enqueued.
		 *
		 * @since 1.0.0
		 */
		do_action_elementor_adapter( 'elementor/editor/after_enqueue_styles' );
	}

	/**
	 * Get WordPress editor config.
	 *
	 * Config the default WordPress editor with custom settings for Elementor use.
	 *
	 * @since 1.9.0
	 * @access private
	 */
	private function get_wp_editor_config() {
		// Remove all TinyMCE plugins.
		remove_all_filters( 'mce_buttons', 10 );
		remove_all_filters( 'mce_external_plugins', 10 );

		if ( ! class_exists( '\_WP_Editors', false ) ) {
			require( ABSPATH . WPINC . '/class-wp-editor.php' );
		}

		// WordPress 4.8 and higher
		if ( method_exists( '\_WP_Editors', 'print_tinymce_scripts' ) ) {
			\_WP_Editors::print_default_editor_scripts();
			\_WP_Editors::print_tinymce_scripts();
		}
		ob_start();

		wp_editor(
			'%%EDITORCONTENT%%',
			'elementorwpeditor',
			[
				'editor_class' => 'elementor-wp-editor',
				'editor_height' => 250,
				'drag_drop_upload' => true,
			]
		);

		$config = ob_get_clean();

		// Don't call \_WP_Editors methods again
		remove_action_elementor_adapter( 'admin_print_footer_scripts', [ '_WP_Editors', 'editor_js' ], 50 );
		remove_action_elementor_adapter( 'admin_print_footer_scripts', [ '_WP_Editors', 'print_default_editor_scripts' ], 45 );

		\_WP_Editors::editor_js();

		return $config;
	}

	/**
	 * Editor head trigger.
	 *
	 * Fires the 'elementor/editor/wp_head' action in the head tag in Elementor
	 * editor.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function editor_head_trigger() {
		/**
		 * Elementor editor head.
		 *
		 * Fires on Elementor editor head tag.
		 *
		 * Used to prints scripts or any other data in the head tag.
		 *
		 * @since 1.0.0
		 */
		do_action_elementor_adapter( 'elementor/editor/wp_head' );
	}

	/**
	 * Add editor template.
	 *
	 * Registers new editor templates.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @param string $template Can be either a link to template file or template
	 *                         HTML content.
	 * @param string $type     Optional. Whether to handle the template as path
	 *                         or text. Default is `path`.
	 */
	public function add_editor_template( $template, $type = 'path' ) {
		if ( 'path' === $type ) {
			ob_start();

			include $template;

			$template = ob_get_clean();
		}

		$this->_editor_templates[] = $template;
	}

	/**
	 * WP footer.
	 *
	 * Prints Elementor editor with all the editor templates, and render controls,
	 * widgets and content elements.
	 *
	 * Fired by `wp_footer` action.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function wp_footer() {
		$plugin = Plugin::$instance;

		$plugin->controls_manager->render_controls();
		$plugin->widgets_manager->render_widgets_content();
		$plugin->elements_manager->render_elements_content();

		$plugin->schemes_manager->print_schemes_templates();

		$plugin->dynamic_tags->print_templates();

		$this->init_editor_templates();

		foreach ( $this->_editor_templates as $editor_template ) {
			echo $editor_template;
		}

		/**
		 * Elementor editor footer.
		 *
		 * Fires on Elementor editor before closing the body tag.
		 *
		 * Used to prints scripts or any other HTML before closing the body tag.
		 *
		 * @since 1.0.0
		 */
		do_action_elementor_adapter( 'elementor/editor/footer' );
	}

	/**
	 * Set edit mode.
	 *
	 * Used to update the edit mode.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @param bool $edit_mode Whether the edit mode is active.
	 */
	public function set_edit_mode( $edit_mode ) {
		$this->_is_edit_mode = $edit_mode;
	}

	/**
	 * Editor constructor.
	 *
	 * Initializing Elementor editor and redirect from old URL structure of
	 * Elementor editor.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function __construct() {
		add_action_elementor_adapter( 'admin_action_elementor', [ $this, 'init' ] );
		add_action_elementor_adapter( 'template_redirect', [ $this, 'redirect_to_new_url' ] );
		add_filter_elementor_adapter( 'wp_link_query', [ $this, 'filter_wp_link_query' ] );
	}

	public function filter_wp_link_query( $results ) {
		if ( isset( $_POST['editor'] ) && 'elementor' === $_POST['editor'] ) {
			$post_type_object = get_post_type_object_elementor_adapter( 'post' );
			$post_label = $post_type_object->labels->singular_name;

			foreach ( $results as & $result ) {
				if ( 'post' === get_post_type_elementor_adapter( $result['ID'] ) ) {
					$result['info'] = $post_label;
				}
			}
		}

		return $results;
	}

	/**
	 * Create nonce.
	 *
	 * If the user has edit capabilities, it creates a cryptographic token to
	 * give him access to Elementor editor.
	 *
	 * @since 1.8.1
	 * @since 1.8.7 The `$post_type` parameter was introduces.
	 * @access public
	 *
	 * @param string $post_type The post type to check capabilities.
	 *
	 * @return null|string The nonce token, or `null` if the user has no edit
	 *                     capabilities.
	 */
	public function create_nonce( $post_type ) {
		$post_type_object = get_post_type_object_elementor_adapter( $post_type );
		$capability = $post_type_object->cap->{self::EDITING_CAPABILITY};

		if ( ! current_user_can( $capability ) ) {
			return null;
		}

		return wp_create_nonce_elementor_adapter( self::EDITING_NONCE_KEY );
	}

	/**
	 * Verify nonce.
	 *
	 * The user is given an amount of time to use the token, so therefore, since
	 * the user ID and `$action` remain the same, the independent variable is
	 * the time.
	 *
	 * @since 1.8.1
	 * @access public
	 *
	 * @param string $nonce Nonce that was used in the form to verify.
	 *
	 * @return false|int If the nonce is invalid it returns `false`. If the
	 *                   nonce is valid and generated between 0-12 hours ago it
	 *                   returns `1`. If the nonce is valid and generated
	 *                   between 12-24 hours ago it returns `2`.
	 */
	public function verify_nonce( $nonce ) {
		return wp_verify_nonce_elementor_adapter( $nonce, self::EDITING_NONCE_KEY );
	}

	/**
	 * Verify request nonce.
	 *
	 * Whether the request nonce verified or not.
	 *
	 * @since 1.8.1
	 * @access public
	 *
	 * @return bool True if request nonce verified, False otherwise.
	 */
	public function verify_request_nonce() {
		return ! empty( $_REQUEST['_nonce'] ) && $this->verify_nonce( $_REQUEST['_nonce'] );
	}

	/**
	 * Verify ajax nonce.
	 *
	 * Verify request nonce and send a JSON request, if not verified returns an
	 * error.
	 *
	 * @since 1.9.0
	 * @access public
	 */
	public function verify_ajax_nonce() {
		if ( ! $this->verify_request_nonce() ) {
			wp_send_json_error_elementor_adapter( new \WP_Error( 'token_expired', 'Nonce token expired.' ) );
		}
	}

	/**
	 * Init editor templates.
	 *
	 * Initialize default elementor templates used in the editor panel.
	 *
	 * @since 1.7.0
	 * @access private
	 */
	private function init_editor_templates() {
		$template_names = [
			'global',
			'panel',
			'panel-elements',
			'repeater',
			'library-layout',
			'templates',
			'navigator',
		];

		foreach ( $template_names as $template_name ) {
			$this->add_editor_template( __DIR__ . "/editor-templates/$template_name.php" );
		}
	}
}
