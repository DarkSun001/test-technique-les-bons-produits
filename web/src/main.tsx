import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initAuth } from "./services/auth";
import { Provider } from "react-redux";
import { store } from "./store";
import "./index.css";
import App from "./App.tsx";
initAuth();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
