import React, { ReactElement, useEffect, createElement, useState, useCallback } from "react";
import { Platform, StyleSheet, View, BackHandler, Alert, TextInput, Button } from "react-native";
import { DocumentView, RNPdftron } from "react-native-pdftron";
import DocumentPicker from "react-native-document-picker";

// import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";

import { BadgeStyle } from "../ui/styles";

export interface BadgeProps {
    value: string;
    style: BadgeStyle[];
    onClick: () => void;
}

export function Badge({ value, style, onClick }: BadgeProps): ReactElement {
    const [path, setPath] = useState<string>("http://192.168.2.22:8080/PDFTRON_mobile_about.pdf");
    useEffect(() => {
        console.log(value, style, onClick);

        RNPdftron.initialize("Insert commercial license key here after purchase");
        RNPdftron.enableJavaScript(true);
    }, []);

    const onLeadingNavButtonPressed = useCallback((): void => {
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
    }, []);

    const handleDocumentPick = useCallback(async (): Promise<void> => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf]
            });
            if (result.length > 0) {
                setPath(result[0].uri);
            }
        } catch (err) {
            if (!DocumentPicker.isCancel(err)) {
                // 处理其他错误
            }
        }
    }, []);

    // const styles = mergeNativeStyles(defaultBadgeStyle, style);
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F5FCFF"
        },
        input: {
            height: 40
        }
    });

    return (
        <View style={styles.container}>
            <Button title="选择文档" onPress={handleDocumentPick} />
            <TextInput
                style={styles.input}
                placeholder="输入PDF地址"
                onChangeText={newPath => setPath(newPath)}
                value={path}
            />
            <DocumentView
                document={path}
                showLeadingNavButton
                leadingNavButtonIcon={Platform.OS === "ios" ? "ic_close_black_24px.png" : "ic_arrow_back_white_24dp"}
                onLeadingNavButtonPressed={onLeadingNavButtonPressed}
            />
        </View>
    );
}
