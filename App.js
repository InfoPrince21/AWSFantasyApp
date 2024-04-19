import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import store from "./store/index.js";
import { supabase } from "./supabaseClient"; // Ensure this points to your initialized Supabase client
import {
  HomeScreen,
  TeamsScreen,
  PlayersScreen,
  CaptainsScreen,
  PlayerRankingsScreen,
  TeamRankingsScreen,
  AwardsScreen,
  RedeemPointsScreen,
  ChatRoomScreen,
  QuizMeScreen,
  StudyGuideScreen,
  GameHistoryScreen,
  RecordsScreen,
  ProfileScreen,
  LoginScreen,
  ForgotPasswordScreen,
  SignUpScreen,
  ConfirmSignUpScreen,
  NextStepScreen,
  SetupProfileScreen,
} from "./screens";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen
        name="ConfirmSignUpScreen"
        component={ConfirmSignUpScreen}
      />
      <Stack.Screen name="NextStepScreen" component={NextStepScreen} />
      <Stack.Screen name="SetupProfileScreen" component={SetupProfileScreen} />
    </Stack.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Teams" component={TeamsScreen} />
      <Drawer.Screen name="Players" component={PlayersScreen} />
      <Drawer.Screen name="Captains" component={CaptainsScreen} />
      <Drawer.Screen name="Player Rankings" component={PlayerRankingsScreen} />
      <Drawer.Screen name="Team Rankings" component={TeamRankingsScreen} />
      <Drawer.Screen name="Awards" component={AwardsScreen} />
      <Drawer.Screen name="Redeem Points" component={RedeemPointsScreen} />
      <Drawer.Screen name="Chat Room" component={ChatRoomScreen} />
      <Drawer.Screen name="QuizMe" component={QuizMeScreen} />
      <Drawer.Screen name="StudyGuide" component={StudyGuideScreen} />
      <Drawer.Screen name="Game History" component={GameHistoryScreen} />
      <Drawer.Screen name="Records" component={RecordsScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setIsAuthenticated(true); // Set authenticated true when there's a session
        } else {
          setIsAuthenticated(false); // Set authenticated false if there's no session
        }

        // Log the event and session for debugging purposes
        console.log(event, session);
      }
    );

    // Cleanup function to unsubscribe from the auth changes
    return () => {
      authListener.unsubscribe();
    };
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        {isAuthenticated ? <DrawerNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </Provider>
  );
}

export default App;
