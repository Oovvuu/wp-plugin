<?php
/**
 * Oovvuu admin partials: Settings page template
 *
 * @package Oovvuu
 * @since 1.0.0
 */

?>

<div class="wrap">
	<h1><?php esc_html_e( 'Oovvuu', 'oovvuu' ); ?></h1>
	<?php settings_errors(); ?>

	<form method="post" action="options.php">
		<?php settings_fields( 'oovvuu_auth0_section' ); ?>
		<?php do_settings_sections( 'oovvuu_settings' ); ?>
		<?php submit_button(); ?>
	</form>
</div>
