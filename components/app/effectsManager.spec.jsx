import React from 'react';
import { shallow } from 'enzyme';
import initialState from 'components/app/context/initialState';
import * as getKeywords from 'services/getKeywords';
import * as getPostAttribute from 'services/getPostAttribute';
import * as getTopicVideos from 'services/getTopicVideos';
import EffectsManager from './effectsManager';

jest.spyOn(React, 'useEffect')
  .mockImplementation((effect) => effect());

describe('EffectsManager', () => {
  let dispatchFn;
  const mockState = initialState;

  beforeEach(() => {
    dispatchFn = jest.fn();
  });

  afterEach(() => {
    dispatchFn.mockClear();
  });

  it('Fetches keywords on FETCH_KEYWORDS action', async () => {
    global.wp = { i18n: { __: jest.fn(() => 'translated') } };
    const keywords = ['keyword'];
    const response = { hasError: false, data: { keywords } };
    const getKeywordsSpy = jest.spyOn(getKeywords, 'default')
      .mockImplementation(() => Promise.resolve(response));
    jest.spyOn(getPostAttribute, 'default')
      .mockImplementationOnce(() => '1')
      .mockImplementationOnce(() => 'title')
      .mockImplementationOnce(() => 'content');
    const wrapper = shallow(
      <EffectsManager
        dispatch={dispatchFn}
        state={mockState}
      >
        <p>Hello, world!</p>
      </EffectsManager>,
    );

    wrapper.setProps({ actionType: 'FETCH_KEYWORDS' });
    return new Promise((resolve) => setImmediate(resolve)).then(() => {
      expect(dispatchFn).toHaveBeenCalledWith({
        type: 'SET_LOADING_STATE',
        payload: { message: 'translated' },
      });
      expect(getKeywordsSpy).toHaveBeenCalledTimes(1);
      expect(dispatchFn).toHaveBeenCalledWith({ type: 'CLEAR_LOADING_STATE' });
      expect(dispatchFn).toHaveBeenCalledWith({
        payload: keywords,
        type: 'UPDATE_RECOMMENDED_KEYWORDS',
      });
    });
  });

  describe('SELECT_ALTERNATE_SEARCH', () => {
    let getPostAttributeSpy;
    let getTopicVideosSpy;
    const postId = '1';
    let props;
    let selectedAlternateSearch;
    let recommendedVideos;
    let response;

    beforeEach(() => {
      global.wp = { i18n: { __: jest.fn(() => 'translated') } };
      selectedAlternateSearch = {
        approximateTotalCount: '5',
        keywordMatch: 'selectedMatch',
        previewImage: { url: 'selectedUrl' },
      };
      props = {
        actionType: 'SELECT_ALTERNATE_SEARCH',
        state: {
          ...initialState,
          selectedAlternateSearches: [selectedAlternateSearch],
        },
      };
      recommendedVideos = {
        hero: ['hero'],
        heroEmptyReason: null,
        heroSecondary: [],
        positionTwo: ['video1', 'video2', 'video3', 'video4'],
        positionTwoEmptyReason: null,
        positionTwoSecondary: [],
        alternateSearches: [],
      };
      response = { hasError: false, data: { videos: recommendedVideos } };
      getPostAttributeSpy = jest.spyOn(getPostAttribute, 'default')
        .mockImplementationOnce(() => '1');
      getTopicVideosSpy = jest.spyOn(getTopicVideos, 'default')
        .mockImplementation(() => Promise.resolve(response));
    });

    afterEach(() => {
      getPostAttributeSpy.mockClear();
      getTopicVideosSpy.mockClear();
    });

    it('Clears all selected keywords except any matching the selected topic', () => {
      const propsWithSelectedKeywords = {
        ...props,
        state: {
          ...props.state,
          selectedKeywords: ['selectedMatch', 'something else'],
        },
      };
      const wrapper = shallow(
        <EffectsManager
          dispatch={dispatchFn}
          state={mockState}
        >
          <p>Hello, world!</p>
        </EffectsManager>,
      );

      wrapper.setProps(propsWithSelectedKeywords);
      return new Promise((resolve) => setImmediate(resolve)).then(() => {
        expect(dispatchFn).toHaveBeenCalledWith({ type: 'UPDATE_SELECTED_KEYWORDS', payload: ['selectedMatch'] });
      });
    });

    it('Fetches topic videos', () => {
      const wrapper = shallow(
        <EffectsManager
          dispatch={dispatchFn}
          state={mockState}
        >
          <p>Hello, world!</p>
        </EffectsManager>,
      );

      wrapper.setProps(props);
      return new Promise((resolve) => setImmediate(resolve)).then(() => {
        expect(dispatchFn).toHaveBeenCalledWith({
          type: 'SET_LOADING_STATE',
          payload: { message: 'translated' },
        });
        expect(getTopicVideosSpy)
          .toHaveBeenCalledWith([selectedAlternateSearch.keywordMatch], postId);
        expect(dispatchFn).toHaveBeenCalledWith({ type: 'CLEAR_LOADING_STATE' });
        expect(dispatchFn).toHaveBeenCalledWith({
          type: 'UPDATE_RECOMMENDED_VIDEOS',
          payload: recommendedVideos,
        });
      });
    });
  });
});
