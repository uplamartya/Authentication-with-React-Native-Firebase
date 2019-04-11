import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Camera from "react-native-camera";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default class CameraSc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraType: "back",
      mirror: false
    };
  }
//Method to handle back / front Camera
  cameraTypeHandler = () => {
    if (this.state.cameraType === "back") {
      this.setState({
        cameraType: "front",
        mirror: true
      });
    } else {
      this.setState({
        cameraType: "back",
        mirror: false
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={cam => {
            this.camera = cam;
          }}
          type={this.state.cameraType}
          mirrorImage={this.state.mirrorMode}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
        >
          <View
            style={{ flex: 1, flexDirection: "row", alignItems: "flex-end" }}
          >
            <MaterialIcons
              name="camera"
              size={35}
              style={styles.capture}
              onPress={this.takePicture.bind(this)}
            />
            <MaterialIcons
              name="camera-front"
              size={35}
              style={styles.capture}
              onPress={this.cameraTypeHandler.bind(this)}
            />
          </View>
        </Camera>
      </View>
    );
  }
 //Method Responsible for capturing image & send it the Home Screen
  takePicture() {
    const options = {};

    this.camera
      .capture({ metadata: options })
      .then(data => {
        console.log("-------------------------------", data.mediaUri);
        this.props.navigation.navigate("SignUpForm", { photo: data});
      })
      .catch(error => {
        console.log(error);
      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  capture: {
    flex: 0,
    borderRadius: 5,
    color: "#fff",
    padding: 10,
    margin: 40
  }
});
