import App from './app';

const { PluginDocumentSettingPanel } = wp.editPost;
const { registerPlugin } = wp.plugins;

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
