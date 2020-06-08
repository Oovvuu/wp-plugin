import React from 'react';
import { shallow } from 'enzyme';
import KeywordInput from './index';

global.wp = {
  i18n: { __: jest.fn(() => 'translated') },
};

describe('KeywordInput', () => {
  const onUpdate = jest.fn();
  const setKeyword = jest.fn();
  jest.spyOn(React, 'useState').mockImplementation(() => ['keyword', setKeyword]);

  it('Correctly submits the form', () => {
    const wrapper = shallow(<KeywordInput onUpdate={onUpdate} />);
    const form = wrapper.find('form');

    expect(form).toHaveLength(1);

    form.simulate('submit', { preventDefault() {} });
    expect(setKeyword).toHaveBeenCalledWith('');
    expect(onUpdate).toHaveBeenCalledWith('keyword');
  });

  it('Submits the form on TAB key down', () => {
    const wrapper = shallow(<KeywordInput onUpdate={onUpdate} />);
    const input = wrapper.find('input');

    expect(input).toHaveLength(1);

    input.simulate('keydown', { keyCode: 9, preventDefault() {} });
    expect(setKeyword).toHaveBeenCalled();
    expect(onUpdate).toHaveBeenCalled();
  });
});
