import React from "react";
import { View, Text, Image } from "react-native";

import { useNavigation } from "@react-navigation/native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { Toolbar } from "./Camera.toolbar";
import { getPictureData } from "../../api";

import styles from "./Camera.styles";

export class CameraPage extends React.Component {
  camera = null;

  state = {
    //The captures array, a gallery of pictures, will need moving to a context that stores things between app loads
    captures: [],
    capturing: null,
    hasCameraPermission: null,
    viewMode: false
  };

  handleCaptureIn = () => this.setState({ capturing: true });

  handleCaptureOut = () => {
    if (this.state.capturing) this.camera.stopRecording();
  };

  handleShortCapture = async () => {
    const photoData = await this.camera.takePictureAsync({ base64: true });
    const photoInfo = getPictureData(photData.base64);
    this.setState({
      capturing: false,
      captures: [photoData, ...this.state.captures],
      viewPhoto: true
    });
  };

  async componentDidMount() {
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const hasCameraPermission = camera.status === "granted";

    this.setState({ hasCameraPermission });
  }

  render() {
    const { hasCameraPermission, capturing } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    }

    if (!this.state.viewPhoto)
      return (
        <React.Fragment>
          <View style={styles.background}>
            <Camera
              style={styles.preview}
              ref={camera => (this.camera = camera)}
            />
          </View>

          <Toolbar
            capturing={capturing}
            onCaptureIn={this.handleCaptureIn}
            onCaptureOut={this.handleCaptureOut}
            onLongCapture={this.handleLongCapture}
            onShortCapture={this.handleShortCapture}
          />
        </React.Fragment>
      );
    else
      return (
        <React.Fragment>
          <View style={styles.background}>
            <Image
              style={styles.preview}
              source={{ uri: this.state.captures[0].uri }}
            />
          </View>
        </React.Fragment>
      );
  }
}
