import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

export default class TransactionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      domState: "normal",
      hasCameraPermissions: null,
      scanned: false,
      scannedData: ""
    };
  }

  getCameraPermissions = async domState => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    //const { status } = Permissions.askAsync(Permissions.CAMERA);
    //const { status } = await Permissions.askAsync(Permissions);
    //const { status } = await Permissions.askAsync(CAMERA);

    this.setState({
      /*status === "granted" es true cuando el usuario ha dado permiso 
          status === "granted" es false cuando el usuario no ha dado permiso
        */
      hasCameraPermissions: status === "granted",
      domState: domState,
      scanned: false
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({
      scannedData: data,
      domState: "normal",
      scanned: true
    });
  };

  render() {
    const { domState, hasCameraPermissions, scannedData, scanned } = this.state;
    if (domState === "scanner") {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {hasCameraPermissions ? scannedData : "Solicitar permiso de la cámara"}
        </Text>
        {
          <TouchableOpacity
            style={[styles.button, { marginTop: 25 }]}
            onPress={() => this.getCameraPermissions("scanner")}
          >
            <Text style={styles.buttonText}>Escanear código QR</Text>
          </TouchableOpacity> 
       }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FEB20E"
  },
  text: {
    color: "#FF0F0F",
    fontSize: 25,
    fontFamily:"Courier"
  },
  button: {
    width: "43%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF0F0F",
    borderRadius: 15,
    borderWidth: 2
  },
  buttonText: {
    fontSize: 24,
    color: "#FEB20E",
    fontFamily:"Courier"
  }
});

