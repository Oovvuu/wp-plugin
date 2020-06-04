import React from 'react';
import oovvuuData from 'components/app/context';
import TopicsList from './topicsList';

/**
 * Allows users to select and de-select topics.
 */
const TopicsSelectorWrapper = () => {
  const {
    state: {
      recommendedVideos: {
        alternateSearches,
      },
    },
  } = React.useContext(oovvuuData);

  return (
    <div>
      <TopicsList
        items={alternateSearches}
      />
    </div>
  );
};

export default TopicsSelectorWrapper;
