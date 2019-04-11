//IMPORTS
import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import SignUpForm from "./src/components/SignUpForm";
import Index from "./src/components/Index";
import CameraSc from "./src/components/CameraSc";
import Dashboard from "./src/components/Dashboard";

//STACKNAVIGATION
const Root = createStackNavigator({
  Index: {
    screen: Index
  },
  SignUpForm: {
    screen: SignUpForm
  },
  Dashboard: {
    screen: Dashboard
    /*   navigationOptions: {
      headerTitle: "Albums",
      headerRight: <TabNav />,
      headerLeft: null
    } */
  },
  CameraSc: {
    screen: CameraSc
  }
});

const container = createAppContainer(Root);
export default container;
