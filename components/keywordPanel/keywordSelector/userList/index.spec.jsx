import React from 'react';
import { shallow } from 'enzyme';
import UserList from './index';

describe('UserList', () => {
  it('Renders p', () => {
    const wrapper = shallow(<UserList keywordItems={{}} onUpdate={() => true} />);

    expect(wrapper.find('p')).toHaveLength(1);
  });
});
