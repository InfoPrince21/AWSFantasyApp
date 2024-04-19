import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { Auth } from "aws-amplify"; // Import Auth from AWS Amplify

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignUp() {
    try {
      const { user } = await Auth.signUp({
        username: email, // Using email as username
        password,
        attributes: {
          email, // Ensuring that the email is also set as an attribute
        },
      });
      console.log("user signed up:", user);
      // Navigate to the ConfirmSignUpScreen with email as a parameter
      navigation.navigate("ConfirmSignUpScreen", { email });
    } catch (error) {
      console.error("error signing up:", error);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
  },
});

export default SignUpScreen;
