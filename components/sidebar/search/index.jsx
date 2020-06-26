import React from 'react';
import PropTypes from 'prop-types';
import ActionButton from 'components/shared/actionButton';
import ChipItem from 'components/shared/chipItem';
import ChipInput from 'components/shared/chipInput';
import SearchIcon from 'assets/search.svg';
import styles from './search.scss';

/**
 * Component for sidebar search.
 */
const Search = (props) => {
  const {
    i18n: {
      __,
      sprintf,
      _n,
    },
  } = wp;
  const { onFormSubmission } = props;
  const [searchValue, setSearchValue] = React.useState([]);
  const [lastAction, setLastAction] = React.useState('');
  const [liveRegionMessage, setLiveRegionMessage] = React.useState('');
  const inputRef = React.createRef();

  /**
   * Removes a given keyword from the sidebarsearchValue state.
   *
   * @param {string} keyword The keyword to be removed.
   */
  const handleRemove = (keyword) => {
    setSearchValue(searchValue.filter((value) => value !== keyword));

    // Update local state for aria-live region.
    setLastAction(`${keyword} removed.`);

    // Focus the input
    inputRef.current.focus();
  };

  /**
   * Adds a given keyword to internal state.
   *
   * @param item object Keyword item.
   */
  const handleUpdate = (keyword) => {
    // Do not add a user keyword if it already exists.
    if (searchValue.includes(keyword)) {
      return;
    }

    // Add the search terms.
    setSearchValue([...searchValue, keyword]);

    // Update local state for aria-live region.
    setLastAction(`${keyword} added.`);
  };

  /**
   * Handles search form submission.
   *
   * @param event Event Event object.
   */
  const handleSubmit = (event) => {
    if (searchValue.length > 0) {
      event.preventDefault();
      onFormSubmission(searchValue);
    }
  };

  /**
   * Compile the aria-live region's message string.
   */
  React.useEffect(() => {
    const updatedMessage = sprintf(
      _n('%d search term total.', '%d search terms total.', searchValue.length, 'oovvuu'),
      searchValue.length,
    );

    setLiveRegionMessage(`${lastAction} ${updatedMessage}`);
  }, [lastAction]);

  return (
    <form
      role="search"
      className={styles.form}
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div className={styles.list}>
        {searchValue.map((keyword) => (
          <ChipItem
            key={keyword}
            keyword={keyword}
            handleRemove={handleRemove}
          />
        ))}

        <ChipInput
          className={styles.input}
          onUpdate={handleUpdate}
          inputRef={inputRef}
          focusOnMount={false}
          placeholder={(searchValue.length === 0) && __('Search Video Library', 'oovvuu')}
        />
        <span
          className="screen-reader-only"
          role="status"
          aria-live="assertive"
          aria-atomic="true"
          aria-relevant="text"
          id="form-action-text"
        >
          <span>{liveRegionMessage}</span>
        </span>
      </div>

      <ActionButton
        className={styles.submit}
        type="submit"
        buttonStyle="icon"
        onClickHandler={handleSubmit}
      >
        <SearchIcon />
        <span className="screen-reader-only">
          {__('Submit', 'oovvuu')}
        </span>
      </ActionButton>
    </form>
  );
};

Search.propTypes = {
  onFormSubmission: PropTypes.func.isRequired,
};

export default Search;
