import React from "react";
import { Text, View } from "react-native";

const Header = props => {
  return (
    <View style={Styles.viewStyle}>
      <Text style={Styles.textStyle}>{props.headerText}</Text>
    </View>
  );
};

const Styles = {
  textStyle: {
    fontSize: 20
  },
  viewStyle: {
    backgroundColor: "#DAE0E2",
    justifyContent: "center",
    alignItems: "center",
    height: 60
  }
};
export default Header;
