import React from 'react'
import { createRoot } from "react-dom/client";
import App from './App'
import { Provider } from 'react-redux';
import { store } from './app/store';

const mount = (el) => {
  const root = createRoot(el)

  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

if (process.env.NODE_ENV === "development") {
  const el = document.querySelector('#_project-manager-root')

  if (el) {
    mount(el)
  }
}

export { mount }

