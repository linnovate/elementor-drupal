<?php

namespace Drupal\elementor\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FormatterBase;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Component\Utility\Html;
use Drupal\Core\Field\FieldDefinitionInterface;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Plugin implementation of the 'live_weather_token' formatter.
 *
 * @FieldFormatter(
 *   id = "elementor_field",
 *   label = @Translation("show elementor"),
 *   field_types = {
 *     "elementor_field"
 *   }
 * )
 */
 
class ElementorFormatter extends FormatterBase implements ContainerFactoryPluginInterface {
  
  protected $configFactory;

  protected $liveWeather;



public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
  return new static(
    $plugin_id,
    $plugin_definition,
    $configuration['field_definition'],
    $configuration['settings'],
    $configuration['label'],
    $configuration['view_mode'],
    $configuration['third_party_settings'],
    // Add any services you want to inject here
  	$container->get('config.factory')
//   	$container->get('live_weather.controller')
  );
}



	public function __construct($plugin_id, $plugin_definition, FieldDefinitionInterface $field_definition, array $settings, $label, $view_mode, array $third_party_settings, ConfigFactoryInterface $config_factory) {
	  parent::__construct($plugin_id, $plugin_definition, $field_definition, $settings, $label, $view_mode, $third_party_settings);

	  $this->configFactory = $config_factory;

	}


  /**
   * {@inheritdoc}
   */
  public function settingsSummary() {
    $summary = [];
    $settings = $this->getSettings();

    $summary[] = t('Displays the random string.');

    return $summary;
  }


  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $elements = array();

//     $settings = $this->configFactory->get('live_weather.settings')->get('settings');

	$html = array();

// 	$feed = $this->liveWeather->locationCheck($items[0]->value, ' * ', strtolower($settings['unit']));

// 	$result = $feed['query']['results']['channel'];

// 	$html[0]['weather'] = $result['item']['condition'];
// 	$html[0]['unit'] = $settings['unit'];
    $elementorData = \Drupal::state()->get('elementor_data');
    $elements[] = array(
	  '#theme' => 'elementor_field',
      '#elementor_data' => $elementorData,
// 	  '#cache' => array('max-age' => $settings['cache']),
	);

    return $elements;
  }

}
