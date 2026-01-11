import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserProfile {
  displayName: string;
  bio: string;
  email: string;
  phone: string;
  avatarUri?: string;
  lastUpdated: string;
}

const STORAGE_KEY = 'user_profile';

export const profileApi = {
  // Save profile data
  saveProfile: async (profile: UserProfile): Promise<void> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      console.log('Profile saved successfully:', profile);
    } catch (error) {
      console.error('Error saving profile:', error);
      throw error;
    }
  },

  // Get profile data
  getProfile: async (): Promise<UserProfile | null> => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
      return null;
    } catch (error) {
      console.error('Error retrieving profile:', error);
      throw error;
    }
  },

  // Clear profile data
  clearProfile: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      console.log('Profile cleared successfully');
    } catch (error) {
      console.error('Error clearing profile:', error);
      throw error;
    }
  },

  // Check if profile exists
  profileExists: async (): Promise<boolean> => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data !== null;
    } catch (error) {
      console.error('Error checking profile existence:', error);
      return false;
    }
  },
};

export default profileApi;
