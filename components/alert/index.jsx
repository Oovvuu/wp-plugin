/* eslint-disable react/jsx-fragments */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { confirmable, createConfirmation } from 'react-confirm';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import keyCodes from 'utils/keyCodes';
import withTrappedTabs from 'services/withTrappedTabs';
import ActionButton from 'components/actionButton';
import styles from './alert.scss';

/**
 * The Alert container.
 */
const Alert = (props) => {
  const {
    show,
    message,
    buttons,
    supplemental,
    trappedTabsRoot,
  } = props;

  /**
   * Get the onClickHandler function for an alert button.
   *
   * @param {string} action An action referencing the function to return.
   */
  const getButtonHandler = (action) => {
    const {
      dismiss,
      cancel,
      proceed,
    } = props;

    switch (action) {
      case 'cancel':
        return cancel;
      case 'proceed':
        return proceed;
      default:
        return dismiss;
    }
  };

  /**
   * Handle keydown events on the alert component.
   *
   * @param  {Event} event The event object.
   */
  const handleKeydown = (event) => {
    const { ESC } = keyCodes;
    const { keyCode } = event;
    const { dismiss } = props;

    if (ESC === keyCode) {
      dismiss();
    }
  };

  return (
    <div
      className={classnames(styles.wrapper, { [styles.show]: show })}
      id="oovvuu-alert-wrapper"
      role="presentation"
      onKeyDown={handleKeydown}
    >
      <div
        className={styles.popup}
        role="alert"
        ref={trappedTabsRoot}
      >
        <div className={styles.messageWrapper}>
          <p className={styles.message}>{message}</p>
          {supplemental && <p className={styles.supplemental}>{supplemental}</p>}
        </div>

        {buttons && (
          <div className={styles.buttonWrapper}>
            {buttons.map((button, index) => {
              const { action, text } = button;
              return (
                <ActionButton
                  buttonStyle={(action === 'proceed') ? 'warn' : 'button'}
                  onClickHandler={getButtonHandler(action)}
                  className={styles.button}
                  focus={(index === 0)}
                >
                  <Fragment>{text}</Fragment>
                </ActionButton>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

Alert.defaultProps = {
  supplemental: '',
  buttons: [
    {
      action: 'dismiss',
      text: __('Dismiss', 'oovvuu'),
    },
  ],
};

Alert.propTypes = {
  // dismiss, cancel, show and proceed are passed via `confirmable`.
  dismiss: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  proceed: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  supplemental: PropTypes.string,
  buttons: PropTypes.arrayOf(PropTypes.shape({
    action: PropTypes.string,
    text: PropTypes.string,
  })),
  trappedTabsRoot: PropTypes.shape({
    current: PropTypes.instanceOf(HTMLInputElement),
  }).isRequired,
};

const trappedTabsAlert = withTrappedTabs(Alert);
const alertConfirm = createConfirmation(confirmable(trappedTabsAlert));
export default alertConfirm;
