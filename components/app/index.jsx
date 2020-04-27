import { React } from 'react';
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';

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
