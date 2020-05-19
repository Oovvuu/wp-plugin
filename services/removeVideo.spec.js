import recommendedVideos from 'components/app/recommendedVideosFixture';
import removeVideo from './removeVideo';

describe('removeVideo', () => {
  it('Removed videos from hero', () => {
    const expectedVideoID = recommendedVideos.heroSecondary[0].id;
    const tempState = { selectedVideos: recommendedVideos };
    const newState = removeVideo(tempState, 'hero', '13379');

    expect(newState.selectedVideos.hero[0].id).toEqual(expectedVideoID);
  });

  it('Does not remove videos from hero that are already removed', () => {
    const expectedVideoID = recommendedVideos.hero[0].id;
    const tempState = { selectedVideos: recommendedVideos };
    const newState = removeVideo(tempState, 'hero', '0');

    expect(newState.selectedVideos.hero[0].id).toEqual(expectedVideoID);
  });

  it('Removing all videos results in an empty array', () => {
    // Set seconday videos to an empty array.
    recommendedVideos.heroSecondary = [];
    const tempState = { selectedVideos: recommendedVideos };

    // Remove the hero video.
    const newState = removeVideo(tempState, 'hero', '13306');

    expect(newState.selectedVideos.hero).toEqual([]);
  });

  it('Removed videos from positionTwo', () => {
    const expectedVideoID1 = recommendedVideos.positionTwo[1].id;
    const expectedVideoID2 = recommendedVideos.positionTwo[2].id;
    const expectedVideoID3 = recommendedVideos.positionTwo[3].id;
    const expectedVideoID4 = recommendedVideos.positionTwoSecondary[0].id;
    const tempState = { selectedVideos: recommendedVideos };
    const newState = removeVideo(tempState, 'positionTwo', '13644');

    expect(newState.selectedVideos.positionTwo[0].id).toEqual(expectedVideoID1);
    expect(newState.selectedVideos.positionTwo[1].id).toEqual(expectedVideoID2);
    expect(newState.selectedVideos.positionTwo[2].id).toEqual(expectedVideoID3);
    expect(newState.selectedVideos.positionTwo[3].id).toEqual(expectedVideoID4);
  });

  it('Removed videos from positionTwo not frist', () => {
    const expectedVideoID1 = recommendedVideos.positionTwo[0].id;
    const expectedVideoID2 = recommendedVideos.positionTwo[2].id;
    const expectedVideoID3 = recommendedVideos.positionTwo[3].id;
    const expectedVideoID4 = recommendedVideos.positionTwoSecondary[0].id;
    const tempState = { selectedVideos: recommendedVideos };
    const newState = removeVideo(tempState, 'positionTwo', '13638');

    expect(newState.selectedVideos.positionTwo[0].id).toEqual(expectedVideoID1);
    expect(newState.selectedVideos.positionTwo[1].id).toEqual(expectedVideoID2);
    expect(newState.selectedVideos.positionTwo[2].id).toEqual(expectedVideoID3);
    expect(newState.selectedVideos.positionTwo[3].id).toEqual(expectedVideoID4);
  });

  it('Does not remove videos from positionTwo that are already removed', () => {
    const expectedVideoID = recommendedVideos.positionTwo[0].id;
    const tempState = { selectedVideos: recommendedVideos };
    const newState = removeVideo(tempState, 'positionTwo', '0');

    expect(newState.selectedVideos.positionTwo[0].id).toEqual(expectedVideoID);
  });

  it('Removing all videos results in an empty array', () => {
    // Set seconday videos to an empty array.
    recommendedVideos.positionTwoSecondary = [];
    const tempState = { selectedVideos: recommendedVideos };

    // Remove the hero video.
    const newState = removeVideo(tempState, 'positionTwo', '13639');

    expect(newState.selectedVideos.positionTwo).toHaveLength(3);
  });
});
