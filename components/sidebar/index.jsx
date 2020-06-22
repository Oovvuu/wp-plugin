import React from 'react';
import getPostAttribute from 'services/getPostAttribute';
import getLatestVideos from 'services/getLatestVideos';
import ActionButton from 'components/shared/actionButton';
import LoadingSpinner from 'components/shared/loading/spinner';
import RefreshIcon from 'assets/refresh.svg';
import LatestVideoListWrapper from './latestVideoList';
import styles from './sidebar.scss';

/**
 * The Sidebar container.
 */
const SidebarWrapper = () => {
  const { i18n: { __ } } = wp;
  const [latestVideos, setLatestVideos] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  /**
   * Fetches the latest videos.
   *
   * @returns {Promise<void>} Future for response data or error object.
   */
  const handleFetchLatestVideos = async () => {
    // Start loading state.
    setIsLoading(true);

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

    // Clear loading state.
    setIsLoading(false);
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
    <article>
      <header className={styles.header}>
        <h3 className={styles.heading}>{__('Latest videos', 'oovvuu')}</h3>
        <ActionButton
          buttonStyle="icon"
          ariaLabel={__('Refresh latest videos', 'oovvuu')}
          onClickHandler={handleFetchLatestVideos}
        >
          <RefreshIcon />
        </ActionButton>
      </header>

      <div className={styles.listWrapper}>
        {isLoading
          ? <LoadingSpinner />
          : <LatestVideoListWrapper videos={latestVideos} />}
      </div>
    </article>
  );
};

export default SidebarWrapper;
