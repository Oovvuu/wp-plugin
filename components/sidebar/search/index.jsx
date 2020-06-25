import React from 'react';
import PropTypes from 'prop-types';
import ActionButton from 'components/shared/actionButton';
import SearchIcon from 'assets/search.svg';
import styles from './search.scss';

/**
 * Component for sidebar search.
 */
const Search = (props) => {
  const { i18n: { __ } } = wp;
  const { onFormSubmission } = props;
  const [searchValue, setSearchValue] = React.useState('');

  /**
   * Handles search form submission.
   *
   * @param event Event Event object.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmission([searchValue]);
  };

  /**
   * Handles updating internal state for search input.
   *
   * @param event Event Event object.
   */
  const handleChange = (event) => {
    const { target: { value } } = event;

    setSearchValue(value);
  };

  return (
    <form
      role="search"
      className={styles.form}
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="oovvuu-sidebar-search"
      >
        <span className="screen-reader-only">
          {__('Search Oovvuu', 'oovvuu')}
        </span>

        <input
          className={styles.input}
          id="oovvuu-sidebar-search"
          type="text"
          defaultValue=""
          onChange={handleChange}
          placeholder={__('Search Video Library', 'oovvuu')}
        />
      </label>

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
