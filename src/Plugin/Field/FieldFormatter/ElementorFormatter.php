<?php

namespace Drupal\elementor\Plugin\Field\FieldFormatter;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Field\FieldDefinitionInterface;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FormatterBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\elementor\ElementorDrupal;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Plugin implementation of the 'live_weather_token' formatter.
 *
 * @FieldFormatter(
 *   id = "elementor_field",
 *   label = @Translation("show elementor"),
 *   field_types = {
 *     "elementor_field",
 *     "text_long",
 *     "text_with_summary"
 *   }
 * )
 */

class ElementorFormatter extends FormatterBase implements ContainerFactoryPluginInterface
{

    protected $configFactory;

    public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition)
    {
        return new static(
            $plugin_id,
            $plugin_definition,
            $configuration['field_definition'],
            $configuration['settings'],
            $configuration['label'],
            $configuration['view_mode'],
            $configuration['third_party_settings'],
            $container->get('config.factory')
        );
    }

    public function __construct($plugin_id, $plugin_definition, FieldDefinitionInterface $field_definition, array $settings, $label, $view_mode, array $third_party_settings, ConfigFactoryInterface $config_factory)
    {
        parent::__construct($plugin_id, $plugin_definition, $field_definition, $settings, $label, $view_mode, $third_party_settings);

        $this->configFactory = $config_factory;
    }

/**
 * {@inheritdoc}
 */
    public function settingsSummary()
    {
        $summary = [];
        $settings = $this->getSettings();

        $summary[] = t('Displays the random string.');

        return $summary;
    }

/**
 * {@inheritdoc}
 */
    public function viewElements(FieldItemListInterface $items, $langcode)
    {
        $dataSaved = \Drupal::state()->get('elementor_data');

        $frontend_data = ElementorDrupal::frontend_data_render($dataSaved);

        $preview_data = ElementorDrupal::preview_data($dataSaved);

        $elements = array();

        $elements[] = array(
            '#theme' => 'elementor_field',
            '#elementor_data' => $preview_data,
            '#base_path' => base_path(),
            '#elementor_tmp' => $frontend_data,
            '#cache' => array('max-age' => 0),
        );

        return $elements;
    }

}
