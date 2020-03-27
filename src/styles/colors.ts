import * as CSS from "csstype";

export type ColorTypes = "primary" | "secondary" | "link" | "success" | "warning" | "error" | "heading" | "text" | "disabled" | "border";

export interface ThemeColors {
    primary: CSS.ColorProperty;
    secondary: CSS.ColorProperty;
    link: CSS.ColorProperty;
    success: CSS.ColorProperty;
    warning: CSS.ColorProperty;
    error: CSS.ColorProperty;
    heading: CSS.ColorProperty;
    text: CSS.ColorProperty;
    disabled: CSS.ColorProperty;
    border: CSS.ColorProperty;
    bgBlackLight: CSS.ColorProperty;
    bgBlack: CSS.ColorProperty;
}

export const colors: ThemeColors = {
    primary: "#1DB954",
    secondary: "#FFFFFF",
    link: "#1890ff",
    success: "#52c41a",
    warning: "#faad14",
    error: "#e84118",
    heading: "#423EA2",
    text: "#000",
    disabled: "#f5222d",
    border: "#B3B3B3",
    bgBlackLight: "#323232",
    bgBlack: "#000000",
};
