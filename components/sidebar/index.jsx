import React from 'react';
import getPostAttribute from 'services/getPostAttribute';
import getLatestVideos from 'services/getLatestVideos';
import ActionButton from 'components/shared/actionButton';
import LoadingSpinner from 'components/shared/loading/spinner';
import OovvuuDataContext from 'components/app/context';
import { displayDismissableAlert } from 'services/alert';
import RefreshIcon from 'assets/refresh.svg';
import LatestVideoListWrapper from './latestVideoList';
import styles from './sidebar.scss';
import Search from './search';
import HeroCardWrapper from './heroCard';

/**
 * The Sidebar container.
 */
const SidebarWrapper = () => {
  const { i18n: { __ } } = wp;
  const {
    state: {
      sidebarSelectedHeroVideo,
      isLoadedFromMeta,
    },
  } = React.useContext(OovvuuDataContext);
  const [latestVideos, setLatestVideos] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  /**
   * Fetches the latest videos.
   *
   * @param {array} keywords The array of keywords.
   * @returns {Promise<void>} Future for response data or error object.
   */
  const handleFetchLatestVideos = async (keywords) => {
    // Start loading state.
    setIsLoading(true);

    const response = await getLatestVideos(keywords, getPostAttribute('id'));

    const {
      hasError,
      data,
      error: {
        message,
      } = {},
    } = response;

    if (!hasError) {
      const { videos } = data;
      setLatestVideos(videos);
    } else {
      displayDismissableAlert({ message });
    }

    // Clear loading state.
    setIsLoading(false);
  };

  /**
   * Whether or not latest videos should display.
   *
   * Latest videos shouldn't be displayed if videos
   * have been embedded via the dialog. Since all
   * dialog embeds set the "isLoadedFromMeta" flag,
   * it can be used as an indicator here.
   */
  const shouldShowLatestVideos = () => !isLoadedFromMeta;

  /**
   * Fetch latest videos when this component renders and does not currently
   * contain any videos.
   */
  React.useEffect(() => {
    if (latestVideos.length === 0 && shouldShowLatestVideos()) {
      handleFetchLatestVideos([]);
    }
  }, []);

  const showLatestVideosWrapper = (
    <section>
      <Search onFormSubmission={(keywords) => { handleFetchLatestVideos(keywords); }} />
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

      {sidebarSelectedHeroVideo.id && (<HeroCardWrapper video={sidebarSelectedHeroVideo} />)}

      <div className={styles.listWrapper}>
        {isLoading
          ? <LoadingSpinner />
          : <LatestVideoListWrapper videos={latestVideos} />}
      </div>
    </section>
  );

  return shouldShowLatestVideos() ? showLatestVideosWrapper : '';
};

export default SidebarWrapper;
