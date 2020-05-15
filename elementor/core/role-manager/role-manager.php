<?php
namespace Elementor\Core\RoleManager;

use Elementor\Settings_Page;
use Elementor\Settings;
use Elementor\Utils;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class Role_Manager extends Settings_Page {

	const PAGE_ID = 'elementor-role-manager';
	const ROLE_MANAGER_OPTION_NAME = 'exclude_user_roles';

	/**
	 * @since 2.0.0
	 * @access public
	 */
	public function get_role_manager_options() {
		return get_option_elementor_adapter( 'elementor_' . self::ROLE_MANAGER_OPTION_NAME, [] );
	}

	/**
	 * @since 2.0.0
	 * @access protected
	 */
	protected function get_page_title() {
		return ___elementor_adapter( 'Role Manager', 'elementor' );
	}

	/**
	 * @since 2.0.0
	 * @access public
	 */
	public function register_admin_menu() {
		add_submenu_page_elementor_adapter(
			Settings::PAGE_ID,
			$this->get_page_title(),
			$this->get_page_title(),
			'manage_options',
			self::PAGE_ID,
			[ $this, 'display_settings_page' ]
		);
	}

	/**
	 * @since 2.0.0
	 * @access protected
	 */
	protected function create_tabs() {
		$validation_class = 'Elementor\Settings_Validations';
		return [
			'general' => [
				'label' => ___elementor_adapter( 'General', 'elementor' ),
				'sections' => [
					'tools' => [
						'fields' => [
							'exclude_user_roles' => [
								'label' => ___elementor_adapter( 'Exclude Roles', 'elementor' ),
								'field_args' => [
									'type' => 'checkbox_list_roles',
									'exclude' => [ 'administrator' ],
								],
								'setting_args' => [
									'sanitize_callback' => [ $validation_class, 'checkbox_list' ],
								],
							],
						],
					],
				],
			],
		];
	}

	/**
	 * @since 2.0.0
	 * @access public
	 */
	public function display_settings_page() {
		$this->get_tabs();
		?>
		<div class="wrap">
			<h1><?php echo esc_html_elementor_adapter( $this->get_page_title() ); ?></h1>

			<div id="elementor-role-manager">
				<h3><?php echo ___elementor_adapter( 'Manage What Your Users Can Edit In Elementor', 'elementor' ); ?></h3>
				<form id="elementor-settings-form" method="post" action="options.php">
					<?php
					settings_fields( static::PAGE_ID );
					echo '<div class="elementor-settings-form-page elementor-active">';
					foreach ( get_editable_roles() as $role_slug => $role_data ) {
						if ( 'administrator' === $role_slug ) {
							continue;
						}
						$this->display_role_controls( $role_slug, $role_data );
					}
					submit_button();
					?>
				</form>
			</div>
		</div><!-- /.wrap -->
		<?php
	}

	/**
	 * @since 2.0.0
	 * @access private
	 *
	 * @param string $role_slug The role slug.
	 * @param array  $role_data An array with role data.
	 */
	private function display_role_controls( $role_slug, $role_data ) {
		static $excluded_options = false;
		if ( false === $excluded_options ) {
			$excluded_options = $this->get_role_manager_options();
		}

		?>
		<div class="elementor-role-row <?php echo esc_attr_elementor_adapter( $role_slug ); ?>">
			<div class="elementor-role-label">
				<span class="elementor-role-name"><?php echo esc_html_elementor_adapter( $role_data['name'] ); ?></span>
				<span data-excluded-label="<?php esc_attr_e_elementor_adapter( 'Role Excluded', 'elementor' ); ?>" class="elementor-role-excluded-indicator"></span>
				<span class="elementor-role-toggle"><span class="dashicons dashicons-arrow-down"></span></span>
			</div>
			<div class="elementor-role-controls hidden">
				<div class="elementor-role-control">
					<label>
						<input type="checkbox" name="elementor_exclude_user_roles[]" value="<?php echo esc_attr_elementor_adapter( $role_slug ); ?>"<?php checked( in_array( $role_slug, $excluded_options, true ), true ); ?>>
						<?php echo ___elementor_adapter( 'No access to editor', 'elementor' ); ?>
					</label>
				</div>
				<div>
					<?php
					/**
					 * Role restrictions controls.
					 *
					 * Fires after the role manager checkbox that allows the user to
					 * exclude the role.
					 *
					 * This filter allows developers to add custom controls to the role
					 * manager.
					 *
					 * @since 2.0.0
					 *
					 * @param string $role_slug The role slug.
					 * @param array  $role_data An array with role data.
					 */
					do_action_elementor_adapter( 'elementor/role/restrictions/controls', $role_slug, $role_data );
					?>
				</div>
			</div>
		</div>
		<?php
	}

	/**
	 * @since 2.0.0
	 * @access public
	 */
	public function get_go_pro_link_html() {
		$pro_link = Utils::get_pro_link( 'https://elementor.com/pro/?utm_source=wp-role-manager&utm_campaign=gopro&utm_medium=wp-dash' );
		?>
		<div class="elementor-role-go-pro">
			<div class="elementor-role-go-pro__desc"><?php echo ___elementor_adapter( 'Want to give access only to content?', 'elementor' ); ?></div>
			<div class="elementor-role-go-pro__link"><a class="elementor-button elementor-button-default elementor-button-go-pro" target="_blank" href="<?php echo esc_url_elementor_adapter( $pro_link ); ?>"><?php echo ___elementor_adapter( 'Go Pro', 'elementor' ); ?></a></div>
		</div>
		<?php
	}

	/**
	 * @since 2.0.0
	 * @access public
	 */
	public function get_user_restrictions_array() {
		$user  = wp_get_current_user_elementor_adapter();
		$options = $this->get_user_restrictions();
		$restrictions = [];
		if ( empty( $options ) ) {
			return $restrictions;
		}

        $user_roles = $user->roles;

		foreach ( $user_roles as $role ) {
			if ( ! isset( $options[ $role ] ) ) {
				continue;
			}
			$restrictions = array_merge( $restrictions, $options[ $role ] );
		}
		return array_unique( $restrictions );
	}

	/**
	 * @since 2.0.0
	 * @access private
	 */
	private function get_user_restrictions() {
		static $restrictions = false;
		if ( ! $restrictions ) {
			$restrictions = [];

			/**
			 * Editor user restrictions.
			 *
			 * Filters the user restrictions in the editor.
			 *
			 * @since 2.0.0
			 *
			 * @param array $restrictions User restrictions.
			 */
			$restrictions = apply_filters_elementor_adapter( 'elementor/editor/user/restrictions', $restrictions );
		}
		return $restrictions;
	}

	/**
	 * @since 2.0.0
	 * @access public
	 *
	 * @param $capability
	 *
	 * @return bool
	 */
	public function user_can( $capability ) {
		$options = $this->get_user_restrictions_array();

		if ( in_array( $capability, $options, true ) ) {
			return false;
		}

		return true;
	}

	/**
	 * @since 2.0.0
	 * @access public
	 */
	public function __construct() {
		parent::__construct();

		add_action_elementor_adapter( 'admin_menu', [ $this, 'register_admin_menu' ], 100 );
		add_action_elementor_adapter( 'elementor/role/restrictions/controls', [ $this, 'get_go_pro_link_html' ] );
	}
}
