import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Main from "./Main";
import "helpers/initFA";
import { Provider } from "react-redux/es";
import { store, persistor } from "@store/store";
import { PersistGate } from "redux-persist/integration/react";

import { ToastContainer } from "react-toastify";

ReactDOM.render(
  <React.StrictMode>
    <Main>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
          <ToastContainer />
        </PersistGate>
      </Provider>
    </Main>
  </React.StrictMode>,
  document.getElementById("main")
);
