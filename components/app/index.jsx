/* global React */
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
    <App />
  </PluginDocumentSettingPanel>
);
registerPlugin('plugin-document-setting-panel-oovvuu', { render: OovvuuPluginDocumentSettingPanel });
