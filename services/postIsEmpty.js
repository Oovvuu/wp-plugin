import getPostAttribute from 'services/getPostAttribute';

/**
 * Test post content for an empty title and content.
 *
 * @return {boolean} Whether the post is empty
 */
const postIsEmpty = () => {
  const title = getPostAttribute('title');
  const content = getPostAttribute('content');

  // getEditedPostAttribute will return `undefined` or a string.
  return (
    (title === undefined || content === undefined)
    || (title.trim() === '' || content.trim() === '')
  );
};

export default postIsEmpty;
