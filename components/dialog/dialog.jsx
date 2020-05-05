import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import keyCodes from '../../utils/keyCodes';
import styles from './dialog.scss';

const { __ } = wp.i18n;

/**
 * The Dialog container.
 */
const Dialog = ({
  isOpen,
  closeDialog,
  children,
}) => {
  /**
   * Create references to elements.
   */
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const saveButtonRef = useRef(null);

  /**
   * Trap key tabs within the dialog.
   *
   * @param {Event} event The Event object.
   */
  const onKeyPressed = (event) => {
    const { TAB } = keyCodes;
    const { keyCode, shiftKey } = event;

    if (isOpen && keyCode === TAB) {
      if (shiftKey && closeButtonRef.current.contains(event.target)) {
        event.preventDefault();
        /*
         * Move back from the first interactive child element to the last
         * interactive child element
         */
        saveButtonRef.current.focus();
      } else if (!shiftKey && saveButtonRef.current.contains(event.target)) {
        event.preventDefault();
        /*
         * Move forward from the last interactive child element to the first
         * interactive child element.
         */
        closeButtonRef.current.focus();
      }
    }
  };

  /**
   * Closes the dialog when a user clicks outside of the modal.
   *
   * @param {Event} event The Event object.
   */
  const closeDialogOnOutsideClick = (event) => {
    if (!dialogRef.current.contains(event.target)) {
      event.preventDefault();
      closeDialog();
    }
  };

  return (
    <div
      className={classnames(styles.wrapper, { [styles.isOpen]: isOpen })}
      onKeyDown={onKeyPressed}
      onClick={closeDialogOnOutsideClick}
      role="presentation"
      aria-hidden={!isOpen}
      tabIndex="-1"
      id="oovvuu-dialog-wrapper"
    >
      <div
        ref={dialogRef}
        className={styles.dialog}
      >
        <div className={styles.header}>
          <span>{__('Oovvuu', 'oovvuu')}</span>
          <button
            ref={closeButtonRef}
            type="button"
            className={styles.closeButton}
            onClick={closeDialog}
            aria-label={__('Close', 'oovvuu')}
          >
            <span className="dashicons dashicons-no-alt" />
          </button>
        </div>


        <div className={styles.content}>
          {children}
        </div>

        <div className={styles.footer}>
          <button
            ref={saveButtonRef}
            type="button"
            onClick={closeDialog}
          >
            {__('Save', 'oovvuu')}
          </button>
        </div>
      </div>
    </div>
  );
};

Dialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
};

export default Dialog;
