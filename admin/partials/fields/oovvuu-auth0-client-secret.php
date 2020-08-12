<?php
/**
 * Oovvuu admin field partials: oovvuu_auth0_client_secret field
 *
 * @package Oovvuu
 * @since 1.0.0
 */

$oovvuu_auth0_client_secret = get_option( 'oovvuu_auth0_client_secret', '' );
?>

<div>
	<input
		type="password"
		id="oovvuu_auth0_client_secret"
		name="oovvuu_auth0_client_secret"
		class="regular-text"
		value="<?php echo esc_attr( $oovvuu_auth0_client_secret ); ?>"
	/>
</div>
