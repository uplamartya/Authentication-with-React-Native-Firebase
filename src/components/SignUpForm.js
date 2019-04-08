import React, { Component } from "react";
import { Text, TextInput } from "react-native";
import firebase from "firebase";
import Button from "./Button";
import Card from "./Card";
import CardSection from "./CardSection";
import CustomTextInput from "./CustomTextInput";
import Spinner from "./Spinner";
import Index from "./Index";
export default class SignUpForm extends Component {
  static navigationOptions = {
    title: "Sign Up"
  };

  state = {
    email: "",
    password: "",
    name: "",
    address: "",
    error: "",
    loading: false
  };

  onSignUpPress() {
    const { email, password, name, address } = this.state;

    if (name == "" || address == "") {
      this.setState({ error: "Please fill all the fields!!", loading: false });
    } else {
      this.setState({ error: "", loading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(this.onSignUpSuccess.bind(this))
        .catch(err => {
          console.log(err.message),
            this.setState({ error: err.message, loading: false });
        });
    }
  }

  onSignUpSuccess() {
    const { name, address } = this.state;

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .database()
          .ref("Users/")
          .child(user.uid)
          .set({
            name: name,
            address: address
          })
          .then(data => {
            //success callback
            console.log("data ", data);
          })
          .catch(error => {
            //error callback
            console.log("error ", error);
          });
      } else {
        console.log("false :");
      }
    });

    this.setState({
      email: "",
      password: "",
      name: "",
      address: "",
      loading: false,
      error: ""
    }),
      this.props.navigation.navigate("Index");
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="large" />;
    } else {
      return <Button onPress={this.onSignUpPress.bind(this)}>Sign Up</Button>;
    }
  }

  render() {
    return (
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
        <CardSection>
          <CustomTextInput
            label="Name"
            placeholder="User"
            value={this.state.name}
            onChangeText={text => this.setState({ name: text })}
          />
        </CardSection>
        <CardSection>
          <CustomTextInput
            label="Address"
            placeholder="Asansol"
            value={this.state.address}
            onChangeText={text => this.setState({ address: text })}
          />
        </CardSection>
        <Text style={{ alignSelf: "center", fontSize: 18, color: "#FF3031" }}>
          {this.state.error}
        </Text>
        <CardSection>{this.renderButton()}</CardSection>
      </Card>
    );
  }
}
