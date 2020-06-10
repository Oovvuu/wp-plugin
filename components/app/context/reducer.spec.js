import initialState from './initialState';
import reducer from './reducer';

describe('Application reducer', () => {
  it("Has case for 'UPDATE_SELECTED_VIDEOS'", () => {
    const action = {
      payload: { hero: { id: 'hero' } },
      type: 'UPDATE_SELECTED_VIDEOS',
    };
    const newState = reducer(initialState, action);

    expect(newState.selectedVideos.hero).toEqual(expect.objectContaining(action.payload.hero));
  });

  describe('UPDATE_SELECTED_TOPICS', () => {
    it('Correctly sets a selected alternate search', () => {
      const existingSelectedTopic = {
        approximateTotalCount: '1',
        keywordMatch: 'existingMatch',
        previewImage: { url: 'existingUrl' },
      };
      const newSelectedTopic = {
        approximateTotalCount: '5',
        keywordMatch: 'selectedMatch',
        previewImage: { url: 'selectedUrl' },
      };
      const action = {
        payload: [newSelectedTopic],
        type: 'UPDATE_SELECTED_TOPICS',
      };
      const newState = reducer({
        ...initialState,
        selectedTopics: [existingSelectedTopic],
      }, action);

      expect(newState.selectedTopics).toHaveLength(1);
      expect(newState.selectedTopics[0]).toEqual(newSelectedTopic);
    });
  });

  describe('CLEAR_TOPICS', () => {
    it('Correctly clears recommended and selected topics', () => {
      const action = { type: 'CLEAR_TOPICS' };
      const newState = reducer({
        ...initialState,
        recommendedTopics: ['topic'],
        selectedTopics: ['topic'],
      }, action);

      expect(newState.recommendedTopics).toHaveLength(0);
      expect(newState.selectedTopics).toHaveLength(0);
    });
  });
});
