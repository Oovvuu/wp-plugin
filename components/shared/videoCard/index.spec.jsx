import React from 'react';
import { shallow } from 'enzyme';
import VideoCardWrapper from './index';

const mockVideo = {
  summary: 'summary',
  clipLength: '13:12',
  modified: new Date().toISOString(),
  title: 'title',
  url: 'url',
  legalName: 'Legal Name',
};
global.wp = { i18n: { __: () => 'translated' } };

describe('VideoCardWrapper', () => {
  const dispatchFn = jest.fn();

  beforeEach(() => {
    jest.spyOn(React, 'useContext')
      .mockImplementation(() => ({
        dispatch: dispatchFn,
        state: { currentDraggingVideo: [] },
      }));
  });

  afterEach(() => {
    dispatchFn.mockClear();
  });

  it('Renders logo image', () => {
    const wrapper = shallow(
      <VideoCardWrapper
        summary={mockVideo.summary}
        clipLength={mockVideo.clipLength}
        modified={mockVideo.modified}
        title={mockVideo.title}
        url={mockVideo.url}
        legalName={mockVideo.legalName}
      />,
    );

    expect(wrapper.find('div img[alt="Legal Name"]')).toHaveLength(1);
  });

  it('Renders title', () => {
    const wrapper = shallow(
      <VideoCardWrapper
        summary={mockVideo.summary}
        clipLength={mockVideo.clipLength}
        modified={mockVideo.modified}
        title={mockVideo.title}
        url={mockVideo.url}
        legalName={mockVideo.legalName}
      />,
    );

    expect(wrapper.find('h4.title')).toHaveLength(1);
  });

  it('Renders video meta', () => {
    const wrapper = shallow(
      <VideoCardWrapper
        summary={mockVideo.summary}
        clipLength={mockVideo.clipLength}
        modified={mockVideo.modified}
        title={mockVideo.title}
        url={mockVideo.url}
        legalName={mockVideo.legalName}
      />,
    );

    expect(wrapper.find('div.meta')).toHaveLength(1);
  });

  it('Renders video description', () => {
    const wrapper = shallow(
      <VideoCardWrapper
        summary={mockVideo.summary}
        clipLength={mockVideo.clipLength}
        modified={mockVideo.modified}
        title={mockVideo.title}
        url={mockVideo.url}
        legalName={mockVideo.legalName}
      />,
    );

    expect(wrapper.find('p.description')).toHaveLength(1);
  });
});
