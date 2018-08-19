<?php
/**
 * @file
 * Contains \Drupal\elementor\DocumentDrupal.
 */

namespace Drupal\elementor;

use Elementor\Core\Base\Document;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class DocumentDrupal extends Document
{

    /**
     * @since 2.0.0
     * @access public
     */
    public function get_name()
    {
        return 'DocumentDrupal';
    }

    /**
     * @since 2.0.0
     * @access public
     * @static
     */
    public static function get_title()
    {
        return ___elementor_adapter('Page', 'elementor');
    }

    public function get_exit_to_dashboard_url()
    {
        return base_path() . 'node/' . $this->get_id_int();
    }

    public function is_editable_by_current_user()
    {
        return true;
    }

    public function save($data)
    {

    }

    public function get_post_elementor_adapter()
    {
            $post->ID = $this->get_id_int();
        return $post;
    }

    public function get_last_edited()
    {
        // $this->get_id_int()
		// $date = date_i18n( _x_elementor_adapter( 'M j, H:i', 'revision date format', 'elementor' ), strtotime( $post->post_modified ) );
		// $display_name = '';
        
        // $last_edited = sprintf( ___elementor_adapter( 'Last edited on %1$s by %2$s', 'elementor' ), '<time>' . $date . '</time>', $display_name );

		return '';//$last_edited;
    }

    public function get_wp_preview_url()
    {}
    /**
     * @since 2.0.0
     * @access public
     *
     * @param array $data
     */
    public function __construct(array $data = [])
    {
        if ($data) {
            $template = get_post_meta_elementor_adapter($data['post_id'], '_wp_page_template', true);
            if (empty($template)) {
                $template = 'default';
            }
            $data['settings']['template'] = $template;
        }

        parent::__construct($data);
    }
}
