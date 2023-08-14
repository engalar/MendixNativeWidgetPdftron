import React, { ReactElement, useEffect } from "react";
import { Platform, StyleSheet, View, BackHandler, Alert } from "react-native";
import { DocumentView, RNPdftron } from "@pdftron/react-native-pdf";

// import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";

import { BadgeStyle } from "../ui/styles";


export interface BadgeProps {
    value: string;
    style: BadgeStyle[];
    onClick: () => void;
}

export function Badge({ value, style, onClick }: BadgeProps): ReactElement {
    useEffect(() => {
        console.log(value, style, onClick);

        RNPdftron.initialize("Insert commercial license key here after purchase");
        RNPdftron.enableJavaScript(true);
    }, []);

    const onLeadingNavButtonPressed = (): void => {
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

    // const styles = mergeNativeStyles(defaultBadgeStyle, style);
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F5FCFF"
        }
    });

    const path = "https://pdftron.s3.amazonaws.com/downloads/pl/PDFTRON_mobile_about.pdf";

    return (
        <View style={styles.container}>
            <DocumentView
                document={path}
                showLeadingNavButton
                leadingNavButtonIcon={Platform.OS === "ios" ? "ic_close_black_24px.png" : "ic_arrow_back_white_24dp"}
                onLeadingNavButtonPressed={onLeadingNavButtonPressed}
            />
        </View>
    );
}
