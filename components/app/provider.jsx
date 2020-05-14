import PropTypes from 'prop-types';
import React from 'react';
import OovvuuDataContext from './oovvuuDataContext';
import initialState from './initial-state';
import reducer from './reducer';

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
