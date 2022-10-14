import React from 'react'
import { createRoot } from 'react-dom/client'

const App = () => {
  return (
    <h1>Project Manager App</h1>
  )
}

const root = createRoot(document.getElementById('root'));
root.render(
  <React.Fragment>
    <App />
  </React.Fragment>
);
