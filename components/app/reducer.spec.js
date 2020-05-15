import initialState from './initialState';
import reducer from './reducer';

describe('Application reducer', () => {
  it("Has case for 'UPDATE_SELECTED_HERO'", () => {
    const action = {
      payload: { id: 'hero' },
      type: 'UPDATE_SELECTED_HERO',
    };

    const newState = reducer(initialState, action);

    expect(newState.selectedVideos.hero).toEqual(expect.objectContaining(action.payload));
  });
});
