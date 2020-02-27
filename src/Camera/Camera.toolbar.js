import React from "react";
import { Col, Row, Grid } from "react-native-easy-grid";
import { View, TouchableWithoutFeedback } from "react-native";

import styles from "./Camera.styles";
import AwesomeButtonCartman from "react-native-really-awesome-button/src/themes/cartman";

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
        <AwesomeButtonCartman
          type="secondary"
          springRelease={false}
          style={{
            marginTop: 50
          }}
          size="small"
          borderRadius={(20, 50)}
          height={80}
          width={175}
          borderWidth={3}
          raiseLevel={4}
          onPress={onShortCapture}
          backgroundColor="rgb(253,1,23)"
        >
          <Ionicons
            name="md-camera"
            size={70}
            style={[styles.cameraIcon, capturing && styles.cameraIconActive]}
          />
        </AwesomeButtonCartman>
      </Col>
    </Row>
  </Grid>
);

export const HomeButton = () => {};
