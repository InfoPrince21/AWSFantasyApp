import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Auth } from "aws-amplify";

const ProfileScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const userInfo = await Auth.currentAuthenticatedUser();
      setUserEmail(userInfo.attributes.email); // Adjust based on the attribute name you have in your user pool
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      navigation.replace("LoginScreen"); // Adjust navigation as necessary
    } catch (error) {
      console.error("Error signing out: ", error);
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
