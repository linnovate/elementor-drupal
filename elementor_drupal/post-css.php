<?php
/**
 * @file
 * Contains \Drupal\elementor\DrupalPost_CSS.
 */

namespace Drupal\elementor;

use Elementor\Core\Files\CSS\Post as Post_CSS;
use Elementor\Element_Base;

class DrupalPost_CSS extends Post_CSS
{
    public function render_styles(Element_Base $element)
    {
        parent::render_styles($element);
    }
}
