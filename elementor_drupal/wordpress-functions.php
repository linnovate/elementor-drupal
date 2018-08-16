<?php

class WP_Query
{
    public function __construct()
    {
        return [];
    }
    public function have_posts_elementor_adapter()
    {
        return false;
    }
}

$enqueued_actions = array();

$wpdb = [];

function get_option_elementor_adapter($option, $default = false)
{
    global $wpdb;
    return $wpdb[$option];
}

function add_filter_elementor_adapter($tag, $function_to_add, $priority = 10, $accepted_args = 1)
{
    global $enqueued_actions;

    $enqueued_actions[$tag][] = array(
        'func' => $function_to_add,
        'imp' => $priority,
        'accepted_args' => $accepted_args,
    );
    return true;
}

function add_action_elementor_adapter($tag, $function_to_add, $priority = 10, $accepted_args = 1)
{
    return add_filter_elementor_adapter($tag, $function_to_add, $priority, $accepted_args);
}

function have_posts_elementor_adapter()
{
    return false;
}
function update_option_elementor_adapter($option, $value, $autoload = null)
{
    global $wpdb;

    $wpdb[$option] = $value;
}

function do_action_elementor_adapter($tag, $args = [])
{
    global $enqueued_actions;

    $all_args = array();
    for ($a = 1, $num = func_num_args(); $a < $num; $a++) {
        $all_args[] = func_get_arg($a);
    }

    if ($enqueued_actions[$tag]) {
        foreach ($enqueued_actions[$tag] as $the_) {
            $num_args = count($all_args);

            if ($tag != "elementor/css-file/post/parse") {
                if ($the_['accepted_args'] == 0) {
                    $value = call_user_func_array($the_['func'], array());
                } elseif ($the_['accepted_args'] >= $num_args) {
                    $value = call_user_func_array($the_['func'], $all_args);
                } else {
                    $value = call_user_func_array($the_['func'], array_slice($all_args, 0, (int) $the_['accepted_args']));
                }
            }
        }
    }

    return $value ? $value : $all_args[0];
}

function do_ajax_elementor_adapter($tag, $args = [])
{
    global $enqueued_actions;

    $all_args = array();
    for ($a = 1, $num = func_num_args(); $a < $num; $a++) {
        $all_args[] = func_get_arg($a);
    }

    foreach ($enqueued_actions['wp_ajax_' . $tag] as $the_) {
        $num_args = count($all_args);
        if ($the_['accepted_args'] == 0) {
            $value = call_user_func_array($the_['func'], array());
        } elseif ($the_['accepted_args'] >= $num_args) {
            $value = call_user_func_array($the_['func'], $all_args);
        } else {
            $value = call_user_func_array($the_['func'], array_slice($all_args, 0, (int) $the_['accepted_args']));
        }
    }
    return $value;
}

function did_action_elementor_adapter($tag)
{
    global $enqueued_actions;

    if (!isset($enqueued_actions[$tag])) {
        return 0;
    }

    return $enqueued_actions[$tag];
}

function get_user_meta_elementor_adapter()
{
    return null;
}

function get_current_user_id_elementor_adapter()
{}
function query_posts_elementor_adapter()
{}
function wp_register_script_elementor_adapter()
{}
function wp_enqueue_media_elementor_adapter()
{}
function wp_enqueue_script_elementor_adapter()
{}
function wp_enqueue_style_elementor_adapter()
{}

class fun_parent
{
    public function parent()
    {
        return false;
    }
    public function get()
    {
        return '';
    }
}
function wp_get_theme_elementor_adapter()
{
    return new fun_parent;
}
function sanitize_key_elementor_adapter($key)
{
    $raw_key = $key;
    $key = strtolower($key);
    $key = preg_replace('/[^a-z0-9_\-]/', '', $key);
    return $key;
}

function setup_postdata_elementor_adapter()
{

}
function wp_verify_nonce_elementor_adapter()
{
    return true;
}
function wp_upload_dir_elementor_adapter()
{}
function wp_mkdir_p_elementor_adapter()
{}
function wp_get_current_user_elementor_adapter()
{}
function wp_redirect_elementor_adapter()
{}
function wp_send_json_success_elementor_adapter($data = null, $status_code = null)
{
    $response = array('success' => true);

    if (isset($data)) {
        $response['data'] = $data;
    }

    return $response;
}

function wp_send_json_error_elementor_adapter($data = null, $status_code = null)
{
    $response = array('success' => false);

    if (isset($data)) {
        if (is_wp_error_elementor_adapter($data)) {
            $result = array();
            foreach ($data->errors as $code => $messages) {
                foreach ($messages as $message) {
                    $result[] = array('code' => $code, 'message' => $message);
                }
            }

            $response['data'] = $result;
        } else {
            $response['data'] = $data;
        }
    }

    return $response; // $response, $status_code );
}
function wp_doing_ajax_elementor_adapter()
{
    return apply_filters_elementor_adapter('wp_doing_ajax', defined('DOING_AJAX') && DOING_AJAX);
}

function wp_parse_str_elementor_adapter($string, &$array)
{
    parse_str($string, $array);
    if (get_magic_quotes_gpc()) {
        $array = stripslashes_deep($array);
    }

    $array = apply_filters_elementor_adapter('wp_parse_str_elementor_adapter', $array);
}

function wp_parse_args_elementor_adapter($args, $defaults = '')
{
    if (is_object($args)) {
        $r = get_object_vars($args);
    } elseif (is_array($args)) {
        $r = &$args;
    } else {
        wp_parse_str_elementor_adapter($args, $r);
    }

    if (is_array($defaults)) {
        return array_merge($defaults, $r);
    }

    return $r;
}

function wp_remote_post_elementor_adapter($url, $args = array())
{
    $client = \Drupal::httpClient([
        'timeout' => $args['timeout'],
    ]);
    return $client->post($url, ['form_params' => $args['body']]);
}

function wp_remote_get_elementor_adapter($url, $args = array())
{
    $client = \Drupal::httpClient([
        'timeout' => $args['timeout'],
    ]);
    return $client->get($url, ['query' => $args['body']]);
}

function wp_remote_retrieve_body_elementor_adapter($response)
{
    return $response->getBody()->getContents();
}

function wp_get_attachment_image_elementor_adapter($attachment_id, $size = 'thumbnail', $icon = false, $attr = '')
{
    $html = '';
    $src = \Drupal\Elementor\ElementorPlugin::$instance->sdk->get_file($attachment_id, $style = 'medium');

    if ($src) {

        $attr = array(
            'src' => $src,
            'class' => "attachment-$size size-$size",
            'alt' => trim(''),
        );

        $html = rtrim("<img ");
        foreach ($attr as $name => $value) {
            $html .= " $name=" . '"' . $value . '"';
        }
        $html .= ' />';
    }

    return $html;
}

define('MINUTE_IN_SECONDS', 60);
define('HOUR_IN_SECONDS', 60 * MINUTE_IN_SECONDS);
define('DAY_IN_SECONDS', 24 * HOUR_IN_SECONDS);
define('WEEK_IN_SECONDS', 7 * DAY_IN_SECONDS);
define('MONTH_IN_SECONDS', 30 * DAY_IN_SECONDS);
define('YEAR_IN_SECONDS', 365 * DAY_IN_SECONDS);

function human_time_diff_elementor_adapter($from, $to = '')
{
    if (empty($to)) {
        $to = time();
    }

    $diff = (int) abs($to - $from);

    if ($diff < HOUR_IN_SECONDS) {
        $mins = round($diff / MINUTE_IN_SECONDS);
        if ($mins <= 1) {
            $mins = 1;
        }

        /* translators: Time difference between two dates, in minutes (min=minute). 1: Number of minutes */
        $since = sprintf(_n_elementor_adapter('%s min', '%s mins', $mins), $mins);
    } elseif ($diff < DAY_IN_SECONDS && $diff >= HOUR_IN_SECONDS) {
        $hours = round($diff / HOUR_IN_SECONDS);
        if ($hours <= 1) {
            $hours = 1;
        }

        /* translators: Time difference between two dates, in hours. 1: Number of hours */
        $since = sprintf(_n_elementor_adapter('%s hour', '%s hours', $hours), $hours);
    } elseif ($diff < WEEK_IN_SECONDS && $diff >= DAY_IN_SECONDS) {
        $days = round($diff / DAY_IN_SECONDS);
        if ($days <= 1) {
            $days = 1;
        }

        /* translators: Time difference between two dates, in days. 1: Number of days */
        $since = sprintf(_n_elementor_adapter('%s day', '%s days', $days), $days);
    } elseif ($diff < MONTH_IN_SECONDS && $diff >= WEEK_IN_SECONDS) {
        $weeks = round($diff / WEEK_IN_SECONDS);
        if ($weeks <= 1) {
            $weeks = 1;
        }

        /* translators: Time difference between two dates, in weeks. 1: Number of weeks */
        $since = sprintf(_n_elementor_adapter('%s week', '%s weeks', $weeks), $weeks);
    } elseif ($diff < YEAR_IN_SECONDS && $diff >= MONTH_IN_SECONDS) {
        $months = round($diff / MONTH_IN_SECONDS);
        if ($months <= 1) {
            $months = 1;
        }

        /* translators: Time difference between two dates, in months. 1: Number of months */
        $since = sprintf(_n_elementor_adapter('%s month', '%s months', $months), $months);
    } elseif ($diff >= YEAR_IN_SECONDS) {
        $years = round($diff / YEAR_IN_SECONDS);
        if ($years <= 1) {
            $years = 1;
        }

        /* translators: Time difference between two dates, in years. 1: Number of years */
        $since = sprintf(_n_elementor_adapter('%s year', '%s years', $years), $years);
    }

    return apply_filters_elementor_adapter('human_time_diff', $since, $diff, $from, $to);
}

function wp_image_editor_supports_elementor_adapter()
{}
function wp_embed_defaults_elementor_adapter()
{}
function update_post_meta_elementor_adapter()
{}
function delete_post_meta_elementor_adapter()
{}
function wp_oembed_get_elementor_adapter()
{}

function get_post_meta_elementor_adapter()
{
    return 'DocumentDrupal';
}

function wp_list_pluck_elementor_adapter($list, $field, $index_key = null)
{
    $value = [];
    foreach ($list as $index => $item) {
        $value[$index] = $item['id'];
    }
    return $value;
}

function get_edit_post_link_elementor_adapter()
{}
function current_theme_supports_elementor_adapter()
{}
function get_post_statuses_elementor_adapter()
{}
function get_post_status_elementor_adapter()
{}
function post_type_exists_elementor_adapter()
{
}
function wp_is_post_revision_elementor_adapter()
{}
function get_post_type_object_elementor_adapter()
{}
function get_intermediate_image_sizes_elementor_adapter()
{
    // $_wp_additional_image_sizes = wp_get_additional_image_sizes();
    $image_sizes = array('thumbnail', 'medium', 'medium_large', 'large'); // Standard sizes
    if (!empty($_wp_additional_image_sizes)) {
        $image_sizes = array_merge($image_sizes, array_keys($_wp_additional_image_sizes));
    }
    return apply_filters_elementor_adapter('intermediate_image_sizes', $image_sizes);
}

function is_rtl_elementor_adapter()
{}
function wp_remote_retrieve_response_code_elementor_adapter()
{
    return 200;
}
function is_wp_error_elementor_adapter()
{return false;}
function admin_url_elementor_adapter()
{}
function check_admin_referer_elementor_adapter()
{}
function add_menu_page_elementor_adapter()
{}
function add_submenu_page_elementor_adapter()
{}
function register_activation_hook_elementor_adapter()
{}
function add_post_type_support_elementor_adapter()
{}

function get_bloginfo_elementor_adapter()
{
    return "en-US";
}

function register_taxonomy_elementor_adapter()
{}
function register_post_type_elementor_adapter()
{}
function register_uninstall_hook_elementor_adapter()
{}
function _doing_it_wrong_elementor_adapter()
{}

function urlencode_deep_elementor_adapter($value)
{
    return map_deep_elementor_adapter($value, 'urlencode');
}

function map_deep_elementor_adapter($value, $callback)
{
    if (is_array($value)) {
        foreach ($value as $index => $item) {
            $value[$index] = map_deep_elementor_adapter($item, $callback);
        }
    } elseif (is_object($value)) {
        $object_vars = get_object_vars($value);
        foreach ($object_vars as $property_name => $property_value) {
            $value->$property_name = map_deep_elementor_adapter($property_value, $callback);
        }
    } else {
        $value = call_user_func($callback, $value);
    }

    return $value;
}
function add_query_arg_elementor_adapter()
{
    $args = func_get_args();
    if (is_array($args[0])) {
        if (count($args) < 2 || false === $args[1]) {
            $uri = $_SERVER['REQUEST_URI'];
        } else {
            $uri = $args[1];
        }

    } else {
        if (count($args) < 3 || false === $args[2]) {
            $uri = $_SERVER['REQUEST_URI'];
        } else {
            $uri = $args[2];
        }

    }

    if ($frag = strstr($uri, '#')) {
        $uri = substr($uri, 0, -strlen($frag));
    } else {
        $frag = '';
    }

    if (0 === stripos($uri, 'http://')) {
        $protocol = 'http://';
        $uri = substr($uri, 7);
    } elseif (0 === stripos($uri, 'https://')) {
        $protocol = 'https://';
        $uri = substr($uri, 8);
    } else {
        $protocol = '';
    }

    if (strpos($uri, '?') !== false) {
        list($base, $query) = explode('?', $uri, 2);
        $base .= '?';
    } elseif ($protocol || strpos($uri, '=') === false) {
        $base = $uri . '?';
        $query = '';
    } else {
        $base = '';
        $query = $uri;
    }

    wp_parse_str_elementor_adapter($query, $qs);
    $qs = urlencode_deep_elementor_adapter($qs); // this re-URL-encodes things that were already in the query string
    if (is_array($args[0])) {
        foreach ($args[0] as $k => $v) {
            $qs[$k] = $v;
        }
    } else {
        $qs[$args[0]] = $args[1];
    }

    foreach ($qs as $k => $v) {
        if ($v === false) {
            unset($qs[$k]);
        }

    }

    $ret = http_build_query($qs);
    $ret = trim($ret, '?');
    $ret = preg_replace('#=(&|$)#', '$1', $ret);
    $ret = $protocol . $base . $ret . $frag;
    $ret = rtrim($ret, '?');
    return $ret;
}
function is_singular_elementor_adapter()
{}
function get_the_ID_elementor_adapter()
{
    $uid = \Drupal::routeMatch()->getParameter('node');

    return $uid;
}
function post_type_supports_elementor_adapter()
{}
function get_post_type_elementor_adapter()
{}
function delete_option_elementor_adapter()
{}
function get_the_title_elementor_adapter()
{}
function wp_get_attachment_image_src_elementor_adapter()
{
    return [];
}
function set_transient_elementor_adapter($transient, $value, $expiration = 0)
{

    $expiration = (int) $expiration;
    $value = apply_filters_elementor_adapter("pre_set_transient_{$transient}", $value, $expiration, $transient);
    $expiration = apply_filters_elementor_adapter("expiration_of_transient_{$transient}", $expiration, $value, $transient);
    $result = [];
    return $result;
}

function get_transient_elementor_adapter($transient)
{

    $pre = apply_filters_elementor_adapter("pre_transient_{$transient}", false, $transient);
    if (false !== $pre) {
        return $pre;
    }

    return false;

    return apply_filters_elementor_adapter("transient_{$transient}", $value, $transient);
}

function remove_filter_elementor_adapter($tag, $function_to_remove = null, $priority = 10)
{
    global $enqueued_actions;

    $r = false;
    if (isset($enqueued_actions[$tag])) {
        unset($enqueued_actions[$tag]);
        $r = true;
    }

    return $r;
}

function remove_action_elementor_adapter($tag, $function_to_remove = null, $priority = 10)
{
    return remove_filter_elementor_adapter($tag, $function_to_remove, $priority);
}

function get_post_elementor_adapter()
{
    return true;
}
function wp_is_post_autosave_elementor_adapter()
{}
function wp_get_post_parent_id_elementor_adapter()
{}
function apply_filters_ref_array_elementor_adapter($tag, $args)
{
    return $tag;
}
function apply_filters_deprecated_elementor_adapter($tag, $args, $version, $replacement = false, $message = null)
{
    return apply_filters_ref_array_elementor_adapter($tag, $args);
}

function apply_filters_elementor_adapter($tag, $value)
{
    $all_args = array();
    for ($a = 0, $num = func_num_args(); $a < $num; $a++) {
        $all_args[] = func_get_arg($a);
    }

    return call_user_func_array('do_action_elementor_adapter', $all_args);
}

function shortcode_unautop_elementor_adapter($value)
{
    return $value;
}
function do_shortcode_elementor_adapter($content, $ignore_html = false)
{
    global $shortcode_tags;

    if (false === strpos($content, '[')) {
        return $content;
    }

    if (empty($shortcode_tags) || !is_array($shortcode_tags)) {
        return $content;
    }

    // Find all registered tag names in $content.
    preg_match_all('@\[([^<>&/\[\]\x00-\x20=]++)@', $content, $matches);
    $tagnames = array_intersect(array_keys($shortcode_tags), $matches[1]);

    if (empty($tagnames)) {
        return $content;
    }

    // $content = do_shortcodes_in_html_tags( $content, $ignore_html, $tagnames );

    // $pattern = get_shortcode_regex( $tagnames );
    $content = preg_replace_callback("/$pattern/", 'do_shortcode_tag', $content);

    // Always restore square braces so we don't break things like <!--[if IE ]>
    // $content = unescape_invalid_shortcodes( $content );

    return $content;
}

function wptexturize_elementor_adapter($value)
{
    return $value;
}
function wp_json_encode_elementor_adapter($data)
{
    return json_encode($data);
}
function absint_elementor_adapter($maybeint)
{
    return abs(intval($maybeint));
}
function is_admin_elementor_adapter()
{
    return true;
}
function ___elementor_adapter($text, $context)
{
    return $text;
}
function _x_elementor_adapter($text, $context, $domain = 'default')
{
    return $text;
}

function _n_elementor_adapter($text)
{
    return $text;
}

function esc_url_elementor_adapter($value)
{
    return $value;
}
function esc_html_elementor_adapter($text)
{
    return $text;
}
function esc_html___elementor_adapter($text)
{
    return $text;
}
function esc_attr_elementor_adapter($text)
{
    return $text;
}
function esc_attr___elementor_adapter($text)
{
    return $text;
}
function esc_attr_e_elementor_adapter($text, $domain = 'default')
{
    echo $text;
}
