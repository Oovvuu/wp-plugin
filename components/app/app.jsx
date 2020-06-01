import { hot } from 'react-hot-loader/root';
import React from 'react';
import DialogWrapper from 'components/dialog';
import portalId from 'services/portalId';
import addModalDivEl from 'services/addModalDivEl';
import userAuthenticated from 'services/userAuthenticated';
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
  const { editProfileLink } = window.appUserData ?? '';
  const { i18n: { __ } } = wp;
  const { dispatch, state } = React.useContext(OovvuuDataContext);
  const { lastActionType: actionType, isUserAuthenticated } = state;

  /**
   * Load state from post meta and update the current state.
   *
   * @return {Promise}
   */
  const loadStateFromPostMeta = async () => {
    const loadedState = await getState(getPostAttribute('id'));

    // Reset the state based on the state that was saved to post meta.
    if (!loadedState.hasError && typeof loadedState.data === 'object') {
      dispatch({
        type: 'RESET_STATE',
        payload: loadedState.data,
      });
    }
  };

  /**
   * Get user auth state and update the current state.
   *
   * @return {Promise}
   */
  const getUserAuthentication = async () => {
    const isAuthenticated = await userAuthenticated();

    // Reset the state based on the state that was saved to post meta.
    if (!isAuthenticated.hasError && isAuthenticated.data === true) {
      dispatch({ type: 'SET_USER_IS_AUTHENTICATED' });
      await loadStateFromPostMeta();
    } else {
      // @todo OVU-34 - do we need to account for removing user authentication state?
    }
  };

  // App elements to show when user is authenticated.
  const authenticatedApp = (
    <>
      <p>{ __('This is where you will launch the Oovvuu modal.', 'oovvuu') }</p>
      <DialogWrapper />
    </>
  );

  // App elements to show when user is not authenticated.
  // @todo Can we get user profile URL from the wp object here?
  const unauthenticatedApp = (
    <>
      <p>{ __('You must be authenticated to use this service.', 'oovvuu') }</p>
      <a href={editProfileLink}>{__('Please authenticate from your user profile page.', 'oovvuu')}</a>
    </>
  );

  /**
   * Populate the state from post meta if any previous state was saved.
   */
  React.useEffect(() => {
    getUserAuthentication();
  }, []);

  return (
    <EffectsManager actionType={actionType} dispatch={dispatch} state={state}>
      {isUserAuthenticated ? authenticatedApp : unauthenticatedApp}
    </EffectsManager>
  );
};

export default hot(App);
