import React from 'react';
import getPostAttribute from 'services/getPostAttribute';
import getLatestVideos from 'services/getLatestVideos';
import VideoListWrapper from './videoList';

/**
 * The Sidebar container.
 */
const SidebarWrapper = () => {
  const [latestVideos, setLatestVideos] = React.useState([]);

  /**
   * Fetches the latest videos.
   *
   * @returns {Promise<void>} Future for response data or error object.
   */
  const handleFetchLatestVideos = async () => {
    // @TODO: Start loading state.

    const response = await getLatestVideos(getPostAttribute('id'));

    const {
      hasError,
      data,
    } = response;

    if (!hasError) {
      const { videos } = data;
      setLatestVideos(videos);
    } else {
      // @TODO: Perform error handling.
    }

    // @TODO: Clear loading state.
  };


  /**
   * Fetch latest videos when this component renders and does not currently
   * contain any videos.
   */
  React.useEffect(() => {
    if (latestVideos.length === 0) {
      handleFetchLatestVideos();
    }
  }, []);

  return (
    <VideoListWrapper videos={latestVideos} />
  );
};

export default SidebarWrapper;
