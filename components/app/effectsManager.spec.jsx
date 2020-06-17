import React from 'react';
import { shallow } from 'enzyme';
import initialState from 'components/app/context/initialState';
import * as getKeywords from 'services/getKeywords';
import * as getPostAttribute from 'services/getPostAttribute';
import * as getTopicVideos from 'services/getTopicVideos';
import EffectsManager from './effectsManager';

describe('EffectsManager', () => {
  let dispatchFn;
  const mockState = initialState;

  beforeEach(() => {
    jest.spyOn(React, 'useEffect')
      .mockImplementation((effect) => effect());
    dispatchFn = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Fetches keywords on FETCH_KEYWORDS action', async () => {
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
      expect(dispatchFn).toHaveBeenCalledWith({ type: 'SET_LOADING_STATE' });
      expect(getKeywordsSpy).toHaveBeenCalledTimes(1);
      expect(dispatchFn).toHaveBeenCalledWith({ type: 'CLEAR_LOADING_STATE' });
      expect(dispatchFn).toHaveBeenCalledWith({
        payload: keywords,
        type: 'UPDATE_RECOMMENDED_KEYWORDS',
      });
    });
  });

  describe('UPDATE_SELECTED_TOPICS', () => {
    let getPostAttributeSpy;
    let getTopicVideosSpy;
    const postId = '1';
    let props;
    let topic;
    let recommendedVideos;
    let response;

    beforeEach(() => {
      topic = {
        approximateTotalCount: '5',
        keywordMatch: 'selectedMatch',
        previewImage: { url: 'selectedUrl' },
      };
      props = {
        actionType: 'UPDATE_SELECTED_TOPICS',
        state: {
          ...initialState,
          recommendedTopics: [topic],
          selectedTopics: [topic],
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
        expect(dispatchFn).toHaveBeenCalledWith({ type: 'CLEAR_SELECTED_AND_USER_KEYWORDS' });
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
        expect(dispatchFn).toHaveBeenCalledWith({ type: 'SET_LOADING_STATE' });
        expect(getTopicVideosSpy)
          .toHaveBeenCalledWith([topic.keywordMatch], postId);
        expect(dispatchFn).toHaveBeenCalledWith({ type: 'CLEAR_LOADING_STATE' });
        expect(dispatchFn).toHaveBeenCalledWith({
          type: 'UPDATE_RECOMMENDED_VIDEOS',
          payload: recommendedVideos,
        });
      });
    });
  });

  describe('UPDATE_RECOMMENDED_VIDEOS', () => {
    describe('Syncs position state to videos recommendations', () => {
      it('Dispatches ENABLE_POSITION if the hero position recommendation does not contain an empty reason', () => {
        const wrapper = shallow(
          <EffectsManager
            dispatch={dispatchFn}
            state={mockState}
          >
            <p>Hello, world!</p>
          </EffectsManager>,
        );

        // Enable hero case.
        wrapper.setProps({ actionType: 'UPDATE_RECOMMENDED_VIDEOS' });
        expect(dispatchFn).toHaveBeenCalledWith({ type: 'ENABLE_POSITION', payload: { position: 'hero' } });
      });

      it('Dispatches DISABLE_POSITION if the hero position recommendation contains an empty reason', () => {
        const wrapper = shallow(
          <EffectsManager
            dispatch={dispatchFn}
            state={mockState}
          >
            <p>Hello, world!</p>
          </EffectsManager>,
        );

        // Disable hero case.
        const heroEmptyState = {
          ...mockState,
          recommendedVideos: {
            ...mockState.recommendedVideos,
            heroEmptyReason: 'some reason',
          },
        };
        wrapper.setProps({ actionType: 'UPDATE_RECOMMENDED_VIDEOS', state: heroEmptyState });
        expect(dispatchFn).toHaveBeenCalledWith({ type: 'DISABLE_POSITION', payload: { position: 'hero' } });
      });

      it('Dispatches ENABLE_POSITION if the hero position recommendation does not contain an empty reason', () => {
        const wrapper = shallow(
          <EffectsManager
            dispatch={dispatchFn}
            state={mockState}
          >
            <p>Hello, world!</p>
          </EffectsManager>,
        );

        // Enable positionTwo case.
        wrapper.setProps({ actionType: 'UPDATE_RECOMMENDED_VIDEOS' });
        expect(dispatchFn).toHaveBeenCalledWith({ type: 'ENABLE_POSITION', payload: { position: 'positionTwo' } });
      });

      it('Dispatches DISABLE_POSITION if the positionTwo position recommendation contains an empty reason', () => {
        const wrapper = shallow(
          <EffectsManager
            dispatch={dispatchFn}
            state={mockState}
          >
            <p>Hello, world!</p>
          </EffectsManager>,
        );

        // Disable positionTwo case.
        const positionTwoEmptyState = {
          ...mockState,
          recommendedVideos: {
            ...mockState.recommendedVideos,
            positionTwoEmptyReason: 'some reason',
          },
        };
        wrapper.setProps({ actionType: 'UPDATE_RECOMMENDED_VIDEOS', state: positionTwoEmptyState });
        expect(dispatchFn).toHaveBeenCalledWith({ type: 'DISABLE_POSITION', payload: { position: 'positionTwo' } });
      });
    });

    it('Dispatches SHOW_POSITIONS_PANEL if recommended videos available', () => {
      const wrapper = shallow(
        <EffectsManager
          dispatch={dispatchFn}
          state={mockState}
        >
          <p>Hello, world!</p>
        </EffectsManager>,
      );

      // Disable positionTwo case.
      const positionTwoEmptyState = {
        ...mockState,
        recommendedVideos: {
          ...mockState.recommendedVideos,
          hero: [{}],
          positionTwo: [{}],
        },
      };
      wrapper.setProps({ actionType: 'UPDATE_RECOMMENDED_VIDEOS', state: positionTwoEmptyState });
      expect(dispatchFn).toHaveBeenCalledWith({ type: 'SHOW_POSITIONS_PANEL' });
    });
  });
});
