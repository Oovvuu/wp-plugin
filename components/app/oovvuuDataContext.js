import React from 'react';
import initialState from './initialState';

/**
 * Creates context for global application state context. The default data
 *   in initialState defines the data structure used for the application-wide store,
 *   which is composed into a useReducer hook to create a Redux-like store
 *   that can be used via the useContext hook.
 *
 * @type {React.Context<{object}>}
 */
const oovvuuDataContext = React.createContext(initialState);

export default oovvuuDataContext;
