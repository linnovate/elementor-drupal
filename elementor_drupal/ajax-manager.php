<?php
/**
 * @file
 * Contains \Drupal\elementor\Drupal_Ajax_Manager.
 */

namespace Drupal\elementor;

use Elementor\Core\Ajax_Manager;
use Elementor\Core\Utils\Exceptions;
use Elementor\Plugin;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

class Drupal_Ajax_Manager extends Ajax_Manager
{

    protected function send_success()
    {
        return wp_send_json_success_elementor_adapter([
            'responses' => $this->response_data,
        ]);
    }

    protected function send_error($code = null)
    {
        return wp_send_json_error_elementor_adapter([
            'responses' => $this->response_data,
        ], $code);
    }

    public function handle_ajax_request()
    {
        if (!Plugin::$instance->editor->verify_request_nonce()) {
            $this->add_response_data(false, ___elementor_adapter('Token Expired.', 'elementor'))
                ->send_error(Exceptions::UNAUTHORIZED);
        }

        if (empty($_REQUEST['actions']) || empty($_REQUEST['editor_post_id'])) {
            $this->add_response_data(false, ___elementor_adapter('Actions and Post ID are required.', 'elementor'))
                ->send_error(Exceptions::BAD_REQUEST);
        }

        $editor_post_id = absint_elementor_adapter($_REQUEST['editor_post_id']);

        if (!get_post_elementor_adapter($editor_post_id)) {
            $this->add_response_data(false, ___elementor_adapter('Post not found.', 'elementor'))
                ->send_error(Exceptions::NOT_FOUND);
        }

        Plugin::$instance->db->switch_to_post($editor_post_id);

        /**
         * Register ajax actions.
         *
         * Fires when an ajax request is received and verified.
         *
         * Used to register new ajax action handles.
         *
         * @since 2.0.0
         *
         * @param Ajax_Manager $this An instance of ajax manager.
         */
        do_action_elementor_adapter('elementor/ajax/register_actions', $this);

        $this->requests = json_decode(stripslashes($_REQUEST['actions']), true);

        foreach ($this->requests as $id => $action_data) {
            $this->current_action_id = $id;

            if (!isset($this->ajax_actions[$action_data['action']])) {
                $this->add_response_data(false, ___elementor_adapter('Action not found.', 'elementor'), Exceptions::BAD_REQUEST);

                continue;
            }

            if (empty($action_data['data']['editor_post_id'])) {
                $action_data['data']['editor_post_id'] = $editor_post_id;
            }

            try {
                $results = call_user_func($this->ajax_actions[$action_data['action']]['callback'], $action_data['data'], $this);

                if (false === $results) {
                    $this->add_response_data(false);
                } else {
                    $this->add_response_data(true, $results);
                }
            } catch (\Exception $e) {
                $this->add_response_data(false, $e->getMessage(), $e->getCode());
            }
        }

        $this->current_action_id = null;

        return $this->send_success();
    }

    /**
     * Ajax manager constructor.
     *
     * Initializing Elementor ajax manager.
     *
     * @since 2.0.0
     * @access public
     */
    public function __construct()
    {
        remove_action_elementor_adapter('wp_ajax_elementor_ajax', [$this, 'handle_ajax_request']);
        add_action_elementor_adapter('wp_ajax_elementor_ajax', [$this, 'handle_ajax_request']);
    }
}
