import React, { createContext, useContext, useState } from "react";
import { ActivityIndicator, View } from "react-native";

type LoadingContextType = {
  showLoading: () => void;
  hideLoading: () => void;
};

const LoadingContext = createContext<LoadingContextType | null>(null);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) throw new Error("useLoading must be used within Provider");
  return context;
};

export const LoadingProvider = ({ children }: any) => {
  const [loading, setLoading] = useState(false);

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading }}>
      {children}

      {/* 🔥 Overlay loading */}
      {loading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 999,
          }}
        >
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </LoadingContext.Provider>
  );
};
