<?php

namespace Drupal\elementor;

use Elementor\Controls_Manager;
use Elementor\Widget_Base;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

/**
 * Elementor block widget.
 *
 * Elementor widget that insert any blocks into the page.
 *
 * @since 1.0.0
 */
class Widget_Drupal_Block extends Widget_Base
{

    /**
     * Get widget name.
     *
     * Retrieve block widget name.
     *
     * @since 1.0.0
     * @access public
     *
     * @return string Widget name.
     */
    public function get_name()
    {
        return 'drupal-block';
    }

    /**
     * Get widget title.
     *
     * Retrieve block widget title.
     *
     * @since 1.0.0
     * @access public
     *
     * @return string Widget title.
     */
    public function get_title()
    {
        return ___elementor_adapter('Drupal block', 'elementor');
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
     * Retrieve block widget icon.
     *
     * @since 1.0.0
     * @access public
     *
     * @return string Widget icon.
     */
    public function get_icon()
    {
        return 'eicon-accordion';
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
    public function get_keywords()
    {
        return ['drupal', 'block', 'code'];
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
    public function is_reload_preview_required()
    {
        return false;
    }

    /**
     * Register block widget controls.
     *
     * Adds different input fields to allow the user to change and customize the widget settings.
     *
     * @since 1.0.0
     * @access protected
     */
    protected function _register_controls()
    {
        $this->start_controls_section(
            'section_block',
            [
                'label' => ___elementor_adapter('Block', 'elementor'),
            ]
        );

        $blockManager = \Drupal::service('plugin.manager.block');
        $options = [];

        foreach ($blockManager->getDefinitions() as $block_id => $block) {
            $options[$block_id] = str_replace(':', '->', $block_id);
        }
        
        $this->add_control(
            'block_id',
            [
                'label' => ___elementor_adapter('Block name', 'elementor'),
                'type' => Controls_Manager::SELECT,
                'default' => '',
                'options' => $options,
            ]
        );

        $this->end_controls_section();
    }

    /**
     * Render block widget output on the frontend.
     *
     * Written in PHP and used to generate the final HTML.
     *
     * @since 1.0.0
     * @access protected
     */
    protected function render()
    {
        $block_id = $this->get_settings_for_display('block_id');

        $block_manager = \Drupal::service('plugin.manager.block');
        $config = [];
        $plugin_block = $block_manager->createInstance($block_id, $config);
        // $access_result = $plugin_block->access(\Drupal::currentUser());
        // if (is_object($access_result) && $access_result->isForbidden() || is_bool($access_result) && !$access_result) {
        //   return [];
        // }
        $render= $plugin_block->build();
        $renderer = \Drupal::service('renderer');
        $html = $renderer->render($render);
        echo  $html ?$html->__toString() : $block_id;
    }

    /**
     * Render block widget as plain content.
     *
     * Override the default behavior by printing the block instead of rendering it.
     *
     * @since 1.0.0
     * @access public
     */
    public function render_plain_content()
    {
        // In plain mode, render without block
        echo $this->get_settings('block');
    }

    /**
     * Render block widget output in the editor.
     *
     * Written as a Backbone JavaScript template and used to generate the live preview.
     *
     * @since 1.0.0
     * @access protected
     */
    protected function _content_template()   {  }
}
