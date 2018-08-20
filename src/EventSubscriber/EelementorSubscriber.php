<?php

namespace Drupal\elementor\EventSubscriber;

use Drupal\Core\Url;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use \Drupal\elementor\ElementorPlugin;

/**
 * Redirect .html pages to corresponding Node page.
 */
class EelementorSubscriber implements EventSubscriberInterface
{

    public function elementor_init(GetResponseEvent $event)
    {
        ElementorPlugin::instance();
    }

    public static function getSubscribedEvents()
    {
        $events[KernelEvents::REQUEST][] = ['elementor_init'];
        return $events;
    }
}
