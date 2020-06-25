import React, { useRef } from 'react';
import PropTypes from 'prop-types';


/**
 * Component for a search form in the sidebar.
 */
const Search = (props) => {
  const { onFormSubmission } = props;

  const inputSearchRef = useRef();

  return (
    <>
      <input type="text" defaultValue="" ref={inputSearchRef} />
      <button type="button" onClick={() => onFormSubmission([inputSearchRef.current.value])}>Submit</button>
    </>
  );
};

Search.propTypes = {
  onFormSubmission: PropTypes.func.isRequired,
};

export default Search;
