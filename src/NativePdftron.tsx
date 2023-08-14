import { ReactElement, createElement, useCallback } from "react";

import { Badge } from "./components/Badge";
import { BadgeStyle } from "./ui/styles";
import { NativePdftronProps } from "../typings/NativePdftronProps";

export function NativePdftron({ value, style, onClick }: NativePdftronProps<BadgeStyle>): ReactElement {
    const onClickHandler = useCallback(() => {
        if (onClick && onClick.canExecute && !onClick.isExecuting) {
            onClick.execute();
        }
    }, [onClick]);

    return <Badge style={style} onClick={onClickHandler} value={value?.displayValue || "Default"} />;
}
