import { hot } from 'react-hot-loader/root';
import React from 'react';
import DialogWrapper from 'components/dialog';
import SidebarWrapper from 'components/sidebar';
import ActionButton from 'components/shared/actionButton';
import portalId from 'services/portalId';
import addModalDivEl from 'services/addModalDivEl';
import userAuthenticated from 'services/userAuthenticated';
import getState from 'services/getState';
import getPostAttribute from 'services/getPostAttribute';
import 'scss/global/base.scss';
import DashboardSVG from 'assets/dashboard.svg';
import styles from './app.scss';
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
  const { editProfileLink } = window.oovvuuAppUserData || '';
  const { i18n: { __ } } = wp;
  const {
    dispatch,
    state,
    state: {
      lastActionType: actionType,
      isUserAuthenticated,
    },
  } = React.useContext(OovvuuDataContext);
  const [isLoadingAuth, setIsLoadingAuth] = React.useState(false);

  /**
   * Load state from post meta and update the current state. Note: This fires
   * on page load for both the add and edit post views and before the dialog is opened.
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
    setIsLoadingAuth(true);
    const isAuthenticated = await userAuthenticated();

    if (!isAuthenticated.hasError && isAuthenticated.data === true) {
      // Get the current state from post meta.
      await loadStateFromPostMeta();

      // Set the user as authenticated.
      dispatch({ type: 'SET_USER_IS_AUTHENTICATED' });
    } else {
      // @todo OVU-34 - do we need to account for removing user authentication state?
    }

    // Finished loading.
    setIsLoadingAuth(false);
  };

  /**
   * App elements to show when user is authenticated.
   */
  const authenticatedApp = (
    <>
      <div
        className={styles.topButtons}
      >
        <DialogWrapper />
        <a
          href="https://compass.prod.oovvuu.io/"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className={styles.buttonLink}
        >
          <DashboardSVG />
          {__('Dashboard', 'oovvuu')}
        </a>
      </div>
      <SidebarWrapper />
    </>
  );

  /**
   * App elements to show when user is not authenticated.
   */
  const unauthenticatedApp = (
    <>
      <p>{ __('You must be authenticated to use this service.', 'oovvuu') }</p>
      <a href={editProfileLink}>{__('Please authenticate from your user profile page.', 'oovvuu')}</a>
    </>
  );

  /**
   * Initial "loading state" of the application.
   * Shows before authentication has run.
   */
  const initialLoadingApp = (
    <>
      <p>{ __('Loading app data...', 'oovvuu') }</p>
    </>
  );

  /**
   * Shows the loaded app state after user auth has run.
   */
  const loadedApp = isUserAuthenticated ? authenticatedApp : unauthenticatedApp;

  /**
   * Populate the state from post meta if any previous state was saved.
   */
  React.useEffect(() => {
    getUserAuthentication();
  }, []);

  return (
    <EffectsManager actionType={actionType} dispatch={dispatch} state={state}>
      <div
        id="oovvuu-sidebar-wrapper"
        className={styles.wrapper}
      >
        {isLoadingAuth ? initialLoadingApp : loadedApp}
      </div>
    </EffectsManager>
  );
};

export default hot(App);
