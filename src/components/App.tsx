import React, { useState, useEffect, createElement, useRef, MutableRefObject, useCallback } from "react";
import { Platform, StyleSheet, Text, View, PermissionsAndroid, Alert, Button } from "react-native";

import { DocumentView, RNPdftron } from "@pdftron/react-native-pdf";

const App = ({
    path,
    onClick,
    onSaveClick
}: {
    path: string;
    onClick: () => void;
    onSaveClick: (base64: string) => void;
}) => {
    const documentViewRef: MutableRefObject<DocumentView | null> = useRef(null);
    const [permissionGranted, setPermissionGranted] = useState(Platform.OS === "ios");

    useEffect(() => {
        RNPdftron.initialize("Insert commercial license key here after purchase");
        RNPdftron.enableJavaScript(true);

        if (Platform.OS === "android") {
            requestStoragePermission();
        }
    }, []);

    const requestStoragePermission = useCallback(async () => {
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
    }, []);

    const onButtonPress = useCallback(() => {
        documentViewRef.current?.saveDocument().then(base64 => {
            if (base64) {
                onSaveClick(base64);
            }
        });
    }, []);

    const onLeadingNavButtonPressed = useCallback(() => {
        console.log("leading nav button pressed");
        if (Platform.OS === "ios") {
            Alert.alert(
                "App",
                "onLeadingNavButtonPressed",
                [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                { cancelable: true }
            );
        } else {
            onClick();
        }
    }, []);

    if (!permissionGranted) {
        return (
            <View style={styles.container}>
                <Text>Storage permission required.</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <Button title="保存按钮" onPress={onButtonPress} />
            <DocumentView
                style={{ flex: 1 }}
                ref={documentViewRef}
                document={path}
                isBase64String
                autoSaveEnabled
                showLeadingNavButton
                leadingNavButtonIcon={Platform.OS === "ios" ? "ic_close_black_24px.png" : "ic_arrow_back_white_24dp"}
                onLeadingNavButtonPressed={onLeadingNavButtonPressed}
            />
        </View>
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
