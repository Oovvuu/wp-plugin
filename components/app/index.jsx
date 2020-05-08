import React from 'react';
import 'scss';
import App from './app';

const { PluginDocumentSettingPanel } = wp.editPost;
const { registerPlugin } = wp.plugins;

/**
 * Adds a div container for the modal appended to the body tag.
 */
const addModalDivEl = () => {
  // Bail early if div is already added.
  if (document.getElementById('oovvuu-dialog-wrapper-container')) {
    return;
  }

  const container = document.createElement('div');
  const body = document.querySelector('body');
  container.id = 'oovvuu-dialog-wrapper-container';

  if (body) {
    body.appendChild(container);
  }
};
addModalDivEl();

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
