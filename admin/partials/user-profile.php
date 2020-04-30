<?php
/**
 * Oovvuu admin partials: User Profile page template
 *
 * @package Oovvuu
 * @since 1.0.0
 */

?>
<h2><?php esc_html_e( 'Oovvuu Authentication', 'oovvuu' ); ?></h2>
<?php

$oovvuu_auth0        = \Oovvuu\Auth::instance();
$oovvuu_auth0_client = $oovvuu_auth0->get_client();

// Invalid client.
if ( empty( $oovvuu_auth0_client ) ) {
	?>
	<p><?php esc_html_e( 'Unable to connect with Auth0 API', 'oovvuu' ); ?></p>
	<?php
}

if ( ! $oovvuu_auth0->is_user_authenticated() ) {
	?>
	<a
		class="button button-primary"
		href="<?php echo esc_url( $oovvuu_auth0->get_auth_link() ); ?>"
	>
		<?php esc_html_e( 'Login', 'oovvuu' ); ?>
	</a>
	<?php
} else {
	?>
	<a
		class="button"
		href="<?php echo esc_url( /* TODO: Add logout link */ ); ?>"
	>
		<?php esc_html_e( 'Logout', 'oovvuu' ); ?>
	</a>
	<?php
}
