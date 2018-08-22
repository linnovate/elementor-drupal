<?php
namespace Elementor\Core\Admin;

use Elementor\Api;
use Elementor\Tracker;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class Feedback {

	/**
	 * Enqueue feedback dialog scripts.
	 *
	 * Registers the feedback dialog scripts and enqueues them.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function enqueue_feedback_dialog_scripts() {
		if ( ! in_array( get_current_screen()->id, [ 'plugins', 'plugins-network' ], true ) ) {
			return;
		}

		add_action_elementor_adapter( 'admin_footer', [ $this, 'print_deactivate_feedback_dialog' ] );

		$suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';

		wp_register_script_elementor_adapter(
			'elementor-admin-feedback',
			ELEMENTOR_ASSETS_URL . 'js/admin-feedback' . $suffix . '.js',
			[
				'jquery',
				'underscore',
				'elementor-dialog',
			],
			ELEMENTOR_VERSION,
			true
		);

		wp_enqueue_script_elementor_adapter( 'elementor-admin-feedback' );

		wp_localize_script(
			'elementor-admin-feedback',
			'ElementorAdminFeedbackArgs',
			[
				'is_tracker_opted_in' => Tracker::is_allow_track(),
				'i18n' => [
					'submit_n_deactivate' => ___elementor_adapter( 'Submit & Deactivate', 'elementor' ),
					'skip_n_deactivate' => ___elementor_adapter( 'Skip & Deactivate', 'elementor' ),
				],
			]
		);
	}

	/**
	 * Print deactivate feedback dialog.
	 *
	 * Display a dialog box to ask the user why he deactivated Elementor.
	 *
	 * Fired by `admin_footer` filter.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function print_deactivate_feedback_dialog() {
		$deactivate_reasons = [
			'no_longer_needed' => [
				'title' => ___elementor_adapter( 'I no longer need the plugin', 'elementor' ),
				'input_placeholder' => '',
			],
			'found_a_better_plugin' => [
				'title' => ___elementor_adapter( 'I found a better plugin', 'elementor' ),
				'input_placeholder' => ___elementor_adapter( 'Please share which plugin', 'elementor' ),
			],
			'couldnt_get_the_plugin_to_work' => [
				'title' => ___elementor_adapter( 'I couldn\'t get the plugin to work', 'elementor' ),
				'input_placeholder' => '',
			],
			'temporary_deactivation' => [
				'title' => ___elementor_adapter( 'It\'s a temporary deactivation', 'elementor' ),
				'input_placeholder' => '',
			],
			'elementor_pro' => [
				'title' => ___elementor_adapter( 'I have Elementor Pro', 'elementor' ),
				'input_placeholder' => '',
				'alert' => ___elementor_adapter( 'Wait! Don\'t deactivate Elementor. You have to activate both Elementor and Elementor Pro in order for the plugin to work.', 'elementor' ),
			],
			'other' => [
				'title' => ___elementor_adapter( 'Other', 'elementor' ),
				'input_placeholder' => ___elementor_adapter( 'Please share the reason', 'elementor' ),
			],
		];

		?>
		<div id="elementor-deactivate-feedback-dialog-wrapper">
			<div id="elementor-deactivate-feedback-dialog-header">
				<i class="eicon-elementor-square" aria-hidden="true"></i>
				<span id="elementor-deactivate-feedback-dialog-header-title"><?php echo ___elementor_adapter( 'Quick Feedback', 'elementor' ); ?></span>
			</div>
			<form id="elementor-deactivate-feedback-dialog-form" method="post">
				<?php
				wp_nonce_field( '_elementor_deactivate_feedback_nonce' );
				?>
				<input type="hidden" name="action" value="elementor_deactivate_feedback" />

				<div id="elementor-deactivate-feedback-dialog-form-caption"><?php echo ___elementor_adapter( 'If you have a moment, please share why you are deactivating Elementor:', 'elementor' ); ?></div>
				<div id="elementor-deactivate-feedback-dialog-form-body">
					<?php foreach ( $deactivate_reasons as $reason_key => $reason ) : ?>
						<div class="elementor-deactivate-feedback-dialog-input-wrapper">
							<input id="elementor-deactivate-feedback-<?php echo esc_attr_elementor_adapter( $reason_key ); ?>" class="elementor-deactivate-feedback-dialog-input" type="radio" name="reason_key" value="<?php echo esc_attr_elementor_adapter( $reason_key ); ?>" />
							<label for="elementor-deactivate-feedback-<?php echo esc_attr_elementor_adapter( $reason_key ); ?>" class="elementor-deactivate-feedback-dialog-label"><?php echo esc_html_elementor_adapter( $reason['title'] ); ?></label>
							<?php if ( ! empty( $reason['input_placeholder'] ) ) : ?>
								<input class="elementor-feedback-text" type="text" name="reason_<?php echo esc_attr_elementor_adapter( $reason_key ); ?>" placeholder="<?php echo esc_attr_elementor_adapter( $reason['input_placeholder'] ); ?>" />
							<?php endif; ?>
							<?php if ( ! empty( $reason['alert'] ) ) : ?>
								<div class="elementor-feedback-text"><?php echo esc_html_elementor_adapter( $reason['alert'] ); ?></div>
							<?php endif; ?>
						</div>
					<?php endforeach; ?>
				</div>
			</form>
		</div>
		<?php
	}

	/**
	 * Ajax elementor deactivate feedback.
	 *
	 * Send the user feedback when Elementor is deactivated.
	 *
	 * Fired by `wp_ajax_elementor_deactivate_feedback` action.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function ajax_elementor_deactivate_feedback() {
		if ( ! isset( $_POST['_wpnonce'] ) || ! wp_verify_nonce_elementor_adapter( $_POST['_wpnonce'], '_elementor_deactivate_feedback_nonce' ) ) {
			wp_send_json_error_elementor_adapter();
		}

		$reason_text = '';
		$reason_key = '';

		if ( ! empty( $_POST['reason_key'] ) ) {
			$reason_key = $_POST['reason_key'];
		}

		if ( ! empty( $_POST[ "reason_{$reason_key}" ] ) ) {
			$reason_text = $_POST[ "reason_{$reason_key}" ];
		}

		Api::send_feedback( $reason_key, $reason_text );

		wp_send_json_success_elementor_adapter();
	}

	public function __construct() {
		add_action_elementor_adapter( 'admin_enqueue_scripts', [ $this, 'enqueue_feedback_dialog_scripts' ] );

		// Ajax.
		add_action_elementor_adapter( 'wp_ajax_elementor_deactivate_feedback', [ $this, 'ajax_elementor_deactivate_feedback' ] );
	}
}
