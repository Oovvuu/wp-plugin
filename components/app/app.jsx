import React from 'react';
import DialogWrapper from 'components/dialog';
import 'scss/global/vars.scss';

/**
 * The main app used to render the entire Oovvuu video modal in Gutenberg.
 */
const App = () => (
  <>
    <p>This is where you will launch the Oovvuu modal.</p>
    <DialogWrapper />
  </>
);

export default App;
