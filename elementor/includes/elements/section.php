<?php
namespace Elementor;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Elementor section element.
 *
 * Elementor section handler class is responsible for initializing the section
 * element.
 *
 * @since 1.0.0
 */
class Element_Section extends Element_Base {

	/**
	 * Section edit tools.
	 *
	 * Holds the section edit tools.
	 *
	 * @since 1.0.0
	 * @access protected
	 * @static
	 *
	 * @var array Section edit tools.
	 */
	protected static $_edit_tools;

	/**
	 * Section predefined columns presets.
	 *
	 * Holds the predefined columns width for each columns count available by
	 * default by Elementor. Default is an empty array.
	 *
	 * Note that when the user creates a section he can define custom sizes for
	 * the columns. But Elementor sets default values for predefined columns.
	 *
	 * For example two columns 50% width each one, or three columns 33.33% each
	 * one. This property hold the data for those preset values.
	 *
	 * @since 1.0.0
	 * @access private
	 * @static
	 *
	 * @var array Section presets.
	 */
	private static $presets = [];

	/**
	 * Get element type.
	 *
	 * Retrieve the element type, in this case `section`.
	 *
	 * @since 2.1.0
	 * @access public
	 * @static
	 *
	 * @return string The type.
	 */
	public static function get_type() {
		return 'section';
	}

	/**
	 * Get section name.
	 *
	 * Retrieve the section name.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return string Section name.
	 */
	public function get_name() {
		return 'section';
	}

	/**
	 * Get section title.
	 *
	 * Retrieve the section title.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return string Section title.
	 */
	public function get_title() {
		return ___elementor_adapter( 'Section', 'elementor' );
	}

	/**
	 * Get section icon.
	 *
	 * Retrieve the section icon.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return string Section icon.
	 */
	public function get_icon() {
		return 'eicon-columns';
	}

	/**
	 * Get presets.
	 *
	 * Retrieve a specific preset columns for a given columns count, or a list
	 * of all the preset if no parameters passed.
	 *
	 * @since 1.0.0
	 * @access public
	 * @static
	 *
	 * @param int $columns_count Optional. Columns count. Default is null.
	 * @param int $preset_index  Optional. Preset index. Default is null.
	 *
	 * @return array Section presets.
	 */
	public static function get_presets( $columns_count = null, $preset_index = null ) {
		if ( ! self::$presets ) {
			self::init_presets();
		}

		$presets = self::$presets;

		if ( null !== $columns_count ) {
			$presets = $presets[ $columns_count ];
		}

		if ( null !== $preset_index ) {
			$presets = $presets[ $preset_index ];
		}

		return $presets;
	}

	/**
	 * Initialize presets.
	 *
	 * Initializing the section presets and set the number of columns the
	 * section can have by default. For example a column can have two columns
	 * 50% width each one, or three columns 33.33% each one.
	 *
	 * Note that Elementor sections have default section presets but the user
	 * can set custom number of columns and define custom sizes for each column.

	 * @since 1.0.0
	 * @access public
	 * @static
	 */
	public static function init_presets() {
		$additional_presets = [
			2 => [
				[
					'preset' => [ 33, 66 ],
				],
				[
					'preset' => [ 66, 33 ],
				],
			],
			3 => [
				[
					'preset' => [ 25, 25, 50 ],
				],
				[
					'preset' => [ 50, 25, 25 ],
				],
				[
					'preset' => [ 25, 50, 25 ],
				],
				[
					'preset' => [ 16, 66, 16 ],
				],
			],
		];

		foreach ( range( 1, 10 ) as $columns_count ) {
			self::$presets[ $columns_count ] = [
				[
					'preset' => [],
				],
			];

			$preset_unit = floor( 1 / $columns_count * 100 );

			for ( $i = 0; $i < $columns_count; $i++ ) {
				self::$presets[ $columns_count ][0]['preset'][] = $preset_unit;
			}

			if ( ! empty( $additional_presets[ $columns_count ] ) ) {
				self::$presets[ $columns_count ] = array_merge( self::$presets[ $columns_count ], $additional_presets[ $columns_count ] );
			}

			foreach ( self::$presets[ $columns_count ] as $preset_index => & $preset ) {
				$preset['key'] = $columns_count . $preset_index;
			}
		}
	}

	/**
	 * Get default edit tools.
	 *
	 * Retrieve the section default edit tools. Used to set initial tools.
	 *
	 * @since 1.0.0
	 * @access protected
	 * @static
	 *
	 * @return array Default section edit tools.
	 */
	protected static function get_default_edit_tools() {
		$section_label = ___elementor_adapter( 'Section', 'elementor' );

		$edit_tools = [
			'add' => [
				/* translators: %s: Section label */
				'title' => sprintf( ___elementor_adapter( 'Add %s', 'elementor' ), $section_label ),
				'icon' => 'plus',
			],
			'edit' => [
				/* translators: %s: Section label */
				'title' => sprintf( ___elementor_adapter( 'Edit %s', 'elementor' ), $section_label ),
				'icon' => 'handle',
			],
		];

		if ( self::is_edit_buttons_enabled() ) {
			$edit_tools += [
				'duplicate' => [
					/* translators: %s: Section label */
					'title' => sprintf( ___elementor_adapter( 'Duplicate %s', 'elementor' ), $section_label ),
					'icon' => 'clone',
				],
			];
		}

		$edit_tools += [
			'remove' => [
				/* translators: %s: Section label */
				'title' => sprintf( ___elementor_adapter( 'Delete %s', 'elementor' ), $section_label ),
				'icon' => 'close',
			],
		];

		return $edit_tools;
	}

	/**
	 * Get initial config.
	 *
	 * Retrieve the current section initial configuration.
	 *
	 * Adds more configuration on top of the controls list, the tabs assigned to
	 * the control, element name, type, icon and more. This method also adds
	 * section presets.
	 *
	 * @since 1.0.10
	 * @access protected
	 *
	 * @return array The initial config.
	 */
	protected function _get_initial_config() {
		$config = parent::_get_initial_config();

		$config['presets'] = self::get_presets();

		return $config;
	}

	/**
	 * Register section controls.
	 *
	 * Used to add new controls to the section element.
	 *
	 * @since 1.0.0
	 * @access protected
	 */
	protected function _register_controls() {

		$this->start_controls_section(
			'section_layout',
			[
				'label' => ___elementor_adapter( 'Layout', 'elementor' ),
				'tab' => Controls_Manager::TAB_LAYOUT,
			]
		);

		$this->add_control(
			'_title',
			[
				'label' => ___elementor_adapter( 'Title', 'elementor' ),
				'type' => Controls_Manager::HIDDEN,
				'render_type' => 'none',
			]
		);

		$this->add_control(
			'stretch_section',
			[
				'label' => ___elementor_adapter( 'Stretch Section', 'elementor' ),
				'type' => Controls_Manager::SWITCHER,
				'default' => '',
				'return_value' => 'section-stretched',
				'prefix_class' => 'elementor-',
				'hide_in_inner' => true,
				'description' => ___elementor_adapter( 'Stretch the section to the full width of the page using JS.', 'elementor' ) . sprintf( ' <a href="%1$s" target="_blank">%2$s</a>', 'https://go.elementor.com/stretch-section/', ___elementor_adapter( 'Learn more.', 'elementor' ) ),
				'render_type' => 'none',
				'frontend_available' => true,
			]
		);

		$this->add_control(
			'layout',
			[
				'label' => ___elementor_adapter( 'Content Width', 'elementor' ),
				'type' => Controls_Manager::SELECT,
				'default' => 'boxed',
				'options' => [
					'boxed' => ___elementor_adapter( 'Boxed', 'elementor' ),
					'full_width' => ___elementor_adapter( 'Full Width', 'elementor' ),
				],
				'prefix_class' => 'elementor-section-',
			]
		);

		$this->add_control(
			'content_width',
			[
				'label' => ___elementor_adapter( 'Content Width', 'elementor' ),
				'type' => Controls_Manager::SLIDER,
				'range' => [
					'px' => [
						'min' => 500,
						'max' => 1600,
					],
				],
				'selectors' => [
					'{{WRAPPER}} > .elementor-container' => 'max-width: {{SIZE}}{{UNIT}};',
				],
				'condition' => [
					'layout' => [ 'boxed' ],
				],
				'show_label' => false,
				'separator' => 'none',
			]
		);

		$this->add_control(
			'gap',
			[
				'label' => ___elementor_adapter( 'Columns Gap', 'elementor' ),
				'type' => Controls_Manager::SELECT,
				'default' => 'default',
				'options' => [
					'default' => ___elementor_adapter( 'Default', 'elementor' ),
					'no' => ___elementor_adapter( 'No Gap', 'elementor' ),
					'narrow' => ___elementor_adapter( 'Narrow', 'elementor' ),
					'extended' => ___elementor_adapter( 'Extended', 'elementor' ),
					'wide' => ___elementor_adapter( 'Wide', 'elementor' ),
					'wider' => ___elementor_adapter( 'Wider', 'elementor' ),
				],
			]
		);

		$this->add_control(
			'height',
			[
				'label' => ___elementor_adapter( 'Height', 'elementor' ),
				'type' => Controls_Manager::SELECT,
				'default' => 'default',
				'options' => [
					'default' => ___elementor_adapter( 'Default', 'elementor' ),
					'full' => ___elementor_adapter( 'Fit To Screen', 'elementor' ),
					'min-height' => ___elementor_adapter( 'Min Height', 'elementor' ),
				],
				'prefix_class' => 'elementor-section-height-',
				'hide_in_inner' => true,
			]
		);

		$this->add_responsive_control(
			'custom_height',
			[
				'label' => ___elementor_adapter( 'Minimum Height', 'elementor' ),
				'type' => Controls_Manager::SLIDER,
				'default' => [
					'size' => 400,
				],
				'range' => [
					'px' => [
						'min' => 0,
						'max' => 1440,
					],
					'vh' => [
						'min' => 0,
						'max' => 100,
					],
				],
				'size_units' => [ 'px', 'vh' ],
				'selectors' => [
					'{{WRAPPER}} > .elementor-container' => 'min-height: {{SIZE}}{{UNIT}};',
					'{{WRAPPER}} > .elementor-container:after' => 'content: ""; min-height: inherit;', // Hack for IE11
				],
				'condition' => [
					'height' => [ 'min-height' ],
				],
				'hide_in_inner' => true,
			]
		);

		$this->add_control(
			'height_inner',
			[
				'label' => ___elementor_adapter( 'Height', 'elementor' ),
				'type' => Controls_Manager::SELECT,
				'default' => 'default',
				'options' => [
					'default' => ___elementor_adapter( 'Default', 'elementor' ),
					'min-height' => ___elementor_adapter( 'Min Height', 'elementor' ),
				],
				'prefix_class' => 'elementor-section-height-',
				'hide_in_top' => true,
			]
		);

		$this->add_responsive_control(
			'custom_height_inner',
			[
				'label' => ___elementor_adapter( 'Minimum Height', 'elementor' ),
				'type' => Controls_Manager::SLIDER,
				'default' => [
					'size' => 400,
				],
				'range' => [
					'px' => [
						'min' => 0,
						'max' => 1440,
					],
				],
				'selectors' => [
					'{{WRAPPER}} > .elementor-container' => 'min-height: {{SIZE}}{{UNIT}};',
				],
				'condition' => [
					'height_inner' => [ 'min-height' ],
				],
				'hide_in_top' => true,
			]
		);

		$this->add_control(
			'column_position',
			[
				'label' => ___elementor_adapter( 'Column Position', 'elementor' ),
				'type' => Controls_Manager::SELECT,
				'default' => 'middle',
				'options' => [
					'stretch' => ___elementor_adapter( 'Stretch', 'elementor' ),
					'top' => ___elementor_adapter( 'Top', 'elementor' ),
					'middle' => ___elementor_adapter( 'Middle', 'elementor' ),
					'bottom' => ___elementor_adapter( 'Bottom', 'elementor' ),
				],
				'prefix_class' => 'elementor-section-items-',
				'condition' => [
					'height' => [ 'full', 'min-height' ],
				],
			]
		);

		$this->add_control(
			'content_position',
			[
				'label' => ___elementor_adapter( 'Content Position', 'elementor' ),
				'type' => Controls_Manager::SELECT,
				'default' => '',
				'options' => [
					'' => ___elementor_adapter( 'Default', 'elementor' ),
					'top' => ___elementor_adapter( 'Top', 'elementor' ),
					'middle' => ___elementor_adapter( 'Middle', 'elementor' ),
					'bottom' => ___elementor_adapter( 'Bottom', 'elementor' ),
				],
				'prefix_class' => 'elementor-section-content-',
			]
		);

		$possible_tags = [
			'div',
			'header',
			'footer',
			'main',
			'article',
			'section',
			'aside',
			'nav',
		];

		$options = [
			'' => ___elementor_adapter( 'Default', 'elementor' ),
		] + array_combine( $possible_tags, $possible_tags );

		$this->add_control(
			'html_tag',
			[
				'label' => ___elementor_adapter( 'HTML Tag', 'elementor' ),
				'type' => Controls_Manager::SELECT,
				'options' => $options,
				'separator' => 'before',
			]
		);

		$this->add_control(
			'structure',
			[
				'label' => ___elementor_adapter( 'Structure', 'elementor' ),
				'type' => Controls_Manager::STRUCTURE,
				'default' => '10',
				'render_type' => 'none',
			]
		);

		$this->end_controls_section();

		// Section background
		$this->start_controls_section(
			'section_background',
			[
				'label' => ___elementor_adapter( 'Background', 'elementor' ),
				'tab' => Controls_Manager::TAB_STYLE,
			]
		);

		$this->start_controls_tabs( 'tabs_background' );

		$this->start_controls_tab(
			'tab_background_normal',
			[
				'label' => ___elementor_adapter( 'Normal', 'elementor' ),
			]
		);

		$this->add_group_control(
			Group_Control_Background::get_type(),
			[
				'name' => 'background',
				'types' => [ 'classic', 'gradient', 'video' ],
				'fields_options' => [
					'background' => [
						'frontend_available' => true,
					],
					'video_link' => [
						'frontend_available' => true,
					],
					'video_start' => [
						'frontend_available' => true,
					],
					'video_end' => [
						'frontend_available' => true,
					],
				],
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'tab_background_hover',
			[
				'label' => ___elementor_adapter( 'Hover', 'elementor' ),
			]
		);

		$this->add_group_control(
			Group_Control_Background::get_type(),
			[
				'name' => 'background_hover',
				'selector' => '{{WRAPPER}}:hover',
			]
		);

		$this->add_control(
			'background_hover_transition',
			[
				'label' => ___elementor_adapter( 'Transition Duration', 'elementor' ),
				'type' => Controls_Manager::SLIDER,
				'default' => [
					'size' => 0.3,
				],
				'range' => [
					'px' => [
						'max' => 3,
						'step' => 0.1,
					],
				],
				'render_type' => 'ui',
				'separator' => 'before',
			]
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->end_controls_section();

		// Background Overlay
		$this->start_controls_section(
			'section_background_overlay',
			[
				'label' => ___elementor_adapter( 'Background Overlay', 'elementor' ),
				'tab' => Controls_Manager::TAB_STYLE,
				'condition' => [
					'background_background' => [ 'classic', 'gradient', 'video' ],
				],
			]
		);

		$this->start_controls_tabs( 'tabs_background_overlay' );

		$this->start_controls_tab(
			'tab_background_overlay_normal',
			[
				'label' => ___elementor_adapter( 'Normal', 'elementor' ),
			]
		);

		$this->add_group_control(
			Group_Control_Background::get_type(),
			[
				'name' => 'background_overlay',
				'selector' => '{{WRAPPER}} > .elementor-background-overlay',
			]
		);

		$this->add_control(
			'background_overlay_opacity',
			[
				'label' => ___elementor_adapter( 'Opacity', 'elementor' ),
				'type' => Controls_Manager::SLIDER,
				'default' => [
					'size' => .5,
				],
				'range' => [
					'px' => [
						'max' => 1,
						'step' => 0.01,
					],
				],
				'selectors' => [
					'{{WRAPPER}} > .elementor-background-overlay' => 'opacity: {{SIZE}};',
				],
				'condition' => [
					'background_overlay_background' => [ 'classic', 'gradient' ],
				],
			]
		);

		$this->add_group_control(
			Group_Control_Css_Filter::get_type(),
			[
				'name' => 'css_filters',
				'selector' => '{{WRAPPER}} .elementor-background-overlay',
			]
		);

		$this->add_control(
			'overlay_blend_mode',
			[
				'label' => ___elementor_adapter( 'Blend Mode', 'elementor' ),
				'type' => Controls_Manager::SELECT,
				'options' => [
					'' => ___elementor_adapter( 'Normal', 'elementor' ),
					'multiply' => 'Multiply',
					'screen' => 'Screen',
					'overlay' => 'Overlay',
					'darken' => 'Darken',
					'lighten' => 'Lighten',
					'color-dodge' => 'Color Dodge',
					'saturation' => 'Saturation',
					'color' => 'Color',
					'luminosity' => 'Luminosity',
				],
				'selectors' => [
					'{{WRAPPER}} > .elementor-background-overlay' => 'mix-blend-mode: {{VALUE}}',
				],
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'tab_background_overlay_hover',
			[
				'label' => ___elementor_adapter( 'Hover', 'elementor' ),
			]
		);

		$this->add_group_control(
			Group_Control_Background::get_type(),
			[
				'name' => 'background_overlay_hover',
				'selector' => '{{WRAPPER}}:hover > .elementor-background-overlay',
			]
		);

		$this->add_control(
			'background_overlay_hover_opacity',
			[
				'label' => ___elementor_adapter( 'Opacity', 'elementor' ),
				'type' => Controls_Manager::SLIDER,
				'default' => [
					'size' => .5,
				],
				'range' => [
					'px' => [
						'max' => 1,
						'step' => 0.01,
					],
				],
				'selectors' => [
					'{{WRAPPER}}:hover > .elementor-background-overlay' => 'opacity: {{SIZE}};',
				],
				'condition' => [
					'background_overlay_hover_background' => [ 'classic', 'gradient' ],
				],
			]
		);

		$this->add_group_control(
			Group_Control_Css_Filter::get_type(),
			[
				'name' => 'css_filters_hover',
				'selector' => '{{WRAPPER}}:hover > .elementor-background-overlay',
			]
		);

		$this->add_control(
			'background_overlay_hover_transition',
			[
				'label' => ___elementor_adapter( 'Transition Duration', 'elementor' ),
				'type' => Controls_Manager::SLIDER,
				'default' => [
					'size' => 0.3,
				],
				'range' => [
					'px' => [
						'max' => 3,
						'step' => 0.1,
					],
				],
				'render_type' => 'ui',
				'separator' => 'before',
			]
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->end_controls_section();

		// Section border
		$this->start_controls_section(
			'section_border',
			[
				'label' => ___elementor_adapter( 'Border', 'elementor' ),
				'tab' => Controls_Manager::TAB_STYLE,
			]
		);

		$this->start_controls_tabs( 'tabs_border' );

		$this->start_controls_tab(
			'tab_border_normal',
			[
				'label' => ___elementor_adapter( 'Normal', 'elementor' ),
			]
		);

		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name' => 'border',
			]
		);

		$this->add_control(
			'border_radius',
			[
				'label' => ___elementor_adapter( 'Border Radius', 'elementor' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%' ],
				'selectors' => [
					'{{WRAPPER}}, {{WRAPPER}} > .elementor-background-overlay' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			[
				'name' => 'box_shadow',
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'tab_border_hover',
			[
				'label' => ___elementor_adapter( 'Hover', 'elementor' ),
			]
		);

		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name' => 'border_hover',
				'selector' => '{{WRAPPER}}:hover',
			]
		);

		$this->add_control(
			'border_radius_hover',
			[
				'label' => ___elementor_adapter( 'Border Radius', 'elementor' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%' ],
				'selectors' => [
					'{{WRAPPER}}:hover, {{WRAPPER}}:hover > .elementor-background-overlay' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			[
				'name' => 'box_shadow_hover',
				'selector' => '{{WRAPPER}}:hover',
			]
		);

		$this->add_control(
			'border_hover_transition',
			[
				'label' => ___elementor_adapter( 'Transition Duration', 'elementor' ),
				'type' => Controls_Manager::SLIDER,
				'separator' => 'before',
				'default' => [
					'size' => 0.3,
				],
				'range' => [
					'px' => [
						'max' => 3,
						'step' => 0.1,
					],
				],
				'conditions' => [
					'relation' => 'or',
					'terms' => [
						[
							'name' => 'background_background',
							'operator' => '!==',
							'value' => '',
						],
						[
							'name' => 'border_border',
							'operator' => '!==',
							'value' => '',
						],
					],
				],
				'selectors' => [
					'{{WRAPPER}}' => 'transition: background {{background_hover_transition.SIZE}}s, border {{SIZE}}s, border-radius {{SIZE}}s, box-shadow {{SIZE}}s',
					'{{WRAPPER}} > .elementor-background-overlay' => 'transition: background {{background_overlay_hover_transition.SIZE}}s, border-radius {{SIZE}}s, opacity {{background_overlay_hover_transition.SIZE}}s',
				],
			]
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->end_controls_section();

		// Section Shape Divider
		$this->start_controls_section(
			'section_shape_divider',
			[
				'label' => ___elementor_adapter( 'Shape Divider', 'elementor' ),
				'tab' => Controls_Manager::TAB_STYLE,
			]
		);

		$this->start_controls_tabs( 'tabs_shape_dividers' );

		$shapes_options = [
			'' => ___elementor_adapter( 'None', 'elementor' ),
		];

		foreach ( Shapes::get_shapes() as $shape_name => $shape_props ) {
			$shapes_options[ $shape_name ] = $shape_props['title'];
		}

		foreach ( [
			'top' => ___elementor_adapter( 'Top', 'elementor' ),
			'bottom' => ___elementor_adapter( 'Bottom', 'elementor' ),
		] as $side => $side_label ) {
			$base_control_key = "shape_divider_$side";

			$this->start_controls_tab(
				"tab_$base_control_key",
				[
					'label' => $side_label,
				]
			);

			$this->add_control(
				$base_control_key,
				[
					'label' => ___elementor_adapter( 'Type', 'elementor' ),
					'type' => Controls_Manager::SELECT,
					'options' => $shapes_options,
					'render_type' => 'none',
					'frontend_available' => true,
				]
			);

			$this->add_control(
				$base_control_key . '_color',
				[
					'label' => ___elementor_adapter( 'Color', 'elementor' ),
					'type' => Controls_Manager::COLOR,
					'condition' => [
						"shape_divider_$side!" => '',
					],
					'selectors' => [
						"{{WRAPPER}} > .elementor-shape-$side .elementor-shape-fill" => 'fill: {{UNIT}};',
					],
				]
			);

			$this->add_responsive_control(
				$base_control_key . '_width',
				[
					'label' => ___elementor_adapter( 'Width', 'elementor' ),
					'type' => Controls_Manager::SLIDER,
					'default' => [
						'unit' => '%',
					],
					'tablet_default' => [
						'unit' => '%',
					],
					'mobile_default' => [
						'unit' => '%',
					],
					'range' => [
						'%' => [
							'min' => 100,
							'max' => 300,
						],
					],
					'condition' => [
						"shape_divider_$side" => array_keys( Shapes::filter_shapes( 'height_only', Shapes::FILTER_EXCLUDE ) ),
					],
					'selectors' => [
						"{{WRAPPER}} > .elementor-shape-$side svg" => 'width: calc({{SIZE}}{{UNIT}} + 1.3px)',
					],
				]
			);

			$this->add_responsive_control(
				$base_control_key . '_height',
				[
					'label' => ___elementor_adapter( 'Height', 'elementor' ),
					'type' => Controls_Manager::SLIDER,
					'range' => [
						'px' => [
							'max' => 500,
						],
					],
					'condition' => [
						"shape_divider_$side!" => '',
					],
					'selectors' => [
						"{{WRAPPER}} > .elementor-shape-$side svg" => 'height: {{SIZE}}{{UNIT}};',
					],
				]
			);

			$this->add_control(
				$base_control_key . '_flip',
				[
					'label' => ___elementor_adapter( 'Flip', 'elementor' ),
					'type' => Controls_Manager::SWITCHER,
					'condition' => [
						"shape_divider_$side" => array_keys( Shapes::filter_shapes( 'has_flip' ) ),
					],
					'selectors' => [
						"{{WRAPPER}} > .elementor-shape-$side svg" => 'transform: translateX(-50%) rotateY(180deg)',
					],
				]
			);

			$this->add_control(
				$base_control_key . '_negative',
				[
					'label' => ___elementor_adapter( 'Invert', 'elementor' ),
					'type' => Controls_Manager::SWITCHER,
					'frontend_available' => true,
					'condition' => [
						"shape_divider_$side" => array_keys( Shapes::filter_shapes( 'has_negative' ) ),
					],
					'render_type' => 'none',
				]
			);

			$this->add_control(
				$base_control_key . '_above_content',
				[
					'label' => ___elementor_adapter( 'Bring to Front', 'elementor' ),
					'type' => Controls_Manager::SWITCHER,
					'selectors' => [
						"{{WRAPPER}} > .elementor-shape-$side" => 'z-index: 2; pointer-events: none',
					],
					'condition' => [
						"shape_divider_$side!" => '',
					],
				]
			);

			$this->end_controls_tab();
		}

		$this->end_controls_tabs();

		$this->end_controls_section();

		// Section Typography
		$this->start_controls_section(
			'section_typo',
			[
				'label' => ___elementor_adapter( 'Typography', 'elementor' ),
				'tab' => Controls_Manager::TAB_STYLE,
			]
		);

		if ( in_array( Scheme_Color::get_type(), Schemes_Manager::get_enabled_schemes(), true ) ) {
			$this->add_control(
				'colors_warning',
				[
					'type' => Controls_Manager::RAW_HTML,
					'raw' => ___elementor_adapter( 'Note: The following colors won\'t work if Default Colors are enabled.', 'elementor' ),
					'content_classes' => 'elementor-panel-alert elementor-panel-alert-warning',
				]
			);
		}

		$this->add_control(
			'heading_color',
			[
				'label' => ___elementor_adapter( 'Heading Color', 'elementor' ),
				'type' => Controls_Manager::COLOR,
				'default' => '',
				'selectors' => [
					'{{WRAPPER}} .elementor-heading-title' => 'color: {{VALUE}};',
				],
				'separator' => 'none',
			]
		);

		$this->add_control(
			'color_text',
			[
				'label' => ___elementor_adapter( 'Text Color', 'elementor' ),
				'type' => Controls_Manager::COLOR,
				'default' => '',
				'selectors' => [
					'{{WRAPPER}}' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'color_link',
			[
				'label' => ___elementor_adapter( 'Link Color', 'elementor' ),
				'type' => Controls_Manager::COLOR,
				'default' => '',
				'selectors' => [
					'{{WRAPPER}} a' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'color_link_hover',
			[
				'label' => ___elementor_adapter( 'Link Hover Color', 'elementor' ),
				'type' => Controls_Manager::COLOR,
				'default' => '',
				'selectors' => [
					'{{WRAPPER}} a:hover' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'text_align',
			[
				'label' => ___elementor_adapter( 'Text Align', 'elementor' ),
				'type' => Controls_Manager::CHOOSE,
				'options' => [
					'left' => [
						'title' => ___elementor_adapter( 'Left', 'elementor' ),
						'icon' => 'fa fa-align-left',
					],
					'center' => [
						'title' => ___elementor_adapter( 'Center', 'elementor' ),
						'icon' => 'fa fa-align-center',
					],
					'right' => [
						'title' => ___elementor_adapter( 'Right', 'elementor' ),
						'icon' => 'fa fa-align-right',
					],
				],
				'selectors' => [
					'{{WRAPPER}} > .elementor-container' => 'text-align: {{VALUE}};',
				],
			]
		);

		$this->end_controls_section();

		// Section Advanced
		$this->start_controls_section(
			'section_advanced',
			[
				'label' => ___elementor_adapter( 'Advanced', 'elementor' ),
				'tab' => Controls_Manager::TAB_ADVANCED,
			]
		);

		$this->add_responsive_control(
			'margin',
			[
				'label' => ___elementor_adapter( 'Margin', 'elementor' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%' ],
				'allowed_dimensions' => 'vertical',
				'placeholder' => [
					'top' => '',
					'right' => 'auto',
					'bottom' => '',
					'left' => 'auto',
				],
				'selectors' => [
					'{{WRAPPER}}' => 'margin-top: {{TOP}}{{UNIT}}; margin-bottom: {{BOTTOM}}{{UNIT}};',
				],
			]
		);

		$this->add_responsive_control(
			'padding',
			[
				'label' => ___elementor_adapter( 'Padding', 'elementor' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}}' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_control(
			'z_index',
			[
				'label' => ___elementor_adapter( 'Z-Index', 'elementor' ),
				'type' => Controls_Manager::NUMBER,
				'min' => 0,
				'selectors' => [
					'{{WRAPPER}}' => 'z-index: {{VALUE}};',
				],
				'label_block' => false,
			]
		);

		$this->add_control(
			'animation',
			[
				'label' => ___elementor_adapter( 'Entrance Animation', 'elementor' ),
				'type' => Controls_Manager::ANIMATION,
				'default' => '',
				'prefix_class' => 'animated ',
				'label_block' => false,
				'frontend_available' => true,
			]
		);

		$this->add_control(
			'animation_duration',
			[
				'label' => ___elementor_adapter( 'Animation Duration', 'elementor' ),
				'type' => Controls_Manager::SELECT,
				'default' => '',
				'options' => [
					'slow' => ___elementor_adapter( 'Slow', 'elementor' ),
					'' => ___elementor_adapter( 'Normal', 'elementor' ),
					'fast' => ___elementor_adapter( 'Fast', 'elementor' ),
				],
				'prefix_class' => 'animated-',
				'condition' => [
					'animation!' => '',
				],
			]
		);

		$this->add_control(
			'animation_delay',
			[
				'label' => ___elementor_adapter( 'Animation Delay', 'elementor' ) . ' (ms)',
				'type' => Controls_Manager::NUMBER,
				'default' => '',
				'min' => 0,
				'step' => 100,
				'condition' => [
					'animation!' => '',
				],
				'render_type' => 'none',
				'frontend_available' => true,
			]
		);

		$this->add_control(
			'_element_id',
			[
				'label' => ___elementor_adapter( 'CSS ID', 'elementor' ),
				'type' => Controls_Manager::TEXT,
				'default' => '',
				'title' => ___elementor_adapter( 'Add your custom id WITHOUT the Pound key. e.g: my-id', 'elementor' ),
				'label_block' => false,
				'style_transfer' => false,
			]
		);

		$this->add_control(
			'css_classes',
			[
				'label' => ___elementor_adapter( 'CSS Classes', 'elementor' ),
				'type' => Controls_Manager::TEXT,
				'default' => '',
				'prefix_class' => '',
				'title' => ___elementor_adapter( 'Add your custom class WITHOUT the dot. e.g: my-class', 'elementor' ),
				'label_block' => false,
			]
		);

		$this->end_controls_section();

		// Section Responsive
		$this->start_controls_section(
			'_section_responsive',
			[
				'label' => ___elementor_adapter( 'Responsive', 'elementor' ),
				'tab' => Controls_Manager::TAB_ADVANCED,
			]
		);

		$this->add_control(
			'reverse_order_tablet',
			[
				'label' => ___elementor_adapter( 'Reverse Columns', 'elementor' ) . ' (' . ___elementor_adapter( 'Tablet', 'elementor' ) . ')',
				'type' => Controls_Manager::SWITCHER,
				'default' => '',
				'prefix_class' => 'elementor-',
				'return_value' => 'reverse-tablet',
			]
		);

		$this->add_control(
			'reverse_order_mobile',
			[
				'label' => ___elementor_adapter( 'Reverse Columns', 'elementor' ) . ' (' . ___elementor_adapter( 'Mobile', 'elementor' ) . ')',
				'type' => Controls_Manager::SWITCHER,
				'default' => '',
				'prefix_class' => 'elementor-',
				'return_value' => 'reverse-mobile',
			]
		);

		$this->add_control(
			'heading_visibility',
			[
				'label' => ___elementor_adapter( 'Visibility', 'elementor' ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'before',
			]
		);

		$this->add_control(
			'responsive_description',
			[
				'raw' => ___elementor_adapter( 'Attention: The display settings (show/hide for mobile, tablet or desktop) will only take effect once you are on the preview or live page, and not while you\'re in editing mode in Elementor.', 'elementor' ),
				'type' => Controls_Manager::RAW_HTML,
				'content_classes' => 'elementor-descriptor',
			]
		);

		$this->add_control(
			'hide_desktop',
			[
				'label' => ___elementor_adapter( 'Hide On Desktop', 'elementor' ),
				'type' => Controls_Manager::SWITCHER,
				'default' => '',
				'prefix_class' => 'elementor-',
				'label_on' => ___elementor_adapter( 'Hide', 'elementor' ),
				'label_off' => ___elementor_adapter( 'Show', 'elementor' ),
				'return_value' => 'hidden-desktop',
			]
		);

		$this->add_control(
			'hide_tablet',
			[
				'label' => ___elementor_adapter( 'Hide On Tablet', 'elementor' ),
				'type' => Controls_Manager::SWITCHER,
				'default' => '',
				'prefix_class' => 'elementor-',
				'label_on' => ___elementor_adapter( 'Hide', 'elementor' ),
				'label_off' => ___elementor_adapter( 'Show', 'elementor' ),
				'return_value' => 'hidden-tablet',
			]
		);

		$this->add_control(
			'hide_mobile',
			[
				'label' => ___elementor_adapter( 'Hide On Mobile', 'elementor' ),
				'type' => Controls_Manager::SWITCHER,
				'default' => '',
				'prefix_class' => 'elementor-',
				'label_on' => ___elementor_adapter( 'Hide', 'elementor' ),
				'label_off' => ___elementor_adapter( 'Show', 'elementor' ),
				'return_value' => 'hidden-phone',
			]
		);

		$this->end_controls_section();

		Plugin::$instance->controls_manager->add_custom_css_controls( $this );
	}

	/**
	 * Render section edit tools.
	 *
	 * Used to generate the edit tools HTML.
	 *
	 * @since 1.8.0
	 * @access protected
	 */
	protected function render_edit_tools() {
		?>
		<div class="elementor-element-overlay">
			<ul class="elementor-editor-element-settings elementor-editor-section-settings">
				<?php foreach ( self::get_edit_tools() as $edit_tool_name => $edit_tool ) : ?>
					<?php if ( 'add' === $edit_tool_name ) : ?>
						<# if ( ! isInner ) { #>
					<?php endif; ?>
					<li class="elementor-editor-element-setting elementor-editor-element-<?php echo esc_attr_elementor_adapter( $edit_tool_name ); ?>" title="<?php echo esc_attr_elementor_adapter( $edit_tool['title'] ); ?>">
						<i class="eicon-<?php echo esc_attr_elementor_adapter( $edit_tool['icon'] ); ?>" aria-hidden="true"></i>
						<span class="elementor-screen-only"><?php echo esc_html_elementor_adapter( $edit_tool['title'] ); ?></span>
					</li>
					<?php if ( 'add' === $edit_tool_name ) : ?>
						<# } #>
					<?php endif; ?>
				<?php endforeach; ?>
			</ul>
		</div>
		<?php
	}

	/**
	 * Render section output in the editor.
	 *
	 * Used to generate the live preview, using a Backbone JavaScript template.
	 *
	 * @since 1.0.0
	 * @access protected
	 */
	protected function _content_template() {
		?>
		<# if ( settings.background_video_link ) { #>
			<div class="elementor-background-video-container elementor-hidden-phone">
				<div class="elementor-background-video-embed"></div>
				<video class="elementor-background-video-hosted" autoplay loop muted></video>
			</div>
		<# } #>
		<div class="elementor-background-overlay"></div>
		<div class="elementor-shape elementor-shape-top"></div>
		<div class="elementor-shape elementor-shape-bottom"></div>
		<div class="elementor-container elementor-column-gap-{{ settings.gap }}">
			<div class="elementor-row"></div>
		</div>
		<?php
	}

	/**
	 * Before section rendering.
	 *
	 * Used to add stuff before the section element.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function before_render() {
		$settings = $this->get_settings_for_display();

		?>
		<<?php echo esc_html_elementor_adapter( $this->get_html_tag() ); ?> <?php $this->print_render_attribute_string( '_wrapper' ); ?>>
			<?php
			if ( 'video' === $settings['background_background'] ) :
				if ( $settings['background_video_link'] ) :
					$video_properties = Embed::get_video_properties( $settings['background_video_link'] );
					?>
					<div class="elementor-background-video-container elementor-hidden-phone">
						<?php if ( $video_properties ) : ?>
							<div class="elementor-background-video-embed"></div>
						<?php else : ?>
							<video class="elementor-background-video-hosted elementor-html5-video" autoplay loop muted></video>
						<?php endif; ?>
					</div>
					<?php
				endif;
			endif;

			$has_background_overlay = in_array( $settings['background_overlay_background'], [ 'classic', 'gradient' ], true ) ||
									  in_array( $settings['background_overlay_hover_background'], [ 'classic', 'gradient' ], true );

			if ( $has_background_overlay ) :
				?>
				<div class="elementor-background-overlay"></div>
				<?php
			endif;

			if ( $settings['shape_divider_top'] ) {
				$this->print_shape_divider( 'top' );
			}

			if ( $settings['shape_divider_bottom'] ) {
				$this->print_shape_divider( 'bottom' );
			}
			?>
			<div class="elementor-container elementor-column-gap-<?php echo esc_attr_elementor_adapter( $settings['gap'] ); ?>">
				<div class="elementor-row">
		<?php
	}

	/**
	 * After section rendering.
	 *
	 * Used to add stuff after the section element.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function after_render() {
		?>
				</div>
			</div>
		</<?php echo esc_html_elementor_adapter( $this->get_html_tag() ); ?>>
		<?php
	}

	/**
	 * Add section render attributes.
	 *
	 * Used to add attributes to the current section wrapper HTML tag.
	 *
	 * @since 1.3.0
	 * @access protected
	 */
	protected function _add_render_attributes() {
		parent::_add_render_attributes();

		$section_type = $this->get_data( 'isInner' ) ? 'inner' : 'top';

		$this->add_render_attribute(
			'_wrapper', 'class', [
				'elementor-section',
				'elementor-' . $section_type . '-section',
			]
		);

		$this->add_render_attribute( '_wrapper', 'data-element_type', $this->get_name() );
	}

	/**
	 * Get default child type.
	 *
	 * Retrieve the section child type based on element data.
	 *
	 * @since 1.0.0
	 * @access protected
	 *
	 * @param array $element_data Element ID.
	 *
	 * @return Element_Base Section default child type.
	 */
	protected function _get_default_child_type( array $element_data ) {
		return Plugin::$instance->elements_manager->get_element_types( 'column' );
	}

	/**
	 * Get HTML tag.
	 *
	 * Retrieve the section element HTML tag.
	 *
	 * @since 1.5.3
	 * @access private
	 *
	 * @return string Section HTML tag.
	 */
	private function get_html_tag() {
		$html_tag = $this->get_settings( 'html_tag' );

		if ( empty( $html_tag ) ) {
			$html_tag = 'section';
		}

		return $html_tag;
	}

	/**
	 * Print section shape divider.
	 *
	 * Used to generate the shape dividers HTML.
	 *
	 * @since 1.3.0
	 * @access private
	 *
	 * @param string $side Shape divider side, used to set the shape key.
	 */
	private function print_shape_divider( $side ) {
		$settings = $this->get_active_settings();
		$base_setting_key = "shape_divider_$side";
		$negative = ! empty( $settings[ $base_setting_key . '_negative' ] );
		?>
		<div class="elementor-shape elementor-shape-<?php echo esc_attr_elementor_adapter( $side ); ?>" data-negative="<?php echo var_export( $negative ); ?>">
			<?php include Shapes::get_shape_path( $settings[ $base_setting_key ], ! empty( $settings[ $base_setting_key . '_negative' ] ) ); ?>
		</div>
		<?php
	}
}
