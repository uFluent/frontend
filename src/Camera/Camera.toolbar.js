import React from "react";
import { Col, Row, Grid } from "react-native-easy-grid";
import { View, TouchableWithoutFeedback } from "react-native";

import styles from "./Camera.styles";

import { Ionicons } from "@expo/vector-icons";

export const Toolbar = ({
  capturing = false,
  onCaptureIn,
  onCaptureOut,
  onShortCapture
}) => (
  <Grid style={styles.bottomToolbar}>
    <Row>
      <Col size={2} style={styles.alignCenter}>
        <TouchableWithoutFeedback
          onPressIn={onCaptureIn}
          onPressOut={onCaptureOut}
          onLongPress={onShortCapture}
          onPress={onShortCapture}
        >
          <View
            style={[styles.captureBtn, capturing && styles.captureBtnActive]}
          >
            <Ionicons
              name="md-camera"
              size={70}
              style={[styles.cameraIcon, capturing && styles.cameraIconActive]}
            />
            {/* {capturing && <View style={styles.captureBtnInternal} />} */}
          </View>
        </TouchableWithoutFeedback>
      </Col>
    </Row>
  </Grid>
);

export const HomeButton = () => {};
