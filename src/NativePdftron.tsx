import React, { ReactElement, createElement, useCallback } from "react";
import { Text } from "react-native";

import { BadgeStyle } from "./ui/styles";
import { NativePdftronProps } from "../typings/NativePdftronProps";
import App from "./components/App";

export function NativePdftron({ value, style, onClick, onSaveClick }: NativePdftronProps<BadgeStyle>): ReactElement {
    const onClickHandler = useCallback(() => {
        if (onClick && onClick.canExecute && !onClick.isExecuting) {
            onClick.execute();
        }
    }, [onClick]);

    const onSaveClickHandler = useCallback(
        (base64: string) => {
            if (onSaveClick && onSaveClick.canExecute && !onSaveClick.isExecuting) {
                value?.setTextValue(base64);
                onSaveClick.execute();
            }
        },
        [onSaveClick]
    );

    const content = value?.displayValue ? (
        <App onClick={onClickHandler} path={value.displayValue} onSaveClick={onSaveClickHandler} />
    ) : (
        <Text>提示UI内容</Text>
    );
    return content;
}
