import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Redux
import { Provider } from "react-redux";
import { setupStore } from "./redux/store";
export const store = setupStore();

// Mantine
import { MantineProvider, AppShell } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "dark",
        }}
      >
        <AppShell
        // header={
        // <Header height={60} p="xs">
        // {/* Header content */}
        // </Header>
        // }
        >
          <App />
        </AppShell>
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);
