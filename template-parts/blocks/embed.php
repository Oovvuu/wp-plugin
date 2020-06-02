<?php
/**
 * The template part for the Embed block.
 *
 * @param array $attributes The block attributes.
 * @param string $content The inner blocks.
 *
 * @package Oovvuu
 */

namespace Oovvuu;

if ( empty( $attributes ) || empty( $attributes['id'] ) ) {
	return;
}

?>
<script>!function(e,t,o){let n;const r=e.getElementsByTagName("script")[0];e.getElementById(o)||(n=e.createElement("script"),n.id=o,n.onload=()=>{},n.src="https://playback.prod.oovvuu.io/player/bundle.js",r.parentNode.insertBefore(n,r))}(document,0,"oovvuu-player-sdk");</script>
<div data-oovvuu-embed='<?php echo esc_attr( $attributes['id'] ); ?>'></div>
