import React from 'react';
import oovvuuData from 'components/app/context';
import theme from 'shared/theme.scss';
import TopicsList from './topicsList';

/**
 * Allows users to select and de-select topics.
 */
const TopicsSelectorWrapper = () => {
  const {
    state: {
      recommendedTopics,
    },
  } = React.useContext(oovvuuData);

  return (
    <div className={theme.panelInset}>
      <TopicsList
        items={recommendedTopics}
      />
    </div>
  );
};

export default TopicsSelectorWrapper;
