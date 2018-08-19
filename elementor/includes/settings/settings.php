<?php
namespace Elementor;

use Elementor\Core\Responsive\Responsive;
use Elementor\Core\Settings\General\Manager as General_Settings_Manager;
use Elementor\Core\Settings\Manager;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Elementor "Settings" page in WordPress Dashboard.
 *
 * Elementor settings page handler class responsible for creating and displaying
 * Elementor "Settings" page in WordPress dashboard.
 *
 * @since 1.0.0
 */
class Settings extends Settings_Page {

	/**
	 * Settings page ID for Elementor settings.
	 */
	const PAGE_ID = 'elementor';

	/**
	 * Go Pro menu priority.
	 */
	const MENU_PRIORITY_GO_PRO = 502;

	/**
	 * Settings page field for update time.
	 */
	const UPDATE_TIME_FIELD = '_elementor_settings_update_time';

	/**
	 * Settings page general tab slug.
	 */
	const TAB_GENERAL = 'general';

	/**
	 * Settings page style tab slug.
	 */
	const TAB_STYLE = 'style';

	/**
	 * Settings page integrations tab slug.
	 */
	const TAB_INTEGRATIONS = 'integrations';

	/**
	 * Settings page advanced tab slug.
	 */
	const TAB_ADVANCED = 'advanced';

	/**
	 * Register admin menu.
	 *
	 * Add new Elementor Settings admin menu.
	 *
	 * Fired by `admin_menu` action.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function register_admin_menu() {
		add_menu_page_elementor_adapter(
			___elementor_adapter( 'Elementor', 'elementor' ),
			___elementor_adapter( 'Elementor', 'elementor' ),
			'manage_options',
			self::PAGE_ID,
			[ $this, 'display_settings_page' ],
			'',
			99
		);
	}

	/**
	 * Register Elementor Pro sub-menu.
	 *
	 * Add new Elementor Pro sub-menu under the main Elementor menu.
	 *
	 * Fired by `admin_menu` action.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function register_pro_menu() {
		add_submenu_page_elementor_adapter(
			self::PAGE_ID,
			___elementor_adapter( 'Custom Fonts', 'elementor' ),
			___elementor_adapter( 'Custom Fonts', 'elementor' ),
			'manage_options',
			'elementor_custom_fonts',
			[ $this, 'elementor_custom_fonts' ]
		);

		add_submenu_page_elementor_adapter(
			self::PAGE_ID,
			'',
			'<span class="dashicons dashicons-star-filled" style="font-size: 17px"></span> ' . ___elementor_adapter( 'Go Pro', 'elementor' ),
			'manage_options',
			'go_elementor_pro',
			[ $this, 'handle_external_redirects' ]
		);
	}

	/**
	 * Register Elementor knowledge base sub-menu.
	 *
	 * Add new Elementor knowledge base sub-menu under the main Elementor menu.
	 *
	 * Fired by `admin_menu` action.
	 *
	 * @since 2.0.3
	 * @access public
	 */
	public function register_knowledge_base_menu() {
		add_submenu_page_elementor_adapter(
			self::PAGE_ID,
			'',
			___elementor_adapter( 'Knowledge Base', 'elementor' ),
			'manage_options',
			'go_knowledge_base_site',
			[ $this, 'handle_external_redirects' ]
		);
	}

	/**
	 * Go Elementor Pro.
	 *
	 * Redirect the Elementor Pro page the clicking the Elementor Pro menu link.
	 *
	 * Fired by `admin_init` action.
	 *
	 * @since 2.0.3
	 * @access public
	 */
	public function handle_external_redirects() {
		if ( empty( $_GET['page'] ) ) {
			return;
		}

		if ( 'go_elementor_pro' === $_GET['page'] ) {
			wp_redirect_elementor_adapter( Utils::get_pro_link( 'https://elementor.com/pro/?utm_source=wp-menu&utm_campaign=gopro&utm_medium=wp-dash' ) );
			die;
		}

		if ( 'go_knowledge_base_site' === $_GET['page'] ) {
			wp_redirect_elementor_adapter( 'https://go.elementor.com/docs-admin-menu/' );
			die;
		}
	}

	/**
	 * Display settings page.
	 *
	 * Output the content for the custom fonts page.
	 *
	 * @since 2.0.0
	 * @access public
	 */
	public function elementor_custom_fonts() {
		?>
		<div class="wrap">
			<div class="elementor-blank_state">
				<i class="eicon-nerd-chuckle"></i>
				<h2><?php echo ___elementor_adapter( 'Add Your Custom Fonts', 'elementor' ); ?></h2>
				<p><?php echo ___elementor_adapter( 'Custom Fonts allows you to add your self-hosted fonts and use them on your Elementor projects to create a unique brand language.', 'elementor' ); ?></p>
				<a class="elementor-button elementor-button-default elementor-button-go-pro" target="_blank" href="<?php echo Utils::get_pro_link( 'https://elementor.com/pro/?utm_source=wp-custom-fonts&utm_campaign=gopro&utm_medium=wp-dash' ); ?>"><?php echo ___elementor_adapter( 'Go Pro', 'elementor' ); ?></a>
			</div>
		</div><!-- /.wrap -->
		<?php
	}

	/**
	 * On admin init.
	 *
	 * Preform actions on WordPress admin initialization.
	 *
	 * Fired by `admin_init` action.
	 *
	 * @since 2.0.0
	 * @access public
	 */
	public function on_admin_init() {
		$this->handle_external_redirects();

		// Save general settings in one list for a future usage
		$this->handle_general_settings_update();
	}

	/**
	 * Change "Settings" menu name.
	 *
	 * Update the name of the Settings admin menu from "Elementor" to "Settings".
	 *
	 * Fired by `admin_menu` action.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function admin_menu_change_name() {
		global $submenu;

		if ( isset( $submenu['elementor'] ) ) {
			// @codingStandardsIgnoreStart
			$submenu['elementor'][0][0] = ___elementor_adapter( 'Settings', 'elementor' );

			$hold_menu_data = $submenu['elementor'][0];
			$submenu['elementor'][0] = $submenu['elementor'][1];
			$submenu['elementor'][1] = $hold_menu_data;
			// @codingStandardsIgnoreEnd
		}
	}

	/**
	 * Update CSS print method.
	 *
	 * Clear post CSS cache.
	 *
	 * Fired by `add_option_elementor_css_print_method` and
	 * `update_option_elementor_css_print_method` actions.
	 *
	 * @since 1.7.5
	 * @access public
	 */
	public function update_css_print_method() {
		Plugin::$instance->files_manager->clear_cache();
	}

	/**
	 * Create tabs.
	 *
	 * Return the settings page tabs, sections and fields.
	 *
	 * @since 1.5.0
	 * @access protected
	 *
	 * @return array An array with the settings page tabs, sections and fields.
	 */
	protected function create_tabs() {
		$validations_class_name = __NAMESPACE__ . '\Settings_Validations';

		$default_breakpoints = Responsive::get_default_breakpoints();

		return [
			self::TAB_GENERAL => [
				'label' => ___elementor_adapter( 'General', 'elementor' ),
				'sections' => [
					'general' => [
						'fields' => [
							self::UPDATE_TIME_FIELD => [
								'full_field_id' => self::UPDATE_TIME_FIELD,
								'field_args' => [
									'type' => 'hidden',
								],
								'setting_args' => [
									'sanitize_callback' => 'time',
								],
							],
							'cpt_support' => [
								'label' => ___elementor_adapter( 'Post Types', 'elementor' ),
								'field_args' => [
									'type' => 'checkbox_list_cpt',
									'std' => [ 'page', 'post' ],
									'exclude' => [ 'attachment', 'elementor_library' ],
								],
								'setting_args' => [ $validations_class_name, 'checkbox_list' ],
							],
							'disable_color_schemes' => [
								'label' => ___elementor_adapter( 'Disable Default Colors', 'elementor' ),
								'field_args' => [
									'type' => 'checkbox',
									'value' => 'yes',
									'sub_desc' => ___elementor_adapter( 'Checking this box will disable Elementor\'s Default Colors, and make Elementor inherit the colors from your theme.', 'elementor' ),
								],
							],
							'disable_typography_schemes' => [
								'label' => ___elementor_adapter( 'Disable Default Fonts', 'elementor' ),
								'field_args' => [
									'type' => 'checkbox',
									'value' => 'yes',
									'sub_desc' => ___elementor_adapter( 'Checking this box will disable Elementor\'s Default Fonts, and make Elementor inherit the fonts from your theme.', 'elementor' ),
								],
							],
						],
					],
					'usage' => [
						'label' => ___elementor_adapter( 'Improve Elementor', 'elementor' ),
						'fields' => [
							'allow_tracking' => [
								'label' => ___elementor_adapter( 'Usage Data Tracking', 'elementor' ),
								'field_args' => [
									'type' => 'checkbox',
									'value' => 'yes',
									'default' => '',
									'sub_desc' => ___elementor_adapter( 'Opt-in to our anonymous plugin data collection and to updates. We guarantee no sensitive data is collected.', 'elementor' ) . sprintf( ' <a href="%1$s" target="_blank">%2$s</a>', 'https://go.elementor.com/usage-data-tracking/', ___elementor_adapter( 'Learn more.', 'elementor' ) ),
								],
								'setting_args' => [ __NAMESPACE__ . '\Tracker', 'check_for_settings_optin' ],
							],
						],
					],
				],
			],
			self::TAB_STYLE => [
				'label' => ___elementor_adapter( 'Style', 'elementor' ),
				'sections' => [
					'style' => [
						'fields' => [
							'default_generic_fonts' => [
								'label' => ___elementor_adapter( 'Default Generic Fonts', 'elementor' ),
								'field_args' => [
									'type' => 'text',
									'std' => 'Sans-serif',
									'class' => 'medium-text',
									'desc' => ___elementor_adapter( 'The list of fonts used if the chosen font is not available.', 'elementor' ),
								],
							],
							'container_width' => [
								'label' => ___elementor_adapter( 'Content Width', 'elementor' ),
								'field_args' => [
									'type' => 'number',
									'attributes' => [
										'placeholder' => '1140',
										'class' => 'medium-text',
									],
									'sub_desc' => 'px',
									'desc' => ___elementor_adapter( 'Sets the default width of the content area (Default: 1140)', 'elementor' ),
								],
							],
							'space_between_widgets' => [
								'label' => ___elementor_adapter( 'Space Between Widgets', 'elementor' ),
								'field_args' => [
									'type' => 'number',
									'attributes' => [
										'placeholder' => '20',
										'class' => 'medium-text',
									],
									'sub_desc' => 'px',
									'desc' => ___elementor_adapter( 'Sets the default space between widgets (Default: 20)', 'elementor' ),
								],
							],
							'stretched_section_container' => [
								'label' => ___elementor_adapter( 'Stretched Section Fit To', 'elementor' ),
								'field_args' => [
									'type' => 'text',
									'attributes' => [
										'placeholder' => 'body',
										'class' => 'medium-text',
									],
									'desc' => ___elementor_adapter( 'Enter parent element selector to which stretched sections will fit to (e.g. #primary / .wrapper / main etc). Leave blank to fit to page width.', 'elementor' ),
								],
							],
							'page_title_selector' => [
								'label' => ___elementor_adapter( 'Page Title Selector', 'elementor' ),
								'field_args' => [
									'type' => 'text',
									'attributes' => [
										'placeholder' => 'h1.entry-title',
										'class' => 'medium-text',
									],
									'desc' => ___elementor_adapter( 'Elementor lets you hide the page title. This works for themes that have "h1.entry-title" selector. If your theme\'s selector is different, please enter it above.', 'elementor' ),
								],
							],
							'viewport_lg' => [
								'label' => ___elementor_adapter( 'Tablet Breakpoint', 'elementor' ),
								'field_args' => [
									'type' => 'number',
									'attributes' => [
										'placeholder' => $default_breakpoints['lg'],
										'min' => $default_breakpoints['md'] + 1,
										'max' => $default_breakpoints['xl'] - 1,
										'class' => 'medium-text',
									],
									'sub_desc' => 'px',
									'desc' => ___elementor_adapter( 'Sets the breakpoint between desktop and tablet devices. Below this breakpoint tablet layout will appear (Default: ' . $default_breakpoints['lg'] . ').', 'elementor' ),
								],
							],
							'viewport_md' => [
								'label' => ___elementor_adapter( 'Mobile Breakpoint', 'elementor' ),
								'field_args' => [
									'type' => 'number',
									'attributes' => [
										'placeholder' => $default_breakpoints['md'],
										'min' => $default_breakpoints['sm'] + 1,
										'max' => $default_breakpoints['lg'] - 1,
										'class' => 'medium-text',
									],
									'sub_desc' => 'px',
									'desc' => ___elementor_adapter( 'Sets the breakpoint between tablet and mobile devices. Below this breakpoint mobile layout will appear (Default: ' . $default_breakpoints['md'] . ').', 'elementor' ),
								],
							],
							'global_image_lightbox' => [
								'label' => ___elementor_adapter( 'Image Lightbox', 'elementor' ),
								'field_args' => [
									'type' => 'checkbox',
									'value' => 'yes',
									'std' => 'yes',
									'sub_desc' => ___elementor_adapter( 'Open all image links in a lightbox popup window. The lightbox will automatically work on any link that leads to an image file.', 'elementor' ),
									'desc' => ___elementor_adapter( 'You can customize the lightbox design by going to: Top-left hamburger icon > Global Settings > Lightbox.', 'elementor' ),
								],
							],
						],
					],
				],
			],
			self::TAB_INTEGRATIONS => [
				'label' => ___elementor_adapter( 'Integrations', 'elementor' ),
				'sections' => [],
			],
			self::TAB_ADVANCED => [
				'label' => ___elementor_adapter( 'Advanced', 'elementor' ),
				'sections' => [
					'advanced' => [
						'fields' => [
							'css_print_method' => [
								'label' => ___elementor_adapter( 'CSS Print Method', 'elementor' ),
								'field_args' => [
									'class' => 'elementor_css_print_method',
									'type' => 'select',
									'options' => [
										'external' => ___elementor_adapter( 'External File', 'elementor' ),
										'internal' => ___elementor_adapter( 'Internal Embedding', 'elementor' ),
									],
									'desc' => '<div class="elementor-css-print-method-description" data-value="external" style="display: none">' .
											  ___elementor_adapter( 'Use external CSS files for all generated stylesheets. Choose this setting for better performance (recommended).', 'elementor' ) .
											  '</div>' .
											  '<div class="elementor-css-print-method-description" data-value="internal" style="display: none">' .
											  ___elementor_adapter( 'Use internal CSS that is embedded in the head of the page. For troubleshooting server configuration conflicts and managing development environments.', 'elementor' ) .
											  '</div>',
								],
							],
							'editor_break_lines' => [
								'label' => ___elementor_adapter( 'Switch Editor Loader Method', 'elementor' ),
								'field_args' => [
									'type' => 'select',
									'options' => [
										'' => ___elementor_adapter( 'Disable', 'elementor' ),
										1 => ___elementor_adapter( 'Enable', 'elementor' ),
									],
									'desc' => ___elementor_adapter( 'For troubleshooting server configuration conflicts.', 'elementor' ),
								],
							],
						],
					],
				],
			],
		];
	}

	/**
	 * Get settings page title.
	 *
	 * Retrieve the title for the settings page.
	 *
	 * @since 1.5.0
	 * @access protected
	 *
	 * @return string Settings page title.
	 */
	protected function get_page_title() {
		return ___elementor_adapter( 'Elementor', 'elementor' );
	}

	/**
	 * Handle general settings update.
	 *
	 * Save general settings in one list for a future usage.
	 *
	 * @since 2.0.0
	 * @access private
	 */
	private function handle_general_settings_update() {
		if ( ! empty( $_POST['option_page'] ) && self::PAGE_ID === $_POST['option_page'] && ! empty( $_POST['action'] ) && 'update' === $_POST['action'] ) {
			check_admin_referer_elementor_adapter( 'elementor-options' );

			$saved_general_settings = get_option_elementor_adapter( General_Settings_Manager::META_KEY );

			if ( ! $saved_general_settings ) {
				$saved_general_settings = [];
			}

			$general_settings = Manager::get_settings_managers( 'general' )->get_model()->get_settings();

			foreach ( $general_settings as $setting_key => $setting ) {
				if ( ! empty( $_POST[ $setting_key ] ) ) {
					$pure_setting_key = str_replace( 'elementor_', '', $setting_key );

					$saved_general_settings[ $pure_setting_key ] = $_POST[ $setting_key ];
				}
			}

			update_option_elementor_adapter( General_Settings_Manager::META_KEY, $saved_general_settings );
		}
	}

	/**
	 * Settings page constructor.
	 *
	 * Initializing Elementor "Settings" page.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function __construct() {
		parent::__construct();

		add_action_elementor_adapter( 'admin_init', [ $this, 'on_admin_init' ] );
		add_action_elementor_adapter( 'admin_menu', [ $this, 'register_admin_menu' ], 20 );
		add_action_elementor_adapter( 'admin_menu', [ $this, 'admin_menu_change_name' ], 200 );
		add_action_elementor_adapter( 'admin_menu', [ $this, 'register_pro_menu' ], self::MENU_PRIORITY_GO_PRO );
		add_action_elementor_adapter( 'admin_menu', [ $this, 'register_knowledge_base_menu' ], 501 );

		// Clear CSS Meta after change print method.
		add_action_elementor_adapter( 'add_option_elementor_css_print_method', [ $this, 'update_css_print_method' ] );
		add_action_elementor_adapter( 'update_option_elementor_css_print_method', [ $this, 'update_css_print_method' ] );

		foreach ( Responsive::get_editable_breakpoints() as $breakpoint_key => $breakpoint ) {
			foreach ( [ 'add', 'update' ] as $action ) {
				add_action_elementor_adapter( "{$action}_option_elementor_viewport_{$breakpoint_key}", [ 'Elementor\Responsive', 'compile_stylesheet_templates' ] );
			}
		}
	}
}
