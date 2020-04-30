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

<div class="card">
	<?php
	if ( ! $oovvuu_auth0->is_user_authenticated() ) {
		\Oovvuu\load_admin_partial( 'admin', 'unauthenticated-user-profile' );
	} else {
		\Oovvuu\load_admin_partial( 'admin', 'authenticated-user-profile' );
	}
	?>
</div>
