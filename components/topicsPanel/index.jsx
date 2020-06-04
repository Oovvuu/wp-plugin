import React from 'react';
import OovvuuDataContext from 'components/app/context';
import classnames from 'classnames';
import theme from 'shared/theme.scss';
import TopicsSelector from './topicsSelector';

/**
 * Displays topics for alternate searches if provided by the API.
 */
const TopicsPanelWrapper = () => {
  const { i18n: { __ } } = wp;
  const {
    state: {
      recommendedVideos: {
        alternateSearches,
      },
    },
  } = React.useContext(OovvuuDataContext);

  const [displayTopics, setDisplayTopics] = React.useState(false);

  /**
   * Show and hide the topics panel when the alternate searches value updates.
   */
  React.useEffect(() => {
    if (alternateSearches.length > 0) {
      setDisplayTopics(true);
    } else {
      setDisplayTopics(false);
    }
  }, [alternateSearches]);

  /**
   * Load the positions panel when any of the positions have a video.
   */
  const topics = displayTopics ? (
    <div className={classnames(theme.panel)}>
      <h3 className={theme.panelHeading}>{__('Recommended Topics with Videos', 'oovvuu')}</h3>
      <TopicsSelector />
    </div>
  ) : '';

  return topics;
};

export default TopicsPanelWrapper;
