import React from 'react';
import OovvuuDataProvider from 'components/app/provider';
import App from './app';

const { PluginDocumentSettingPanel } = wp.editPost;
const { registerPlugin } = wp.plugins;

/**
 * Adds a new Document Settings Panel for all Oovvuu video embedding functionality.
 */
const OovvuuPluginDocumentSettingPanel = () => (
  <PluginDocumentSettingPanel
    name="oovvuu"
    title="Oovvuu"
    className="oovvuu"
  >
    <OovvuuDataProvider>
      <App />
    </OovvuuDataProvider>
  </PluginDocumentSettingPanel>
);
registerPlugin('plugin-document-setting-panel-oovvuu', { render: OovvuuPluginDocumentSettingPanel });
