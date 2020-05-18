import { hot } from 'react-hot-loader/root';
import React from 'react';
import DialogWrapper from 'components/dialog';
import portalId from 'services/portalId';
import addModalDivEl from 'services/addModalDivEl';
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

  return (
    <EffectsManager actionType={actionType} dispatch={dispatch} state={state}>
      <p>This is where you will launch the Oovvuu modal.</p>
      <DialogWrapper />
    </EffectsManager>
  );
};

export default hot(App);
