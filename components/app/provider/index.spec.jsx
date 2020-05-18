import { shallow } from 'enzyme';
import React from 'react';
import OovvuuDataContext from '../context';
import Provider from './';

const children = <p>Hello, world!</p>;

describe('AppStateProvider', () => {
  it('Renders a context Provider', () => {
    const wrapper = shallow(<Provider>{children}</Provider>);

    expect(wrapper.find(OovvuuDataContext.Provider)).toHaveLength(1);
  });
});
