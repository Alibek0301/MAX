import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './src/App.jsx';

try {
  const html = renderToString(<App />);
  console.log("Success, length:", html.length);
} catch(e) {
  console.log("ERROR:", e);
}
