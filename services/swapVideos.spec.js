import recommendedVideos from 'components/app/recommendedVideosFixture';
import swapVideos from './swapVideos';

describe('swapVideos', () => {
  it('Swap videos within second position', () => {
    const tempState = { selectedVideos: recommendedVideos };
    const expectedState = { selectedVideos: recommendedVideos };
    [
      expectedState.selectedVideos.positionTwo[0],
      expectedState.selectedVideos.positionTwo[1],
    ] = [
      expectedState.selectedVideos.positionTwo[1],
      expectedState.selectedVideos.positionTwo[0],
    ];

    const payload = {
      videoA: { positionKey: 'positionTwo', index: 0, videoId: recommendedVideos.positionTwo[0].id },
      videoB: { positionKey: 'positionTwo', index: 1, videoId: recommendedVideos.positionTwo[1].id },
    };

    const newState = swapVideos(tempState, payload);

    expect(newState).toEqual(expectedState);
  });

  it('Swap videos between positions', () => {
    const tempState = { selectedVideos: recommendedVideos };
    const expectedState = { selectedVideos: recommendedVideos };
    [
      expectedState.selectedVideos.hero[0],
      expectedState.selectedVideos.positionTwo[1],
    ] = [
      expectedState.selectedVideos.positionTwo[1],
      expectedState.selectedVideos.hero[0],
    ];

    const payload = {
      videoA: { positionKey: 'hero', index: 0, videoId: recommendedVideos.hero[0].id },
      videoB: { positionKey: 'positionTwo', index: 1, videoId: recommendedVideos.positionTwo[1].id },
    };

    const newState = swapVideos(tempState, payload);

    expect(newState).toEqual(expectedState);
  });

  it('Swap videos already swapped', () => {
    const tempState = { selectedVideos: recommendedVideos };
    const expectedState = { selectedVideos: recommendedVideos };
    [
      expectedState.selectedVideos.positionTwo[0],
      expectedState.selectedVideos.positionTwo[1],
    ] = [
      expectedState.selectedVideos.positionTwo[1],
      expectedState.selectedVideos.positionTwo[0],
    ];

    const payload = {
      videoA: { positionKey: 'positionTwo', index: 0, videoId: recommendedVideos.positionTwo[0].id },
      videoB: { positionKey: 'positionTwo', index: 1, videoId: recommendedVideos.positionTwo[1].id },
    };

    let newState = swapVideos(tempState, payload);

    // Perform the swap again and we should stil expect the same output since the
    // function is idempotent.
    newState = swapVideos(tempState, payload);

    expect(newState).toEqual(expectedState);
  });
});
