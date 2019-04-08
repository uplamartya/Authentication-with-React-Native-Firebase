import React from "react";
import { View } from "react-native";

const CardSection = props => {
  return <View style={Styles.cardStyle}>{props.children}</View>;
};

const Styles = {
  cardStyle: {
    borderBottomWidth: 1,
    backgroundColor: "#fff",
    padding: 5,
    justifyContent: "flex-start",
    flexDirection: "row",
    borderColor: "#ddd",
    position: "relative"
  }
};

export default CardSection;
