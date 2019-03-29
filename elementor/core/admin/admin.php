<?php
namespace Elementor\Core\Admin;

use Elementor\Api;
use Elementor\Plugin;
use Elementor\Settings;
use Elementor\User;
use Elementor\Utils;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class Admin {

	/**
	 * @var \Elementor\Core\Admin\Feedback
	 */
	private $feedback;

	public function maybe_redirect_to_getting_started() {
		if ( ! get_transient_elementor_adapter( 'elementor_activation_redirect' ) ) {
			return;
		}

		delete_transient( 'elementor_activation_redirect' );

		if ( is_network_admin() || isset( $_GET['activate-multi'] ) ) {
			return;
		}

		global $wpdb;

		$has_elementor_page = ! ! $wpdb->get_var( "SELECT `post_id` FROM `{$wpdb->postmeta}` WHERE `meta_key` = '_elementor_edit_mode' LIMIT 1;" );

		if ( $has_elementor_page ) {
			return;
		}

		wp_safe_redirect( admin_url_elementor_adapter( 'admin.php?page=elementor-getting-started' ) );
		exit;
	}

	/**
	 * Enqueue admin scripts.
	 *
	 * Registers all the admin scripts and enqueues them.
	 *
	 * Fired by `admin_enqueue_scripts` action.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function enqueue_scripts() {
		$suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';

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
			'elementor-dialog',
			ELEMENTOR_ASSETS_URL . 'lib/dialog/dialog' . $suffix . '.js',
			[
				'jquery-ui-position',
			],
			'4.5.0',
			true
		);

		wp_register_script_elementor_adapter(
			'elementor-admin-app',
			ELEMENTOR_ASSETS_URL . 'js/admin' . $suffix . '.js',
			[
				'jquery',
			],
			ELEMENTOR_VERSION,
			true
		);

		wp_localize_script(
			'elementor-admin-app',
			'ElementorAdminConfig',
			[
				'home_url' => home_url(),
				'i18n' => [
					'rollback_confirm' => ___elementor_adapter( 'Are you sure you want to reinstall previous version?', 'elementor' ),
					'rollback_to_previous_version' => ___elementor_adapter( 'Rollback to Previous Version', 'elementor' ),
					'yes' => ___elementor_adapter( 'Yes', 'elementor' ),
					'cancel' => ___elementor_adapter( 'Cancel', 'elementor' ),
					'new_template' => ___elementor_adapter( 'New Template', 'elementor' ),
				],
			]
		);

		wp_enqueue_script_elementor_adapter( 'elementor-admin-app' );
	}

	/**
	 * Enqueue admin styles.
	 *
	 * Registers all the admin styles and enqueues them.
	 *
	 * Fired by `admin_enqueue_scripts` action.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function enqueue_styles() {
		$suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';

		$direction_suffix = is_rtl_elementor_adapter() ? '-rtl' : '';

		wp_register_style(
			'elementor-icons',
			ELEMENTOR_ASSETS_URL . 'lib/eicons/css/elementor-icons' . $suffix . '.css',
			[],
			'3.8.0'
		);

		wp_register_style(
			'elementor-admin-app',
			ELEMENTOR_ASSETS_URL . 'css/admin' . $direction_suffix . $suffix . '.css',
			[
				'elementor-icons',
			],
			ELEMENTOR_VERSION
		);

		wp_enqueue_style_elementor_adapter( 'elementor-admin-app' );

		// It's for upgrade notice.
		// TODO: enqueue this just if needed.
		add_thickbox();
	}

	/**
	 * Print switch mode button.
	 *
	 * Adds a switch button in post edit screen (which has cpt support). To allow
	 * the user to switch from the native WordPress editor to Elementor builder.
	 *
	 * Fired by `edit_form_after_title` action.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @param \WP_Post $post The current post object.
	 */
	public function print_switch_mode_button( $post ) {
		if ( ! User::is_current_user_can_edit( $post->ID ) ) {
			return;
		}

		wp_nonce_field( basename( __FILE__ ), '_elementor_edit_mode_nonce' );
		?>
		<div id="elementor-switch-mode">
			<input id="elementor-switch-mode-input" type="hidden" name="_elementor_post_mode" value="<?php echo Plugin::$instance->db->is_built_with_elementor( $post->ID ); ?>" />
			<button id="elementor-switch-mode-button" type="button" class="button button-primary button-hero">
				<span class="elementor-switch-mode-on">
					<i class="eicon-arrow-<?php echo ( is_rtl_elementor_adapter() ) ? 'right' : 'left'; ?>" aria-hidden="true"></i>
					<?php echo ___elementor_adapter( 'Back to WordPress Editor', 'elementor' ); ?>
				</span>
				<span class="elementor-switch-mode-off">
					<i class="eicon-elementor-square" aria-hidden="true"></i>
					<?php echo ___elementor_adapter( 'Edit with Elementor', 'elementor' ); ?>
				</span>
			</button>
		</div>
		<div id="elementor-editor">
			<a id="elementor-go-to-edit-page-link" href="<?php echo Utils::get_edit_link( $post->ID ); ?>">
				<div id="elementor-editor-button" class="button button-primary button-hero">
					<i class="eicon-elementor-square" aria-hidden="true"></i>
					<?php echo ___elementor_adapter( 'Edit with Elementor', 'elementor' ); ?>
				</div>
				<div class="elementor-loader-wrapper">
					<div class="elementor-loader">
						<div class="elementor-loader-boxes">
							<div class="elementor-loader-box"></div>
							<div class="elementor-loader-box"></div>
							<div class="elementor-loader-box"></div>
							<div class="elementor-loader-box"></div>
						</div>
					</div>
					<div class="elementor-loading-title"><?php echo ___elementor_adapter( 'Loading', 'elementor' ); ?></div>
				</div>
			</a>
		</div>
		<?php
	}

	/**
	 * Save post.
	 *
	 * Flag the post mode when the post is saved.
	 *
	 * Fired by `save_post` action.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @param int $post_id Post ID.
	 */
	public function save_post( $post_id ) {
		if ( ! isset( $_POST['_elementor_edit_mode_nonce'] ) || ! wp_verify_nonce_elementor_adapter( $_POST['_elementor_edit_mode_nonce'], basename( __FILE__ ) ) ) {
			return;
		}

		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}

		Plugin::$instance->db->set_is_elementor_page( $post_id, ! empty( $_POST['_elementor_post_mode'] ) );
	}

	/**
	 * Add edit link in dashboard.
	 *
	 * Add an edit link to the post/page action links on the post/pages list table.
	 *
	 * Fired by `post_row_actions` and `page_row_actions` filters.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @param array    $actions An array of row action links.
	 * @param \WP_Post $post    The post object.
	 *
	 * @return array An updated array of row action links.
	 */
	public function add_edit_in_dashboard( $actions, \WP_Post $post ) {
		if ( User::is_current_user_can_edit( $post->ID ) && Plugin::$instance->db->is_built_with_elementor( $post->ID ) ) {
			$actions['edit_with_elementor'] = sprintf(
				'<a href="%1$s">%2$s</a>',
				Utils::get_edit_link( $post->ID ),
				___elementor_adapter( 'Edit with Elementor', 'elementor' )
			);
		}

		return $actions;
	}

	/**
	 * Add Elementor post state.
	 *
	 * Adds a new "Elementor" post state to the post table.
	 *
	 * Fired by `display_post_states` filter.
	 *
	 * @since 1.8.0
	 * @access public
	 *
	 * @param array    $post_states An array of post display states.
	 * @param \WP_Post $post        The current post object.
	 *
	 * @return array A filtered array of post display states.
	 */
	public function add_elementor_post_state( $post_states, $post ) {
		if ( User::is_current_user_can_edit( $post->ID ) && Plugin::$instance->db->is_built_with_elementor( $post->ID ) ) {
			$post_states['elementor'] = ___elementor_adapter( 'Elementor', 'elementor' );
		}
		return $post_states;
	}

	/**
	 * Body status classes.
	 *
	 * Adds CSS classes to the admin body tag.
	 *
	 * Fired by `admin_body_class` filter.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @param string $classes Space-separated list of CSS classes.
	 *
	 * @return string Space-separated list of CSS classes.
	 */
	public function body_status_classes( $classes ) {
		global $pagenow;

		if ( in_array( $pagenow, [ 'post.php', 'post-new.php' ], true ) && Utils::is_post_support() ) {
			$post = get_post_elementor_adapter();

			$mode_class = Plugin::$instance->db->is_built_with_elementor( $post->ID ) ? 'elementor-editor-active' : 'elementor-editor-inactive';

			$classes .= ' ' . $mode_class;
		}

		return $classes;
	}

	/**
	 * Plugin action links.
	 *
	 * Adds action links to the plugin list table
	 *
	 * Fired by `plugin_action_links` filter.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @param array $links An array of plugin action links.
	 *
	 * @return array An array of plugin action links.
	 */
	public function plugin_action_links( $links ) {
		$settings_link = sprintf( '<a href="%1$s">%2$s</a>', admin_url_elementor_adapter( 'admin.php?page=' . Settings::PAGE_ID ), ___elementor_adapter( 'Settings', 'elementor' ) );

		array_unshift( $links, $settings_link );

		$links['go_pro'] = sprintf( '<a href="%1$s" target="_blank" class="elementor-plugins-gopro">%2$s</a>', Utils::get_pro_link( 'https://elementor.com/pro/?utm_source=wp-plugins&utm_campaign=gopro&utm_medium=wp-dash' ), ___elementor_adapter( 'Go Pro', 'elementor' ) );

		return $links;
	}

	/**
	 * Plugin row meta.
	 *
	 * Adds row meta links to the plugin list table
	 *
	 * Fired by `plugin_row_meta` filter.
	 *
	 * @since 1.1.4
	 * @access public
	 *
	 * @param array  $plugin_meta An array of the plugin's metadata, including
	 *                            the version, author, author URI, and plugin URI.
	 * @param string $plugin_file Path to the plugin file, relative to the plugins
	 *                            directory.
	 *
	 * @return array An array of plugin row meta links.
	 */
	public function plugin_row_meta( $plugin_meta, $plugin_file ) {
		if ( ELEMENTOR_PLUGIN_BASE === $plugin_file ) {
			$row_meta = [
				'docs' => '<a href="https://go.elementor.com/docs-admin-plugins/" aria-label="' . esc_attr_elementor_adapter( ___elementor_adapter( 'View Elementor Documentation', 'elementor' ) ) . '" target="_blank">' . ___elementor_adapter( 'Docs & FAQs', 'elementor' ) . '</a>',
				'ideo' => '<a href="https://go.elementor.com/yt-admin-plugins/" aria-label="' . esc_attr_elementor_adapter( ___elementor_adapter( 'View Elementor Video Tutorials', 'elementor' ) ) . '" target="_blank">' . ___elementor_adapter( 'Video Tutorials', 'elementor' ) . '</a>',
			];

			$plugin_meta = array_merge( $plugin_meta, $row_meta );
		}

		return $plugin_meta;
	}

	/**
	 * Admin notices.
	 *
	 * Add Elementor notices to WordPress admin screen.
	 *
	 * Fired by `admin_notices` action.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function admin_notices() {
		$upgrade_notice = Api::get_upgrade_notice();
		if ( empty( $upgrade_notice ) ) {
			return;
		}

		if ( ! current_user_can( 'update_plugins' ) ) {
			return;
		}

		if ( ! in_array( get_current_screen()->id, [ 'toplevel_page_elementor', 'edit-elementor_library', 'elementor_page_elementor-system-info', 'dashboard' ], true ) ) {
			return;
		}

		// Check if have any upgrades.
		$update_plugins = get_site_transient( 'update_plugins' );

		$has_remote_update_package = ! ( empty( $update_plugins ) || empty( $update_plugins->response[ ELEMENTOR_PLUGIN_BASE ] ) || empty( $update_plugins->response[ ELEMENTOR_PLUGIN_BASE ]->package ) );

		if ( ! $has_remote_update_package && empty( $upgrade_notice['update_link'] ) ) {
			return;
		}

		if ( $has_remote_update_package ) {
			$product = $update_plugins->response[ ELEMENTOR_PLUGIN_BASE ];

			$details_url = self_admin_url_elementor_adapter( 'plugin-install.php?tab=plugin-information&plugin=' . $product->slug . '&section=changelog&TB_iframe=true&width=600&height=800' );
			$upgrade_url = wp_nonce_url( self_admin_url_elementor_adapter( 'update.php?action=upgrade-plugin&plugin=' . ELEMENTOR_PLUGIN_BASE ), 'upgrade-plugin_' . ELEMENTOR_PLUGIN_BASE );
			$new_version = $product->new_version;
		} else {
			$upgrade_url = $upgrade_notice['update_link'];
			$details_url = $upgrade_url;

			$new_version = $upgrade_notice['version'];
		}

		// Check if have upgrade notices to show.
		if ( version_compare( ELEMENTOR_VERSION, $upgrade_notice['version'], '>=' ) ) {
			return;
		}

		$notice_id = 'upgrade_notice_' . $upgrade_notice['version'];
		if ( User::is_user_notice_viewed( $notice_id ) ) {
			return;
		}
		?>
		<div class="notice updated is-dismissible elementor-message elementor-message-dismissed" data-notice_id="<?php echo esc_attr_elementor_adapter( $notice_id ); ?>">
			<div class="elementor-message-inner">
				<div class="elementor-message-icon">
					<div class="e-logo-wrapper">
						<i class="eicon-elementor" aria-hidden="true"></i>
					</div>
				</div>
				<div class="elementor-message-content">
					<strong><?php echo ___elementor_adapter( 'Update Notification', 'elementor' ); ?></strong>
					<p>
						<?php
						printf(
							/* translators: 1: Details URL, 2: Accessibility text, 3: Version number, 4: Update URL, 5: Accessibility text */
							___elementor_adapter( 'There is a new version of Elementor Page Builder available. <a href="%1$s" class="thickbox open-plugin-details-modal" aria-label="%2$s">View version %3$s details</a> or <a href="%4$s" class="update-link" aria-label="%5$s">update now</a>.', 'elementor' ),
							esc_url_elementor_adapter( $details_url ),
							esc_attr_elementor_adapter( sprintf(
								/* translators: %s: Elementor version */
								___elementor_adapter( 'View Elementor version %s details', 'elementor' ),
								$new_version
							) ),
							$new_version,
							esc_url_elementor_adapter( $upgrade_url ),
							esc_attr_elementor_adapter( ___elementor_adapter( 'Update Elementor Now', 'elementor' ) )
						);
						?>
					</p>
				</div>
				<div class="elementor-message-action">
					<a class="button elementor-button" href="<?php echo $upgrade_url; ?>">
						<i class="dashicons dashicons-update" aria-hidden="true"></i>
						<?php echo ___elementor_adapter( 'Update Now', 'elementor' ); ?>
					</a>
				</div>
			</div>
		</div>
		<?php
	}

	/**
	 * Admin footer text.
	 *
	 * Modifies the "Thank you" text displayed in the admin footer.
	 *
	 * Fired by `admin_footer_text` filter.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @param string $footer_text The content that will be printed.
	 *
	 * @return string The content that will be printed.
	 */
	public function admin_footer_text( $footer_text ) {
		$current_screen = get_current_screen();
		$is_elementor_screen = ( $current_screen && false !== strpos( $current_screen->id, 'elementor' ) );

		if ( $is_elementor_screen ) {
			$footer_text = sprintf(
				/* translators: 1: Elementor, 2: Link to plugin review */
				___elementor_adapter( 'Enjoyed %1$s? Please leave us a %2$s rating. We really appreciate your support!', 'elementor' ),
				'<strong>' . ___elementor_adapter( 'Elementor', 'elementor' ) . '</strong>',
				'<a href="https://go.elementor.com/admin-review/" target="_blank">&#9733;&#9733;&#9733;&#9733;&#9733;</a>'
			);
		}

		return $footer_text;
	}

	/**
	 * Register dashboard widgets.
	 *
	 * Adds a new Elementor widgets to WordPress dashboard.
	 *
	 * Fired by `wp_dashboard_setup` action.
	 *
	 * @since 1.9.0
	 * @access public
	 */
	public function register_dashboard_widgets() {
		wp_add_dashboard_widget( 'e-dashboard-overview', ___elementor_adapter( 'Elementor Overview', 'elementor' ), [ $this, 'elementor_dashboard_overview_widget' ] );

		// Move our widget to top.
		global $wp_meta_boxes;

		$dashboard = $wp_meta_boxes['dashboard']['normal']['core'];
		$ours = [
			'e-dashboard-overview' => $dashboard['e-dashboard-overview'],
		];

		$wp_meta_boxes['dashboard']['normal']['core'] = array_merge( $ours, $dashboard ); // WPCS: override ok.
	}

	/**
	 * Elementor dashboard widget.
	 *
	 * Displays the Elementor dashboard widget.
	 *
	 * Fired by `wp_add_dashboard_widget` function.
	 *
	 * @since 1.9.0
	 * @access public
	 */
	public function elementor_dashboard_overview_widget() {
		$elementor_feed = Api::get_feed_data();

		$recently_edited_query_args = [
			'post_type' => 'any',
			'post_status' => [ 'publish', 'draft' ],
			'posts_per_page' => '3',
			'meta_key' => '_elementor_edit_mode',
			'meta_value' => 'builder',
			'orderby' => 'modified',
		];

		$recently_edited_query = new \WP_Query( $recently_edited_query_args );

		if ( User::is_current_user_can_edit_post_type( 'page' ) ) {
			$create_new_label = ___elementor_adapter( 'Create New Page', 'elementor' );
			$create_new_post_type = 'page';
		} elseif ( User::is_current_user_can_edit_post_type( 'post' ) ) {
			$create_new_label = ___elementor_adapter( 'Create New Post', 'elementor' );
			$create_new_post_type = 'post';
		}
		?>
		<div class="e-dashboard-widget">
			<div class="e-overview__header">
				<div class="e-overview__logo"><div class="e-logo-wrapper"><i class="eicon-elementor"></i></div></div>
				<div class="e-overview__versions">
					<span class="e-overview__version"><?php echo ___elementor_adapter( 'Elementor', 'elementor' ); ?> v<?php echo ELEMENTOR_VERSION; ?></span>
					<?php
					/**
					 * Elementor dashboard widget after the version.
					 *
					 * Fires after Elementor version display in the dashboard widget.
					 *
					 * @since 1.9.0
					 */
					do_action_elementor_adapter( 'elementor/admin/dashboard_overview_widget/after_version' );
					?>
				</div>
				<?php if ( ! empty( $create_new_post_type ) ) : ?>
					<div class="e-overview__create">
						<a href="<?php echo esc_url_elementor_adapter( Utils::get_create_new_post_url( $create_new_post_type ) ); ?>" class="button"><span aria-hidden="true" class="dashicons dashicons-plus"></span> <?php echo esc_html_elementor_adapter( $create_new_label ); ?></a>
					</div>
				<?php endif; ?>
			</div>
			<?php if ( $recently_edited_query->have_posts_elementor_adapter() ) : ?>
				<div class="e-overview__recently-edited">
					<h3 class="e-overview__heading"><?php echo ___elementor_adapter( 'Recently Edited', 'elementor' ); ?></h3>
					<ul class="e-overview__posts">
						<?php
						while ( $recently_edited_query->have_posts_elementor_adapter() ) :
							$recently_edited_query->the_post();

							$date = date_i18n( _x_elementor_adapter( 'M jS', 'Dashboard Overview Widget Recently Date', 'elementor' ), get_the_modified_time( 'U' ) );
							?>
							<li class="e-overview__post">
								<a href="<?php echo esc_attr_elementor_adapter( Utils::get_edit_link( get_the_ID_elementor_adapter() ) ); ?>" class="e-overview__post-link"><?php the_title(); ?> <span class="dashicons dashicons-edit"></span></a> <span><?php echo $date; ?>, <?php the_time(); ?></span>
							</li>
						<?php endwhile; ?>
					</ul>
				</div>
			<?php endif; ?>
			<?php if ( ! empty( $elementor_feed ) ) : ?>
				<div class="e-overview__feed">
					<h3 class="e-overview__heading"><?php echo ___elementor_adapter( 'News & Updates', 'elementor' ); ?></h3>
					<ul class="e-overview__posts">
						<?php foreach ( $elementor_feed as $feed_item ) : ?>
							<li class="e-overview__post">
								<a href="<?php echo esc_url_elementor_adapter( $feed_item['url'] ); ?>" class="e-overview__post-link" target="_blank">
									<?php if ( ! empty( $feed_item['badge'] ) ) : ?>
										<span class="e-overview__badge"><?php echo esc_html_elementor_adapter( $feed_item['badge'] ); ?></span>
									<?php endif; ?>
									<?php echo esc_html_elementor_adapter( $feed_item['title'] ); ?>
								</a>
								<p class="e-overview__post-description"><?php echo esc_html_elementor_adapter( $feed_item['excerpt'] ); ?></p>
							</li>
						<?php endforeach; ?>
					</ul>
				</div>
			<?php endif; ?>
			<div class="e-overview__footer">
				<ul>
					<?php foreach ( $this->get_dashboard_overview_widget_footer_actions() as $action_id => $action ) : ?>
						<li class="e-overview__<?php echo esc_attr_elementor_adapter( $action_id ); ?>"><a href="<?php echo esc_attr_elementor_adapter( $action['link'] ); ?>" target="_blank"><?php echo esc_html_elementor_adapter( $action['title'] ); ?> <span class="screen-reader-text"><?php echo ___elementor_adapter( '(opens in a new window)', 'elementor' ); ?></span><span aria-hidden="true" class="dashicons dashicons-external"></span></a></li>
					<?php endforeach; ?>
				</ul>
			</div>
		</div>
		<?php
	}

	/**
	 * Get elementor dashboard overview widget footer actions.
	 *
	 * Retrieves the footer action links displayed in elementor dashboard widget.
	 *
	 * @since 1.9.0
	 * @access private
	 */
	private function get_dashboard_overview_widget_footer_actions() {
		$base_actions = [
			'blog' => [
				'title' => ___elementor_adapter( 'Blog', 'elementor' ),
				'link' => 'https://go.elementor.com/overview-widget-blog/',
			],
			'help' => [
				'title' => ___elementor_adapter( 'Help', 'elementor' ),
				'link' => 'https://go.elementor.com/overview-widget-docs/',
			],
		];

		$additions_actions = [
			'go-pro' => [
				'title' => ___elementor_adapter( 'Go Pro', 'elementor' ),
				'link' => Utils::get_pro_link( 'https://elementor.com/pro/?utm_source=wp-overview-widget&utm_campaign=gopro&utm_medium=wp-dash' ),
			],
		];

		/**
		 * Dashboard widget footer actions.
		 *
		 * Filters the additions actions displayed in Elementor dashboard widget.
		 *
		 * Developers can add new action links to Elementor dashboard widget
		 * footer using this filter.
		 *
		 * @since 1.9.0
		 *
		 * @param array $additions_actions Elementor dashboard widget footer actions.
		 */
		$additions_actions = apply_filters_elementor_adapter( 'elementor/admin/dashboard_overview_widget/footer_actions', $additions_actions );

		$actions = $base_actions + $additions_actions;

		return $actions;
	}

	/**
	 * Admin action new post.
	 *
	 * When a new post action is fired the title is set to 'Elementor' and the post ID.
	 *
	 * Fired by `admin_action_elementor_new_post` action.
	 *
	 * @since 1.9.0
	 * @access public
	 */
	public function admin_action_new_post() {
		check_admin_referer_elementor_adapter( 'elementor_action_new_post' );

		if ( empty( $_GET['post_type'] ) ) {
			$post_type = 'post';
		} else {
			$post_type = $_GET['post_type'];
		}

		if ( ! User::is_current_user_can_edit_post_type( $post_type ) ) {
			return;
		}

		if ( empty( $_GET['template_type'] ) ) {
			$type = 'post';
		} else {
			$type = $_GET['template_type']; // XSS ok.
		}

		$post_data = isset( $_GET['post_data'] ) ? $_GET['post_data'] : [];

		$meta = [];

		/**
		 * Create new post meta data.
		 *
		 * Filters the meta data of any new post created.
		 *
		 * @since 2.0.0
		 *
		 * @param array $meta Post meta data.
		 */
		$meta = apply_filters_elementor_adapter( 'elementor/admin/create_new_post/meta', $meta );

		$post_data['post_type'] = $post_type;

		$document = Plugin::$instance->documents->create( $type, $post_data, $meta );

		wp_redirect_elementor_adapter( $document->get_edit_url() );
		die;
	}

	public function print_new_template_template() {
		$this->print_library_layout_template();

		include ELEMENTOR_PATH . 'includes/admin-templates/new-template.php';
	}

	public function enqueue_new_template_scripts() {
		$suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';

		wp_enqueue_script_elementor_adapter(
			'elementor-new-template',
			ELEMENTOR_ASSETS_URL . 'js/new-template' . $suffix . '.js',
			[
				'backbone-marionette',
				'elementor-dialog',
			],
			ELEMENTOR_VERSION,
			true
		);
	}

	public function init_new_template() {
		if ( 'edit-elementor_library' !== get_current_screen()->id ) {
			return;
		}

		add_action_elementor_adapter( 'admin_footer', [ $this, 'print_new_template_template' ] );

		add_action_elementor_adapter( 'admin_enqueue_scripts', [ $this, 'enqueue_new_template_scripts' ] );
	}

	/**
	 * Admin constructor.
	 *
	 * Initializing Elementor in WordPress admin.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function __construct() {
		$this->feedback = new Feedback();

		add_action_elementor_adapter( 'admin_init', [ $this, 'maybe_redirect_to_getting_started' ] );

		add_action_elementor_adapter( 'admin_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
		add_action_elementor_adapter( 'admin_enqueue_scripts', [ $this, 'enqueue_styles' ] );

		add_action_elementor_adapter( 'edit_form_after_title', [ $this, 'print_switch_mode_button' ] );
		add_action_elementor_adapter( 'save_post', [ $this, 'save_post' ] );

		add_filter_elementor_adapter( 'page_row_actions', [ $this, 'add_edit_in_dashboard' ], 10, 2 );
		add_filter_elementor_adapter( 'post_row_actions', [ $this, 'add_edit_in_dashboard' ], 10, 2 );

		add_filter_elementor_adapter( 'display_post_states', [ $this, 'add_elementor_post_state' ], 10, 2 );

		add_filter_elementor_adapter( 'plugin_action_links_' . ELEMENTOR_PLUGIN_BASE, [ $this, 'plugin_action_links' ] );
		add_filter_elementor_adapter( 'plugin_row_meta', [ $this, 'plugin_row_meta' ], 10, 2 );

		add_action_elementor_adapter( 'admin_notices', [ $this, 'admin_notices' ] );
		add_filter_elementor_adapter( 'admin_body_class', [ $this, 'body_status_classes' ] );
		add_filter_elementor_adapter( 'admin_footer_text', [ $this, 'admin_footer_text' ] );

		// Register Dashboard Widgets.
		add_action_elementor_adapter( 'wp_dashboard_setup', [ $this, 'register_dashboard_widgets' ] );

		// Admin Actions
		add_action_elementor_adapter( 'admin_action_elementor_new_post', [ $this, 'admin_action_new_post' ] );

		add_action_elementor_adapter( 'current_screen', [ $this, 'init_new_template' ] );
	}

	private function print_library_layout_template() {
		include ELEMENTOR_PATH . 'includes/editor-templates/library-layout.php';
	}
}
