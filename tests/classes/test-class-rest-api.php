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

<!-- wp:shortcode -->
[oovvuu-embed id="123456789"]
<!-- /wp:shortcode -->

<!-- wp:image {"id":1,"sizeSlug":"large"} -->
<figure class="wp-block-image size-large"><img src="http://example.com/image.jpeg" alt="" class="wp-image-1"/><figcaption>Caption</figcaption></figure>
<!-- /wp:image -->

<!-- wp:list -->
<ul><li>List item</li><li>Another list item</li></ul>
<!-- /wp:list -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><p>Quote</p><cite>Citation</cite></blockquote>
<!-- /wp:quote -->

<!-- wp:paragraph -->
<span>this</span><span>that</span>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>2<sup>nd</sup></p>
<!-- /wp:paragraph -->

<!-- wp:nextpage -->
<!--nextpage-->
<!-- /wp:nextpage -->

<!-- wp:html -->
<script>hey</script>
<!-- /wp:html -->';
		$expected_html = 'Heading content invalid content Caption List item Another list item Quote Citation thisthat 2nd';

		$this->assertEquals( $expected_html, \Oovvuu\REST_API::instance()->sanitize_html_for_api( $actual_html ) );
	}
}
