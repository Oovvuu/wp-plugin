import React from 'react';
import oovvuuData from 'components/app/context';
import theme from 'shared/theme.scss';
import KeywordList from './keywordList';
import UserKeywordList from './userKeywordList';
import styles from '../keywordPanel.scss';

/**
 * Container component aggregating keyword selections from both the generated list
 *   and the user-supplied list. Handles merging of lists into a master list
 *   of all selected keywords.
 */
const KeywordSelector = () => {
  const { i18n: { __ } } = wp;

  const {
    state: { recommendedKeywords },
  } = React.useContext(oovvuuData);

  return (
    <div className={theme.panelInset}>
      <h4 className={styles.keywordsHeading}>{__('Select all relevant keywords', 'oovvuu')}</h4>
      <KeywordList
        keywordItems={recommendedKeywords}
      />
      <h4
        id="user-keywords-heading"
        className={styles.keywordsHeading}
      >
        {__('Add additional keywords here', 'oovvuu')}
      </h4>
      <UserKeywordList />
    </div>
  );
};

export default KeywordSelector;
