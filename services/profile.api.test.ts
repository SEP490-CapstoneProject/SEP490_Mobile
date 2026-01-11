/**
 * Test file for Profile Storage
 * 
 * This file demonstrates how to use the profile storage service
 * to save and retrieve user profile data locally
 */

import { profileApi, UserProfile } from './profile.api';

// Example test data
const testProfile: UserProfile = {
  displayName: "An Nhiên",
  bio: "Developer Backend",
  email: "hihihaha@gmail.com",
  phone: "0123456789",
  lastUpdated: new Date().toISOString(),
};

/**
 * Function to run all storage tests
 */
export const runStorageTests = async () => {
  try {
    console.log("========== PROFILE STORAGE TESTS ==========\n");

    // Test 1: Save profile
    console.log("Test 1: Saving profile...");
    await profileApi.saveProfile(testProfile);
    console.log("✓ Profile saved successfully\n");

    // Test 2: Retrieve profile
    console.log("Test 2: Retrieving profile...");
    const retrievedProfile = await profileApi.getProfile();
    console.log("✓ Profile retrieved successfully");
    console.log("Profile data:", retrievedProfile);
    console.log();

    // Test 3: Update profile
    console.log("Test 3: Updating profile...");
    const updatedProfile: UserProfile = {
      ...testProfile,
      displayName: "Nguyễn An Nhiên",
      phone: "0987654321",
      lastUpdated: new Date().toISOString(),
    };
    await profileApi.saveProfile(updatedProfile);
    const updated = await profileApi.getProfile();
    console.log("✓ Profile updated successfully");
    console.log("Updated data:", updated);
    console.log();

    // Test 4: Check profile existence
    console.log("Test 4: Checking profile existence...");
    const exists = await profileApi.profileExists();
    console.log(`✓ Profile exists: ${exists}\n`);

    // Test 5: Clear profile
    console.log("Test 5: Clearing profile...");
    await profileApi.clearProfile();
    console.log("✓ Profile cleared successfully\n");

    // Test 6: Verify profile is cleared
    console.log("Test 6: Verifying profile is cleared...");
    const clearedProfile = await profileApi.getProfile();
    console.log(`✓ Profile after clear: ${clearedProfile === null ? "null" : "exists"}\n`);

    console.log("========== ALL TESTS PASSED ==========");
  } catch (error) {
    console.error("Test failed:", error);
  }
};

// Export for use in development
export default runStorageTests;
