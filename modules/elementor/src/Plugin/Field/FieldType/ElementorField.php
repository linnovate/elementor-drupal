<?php

namespace Drupal\elementor\Plugin\Field\FieldType;

use Drupal\Core\Field\FieldDefinitionInterface;
use Drupal\Core\Field\FieldItemBase;
use Drupal\Core\Field\FieldStorageDefinitionInterface;
use Drupal\Core\TypedData\DataDefinition;
use Drupal\Core\Form\FormStateInterface;
/**
 * Plugin implementation of the 'timezone' field type.
 *
 * @FieldType(
 *   id = "elementor_field",
 *   label = @Translation("Elementor"),
 *   description = @Translation("This field stores a 'Elementor' data."),
 *   default_widget = "elementor_field_default",
 *   default_formatter = "basic_string"
 * )
 */
class ElementorField extends FieldItemBase {

  /**
   * {@inheritdoc}
   */
  public static function schema(FieldStorageDefinitionInterface $field_definition) {
    return array(
      'columns' => array(
        'value' => array(
          'type' => 'text',
        ),
      ),
    );
  }

  /**
   * {@inheritdoc}
   */
  public static function propertyDefinitions(FieldStorageDefinitionInterface $field_definition) {
    $properties = [];
    $properties['value'] = DataDefinition::create('string')->setLabel(t('Style Classes'));

    return $properties;
  }

  /**
   * {@inheritdoc}
   */
  public function isEmpty() {
    $value = $this->get('value')->getValue();
    return $value === NULL || $value === '';
  }

  /**
   * {@inheritdoc}
   */
  public static function defaultFieldSettings() {
    return [
      // Declare a single setting, 'size', with a default
      'style_classes' => '',
    ] + parent::defaultFieldSettings();
  }
  
   /**
    * {@inheritdoc}
    */
  public function fieldSettingsForm(array $form, FormStateInterface $form_state) {
    
    $element = [];

    $element['style_classes'] = [
      '#title' => $this->t('Style Classes'),
      '#type' => 'textarea',
      '#rows' => 10,
      '#cols' => 30,
      '#resizable' => TRUE,
      '#default_value' => $this->getSetting('style_classes'),
    ];

    return $element;
  }

  /**
   * {@inheritdoc}
   */
  public static function generateSampleValue(FieldDefinitionInterface $field_definition) {
    return $values;
  }


}
