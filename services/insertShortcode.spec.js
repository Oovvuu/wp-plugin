import insertShortcode from './insertShortcode';

// Shortcode Regex
const shortcodePattern = /\[(\[?)(oovvuu-embed)(?![\w-])([^\]\/]*(?:\/(?!\])[^\]\/]*)*?)(?:(\/)\]|\](?:([^\[]*(?:\[(?!\/\2\])[^\[]*)*)(\[\/\2\]))?)(\]?)/g;

// Sample oovvuu ids
const ids = ['00-vv-uu', '11-vv-uu'];

// Shortcode samples
const shortcodes = [
  `[oovvuu-embed id="${ids[0]}"]`,
  `[oovvuu-embed id="${ids[1]}"]`,
];

describe('insertShortcode', () => {
  it('Less than 3 tags, add shortcode to end of content', () => {
    const prevHtml = '<p>p1</p><ol><li>l1</li><li>l2</li></ol>';
    const expectedHtml = `<p>p1</p><ol><li>l1</li><li>l2</li></ol>${shortcodes[0]}`;
    const afterHtml = insertShortcode(ids[0], prevHtml, shortcodePattern, true);
    expect(afterHtml).toEqual(expectedHtml);
  });

  it('3 tags, add shortcode as 4th tag', () => {
    const prevHtml =
      '<p>p1</p><ol><li>l1</li><li>l2</li></ol><blockquote>q1</blockquote>';
    const expectedHtml = `<p>p1</p><ol><li>l1</li><li>l2</li></ol><blockquote>q1</blockquote>${shortcodes[1]}`;
    const afterHtml = insertShortcode(ids[1], prevHtml, shortcodePattern, true);
    expect(afterHtml).toEqual(expectedHtml);
  });

  it('Replace shortcode id', () => {
    const prevHtml = `<p>p1</p><ol><li>l1</li><li>l2</li></ol><blockquote>q1</blockquote>${shortcodes[1]}`;
    const expectedHtml = `<p>p1</p><ol><li>l1</li><li>l2</li></ol><blockquote>q1</blockquote>${shortcodes[0]}`;
    const afterHtml = insertShortcode(ids[0], prevHtml, shortcodePattern, true);
    expect(afterHtml).toEqual(expectedHtml);
  });

  it('Add another tag,shortcode should be 4th element', () => {
    const prevHtml =
      '<p>p1</p><ol><li>l1</li><li>l2</li></ol><blockquote>q1</blockquote><h4>h4-1</h4>';
    const expectedHtml = `<p>p1</p><ol><li>l1</li><li>l2</li></ol><blockquote>q1</blockquote>${shortcodes[0]}<h4>h4-1</h4>`;
    const afterHtml = insertShortcode(ids[0], prevHtml, shortcodePattern, true);
    expect(afterHtml).toEqual(expectedHtml);
  });

  it('Adding a script', () => {
    const prevHtml =
      '<script type="text/javascript">var x = 1;</script><p>p1</p><ol><li>l1</li><li>l2</li></ol><blockquote>q1</blockquote><h4>h4-1</h4>';
    const expectedHtml = `<script type="text/javascript">var x = 1;</script><p>p1</p><ol><li>l1</li><li>l2</li></ol>${shortcodes[0]}<blockquote>q1</blockquote><h4>h4-1</h4>`;
    const afterHtml = insertShortcode(ids[0], prevHtml, shortcodePattern, true);
    expect(afterHtml).toEqual(expectedHtml);
  });

  it('Empty <p> around shortcode gets removed, but not the empty <div>', () => {
    const prevHtml = `<p>p1</p><ol><li>l1</li><li>l2</li></ol><blockquote>q1</blockquote><p>${shortcodes[1]}</p><div id="test"></div>`;
    const expectedHtml = `<p>p1</p><ol><li>l1</li><li>l2</li></ol><blockquote>q1</blockquote>${shortcodes[0]}<div id="test"></div>`;
    const afterHtml = insertShortcode(ids[0], prevHtml, shortcodePattern, true);
    expect(afterHtml).toEqual(expectedHtml);
  });

  it('<p> Around shortcode with extra content, the shortcode is removed but the extra content stays', () => {
    const prevHtml = `<p>p1</p><ol><li>l1</li><li>l2</li></ol><blockquote>q1</blockquote><p>${shortcodes[1]} test</p><div id="test"></div>`;
    const expectedHtml = `<p>p1</p><ol><li>l1</li><li>l2</li></ol><blockquote>q1</blockquote>${shortcodes[0]}<p> test</p><div id="test"></div>`;
    const afterHtml = insertShortcode(ids[0], prevHtml, shortcodePattern, true);
    expect(afterHtml).toEqual(expectedHtml);
  });
});
