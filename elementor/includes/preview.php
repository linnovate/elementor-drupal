<?php
namespace Elementor;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Elementor preview.
 *
 * Elementor preview handler class is responsible for initializing Elementor in
 * preview mode.
 *
 * @since 1.0.0
 */
class Preview {

	/**
	 * Post ID.
	 *
	 * Holds the ID of the current post being previewed.
	 *
	 * @since 1.0.0
	 * @access private
	 *
	 * @var int Post ID.
	 */
	private $post_id;

	/**
	 * Init.
	 *
	 * Initialize Elementor preview mode.
	 *
	 * Fired by `template_redirect` action.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function init() {
		if ( is_admin_elementor_adapter() || ! $this->is_preview_mode() ) {
			return;
		}

		$this->post_id = get_the_ID_elementor_adapter();

		// Don't redirect to permalink.
		remove_action_elementor_adapter( 'template_redirect', 'redirect_canonical' );

		// Compatibility with Yoast SEO plugin when 'Removes unneeded query variables from the URL' enabled.
		// TODO: Move this code to `includes/compatibility.php`.
		if ( class_exists( 'WPSEO_Frontend' ) ) {
			remove_action_elementor_adapter( 'template_redirect', [ \WPSEO_Frontend::get_instance(), 'clean_permalink' ], 1 );
		}

		// Disable the WP admin bar in preview mode.
		add_filter_elementor_adapter( 'show_admin_bar', '__return_false' );

		add_action_elementor_adapter( 'wp_enqueue_scripts', function() {
			$this->enqueue_styles();
			$this->enqueue_scripts();
		} );

		add_filter_elementor_adapter( 'the_content', [ $this, 'builder_wrapper' ], 999999 );

		add_action_elementor_adapter( 'wp_footer', [ $this, 'wp_footer' ] );

		// Tell to WP Cache plugins do not cache this request.
		Utils::do_not_cache();

		/**
		 * Preview init.
		 *
		 * Fires on Elementor preview init, after Elementor preview has finished
		 * loading but before any headers are sent.
		 *
		 * @since 1.0.0
		 *
		 * @param Preview $this The current preview.
		 */
		do_action_elementor_adapter( 'elementor/preview/init', $this );
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
		return $this->post_id;
	}

	/**
	 * Whether preview mode is active.
	 *
	 * Used to determine whether we are in the preview mode (iframe).
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @param int $post_id Optional. Post ID. Default is `0`.
	 *
	 * @return bool Whether preview mode is active.
	 */
	public function is_preview_mode( $post_id = 0 ) {
		if ( empty( $post_id ) ) {
			$post_id = get_the_ID_elementor_adapter();
		}

		if ( ! User::is_current_user_can_edit( $post_id ) ) {
			return false;
		}

		if ( ! isset( $_GET['elementor-preview'] ) || $post_id !== (int) $_GET['elementor-preview'] ) {
			return false;
		}

		return true;
	}

	/**
	 * Builder wrapper.
	 *
	 * Used to add an empty HTML wrapper for the builder, the javascript will add
	 * the content later.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @param string $content The content of the builder.
	 *
	 * @return string HTML wrapper for the builder.
	 */
	public function builder_wrapper( $content ) {
		if ( get_the_ID_elementor_adapter() === $this->post_id ) {
			$classes = 'elementor-edit-mode';

			$document = Plugin::$instance->documents->get( $this->post_id );

			if ( $document ) {
				$classes .= ' ' . $document->get_container_classes();
			}

			$content = '<div id="elementor" class="' . $classes . '"></div>';
		}

		return $content;
	}

	/**
	 * Enqueue preview styles.
	 *
	 * Registers all the preview styles and enqueues them.
	 *
	 * Fired by `wp_enqueue_scripts` action.
	 *
	 * @since 1.0.0
	 * @access private
	 */
	private function enqueue_styles() {
		// Hold-on all jQuery plugins after all HTML markup render.
		wp_add_inline_script( 'jquery-migrate', 'jQuery.holdReady( true );' );

		Plugin::$instance->frontend->enqueue_styles();

		$suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';

		$direction_suffix = is_rtl_elementor_adapter() ? '-rtl' : '';

		wp_register_style(
			'elementor-select2',
			ELEMENTOR_ASSETS_URL . 'lib/e-select2/css/e-select2' . $suffix . '.css',
			[],
			'4.0.6-rc.1'
		);

		wp_register_style(
			'editor-preview',
			ELEMENTOR_ASSETS_URL . 'css/editor-preview' . $direction_suffix . $suffix . '.css',
			[
				'elementor-select2',
			],
			ELEMENTOR_VERSION
		);

		wp_enqueue_style_elementor_adapter( 'editor-preview' );

		/**
		 * Preview enqueue styles.
		 *
		 * Fires after Elementor preview styles are enqueued.
		 *
		 * @since 1.0.0
		 */
		do_action_elementor_adapter( 'elementor/preview/enqueue_styles' );
	}

	/**
	 * Enqueue preview scripts.
	 *
	 * Registers all the preview scripts and enqueues them.
	 *
	 * Fired by `wp_enqueue_scripts` action.
	 *
	 * @since 1.5.4
	 * @access private
	 */
	private function enqueue_scripts() {
		Plugin::$instance->frontend->register_scripts();

		Plugin::$instance->widgets_manager->enqueue_widgets_scripts();

		$suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';

		wp_enqueue_script_elementor_adapter(
			'elementor-inline-editor',
			ELEMENTOR_ASSETS_URL . 'lib/inline-editor/js/inline-editor' . $suffix . '.js',
			[],
			ELEMENTOR_VERSION,
			true
		);

		/**
		 * Preview enqueue scripts.
		 *
		 * Fires after Elementor preview scripts are enqueued.
		 *
		 * @since 1.5.4
		 */
		do_action_elementor_adapter( 'elementor/preview/enqueue_scripts' );
	}

	/**
	 * Elementor Preview footer scripts and styles.
	 *
	 * Handle styles and scripts from frontend.
	 *
	 * Fired by `wp_footer` action.
	 *
	 * @since 2.0.9
	 * @access public
	 */
	public function wp_footer() {
		$frontend = Plugin::$instance->frontend;
		if ( $frontend->has_elementor_in_page() ) {
			// Has header/footer/widget-template - enqueue all style/scripts/fonts.
			$frontend->wp_footer();
		} else {
			// Enqueue only scripts.
			$frontend->enqueue_scripts();
		}
	}

	/**
	 * Preview constructor.
	 *
	 * Initializing Elementor preview.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function __construct() {
		add_action_elementor_adapter( 'template_redirect', [ $this, 'init' ], 0 );
	}
}
