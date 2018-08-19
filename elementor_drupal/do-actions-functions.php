<?php

$enqueued_actions = array();

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
