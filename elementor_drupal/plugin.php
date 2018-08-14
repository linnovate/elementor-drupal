<?php
/**
 * @file
 * Contains \Drupal\elementor\ElementorDrupal.
 */

namespace Drupal\elementor;

use Drupal\elementor\DocumentDrupal;
use Drupal\elementor\DrupalPost_CSS;
use Drupal\elementor\Drupal_Ajax_Manager;
use Drupal\elementor\Drupal_Revisions_Manager;
use Drupal\elementor\Drupal_TemplateLibrary_Manager;
use Elementor\Editor;
use Elementor\Plugin;
use Elementor\Schemes_Manager;

class ElementorDrupal
{
    /**
     * Instance.
     *
     * Holds the plugin instance.
     *
     * @since 1.0.0
     * @access public
     * @static
     *
     * @var Plugin
     */
    public static $instance = null;

    /**
     * Instance.
     *
     * Ensures only one instance of the plugin class is loaded or can be loaded.
     *
     * @since 1.0.0
     * @access public
     * @static
     *
     * @return Plugin An instance of the class.
     */
    public static function instance()
    {
        if (is_null(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Save data.
     *
     * @since 1.0.0
     * @access private
     */
    private function setData($id, $data)
    {
        $connection = \Drupal::database();
        $item = $connection->query("SELECT id FROM elementor_data WHERE uid = " . $id)
            ->fetch();

        date_default_timezone_set("UTC");

        $connection->insert('elementor_data')
            ->fields([
                'uid' => $id,
                'author' => 'admin',
                'timestamp' => time(),
                'data' => json_encode($data),
            ])
            ->execute();

        $result_count = $connection->query("SELECT COUNT(uid) as num FROM elementor_data WHERE uid = " . $id)
            ->fetch();
            $count =  $result_count->num - 10;
        if ($count > 0) {
            $result = $connection->query("DELETE FROM elementor_data WHERE uid = " . $id . " LIMIT " . $count)
                ->execute();
        }
    }

    /**
     * Get data.
     *
     * @since 1.0.0
     * @access public
     */
    public function getData($id)
    {
        $connection = \Drupal::database();
        $result = $connection->query("SELECT data FROM elementor_data WHERE uid = " . $id . " ORDER BY ID DESC LIMIT 1")
            ->fetch();
        return json_decode($result->data, true);
    }

    /**
     * Render data.
     *
     * Get the markup of data by elementor data.
     *
     * @since 1.0.0
     * @access private
     */
    private function render_data($id)
    {
        $elements_data = $this->getData($id);

        $data = [
            'elements' => isset($elements_data['elements']) ? $elements_data['elements'] : [],
            'settings' => isset($elements_data['settings']) ? $elements_data['settings'] : [],
        ];

        $with_html_content = true;
        $editor_data = [];

        foreach ($data['elements'] as $element_data) {
            $element = Plugin::$instance->elements_manager->create_element_instance($element_data);

            if (!$element) {
                continue;
            }

            $editor_data[] = $element->get_raw_data($with_html_content);
        }

        $data['elements'] = $editor_data;

        return $data;
    }

    /**
     * Editor.
     *
     * Get the editor tmp_scripts & config_data (no: js/css assets).
     *
     * @since 1.0.0
     * @access public
     */
    public function editor($id)
    {
        $data = $this->render_data($id);
        $items = $this->plugin->schemes_manager->get_registered_schemes_data();
        $enabled_schemes = Schemes_Manager::get_enabled_schemes();

        $config = [
            'version' => ELEMENTOR_VERSION,
            'ajaxurl' => base_path() . 'elementor/update',
            'home_url' => base_path(),
            'assets_url' => base_path() . drupal_get_path('module', 'elementor') . '/elementor/assets/',
            "post_id" => $id,
            'data' => $data['elements'],
            'elements_categories' => $this->plugin->elements_manager->get_categories(),
            'controls' => $this->plugin->controls_manager->get_controls_data(),
            'elements' => $this->plugin->elements_manager->get_element_types_config(),
            'widgets' => $this->plugin->widgets_manager->get_widget_types_config(),
            'schemes' => [
                'items' => $this->plugin->schemes_manager->get_registered_schemes_data(),
                'enabled_schemes' => Schemes_Manager::get_enabled_schemes(),
            ],
            'default_schemes' => $this->plugin->schemes_manager->get_schemes_defaults(),
            'system_schemes' => $this->plugin->schemes_manager->get_system_schemes(),
            'i18n' => [
                'elementor' => ___elementor_adapter('Elementor', 'elementor'),
                'delete' => ___elementor_adapter('Delete', 'elementor'),
                'cancel' => ___elementor_adapter('Cancel', 'elementor'),
                'edit_element' => ___elementor_adapter('Edit %s', 'elementor'),

                // Menu.
                'about_elementor' => ___elementor_adapter('About Elementor', 'elementor'),
                'color_picker' => ___elementor_adapter('Color Picker', 'elementor'),
                'elementor_settings' => ___elementor_adapter('Dashboard Settings', 'elementor'),
                'global_colors' => ___elementor_adapter('Default Colors', 'elementor'),
                'global_fonts' => ___elementor_adapter('Default Fonts', 'elementor'),
                'global_style' => ___elementor_adapter('Style', 'elementor'),
                'settings' => ___elementor_adapter('Settings', 'elementor'),

                // Elements.
                'inner_section' => ___elementor_adapter('Columns', 'elementor'),

                // Control Order.
                'asc' => ___elementor_adapter('Ascending order', 'elementor'),
                'desc' => ___elementor_adapter('Descending order', 'elementor'),

                // Clear Page.
                'clear_page' => ___elementor_adapter('Delete All Content', 'elementor'),
                'dialog_confirm_clear_page' => ___elementor_adapter('Attention: We are going to DELETE ALL CONTENT from this page. Are you sure you want to do that?', 'elementor'),

                // Panel Preview Mode.
                'back_to_editor' => ___elementor_adapter('Show Panel', 'elementor'),
                'preview' => ___elementor_adapter('Hide Panel', 'elementor'),

                // Inline Editing.
                'type_here' => ___elementor_adapter('Type Here', 'elementor'),

                // Library.
                'an_error_occurred' => ___elementor_adapter('An error occurred', 'elementor'),
                'category' => ___elementor_adapter('Category', 'elementor'),
                'delete_template' => ___elementor_adapter('Delete Template', 'elementor'),
                'delete_template_confirm' => ___elementor_adapter('Are you sure you want to delete this template?', 'elementor'),
                'import_template_dialog_header' => ___elementor_adapter('Import Document Settings', 'elementor'),
                'import_template_dialog_message' => ___elementor_adapter('Do you want to also import the document settings of the template?', 'elementor'),
                'import_template_dialog_message_attention' => ___elementor_adapter('Attention: Importing may override previous settings.', 'elementor'),
                'library' => ___elementor_adapter('Library', 'elementor'),
                'no' => ___elementor_adapter('No', 'elementor'),
                'page' => ___elementor_adapter('Page', 'elementor'),
                /* translators: %s: Template type. */
                'save_your_template' => ___elementor_adapter('Save Your %s to Library', 'elementor'),
                'save_your_template_description' => ___elementor_adapter('Your designs will be available for export and reuse on any page or website', 'elementor'),
                'section' => ___elementor_adapter('Section', 'elementor'),
                'templates_empty_message' => ___elementor_adapter('This is where your templates should be. Design it. Save it. Reuse it.', 'elementor'),
                'templates_empty_title' => ___elementor_adapter('Haven’t Saved Templates Yet?', 'elementor'),
                'templates_no_favorites_message' => ___elementor_adapter('You can mark any pre-designed template as a favorite.', 'elementor'),
                'templates_no_favorites_title' => ___elementor_adapter('No Favorite Templates', 'elementor'),
                'templates_no_results_message' => ___elementor_adapter('Please make sure your search is spelled correctly or try a different words.', 'elementor'),
                'templates_no_results_title' => ___elementor_adapter('No Results Found', 'elementor'),
                'templates_request_error' => ___elementor_adapter('The following error(s) occurred while processing the request:', 'elementor'),
                'yes' => ___elementor_adapter('Yes', 'elementor'),

                // Incompatible Device.
                'device_incompatible_header' => ___elementor_adapter('Your browser isn\'t compatible', 'elementor'),
                'device_incompatible_message' => ___elementor_adapter('Your browser isn\'t compatible with all of Elementor\'s editing features. We recommend you switch to another browser like Chrome or Firefox.', 'elementor'),
                'proceed_anyway' => ___elementor_adapter('Proceed Anyway', 'elementor'),

                // Preview not loaded.
                'learn_more' => ___elementor_adapter('Learn More', 'elementor'),
                'preview_el_not_found_header' => ___elementor_adapter('Sorry, the content area was not found in your page.', 'elementor'),
                'preview_el_not_found_message' => ___elementor_adapter('You must call \'the_content\' function in the current template, in order for Elementor to work on this page.', 'elementor'),
                'preview_not_loading_header' => ___elementor_adapter('The preview could not be loaded', 'elementor'),
                'preview_not_loading_message' => ___elementor_adapter('We\'re sorry, but something went wrong. Click on \'Learn more\' and follow each of the steps to quickly solve it.', 'elementor'),

                // Gallery.
                'delete_gallery' => ___elementor_adapter('Reset Gallery', 'elementor'),
                'dialog_confirm_gallery_delete' => ___elementor_adapter('Are you sure you want to reset this gallery?', 'elementor'),
                /* translators: %s: The number of images. */
                'gallery_images_selected' => ___elementor_adapter('%s Images Selected', 'elementor'),
                'gallery_no_images_selected' => ___elementor_adapter('No Images Selected', 'elementor'),
                'insert_media' => ___elementor_adapter('Insert Media', 'elementor'),

                // Take Over.
                /* translators: %s: User name. */
                'dialog_user_taken_over' => ___elementor_adapter('%s has taken over and is currently editing. Do you want to take over this page editing?', 'elementor'),
                'go_back' => ___elementor_adapter('Go Back', 'elementor'),
                'take_over' => ___elementor_adapter('Take Over', 'elementor'),

                // Revisions.
                /* translators: %s: Element type. */
                'delete_element' => ___elementor_adapter('Delete %s', 'elementor'),
                /* translators: %s: Template type. */
                'dialog_confirm_delete' => ___elementor_adapter('Are you sure you want to remove this %s?', 'elementor'),

                // Saver.
                'before_unload_alert' => ___elementor_adapter('Please note: All unsaved changes will be lost.', 'elementor'),
                'published' => ___elementor_adapter('Published', 'elementor'),
                'publish' => ___elementor_adapter('Publish', 'elementor'),
                'save' => ___elementor_adapter('Save', 'elementor'),
                'saved' => ___elementor_adapter('Saved', 'elementor'),
                'update' => ___elementor_adapter('Update', 'elementor'),
                'submit' => ___elementor_adapter('Submit', 'elementor'),
                'working_on_draft_notification' => ___elementor_adapter('This is just a draft. Play around and when you\'re done - click update.', 'elementor'),
                'keep_editing' => ___elementor_adapter('Keep Editing', 'elementor'),
                'have_a_look' => ___elementor_adapter('Have a look', 'elementor'),
                'view_all_revisions' => ___elementor_adapter('View All Revisions', 'elementor'),
                'dismiss' => ___elementor_adapter('Dismiss', 'elementor'),
                'saving_disabled' => ___elementor_adapter('Saving has been disabled until you’re reconnected.', 'elementor'),

                // Ajax
                'server_error' => ___elementor_adapter('Server Error', 'elementor'),
                'server_connection_lost' => ___elementor_adapter('Connection Lost', 'elementor'),
                'unknown_error' => ___elementor_adapter('Unknown Error', 'elementor'),

                // Context Menu
                'duplicate' => ___elementor_adapter('Duplicate', 'elementor'),
                'copy' => ___elementor_adapter('Copy', 'elementor'),
                'paste' => ___elementor_adapter('Paste', 'elementor'),
                'copy_style' => ___elementor_adapter('Copy Style', 'elementor'),
                'paste_style' => ___elementor_adapter('Paste Style', 'elementor'),
                'reset_style' => ___elementor_adapter('Reset Style', 'elementor'),
                'save_as_global' => ___elementor_adapter('Save as a Global', 'elementor'),
                'save_as_block' => ___elementor_adapter('Save as Template', 'elementor'),
                'new_column' => ___elementor_adapter('Add New Column', 'elementor'),
                'copy_all_content' => ___elementor_adapter('Copy All Content', 'elementor'),
                'delete_all_content' => ___elementor_adapter('Delete All Content', 'elementor'),

                // Right Click Introduction
                'meet_right_click_header' => ___elementor_adapter('Meet Right Click', 'elementor'),
                'meet_right_click_message' => ___elementor_adapter('Now you can access all editing actions using right click.', 'elementor'),
                'got_it' => ___elementor_adapter('Got It', 'elementor'),

                // TODO: Remove.
                'autosave' => ___elementor_adapter('Autosave', 'elementor'),
                'elementor_docs' => ___elementor_adapter('Documentation', 'elementor'),
                'reload_page' => ___elementor_adapter('Reload Page', 'elementor'),
                'session_expired_header' => ___elementor_adapter('Timeout', 'elementor'),
                'session_expired_message' => ___elementor_adapter('Your session has expired. Please reload the page to continue editing.', 'elementor'),
                'soon' => ___elementor_adapter('Soon', 'elementor'),
                'unknown_value' => ___elementor_adapter('Unknown Value', 'elementor'),
            ],
        ];

        $localized_settings = [];

        $localized_settings = apply_filters_elementor_adapter('elementor/editor/localize_settings', $localized_settings, $id);

        if (!empty($localized_settings)) {
            $config = array_replace_recursive($config, $localized_settings);
        }

        ob_start();
        $this->plugin->editor->wp_footer();
        $tmp_scripts = ob_get_clean();

        $elementor_settings = \Drupal::config('elementor.settings');

        $config = json_encode($config);

        ob_start();

        echo '<script>' . PHP_EOL;
        echo '/* <![CDATA[ */' . PHP_EOL;

        echo 'var _ElementorConfig = ' . $config . ';' . PHP_EOL;
        echo 'Object.assign(ElementorConfig, _ElementorConfig);' . PHP_EOL;
        echo 'var ajaxurl = "/elementor/autosave";' . PHP_EOL; //_ElementorConfig.ajaxurl;' . PHP_EOL;
        echo 'ElementorConfig.document.id = ' . $id . ';' . PHP_EOL;
        echo 'ElementorConfig.document.urls = {
            preview: "/node/1",
            exit_to_dashboard: "/node/1",
        };' . PHP_EOL;

        echo 'ElementorConfig.settings.general.settings.elementor_default_generic_fonts =  "' . $elementor_settings->get('default_generic_fonts') . '";' . PHP_EOL;
        echo 'ElementorConfig.settings.general.settings.elementor_container_width = "' . $elementor_settings->get('container_width') . '";' . PHP_EOL;
        echo 'ElementorConfig.settings.general.settings.elementor_space_between_widgets = "' . $elementor_settings->get('space_between_widgets') . '";' . PHP_EOL;
        echo 'ElementorConfig.settings.general.settings.elementor_stretched_section_container = "' . $elementor_settings->get('stretched_section_container') . '";' . PHP_EOL;

        echo '/* ]]> */' . PHP_EOL;
        echo '</script>';

        $config_data = ob_get_clean();

        return $tmp_scripts . $config_data;
    }

    /**
     * Frontend.
     *
     * Get the frontend css & html (no: js/css assets).
     *
     * @since 1.0.0
     * @access public
     */
    public function frontend($id)
    {
        $elements_data = $this->getData($id);

        $css_file = new DrupalPost_CSS($id);

        ob_start();

        foreach ($elements_data['elements'] as $element_data) {
            $element = $this->plugin->elements_manager->create_element_instance($element_data);

            if (!$element) {
                continue;
            }

            $element->print_element();
            $css_file->render_styles($element);
        }

        $html = ob_get_clean();

        ob_start();
        $css_file->print_css();
        $css = ob_get_clean();

        return $css . $html;
    }

    /**
     * Preview.
     *
     * Get the preview css & html (no: js/css assets).
     *
     * @since 1.0.0
     * @access public
     */
    public function preview($id)
    {
        return [];
    }

    /**
     * General Elementor updater.
     *
     * @since 1.2.0
     * @access public
     */
    public function update($request)
    {
        if ($_POST['action'] == 'elementor_ajax') {
            // Update/Save the data.
            $data = json_decode($_REQUEST['actions'], true);
            $this->setData($_POST['editor_post_id'], $data['save_builder']['data']);
        }
        // Moves the request to the Elmentor .
        return do_ajax_elementor_adapter($_POST['action']);
    }

    /**
     * Plugin constructor.
     *
     * Initializing ElementorDrupal integration.
     *
     * @since 1.0.0
     * @access private
     */
    public function __construct(array $data = [])
    {
        $this->plugin = Plugin::$instance;
        do_action_elementor_adapter('init');

        $this->plugin->ajax = new Drupal_Ajax_Manager();
        $this->plugin->revisions_manager = new Drupal_Revisions_Manager();
        $this->plugin->templates_manager = new Drupal_TemplateLibrary_Manager();

        $this->plugin->documents->register_document_type(
            'DocumentDrupal',
            DocumentDrupal::get_class_full_name()
        );
    }
}

if (!defined('ELEMENTOR_TESTS')) {
    // In tests we run the instance manually.
    ElementorDrupal::instance();
}
