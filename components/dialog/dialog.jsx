/* global React */
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './dialog.scss';

const { __ } = wp.i18n;

/**
 * The Dialog container.
 */
const Dialog = ({
  isOpen,
  openDialog,
  closeDialog,
  children,
}) => (
  <div className={classnames(styles.wrapper, { [styles.isOpen]: isOpen })}>
    <button
      type="button"
      onClick={openDialog}
    >
      {__('Open Dialog', 'oovvuu')}
    </button>
    <div className="oovvuu-dialog">
      <button
        type="button"
        onClick={closeDialog}
      >
        {__('Close', 'oovvuu')}
      </button>
      <div className="oovvuu-dialog-content">
        {children}
      </div>
    </div>
  </div>
);

Dialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  openDialog: PropTypes.func.isRequired,
  closeDialog: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default Dialog;
