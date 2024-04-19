import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import store from "./store/index.js";
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
  LoginScreen,
  SignUpScreen,
  ForgotPasswordScreen,
  ConfirmSignUpScreen,
  ProfileScreen,
} from "./screens";

import { Amplify, Auth } from "aws-amplify";
import amplifyconfig from "./src/amplifyconfiguration.json";
Amplify.configure(amplifyconfig);

const Drawer = createDrawerNavigator();
const AuthStack = createStackNavigator();

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
      <AuthStack.Screen name="SignUpScreen" component={SignUpScreen} />
      <AuthStack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
      <AuthStack.Screen
        name="ConfirmSignUpScreen"
        component={ConfirmSignUpScreen}
      />
    </AuthStack.Navigator>
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
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      setIsAuthenticated(true);
    } catch (err) {
      setIsAuthenticated(false);
    }
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        {isAuthenticated ? <DrawerNavigator /> : <AuthStackNavigator />}
      </NavigationContainer>
    </Provider>
  );
}

export default App;
