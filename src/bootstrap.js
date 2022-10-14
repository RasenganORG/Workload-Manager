// import React from 'react'
// import { createRoot } from 'react-dom/client'

// const App = () => {
//   return (
//     <h1>Project Manager App</h1>
//   )
// }

// const root = createRoot(document.getElementById('root'));
// root.render(
//   <React.Fragment>
//     <App />
//   </React.Fragment>
// );

import React from 'react'
import ReactDOM from "react-dom/client";
import App from './App'
import { createMemoryHistory, createBrowserHistory } from 'history'

const mount = (el) => {
  const root = ReactDOM.createRoot(el)
  root.render(<App />);

}

// mount(document.getElementById('project-manager-root'))
// if (process.env.NODE_ENV === "development") {
//   const el = document.querySelector('#_marketing-dev-root')

//   if (el) {
//     mount(el, {defaultHistory: createBrowserHistory() })
//   }
// }

export { mount }

