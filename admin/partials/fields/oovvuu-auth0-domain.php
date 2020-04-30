<?php
/**
 * Oovvuu admin field partials: oovvuu_auth0_domain field
 *
 * @package Oovvuu
 * @since 1.0.0
 */

$oovvuu_auth0_domain = get_option( 'oovvuu_auth0_domain', '' );
?>

<div>
	<input
		type="text"
		id="oovvuu_auth0_domain"
		name="oovvuu_auth0_domain"
		class="regular-text"
		value="<?php echo esc_attr( $oovvuu_auth0_domain ); ?>"
	/>
</div>
