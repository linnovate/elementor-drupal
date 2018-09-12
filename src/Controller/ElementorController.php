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
use Drupal\elementor\ElementorPlugin;
use Drupal\file\Entity\File;
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

    public function autosave(Request $request)
    {
        // $return_data = do_action($_POST['action']);
        // return new JsonResponse($return_data);
        return new Response('', Response::HTTP_NOT_FOUND);
    }

    public function update(Request $request)
    {
        $return_data = ElementorPlugin::$instance->update($request);
        return new JsonResponse($return_data);
    }

    public function editor(Request $request)
    {
        $id = \Drupal::routeMatch()->getParameter('node');
        $editor_data = ElementorPlugin::$instance->editor($id);

        $template = $this->twig->loadTemplate(drupal_get_path('module', 'elementor') . '/templates/elementor-editor.html.twig');
       
        $dir = \Drupal::languageManager()->getCurrentLanguage()->getDirection();

        $html = $template->render([
            is_rtl => $dir == 'rtl',
            elementor_data => $editor_data,
            base_path => base_path() . drupal_get_path('module', 'elementor'),
        ]);

        $response = new Response();
        $response->setContent($html);

        return $response;
    }

    public function upload(Request $request)
    {
        $files = [];
        foreach ($request->files->all() as $key => $file) {
            $files[] = ElementorPlugin::$instance->sdk->upload_file($file->getPathName(), $file->getClientOriginalName());
        }
        return new JsonResponse($files);
    }

    public function delete_upload(Request $request)
    {
        $newFile = ElementorPlugin::$instance->sdk->delete_file($request->get('fid'));
        return new JsonResponse();
    }
}
