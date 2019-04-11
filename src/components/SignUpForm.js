import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import firebase from "firebase";
import Button from "./Button";
import Card from "./Card";
import CardSection from "./CardSection";
import CustomTextInput from "./CustomTextInput";
import Spinner from "./Spinner";
import Index from "./Index";
import RNFetchBlob from "react-native-fetch-blob";

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
    loading: false,
    downloadImgUrl: "",
    hidePass: true
  };
//Upload clicked Image to firebase
  uploadImage(data) {
    const image = data.mediaUri;
    console.log("uri", image);

    const Blob = RNFetchBlob.polyfill.Blob;
    const fs = RNFetchBlob.fs;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    window.Blob = Blob;

    let uploadBlob = null;
    const imageRef = firebase
      .storage()
      .ref("posts")
      .child("test.jpg");
    let mime = "image/jpg";
    fs.readFile(image, "base64")
      .then(data => {
        return Blob.build(data, { type: `${mime};BASE64` });
      })
      .then(blob => {
        uploadBlob = blob;
        return imageRef.put(blob, { contentType: mime });
      })
      .then(() => {
        uploadBlob.close();
        return imageRef.getDownloadURL();
      })
      .then(url => {
        // URL of the image uploaded on Firebase storage
        this.setState({ downloadImgUrl: url });
        this.SaveDataToDb();
        console.log("State", this.state.downloadImgUrl);
        console.log("url", url);
      })
      .catch(error => {
        console.log(error);
      });
  }
//save Uploaded Image Download url to database with other user data
  SaveDataToDb() {
    const { name, address, downloadImgUrl } = this.state;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .database()
          .ref("Users/")
          .child(user.uid)
          .set({
            name: name,
            address: address,
            downloadProfilePic: downloadImgUrl
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
    });
    this.props.navigation.navigate("Index");
  }
  //Onsignup Button press
  onSignUpPress() {
    const { email, password, name, address } = this.state;
    let photo = this.props.navigation.getParam("photo", "empty");
    if (name == "" || address == "" || photo == "empty") {
      this.setState({
        error: "Please fill all the fields & Select Photo!!",
        loading: false
      });
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
//On signUp success
  onSignUpSuccess() {
    let photo = this.props.navigation.getParam("photo", "empty");
    if (photo !== "empty") {
      this.uploadImage(photo);
    }
  }
//Render Button
  renderButton() {
    if (this.state.loading) {
      return <Spinner size="large" />;
    } else {
      return <Button onPress={this.onSignUpPress.bind(this)}>Sign Up</Button>;
    }
  }

  render() {
    //Fetch data from previous View/Screen
    let photo = this.props.navigation.getParam("photo", "empty");
    return (
      //Rendering Form for registration
      <Card>
        <CardSection>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <TouchableWithoutFeedback
              onPress={() => this.props.navigation.navigate("CameraSc")}
            >
              <Image
                resizeMode="center"
                style={Styles.imageHolder}
                source={
                  photo === "empty"
                    ? require("../asset/email.png")
                    : { uri: photo.mediaUri }
                }
              />
            </TouchableWithoutFeedback>
            <TouchableOpacity
            //Redirecting to Camera View
              onPress={() => this.props.navigation.navigate("CameraSc")}
            >
              <Text style={{ color: "#0A79DF", padding: 5 }}>
                Change Profile Pic
              </Text>
            </TouchableOpacity>
          </View>
        </CardSection>
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
            secureTextEntry={this.state.hidePass}
            placeholder="********"
            value={this.state.password}
            onChangeText={text => this.setState({ password: text })}
          />
          <TouchableOpacity
            onPressIn={() => this.setState({ hidePass: !this.state.hidePass })}
            onPressOut={() => this.setState({ hidePass: !this.state.hidePass })}
          >
            <Text style={{ color: "#0A79DF" }}>Show</Text>
          </TouchableOpacity>
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
const Styles = StyleSheet.create({
  imageHolder: { alignSelf: "center", height: 100, width: 100 },
  button: {
    margin: 20
  }
});
