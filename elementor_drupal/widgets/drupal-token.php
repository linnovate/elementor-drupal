<?php

namespace Drupal\elementor;

use Elementor\Controls_Manager;
use Elementor\Widget_Base;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Elementor token widget.
 *
 * Elementor widget that insert any tokens into the page.
 *
 * @since 1.0.0
 */
class Widget_Drupal_Token extends Widget_Base {

	/**
	 * Get widget name.
	 *
	 * Retrieve token widget name.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return string Widget name.
	 */
	public function get_name() {
		return 'token';
	}

	/**
	 * Get widget title.
	 *
	 * Retrieve token widget title.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return string Widget title.
	 */
	public function get_title() {
		return ___elementor_adapter( 'Token', 'elementor' );
	}

    /**
     * Get widget categories.
     *
     * Used to determine where to display the widget in the editor.
     *
     * @since 1.0.0
     * @access public
     *
     * @return array Widget categories. Returns either a Drupal category.
     */
    public function get_categories()
    {
        return ['theme-elements'];
	}
	
	/**
	 * Get widget icon.
	 *
	 * Retrieve token widget icon.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return string Widget icon.
	 */
	public function get_icon() {
		return 'eicon-shortcode';
	}

	/**
	 * Get widget keywords.
	 *
	 * Retrieve the list of keywords the widget belongs to.
	 *
	 * @since 2.1.0
	 * @access public
	 *
	 * @return array Widget keywords.
	 */
	public function get_keywords() {
		return [ 'token', 'code' ];
	}

	/**
	 * Whether the reload preview is required or not.
	 *
	 * Used to determine whether the reload preview is required.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return bool Whether the reload preview is required.
	 */
	public function is_reload_preview_required() {
		return false;
	}

	/**
	 * Register token widget controls.
	 *
	 * Adds different input fields to allow the user to change and customize the widget settings.
	 *
	 * @since 1.0.0
	 * @access protected
	 */
	protected function _register_controls() {
		$this->start_controls_section(
			'section_token',
			[
				'label' => ___elementor_adapter( 'Token', 'elementor' ),
			]
		);

		$this->add_control(
			'token',
			[
				'label' => ___elementor_adapter( 'Enter your token', 'elementor' ),
				'type' => Controls_Manager::TEXTAREA,
				'dynamic' => [
					'active' => true,
				],
				'placeholder' => '[site:name]',
				'default' => '',
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Render token widget output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since 1.0.0
	 * @access protected
	 */
	protected function render() {
		$token_data = $this->get_settings_for_display( 'token' );
		
		$token = \Drupal::service('token');

		echo $token->replace($token_data);
	}

	/**
	 * Render token widget as plain content.
	 *
	 * Override the default behavior by printing the token instead of rendering it.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function render_plain_content() {
		// In plain mode, render without token
		echo $this->get_settings( 'token' );
	}

	/**
	 * Render token widget output in the editor.
	 *
	 * Written as a Backbone JavaScript template and used to generate the live preview.
	 *
	 * @since 1.0.0
	 * @access protected
	 */
	protected function _content_template() {}
}
