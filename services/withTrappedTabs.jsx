import React from 'react';
import keyCodes from 'utils/keyCodes';

/**
 * Higher Order Component to trap TAB keydown events within a component.
 *
 * @param  {React.Component} WrappedComponent The component within which TABs should be trapped.
 */
const withTrappedTabs = (WrappedComponent) => (
  class extends React.Component {
    constructor(props) {
      super(props);

      // Bind child methods.
      this.getInteractiveNodes = this.getInteractiveNodes.bind(this);
      this.setFirstAndLastNodes = this.setFirstAndLastNodes.bind(this);
      this.handleKeyDown = this.handleKeyDown.bind(this);

      this.wrapperRef = React.createRef();
    }

    /**
     * Collect interactive child elements and add event listeners.
     */
    componentDidMount() {
      this.setFirstAndLastNodes();
      this.wrapperRef.current.addEventListener('keydown', this.handleKeyDown);
    }

    /**
     * Retrieve interactive child elements on component update.
     */
    componentDidUpdate() {
      this.setFirstAndLastNodes();
    }

    /**
     * Cleanup on unmount.
     */
    componentWillUnmount() {
      this.wrapperRef.current.removeEventListener('keydown', this.handleKeyDown);
    }

    /**
     * Get interactive child elements.
     *
     * @return {array} Interactive elements.
     */
    getInteractiveNodes() {
      // List of possible active child element selectors
      const selectors = [
        'a[href]',
        'area[href]',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        'button:not([disabled])',
        'iframe',
        'object',
        'embed',
        '[contenteditable]',
        '[tabindex]:not([tabindex^="-"])',
      ].join(',');

      const interactiveElements = this.wrapperRef.current.querySelectorAll(selectors);

      return Array.from(interactiveElements);
    }

    /**
     * Save a reference to the first and last nodes.
     */
    setFirstAndLastNodes() {
      const componentChildren = this.getInteractiveNodes();
      const lastIndex = (componentChildren.length - 1);

      // Get the first and last items by index.
      const {
        0: firstItem,
        [lastIndex]: lastItem,
      } = componentChildren;

      Object.assign(this, { firstItem, lastItem });
    }

    /**
     * Handle keydown events to trap the tab key within the component.
     *
     * @param  {Event} event The event object.
     */
    handleKeyDown(event) {
      const { TAB } = keyCodes;
      const { keyCode, shiftKey } = event;
      const { activeElement } = document;

      if (keyCode === TAB) {
        if (shiftKey && this.firstItem === activeElement) {
          event.preventDefault();
          this.lastItem.focus();
        } else if (!shiftKey && this.lastItem === activeElement) {
          event.preventDefault();
          this.firstItem.focus();
        }
      }
    }

    render() {
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <WrappedComponent trappedTabsRoot={this.wrapperRef} {...this.props} />;
    }
  }
);

export default withTrappedTabs;
