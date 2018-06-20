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
use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\Response;

class ElementorController extends ControllerBase {

  public function post(Request $request) {
    // \Drupal::config('elementor.data')
    //   ->set('data',$request->getContent())
    //   ->save();
    // $data = $_POST["actions"];//urldecode($request->getContent());
    $data = json_decode($_POST["actions"]);
  
    if ($_POST['action'] == 'elementor_ajax') {
     \Drupal::state()->set('elementor_data', $data->save_builder->data); 
    }
    // $body_field = $entity->get('elementor');
//     $field_value = $body_field->getValue();
//     $field_value[0]['value'] = 'aafdfd';
//     $body_field->setValue($field_value, TRUE);
//     $entity.save();
    return new JsonResponse($request->getContent());
 
  }
 
  public function editor(Request $request) {
    $path = $_GET["path"];
    
    $tmp = file_get_contents('file:///home/stein/devel/drupal/modules/elementor/q-elementor/index.html');
  //   \Drupal::state()->set('elementor_data', $data->save_builder->data); 
    // $body_field = $entity->get('elementor');
//     $field_value = $body_field->getValue();
//     $field_value[0]['value'] = 'aafdfd';
//     $body_field->setValue($field_value, TRUE);
//     $entity.save();

// $build = [
//   // '#theme' => 'elementor_editor',
//   '#markup' => '',
// ];

    // $build['view'] = [
    //   '#type' => 'view',
    //   '#name' => 'my_view',
    //   '#display_id' => 'block_1',
    //   '#arguments' => $view_arguments,
    // ];

    // $rendered = \Drupal::service('renderer')->renderRoot($build);

    $response = new Response();
    $response->setContent($tmp);
    return $response;
  }
}
