/* global React */
const {
  element: {
    useState,
  },
} = wp;

/**
 * The main app used to render the entire Oovvuu video modal in Gutenberg.
 */
const App = () => {
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
    </>
  );
};

export default App;
