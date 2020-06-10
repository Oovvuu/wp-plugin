<?php
/**
 * Oovvuu admin field partials: oovvuu_auth0_domain field
 *
 * @package Oovvuu
 * @since 1.0.0
 */

$oovvuu_auto_replace_feature_image = get_option( 'oovvuu_auto_replace_feature_image', false );
?>

<div>
	<input
		type="checkbox"
		id="oovvuu_auto_replace_feature_image"
		name="oovvuu_auto_replace_feature_image"
		value="1"
		<?php checked( '1', $oovvuu_auto_replace_feature_image ); ?>
	/>
	<p class="description"><?php esc_html_e( 'Automatically replace the featured image with the Hero embed on single posts.', 'oovvuu' ); ?></p>
</div>
