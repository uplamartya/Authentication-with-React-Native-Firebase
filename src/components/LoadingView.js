import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

export default class LoadingView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, alignSelf: "center", height: 100, width: 100 }}>
          <ActivityIndicator
            size="large"
            color="#0A79DF"
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.7,
    justifyContent: "center",
    alignItems: "center"
  }
});
