import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import axios from "axios";
import AlbumDetails from "./AlbumDetails";

class AlbumList extends Component {
  state = { albums: [] };
  componentWillMount() {
    axios
      .get("https://rallycoding.herokuapp.com/api/music_albums")
      .then(res => {
        this.setState({ albums: res.data });
      })
      .catch(err => {
        console.log(error);
      });
  }
  renderAlbums() {
    return this.state.albums.map(album => (
      <AlbumDetails key={album.title} data={album} />
    ));
  }

  render() {
    console.log(this.state);
    return <ScrollView>{this.renderAlbums()}</ScrollView>;
  }
}

export default AlbumList;
