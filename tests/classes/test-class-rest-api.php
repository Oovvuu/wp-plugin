<?php
/**
 * Tests the REST API class.
 *
 * @package Oovvuu
 */

class REST_API_Test extends WP_UnitTestCase {

	/**
	 * Tests sanitizing HTML.
	 */
	public function test_sanitize_html_for_api() {
		$actual_html = '<!-- wp:heading -->
<h2>Heading</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>content</p>
<!-- /wp:paragraph -->

<p>invalid content</span>

<!-- wp:image {"id":1,"sizeSlug":"large"} -->
<figure class="wp-block-image size-large"><img src="http://example.com/image.jpeg" alt="" class="wp-image-1"/><figcaption>Caption</figcaption></figure>
<!-- /wp:image -->

<!-- wp:list -->
<ul><li>List item</li><li>Another list item</li></ul>
<!-- /wp:list -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><p>Quote</p><cite>Citation</cite></blockquote>
<!-- /wp:quote -->

<!-- wp:nextpage -->
<!--nextpage-->
<!-- /wp:nextpage -->

<!-- wp:html -->
<script>hey</script>
<!-- /wp:html -->';
		$expected_html = 'Heading content invalid content Caption List item Another list item Quote Citation';

		$this->assertEquals( $expected_html, \Oovvuu\REST_API::instance()->sanitize_html_for_api( $actual_html ) );
	}
}
