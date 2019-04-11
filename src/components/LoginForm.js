import React, { Component } from "react";
import { Text, TextInput, ToastAndroid } from "react-native";
import firebase from "firebase";
import SignUpForm from "./SignUpForm";
import Button from "./Button";
import Card from "./Card";
import CardSection from "./CardSection";
import CustomTextInput from "./CustomTextInput";
import Spinner from "./Spinner";

export default class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    loading: false,
    error: ""
  };
  //On LoginButton Press
  onLoginPress() {
    this.setState({ error: "", loading: true });
    //get email and password
    const { email, password } = this.state;
    console.log("email", email);
    console.log("password", password);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res),
          this.setState({
            loading: false,
            email: "",
            password: "",
            loggedIn: true,
            loading: false
          }),
          this.renderButton();
      })
      .catch(err => {
        console.log(err.message),
          this.setState({
            loading: false,
            email: "",
            password: "",
            error: err.message,
            loading: false
          }),
          this.renderButton();
      });
  }
  //ButtonRendering
  renderButton() {
    if (this.state.loading) {
      return <Spinner size="large" />;
    } else {
      return <Button onPress={this.onLoginPress.bind(this)}>Sign In</Button>;
    }
  }

  render() {
    return (
      //Rendering form for login
      <Card>
        <CardSection>
          <CustomTextInput
            label="Email"
            placeholder="user@gmail.com"
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })}
          />
        </CardSection>
        <CardSection>
          <CustomTextInput
            label="Password"
            secureTextEntry
            placeholder="********"
            value={this.state.password}
            onChangeText={text => this.setState({ password: text })}
          />
        </CardSection>
        <Text style={{ alignSelf: "center", fontSize: 18, color: "#FF3031" }}>
          {this.state.error}
        </Text>
        <CardSection>{this.renderButton()}</CardSection>

        <CardSection>
        
          <Button
            onPress={() => {
              this.props.navigation.navigate("SignUpForm");
            }}
          >
            Sign Up
          </Button>
        </CardSection>
      </Card>
    );
  }
}
