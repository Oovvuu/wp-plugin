import * as isGutenbergEditor from 'services/isGutenbergEditor';
import getPostAttribute from './getPostAttribute';

describe('getPostAttribute', () => {
  beforeEach(() => {
    // Leaves `editors.content` undefined for the content test.
    global.tinymce = {
      editors: {},
    };

    jest.spyOn(isGutenbergEditor, 'default').mockReturnValue(false);
  });

  it('Gets Classic Editor post title', () => {
    expect(getPostAttribute('title')).toBeUndefined();

    document.body.innerHTML = '<input id="title" value="the title" />';
    expect(getPostAttribute('title')).toEqual('the title');

    document.body.innerHTML = '<input id="title" value="" />';
    expect(getPostAttribute('title')).toEqual('');
  });

  it('Gets Classic Editor post content', () => {
    expect(getPostAttribute('content')).toBeUndefined();

    tinymce.editors.content = {
      getContent: jest.fn().mockReturnValue('the content'),
    };
    expect(getPostAttribute('content')).toEqual('the content');
  });

  it('Gets Classic Editor post id', () => {
    expect(getPostAttribute('id')).toBeUndefined();

    document.body.innerHTML = '<input id="post_ID" value="44" />';
    expect(getPostAttribute('id')).toEqual('44');
  });
});
