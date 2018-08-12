<?php
namespace Elementor;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Elementor background control.
 *
 * A base control for creating background control. Displays input fields to define
 * the background color, background image, background gradient or background video.
 *
 * @since 1.2.2
 */
class Group_Control_Background extends Group_Control_Base {

	/**
	 * Fields.
	 *
	 * Holds all the background control fields.
	 *
	 * @since 1.2.2
	 * @access protected
	 * @static
	 *
	 * @var array Background control fields.
	 */
	protected static $fields;

	/**
	 * Background Types.
	 *
	 * Holds all the available background types.
	 *
	 * @since 1.2.2
	 * @access private
	 * @static
	 *
	 * @var array
	 */
	private static $background_types;

	/**
	 * Get background control type.
	 *
	 * Retrieve the control type, in this case `background`.
	 *
	 * @since 1.0.0
	 * @access public
	 * @static
	 *
	 * @return string Control type.
	 */
	public static function get_type() {
		return 'background';
	}

	/**
	 * Get background control types.
	 *
	 * Retrieve available background types.
	 *
	 * @since 1.2.2
	 * @access public
	 * @static
	 *
	 * @return array Available background types.
	 */
	public static function get_background_types() {
		if ( null === self::$background_types ) {
			self::$background_types = self::get_default_background_types();
		}

		return self::$background_types;
	}

	/**
	 * Get Default background types.
	 *
	 * Retrieve background control initial types.
	 *
	 * @since 2.0.0
	 * @access private
	 * @static
	 *
	 * @return array Default background types.
	 */
	private static function get_default_background_types() {
		return [
			'classic' => [
				'title' => _x_elementor_adapter( 'Classic', 'Background Control', 'elementor' ),
				'icon' => 'fa fa-paint-brush',
			],
			'gradient' => [
				'title' => _x_elementor_adapter( 'Gradient', 'Background Control', 'elementor' ),
				'icon' => 'fa fa-barcode',
			],
			'video' => [
				'title' => _x_elementor_adapter( 'Background Video', 'Background Control', 'elementor' ),
				'icon' => 'fa fa-video-camera',
			],
		];
	}

	/**
	 * Init fields.
	 *
	 * Initialize background control fields.
	 *
	 * @since 1.2.2
	 * @access public
	 *
	 * @return array Control fields.
	 */
	public function init_fields() {
		$fields = [];

		$fields['background'] = [
			'label' => _x_elementor_adapter( 'Background Type', 'Background Control', 'elementor' ),
			'type' => Controls_Manager::CHOOSE,
			'label_block' => false,
			'render_type' => 'ui',
		];

		$fields['color'] = [
			'label' => _x_elementor_adapter( 'Color', 'Background Control', 'elementor' ),
			'type' => Controls_Manager::COLOR,
			'default' => '',
			'title' => _x_elementor_adapter( 'Background Color', 'Background Control', 'elementor' ),
			'selectors' => [
				'{{SELECTOR}}' => 'background-color: {{VALUE}};',
			],
			'condition' => [
				'background' => [ 'classic', 'gradient' ],
			],
		];

		$fields['color_stop'] = [
			'label' => _x_elementor_adapter( 'Location', 'Background Control', 'elementor' ),
			'type' => Controls_Manager::SLIDER,
			'size_units' => [ '%' ],
			'default' => [
				'unit' => '%',
				'size' => 0,
			],
			'render_type' => 'ui',
			'condition' => [
				'background' => [ 'gradient' ],
			],
			'of_type' => 'gradient',
		];

		$fields['color_b'] = [
			'label' => _x_elementor_adapter( 'Second Color', 'Background Control', 'elementor' ),
			'type' => Controls_Manager::COLOR,
			'default' => '#f2295b',
			'render_type' => 'ui',
			'condition' => [
				'background' => [ 'gradient' ],
			],
			'of_type' => 'gradient',
		];

		$fields['color_b_stop'] = [
			'label' => _x_elementor_adapter( 'Location', 'Background Control', 'elementor' ),
			'type' => Controls_Manager::SLIDER,
			'size_units' => [ '%' ],
			'default' => [
				'unit' => '%',
				'size' => 100,
			],
			'render_type' => 'ui',
			'condition' => [
				'background' => [ 'gradient' ],
			],
			'of_type' => 'gradient',
		];

		$fields['gradient_type'] = [
			'label' => _x_elementor_adapter( 'Type', 'Background Control', 'elementor' ),
			'type' => Controls_Manager::SELECT,
			'options' => [
				'linear' => _x_elementor_adapter( 'Linear', 'Background Control', 'elementor' ),
				'radial' => _x_elementor_adapter( 'Radial', 'Background Control', 'elementor' ),
			],
			'default' => 'linear',
			'render_type' => 'ui',
			'condition' => [
				'background' => [ 'gradient' ],
			],
			'of_type' => 'gradient',
		];

		$fields['gradient_angle'] = [
			'label' => _x_elementor_adapter( 'Angle', 'Background Control', 'elementor' ),
			'type' => Controls_Manager::SLIDER,
			'size_units' => [ 'deg' ],
			'default' => [
				'unit' => 'deg',
				'size' => 180,
			],
			'range' => [
				'deg' => [
					'step' => 10,
				],
			],
			'selectors' => [
				'{{SELECTOR}}' => 'background-color: transparent; background-image: linear-gradient({{SIZE}}{{UNIT}}, {{color.VALUE}} {{color_stop.SIZE}}{{color_stop.UNIT}}, {{color_b.VALUE}} {{color_b_stop.SIZE}}{{color_b_stop.UNIT}})',
			],
			'condition' => [
				'background' => [ 'gradient' ],
				'gradient_type' => 'linear',
			],
			'of_type' => 'gradient',
		];

		$fields['gradient_position'] = [
			'label' => _x_elementor_adapter( 'Position', 'Background Control', 'elementor' ),
			'type' => Controls_Manager::SELECT,
			'options' => [
				'center center' => _x_elementor_adapter( 'Center Center', 'Background Control', 'elementor' ),
				'center left' => _x_elementor_adapter( 'Center Left', 'Background Control', 'elementor' ),
				'center right' => _x_elementor_adapter( 'Center Right', 'Background Control', 'elementor' ),
				'top center' => _x_elementor_adapter( 'Top Center', 'Background Control', 'elementor' ),
				'top left' => _x_elementor_adapter( 'Top Left', 'Background Control', 'elementor' ),
				'top right' => _x_elementor_adapter( 'Top Right', 'Background Control', 'elementor' ),
				'bottom center' => _x_elementor_adapter( 'Bottom Center', 'Background Control', 'elementor' ),
				'bottom left' => _x_elementor_adapter( 'Bottom Left', 'Background Control', 'elementor' ),
				'bottom right' => _x_elementor_adapter( 'Bottom Right', 'Background Control', 'elementor' ),
			],
			'default' => 'center center',
			'selectors' => [
				'{{SELECTOR}}' => 'background-color: transparent; background-image: radial-gradient(at {{VALUE}}, {{color.VALUE}} {{color_stop.SIZE}}{{color_stop.UNIT}}, {{color_b.VALUE}} {{color_b_stop.SIZE}}{{color_b_stop.UNIT}})',
			],
			'condition' => [
				'background' => [ 'gradient' ],
				'gradient_type' => 'radial',
			],
			'of_type' => 'gradient',
		];

		$fields['image'] = [
			'label' => _x_elementor_adapter( 'Image', 'Background Control', 'elementor' ),
			'type' => Controls_Manager::MEDIA,
			'dynamic' => [
				'active' => true,
			],
			'title' => _x_elementor_adapter( 'Background Image', 'Background Control', 'elementor' ),
			'selectors' => [
				'{{SELECTOR}}' => 'background-image: url("{{URL}}");',
			],
			'condition' => [
				'background' => [ 'classic' ],
			],
		];

		$fields['position'] = [
			'label' => _x_elementor_adapter( 'Position', 'Background Control', 'elementor' ),
			'type' => Controls_Manager::SELECT,
			'default' => '',
			'options' => [
				'' => _x_elementor_adapter( 'Default', 'Background Control', 'elementor' ),
				'top left' => _x_elementor_adapter( 'Top Left', 'Background Control', 'elementor' ),
				'top center' => _x_elementor_adapter( 'Top Center', 'Background Control', 'elementor' ),
				'top right' => _x_elementor_adapter( 'Top Right', 'Background Control', 'elementor' ),
				'center left' => _x_elementor_adapter( 'Center Left', 'Background Control', 'elementor' ),
				'center center' => _x_elementor_adapter( 'Center Center', 'Background Control', 'elementor' ),
				'center right' => _x_elementor_adapter( 'Center Right', 'Background Control', 'elementor' ),
				'bottom left' => _x_elementor_adapter( 'Bottom Left', 'Background Control', 'elementor' ),
				'bottom center' => _x_elementor_adapter( 'Bottom Center', 'Background Control', 'elementor' ),
				'bottom right' => _x_elementor_adapter( 'Bottom Right', 'Background Control', 'elementor' ),
			],
			'selectors' => [
				'{{SELECTOR}}' => 'background-position: {{VALUE}};',
			],
			'condition' => [
				'background' => [ 'classic' ],
				'image[url]!' => '',
			],
		];

		$fields['attachment'] = [
			'label' => _x_elementor_adapter( 'Attachment', 'Background Control', 'elementor' ),
			'type' => Controls_Manager::SELECT,
			'default' => '',
			'options' => [
				'' => _x_elementor_adapter( 'Default', 'Background Control', 'elementor' ),
				'scroll' => _x_elementor_adapter( 'Scroll', 'Background Control', 'elementor' ),
				'fixed' => _x_elementor_adapter( 'Fixed', 'Background Control', 'elementor' ),
			],
			'selectors' => [
				'(desktop+){{SELECTOR}}' => 'background-attachment: {{VALUE}};',
			],
			'condition' => [
				'background' => [ 'classic' ],
				'image[url]!' => '',
			],
		];

		$fields['attachment_alert'] = [
			'type' => Controls_Manager::RAW_HTML,
			'content_classes' => 'elementor-control-field-description',
			'raw' => ___elementor_adapter( 'Note: Attachment Fixed works only on desktop.', 'elementor' ),
			'separator' => 'none',
			'condition' => [
				'background' => [ 'classic' ],
				'image[url]!' => '',
				'attachment' => 'fixed',
			],
		];

		$fields['repeat'] = [
			'label' => _x_elementor_adapter( 'Repeat', 'Background Control', 'elementor' ),
			'type' => Controls_Manager::SELECT,
			'default' => '',
			'options' => [
				'' => _x_elementor_adapter( 'Default', 'Background Control', 'elementor' ),
				'no-repeat' => _x_elementor_adapter( 'No-repeat', 'Background Control', 'elementor' ),
				'repeat' => _x_elementor_adapter( 'Repeat', 'Background Control', 'elementor' ),
				'repeat-x' => _x_elementor_adapter( 'Repeat-x', 'Background Control', 'elementor' ),
				'repeat-y' => _x_elementor_adapter( 'Repeat-y', 'Background Control', 'elementor' ),
			],
			'selectors' => [
				'{{SELECTOR}}' => 'background-repeat: {{VALUE}};',
			],
			'condition' => [
				'background' => [ 'classic' ],
				'image[url]!' => '',
			],
		];

		$fields['size'] = [
			'label' => _x_elementor_adapter( 'Size', 'Background Control', 'elementor' ),
			'type' => Controls_Manager::SELECT,
			'default' => '',
			'options' => [
				'' => _x_elementor_adapter( 'Default', 'Background Control', 'elementor' ),
				'auto' => _x_elementor_adapter( 'Auto', 'Background Control', 'elementor' ),
				'cover' => _x_elementor_adapter( 'Cover', 'Background Control', 'elementor' ),
				'contain' => _x_elementor_adapter( 'Contain', 'Background Control', 'elementor' ),
			],
			'selectors' => [
				'{{SELECTOR}}' => 'background-size: {{VALUE}};',
			],
			'condition' => [
				'background' => [ 'classic' ],
				'image[url]!' => '',
			],
		];

		$fields['video_link'] = [
			'label' => _x_elementor_adapter( 'Video Link', 'Background Control', 'elementor' ),
			'type' => Controls_Manager::TEXT,
			'placeholder' => 'https://www.youtube.com/watch?v=9uOETcuFjbE',
			'description' => ___elementor_adapter( 'YouTube link or video file (mp4 is recommended).', 'elementor' ),
			'label_block' => true,
			'default' => '',
			'condition' => [
				'background' => [ 'video' ],
			],
			'of_type' => 'video',
		];

		$fields['video_start'] = [
			'label' => ___elementor_adapter( 'Start Time', 'elementor' ),
			'type' => Controls_Manager::NUMBER,
			'description' => ___elementor_adapter( 'Specify a start time (in seconds)', 'elementor' ),
			'placeholder' => 10,
			'condition' => [
				'background' => [ 'video' ],
			],
			'of_type' => 'video',
		];

		$fields['video_end'] = [
			'label' => ___elementor_adapter( 'End Time', 'elementor' ),
			'type' => Controls_Manager::NUMBER,
			'description' => ___elementor_adapter( 'Specify an end time (in seconds)', 'elementor' ),
			'placeholder' => 70,
			'condition' => [
				'background' => [ 'video' ],
			],
			'of_type' => 'video',
		];

		$fields['video_fallback'] = [
			'label' => _x_elementor_adapter( 'Background Fallback', 'Background Control', 'elementor' ),
			'description' => ___elementor_adapter( 'This cover image will replace the background video on mobile and tablet devices.', 'elementor' ),
			'type' => Controls_Manager::MEDIA,
			'label_block' => true,
			'condition' => [
				'background' => [ 'video' ],
			],
			'selectors' => [
				'{{SELECTOR}}' => 'background: url("{{URL}}") 50% 50%; background-size: cover;',
			],
			'of_type' => 'video',
		];

		return $fields;
	}

	/**
	 * Get child default args.
	 *
	 * Retrieve the default arguments for all the child controls for a specific group
	 * control.
	 *
	 * @since 1.2.2
	 * @access protected
	 *
	 * @return array Default arguments for all the child controls.
	 */
	protected function get_child_default_args() {
		return [
			'types' => [ 'classic', 'gradient' ],
		];
	}

	/**
	 * Filter fields.
	 *
	 * Filter which controls to display, using `include`, `exclude`, `condition`
	 * and `of_type` arguments.
	 *
	 * @since 1.2.2
	 * @access protected
	 *
	 * @return array Control fields.
	 */
	protected function filter_fields() {
		$fields = parent::filter_fields();

		$args = $this->get_args();

		foreach ( $fields as &$field ) {
			if ( isset( $field['of_type'] ) && ! in_array( $field['of_type'], $args['types'] ) ) {
				unset( $field );
			}
		}

		return $fields;
	}

	/**
	 * Prepare fields.
	 *
	 * Process background control fields before adding them to `add_control()`.
	 *
	 * @since 1.2.2
	 * @access protected
	 *
	 * @param array $fields Background control fields.
	 *
	 * @return array Processed fields.
	 */
	protected function prepare_fields( $fields ) {
		$args = $this->get_args();

		$background_types = self::get_background_types();

		$choose_types = [];

		foreach ( $args['types'] as $type ) {
			if ( isset( $background_types[ $type ] ) ) {
				$choose_types[ $type ] = $background_types[ $type ];
			}
		}

		$fields['background']['options'] = $choose_types;

		return parent::prepare_fields( $fields );
	}

	/**
	 * Get default options.
	 *
	 * Retrieve the default options of the background control. Used to return the
	 * default options while initializing the background control.
	 *
	 * @since 1.9.0
	 * @access protected
	 *
	 * @return array Default background control options.
	 */
	protected function get_default_options() {
		return [
			'popover' => false,
		];
	}
}
