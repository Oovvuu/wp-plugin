import React from 'react';
import { shallow } from 'enzyme';
import KeywordInput from './index';

global.wp = {
  i18n: { __: jest.fn(() => 'translated') },
};

describe('KeywordInput', () => {
  const onUpdate = jest.fn();
  const setKeyword = jest.fn();
  const inputRef = React.createRef();
  jest.spyOn(React, 'useState').mockImplementation(() => ['keyword', setKeyword]);

  it('Correctly submits the form', () => {
    const wrapper = shallow(<KeywordInput inputRef={inputRef} onUpdate={onUpdate} />);
    const input = wrapper.find('input');

    expect(input).toHaveLength(1);

    input.simulate('keydown', { keyCode: 13, preventDefault() {} });
    expect(setKeyword).toHaveBeenCalledWith('');
    expect(onUpdate).toHaveBeenCalledWith('keyword');
  });

  it('Submits the form on TAB key down', () => {
    const wrapper = shallow(<KeywordInput inputRef={inputRef} onUpdate={onUpdate} />);
    const input = wrapper.find('input');

    expect(input).toHaveLength(1);

    input.simulate('keydown', { keyCode: 9, preventDefault() {} });
    expect(setKeyword).toHaveBeenCalled();
    expect(onUpdate).toHaveBeenCalled();
  });
});
