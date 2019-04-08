import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginForm from "./src/components/LoginForm";
import SignUpForm from "./src/components/SignUpForm";
import Index from "./src/components/Index";

const Root = createStackNavigator({
  Index: {
    screen: Index
  },
  SignUpForm: {
    screen: SignUpForm
  }
});

const container = createAppContainer(Root);
export default container;
