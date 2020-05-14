import React from 'react';
import { render } from 'react-dom';
import App from 'components/app/app';
import OovvuuDataProvider from 'components/app/provider';

render(
  <OovvuuDataProvider>
    <App />
  </OovvuuDataProvider>,
  document.getElementById('oovvuu-classic-editor-react-app'),
);
