<?php

namespace Drupal\elementor;

use Drupal\elementor\Import_Images;
use Elementor\Api;
use Elementor\Plugin;
use Elementor\TemplateLibrary\Manager;
use Elementor\Utils;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

class Drupal_TemplateLibrary_Manager extends Manager
{

    private $_import_images = null;

    public function __construct()
    {
        $this->register_default_sources();
        $this->init_ajax_calls();
    }

    /**
     * Get `Import_Images` instance.
     *
     * Retrieve the instance of the `Import_Images` class.
     *
     * @since 1.0.0
     * @access public
     *
     * @return Import_Images Imported images instance.
     */
    public function get_import_images_instance()
    {
        if (null === $this->_import_images) {
            $this->_import_images = new Import_Images();
        }

        return $this->_import_images;
    }

    public function get_library_data(array $args)
    {
        if (empty($args['sync'])) {
            $library_data = ElementorPlugin::$instance->sdk->get_remote_templates('remote');
        }
        if (!$library_data) {
            $library_data = Api::get_library_data(!empty($args['sync']));
            ElementorPlugin::$instance->sdk->save_remote_templates('remote', $library_data);
        }

        return [
            'templates' => $this->get_templates(),
            'config' => [
                'categories' => $library_data['categories'],
            ],
        ];
    }

    public function save_template(array $args)
    {
        $validate_args = $this->ensure_args(['post_id', 'source', 'content', 'type'], $args);

        if (is_wp_error_elementor_adapter($validate_args)) {
            return $validate_args;
        }

        $source = $this->get_source($args['source']);

        if (!$source) {
            return new \WP_Error('template_error', 'Template source not found.');
        }

        $args['content'] = json_decode(stripslashes($args['content']), true);

        if ('page' === $args['type']) {
            // $page = SettingsManager::get_settings_managers('page')->get_model($args['post_id']);

            $args['page_settings'] = []; //$page->get_data( 'settings' );
        }

        $template_id = $source->save_item($args);

        if (is_wp_error_elementor_adapter($template_id)) {
            return $template_id;
        }

        return $source->get_item($template_id);
    }

    public function update_template(array $template_data)
    {
        $validate_args = $this->ensure_args(['source', 'content', 'type'], $template_data);

        if (is_wp_error_elementor_adapter($validate_args)) {
            return $validate_args;
        }

        $source = $this->get_source($template_data['source']);

        if (!$source) {
            return new \WP_Error('template_error', 'Template source not found.');
        }

        $template_data['content'] = json_decode(stripslashes($template_data['content']), true);

        $update = $source->update_item($template_data);

        if (is_wp_error_elementor_adapter($update)) {
            return $update;
        }

        return $source->get_item($template_data['id']);
    }

    /**
     * Update templates.
     *
     * Update template on the database.
     *
     * @since 1.0.0
     * @access public
     *
     * @param array $args Template arguments.
     *
     * @return \WP_Error|true True if templates updated, `WP_Error` otherwise.
     */
    public function update_templates(array $args)
    {
        foreach ($args['templates'] as $template_data) {
            $result = $this->update_template($template_data);

            if (is_wp_error_elementor_adapter($result)) {
                return $result;
            }
        }

        return true;
    }

    protected function replace_elements_ids($content)
    {
        return Plugin::$instance->db->iterate_data($content, function ($element) {
            $element['id'] = Utils::generate_random_string();

            return $element;
        });
    }

    public function get_template_data(array $args)
    {
        $validate_args = $this->ensure_args(['source', 'template_id'], $args);

        if (is_wp_error_elementor_adapter($validate_args)) {
            return $validate_args;
        }

        if (isset($args['edit_mode'])) {
            Plugin::$instance->editor->set_edit_mode($args['edit_mode']);
        }

        $source = $this->get_source($args['source']);

        if (!$source) {
            return new \WP_Error('template_error', 'Template source not found.');
        }

        do_action_elementor_adapter('elementor/template-library/before_get_source_data', $args, $source);

        $data = $source->get_data($args);

        do_action_elementor_adapter('elementor/template-library/after_get_source_data', $args, $source);

        return $data;
    }

    /**
     * Delete template.
     *
     * Delete template from the database.
     *
     * @since 1.0.0
     * @access public
     *
     * @param array $args Template arguments.
     *
     * @return \WP_Post|\WP_Error|false|null Post data on success, false or null
     *                                       or 'WP_Error' on failure.
     */
    public function delete_template(array $args)
    {
        $validate_args = $this->ensure_args(['source', 'template_id'], $args);

        if (is_wp_error_elementor_adapter($validate_args)) {
            return $validate_args;
        }

        $source = $this->get_source($args['source']);

        if (!$source) {
            return new \WP_Error('template_error', 'Template source not found.');
        }

        return $source->delete_template($args['template_id']);
    }

    /**
     * Export template.
     *
     * Export template to a file.
     *
     * @since 1.0.0
     * @access public
     *
     * @param array $args Template arguments.
     *
     * @return mixed Whether the export succeeded or failed.
     */
    public function export_template(array $args)
    {
        $validate_args = $this->ensure_args(['source', 'template_id'], $args);

        if (is_wp_error_elementor_adapter($validate_args)) {
            return $validate_args;
        }

        $source = $this->get_source($args['source']);

        if (!$source) {
            return new \WP_Error('template_error', 'Template source not found.');
        }

        // If you reach this line, the export was not successful.
        return $source->export_template($args['template_id']);
    }

    /**
     * Import template.
     *
     * Import template from a file.
     *
     * @since 1.0.0
     * @access public
     *
     * @return mixed Whether the export succeeded or failed.
     */
    public function import_template()
    {
        /** @var Source_Local $source */
        $source = $this->get_source('local');

        return $source->import_template($_FILES['file']['name'], $_FILES['file']['tmp_name']);
    }

    /**
     * Mark template as favorite.
     *
     * Add the template to the user favorite templates.
     *
     * @since 1.9.0
     * @access public
     *
     * @param array $args Template arguments.
     *
     * @return mixed Whether the template marked as favorite.
     */
    public function mark_template_as_favorite($args)
    {
        $validate_args = $this->ensure_args(['source', 'template_id', 'favorite'], $args);

        if (is_wp_error_elementor_adapter($validate_args)) {
            return $validate_args;
        }

        $source = $this->get_source($args['source']);

        return false; //$source->mark_as_favorite($args['template_id'], filter_var($args['favorite'], FILTER_VALIDATE_BOOLEAN));
    }

    /**
     * On successful template import.
     *
     * Redirect the user to the template library after template import was
     * successful finished.
     *
     * @since 1.0.0
     * @access public
     */
    public function on_import_template_success()
    {
        wp_redirect_elementor_adapter(admin_url_elementor_adapter('edit.php?post_type=' . Source_Local::CPT));
    }

    /**
     * On failed template import.
     *
     * Echo the error messages after template import was failed.
     *
     * @since 1.0.0
     * @access public
     *
     * @param \WP_Error $error WordPress error instance.
     */
    public function on_import_template_error(\WP_Error $error)
    {
        echo $error->get_error_message();
    }

    /**
     * On failed template export.
     *
     * Kill WordPress execution and display HTML error messages after template
     * export was failed.
     *
     * @since 1.0.0
     * @access public
     *
     * @param \WP_Error $error WordPress error instance.
     */
    public function on_export_template_error(\WP_Error $error)
    {
        _default_wp_die_handler($error->get_error_message(), 'Elementor Library');
    }

    private function register_default_sources()
    {
        $sources = [
            'local',
            'remote',
        ];

        foreach ($sources as $source_filename) {
            $class_name = ucwords($source_filename);
            $class_name = str_replace('-', '_', $class_name);

            $this->register_source(__NAMESPACE__ . '\Source_' . $class_name);
        }
    }

    private function handle_ajax_request($ajax_request)
    {

        if (!empty($_REQUEST['editor_post_id'])) {
            $editor_post_id = absint_elementor_adapter($_REQUEST['editor_post_id']);

            if (!get_post_elementor_adapter($editor_post_id)) {
                wp_send_json_error_elementor_adapter(___elementor_adapter('Post not found.', 'elementor'));
            }

            Plugin::$instance->db->switch_to_post($editor_post_id);
        }

        $result = call_user_func([$this, $ajax_request], $_REQUEST);

        $request_type = !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest' ? 'ajax' : 'direct';

        if ('direct' === $request_type) {
            $callback = 'on_' . $ajax_request;

            if (method_exists($this, $callback)) {
                $this->$callback($result);
            }
        }

        if (is_wp_error_elementor_adapter($result)) {
            if ('ajax' === $request_type) {
                wp_send_json_error_elementor_adapter($result);
            }

            $callback = "on_{$ajax_request}_error";

            if (method_exists($this, $callback)) {
                $this->$callback($result);
            }

            die;
        }

        if ('ajax' === $request_type) {
            return wp_send_json_success_elementor_adapter($result);
        }

        $callback = "on_{$ajax_request}_success";

        if (method_exists($this, $callback)) {
            $this->$callback($result);
        }

        die;
    }

    /**
     * Init ajax calls.
     *
     * Initialize template library ajax calls for allowed ajax requests.
     *
     * @since 1.0.0
     * @access private
     */
    private function init_ajax_calls()
    {
        $allowed_ajax_requests = [
            'get_library_data',
            'get_template_data',
            'save_template',
            'update_templates',
            'delete_template',
            'export_template',
            'import_template',
            'mark_template_as_favorite',
        ];

        foreach ($allowed_ajax_requests as $ajax_request) {
            remove_action_elementor_adapter('wp_ajax_elementor_' . $ajax_request);
            add_action_elementor_adapter('wp_ajax_elementor_' . $ajax_request, function () use ($ajax_request) {
                return $this->handle_ajax_request($ajax_request);
            });
        }
    }

    /**
     * Ensure arguments exist.
     *
     * Checks whether the required arguments exist in the specified arguments.
     *
     * @since 1.0.0
     * @access private
     *
     * @param array $required_args  Required arguments to check whether they
     *                              exist.
     * @param array $specified_args The list of all the specified arguments to
     *                              check against.
     *
     * @return \WP_Error|true True on success, 'WP_Error' otherwise.
     */
    private function ensure_args(array $required_args, array $specified_args)
    {
        $not_specified_args = array_diff($required_args, array_keys(array_filter($specified_args)));

        if ($not_specified_args) {
            return new \WP_Error('arguments_not_specified', sprintf('The required argument(s) "%s" not specified.', implode(', ', $not_specified_args)));
        }

        return true;
    }
}
