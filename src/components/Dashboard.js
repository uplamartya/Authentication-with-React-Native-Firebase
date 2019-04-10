import React, { Component } from "react";
import { View } from "react-native";

import AlbumList from "./AlbumList";

export default class Dashboard extends Component {


      
  render() {
    return (
      <View style={{ flex: 1 }}>
        <AlbumList />
      </View>
    );
  }
}
