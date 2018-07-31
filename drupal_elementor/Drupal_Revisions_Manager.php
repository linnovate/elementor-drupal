<?php

/**
 * @file
 * Contains \Drupal\elementor\Drupal_Revisions_Manager.
 */

namespace Drupal\elementor;

use Elementor\Core\Files\CSS\Post as Post_CSS;
use Elementor\Core\Settings\Manager;
use Elementor\Modules\History\Revisions_Manager;
use Elementor\Plugin;
use Elementor\Utils;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

class Drupal_Revisions_Manager extends Revisions_Manager
{

    public function __construct()
    {
        self::register_actions();
    }


    public static function get_revisions($uid = 1, $query_args = [], $parse_result = true)
    {

        $connection = \Drupal::database();
        $result = $connection->query("SELECT * FROM elementor_data WHERE uid = " . $uid)
            ->fetchAll();

        $revisions = [];

        foreach ($result as $revision) {
            // date_default_timezone_set('UTC'); 
            $date = date('M j @ H:i', $revision->timestamp);
			$human_time = human_time_diff($revision->timestamp);

            $data = json_decode($revision->data, true);

            $type = 'revision';

            $revisions[] = [
                'id' => $revision->id,
                'author' => $revision->author,
                'timestamp' => strtotime($date),
                'date' => sprintf(
					__( '%1$s ago (%2$s)', 'elementor' ),
					$human_time,
					$date
				),
                'type' => $type,
                'gravatar' => null,
            ];
        }

        return $revisions;
    }

    public static function get_revisions_ids($uid = 1, $query_args = [], $parse_result = true)
    {

        $connection = \Drupal::database();
        $result = $connection->query("SELECT id FROM elementor_data WHERE uid = " . $uid)
            ->fetchAll();

        $revisions = [];

        foreach ($result as $revision) {
            $revisions[] = $revision->id;
        }

        return $revisions;
    }


    public static function on_revision_data_request()
    {
        $connection = \Drupal::database();
        $result = $connection->query("SELECT * FROM elementor_data WHERE id = " . $_POST['id'])
            ->fetch();

        $revision_data = json_decode($result->data, true);

        return wp_send_json_success($revision_data);
    }


    public static function on_delete_revision_request()
    {
        $connection = \Drupal::database();
        $result = $connection->query("DELETE FROM elementor_data WHERE id = " . $_POST['id'])
            ->execute();

        return wp_send_json_success();
    }


    public static function on_ajax_save_builder_data($return_data, $document)
    {
        $post_id =  $_POST['editor_post_id'];

        $latest_revisions = self::get_revisions($post_id);

        $all_revision_ids = self::get_revisions_ids();

        // Send revisions data only if has revisions.
        if (!empty($latest_revisions)) {
            $current_revision_id = $post_id;

            $return_data = array_replace_recursive($return_data, [
                'config' => [
                    'current_revision_id' => $current_revision_id,
                ],
                'latest_revisions' => $latest_revisions,
                'revisions_ids' => $all_revision_ids,
            ]);
        }

        return $return_data;
    }


    public static function db_before_save($status, $has_changes)
    {

    }


    public static function editor_settings($settings, $post_id)
    {
        $settings = array_replace_recursive($settings, [
            'revisions' => self::get_revisions(),
            'revisions_enabled' => true,
            'current_revision_id' => $post_id,
            'i18n' => [
                'edit_draft' => __('Edit Draft', 'elementor'),
                'edit_published' => __('Edit Published', 'elementor'),
                'no_revisions_1' => __('Revision history lets you save your previous versions of your work, and restore them any time.', 'elementor'),
                'no_revisions_2' => __('Start designing your page and you\'ll be able to see the entire revision history here.', 'elementor'),
                'current' => __('Current Version', 'elementor'),
                'restore' => __('Restore', 'elementor'),
                'restore_auto_saved_data' => __('Restore Auto Saved Data', 'elementor'),
                'restore_auto_saved_data_message' => __('There is an autosave of this post that is more recent than the version below. You can restore the saved data fron the Revisions panel', 'elementor'),
                'revision' => __('Revision', 'elementor'),
                'revision_history' => __('Revision History', 'elementor'),
                'revisions_disabled_1' => __('It looks like the post revision feature is unavailable in your website.', 'elementor'),
                'revisions_disabled_2' => sprintf(
                    /* translators: %s: Codex URL */
                    __('Learn more about <a target="_blank" href="%s">WordPress revisions</a>', 'elementor'),
                    'https://codex.wordpress.org/Revisions#Revision_Options'
                ),
            ],
        ]);

        return $settings;
    }


    private static function register_actions()
    {
        remove_action('wp_restore_post_revision', [__CLASS__, 'restore_revision'], 10, 2);
        remove_action('init', [__CLASS__, 'add_revision_support_for_all_post_types'], 9999);
        remove_filter('elementor/editor/localize_settings', [__CLASS__, 'editor_settings'], 10, 2);
        remove_action('elementor/db/before_save', [__CLASS__, 'db_before_save'], 10, 2);
        remove_action('_wp_put_post_revision', [__CLASS__, 'save_revision']);
        remove_action('wp_creating_autosave', [__CLASS__, 'update_autosave']);

        // Hack to avoid delete the auto-save revision in WP editor.
        remove_action('edit_post_content', [__CLASS__, 'avoid_delete_auto_save'], 10, 2);
        remove_action('edit_form_after_title', [__CLASS__, 'remove_temp_post_content']);

        if (Utils::is_ajax()) {
            remove_filter('elementor/documents/ajax_save/return_data', [__CLASS__, 'on_ajax_save_builder_data'], 10, 2);
            remove_action('wp_ajax_elementor_get_revision_data', [__CLASS__, 'on_revision_data_request']);
            remove_action('wp_ajax_elementor_delete_revision', [__CLASS__, 'on_delete_revision_request']);
        }

        add_filter('elementor/editor/localize_settings', [__CLASS__, 'editor_settings'], 10, 2);
        add_action('elementor/db/before_save', [__CLASS__, 'db_before_save'], 10, 2);

        if (Utils::is_ajax()) {
            add_filter('elementor/documents/ajax_save/return_data', [__CLASS__, 'on_ajax_save_builder_data'], 10, 2);
            add_action('wp_ajax_elementor_get_revision_data', [__CLASS__, 'on_revision_data_request']);
            add_action('wp_ajax_elementor_delete_revision', [__CLASS__, 'on_delete_revision_request']);
        }
    }

}
