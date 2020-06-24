import React, { useRef } from 'react';
import PropTypes from 'prop-types';


/**
 * Component for a search form in the sidebar.
 */
const Search = (props) => {
  const { onFormSubmission } = props;

  const inputSearchRef = useRef();

  return (
    <form onSubmit={() => onFormSubmission([inputSearchRef.current.value])}>
      <input type="text" defaultValue="" ref={inputSearchRef} />
      <input type="submit" />
    </form>
  );
};

Search.propTypes = {
  onFormSubmission: PropTypes.func.isRequired,
};

export default Search;
