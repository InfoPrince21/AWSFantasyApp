import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import { supabase } from "../supabaseClient"; // Ensure this points to your initialized Supabase client

const ConfirmEmailScreen = ({ route, navigation }) => {
  const { email } = route.params; // Retrieve the email from navigation parameters
  const [code, setCode] = useState("");

  const confirmSignUp = async () => {
    if (!code.trim()) {
      Alert.alert(
        "Validation Error",
        "Please enter the verification code sent to your email."
      );
      return;
    }

    try {
      // Verify the OTP using the parameters you specified
      const { data, error } = await supabase.auth.verifyOtp({
        token: code, // The OTP code entered by the user
        email: email, // Email address to which the OTP was sent
        type: "email", // The type of verification, which is email in this case
      });

      if (error) throw error;
      Alert.alert("Success", "Email verified! You are now logged in.");
      // navigation.navigate("LoginScreen"); // Navigate to login screen upon successful verification
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const resendConfirmationCode = async () => {
    try {
      // Trigger Supabase to resend the OTP to the user's email
      const { error } = await supabase.auth.api.sendEmailChangeToken(email);
      if (error) throw error;
      Alert.alert(
        "Success",
        "Verification code sent again. Please check your email."
      );
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const goToLogin = () => {
    navigation.navigate("LoginScreen"); // Provide an option to go to login page regardless of OTP verification
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Your Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your verification code"
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Button title="Verify Email" onPress={confirmSignUp} />
      <Button
        title="Resend Code"
        onPress={resendConfirmationCode}
        color="#20B2AA"
      />
      <Button title="Go to Login" onPress={goToLogin} color="#1E90FF" />
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
    fontSize: 20,
    marginBottom: 15,
  },
  input: {
    width: "80%",
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
  },
});

export default ConfirmEmailScreen;
