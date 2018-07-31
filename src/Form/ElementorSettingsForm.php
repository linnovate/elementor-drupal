<?php
/**
 * @file
 * Contains \Drupal\elementor\Form\ElementorSettingsForm.
 */

namespace Drupal\elementor\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Controller location for Live Weather Settings Form.
 */
class ElementorSettingsForm extends ConfigFormBase
{

    /**
     * Implements \Drupal\Core\Form\FormInterface::getFormID().
     */
    public function getFormId()
    {
        return 'elementor_settings_form';
    }

    /**
     * {@inheritdoc}
     */
    protected function getEditableConfigNames()
    {
        return [
            'elementor.settings',
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function buildForm(array $form, FormStateInterface $form_state)
    {
        $settings = $this->configFactory->get('elementor.settings');

        $node_types = \Drupal\node\Entity\NodeType::loadMultiple();
        $node_types_options = [];
        foreach ($node_types as $node_type) {
            $node_types_options[$node_type->id()] = $node_type->label();
        }

        $form['tabs'] = [
            '#type' => 'horizontal_tabs',
        ];

        /* =========================   general  ========================= */

        $form['general'] = [
            '#type' => 'fieldset',
            '#title' => t('General'),
            '#group' => 'tabs',
        ];

        $form['general']['node_types'] = array(
            '#type' => 'checkboxes',
            '#title' => 'Node types',
            '#options' => $node_types_options,
            '#default_value' => $settings->get('node_types'),
            '#description' => t('List of  node types.'),
            '#group' => 'general',
        );

        $form['general']['disable_color_schemes'] = array(
            '#type' => 'checkbox',
            '#title' => 'Disable Default Colors',
            '#default_value' => $settings->get('disable_color_schemes'),
            '#description' => t("Checking this box will disable Elementor's Default Colors, and make Elementor inherit the colors from your theme."),
            '#group' => 'general',
        );

        $form['general']['disable_typography_schemes'] = array(
            '#type' => 'checkbox',
            '#title' => 'Disable Default Fonts',
            '#default_value' => $settings->get('disable_typography_schemes'),
            '#description' => t("Checking this box will disable Elementor's Default Fonts, and make Elementor inherit the fonts from your theme."),
            '#group' => 'general',
        );

        /* =========================   general  ========================= */

        $form['style'] = [
            '#type' => 'fieldset',
            '#title' => t('Style'),
            '#group' => 'tabs',
        ];

        $form['style']['default_generic_fonts'] = array(
            '#type' => 'textfield',
            '#title' => 'Default Generic Fonts',
            '#default_value' => $settings->get('default_generic_fonts') ? $settings->get('default_generic_fonts') : 'Sans-serif',
            '#description' => t("The list of fonts used if the chosen font is not available."),
            '#group' => 'style',
        );

        $form['style']['container_width'] = array(
            '#type' => 'number',
            '#title' => 'Content Width',
            '#default_value' => $settings->get('container_width'),
            '#placeholder' => 1140,
            '#field_suffix' => 'px',
            '#description' => t("Sets the default width of the content area (Default: 1140)"),
            '#group' => 'style',
        );

        $form['style']['space_between_widgets'] = array(
            '#type' => 'number',
            '#title' => 'Space Between Widgets',
            '#default_value' => $settings->get('space_between_widgets'),
            '#placeholder' => 20,
            '#field_suffix' => 'px',
            '#description' => t("Sets the default space between widgets (Default: 20)"),
            '#group' => 'style',
        );

        $form['style']['stretched_section_container'] = array(
            '#type' => 'textfield',
            '#title' => 'Stretched Section Fit To',
            '#default_value' => $settings->get('stretched_section_container'),
            '#placeholder' => 'body',
            '#description' => t("Enter parent element selector to which stretched sections will fit to (e.g. #primary / .wrapper / main etc). Leave blank to fit to page width."),
            '#group' => 'style',
        );

        $form['style']['viewport_lg'] = array(
            '#type' => 'number',
            '#title' => 'Tablet Breakpoint',
            '#default_value' => $settings->get('viewport_lg'),
            '#placeholder' => 1025,
            '#field_suffix' => 'px',
            '#description' => t("Sets the breakpoint between desktop and tablet devices. Below this breakpoint tablet layout will appear (Default: 1025)."),
            '#group' => 'style',
        );

        $form['style']['viewport_md'] = array(
            '#type' => 'number',
            '#title' => 'Mobile Breakpoint',
            '#default_value' => $settings->get('viewport_md'),
            '#placeholder' => 768,
            '#field_suffix' => 'px',
            '#description' => t("Sets the breakpoint between tablet and mobile devices. Below this breakpoint mobile layout will appear (Default: 768)."),
            '#group' => 'style',
        );

        return parent::buildForm($form, $form_state);
    }

    /**
     * {@inheritdoc}
     */
    public function validateForm(array &$form, FormStateInterface $form_state)
    {
    }

    /**
     * {@inheritdoc}
     */
    public function submitForm(array &$form, FormStateInterface $form_state)
    {
        $checked = array();
        foreach ($form_state->getValue('node_types') as $key => $val) {
            array_push($checked, $val);
        }
        $this->config('elementor.settings')->set('node_types', $checked)->save();

        foreach ($form_state->getValues() as $key => $val) {
            if ($key != 'node_types') {
                $this->config('elementor.settings')->set($key, $val)->save();
            }
        }

        parent::submitForm($form, $form_state);
        
        drupal_flush_all_caches();
    }

}
