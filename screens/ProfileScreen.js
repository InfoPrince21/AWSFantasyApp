import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { supabase } from "../supabaseClient"; // Ensure this points to your initialized Supabase client

const ProfileScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Subscribe to Supabase auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session && session.user) {
          setUserEmail(session.user.email); // Update email when session changes
        } else {
          setUserEmail(""); // Clear email if there is no session
          navigation.navigate("HomePage"); // Redirect to home page if signed out
        }
      }
    );

    // Check initial user and set state
    fetchUserInfo();

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  const fetchUserInfo = async () => {
    const session = supabase.auth.session();
    if (session && session.user) {
      setUserEmail(session.user.email); // Set user email from current session
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      // Redundant navigation, as the auth listener already handles this:
      // navigation.navigate("HomePage");
    } catch (error) {
      console.error("Error signing out: ", error);
      Alert.alert("Sign Out Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.userInfo}>Email: {userEmail}</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default ProfileScreen;
