import React, { useEffect, useState } from "react";
import awsmobile from "./aws-exports";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import store from "./store/index.js";
import awsExports from "./src/aws-exports";
import { Amplify, Auth } from "aws-amplify";
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
  ProfileScreen
} from "./screens";

Amplify.configure(awsExports);
console.log(Auth);

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const Drawer = createDrawerNavigator();


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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuthState() {
      try {
        await Auth.currentAuthenticatedUser();
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      }
    }

    checkAuthState();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        {isAuthenticated ? (
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Teams" component={TeamsScreen} />
            <Drawer.Screen name="Players" component={PlayersScreen} />
            <Drawer.Screen name="Captains" component={CaptainsScreen} />
            <Drawer.Screen
              name="Player Rankings"
              component={PlayerRankingsScreen}
            />
            <Drawer.Screen
              name="Team Rankings"
              component={TeamRankingsScreen}
            />
            <Drawer.Screen name="Awards" component={AwardsScreen} />
            <Drawer.Screen
              name="Redeem Points"
              component={RedeemPointsScreen}
            />
            <Drawer.Screen name="Chat Room" component={ChatRoomScreen} />
            <Drawer.Screen name="QuizMe" component={QuizMeScreen} />
            <Drawer.Screen name="StudyGuide" component={StudyGuideScreen} />
            <Drawer.Screen name="Game History" component={GameHistoryScreen} />
            <Drawer.Screen name="Records" component={RecordsScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
          </Drawer.Navigator>
        ) : (
          <AuthStackNavigator />
        )}
      </NavigationContainer>
    </Provider>
  );
}

export default App;
