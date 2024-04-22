import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

// Register the app
AppRegistry.registerComponent(appName, () => App);

// The below line ensures it runs in a web browser
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById("app"),
});
