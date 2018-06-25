<?php
/**
 * @file
 * Contains \Drupal\elementor\Controller\ElementorController.
 */

namespace Drupal\elementor\Controller;

use Drupal;

use Drupal\user\Entity\User;
use Drupal\user\UserInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\Response;
use Drupal\Core\DependencyInjection\ContainerInjectionInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Template\TwigEnvironment;

class ElementorController extends ControllerBase implements ContainerInjectionInterface {
 
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

  public function update(Request $request) {
    // \Drupal::config('elementor.data')
    //   ->set('data',$request->getContent())
    //   ->save();
    // $data = $_POST["actions"];//urldecode($request->getContent());


// 		$document = $this->get( $request['editor_post_id'] );

// 		$data = [
// 			'elements' => $request['elements'],
// 			'settings' => $request['settings'],
// 		];




    $data = json_decode($_POST["actions"]);
    $action = $_POST['action'];
    $save_data = [
			'elements' => isset($data->save_builder->data->elements) ? $data->save_builder->data->elements : [],
			'settings' => isset($data->save_builder->data->settings) ? $data->save_builder->data->settings : [],
			'tmp' => isset($data->save_builder->data->tmp) ? $data->save_builder->data->tmp : [],
		];

    if ($action == 'elementor_ajax') {
     \Drupal::state()->set('elementor_data', $save_data); 
    }
   
	$return_data['statusText'] = TRUE;
	$return_data['config'] = [
		'last_edited' => '',
		'wp_preview' => [
			'url' => '',
		],
	];

    return new JsonResponse($return_data);
 
  }

  public function editor(Request $request) {
//     $path = $_GET["path"];
//     \Drupal::state()->set('elementor_data', []); 

    $path = \Drupal::service('file_system')->realpath((drupal_get_path('module', 'elementor') . '/templates/tmps-elementor.html.twig'));
    $tmp = file_get_contents($path);

    $template = $this->twig->loadTemplate(
      drupal_get_path('module', 'elementor') . '/templates/elementor-editor.html.twig'
    );
    $tmp = $template->render([tmps => $tmp, base_path => base_path()]);

    $response = new Response();
    $response->setContent($tmp);
    return $response;
  }
}
