import isGutenbergEditor from './isGutenbergEditor';

/**
 * Performs an API request to obtain keywords for an article given its title and
 * content.
 *
 * @param  {[string]} attribute The post arribute name.
 * @return {[mixed]}            The post attribute value.
 */
const getPostAttribute = (attribute) => {
  // Gutenberg.
  if (isGutenbergEditor() && wp.data) {
    return wp.data.select('core/editor').getEditedPostAttribute(attribute);
  }

  switch (attribute) {
    case 'title': {
      return document.getElementById('title')?.value;
    }
    case 'content': {
      return tinymce?.editors?.content?.getContent();
    }
    case 'id': {
      return document.getElementById('post_ID')?.value;
    }
    default: {
      return undefined;
    }
  }
};

export default getPostAttribute;
