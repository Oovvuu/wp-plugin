import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import oovvuuData from 'components/app/context';
import theme from 'shared/theme.scss';
import panelStyles from 'components/dialog/keywordPanel/keywordPanel.scss';
import KeywordItem from './keywordItem';

/**
 * Displays and manages the list of recommended keywords.
 */
const KeywordList = (props) => {
  const { i18n: { sprintf, _n } } = wp;
  const {
    dispatch,
    state: { selectedKeywords },
  } = React.useContext(oovvuuData);
  const {
    keywordItems,
  } = props;
  const [liveRegionMessage, setLiveRegionMessage] = React.useState('');

  /**
   * Handle toggling recommended keywords.
   *
   * @param {string} keyword the keyword being updated.
   */
  const handleItemUpdated = (keyword) => {
    const payload = (!selectedKeywords.includes(keyword))
      ? [...selectedKeywords, keyword.toLowerCase()]
      : selectedKeywords.filter((selected) => selected !== keyword);

    dispatch({ payload, type: 'UPDATE_SELECTED_KEYWORDS' });
  };

  /**
   * Compile the updated aria-live region's message string.
   */
  React.useEffect(() => {
    const selectedKeywordCount = selectedKeywords.length;
    const keywordCount = keywordItems.length;

    const updatedMessage = sprintf(
      _n('%1$d keyword selected out of %2$d', '%1$d keywords selected out of %2$d', selectedKeywordCount, 'oovvuu'),
      selectedKeywordCount,
      keywordCount,
    );

    setLiveRegionMessage(updatedMessage);
  }, [selectedKeywords]);

  /**
   * Compile the initial aria-live region's message string.
   */
  React.useEffect(() => {
    const selectedKeywordCount = selectedKeywords.length;
    const keywordCount = keywordItems.length;
    let initialMessage = sprintf(
      _n('%d recommended keyword', '%d recommended keywords', keywordCount, 'oovvuu'),
      keywordCount,
    );

    if (selectedKeywords.length > 0) {
      initialMessage = sprintf(
        _n('%1$d keyword out of %2$d selected', '%1$d keywords out of %2$d selected', selectedKeywordCount, 'oovvuu'),
        selectedKeywordCount,
        keywordCount,
      );
    }

    setLiveRegionMessage(initialMessage);
  }, [keywordItems]);

  return (
    <>
      <ul className={classnames(theme.termList, panelStyles.keywordList)}>
        {keywordItems.map((keyword) => (
          <li key={keyword}>
            <KeywordItem
              keyword={keyword}
              isSelected={selectedKeywords.includes(keyword)}
              onToggle={handleItemUpdated}
            />
          </li>
        ))}
      </ul>
      <span
        className="screen-reader-only"
        role="status"
        aria-live="assertive"
        aria-atomic="true"
        aria-relevant="text"
      >
        {liveRegionMessage}
      </span>
    </>
  );
};

KeywordList.propTypes = {
  keywordItems: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default KeywordList;
