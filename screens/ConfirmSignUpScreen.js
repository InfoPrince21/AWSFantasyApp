import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { Auth } from "aws-amplify"; // Import Auth from AWS Amplify

const ConfirmSignUpScreen = ({ route, navigation }) => {
  const { email } = route.params; // Corrected to use email instead of username
  const [code, setCode] = useState("");
  const [message, setMessage] = useState(""); // For user feedback
  const [isLoading, setIsLoading] = useState(false); // For loading state

  async function handleConfirmSignUp() {
    if (!code) {
      setMessage("Please enter the verification code");
      return;
    }
    setIsLoading(true);
    try {
      await Auth.confirmSignUp(email, code); // Corrected to use email instead of username
      console.log("Successfully confirmed sign up");
      setMessage("Confirmation successful! Redirecting...");
      setTimeout(() => navigation.navigate("Home"), 2000); // Delay to show message
    } catch (error) {
      console.error("Error confirming sign up", error);
      setMessage(error.message || "Failed to confirm sign up");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Verification Code"
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
        editable={!isLoading}
      />
      <Button
        title="Confirm Sign Up"
        onPress={handleConfirmSignUp}
        disabled={isLoading}
      />
      {message ? <Text style={styles.message}>{message}</Text> : null}
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
  input: {
    width: "100%",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
  },
  message: {
    marginTop: 15,
    color: "red",
  },
});

export default ConfirmSignUpScreen;
