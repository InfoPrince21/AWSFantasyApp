import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { Auth } from "aws-amplify";

const ConfirmSignUpScreen = ({ route, navigation }) => {
  const { username } = route.params;
  const [code, setCode] = useState("");

  async function handleConfirmSignUp() {
    try {
      await Auth.confirmSignUp(username, code);
      console.log("Successfully confirmed signed up");
      navigation.navigate("Home"); // Assuming 'Login' is the screen to go after confirmation
    } catch (error) {
      console.error("Error confirming sign up", error);
    }
  }

  return (
    <View>
      <TextInput
        placeholder="Verification Code"
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
      />
      <Button title="Confirm Sign Up" onPress={handleConfirmSignUp} />
    </View>
  );
};

export default ConfirmSignUpScreen;
