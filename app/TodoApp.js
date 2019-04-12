import React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";
import { Root } from "native-base";
import WelcomeScreen from "./views/WelcomeScreen";
import HomeScreen from "./views/HomeScreen";
import TaskScreen from "./views/TaskScreen";

const StackNavigator = createStackNavigator(
  {
    WelcomeScreen,
    HomeScreen,
    TaskScreen
  },
  {
    initialRouteName: "WelcomeScreen",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#007aff"
      },
      headerTintColor: "#fff"
    }
  }
);

const AppContainer = createAppContainer(StackNavigator);

export default class TodoApp extends React.Component {
  render() {
    return (
      <Root>
        <AppContainer />
      </Root>
    );
  }
}
