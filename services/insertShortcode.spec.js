import insertShortcode from './insertShortcode';

// Sample oovvuu ids
const ids = [
  '00-vv-uu',
  '11-vv-uu',
];

// Shortcode samples
const shortcodes = [
  `[oovvuu-embed id="${ids[0]}"]`,
  `[oovvuu-embed id="${ids[1]}"]`,
];

// Less than 3 tags, expectedHtml = prevHtml
const prevHtml = ['<p>p1</p><ol><li>l1</li><li>l2</li></ol>'];
const expectedHtml = ['<p>p1</p><ol><li>l1</li><li>l2</li></ol>'];

// 3 tags, add shortcode as 4th tag
prevHtml.push(`${prevHtml[0]}<blockquote>q1</blockquote>`);
expectedHtml.push(`${prevHtml[0]}${shortcodes[0]}`);

// Replace shortcode id
prevHtml.push(prevHtml[0]);
expectedHtml.push(`${prevHtml[1]}${shortcodes[1]}`);

// Add another tag,shortcode should be 4th element
prevHtml.push(`${prevHtml[2]}<h4>h4-1</h4>`);
expectedHtml.push(`${prevHtml[2]}${shortcodes[0]}<h4>h4-1</h4>`);

// Adding a script for no reason
prevHtml.push(`<script type="text/javascript">var x = 1;</script>${prevHtml[3]}`);
expectedHtml.push(`<script type="text/javascript">var x = 1;</script>${prevHtml[2]}${shortcodes[1]}<h4>h4-1</h4>`);

describe('insertShortcode', () => {
  it('Swap videos within second position', () => {
    for (let index = 0; index < prevHtml.length; index + 1) {
      // Call the function and replace shortcode in every iteration
      const afterHtml = insertShortcode(ids[index % 2], prevHtml[index]);
      expect(afterHtml).toEqual(expectedHtml[index]);
    }
  });
});
