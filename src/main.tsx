import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Mantine
import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
      }}
    >
      <App />
    </MantineProvider>
  </React.StrictMode>
);
