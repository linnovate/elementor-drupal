<?php
/**
 * @file
 * Contains \Drupal\elementor\ElementorDrupal.
 */

namespace Drupal\elementor;

use Drupal\elementor\DocumentDrupal;
use Drupal\elementor\Drupal_Ajax_Manager;
use Drupal\elementor\Drupal_api;
use Drupal\elementor\Drupal_Revisions_Manager;
use Elementor\Core\Files\CSS\Post as Post_CSS;
use Elementor\Editor;
use Elementor\Element_Base;
use Elementor\Plugin;
use Elementor\Schemes_Manager;

class DrupalPost_CSS extends Post_CSS
{
    public function render_styles(Element_Base $element)
    {
        parent::render_styles($element);
    }
}

class ElementorDrupal
{
    private $plugin;

    public static $instance = null;

    public function __construct(array $data = [])
    {
        $this->plugin = Plugin::$instance;
        do_action('init');

        $this->plugin->ajax = new Drupal_Ajax_Manager();
        $this->plugin->revisions_manager = new Drupal_Revisions_Manager();

        Drupal_api::init();

        $this->plugin->documents->register_document_type(
            'DocumentDrupal',
            DocumentDrupal::get_class_full_name()
        );
    }

    public static function instance()
    {
        if (is_null(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function editor_config($uid)
    {
        $data = $this->preview_data($uid);

        $config = [
            'version' => ELEMENTOR_VERSION,
            'ajaxurl' => base_path() . 'elementor/update',
            'home_url' => base_path(),
            'assets_url' => base_path() . 'modules/elementor/elementor/assets/',
            "post_id" => $uid,
            'data' => $data['elements'],
            // 'settings' => $data['settings'],
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
            // 'settings' => SettingsManager::get_settings_managers_config(),
            // 'inlineEditing' => Plugin::$instance->widgets_manager->get_inline_editing_config(),
            // 'dynamicTags' => Plugin::$instance->dynamic_tags->get_config(),
            'i18n' => [
                'elementor' => __('Elementor', 'elementor'),
                'delete' => __('Delete', 'elementor'),
                'cancel' => __('Cancel', 'elementor'),
                /* translators: %s: Element name. */
                'edit_element' => __('Edit %s', 'elementor'),

                // Menu.
                'about_elementor' => __('About Elementor', 'elementor'),
                'color_picker' => __('Color Picker', 'elementor'),
                'elementor_settings' => __('Dashboard Settings', 'elementor'),
                'global_colors' => __('Default Colors', 'elementor'),
                'global_fonts' => __('Default Fonts', 'elementor'),
                'global_style' => __('Style', 'elementor'),
                'settings' => __('Settings', 'elementor'),

                // Elements.
                'inner_section' => __('Columns', 'elementor'),

                // Control Order.
                'asc' => __('Ascending order', 'elementor'),
                'desc' => __('Descending order', 'elementor'),

                // Clear Page.
                'clear_page' => __('Delete All Content', 'elementor'),
                'dialog_confirm_clear_page' => __('Attention: We are going to DELETE ALL CONTENT from this page. Are you sure you want to do that?', 'elementor'),

                // Panel Preview Mode.
                'back_to_editor' => __('Show Panel', 'elementor'),
                'preview' => __('Hide Panel', 'elementor'),

                // Inline Editing.
                'type_here' => __('Type Here', 'elementor'),

                // Library.
                'an_error_occurred' => __('An error occurred', 'elementor'),
                'category' => __('Category', 'elementor'),
                'delete_template' => __('Delete Template', 'elementor'),
                'delete_template_confirm' => __('Are you sure you want to delete this template?', 'elementor'),
                'import_template_dialog_header' => __('Import Document Settings', 'elementor'),
                'import_template_dialog_message' => __('Do you want to also import the document settings of the template?', 'elementor'),
                'import_template_dialog_message_attention' => __('Attention: Importing may override previous settings.', 'elementor'),
                'library' => __('Library', 'elementor'),
                'no' => __('No', 'elementor'),
                'page' => __('Page', 'elementor'),
                /* translators: %s: Template type. */
                'save_your_template' => __('Save Your %s to Library', 'elementor'),
                'save_your_template_description' => __('Your designs will be available for export and reuse on any page or website', 'elementor'),
                'section' => __('Section', 'elementor'),
                'templates_empty_message' => __('This is where your templates should be. Design it. Save it. Reuse it.', 'elementor'),
                'templates_empty_title' => __('Haven’t Saved Templates Yet?', 'elementor'),
                'templates_no_favorites_message' => __('You can mark any pre-designed template as a favorite.', 'elementor'),
                'templates_no_favorites_title' => __('No Favorite Templates', 'elementor'),
                'templates_no_results_message' => __('Please make sure your search is spelled correctly or try a different words.', 'elementor'),
                'templates_no_results_title' => __('No Results Found', 'elementor'),
                'templates_request_error' => __('The following error(s) occurred while processing the request:', 'elementor'),
                'yes' => __('Yes', 'elementor'),

                // Incompatible Device.
                'device_incompatible_header' => __('Your browser isn\'t compatible', 'elementor'),
                'device_incompatible_message' => __('Your browser isn\'t compatible with all of Elementor\'s editing features. We recommend you switch to another browser like Chrome or Firefox.', 'elementor'),
                'proceed_anyway' => __('Proceed Anyway', 'elementor'),

                // Preview not loaded.
                'learn_more' => __('Learn More', 'elementor'),
                'preview_el_not_found_header' => __('Sorry, the content area was not found in your page.', 'elementor'),
                'preview_el_not_found_message' => __('You must call \'the_content\' function in the current template, in order for Elementor to work on this page.', 'elementor'),
                'preview_not_loading_header' => __('The preview could not be loaded', 'elementor'),
                'preview_not_loading_message' => __('We\'re sorry, but something went wrong. Click on \'Learn more\' and follow each of the steps to quickly solve it.', 'elementor'),

                // Gallery.
                'delete_gallery' => __('Reset Gallery', 'elementor'),
                'dialog_confirm_gallery_delete' => __('Are you sure you want to reset this gallery?', 'elementor'),
                /* translators: %s: The number of images. */
                'gallery_images_selected' => __('%s Images Selected', 'elementor'),
                'gallery_no_images_selected' => __('No Images Selected', 'elementor'),
                'insert_media' => __('Insert Media', 'elementor'),

                // Take Over.
                /* translators: %s: User name. */
                'dialog_user_taken_over' => __('%s has taken over and is currently editing. Do you want to take over this page editing?', 'elementor'),
                'go_back' => __('Go Back', 'elementor'),
                'take_over' => __('Take Over', 'elementor'),

                // Revisions.
                /* translators: %s: Element type. */
                'delete_element' => __('Delete %s', 'elementor'),
                /* translators: %s: Template type. */
                'dialog_confirm_delete' => __('Are you sure you want to remove this %s?', 'elementor'),

                // Saver.
                'before_unload_alert' => __('Please note: All unsaved changes will be lost.', 'elementor'),
                'published' => __('Published', 'elementor'),
                'publish' => __('Publish', 'elementor'),
                'save' => __('Save', 'elementor'),
                'saved' => __('Saved', 'elementor'),
                'update' => __('Update', 'elementor'),
                'submit' => __('Submit', 'elementor'),
                'working_on_draft_notification' => __('This is just a draft. Play around and when you\'re done - click update.', 'elementor'),
                'keep_editing' => __('Keep Editing', 'elementor'),
                'have_a_look' => __('Have a look', 'elementor'),
                'view_all_revisions' => __('View All Revisions', 'elementor'),
                'dismiss' => __('Dismiss', 'elementor'),
                'saving_disabled' => __('Saving has been disabled until you’re reconnected.', 'elementor'),

                // Ajax
                'server_error' => __('Server Error', 'elementor'),
                'server_connection_lost' => __('Connection Lost', 'elementor'),
                'unknown_error' => __('Unknown Error', 'elementor'),

                // Context Menu
                'duplicate' => __('Duplicate', 'elementor'),
                'copy' => __('Copy', 'elementor'),
                'paste' => __('Paste', 'elementor'),
                'copy_style' => __('Copy Style', 'elementor'),
                'paste_style' => __('Paste Style', 'elementor'),
                'reset_style' => __('Reset Style', 'elementor'),
                'save_as_global' => __('Save as a Global', 'elementor'),
                'save_as_block' => __('Save as Template', 'elementor'),
                'new_column' => __('Add New Column', 'elementor'),
                'copy_all_content' => __('Copy All Content', 'elementor'),
                'delete_all_content' => __('Delete All Content', 'elementor'),

                // Right Click Introduction
                'meet_right_click_header' => __('Meet Right Click', 'elementor'),
                'meet_right_click_message' => __('Now you can access all editing actions using right click.', 'elementor'),
                'got_it' => __('Got It', 'elementor'),

                // TODO: Remove.
                'autosave' => __('Autosave', 'elementor'),
                'elementor_docs' => __('Documentation', 'elementor'),
                'reload_page' => __('Reload Page', 'elementor'),
                'session_expired_header' => __('Timeout', 'elementor'),
                'session_expired_message' => __('Your session has expired. Please reload the page to continue editing.', 'elementor'),
                'soon' => __('Soon', 'elementor'),
                'unknown_value' => __('Unknown Value', 'elementor'),
            ],
        ];

        $localized_settings = [];

        $localized_settings = apply_filters('elementor/editor/localize_settings', $localized_settings, $this->_post_id);

        if (!empty($localized_settings)) {
            $config = array_replace_recursive($config, $localized_settings);
        }

        ob_start();
        $this->plugin->editor->wp_footer();
        $tmp_scripts = ob_get_clean();

        return ['config' => $config, 'tmp_scripts' => $tmp_scripts];
    }

    private function preview_data($uid)
    {
        $elements_data = $this->getData($uid);

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

    private function setData($uid, $data)
    {
        $connection = \Drupal::database();
        $item = $connection->query("SELECT id FROM elementor_data WHERE uid = " . $uid)
            ->fetch();

        date_default_timezone_set("UTC");

        $connection->insert('elementor_data')
            ->fields([
                'uid' => $uid,
                'author' => 'admin',
                'timestamp' => time(),
                'data' => json_encode($data),
            ])
            ->execute();
    }

    private function getData($uid)
    {
        $connection = \Drupal::database();
        $result = $connection->query("SELECT data FROM elementor_data WHERE uid = " . $uid)
            ->fetch();
        return json_decode($result->data, true);
    }

    public function update($request)
    {
        if ($_POST['action'] == 'elementor_ajax') {
            $data = json_decode($_REQUEST['actions'], true);
            $this->setData($_POST['editor_post_id'], $data['save_builder']['data']);
        }

        return do_ajax($_POST['action']);
    }

    public function editor()
    {
        $uid = \Drupal::routeMatch()->getParameter('node');

        $editor = $this->editor_config($uid);
        $elementor_settings = \Drupal::config('elementor.settings');

        $config = json_encode($editor['config']);

        ob_start();

        echo '<script>' . PHP_EOL;
        echo '/* <![CDATA[ */' . PHP_EOL;

        echo 'var _ElementorConfig = ' . $config . ';' . PHP_EOL;
        echo 'Object.assign(ElementorConfig, _ElementorConfig);' . PHP_EOL;
        echo 'var ajaxurl = "/elementor/autosave";' . PHP_EOL; //_ElementorConfig.ajaxurl;' . PHP_EOL;
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

        return $editor['tmp_scripts'] . $config_data;
    }

    public function preview($uid)
    {
        return [];
    }

    public function frontend($uid)
    {
        $elements_data = $this->getData($uid);

        $css_file = new DrupalPost_CSS($uid);

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
}

ElementorDrupal::instance();
