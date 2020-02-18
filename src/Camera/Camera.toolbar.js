import React from "react";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { Col, Row, Grid } from "react-native-easy-grid";
import { View, TouchableWithoutFeedback, TouchableOpacity } from "react-native";

import styles from "./Camera.styles";

const { FlashMode: CameraFlashModes } = Camera.Constants;

export default ({
  capturing = false,
  flashMode = CameraFlashModes.off,
  setFlashMode,
  onCaptureIn,
  onCaptureOut,
  onLongCapture,
  onShortCapture
}) => (
  <Grid style={styles.bottomToolbar}>
    <Row>
      <Col style={styles.alignCenter}>
        <TouchableOpacity
          onPress={() =>
            setFlashMode(
              flashMode === CameraFlashModes.on
                ? CameraFlashModes.off
                : CameraFlashModes.on
            )
          }
        >
          <Ionicons
            name={
              flashMode == CameraFlashModes.on ? "md-flash" : "md-flash-off"
            }
            color="white"
            size={30}
          />
        </TouchableOpacity>
      </Col>
      <Col size={2} style={styles.alignCenter}>
        <TouchableWithoutFeedback
          onPressIn={onCaptureIn}
          onPressOut={onCaptureOut}
          onLongPress={onLongCapture}
          onPress={onShortCapture}
        >
          <View
            style={[styles.captureBtn, capturing && styles.captureBtnActive]}
          >
            {capturing && <View style={styles.captureBtnInternal} />}
          </View>
        </TouchableWithoutFeedback>
      </Col>
    </Row>
  </Grid>
);
