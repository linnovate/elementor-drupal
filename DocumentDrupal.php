<?php
/**
 * @file
 * Contains \Drupal\elementor\DocumentDrupal.
 */

namespace Drupal\elementor;

use Elementor\Controls_Manager;
use Elementor\Core\Base\Document;
use Elementor\Group_Control_Background;
use Elementor\Plugin;
use Elementor\Settings;
use Elementor\Core\Settings\Manager as SettingsManager;
use Elementor\Utils;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

class DocumentDrupal extends Document {

	/**
	 * @since 2.0.0
	 * @access public
	 */
	public function get_name() {
		return 'DocumentDrupal';
	}

	/**
	 * @since 2.0.0
	 * @access public
	 * @static
	 */
	public static function get_title() {
		return __( 'Page', 'elementor' );
	}

	public function get_exit_to_dashboard_url() {
		return 'node/1?eee';
    }

	public function is_editable_by_current_user() {
		return TRUE;
	}
	
	public function save($data){

	}
	
	public function get_post() {
		$post->ID = 36;
		return $post;
	}

	public function  get_last_edited() {

	}

	public function get_wp_preview_url()
	{}
	/**
	 * @since 2.0.0
	 * @access public
	 *
	 * @param array $data
	 */
	public function __construct( array $data = [] ) {
		$data['post_id'] = 1;
		if ( $data ) {
			$template = get_post_meta( $data['post_id'], '_wp_page_template', true );
			if ( empty( $template ) ) {
				$template = 'default';
			}
			$data['settings']['template'] = $template;
		}

		parent::__construct( $data );
	}
}
