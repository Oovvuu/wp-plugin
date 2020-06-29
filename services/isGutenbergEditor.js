/**
 * Determines if we are in the Gutenberg editor.
 *
 * @return {bool} True if this is the Gutenberg editor, otherwise false.
 */
const isGutenbergEditor = () => (document.getElementById('oovvuu-classic-editor-react-app') === null);

export default isGutenbergEditor;
