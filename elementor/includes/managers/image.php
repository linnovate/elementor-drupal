<?php
namespace Elementor;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Elementor images manager.
 *
 * Elementor images manager handler class is responsible for retrieving image
 * details.
 *
 * @since 1.0.0
 */
class Images_Manager {

	/**
	 * Get images details.
	 *
	 * Retrieve details for all the images.
	 *
	 * Fired by `wp_ajax_elementor_get_images_details` action.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function get_images_details() {
		$items = $_POST['items'];
		$urls  = [];

		foreach ( $items as $item ) {
			$urls[ $item['id'] ] = $this->get_details( $item['id'], $item['size'], $item['is_first_time'] );
		}

		wp_send_json_success_elementor_adapter( $urls );
	}

	/**
	 * Get image details.
	 *
	 * Retrieve single image details.
	 *
	 * Fired by `wp_ajax_elementor_get_image_details` action.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @param string       $id            Image attachment ID.
	 * @param string|array $size          Image size. Accepts any valid image
	 *                                    size, or an array of width and height
	 *                                    values in pixels (in that order).
	 * @param string       $is_first_time Set 'true' string to force reloading
	 *                                    all image sizes.
	 *
	 * @return array URLs with different image sizes.
	 */
	public function get_details( $id, $size, $is_first_time ) {
		if ( ! class_exists( 'Group_Control_Image_Size' ) ) {
			require_once ELEMENTOR_PATH . '/includes/controls/groups/image-size.php';
		}

		if ( 'true' === $is_first_time ) {
			$sizes = get_intermediate_image_sizes_elementor_adapter();
			$sizes[] = 'full';
		} else {
			$sizes = [];
		}

		$sizes[] = $size;
		$urls = [];
		foreach ( $sizes as $size ) {
			if ( 0 === strpos( $size, 'custom_' ) ) {
				preg_match( '/custom_(\d*)x(\d*)/', $size, $matches );

				$instance = [
					'image_size' => 'custom',
					'image_custom_dimension' => [
						'width' => $matches[1],
						'height' => $matches[2],
					],
				];

				$urls[ $size ] = Group_Control_Image_Size::get_attachment_image_src( $id, 'image', $instance );
			} else {
			  $adapter = wp_get_attachment_image_src_elementor_adapter( $id, $size );
				$urls[ $size ] = array_key_exists(0, $adapter) ? $adapter[0] : NULL;
			}
		}

		return $urls;
	}

	/**
	 * Images manager constructor.
	 *
	 * Initializing Elementor images manager.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function __construct() {
		add_action_elementor_adapter( 'wp_ajax_elementor_get_images_details', [ $this, 'get_images_details' ] );
	}
}
