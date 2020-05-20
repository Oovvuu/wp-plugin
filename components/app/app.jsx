import { hot } from 'react-hot-loader/root';
import React from 'react';
import DialogWrapper from 'components/dialog';
import portalId from 'services/portalId';
import addModalDivEl from 'services/addModalDivEl';
import getState from 'services/getState';
import getPostAttribute from 'services/getPostAttribute';
import 'scss/global/vars.scss';
import OovvuuDataContext from './context';
import EffectsManager from './effectsManager';

// Ensure the app entry point exists.
addModalDivEl(portalId);

/**
 * The main app used to render the entire Oovvuu video modal in both classic
 *   and Gutenberg editors. Also manages sync of application state on updates
 *   of keywords and videos recommendations from the Oovvuu API.
 */
const App = () => {
  const { dispatch, state } = React.useContext(OovvuuDataContext);
  const { lastActionType: actionType } = state;

  /**
   * Load state from post meta and update the current state.
   *
   * @return {Promise}
   */
  const loadStateFromPostMeta = async () => {
    const loadedState = await getState(getPostAttribute('id'));

    // Reset the state based on the state that was saved to post meta.
    if (!loadedState.hasError) {
      dispatch({
        type: 'RESET_STATE',
        payload: loadedState.data,
      });
    }
  };

  /**
   * Populate the state from post meta if any previous state was saved.
   */
  React.useEffect(() => {
    loadStateFromPostMeta();
  }, []);

  return (
    <EffectsManager actionType={actionType} dispatch={dispatch} state={state}>
      <p>This is where you will launch the Oovvuu modal.</p>
      <DialogWrapper />
    </EffectsManager>
  );
};

export default hot(App);
