<?php
/**
 * Oovvuu admin field partials: oovvuu_auth0_client_id field
 *
 * @package Oovvuu
 * @since 1.0.0
 */

$oovvuu_auth0_client_id = get_option( 'oovvuu_auth0_client_id', '' );
?>

<div>
	<input
		type="text"
		id="oovvuu_auth0_client_id"
		name="oovvuu_auth0_client_id"
		value="<?php echo esc_attr( $oovvuu_auth0_client_id ); ?>"
	/>
</div>
