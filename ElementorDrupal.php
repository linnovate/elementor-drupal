<?php
/**
 * @file
 * Contains \Drupal\elementor\ElementorDrupal.
 */

namespace Drupal\elementor;

use Elementor\Plugin;
use Elementor\Schemes_Manager;

class ElementorDrupal
{

    public static function editor_config_script_tags()
    {
        $plugin = Plugin::$instance;

        $config = [
            'version' => '2.0.16',
            'ajaxurl' => base_path() . 'elementor/update',
            'home_url' => base_path(),
            'assets_url' => base_path() . 'modules/elementor/elementor/assets',
            // 'wp_preview' => '',
            // 'data' => $editor_data,
            'elements' => $plugin->elements_manager->get_element_types_config(),
            'elements_categories' => $plugin->elements_manager->get_categories(),
            'controls' => $plugin->controls_manager->get_controls_data(),
            'widgets' => $plugin->widgets_manager->get_widget_types_config(),
            'schemes' => [
                'items' => $plugin->schemes_manager->get_registered_schemes_data(),
                'enabled_schemes' => Schemes_Manager::get_enabled_schemes(),
            ],
            'default_schemes' => $plugin->schemes_manager->get_schemes_defaults(),
            'system_schemes' => $plugin->schemes_manager->get_system_schemes(),
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
        ob_start();

        foreach ($elements_data['elements'] as $element_data) {
            $element = Plugin::$instance->elements_manager->create_element_instance($element_data);

            if (!$element) {
                continue;
            }

            $element->print_element();
        }

        $tmp = ob_get_clean();

        return $tmp;
    }
}
