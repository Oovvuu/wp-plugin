const { PluginDocumentSettingPanel } = wp.editPost;
const { registerPlugin } = wp.plugins;

const OovvuuPluginDocumentSettingPanel = () => (
  <PluginDocumentSettingPanel
    name="oovvuu"
    title="Oovvuu"
    className="oovvuu"
  >
    Oovvuu Content
  </PluginDocumentSettingPanel>
);
registerPlugin('plugin-document-setting-panel-oovvuu', { render: OovvuuPluginDocumentSettingPanel });
