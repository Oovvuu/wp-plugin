import React from 'react';
import { shallow } from 'enzyme';
import ClearIcon from 'assets/clear.svg';
import HeroCard from './index';

describe('Sidebar HeroCard', () => {
  const dispatchFn = jest.fn();
  const updateIsRemovingVideo = jest.fn();
  let translateFn;
  const videoMock = { thumbnail: { url: 'url' }, title: 'title' };

  beforeEach(() => {
    translateFn = jest.fn();
    global.wp = { i18n: { __: translateFn } };
    jest.spyOn(React, 'useContext').mockImplementationOnce(() => ({ state: { lastActionType: '' }, dispatch: dispatchFn }));
  });

  afterEach(() => {
    dispatchFn.mockClear();
  });

  it('Has ClearIcon', () => {
    const wrapper = shallow(<HeroCard
      updateIsRemovingVideo={updateIsRemovingVideo}
      isWorking={false}
      video={videoMock}
    />);

    expect(wrapper.find(ClearIcon)).toHaveLength(1);
  });
});
