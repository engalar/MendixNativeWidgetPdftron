import React, { ReactElement, createElement, useCallback } from "react";
import { Text } from "react-native";

import { Badge } from "./components/Badge";
import { BadgeStyle } from "./ui/styles";
import { NativePdftronProps } from "../typings/NativePdftronProps";
import App from "./components/App";

export function NativePdftron({ value, style, onClick }: NativePdftronProps<BadgeStyle>): ReactElement {
    /* const onClickHandler = useCallback(() => {
        if (onClick && onClick.canExecute && !onClick.isExecuting) {
            onClick.execute();
        }
    }, [onClick]); */

    const content = value?.displayValue ? (
        <App /* onClick={onClickHandler} */ path={value.displayValue} />
    ) : (
        <Text>提示UI内容</Text>
    );
    return content;
}
