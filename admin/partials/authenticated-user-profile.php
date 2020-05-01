<?php
/**
 * Oovvuu admin partials: Authenticated User Profile page template
 *
 * @package Oovvuu
 * @since 1.0.0
 */

$oovvuu_auth0 = \Oovvuu\Auth::instance();

// Refresh the token if needed.
$oovvuu_current_user_token = $oovvuu_auth0->get_user_token_with_refresh( get_current_user_id() );

// Show unauthenticated view if the refresh has failed.
if ( ! $oovvuu_auth0->is_token_valid( $oovvuu_current_user_token ) ) {
	\Oovvuu\load_admin_partial( 'admin', 'unauthenticated-user-profile' );
	return;
}

?>
<p><span class="dashicons dashicons-yes-alt"></span> <?php esc_html_e( 'You are currently authenticated with the Oovvuu API.', 'oovvuu' ); ?></p>

<p>
	<a
		class="button"
		href="<?php echo esc_url( $oovvuu_auth0->get_redirect_callback() . '&logout=true' ); ?>"
	>
		<?php esc_html_e( 'Disconnect from Oovvuu', 'oovvuu' ); ?>
	</a>
	<a
		class="button button-primary"
		href="<?php echo esc_url( $oovvuu_auth0->get_auth_link() ); ?>"
	>
		<?php esc_html_e( 'Re-authenticate', 'oovvuu' ); ?>
	</a>
</p>
