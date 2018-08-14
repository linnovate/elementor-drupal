<?php
/**
 * @file
 * Contains \Drupal\elementor\ElementorSDK.
 */

namespace Drupal\elementor;

class ElementorSDK
{

    public function get_builder_data($uid)
    {
        $connection = \Drupal::database();
        $result = $connection->query("SELECT data FROM elementor_data WHERE uid = " . $uid . " ORDER BY ID DESC LIMIT 1")
            ->fetch();
        return json_decode($result->data, true);
    }

    public function set_builder_data($uid, $data)
    {
        $connection = \Drupal::database();
        date_default_timezone_set("UTC");

        return $connection->insert('elementor_data')
            ->fields([
                'uid' => $uid,
                'author' => 'admin',
                'timestamp' => time(),
                'data' => json_encode($data),
            ])
            ->execute();
    }

    public function delete_builder_data($id)
    {
        return $connection->query("DELETE FROM elementor_data WHERE id = " . $id)
            ->execute();
    }

    public function get_revisions($uid)
    {
        $connection = \Drupal::database();
        $result = $connection->query("SELECT * FROM elementor_data WHERE uid = " . $uid)
            ->fetchAll();

        foreach ($result as $revision) {
            $revision->data = json_decode($revision->data, true);
        }
        return $result;
    }

    public function get_revisions_ids($uid)
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

    public function get_revision_data($id)
    {
        $connection = \Drupal::database();
        $result = $connection->query("SELECT * FROM elementor_data WHERE id = " . $id)
            ->fetch();

        return json_decode($result->data, true);
    }

    public function set_revision($uid, $data)
    {
        return $this->set_builder_data($uid, $data);
    }

    public function delete_revision($id)
    {
        $connection = \Drupal::database();
        return $connection->query("DELETE FROM elementor_data WHERE id = " . $id)
            ->execute();
    }

    public function get_local_tmp_data($id)
    {
        $connection = \Drupal::database();
        $result = $connection->query("SELECT data FROM elementor_tmps WHERE id = " . $id)
            ->fetch();
        return json_decode($result->data, true);
    }

    public function get_local_tmps($types)
    {
        $connection = \Drupal::database();
        return $connection->query("SELECT id FROM elementor_tmps WHERE type = '" . $type. "'")
            ->fetchAll();
    }

    public function set_local_tmp($type, $data)
    {
        $timestamp = time();

        $connection = \Drupal::database();
        return $connection->insert('elementor_tmps')
            ->fields([
                'type' => $type,
                'name' => !empty($data['title']) ? $data['title'] : ___elementor_adapter('(no title)', 'elementor'),
                'author' => 'admin',
                'timestamp' => $timestamp,
                'data' => json_encode($data['content']),
            ])
            ->execute();
    }

    public function delete_local_tmp($id)
    {
        $connection = \Drupal::database();
        return $connection->query("DELETE FROM elementor_data WHERE id = " . $id)
            ->execute();
    }

    public function get_remote_tmp_data()
    {

    }

    public function get_remote_tmps()
    {

    }

    public function update_remote_tmp()
    {

    }

    public function upload_files()
    {

    }
    public function delete_file()
    {

    }
}
