import Toast from "react-native-toast-message";

export const showSuccess = (title: string, message: string) => {
  Toast.show({
    type: "success",
    text1: title,
    text2: message,

    text1Style: {
      fontSize: 16,
      fontWeight: "600",
    },
    text2Style: {
      fontSize: 14,
      color: "#6B7280",
    },

    position: "top",
    topOffset: 60,
    visibilityTime: 2500,
  });
};

export const showError = (title: string, message: string) => {
  Toast.show({
    type: "error",
    text1: title,
    text2: message,

    text1Style: {
      fontSize: 16,
      fontWeight: "600",
      color: "#DC2626",
    },
    text2Style: {
      fontSize: 14,
      color: "#DC2626",
    },

    position: "top",
    topOffset: 50,
  });
};

export const showInfo = (title: string, message: string) => {
  Toast.show({
    type: "info",
    text1: title,
    text2: message,

    text1Style: {
      fontSize: 16,
      fontWeight: "600",
      color: "#3B82F6",
    },
    text2Style: {
      fontSize: 14,
    },

    position: "top",
    topOffset: 60,
  });
};
