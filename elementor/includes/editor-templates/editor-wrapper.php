<?php
namespace Elementor;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

global $wp_version;

$document = Plugin::$instance->documents->get( $this->_post_id );

$body_classes = [
	'elementor-editor-active',
	'wp-version-' . str_replace( '.', '-', $wp_version ),
];

if ( is_rtl_elementor_adapter() ) {
	$body_classes[] = 'rtl';
}
if ( ! Plugin::$instance->role_manager->user_can( 'design' ) ) {
	$body_classes[] = 'elementor-editor-content-only';
}
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title><?php echo ___elementor_adapter( 'Elementor', 'elementor' ) . ' | ' . get_the_title_elementor_adapter(); ?></title>
	<?php wp_head(); ?>
	<script>
		var ajaxurl = '<?php echo admin_url_elementor_adapter( 'admin-ajax.php', 'relative' ); ?>';
	</script>
</head>
<body class="<?php echo implode( ' ', $body_classes ); ?>">
<div id="elementor-editor-wrapper">
	<div id="elementor-panel" class="elementor-panel"></div>
	<div id="elementor-preview">
		<div id="elementor-loading">
			<div class="elementor-loader-wrapper">
				<div class="elementor-loader">
					<div class="elementor-loader-boxes">
						<div class="elementor-loader-box"></div>
						<div class="elementor-loader-box"></div>
						<div class="elementor-loader-box"></div>
						<div class="elementor-loader-box"></div>
					</div>
				</div>
				<div class="elementor-loading-title"><?php echo ___elementor_adapter( 'Loading', 'elementor' ); ?></div>
			</div>
		</div>
		<div id="elementor-preview-responsive-wrapper" class="elementor-device-desktop elementor-device-rotate-portrait">
			<div id="elementor-preview-loading">
				<i class="fa fa-spin fa-circle-o-notch" aria-hidden="true"></i>
			</div>
			<?php
			// IFrame will be create here by the Javascript later.
			?>
		</div>
	</div>
	<div id="elementor-navigator"></div>
</div>
<?php
	wp_footer();
	/** This action is documented in wp-admin/admin-footer.php */
	do_action_elementor_adapter( 'admin_print_footer_scripts' );
?>
</body>
</html>
