import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import axios from "axios";
import AlbumDetails from "./AlbumDetails";

class AlbumList extends Component {
  state = { albums: [] };
  componentWillMount() {
    //Api Calling
    axios
      .get("https://rallycoding.herokuapp.com/api/music_albums")
      .then(res => {
        this.setState({ albums: res.data });
      })
      .catch(err => {
        console.log(error);
      });
  }
  //Rendering Data fetched through API Response
  renderAlbums() {
    return this.state.albums.map(album => (
      <AlbumDetails key={album.title} data={album} />
    ));
  }

  render() {
    console.log(this.state);
     //Rendering AlbumList in a ScrollView
    return <ScrollView>{this.renderAlbums()}</ScrollView>;
  }
}
//Eport class
export default AlbumList;
