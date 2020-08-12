<?php
/**
 * Oovvuu admin partials: User Profile page template
 *
 * @package Oovvuu
 * @since 1.0.0
 */

$oovvuu_auth0 = \Oovvuu\Auth::instance();
$oovvuu_last_error_message = get_user_meta( get_current_user_id(), 'oovvuu_auth0_refresh_last_error', true );

?>
<p><span class="dashicons dashicons-no"></span> <?php esc_html_e( 'You are currently NOT authenticated with the Oovvuu API, please Login via the button below.', 'oovvuu' ); ?></p>

<?php
if ( ! empty( $oovvuu_last_error_message ) ) :
	?>
	<h3><?php esc_html_e( 'Error From Last Attempt to Authenticate', 'oovvuu' ); ?></h3>
	<?php if ( ! empty( $oovvuu_last_error_message['type'] ) ) : ?>
		<p><strong><?php esc_html_e( 'Type:', 'oovvuu' ); ?></strong> <?php echo esc_html( $oovvuu_last_error_message['type'] ); ?></p>
	<?php endif; ?>
	<p><strong><?php esc_html_e( 'Message:', 'oovvuu' ); ?></strong> <?php echo esc_html( is_string( $oovvuu_last_error_message ) ? $oovvuu_last_error_message : $oovvuu_last_error_message['message'] ?? '' ); ?></p>
	<?php
endif;
?>

<p>
	<a
		class="button button-primary"
		href="<?php echo esc_url( $oovvuu_auth0->get_auth_link() ); ?>"
	>
		<?php esc_html_e( 'Authenticate', 'oovvuu' ); ?>
	</a>
</p>
