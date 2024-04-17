import { Auth } from "aws-amplify";
import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    try {
      const user = await Auth.signIn(email, password);
      console.log("user signed in:", user);
      // handle user navigation post sign-in
    } catch (error) {
      console.error("error signing in:", error);
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
      <Button title="Sign In" onPress={handleSignIn} />
      <Button
        title="Forgot Password?"
        onPress={() => navigation.navigate("ForgotPasswordScreen")}
      />
      <Button
        title="No account? Sign up"
        onPress={() => navigation.navigate("SignUpScreen")}
      />
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

export default LoginScreen;
