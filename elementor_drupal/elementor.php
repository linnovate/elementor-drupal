<?php

define('DOING_AJAX', true);

define('ABSPATH', false);
define('ELEMENTOR_VERSION', '2.1.6');
define('ELEMENTOR_PREVIOUS_STABLE_VERSION', '2.0.16');

define('ELEMENTOR__FILE__', __FILE__);
define('ELEMENTOR_PLUGIN_BASE', '');
define('ELEMENTOR_PATH', drupal_get_path('module', 'elementor') . '/elementor/');
if (defined('ELEMENTOR_TESTS') && ELEMENTOR_TESTS) {
    define('ELEMENTOR_URL', 'file://' . ELEMENTOR_PATH);
} else {
    define('ELEMENTOR_URL', '');
}
define('ELEMENTOR_MODULES_PATH', '');
define('ELEMENTOR_ASSETS_URL', '/' . ELEMENTOR_PATH . 'assets/');

require drupal_get_path('module', 'elementor') . '/elementor_drupal/wordpress-functions.php';

require drupal_get_path('module', 'elementor') . '/elementor/includes/plugin.php';

require drupal_get_path('module', 'elementor') . '/elementor_drupal/template-library/classes/class-import-images.php';
require drupal_get_path('module', 'elementor') . '/elementor_drupal/template-library/sources/remote.php';
require drupal_get_path('module', 'elementor') . '/elementor_drupal/template-library/sources/local.php';
require drupal_get_path('module', 'elementor') . '/elementor_drupal/template-library/manager.php';

require drupal_get_path('module', 'elementor') . '/elementor_drupal/revisions-manager.php';
require drupal_get_path('module', 'elementor') . '/elementor_drupal/ajax-manager.php';
require drupal_get_path('module', 'elementor') . '/elementor_drupal/document-types/node.php';
require drupal_get_path('module', 'elementor') . '/elementor_drupal/post-css.php';

require drupal_get_path('module', 'elementor') . '/elementor_drupal/plugin.php';
