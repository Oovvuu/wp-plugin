import React, { useState } from 'react';
import DialogWrapper from 'components/dialog';
import 'scss/global/global.scss';

/**
 * The main app used to render the entire Oovvuu video modal in Gutenberg.
 */
const App = () => {
  // Keywords.
  const [keywords, setKeywords] = useState([]);

  // The video positions.
  const [positions, setPositions] = useState({});

  // @TODO: Update with actual settings.
  return (
    <>
      <p>This is where you will launch the Oovvuu modal.</p>
      <DialogWrapper
        keywords={keywords}
        setKeywords={setKeywords}
        positions={positions}
        setPositions={setPositions}
      />
    </>
  );
};

export default App;
