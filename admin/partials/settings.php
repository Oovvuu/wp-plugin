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
		<h3><?php esc_html_e( 'Application Setup', 'oovvuu' ); ?></h3>
		<p>
			<?php
			echo esc_html__( 'The Oovvuu WordPress plugin provides functionality that depends on the Oovvuu API. Once your Oovvuu account is created, Oovvuu will provide to you the settings that are listed below. However, there is a specific piece of information that Oovvuu will need in order to finalize the creation of the application that will connect with this site. The below redirect callback URL should be copied and shared with the Oovvuu team so that they can finalize your account setup.', 'oovvuu' );
			?>
		</p>
		<p>
			<label><?php esc_html_e( 'Redirect Callback URL', 'oovvuu' ); ?></label>
			<textarea readonly cols="62" rows="3"><?php echo esc_html( \Oovvuu\Auth::instance()->get_redirect_callback() ); ?></textarea>
		</p>
	</div>

	<form method="post" action="options.php">
		<?php settings_fields( 'oovvuu_auth0_section' ); ?>
		<?php do_settings_sections( 'oovvuu_settings' ); ?>
		<?php submit_button(); ?>
	</form>
</div>
