import React from 'react';
import { mount, shallow } from 'enzyme';
import ClearIcon from 'assets/clear.svg';
import HeroCard from './index';

describe('Sidebar HeroCard', () => {
  const dispatchFn = jest.fn();
  let translateFn;
  const videoMock = { id: '1' };

  beforeEach(() => {
    translateFn = jest.fn();
    global.wp = { i18n: { __: translateFn } };
    jest.spyOn(React, 'useContext').mockImplementationOnce(() => ({ dispatch: dispatchFn }));
  });

  afterEach(() => {
    dispatchFn.mockClear();
  });

  it('Has ClearIcon', () => {
    const wrapper = shallow(<HeroCard video={videoMock} />);

    expect(wrapper.find(ClearIcon)).toHaveLength(1);
  });

  it('Dispatches REMOVE_SIDEBAR_SELECTED_HERO when ActionButton is clicked', () => {
    const wrapper = mount(<HeroCard video={videoMock} />);

    wrapper.find('button').simulate('click');
    expect(dispatchFn).toHaveBeenCalledTimes(1);
  });
});
