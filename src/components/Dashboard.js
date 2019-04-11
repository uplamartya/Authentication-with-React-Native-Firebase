import React, { Component } from "react";
import {
  View,
  Alert,
  TouchableOpacity,
  Image,
  ToastAndroid
} from "react-native";

import Menu, { MenuItem } from "react-native-material-menu";
import AlbumList from "./AlbumList";
import firebase from "firebase";

export default class Dashboard extends Component {
  componentDidMount() {
    this.props.navigation.setParams({ onLogoutPress: this._onLogoutPress });
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Albums",
      headerRight: (
        //Menu Options
        <Menu
          ref={ref => (this._menu = ref)}
          button={
            <TouchableOpacity
              onPress={() => this._menu.show()}
              style={{
                paddingHorizontal: 16,
                height: "100%",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Image
                source={require("../asset/menu.png")}
                style={{ width: 20, height: 20, alignSelf: "center" }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          }
        >
          <MenuItem
            onPress={navigation.getParam("onLogoutPress")}
            textStyle={{ color: "#000", fontSize: 16 }}
          >
            Logout
          </MenuItem>
        </Menu>
      ),
      headerLeft: null
    };
  };
  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };
  //menu doesn't resolve userdefined func, Refer to the link for more guide
  // https://reactnavigation.org/docs/en/header-buttons.html
  _onLogoutPress = () => {
    Alert.alert(
      //title
      "LogOut",
      //body
      "Do you want to LogOut?",
      [
        {
          text: "Yes",
          onPress: () => {
            firebase
              .auth()
              .signOut()
              .then(
                ToastAndroid.show(
                  "Successfully Logged Out !",
                  ToastAndroid.SHORT
                ),
                this.props.navigation.navigate("Index")
              )
              .catch(err => console.log(err.message));
          }
        },
        {
          text: "No",
          onPress: () => console.log("No Pressed"),
          style: "cancel"
        }
      ],
      { cancelable: true }
      //clicking out side of alert will be cancel
    );

    /* firebase
      .auth()
      .signOut()
      .then(ToastAndroid.show("Successfully Logged Out !", ToastAndroid.SHORT))
      .catch(err => console.log(err.message)); */
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <AlbumList />
      </View>
    );
  }
}
