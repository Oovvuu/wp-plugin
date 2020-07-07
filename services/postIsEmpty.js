import getPostAttribute from 'services/getPostAttribute';

/**
 * Test post content for an empty title and content.
 *
 * @return {boolean} Whether the post is empty
 */
const postIsEmpty = () => {
  const title = getPostAttribute('title');
  const content = getPostAttribute('content');

  return (title.trim() === '' || content.trim() === '');
};

export default postIsEmpty;
