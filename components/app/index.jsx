import React from 'react';
import OovvuuDataProvider from 'components/app/provider';
import OovvuuSmallSVGLogo from 'assets/oovvuu-small-logo.svg';
import App from './app';
import styles from './app.scss';

const { PluginSidebar } = wp.editPost;
const { registerPlugin } = wp.plugins;

/**
 * Adds a new Document Settings Panel for all Oovvuu video embedding functionality.
 */
const OovvuuPluginDocumentSettingPanel = () => (
  <PluginSidebar
    name="oovvuu"
    title="Oovvuu"
    className={styles.sidebar}
    icon={OovvuuSmallSVGLogo}
  >
    <OovvuuDataProvider>
      <App />
    </OovvuuDataProvider>
  </PluginSidebar>
);
registerPlugin('plugin-document-setting-panel-oovvuu', { render: OovvuuPluginDocumentSettingPanel });
