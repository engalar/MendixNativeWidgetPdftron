import React, { useState, useEffect, createElement } from "react";
import { Platform, StyleSheet, Text, View, PermissionsAndroid, BackHandler, NativeModules, Alert } from "react-native";

import { DocumentView, RNPdftron } from "react-native-pdftron";

const App = ({ path }: { path: string }) => {
    const [permissionGranted, setPermissionGranted] = useState(Platform.OS === "ios");

    useEffect(() => {
        RNPdftron.initialize("Insert commercial license key here after purchase");
        RNPdftron.enableJavaScript(true);

        if (Platform.OS === "android") {
            requestStoragePermission();
        }
    }, []);

    const requestStoragePermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                setPermissionGranted(true);
                console.log("Storage permission granted");
            } else {
                setPermissionGranted(false);
                console.log("Storage permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const onLeadingNavButtonPressed = () => {
        console.log("leading nav button pressed");
        if (Platform.OS === "ios") {
            Alert.alert(
                "App",
                "onLeadingNavButtonPressed",
                [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                { cancelable: true }
            );
        } else {
            BackHandler.exitApp();
        }
    };

    if (!permissionGranted) {
        return (
            <View style={styles.container}>
                <Text>Storage permission required.</Text>
            </View>
        );
    }

    // const path = "https://pdftron.s3.amazonaws.com/downloads/pl/PDFTRON_mobile_about.pdf";

    return (
        <DocumentView
            document={path}
            showLeadingNavButton
            leadingNavButtonIcon={Platform.OS === "ios" ? "ic_close_black_24px.png" : "ic_arrow_back_white_24dp"}
            onLeadingNavButtonPressed={onLeadingNavButtonPressed}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    }
});

export default App;
