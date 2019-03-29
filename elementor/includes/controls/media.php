<?php
namespace Elementor;

use Elementor\Modules\DynamicTags\Module as TagsModule;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Elementor media control.
 *
 * A base control for creating a media chooser control. Based on the WordPress
 * media library. Used to select an image from the WordPress media library.
 *
 * @since 1.0.0
 */
class Control_Media extends Control_Base_Multiple {

	/**
	 * Get media control type.
	 *
	 * Retrieve the control type, in this case `media`.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return string Control type.
	 */
	public function get_type() {
		return 'media';
	}

	/**
	 * Get media control default values.
	 *
	 * Retrieve the default value of the media control. Used to return the default
	 * values while initializing the media control.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return array Control default value.
	 */
	public function get_default_value() {
		return [
			'url' => '',
			'id' => '',
		];
	}

	/**
	 * Import media images.
	 *
	 * Used to import media control files from external sites while importing
	 * Elementor template JSON file, and replacing the old data.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @param array $settings Control settings
	 *
	 * @return array Control settings.
	 */
	public function on_import( $settings ) {
		if ( empty( $settings['url'] ) ) {
			return $settings;
		}

		$settings = Plugin::$instance->templates_manager->get_import_images_instance()->import( $settings );

		if ( ! $settings ) {
			$settings = [
				'id' => '',
				'url' => Utils::get_placeholder_image_src(),
			];
		}

		return $settings;
	}

	/**
	 * Enqueue media control scripts and styles.
	 *
	 * Used to register and enqueue custom scripts and styles used by the media
	 * control.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function enqueue() {
		global $wp_version;

		$suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';
		wp_enqueue_media_elementor_adapter();

		wp_enqueue_style_elementor_adapter(
			'media',
			admin_url_elementor_adapter( '/css/media' . $suffix . '.css' ),
			[],
			$wp_version
		);

		wp_register_script_elementor_adapter(
			'image-edit',
			'/wp-admin/js/image-edit' . $suffix . '.js',
			[
				'jquery',
				'json2',
				'imgareaselect',
			],
			$wp_version,
			true
		);

		wp_enqueue_script_elementor_adapter( 'image-edit' );
	}

	/**
	 * Render media control output in the editor.
	 *
	 * Used to generate the control HTML in the editor using Underscore JS
	 * template. The variables for the class are available using `data` JS
	 * object.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function content_template() {
		?>
		<div class="elementor-control-field">
			<label class="elementor-control-title">{{{ data.label }}}</label>
			<div class="elementor-control-input-wrapper">
				<div class="elementor-control-media elementor-control-tag-area elementor-control-preview-area elementor-aspect-ratio-169">
					<div class="elementor-control-media-upload-button">
						<i class="fa fa-plus-circle" aria-hidden="true"></i>
					</div>
					<div class="elementor-control-media-area{{{ 'video' === data.media_type ? ' elementor-fit-aspect-ratio' : '' }}}">
						<# if( 'image' === data.media_type ) { #>
							<div class="elementor-control-media-image"></div>
						<# } else if( 'video' === data.media_type ) { #>
							<video class="elementor-control-media-video" preload="metadata"></video>
							<i class="fa fa-video-camera"></i>
						<# } #>
						<div class="elementor-control-media-delete"><?php echo ___elementor_adapter( 'Delete', 'elementor' ); ?></div>
					</div>
				</div>
			</div>
			<# if ( data.description ) { #>
				<div class="elementor-control-field-description">{{{ data.description }}}</div>
			<# } #>
			<input type="hidden" data-setting="{{ data.name }}" />
		</div>
		<?php
	}

	/**
	 * Get media control default settings.
	 *
	 * Retrieve the default settings of the media control. Used to return the default
	 * settings while initializing the media control.
	 *
	 * @since 1.0.0
	 * @access protected
	 *
	 * @return array Control default settings.
	 */
	protected function get_default_settings() {
		return [
			'label_block' => true,
			'media_type' => 'image',
			'dynamic' => [
				'categories' => [ TagsModule::IMAGE_CATEGORY ],
				'returnType' => 'object',
			],
		];
	}

	/**
	 * Get media control image title.
	 *
	 * Retrieve the `title` of the image selected by the media control.
	 *
	 * @since 1.0.0
	 * @access public
	 * @static
	 *
	 * @param array $attachment Media attachment.
	 *
	 * @return string Image title.
	 */
	public static function get_image_title( $attachment ) {
		if ( empty( $attachment['id'] ) ) {
			return '';
		}

		return get_the_title_elementor_adapter( $attachment['id'] );
	}

	/**
	 * Get media control image alt.
	 *
	 * Retrieve the `alt` value of the image selected by the media control.
	 *
	 * @since 1.0.0
	 * @access public
	 * @static
	 *
	 * @param array $instance Media attachment.
	 *
	 * @return string Image alt.
	 */
	public static function get_image_alt( $instance ) {
		if ( empty( $instance['id'] ) ) {
			return '';
		}

		$attachment_id = $instance['id'];
		if ( ! $attachment_id ) {
			return '';
		}

		$attachment = get_post_elementor_adapter( $attachment_id );
		if ( ! $attachment ) {
			return '';
		}

		$alt = get_post_meta_elementor_adapter( $attachment_id, '_wp_attachment_image_alt', true );
		if ( ! $alt ) {
			$alt = $attachment->post_excerpt;
			if ( ! $alt ) {
				$alt = $attachment->post_title;
			}
		}
		return trim( strip_tags( $alt ) );
	}
}
