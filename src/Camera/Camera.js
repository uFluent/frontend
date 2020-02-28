import React from "react";
import { View, Text, Image } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { Toolbar } from "./Camera.toolbar";
import Gallery from "./Gallery";
import styles from "./Camera.styles";

export class CameraPage extends React.Component {
  camera = null;
  state = {
    captures: [],
    capturing: null,
    hasCameraPermission: null,
    viewPhoto: false
  };

  handleCaptureIn = () => this.setState({ capturing: true });

  handleCaptureOut = () => {
    if (this.state.capturing) this.camera.stopRecording();
  };

  handleShortCapture = async () => {
    const photoData = await this.camera.takePictureAsync({ base64: true });

    this.setState({
      capturing: false,
      captures: [photoData, ...this.state.captures],
      viewPhoto: true
    });
  };

  async componentDidMount() {
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const imageRoll = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const hasCameraPermission =
      camera.status === "granted" && imageRoll.status === "granted";

    this.setState({ hasCameraPermission });
  }

  returnToCamera = () => {
    this.setState({ viewPhoto: false });
  };

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
          {console.log(this.props, "<<<")}
          <View style={styles.background}>
            <View style={styles.preview}>
              <Camera
                style={styles.cameraStyle}
                ref={camera => (this.camera = camera)}
              />
            </View>
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
        <View style={styles.background}>
          <Gallery
            photoData={this.state.captures[0]}
            returnToCamera={this.returnToCamera}
            userData={this.props.userData}
          />
        </View>
      );
  }
}
