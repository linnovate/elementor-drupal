<?php
namespace Drupal\elementor;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Elementor template library import images.
 *
 * Elementor template library import images handler class is responsible for
 * importing remote images used by the template library.
 *
 * @since 1.0.0
 */
class Import_Images {

	/**
	 * Replaced images IDs.
	 *
	 * The IDs of all the new imported images. An array containing the old
	 * attachment ID and the new attachment ID generated after the import.
	 *
	 * @since 1.0.0
	 * @access private
	 *
	 * @var array
	 */
	private $_replace_image_ids = [];

	/**
	 * Get image hash.
	 *
	 * Retrieve the sha1 hash of the image URL.
	 *
	 * @since 2.0.0
	 * @access private
	 *
	 * @param string $attachment_url The attachment URL.
	 *
	 * @return string Image hash.
	 */
	private function get_hash_image( $attachment_url ) {
		return sha1( $attachment_url );
	}

	/**
	 * Get saved image.
	 *
	 * Retrieve new image ID, if the image has a new ID after the import.
	 *
	 * @since 2.0.0
	 * @access private
	 *
	 * @param array $attachment The attachment.
	 *
	 * @return false|array New image ID  or false.
	 */
	private function get_saved_image( $attachment ) {
		if ( isset( $this->_replace_image_ids[ $attachment['id'] ] ) ) {
			return $this->_replace_image_ids[ $attachment['id'] ];
		}

		$new_attachment = \Drupal\Elementor\ElementorPlugin::$instance->sdk->upload_file(
			$attachment['url'] ,
			$this->get_hash_image( $attachment['url'])
		);

		if ( $new_attachment  ) {
			$this->_replace_image_ids[ $attachment['id'] ] = $new_attachment;
			return $new_attachment;
		}

		return false;
	}

	/**
	 * Import image.
	 *
	 * Import a single image from a remote server, upload the image WordPress
	 * uploads folder, create a new attachment in the database and updates the
	 * attachment metadata.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @param array $attachment The attachment.
	 *
	 * @return false|array Imported image data, or false.
	 */
	public function import( $attachment ) {
		$saved_image = $this->get_saved_image( $attachment );

		if ( $saved_image ) {
			return $saved_image;
		}
	}

	/**
	 * Template library import images constructor.
	 *
	 * Initializing the images import class used by the template library through
	 * the WordPress Filesystem API.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function __construct() {
		// if ( ! function_exists( 'WP_Filesystem' ) ) {
		// 	require_once ABSPATH . 'wp-admin/includes/file.php';
		// }

	//	WP_Filesystem();
	}
}
