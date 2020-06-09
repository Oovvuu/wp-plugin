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
      recommendedTopics,
      selectedAlternateSearches,
    },
  } = React.useContext(OovvuuDataContext);

  return (recommendedTopics?.length || selectedAlternateSearches?.length)
    ? (
      <div className={classnames(theme.panel)}>
        <h3 className={theme.panelHeading}>{__('Recommended Topics with Videos', 'oovvuu')}</h3>
        <TopicsSelector />
      </div>
    ) : null;
};

export default TopicsPanelWrapper;
