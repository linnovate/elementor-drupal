<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}
?>
<script type="text/template" id="tmpl-elementor-templates-modal__header">
	<div class="elementor-templates-modal__header__logo-area"></div>
	<div class="elementor-templates-modal__header__menu-area"></div>
	<div class="elementor-templates-modal__header__items-area">
		<div class="elementor-templates-modal__header__close elementor-templates-modal__header__close--{{{ 'skip' === closeType ? 'skip' : 'normal' }}} elementor-templates-modal__header__item">
			<# if ( 'skip' === closeType ) { #>
			<span><?php echo ___elementor_adapter( 'Skip', 'elementor' ); ?></span>
			<# } #>
			<i class="eicon-close" aria-hidden="true" title="<?php echo ___elementor_adapter( 'Close', 'elementor' ); ?>"></i>
			<span class="elementor-screen-only"><?php echo ___elementor_adapter( 'Close', 'elementor' ); ?></span>
		</div>
		<div id="elementor-template-library-header-tools"></div>
	</div>
</script>

<script type="text/template" id="tmpl-elementor-templates-modal__header__logo">
	<span class="elementor-templates-modal__header__logo__icon-wrapper">
		<i class="eicon-elementor"></i>
	</span>
	<span class="elementor-templates-modal__header__logo__title">{{{ title }}}</span>
</script>
