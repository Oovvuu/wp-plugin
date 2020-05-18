import React from 'react';
import { shallow } from 'enzyme';
import PositionToggle from '../positionToggle';
import PositionWrapper from './index';

global.wp = { i18n: { __: () => 'translated' } };

describe('PositionWrapper', () => {
  it('Renders h3', () => {
    const wrapper = shallow(
      <PositionWrapper
        positionTitle="Title"
        videos={[]}
      />,
    );

    expect(wrapper.find('h3')).toHaveLength(1);
  });

  it('Renders PositionToggle', () => {
    const wrapper = shallow(
      <PositionWrapper
        positionTitle="Title"
        videos={[]}
      />,
    );

    expect(wrapper.find(PositionToggle)).toHaveLength(1);
  });
});
