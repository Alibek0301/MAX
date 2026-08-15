require('@babel/register')({
  presets: ['@babel/preset-react'],
  plugins: [],
  extensions: ['.jsx', '.js']
});
const React = require('react');
const { renderToString } = require('react-dom/server');

try {
  const App = require('./src/App.jsx').default;
  const html = renderToString(React.createElement(App));
  console.log('RENDER SUCCESS! HTML length:', html.length);
} catch (e) {
  console.error('RENDER ERROR:');
  console.error(e.message);
  console.error(e.stack);
}
