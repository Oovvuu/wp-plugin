/* global tinymce */

/**
 * Performs an API request to obtain keywords for an article given its title and
 * content.
 *
 * @param  {[string]} attribute The post arribute name.
 * @return {[mixed]}            The post attribute value.
 */
const getPostAttribute = (attribute) => {
  // Gutenberg.
  if (wp.data) {
    return wp.data.select('core/editor').getEditedPostAttribute(attribute);
  }

  let value = null;

  switch (attribute) {
    case 'title': {
      const titleEl = document.getElementById('title');
      if (titleEl && titleEl.value) {
        value = titleEl.value;
      }
      break;
    }
    case 'content':
      if (
        tinymce !== undefined
      && tinymce.editors !== undefined
      && tinymce.editors.content !== undefined
      ) {
        value = tinymce.editors.content.getContent();
      }
      break;
    case 'id': {
      const postIDEl = document.getElementById('post_ID');
      if (postIDEl && postIDEl.value) {
        value = postIDEl.value;
      }
      break;
    }
    default:
      value = null;
      break;
  }

  // Return the attribute value.
  return value;
};

export default getPostAttribute;
