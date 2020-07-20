import React from 'react';
import getPostAttribute from 'services/getPostAttribute';
import getLatestVideos from 'services/getLatestVideos';
import ActionButton from 'components/shared/actionButton';
import LoadingSpinner from 'components/shared/loading/spinner';
import OovvuuDataContext from 'components/app/context';
import { displayDismissableAlert } from 'services/alert';
import recommendedVideosEmpty from 'services/recommendedVideosEmpty';
import RefreshIcon from 'assets/refresh.svg';
import SidebarDataContext from 'components/app/sidebarContext';
import LatestVideoListWrapper from './latestVideoList';
import styles from './sidebar.scss';
import Search from './search';
import Analytics from './analytics';
import HeroCardWrapper from './heroCard';
import NoMatchCard from './noMatchCard';

/**
 * The Sidebar container.
 */
const SidebarWrapper = () => {
  const { i18n: { __ } } = wp;
  const {
    state: {
      sidebarSelectedHeroVideo,
      recommendedVideos,
      isLoadedFromMeta,
    },
  } = React.useContext(OovvuuDataContext);
  const [latestVideos, setLatestVideos] = React.useState([]);
  const { searchKeywords } = React.useContext(SidebarDataContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isAddingVideo, setIsAddingVideo] = React.useState(false);
  const [isRemovingVideo, setIsRemovingVideo] = React.useState(false);
  const [showNoMatch, setShowNoMatch] = React.useState(false);

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
  const shouldShowLatestVideos = () => (
    !isLoadedFromMeta
    || (
      isLoadedFromMeta
      && !recommendedVideosEmpty(recommendedVideos)
    )
  );

  /**
   * Fetch latest videos when this component renders and does not currently
   * contain any videos.
   */
  React.useEffect(() => {
    if (latestVideos.length === 0 && shouldShowLatestVideos()) {
      handleFetchLatestVideos(searchKeywords);
    }
  }, []);

  /**
   * Watches for condition where latestVideos is updated and remains empty
   * and the list of keywords in searchValue is not empty. Shows a message if so.
   */
  React.useEffect(() => {
    setShowNoMatch(!latestVideos.length && !!searchKeywords.length);
  }, [latestVideos, searchKeywords]);

  const showLatestVideosWrapper = (
    <>
      <Analytics />

      {
        (isAddingVideo || isRemovingVideo || sidebarSelectedHeroVideo.id)
        && (
        <HeroCardWrapper
          video={sidebarSelectedHeroVideo}
          isWorking={isRemovingVideo || isAddingVideo}
          updateIsRemovingVideo={setIsRemovingVideo}
        />
        )
      }

      <section>
        <Search onFormSubmission={(keywords) => handleFetchLatestVideos(keywords)} />
      </section>

      <section>
        <header className={styles.header}>
          <h3 className={styles.heading}>{__('Latest videos', 'oovvuu')}</h3>
          <ActionButton
            buttonStyle="icon"
            ariaLabel={__('Refresh latest videos', 'oovvuu')}
            onClickHandler={() => handleFetchLatestVideos([])}
          >
            <RefreshIcon />
          </ActionButton>
        </header>

        <div className={styles.listWrapper}>
          {isLoading
            ? <LoadingSpinner />
            : (
              <LatestVideoListWrapper
                videos={latestVideos}
                isRemovingVideo={isRemovingVideo}
                isAddingVideo={isAddingVideo}
                updateIsAddingVideo={setIsAddingVideo}
              />
            )}
          {showNoMatch && <NoMatchCard />}
        </div>
      </section>
    </>
  );

  return shouldShowLatestVideos() ? showLatestVideosWrapper : '';
};

export default SidebarWrapper;
