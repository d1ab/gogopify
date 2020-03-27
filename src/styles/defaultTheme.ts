import { Theme } from "styled-system";
import { colors } from "./colors";
import { space } from "./spaces";
import { breakpoints } from "./breakpoints";
import { fontWeight } from "./typography";

export const defaultTheme: Theme = {
    space: {
        ...space,
    },
    breakpoints,
    colors: {
        ...colors,
    },
    fontWeights: {
        ...fontWeight,
    },
};
