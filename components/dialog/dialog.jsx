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
  closeDialog,
  children,
}) => (
  <div className={classnames(styles.wrapper, { [styles.isOpen]: isOpen })}>
    <div className={styles.dialog}>
      <div className={classnames(styles.header)}>
        <span>{__('Oovvuu', 'oovvuu')}</span>
        <button
          type="button"
          className={classnames(styles.closeButton)}
          onClick={closeDialog}
        >
          {__('Close', 'oovvuu')}
        </button>
      </div>


      <div className={classnames(styles.content)}>
        {children}
      </div>

      <div className={classnames(styles.footer)}>
        <button
          type="button"
          onClick={closeDialog}
        >
          {__('Save', 'oovvuu')}
        </button>
      </div>
    </div>
  </div>
);

Dialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default Dialog;
