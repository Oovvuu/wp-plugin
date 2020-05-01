<?php
/**
 * Oovvuu admin partials: Authenticated User Profile page template
 *
 * @package Oovvuu
 * @since 1.0.0
 */

$oovvuu_auth0              = \Oovvuu\Auth::instance();
$oovvuu_current_user_token = \Oovvuu\Auth::instance()->get_user_token( get_current_user_id() );

?>
<p><span class="dashicons dashicons-yes-alt"></span> <?php esc_html_e( 'You are currently authenticated with the Oovvuu API.', 'oovvuu' ); ?></p>

<p>
	<a
		class="button"
		href="<?php echo esc_url( $oovvuu_auth0->get_redirect_callback() . '&logout=true' ); ?>"
	>
		<?php esc_html_e( 'Logout', 'oovvuu' ); ?>
	</a>
	<a
		class="button button-primary"
		href="<?php echo esc_url( $oovvuu_auth0->get_auth_link() ); ?>"
	>
		<?php esc_html_e( 'Reconnect', 'oovvuu' ); ?>
	</a>
</p>
