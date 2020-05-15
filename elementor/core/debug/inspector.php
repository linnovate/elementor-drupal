<?php
namespace Elementor\Core\Debug;

use Elementor\Settings;
use Elementor\Tools;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

class Inspector {

	protected $is_enabled = false;

	protected $log = [];

	public function __construct() {
		$is_debug = ( defined( 'WP_DEBUG' ) && WP_DEBUG );
		$option = get_option_elementor_adapter( 'elementor_enable_inspector', null );

		$this->is_enabled = is_null( $option ) ? $is_debug : 'enable' === $option;

		if ( $this->is_enabled ) {
			add_action_elementor_adapter( 'admin_bar_menu', [ $this, 'add_menu_in_admin_bar' ], 201 );
		}

		add_action_elementor_adapter( 'elementor/admin/after_create_settings/' . Tools::PAGE_ID, [ $this, 'register_admin_tools_fields' ], 50 );
	}

	public function is_enabled() {
		return $this->is_enabled;
	}

	public function register_admin_tools_fields( Tools $tools ) {
		$tools->add_fields( Settings::TAB_GENERAL, 'tools', [
			'enable_inspector' => [
				'label' => ___elementor_adapter( 'Debug Bar', 'elementor' ),
				'field_args' => [
					'type' => 'select',
					'std' => $this->is_enabled ? 'enable' : '',
					'options' => [
						'' => ___elementor_adapter( 'Disable', 'elementor' ),
						'enable' => ___elementor_adapter( 'Enable', 'elementor' ),
					],
					'desc' => ___elementor_adapter( 'Debug Bar adds an admin bar menu that lists all the templates that are used on a page that is being displayed.', 'elementor' ),
				],
			],
		] );
	}

	public function parse_template_path( $template ) {
		// `untrailingslashit` for windows path style.
		if ( 0 === strpos( $template, untrailingslashit( ELEMENTOR_PATH ) ) ) {
			return 'Elementor - ' . basename( $template );
		}

		if ( 0 === strpos( $template, get_stylesheet_directory() ) ) {
			return wp_get_theme_elementor_adapter()->get( 'Name' ) . ' - ' . basename( $template );
		}

		$plugins_dir = dirname( ELEMENTOR_PATH );
		if ( 0 === strpos( $template, $plugins_dir ) ) {
			return ltrim( str_replace( $plugins_dir, '', $template ), '/\\' );
		}

		return str_replace( WP_CONTENT_DIR, '', $template );
	}

	public function add_log( $module, $title, $url = '' ) {
		if ( ! $this->is_enabled ) {
			return;
		}

		if ( ! isset( $this->log[ $module ] ) ) {
			$this->log[ $module ] = [];
		}

		$this->log[ $module ][] = [
			'title' => $title,
			'url' => $url,
		];
	}

	public function add_menu_in_admin_bar( \WP_Admin_Bar $wp_admin_bar ) {
		if ( empty( $this->log ) ) {
			return;
		}

		$wp_admin_bar->add_node( [
			'id' => 'elementor_inspector',
			'title' => ___elementor_adapter( 'Elementor Debugger', 'elementor' ),
		] );

		foreach ( $this->log as $module => $log ) {
			$module_id = sanitize_key_elementor_adapter( $module );

			$wp_admin_bar->add_menu( [
				'id' => 'elementor_inspector_' . $module_id,
				'parent' => 'elementor_inspector',
				'title' => $module,
			] );

			foreach ( $log as $index => $row ) {
				$url = $row['url'];

				unset( $row['url'] );

				$wp_admin_bar->add_menu( [
					'id' => 'elementor_inspector_log_' . $module_id . '_' . $index,
					'parent' => 'elementor_inspector_' . $module_id,
					'href' => $url,
					'title' => implode( ' > ', $row ),
					'meta' => [
						'target' => '_blank',
					],
				] );
			}
		}
	}
}
