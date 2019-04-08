import React from "react";
import { View, Text, TextInput } from "react-native";

const CustomTextInput = props => {
  return (
    <View style={Styles.viewStyles}>
      <Text style={Styles.textStyles}>{props.label}</Text>
      <TextInput
        style={Styles.InputTextStyles}
        secureTextEntry={props.secureTextEntry}
        autoCorrect={false}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeText}
      />
    </View>
  );
};

const Styles = {
  viewStyles: {
    flex: 1,
    height: 40,
    flexDirection: "row",
    alignItems: "center"
  },

  InputTextStyles: {
    color: "#000",
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },

  textStyles: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  }
};
export default CustomTextInput;
