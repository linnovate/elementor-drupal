<?php
/**
 * @file
 * Contains \Drupal\elementor\ElementorSDK.
 */

namespace Drupal\elementor;

class ElementorSDK
{

    /**
     * get_data.
     *
     * @since 1.0.0
     * @access public
     */
    public function get_data($uid)
    {
        $result = $this->connection->query("SELECT data FROM elementor_data WHERE uid = " . $uid . " ORDER BY ID DESC LIMIT 1")
            ->fetch();
        return json_decode($result->data, true);
    }

    /**
     * set_data.
     *
     * @since 1.0.0
     * @access public
     */
    public function set_data($uid, $data)
    {
        date_default_timezone_set("UTC");

        $this->connection->insert('elementor_data')
            ->fields([
                'uid' => $uid,
                'author' => 'admin',
                'timestamp' => time(),
                'data' => json_encode($data),
            ])
            ->execute();

        $result_count = $this->connection->query("SELECT COUNT(uid) as num FROM elementor_data WHERE uid = " . $uid)
            ->fetch();
        $count = $result_count->num - 10;
        if ($count > 0) {
            $result = $this->connection->query("DELETE FROM elementor_data WHERE uid = " . $uid . " LIMIT " . $count)
                ->execute();
        }
    }

    /**
     * delete_data.
     *
     * @since 1.0.0
     * @access public
     */
    public function delete_data($id)
    {
        return $this->connection->query("DELETE FROM elementor_data WHERE id = " . $id)
            ->execute();
    }

    /**
     * delete_data.
     *
     * @since 1.0.0
     * @access public
     */
    public function get_revisions($uid)
    {
        $result = $this->connection->query("SELECT * FROM elementor_data WHERE uid = " . $uid)
            ->fetchAll();

        foreach ($result as $revision) {
            $revision->data = json_decode($revision->data, true);
        }
        return $result;
    }

    /**
     * get_revisions_ids.
     *
     * @since 1.0.0
     * @access public
     */
    public function get_revisions_ids($uid)
    {
        $result = $this->connection->query("SELECT id FROM elementor_data WHERE uid = " . $uid)
            ->fetchAll();

        $revisions = [];

        foreach ($result as $revision) {
            $revisions[] = $revision->id;
        }
        return $revisions;
    }

    /**
     * get_revision_data.
     *
     * @since 1.0.0
     * @access public
     */
    public function get_revision_data($id)
    {
        $result = $this->connection->query("SELECT * FROM elementor_data WHERE id = " . $id)
            ->fetch();
        return json_decode($result->data, true);
    }

    /**
     * set_revision.
     *
     * @since 1.0.0
     * @access public
     */
    public function set_revision($uid, $data)
    {
        return $this->set_data($uid, $data);
    }

    /**
     * delete_revision.
     *
     * @since 1.0.0
     * @access public
     */
    public function delete_revision($id)
    {
        return $this->connection->query("DELETE FROM elementor_data WHERE id = " . $id)
            ->execute();
    }

    /**
     * get_local_tmps_ids.
     *
     * @since 1.0.0
     * @access public
     */
    public function get_local_tmps_ids($type)
    {
        return $this->connection->query("SELECT id FROM elementor_tmps WHERE type = '" . $type . "'")
            ->fetchAll();
    }

    /**
     * get_local_tmp.
     *
     * @since 1.0.0
     * @access public
     */
    public function get_local_tmp($id)
    {
        $result = $this->connection->query("SELECT * FROM elementor_tmps WHERE id = " . $id)
            ->fetch();
        $result->data = json_decode($result->data, true);
        return $result;
    }

    /**
     * save_local_tmp.
     *
     * @since 1.0.0
     * @access public
     */
    public function save_local_tmp($type, $data)
    {
        $timestamp = time();

        return $this->connection->insert('elementor_tmps')
            ->fields([
                'type' => 'local',
                'name' => !empty($data['title']) ? $data['title'] : ___elementor_adapter('(no title)', 'elementor'),
                'author' => 'admin',
                'timestamp' => $timestamp,
                'data' => json_encode($data['content']),
            ])
            ->execute();
    }

    /**
     * delete_local_tmp.
     *
     * @since 1.0.0
     * @access public
     */
    public function delete_local_tmp($id)
    {
        return $this->connection->query("DELETE FROM elementor_data WHERE id = " . $id)
            ->execute();
    }

    /**
     * save_remote_tmps.
     *
     * @since 1.0.0
     * @access public
     */
    public function save_remote_tmps($type, $data)
    {
        // $timestamp = time();

        // return $this->connection->insert('elementor_tmps')
        //     ->fields([
        //         'type' => $type,
        //         'name' => !empty($data['title']) ? $data['title'] : ___elementor_adapter('(no title)', 'elementor'),
        //         'author' => 'admin',
        //         'timestamp' => $timestamp,
        //         'data' => json_encode($data),
        //     ])
        //     ->execute();
    }

    /**
     * get_remote_tmps.
     *
     * @since 1.0.0
     * @access public
     */
    public function get_remote_tmps($type = '')
    {
        // $result = $this->connection->query("SELECT data FROM elementor_tmps WHERE type = '" . $type . "'")
        //     ->fetchAll();
        // return json_decode($result->data, true);
    }

    /**
     * get_remote_tmp.
     *
     * @since 1.0.0
     * @access public
     */
    public function get_remote_tmp($id)
    {
        $result = $this->connection->query("SELECT * FROM elementor_tmps WHERE id = " . $id)
            ->fetch();
        if ($result) {
            $result->data = json_decode($result->data, true);
        }
        return $result;
    }

    /**
     * save_remote_tmp.
     *
     * @since 1.0.0
     * @access public
     */
    public function save_remote_tmp($type, $data)
    {
        $timestamp = time();

        return $this->connection->insert('elementor_tmps')
            ->fields([
                'type' => 'remote',
                'name' => !empty($data['title']) ? $data['title'] : ___elementor_adapter('(no title)', 'elementor'),
                'author' => 'admin',
                'timestamp' => $timestamp,
                'data' => json_encode($data),
            ])
            ->execute();
    }

    /**
     * upload_files.
     *
     * @since 1.0.0
     * @access public
     */
    public function upload_files()
    {

    }

    /**
     * delete_file.
     *
     * @since 1.0.0
     * @access public
     */
    public function delete_file()
    {

    }

    /**
     * construct.
     *
     * @since 1.0.0
     * @access public
     */
    public function __construct()
    {
        $this->connection = \Drupal::database();
    }
}
