<?php
/**
 * Class file for managing the site admin settings.
 *
 * @package Oovvuu
 */

namespace Oovvuu;

/**
 * Class Admin_Settings.
 */
class Admin_Settings {
	use Singleton;

	/**
	 * Settings page name.
	 *
	 * @since 1.0.0
	 *
	 * @var string
	 */
	private $page_name = 'oovvuu-settings';

	/**
	 * Setup the class.
	 *
	 * @since 1.0.0
	 */
	public function setup() {
		add_action( 'admin_init', [ $this, 'add_settings' ] );
		add_action( 'admin_menu', [ $this, 'setup_options_page' ], 99 );
	}

	/**
	 * Registers settings sections and settings fields.
	 *
	 * @since 1.0.0
	 */
	public function add_settings() {

		// Define fields to register.
		$fields = [
			'oovvuu_auth0_domain'        => [
				'label'    => esc_html__( 'Domain', 'oovvuu' ),
				'sanitize' => 'sanitize_text_field',
			],
			'oovvuu_auth0_client_id'     => [
				'label'    => esc_html__( 'Client ID', 'oovvuu' ),
				'sanitize' => 'sanitize_text_field',
			],
			'oovvuu_auth0_client_secret' => [
				'label'    => esc_html__( 'Client Secret', 'oovvuu' ),
				'sanitize' => 'sanitize_text_field',
			],
		];

		// Register the config section.
		add_settings_section(
			'oovvuu_auth0_section',
			esc_html__( 'Auth0 Configuration', 'oovvuu' ),
			null,
			'oovvuu_settings'
		);

		// Loop over field definitions and register each.
		foreach ( $fields as $field_key => $field_properties ) {

			// Add the definition for the field.
			add_settings_field(
				$field_key,
				$field_properties['label'],
				[ $this, 'render_field' ],
				'oovvuu_settings',
				'oovvuu_auth0_section',
				[
					'field_name' => $field_key,
					'label_for'  => str_replace( '_', '-', $field_key ),
				]
			);

			// Register the fields.
			register_setting(
				'oovvuu_auth0_section',
				$field_key,
				$field_properties['sanitize']
			);
		}
	}

	/**
	 * Settings page setup.
	 *
	 * @since 1.0.0
	 */
	public function setup_options_page() {
		add_menu_page(
			__( 'Oovvuu', 'oovvuu' ),
			__( 'Oovvuu', 'oovvuu' ),
			/**
			 * Filters the settings page capabilty.
			 *
			 * @param string The settings page capability.
			 */
			apply_filters( 'oovvuu_settings_capability', 'manage_options' ),
			$this->page_name,
			[ $this, 'page_options_render' ]
		);
	}

	/**
	 * Settings page render.
	 *
	 * @since 1.0.0
	 */
	public function page_options_render() {
		/**
		 * Filters the settings page capabilty.
		 *
		 * @param string The settings page capability.
		 */
		if ( ! current_user_can( apply_filters( 'oovvuu_settings_capability', 'manage_options' ) ) ) {
			wp_die( esc_html__( 'You do not have permissions to access this page.', 'oovvuu' ) );
		}

		// Load the partial for the settings page.
		$this->load( 'admin', 'settings' );
	}

	/**
	 * A callback function to render a configuration field using the Settings API.
	 *
	 * @param array $args {
	 *      An array of arguments passed to the callback during field registration.
	 *
	 *      @type string $field_name The name of the field that was registered.
	 *                               Required. Used to load the field render partial.
	 * }
	 *
	 * @since 1.0.0
	 */
	public function render_field( $args ) {

		// Ensure a field name was specified for loading the partial.
		if ( empty( $args['field_name'] ) ) {
			return;
		}

		// Load the partial for the field.
		$this->load( 'admin', 'fields/' . str_replace( '_', '-', $args['field_name'] ) );
	}

	/**
	 * A helper function for loading partials.
	 *
	 * @param string $scope Where to load the partial from (admin or public).
	 * @param string $slug The partial filepath to the partial template.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public static function load( $scope, $slug ) {

		// Ensure requested partial exists.
		$filepath = OOVVUU_PATH . '/admin/partials/' . $slug . '.php';
		if ( ! file_exists( $filepath ) ) {
			return;
		}

		require $filepath;
	}
}

// Initialize the class.
Admin_Settings::instance();
