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

use \Drupal\file\Entity\File;

class ElementorController extends ControllerBase implements ContainerInjectionInterface
{

    /**
     * @var Drupal\Core\Template\TwigEnvironment
     */
    protected $twig;
    protected $ElementorDrupa;

    public function __construct(TwigEnvironment $twig)
    {
        $this->ElementorDrupal = ElementorDrupal::$instance;
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
        $return_data = $this->ElementorDrupal->update($request);
        return new JsonResponse($return_data);
    }

    public function editor(Request $request)
    {
        $editor_data = $this->ElementorDrupal->editor();

        $template = $this->twig->loadTemplate(drupal_get_path('module', 'elementor') . '/templates/elementor-editor.html.twig');

        $html = $template->render([
            elementor_data => $editor_data,
            base_path => base_path(),
        ]);

        $response = new Response();
        $response->setContent($html);

        return $response;
    }

    public function upload(Request $request)
    {
        $files = [];

        foreach ($request->files->all() as $key => $file) {
            $data = file_get_contents($file->getPathName());
            $newFile = file_save_data($data, "public://" . $file->getClientOriginalName(), FILE_EXISTS_REPLACE);
            $files[] = [
                url => $newFile->url(),
                id => $newFile->id()
            ];
        }

        return new JsonResponse($files);
    }

    public function delete_upload(Request $request)
    {
        $newFile =  file_delete($request->get('fid'));
        return new JsonResponse();
    }
}
