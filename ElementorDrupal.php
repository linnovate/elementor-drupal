<?php
/**
 * @file
 * Contains \Drupal\elementor\ElementorDrupal.
 */

namespace Drupal\elementor;

use Elementor\Core\Files\CSS\Post as Post_CSS;
use Elementor\Element_Base;
use Elementor\Plugin;
use Elementor\Schemes_Manager;

class DrupalPost extends Post_CSS
{
    public function render_styles(Element_Base $element)
    {
        parent::render_styles($element);
    }
}

class ElementorDrupal
{

    public static function editor_config_script_tags()
    {
        $plugin = Plugin::$instance;
        $plugin->init();

        $config = [
            'version' => ELEMENTOR_VERSION,
            'ajaxurl' => base_path() . 'elementor/update',
            'home_url' => base_path(),
            'assets_url' => base_path() . 'modules/elementor/elementor/assets/',
            // 'data' => $editor_data,
            'elements' => $plugin->elements_manager->get_element_types_config(),
            'elements_categories' => $plugin->elements_manager->get_categories(),
            'controls' => $plugin->controls_manager->get_controls_data(),
            'elements' => $plugin->elements_manager->get_element_types_config(),
            'widgets' => $plugin->widgets_manager->get_widget_types_config(),
            'schemes' => [
                'items' => $plugin->schemes_manager->get_registered_schemes_data(),
                'enabled_schemes' => Schemes_Manager::get_enabled_schemes(),
            ],
            'default_schemes' => $plugin->schemes_manager->get_schemes_defaults(),
            'system_schemes' => $plugin->schemes_manager->get_system_schemes(),
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

        ob_start();

        echo '<script>' . PHP_EOL;
        echo '/* <![CDATA[ */' . PHP_EOL;
        $config_json = json_encode($config);
        unset($config);

        if (get_option('elementor_editor_break_lines')) {
            // Add new lines to avoid memory limits in some hosting servers that handles the buffer output according to new line characters
            $config_json = str_replace('}},"', '}},' . PHP_EOL . '"', $config_json);
        }

        echo 'var _ElementorConfig = ' . $config_json . ';' . PHP_EOL;
        echo '/* ]]> */' . PHP_EOL;
        echo '</script>';

        $config_script = ob_get_clean();

        ob_start();

        $plugin->controls_manager->render_controls();
        $plugin->widgets_manager->render_widgets_content();
        $plugin->elements_manager->render_elements_content();
        $plugin->schemes_manager->print_schemes_templates();
        $plugin->dynamic_tags->print_templates();

        $template_names = [
            'global',
            'panel',
            'panel-elements',
            'repeater',
            'templates',
        ];

        foreach ($template_names as $template_name) {
            include ELEMENTOR_PATH . "includes/editor-templates/$template_name.php";
        }

        $tmp_scripts = ob_get_clean();

        return $tmp_scripts . $config_script;
    }

    public static function preview_data($elements_data)
    {
        $data = [
            'elements' => isset($elements_data['elements']) ? $elements_data['elements'] : [],
            'settings' => isset($elements_data['settings']) ? $elements_data['settings'] : [],
        ];

        return $data;
    }

    public static function frontend_data_render($elements_data)
    {
        $plugin = Plugin::$instance;
        $plugin->init();

        $css_file = new DrupalPost();
        $css_file->enqueue();

        ob_start();

        foreach ($elements_data['elements'] as $element_data) {
            $element = $plugin->elements_manager->create_element_instance($element_data);

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
