<?php

class WP_Query
{
    public function __construct()
    {
        return [];
    }
    public function have_posts()
    {
        return false;
    }
}

$enqueued_actions = array();

$wpdb = [];

function get_option($option, $default = false)
{
    global $wpdb;
    return $wpdb[$option];
}

function add_filter($tag, $function_to_add, $priority = 10, $accepted_args = 1)
{
    global $enqueued_actions;

    $enqueued_actions[$tag][] = array(
        'func' => $function_to_add,
        'imp' => $priority,
        'accepted_args' => $accepted_args,
    );
    return true;
}

function add_action($tag, $function_to_add, $priority = 10, $accepted_args = 1)
{
    return add_filter($tag, $function_to_add, $priority, $accepted_args);
}

function have_posts()
{
    return false;
}
function update_option($option, $value, $autoload = null)
{
    global $wpdb;

    $wpdb[$option] = $value;
}

function do_action($tag, $args = [])
{
    global $enqueued_actions;

    $all_args = array();
    for ($a = 1, $num = func_num_args(); $a < $num; $a++) {
        $all_args[] = func_get_arg($a);
    }

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

    return $value ? $value : $all_args[0];
}

function do_ajax($tag, $args = [])
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

function did_action($tag)
{
    global $enqueued_actions;

    if (!isset($enqueued_actions[$tag])) {
        return 0;
    }

    return $enqueued_actions[$tag];
}

function get_user_meta()
{
    return null;
}

function get_current_user_id()
{}
function query_posts()
{}
function wp_register_script()
{}
function wp_enqueue_media()
{}
function wp_enqueue_script()
{}
function wp_enqueue_style()
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
function wp_get_theme()
{
    return new fun_parent;
}
function sanitize_key($key)
{
    $raw_key = $key;
    $key = strtolower($key);
    $key = preg_replace('/[^a-z0-9_\-]/', '', $key);
    return $key;
}

function setup_postdata()
{

}
function wp_verify_nonce()
{
    return true;
}
function wp_upload_dir()
{}
function wp_mkdir_p()
{}
function wp_get_current_user()
{}
function wp_redirect()
{}
function wp_send_json_success($data = null, $status_code = null)
{
    $response = array('success' => true);

    if (isset($data)) {
        $response['data'] = $data;
    }

    return $response;
}

function wp_send_json_error($data = null, $status_code = null)
{
    $response = array('success' => false);

    if (isset($data)) {
        if (is_wp_error($data)) {
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
function wp_doing_ajax()
{
    return apply_filters('wp_doing_ajax', defined('DOING_AJAX') && DOING_AJAX);
}

function wp_parse_str($string, &$array)
{
    parse_str($string, $array);
    if (get_magic_quotes_gpc()) {
        $array = stripslashes_deep($array);
    }

    $array = apply_filters('wp_parse_str', $array);
}

function wp_parse_args($args, $defaults = '')
{
    if (is_object($args)) {
        $r = get_object_vars($args);
    } elseif (is_array($args)) {
        $r = &$args;
    } else {
        wp_parse_str($args, $r);
    }

    if (is_array($defaults)) {
        return array_merge($defaults, $r);
    }

    return $r;
}

function wp_remote_post($url, $args = array())
{
    $client = \Drupal::httpClient([
        'timeout' => $args['timeout'],
    ]);
    return $client->post($url, ['form_params' => $args['body']]);
}

function wp_remote_get($url, $args = array())
{
    $client = \Drupal::httpClient([
        'timeout' => $args['timeout'],
    ]);
    return $client->get($url, ['query' => $args['body']]);
}

function wp_remote_retrieve_body($response)
{
    return $response->getBody()->getContents();
}

function wp_get_attachment_image($attachment_id, $size = 'thumbnail', $icon = false, $attr = '')
{
    $html = '';
    $image = null; //wp_get_attachment_image_src($attachment_id, $size, $icon);
    if ($image) {
        list($src, $width, $height) = $image;
        $hwstring = image_hwstring($width, $height);
        $size_class = $size;
        if (is_array($size_class)) {
            $size_class = join('x', $size_class);
        }
        $attachment = get_post($attachment_id);
        $default_attr = array(
            'src' => $src,
            'class' => "attachment-$size_class size-$size_class",
            'alt' => trim(strip_tags(get_post_meta($attachment_id, '_wp_attachment_image_alt', true))),
        );

        $attr = wp_parse_args($attr, $default_attr);

        // Generate 'srcset' and 'sizes' if not already present.
        if (empty($attr['srcset'])) {
            $image_meta = wp_get_attachment_metadata($attachment_id);

            if (is_array($image_meta)) {
                $size_array = array(absint($width), absint($height));
                $srcset = wp_calculate_image_srcset($size_array, $src, $image_meta, $attachment_id);
                $sizes = wp_calculate_image_sizes($size_array, $src, $image_meta, $attachment_id);

                if ($srcset && ($sizes || !empty($attr['sizes']))) {
                    $attr['srcset'] = $srcset;

                    if (empty($attr['sizes'])) {
                        $attr['sizes'] = $sizes;
                    }
                }
            }
        }

        $attr = apply_filters('wp_get_attachment_image_attributes', $attr, $attachment, $size);
        $attr = array_map('esc_attr', $attr);
        $html = rtrim("<img $hwstring");
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

function human_time_diff($from, $to = '')
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
        $since = sprintf(_n('%s min', '%s mins', $mins), $mins);
    } elseif ($diff < DAY_IN_SECONDS && $diff >= HOUR_IN_SECONDS) {
        $hours = round($diff / HOUR_IN_SECONDS);
        if ($hours <= 1) {
            $hours = 1;
        }

        /* translators: Time difference between two dates, in hours. 1: Number of hours */
        $since = sprintf(_n('%s hour', '%s hours', $hours), $hours);
    } elseif ($diff < WEEK_IN_SECONDS && $diff >= DAY_IN_SECONDS) {
        $days = round($diff / DAY_IN_SECONDS);
        if ($days <= 1) {
            $days = 1;
        }

        /* translators: Time difference between two dates, in days. 1: Number of days */
        $since = sprintf(_n('%s day', '%s days', $days), $days);
    } elseif ($diff < MONTH_IN_SECONDS && $diff >= WEEK_IN_SECONDS) {
        $weeks = round($diff / WEEK_IN_SECONDS);
        if ($weeks <= 1) {
            $weeks = 1;
        }

        /* translators: Time difference between two dates, in weeks. 1: Number of weeks */
        $since = sprintf(_n('%s week', '%s weeks', $weeks), $weeks);
    } elseif ($diff < YEAR_IN_SECONDS && $diff >= MONTH_IN_SECONDS) {
        $months = round($diff / MONTH_IN_SECONDS);
        if ($months <= 1) {
            $months = 1;
        }

        /* translators: Time difference between two dates, in months. 1: Number of months */
        $since = sprintf(_n('%s month', '%s months', $months), $months);
    } elseif ($diff >= YEAR_IN_SECONDS) {
        $years = round($diff / YEAR_IN_SECONDS);
        if ($years <= 1) {
            $years = 1;
        }

        /* translators: Time difference between two dates, in years. 1: Number of years */
        $since = sprintf(_n('%s year', '%s years', $years), $years);
    }

    return apply_filters('human_time_diff', $since, $diff, $from, $to);
}

function wp_image_editor_supports()
{}
function wp_embed_defaults()
{}
function update_post_meta()
{}
function delete_post_meta()
{}
function wp_oembed_get()
{}

function get_post_meta()
{
    return 'DocumentDrupal';
}

function get_edit_post_link()
{}
function current_theme_supports()
{}
function get_post_statuses()
{}
function wp_is_post_revision()
{}
function get_post_type_object()
{}
function get_intermediate_image_sizes()
{}
function is_rtl()
{}
function wp_remote_retrieve_response_code()
{
    return 200;
}
function is_wp_error()
{return false;}
function admin_url()
{}
function check_admin_referer()
{}
function add_menu_page()
{}
function add_submenu_page()
{}
function register_activation_hook()
{}
function add_post_type_support()
{}

function get_bloginfo()
{
    return "en-US";
}

function register_taxonomy()
{}
function register_post_type()
{}
function register_uninstall_hook()
{}
function _doing_it_wrong()
{}
function add_query_arg()
{}
function is_singular()
{}
function get_the_ID()
{
    $uid = \Drupal::routeMatch()->getParameter('node');

    return $uid;
}
function post_type_supports()
{}
function get_post_type()
{}
function delete_option()
{}
function get_the_title()
{}
function wp_get_attachment_image_src()
{
    return [];
}
function set_transient($transient, $value, $expiration = 0)
{

    $expiration = (int) $expiration;
    $value = apply_filters("pre_set_transient_{$transient}", $value, $expiration, $transient);
    $expiration = apply_filters("expiration_of_transient_{$transient}", $expiration, $value, $transient);
    $result = [];
    return $result;
}

function get_transient($transient)
{

    $pre = apply_filters("pre_transient_{$transient}", false, $transient);
    if (false !== $pre) {
        return $pre;
    }

    return false;

    return apply_filters("transient_{$transient}", $value, $transient);
}

function remove_filter($tag, $function_to_remove, $priority = 10)
{
    global $enqueued_actions;

    $r = false;
    if (isset($enqueued_actions[$tag])) {
        unset($enqueued_actions[$tag]);
        $r = true;
    }

    return $r;
}

function remove_action($tag, $function_to_remove, $priority = 10)
{
    return remove_filter($tag, $function_to_remove, $priority);
}

function get_post()
{
    return true;
}
function wp_is_post_autosave()
{}
function wp_get_post_parent_id()
{}
function apply_filters_ref_array($tag, $args)
{
    return $tag;
}
function apply_filters_deprecated($tag, $args, $version, $replacement = false, $message = null)
{
    return apply_filters_ref_array($tag, $args);
}

function apply_filters($tag, $value)
{
    $all_args = array();
    for ($a = 0, $num = func_num_args(); $a < $num; $a++) {
        $all_args[] = func_get_arg($a);
    }

    return call_user_func_array('do_action', $all_args);
}

function shortcode_unautop($value)
{
    return $value;
}
function do_shortcode($value)
{
    return $value;
}
function wptexturize($value)
{
    return $value;
}
function wp_json_encode($data)
{
    return json_encode($data);
}
function absint($maybeint)
{
    return abs(intval($maybeint));
}
function is_admin()
{
    return true;
}
function __($text, $context)
{
    return $text;
}
function _x($text, $context, $domain = 'default')
{
    return $text;
}

function _n($text)
{
    return $text;
}

function esc_url($value)
{
    return $value;
}
function esc_html($text)
{
    return $text;
}
function esc_html__($text)
{
    return $text;
}
function esc_attr($text)
{
    return $text;
}
function esc_attr__($text)
{
    return $text;
}
function esc_attr_e($text, $domain = 'default')
{
    echo $text;
}
