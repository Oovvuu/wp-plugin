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

  describe('SELECT_ALTERNATE_SEARCH', () => {
    it('Correctly sets a selected alternate search', () => {
      const existingAlternateSearch = {
        approximateTotalCount: '1',
        keywordMatch: 'existingMatch',
        previewImage: { url: 'existingUrl' },
      };
      const selectedAlternateSearch = {
        approximateTotalCount: '5',
        keywordMatch: 'selectedMatch',
        previewImage: { url: 'selectedUrl' },
      };
      const action = {
        payload: selectedAlternateSearch,
        type: 'SELECT_ALTERNATE_SEARCH',
      };
      const newState = reducer({
        ...initialState,
        selectedAlternateSearches: [existingAlternateSearch],
      }, action);

      expect(newState.selectedAlternateSearches).toHaveLength(1);
      expect(newState.selectedAlternateSearches[0]).toEqual(selectedAlternateSearch);
    });
  });

  describe('CLEAR_SELECTED_ALTERNATE_SEARCH', () => {
    it('Correctly clears selected alternate searches', () => {
      const existingAlternateSearch = {
        approximateTotalCount: '1',
        keywordMatch: 'existingMatch',
        previewImage: { url: 'existingUrl' },
      };
      const action = { type: 'CLEAR_SELECTED_ALTERNATE_SEARCH' };
      const newState = reducer({
        ...initialState,
        selectedAlternateSearches: [existingAlternateSearch],
      }, action);

      expect(newState.selectedAlternateSearches).toHaveLength(0);
    });
  });
});
