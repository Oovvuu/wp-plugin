import React from 'react';
import PropTypes from 'prop-types';
import ActionButton from 'components/shared/actionButton';
import SearchIcon from 'assets/search.svg';

/**
 * Component for sidebar search.
 */
const Search = (props) => {
  const { i18n: { __ } } = wp;
  const { onFormSubmission } = props;


  return (
    <form
      role="search"
      className={styles.form}
      autoComplete="off"
    >
      <label
        htmlFor="oovvuu-sidebar-search"
      >
        <span className="screen-reader-only">
          {__('Search Oovvuu', 'oovvuu')}
        </span>

        <input
          id="oovvuu-sidebar-search"
          type="text"
          defaultValue=""
        />
      </label>

      <ActionButton
        type="submit"
        buttonStyle="icon"
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
