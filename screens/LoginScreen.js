import { Auth } from "aws-amplify";
import { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    try {
      const user = await Auth.signIn(username, password);
      console.log("user signed in:", user);
      // handle user navigation post sign-in
    } catch (error) {
      console.error("error signing in:", error);
    }
  }

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
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
