import React from "react";
import { View, ActivityIndicator } from "react-native";

const Spinner = props => {
  return (
    <View style={Styles.spinnerStyle}>
      <ActivityIndicator color="#007aff" size={props.size || "large"} />
    </View>
  );
};

const Styles = {
  spinnerStyle: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#007aff",
    marginLeft: 5,
    marginRight: 5
  }
};
export default Spinner;
