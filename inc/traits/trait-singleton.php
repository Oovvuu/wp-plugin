<?php
/**
 * Trait file for Singletons.
 *
 * @package Oovvuu
 */

namespace Oovvuu;

/**
 * Make a class into a singleton.
 */
trait Singleton {
	/**
	 * Existing instance.
	 *
	 * @since 1.0.0
	 *
	 * @var array
	 */
	protected static $instance;

	/**
	 * Get class instance.
	 *
	 * @since 1.0.0
	 *
	 * @return object
	 */
	public static function instance() {
		// phpcs:disable WordPressVIPMinimum.Variables.VariableAnalysis.StaticOutsideClass
		if ( ! isset( static::$instance ) ) {
			static::$instance = new static();
			static::$instance->setup();
		}
		return static::$instance;
		// phpcs:enable WordPressVIPMinimum.Variables.VariableAnalysis.StaticOutsideClass
	}

	/**
	 * Setup the singleton.
	 *
	 * @since 1.0.0
	 */
	public function setup() {
		// Silence.
	}
}
