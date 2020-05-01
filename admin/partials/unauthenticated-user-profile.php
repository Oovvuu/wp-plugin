<?php
/**
 * Oovvuu admin partials: User Profile page template
 *
 * @package Oovvuu
 * @since 1.0.0
 */

$oovvuu_auth0 = \Oovvuu\Auth::instance();

?>
<p><span class="dashicons dashicons-no"></span> <?php esc_html_e( 'You are currently NOT authenticated with the Oovvuu API, please Login via the button below.', 'oovvuu' ); ?></p>
<p>
	<a
		class="button button-primary"
		href="<?php echo esc_url( $oovvuu_auth0->get_auth_link() ); ?>"
	>
		<?php esc_html_e( 'Authenticate', 'oovvuu' ); ?>
	</a>
</p>
