import styles from "./EditorWrapper.module.scss";
import React from "react";

interface Props {
    children: React.ReactNode;
    center?: boolean;
    style?: React.CSSProperties;
}

export function Wrapper({children, center, style}: Props){
    return(
        <div id={"wrapper"}
            className={styles.wrapper}
            style={style}
        >
            {children}
        </div>
    )
}