<?php
/**
 * @file
 * Contains \Drupal\elementor\ElementorSDK.
 */

namespace Drupal\elementor;

use Elementor\Controls_Stack;
use Elementor\Plugin;
use \Drupal\file\Entity\File;

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
     * get_local_templates_ids.
     *
     * @since 1.0.0
     * @access public
     */
    public function get_local_templates_ids($type)
    {
        return $this->connection->query("SELECT id FROM elementor_template WHERE type = '" . $type . "'")
            ->fetchAll();
    }

    /**
     * get_local_template.
     *
     * @since 1.0.0
     * @access public
     */
    public function get_local_template($id)
    {
        $result = $this->connection->query("SELECT * FROM elementor_template WHERE id = " . $id)
            ->fetch();
        $result->data = json_decode($result->data, true);
        return $result;
    }

    /**
     * save_local_template.
     *
     * @since 1.0.0
     * @access public
     */
    public function save_local_template($type, $data)
    {
        $timestamp = time();

        return $this->connection->insert('elementor_template')
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
     * delete_local_template.
     *
     * @since 1.0.0
     * @access public
     */
    public function delete_local_template($id)
    {
        return $this->connection->query("DELETE FROM elementor_template WHERE id = " . $id)
            ->execute();
    }

    /**
     * save_remote_template.
     *
     * @since 1.0.0
     * @access public
     */
    public function save_remote_templates($type, $data)
    {
        return \Drupal::configFactory()->getEditable('elementor.template')
            ->set($type, json_encode($data))
            ->save();
    }

    /**
     * get_remote_templates.
     *
     * @since 1.0.0
     * @access public
     */
    public function get_remote_templates($type = '')
    {
        $data = \Drupal::config('elementor.tmps')->get($type);
        return $data ? json_decode($data, true) : null;
    }

    /**
     * upload_file.
     *
     * @since 1.0.0
     * @access public
     */
    public function upload_file($pathName, $originalName)
    {
        $data = file_get_contents($pathName);
        $newFile = file_save_data($data, "public://" . $originalName, FILE_EXISTS_REPLACE);
        $file = [
            url => $newFile->url(),
            id => $newFile->id(),
        ];
        return $file;
    }

    /**
     * get_file.
     *
     * @since 1.0.0
     * @access public
     */
    public function get_file($fid, $style)
    {
        $image = \Drupal\file\Entity\File::load($fid);
        if ($image) {
            $src = \Drupal\image\Entity\ImageStyle::load($style)->buildUrl($image->getFileUri());
        }
        return $src;
    }

    /**
     * delete_file.
     *
     * @since 1.0.0
     * @access public
     */
    public function delete_file($attachment_id)
    {
        return file_delete($attachment_id);
    }

    /**
     * init_widgets.
     *
     * @since 1.0.0
     * @access public
     */
    public function init_widgets()
    {
		$build_widgets_filename = [
            'drupal-block',
			'drupal-token',
		];

		$this->_widget_types = [];

		foreach ( $build_widgets_filename as $widget_filename ) {
			include(drupal_get_path('module', 'elementor') . '/elementor_drupal/widgets/' . $widget_filename . '.php' );
			$class_name = str_replace( '-', '_', $widget_filename );
            $class_name = __NAMESPACE__ . '\Widget_' . ucwords($class_name, "_");
            $this->_widget_types[] = new $class_name();
        }
        
        return $this->_widget_types;


        
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
