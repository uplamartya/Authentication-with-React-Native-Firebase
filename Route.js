import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import SignUpForm from "./src/components/SignUpForm";
import Index from "./src/components/Index";
import CameraSc from "./src/components/CameraSc";
import Dashboard from "./src/components/Dashboard";
import Icon from "react-native-vector-icons/SimpleLineIcons";

const Root = createStackNavigator({
  Index: {
    screen: Index
  },
  SignUpForm: {
    screen: SignUpForm
  },
  Dashboard: {
    screen: Dashboard
  },
  CameraSc: {
    screen: CameraSc
  }
});

const container = createAppContainer(Root);
export default container;
