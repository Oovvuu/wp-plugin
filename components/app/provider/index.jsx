import PropTypes from 'prop-types';
import React from 'react';
import OovvuuDataContext from '../context';
import initialState from '../context/initialState';
import reducer from '../context/reducer';

/**
 * Main provider for global app state via React context API.
 *
 * @param children
 * @returns {*}
 * @constructor
 */
const Provider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <OovvuuDataContext.Provider value={{ dispatch, state }}>
      {children}
    </OovvuuDataContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};

export default Provider;
