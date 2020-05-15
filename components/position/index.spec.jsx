import React from 'react';
import { shallow } from 'enzyme';
import PositionWrapper from './index';

global.wp = { i18n: { __: () => 'translated' } };

describe('PositionWrapper', () => {
  it('Renders h3', () => {
    const wrapper = shallow(
      <PositionWrapper>
        <p>Hello, world!</p>
      </PositionWrapper>,
    );

    expect(wrapper.find('h3')).toHaveLength(1);
  });
});
