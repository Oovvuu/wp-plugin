<?php
/**
 * Oovvuu admin partials: Authenticated User Profile page template
 *
 * @package Oovvuu
 * @since 1.0.0
 */

$oovvuu_auth0 = \Oovvuu\Auth::instance();

// Refresh the token if needed.
$oovvuu_current_user_token = $oovvuu_auth0->get_user_token( get_current_user_id() );

// Show unauthenticated view if the refresh has failed.
if ( ! $oovvuu_auth0->is_token_valid( $oovvuu_current_user_token ) ) {
	\Oovvuu\load_admin_partial( 'admin', 'unauthenticated-user-profile' );
	return;
}

?>
<p><span class="dashicons dashicons-yes-alt"></span> <?php esc_html_e( 'You are currently authenticated with the Oovvuu API.', 'oovvuu' ); ?></p>

<h3><?php esc_html_e( 'Token Information', 'oovvuu' ); ?></h3>
<p><strong><?php esc_html_e( 'Authenticated At:', 'oovvuu' ); ?></strong> <?php echo esc_html( \Oovvuu\get_date_with_timezone( $oovvuu_current_user_token['added_at'] ) ); ?></p>
<p><strong><?php esc_html_e( 'Expires At:', 'oovvuu' ); ?></strong> <?php echo esc_html( \Oovvuu\get_date_with_timezone( $oovvuu_current_user_token['added_at'] + $oovvuu_current_user_token['expires_in'] ) ); ?></p>
<p><strong><?php esc_html_e( 'Auto-renews At:', 'oovvuu' ); ?></strong> <?php echo esc_html( \Oovvuu\get_date_with_timezone( wp_next_scheduled( 'oovvuu_auth0_user_refresh_cron' ) ) ); ?></p>

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
