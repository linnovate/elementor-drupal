<?php
namespace Drupal\elementor\Plugin\Field\FieldWidget;
use Drupal\Core\Field\WidgetBase;
use Drupal\Core\Field\WidgetInterface;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Form\FormStateInterface;
/**
 * Field widget "elementor_field_default".
 *
 * @FieldWidget(
 *   id = "elementor_field_default",
 *   label = @Translation("Elementor"),
 *   field_types = {
 *     "elementor_field",
 *   }
 * )
 */
class ElementorWidget extends WidgetBase implements WidgetInterface {

  /**
   * {@inheritdoc}
   */
  public static function defaultSettings() {
    return [
      'style_classes' => '',
    ] + parent::defaultSettings();
  }

  public function settingsForm(array $form, FormStateInterface $form_state)
  {
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
  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state) {
    // Load burrito_maker.toppincs.inc file for reading topping data.

    // $item is where the current saved values are stored.
    $item =& $items[$delta];

    $stylesOptions = !empty($this->getSetting('style_classes')) ? explode("\n", $this->getSetting('style_classes')) : [];
    $stylesList = [];
    for ($i = 0; $i < count($stylesOptions); $i++) {
      list($label, $class) = explode("|", $stylesOptions[$i]);
      $stylesList[$class] = $label;
    }
    $element['value'] = array(
      '#title' => t('Style Classes'),
      '#type' => 'select',
      '#empty_option' => t('-- None --'),
      // Use #default_value to pre-populate the element
      // with the current saved value.
      '#options' => $stylesList,
      '#default_value' => isset($item->value) ? $item->value : '',
    );
 
    return $element;
  }

  /**
   * {@inheritdoc}
   */
  public function settingsSummary() {
    $summary = [];
    $summary[] = t('Style Classes: @style_classes', ['@style_classes' => $this->getSetting('style_classes')]);
    return $summary;
  }


  /**
   * Form widget process callback.
   */
  public static function processToppingsFieldset($element, FormStateInterface $form_state, array $form) {
    // The last fragment of the name, i.e. meat|toppings is not required
    // for structuring of values.
    ///$elem_key = !empty($element['#parents']) ? array_pop($element['#parents']) : [];
    return $element;
  }


}
