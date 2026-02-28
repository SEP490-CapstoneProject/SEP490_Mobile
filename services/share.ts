import { Share } from "react-native";

export const shareContent = async (
  url: string,
  source?: "home" | "community" | "profile",
) => {
  try {
    await Share.share({
      message: url,
    });
  } catch (error) {
    console.log("Share error:", error);
  }
};
