import React, { useState } from 'react';
import DialogWrapper from '../dialog';

/**
 * The main app used to render the entire Oovvuu video modal in Gutenberg.
 */
const App = () => {
  // Keywords.
  const [keywords, setKeywords] = useState([]);

  // The video positions.
  const [positions] = useState([]);

  // @TODO: Update with actual settings.
  return (
    <>
      <p>This is where you will launch the Oovvuu modal.</p>
      <p>
        Current positions:
        {positions}
      </p>
      <p>
        Current keywords:
        {keywords}
      </p>
      <DialogWrapper
        keywords={keywords}
        setKeywords={setKeywords}
        positions={positions}
      />
    </>
  );
};

export default App;
