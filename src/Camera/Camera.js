import React from "react";
import { View, Text } from "react-native";

import { useNavigation } from "@react-navigation/native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import Toolbar from "./Camera.toolbar";

import styles from "./Camera.styles";

export class CameraPage extends React.Component {
  camera = null;

  state = {
    captures: [],
    // setting flash to be turned off by default
    flashMode: Camera.Constants.FlashMode.off,
    capturing: null,
    // start the back camera by default
    // cameraType: Camera.Constants.Type.back,
    hasCameraPermission: null
  };

  setFlashMode = flashMode => this.setState({ flashMode });
  handleCaptureIn = () => this.setState({ capturing: true });

  handleCaptureOut = () => {
    if (this.state.capturing) this.camera.stopRecording();
  };

  handleShortCapture = async () => {
    const photoData = await this.camera.takePictureAsync();
    this.setState({
      capturing: false,
      captures: [photoData, ...this.state.captures]
    });
  };

  handleLongCapture = async () => {
    const videoData = await this.camera.recordAsync();
    this.setState({
      capturing: false,
      captures: [videoData, ...this.state.captures]
    });
  };

  async componentDidMount() {
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    const hasCameraPermission =
      camera.status === "granted" && audio.status === "granted";

    this.setState({ hasCameraPermission });
  }

  render() {
    const { hasCameraPermission, flashMode, capturing } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    }

    return (
      <React.Fragment>
        <View>
          <Camera
            flashMode={flashMode}
            style={styles.preview}
            ref={camera => (this.camera = camera)}
          />
        </View>

        <Toolbar
          capturing={capturing}
          flashMode={flashMode}
          setFlashMode={this.setFlashMode}
          onCaptureIn={this.handleCaptureIn}
          onCaptureOut={this.handleCaptureOut}
          onLongCapture={this.handleLongCapture}
          onShortCapture={this.handleShortCapture}
        />
      </React.Fragment>
    );
  }
}
