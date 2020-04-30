<?php
/**
 * Oovvuu admin partials: User Profile page template
 *
 * @package Oovvuu
 * @since 1.0.0
 */

$oovvuu_auth0 = \Oovvuu\Auth::instance();

?>
<h2><?php esc_html_e( 'Oovvuu Authentication', 'oovvuu' ); ?></h2>
<?php

if ( ! $oovvuu_auth0->is_user_authenticated() ) {
	// Un-authenticated.
	?>
	<a
		class="button button-primary"
		href="<?php echo esc_url( $oovvuu_auth0->get_auth_link() ); ?>"
	>
		<?php esc_html_e( 'Login', 'oovvuu' ); ?>
	</a>
	<?php
} else {
	// Authenticated.
	?>
	<a
		class="button"
		href="<?php echo esc_url( /* TODO: Add logout link */ ); ?>"
	>
		<?php esc_html_e( 'Logout', 'oovvuu' ); ?>
	</a>
	<?php
}
