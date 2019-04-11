import React from "react";
import { Text, TouchableOpacity } from "react-native";

const Button = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={Styles.buttonStyle}>
      <Text style={Styles.textStyle}>{props.children}</Text>
    </TouchableOpacity>
  );
};

const Styles = {
  buttonStyle: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: "#0A79DF",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#007aff",
    marginLeft: 5,
    marginRight: 5
  },

  textStyle: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    padding: 8
  }
};

export default Button;
