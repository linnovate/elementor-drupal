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

        $form['general']['disable_default_colors'] = array(
            '#type' => 'checkbox',
            '#title' => 'Disable Default Colors',
            '#default_value' => $settings->get('disable_default_colors'),
            '#description' => t("Checking this box will disable Elementor's Default Colors, and make Elementor inherit the colors from your theme."),
            '#group' => 'general',
        );

        $form['general']['disable_default_fonts'] = array(
            '#type' => 'checkbox',
            '#title' => 'Disable Default Fonts',
            '#default_value' => $settings->get('disable_default_fonts'),
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
            '#type' => 'text',
            '#title' => 'Default Generic Fonts',
            '#default_value' => $settings->get('default_generic_fonts'),
            '#description' => t("The list of fonts used if the chosen font is not available."),
            '#group' => 'style',
        );

        $form['style']['content_width'] = array(
            '#type' => 'number',
            '#title' => 'Content Width',
            '#default_value' => $settings->get('content_width'),
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

        $form['style']['stretched_section_fit_to'] = array(
            '#type' => 'textfield',
            '#title' => 'Stretched Section Fit To',
            '#default_value' => $settings->get('stretched_section_fit_to'),
            '#placeholder' => 'body',
            '#description' => t("Enter parent element selector to which stretched sections will fit to (e.g. #primary / .wrapper / main etc). Leave blank to fit to page width."),
            '#group' => 'style',
        );

        $form['style']['tablet_breakpoint'] = array(
            '#type' => 'number',
            '#title' => 'Tablet Breakpoint',
            '#default_value' => $settings->get('tablet_breakpoint'),
            '#placeholder' => 1025,
            '#field_suffix' => 'px',
            '#description' => t("Sets the breakpoint between desktop and tablet devices. Below this breakpoint tablet layout will appear (Default: 1025)."),
            '#group' => 'style',
        );

        $form['style']['mobile_breakpoint'] = array(
            '#type' => 'number',
            '#title' => 'Mobile Breakpoint',
            '#default_value' => $settings->get('mobile_breakpoint'),
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
        foreach ($form_state->getValue('general')['node_types'] as $key => $val) {
            array_push($checked, $val);
        }
        $this->config('elementor.settings')->set('node_types', $checked)->save();

        foreach ($form_state->getValue('general') as $key => $val) {
          if ($key != 'node_types') {
              $this->config('elementor.settings')->set($key, $val)->save();
          }
      }
        foreach ($form_state->getValue('style') as $key => $val) {
            $this->config('elementor.settings')->set($key, $val)->save();
        }

        parent::submitForm($form, $form_state);
    }

}
