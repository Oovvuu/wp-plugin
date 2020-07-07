import PropTypes from 'prop-types';
import React from 'react';

/**
 * Creates context for sidebar state context.
 *
 * @type {React.Context<null>}
 */
const SidebarDataContext = React.createContext(null);

/**
 * Provider for sidebar state via React context API. Managest search keywords
 * and latestVideos.
 *
 * @param children
 * @returns {*}
 * @constructor
 */
export const Provider = ({ children }) => {
  const [searchKeywords, setSearchKeywords] = React.useState([]);

  /**
     * Removes a given keyword from the sidebarsearchValue state.
     *
     * @param {string} keyword The keyword to be removed.
     */
  const handleRemoveKeyword = (keyword) => {
    setSearchKeywords(searchKeywords.filter((value) => value !== keyword));
  };

  /**
     * Adds a given keyword to sidebar state.
     *
     * @param keyword object Keyword item.
     */
  const handleUpdateKeywords = (keyword) => {
    // Add the search terms.
    setSearchKeywords([...searchKeywords, keyword]);
  };

  return (
    <SidebarDataContext.Provider
      value={{
        onRemoveKeyword: handleRemoveKeyword,
        onUpdateKeywords: handleUpdateKeywords,
        searchKeywords,
      }}
    >
      {children}
    </SidebarDataContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};

export default SidebarDataContext;
