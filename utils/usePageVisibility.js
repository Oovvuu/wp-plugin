import React, { useEffect } from 'react';

export const getBrowserVisibilityProp = () => {
  if (typeof document.hidden !== 'undefined') {
    return 'visibilitychange';
  }

  if (typeof document.msHidden !== 'undefined') {
    return 'msvisibilitychange';
  }

  if (typeof document.webkitHidden !== 'undefined') {
    return 'webkitvisibilitychange';
  }

  return null;
};

export const getBrowserDocumentHiddenProp = () => {
  if (typeof document.hidden !== 'undefined') {
    return 'hidden';
  }

  if (typeof document.msHidden !== 'undefined') {
    return 'msHidden';
  }

  if (typeof document.webkitHidden !== 'undefined') {
    return 'webkitHidden';
  }

  return null;
};

export const getIsDocumentHidden = () => !document[getBrowserDocumentHiddenProp()];

/**
 * Get browser visibility.
 *
 * @returns bool
 */
export const usePageVisibility = () => {
  const [isVisible, setIsVisible] = React.useState(getIsDocumentHidden());
  const onVisibilityChange = () => setIsVisible(getIsDocumentHidden());

  useEffect(() => {
    const visibilityChange = getBrowserVisibilityProp();

    window.addEventListener(visibilityChange, onVisibilityChange, false);

    return () => {
      window.removeEventListener(visibilityChange, onVisibilityChange);
    };
  });

  return isVisible;
};
