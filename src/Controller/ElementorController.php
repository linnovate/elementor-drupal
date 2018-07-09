<?php
/**
 * @file
 * Contains \Drupal\elementor\Controller\ElementorController.
 */

namespace Drupal\elementor\Controller;

use Drupal;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\DependencyInjection\ContainerInjectionInterface;
use Drupal\Core\Template\TwigEnvironment;
use Drupal\elementor\ElementorDrupal;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ElementorController extends ControllerBase implements ContainerInjectionInterface
{

    /**
    * @var Drupal\Core\Template\TwigEnvironment
    */
    protected $twig;

    public function __construct(TwigEnvironment $twig)
    {
        $this->twig = $twig;
    }

    public static function create(ContainerInterface $container)
    {
        return new static(
            $container->get('twig')
        );
    }

    public function update(Request $request)
    {
        $action = $_POST['action'];

        $data = json_decode($_REQUEST['actions'], true);

        if ($action == 'elementor_ajax') {
            \Drupal::state()->set('elementor_data', $data['save_builder']['data']);
        }

        $return_data['statusText'] = true;
        $return_data['config'] = [
            'last_edited' => '',
            'wp_preview' => [
                'url' => '',
            ],
        ];

        return new JsonResponse($return_data);
    }

    public function editor(Request $request)
    {
        // \Drupal::state()->set('elementor_data', NULL);

        $template = $this->twig->loadTemplate(drupal_get_path('module', 'elementor') . '/templates/elementor-editor.html.twig');

        $config_scripts = ElementorDrupal::editor_config_script_tags();

        $html = $template->render([
            elementor_data => $config_scripts,
            base_path => base_path(),
        ]);

        $response = new Response();
        $response->setContent($html);

        return $response;
    }
}
