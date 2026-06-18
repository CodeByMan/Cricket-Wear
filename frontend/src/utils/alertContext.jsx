import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

const AlertContext = createContext({
  success: () => {},
  error: () => {},
  info: () => {},
  show: () => {},
  remove: () => {},
});

export const positions = {
  BOTTOM_CENTER: "bottom-center",
};

export const transitions = {
  SCALE: "scale",
};

let alertId = 0;

export function Provider({ children }) {
  const [alerts, setAlerts] = useState([]);

  const remove = useCallback((id) => {
    setAlerts((current) => current.filter((item) => item.id !== id));
  }, []);

  const show = useCallback((message, type = "info") => {
    if (!message) return;
    const id = ++alertId;
    setAlerts((current) => [...current, { id, type, message: String(message) }]);
    window.setTimeout(() => remove(id), 4500);
  }, [remove]);

  const value = useMemo(() => ({
    show,
    remove,
    success: (message) => show(message, "success"),
    error: (message) => show(message, "error"),
    info: (message) => show(message, "info"),
  }), [show, remove]);

  return (
    <AlertContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        style={{
          position: "fixed",
          left: "50%",
          bottom: "24px",
          transform: "translateX(-50%)",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          pointerEvents: "none",
        }}
      >
        {alerts.map((alert) => (
          <div
            key={alert.id}
            style={{
              minWidth: "260px",
              maxWidth: "420px",
              borderRadius: "4px",
              padding: "12px 16px",
              background: alert.type === "error" ? "#b00020" : alert.type === "success" ? "#1b5e20" : "#263238",
              color: "#fff",
              fontSize: "14px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
              textAlign: "center",
              pointerEvents: "auto",
            }}
          >
            {alert.message}
          </div>
        ))}
      </div>
    </AlertContext.Provider>
  );
}

export function useAlert() {
  return useContext(AlertContext);
}
