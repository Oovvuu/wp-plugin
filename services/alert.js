import alert from 'components/shared/alert';
import { __ } from '@wordpress/i18n';

/**
 * Display an alert with only a dismiss button.
 *
 * @param {object} message {
 *   {string} message The main alert message.
 *   {string} supplemental The supplemental text to display in the alert.
 * }
 */
async function displayDismissableAlert(message) {
  await alert(message);
}

/**
 * Display a confirmation prompt.
 *
 * @param {object} message {
 *   {string} message The main alert message.
 *   {string} supplemental The supplemental text to display in the alert.
 * }
 * @param {string}   confirmText The confirmation button's text label.
 * @param {function} callback    The function to call if confirmed.
 */
async function confirmThenProceed(message, confirmText, callback) {
  const alertProps = {
    ...message,
    buttons: [
      {
        action: 'cancel',
        text: __('Cancel', 'oovvuu'),
      },
      {
        action: 'proceed',
        text: confirmText,
      },
    ],
  };

  await alert(alertProps)
    .then((confirmed) => {
      if (confirmed) {
        callback();
      }
    })
    .catch(() => {});
}

export {
  displayDismissableAlert,
  confirmThenProceed,
};
