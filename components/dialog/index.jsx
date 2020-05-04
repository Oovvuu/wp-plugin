/* global React */
import PropTypes from 'prop-types';
import Dialog from './dialog';

const {
  element: {
    useState,
  },
} = wp;


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
   * @return {[function]} The handler for opening the dialog.
   */
  const openDialog = () => {
    setIsOpen(true);
  };

  /**
   * Close the dialog.
   *
   * @return {[function]} The handler for opening the dialog.
   */
  const closeDialog = () => {
    setIsOpen(false);
  };

  // @TODO: Update with actual content.
  return (
    <Dialog
      isOpen={isOpen}
      openDialog={openDialog}
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
    </Dialog>
  );
};

DialogWrapper.propTypes = {
  keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  positions: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default DialogWrapper;
