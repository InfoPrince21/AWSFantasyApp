import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import store from "./store";
import Amplify, { Auth } from "aws-amplify";
import config from "./src/aws-exports";
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
} from "./screens"; // Make sure all screen components are correctly exported in your screens index file

Amplify.configure(config);

const Stack = createStackNavigator();
function createStackScreen(Component) {
  return () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={Component.name.replace("Screen", "")}
        component={Component}
      />
    </Stack.Navigator>
  );
}

const AuthStack = createStackNavigator();
const AuthStackNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  </AuthStack.Navigator>
);

const Drawer = createDrawerNavigator();
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
            <Drawer.Screen
              name="Home"
              component={createStackScreen(HomeScreen)}
            />
            <Drawer.Screen
              name="Teams"
              component={createStackScreen(TeamsScreen)}
            />
            <Drawer.Screen
              name="Players"
              component={createStackScreen(PlayersScreen)}
            />
            <Drawer.Screen
              name="Captains"
              component={createStackScreen(CaptainsScreen)}
            />
            <Drawer.Screen
              name="Player Rankings"
              component={createStackScreen(PlayerRankingsScreen)}
            />
            <Drawer.Screen
              name="Team Rankings"
              component={createStackScreen(TeamRankingsScreen)}
            />
            <Drawer.Screen
              name="Awards"
              component={createStackScreen(AwardsScreen)}
            />
            <Drawer.Screen
              name="Redeem Points"
              component={createStackScreen(RedeemPointsScreen)}
            />
            <Drawer.Screen
              name="Chat Room"
              component={createStackScreen(ChatRoomScreen)}
            />
            <Drawer.Screen
              name="QuizMe"
              component={createStackScreen(QuizMeScreen)}
            />
            <Drawer.Screen
              name="StudyGuide"
              component={createStackScreen(StudyGuideScreen)}
            />
            <Drawer.Screen
              name="Game History"
              component={createStackScreen(GameHistoryScreen)}
            />
            <Drawer.Screen
              name="Records"
              component={createStackScreen(RecordsScreen)}
            />
          </Drawer.Navigator>
        ) : (
          <AuthStackNavigator />
        )}
      </NavigationContainer>
    </Provider>
  );
}

export default App;
