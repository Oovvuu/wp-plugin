/* global React */
import PropTypes from 'prop-types';
import Dialog from './dialog';

const {
  element: {
    useState,
  },
} = wp;

const { __ } = wp.i18n;

/**
 * The Dialog container.
 */
const DialogWrapper = (props) => {
  const {
    keywords = [],
    positions = [],
  } = props;

  // Open/close state.
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Open the dialog.
   *
   * @return {[function]} The handler function.
   */
  const openDialog = () => {
    setIsOpen(true);
  };

  /**
   * Close the dialog.
   *
   * @return {[function]} The handler function.
   */
  const closeDialog = () => {
    setIsOpen(false);
  };

  // @TODO: Update with actual content.
  return (
    <>
      <button
        type="button"
        onClick={openDialog}
      >
        {__('Open Dialog', 'oovvuu')}
      </button>
      <Dialog
        isOpen={isOpen}
        closeDialog={closeDialog}
      >
        <p>Dialog content.</p>
        <p>
          Current positions:
          {positions}
        </p>
        <p>
          Current keywords:
          {keywords}
        </p>
        <button type="button">Test button</button>
      </Dialog>
    </>
  );
};

DialogWrapper.propTypes = {
  keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  positions: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default DialogWrapper;
