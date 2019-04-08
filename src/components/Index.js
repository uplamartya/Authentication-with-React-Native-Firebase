import React, { Component } from "react";
import { View, Text, ToastAndroid } from "react-native";
import LoginForm from "./LoginForm";
import firebase from "firebase";
import Button from "./Button";
import CardSection from "./CardSection";
import Spinner from "./Spinner";
import ScreenSpinner from "./ScreenSpinner";
import { thisExpression } from "@babel/types";
export class Index extends Component {
  constructor() {
    super();
    let useruid = "";
  }
  state = {
    loggedIn: null,
    name: "",
    address: ""
  };

  componentDidMount() {
    var config = {
      apiKey: "AIzaSyB4rL_8Pzy2Iv56SUzEU2chaIvmKfsXH9c",
      authDomain: "reactnativeauth-a3cd3.firebaseapp.com",
      databaseURL: "https://reactnativeauth-a3cd3.firebaseio.com",
      projectId: "reactnativeauth-a3cd3",
      storageBucket: "reactnativeauth-a3cd3.appspot.com",
      messagingSenderId: "629144420819"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        var recentPostsRef = firebase.database().ref(`/Users/${user.uid}`);
        recentPostsRef
          .once("value")
          .then(snapshot => {
            console.log("Usersdata", snapshot.val().name);
            this.setState({
              name: snapshot.val().name,
              address: snapshot.val().address
            });
          })
          .catch(err => console.log(err));
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  componentWillUnmount() {}

  onLogoutPress() {
    firebase
      .auth()
      .signOut()
      .then(ToastAndroid.show("Successfully Logged Out !", ToastAndroid.SHORT))
      .catch(err => console.log(err.message));
  }

  renderComponents() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <View>
            <CardSection>
              <Text>Name: {this.state.name}</Text>
            </CardSection>
            <CardSection>
              <Text>Address: {this.state.address}</Text>
            </CardSection>
            <CardSection>
              <Button onPress={this.onLogoutPress.bind(this)}>Log Out</Button>
            </CardSection>
          </View>
        );
      case false:
        return <LoginForm navigation={this.props.navigation} />;

      default:
        return (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ScreenSpinner size="large" />
          </View>
        );
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return <View style={{ flex: 1 }}>{this.renderComponents()}</View>;
  }
}
export default Index;
