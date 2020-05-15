import { hot } from 'react-hot-loader/root';
import React from 'react';
import DialogWrapper from 'components/dialog';
import portalId from 'services/portalId';
import addModalDivEl from 'services/addModalDivEl';
import 'scss/global/vars.scss';

// Ensure the app entry point exists.
addModalDivEl(portalId);

/**
 * The main app used to render the entire Oovvuu video modal in both classic
 *   and Gutenberg editors.
 */
const App = () => (
  <>
    <p>This is where you will launch the Oovvuu modal.</p>
    <DialogWrapper />
  </>
);

export default hot(App);
