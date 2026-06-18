import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { Provider as AlertProvider } from "react-alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import store from "./store";
import App from "./App";

const theme = createTheme({
  palette: {
    // Compatibility palette entries for legacy MUI v4-style color props that
    // existed in the original project. These prevent MUI v5 from crashing
    // if an older component accidentally passes color="default" or color="black".
    default: { main: "#111111", dark: "#000000", light: "#333333", contrastText: "#ffffff" },
    black: { main: "#000000", dark: "#000000", light: "#333333", contrastText: "#ffffff" },
  },
});

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <AlertProvider>
        <App />
      </AlertProvider>
    </Provider>
  </ThemeProvider>
);
