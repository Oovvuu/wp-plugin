<?php
/**
* Tests the Auth class.
*
* @package Oovvuu
*/

use Oovvuu\Auth;

class Auth_Test extends WP_UnitTestCase {

	public function setUp() {
		parent::tearDown();
		// Login a user.
		$this->admin_id = self::factory()->user->create(
			[
				'role' => 'administrator',
			]
		);
	}

	public function tearDown() {
		parent::tearDown();

		wp_set_current_user( 0 );
	}

	/**
	 * Tests if a user is currently authenticated.
	 */
	public function test_is_user_authenticated() {
		// Without a current user logged in, authentication will fail.
		$this->assertFalse( Auth::instance()->is_user_authenticated() );

		// Login a user.
		wp_set_current_user( $this->admin_id );

		// Without an access token set the user is unauthenticated.
		$this->assertFalse( Auth::instance()->is_user_authenticated() );

		// Add access token.
		update_user_meta( $this->admin_id, 'oovvuu_auth0_token', true );

		$this->assertTrue( Auth::instance()->is_user_authenticated() );
	}
}
