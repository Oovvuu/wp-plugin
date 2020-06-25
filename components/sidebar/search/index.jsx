import React, { useRef } from 'react';
import PropTypes from 'prop-types';


/**
 * Component for sidebar search.
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
