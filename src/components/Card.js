import React from "react";
import { View } from "react-native";



const Card = props => {
  return <View style={Styles.cardStyle}>{props.children}</View>;
};

const Styles = {
  cardStyle: {
    borderWidth: 1,
    borderBottomWidth: 0,
    borderRadius: 2,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity:0.1,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  }
};
export default Card;
