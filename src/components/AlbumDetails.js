import React from "react";
import { Text, View, ToastAndroid, Image, Linking } from "react-native";
import Card from "./Card";
import CardSection from "./CardSection";
import Button from "./Button";

const AlbumDetails = props => {
  console.log(props.data.title);

  return (
    <Card>
      <CardSection>
        <View style={Styles.thumbnailContainerStyle}>
          <Image
            style={Styles.thumbnailStyle}
            source={{ uri: props.data.thumbnail_image }}
          />
        </View>
        <View style={Styles.headerStyle}>
          <Text style={Styles.headerTextStyle}>{props.data.title}</Text>
          <Text>{props.data.artist}</Text>
        </View>
      </CardSection>

      <CardSection>
        <Image style={Styles.imageStyle} source={{ uri: props.data.image }} />
      </CardSection>

      <CardSection>
        <Button onPress={() => Linking.openURL(props.data.url)}>Buy Now</Button>
      </CardSection>
    </Card>
  );
};

const Styles = {
  headerStyle: {
    flexDirection: "column",
    justifyContent: "space-around"
  },

  thumbnailStyle: {
    height: 50,
    width: 50
  },
  headerTextStyle: {
    fontSize: 18
  },

  thumbnailContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10
  },

  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  }
};

export default AlbumDetails;
