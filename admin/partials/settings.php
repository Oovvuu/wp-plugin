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

	<div class="card">
		<h3><?php esc_html_e( 'Auth0 Application Setup', 'oovvuu' ); ?></h3>
		<p>
			<?php
			echo esc_html__( 'Send this redirect callback over to the Oovvuu team so that you can connect this WP site to Oovvuu.', 'oovvuu' );
			?>
		</p>
		<p>
			<label><?php esc_html_e( 'Redirect Callback', 'oovvuu' ); ?></label>
			<textarea readonly cols="62" rows="3"><?php echo esc_html( \Oovvuu\Auth::instance()->get_redirect_callback() ); ?></textarea>
		</p>
	</div>

	<form method="post" action="options.php">
		<?php settings_fields( 'oovvuu_auth0_section' ); ?>
		<?php do_settings_sections( 'oovvuu_settings' ); ?>
		<?php submit_button(); ?>
	</form>
</div>
