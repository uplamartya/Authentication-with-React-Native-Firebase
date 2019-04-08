import React from "react";
import { View, ActivityIndicator } from "react-native";

const Spinner = props => {
  return (
    <View Styles={Styles.spinnerStyle}>
      <ActivityIndicator color="#007aff" size={props.size || "large"} />
    </View>
  );
};

const Styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
};
export default Spinner;
