import React, { Component } from "react";
import {
  View,
  Text,
  ToastAndroid,
  Image,
  StyleSheet,
  Alert
} from "react-native";
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
    address: "",
    image: null,
    loaded: false
  };

  componentDidMount() {
    //FireBase Configuration
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
    //Check if user already loggedIn or Not
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        var recentPostsRef = firebase.database().ref(`/Users/${user.uid}`);
        recentPostsRef
          .once("value")
          .then(snapshot => {
            console.log("Usersdata", snapshot.val().name);
            this.setState({
              name: snapshot.val().name,
              address: snapshot.val().address,
              image: snapshot.val().downloadProfilePic
            });
          })
          .catch(err => console.log(err));
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }
  onLoad(dataUri) {
    if (dataUri !== undefined) {
      this.setState({ loaded: true });
    }
  }
  componentWillUnmount() {}

  

  renderComponents() {
    switch (this.state.loggedIn) {
      case true:
      //If user loggedIn , Then Redirect to Dashboard
        this.props.navigation.replace("Dashboard");
      case false:
      //If user not loggedIn , Then Render to LoginPage
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
    //Render views depending in user logged in or not 
    return <View style={{ flex: 1 }}>{this.renderComponents()}</View>;
  }
}

const Styles = StyleSheet.create({
  imageHolder: { alignSelf: "center", height: 100, width: 100 },
  button: {
    margin: 20
  }
});
export default Index;
