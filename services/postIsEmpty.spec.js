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

  it('Should be `false` if a title OR content is present', () => {
    jest.spyOn(wp.data, 'select')
      .mockImplementationOnce(() => ({
        getEditedPostAttribute: jest.fn().mockReturnValue('title'),
      }))
      .mockImplementationOnce(() => ({
        getEditedPostAttribute: jest.fn().mockReturnValue(''),
      }));
    expect(postIsEmpty()).toBeFalsy();
  });

  it('Should be `true` for completely empty post', () => {
    jest.spyOn(wp.data, 'select')
      .mockImplementationOnce(() => ({
        getEditedPostAttribute: jest.fn().mockReturnValue(''),
      }))
      .mockImplementationOnce(() => ({
        getEditedPostAttribute: jest.fn().mockReturnValue(undefined),
      }));
    expect(postIsEmpty()).toBeTruthy();
  });

  it('Should be `false` if any post attribute is defined', () => {
    jest.spyOn(wp.data, 'select')
      .mockImplementationOnce(() => ({
        getEditedPostAttribute: jest.fn().mockReturnValue('title'),
      }))
      .mockImplementationOnce(() => ({
        getEditedPostAttribute: jest.fn().mockReturnValue(undefined),
      }));
    expect(postIsEmpty()).toBeFalsy();
  });
});
