import * as isGutenbergEditor from 'services/isGutenbergEditor';
import postIsEmpty from './postIsEmpty';

beforeEach(() => {
  global.wp = {
    data: {
      select: () => ({}),
    },
  };

  jest.spyOn(isGutenbergEditor, 'default').mockReturnValue(true);
});

describe('postIsEmpty', () => {
  it('Should be `false` for non-empty post', () => {
    jest.spyOn(wp.data, 'select')
      .mockImplementationOnce(() => ({
        getEditedPostAttribute: jest.fn().mockReturnValue('title'),
      }))
      .mockImplementationOnce(() => ({
        getEditedPostAttribute: jest.fn().mockReturnValue('content'),
      }));
    expect(postIsEmpty()).toBeFalsy();
  });

  it('Should be `true` for post with title but no content', () => {
    jest.spyOn(wp.data, 'select')
      .mockImplementationOnce(() => ({
        getEditedPostAttribute: jest.fn().mockReturnValue('title'),
      }))
      .mockImplementationOnce(() => ({
        getEditedPostAttribute: jest.fn().mockReturnValue(''),
      }));
    expect(postIsEmpty()).toBeTruthy();
  });

  it('Should be `true` for empty post', () => {
    jest.spyOn(wp.data, 'select')
      .mockImplementationOnce(() => ({
        getEditedPostAttribute: jest.fn().mockReturnValue(''),
      }))
      .mockImplementationOnce(() => ({
        getEditedPostAttribute: jest.fn().mockReturnValue(''),
      }));
    expect(postIsEmpty()).toBeTruthy();
  });

  it('Should be `true` for any undefined post attribute', () => {
    jest.spyOn(wp.data, 'select')
      .mockImplementationOnce(() => ({
        getEditedPostAttribute: jest.fn().mockReturnValue('title'),
      }))
      .mockImplementationOnce(() => ({
        getEditedPostAttribute: jest.fn().mockReturnValue(undefined),
      }));
    expect(postIsEmpty()).toBeTruthy();
  });
});
