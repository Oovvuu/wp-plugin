/**
 * Determines if we are in the Gutenberg editor.
 *
 * @return {bool} True if this is the Gutenberg editor, otherwise false.
 */
const isGutenbergEditor = () => {
  const classicEditorEl = document.getElementById('oovvuu-classic-editor-react-app');

  // Classic editor.
  if (classicEditorEl !== null) {
    return false;
  }

  return true;
};

export default isGutenbergEditor;
