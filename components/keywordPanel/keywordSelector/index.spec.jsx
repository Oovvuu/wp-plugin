import React from 'react';
import { shallow } from 'enzyme';
import KeywordSelector from './';
import GeneratedList from './keywordList';
import UserList from './userKeywordList';

global.wp = { i18n: { __: () => 'translated' } };

describe('KeywordSelector', () => {
  it('Renders GeneratedList', () => {
    jest.spyOn(React, 'useContext')
      .mockImplementation(() => ({
        dispatch: jest.fn(),
        state: { recommendedKeywords: [] },
      }));

    const wrapper = shallow(<KeywordSelector />);

    expect(wrapper.find(GeneratedList)).toHaveLength(1);
  });

  it('Renders UserList', () => {
    jest.spyOn(React, 'useContext')
      .mockImplementation(() => ({
        dispatch: jest.fn(),
        state: { recommendedKeywords: [] },
      }));

    const wrapper = shallow(<KeywordSelector />);

    expect(wrapper.find(UserList)).toHaveLength(1);
  });

  describe('Builds and updates items correctly', () => {
    let dispatchFn;
    const keyword = 'keyword';
    let wrapper;
    let listComponent;
    let items;
    let firstItem;

    beforeEach(() => {
      dispatchFn = jest.fn();
      jest.spyOn(React, 'useContext')
        .mockImplementation(() => ({
          dispatch: dispatchFn,
          state: { recommendedKeywords: [keyword], selectedKeywords: [keyword] },
        }));
      jest.spyOn(React, 'useEffect')
        .mockImplementationOnce((effect) => effect());

      wrapper = shallow(<KeywordSelector />);

      // Find and select keyword item.
      listComponent = wrapper.find(GeneratedList);
      items = listComponent.prop('keywordItems');
      firstItem = items[keyword];
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Updates deselected items from the GeneratedList correctly', () => {
      const deselected = { ...firstItem, isSelected: false };
      listComponent.prop('onUpdate')(deselected);

      expect(dispatchFn).toHaveBeenCalledWith({ payload: [], type: 'UPDATE_SELECTED_KEYWORDS' });
    });

    it('Updates selected items from the GeneratedList correctly', () => {
      firstItem.isSelected = true;
      listComponent.prop('onUpdate')(firstItem);

      expect(dispatchFn).toHaveBeenCalledWith({ payload: [firstItem.keyword], type: 'UPDATE_SELECTED_KEYWORDS' });
    });
  });
});
