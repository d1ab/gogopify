import { colors } from "./colors";
import { StyledSystemProps } from "components/_common/DynamicStyledComponent/DynamicStyledComponent";

export interface FontWeight {
    thin: number;
    normal: number;
    bold: number;
}

export interface FontSize {
    small: number;
    normal: number;
    big: number;
}

const fontFamilies: { heading: string; body: string } = {
    heading: "Montserrat, serif",
    body: "Raleway, sans-serif",
};

export const fontWeight: FontWeight = {
    thin: 300,
    normal: 500,
    bold: 700,
};

export const fontSize: FontSize = {
    small: 11,
    normal: 14,
    big: 18,
};

interface TypographyStyles {
    H1: StyledSystemProps;
    H2: StyledSystemProps;
    H3: StyledSystemProps;
    H4: StyledSystemProps;
    H5: StyledSystemProps;
    LargeLead: StyledSystemProps;
    SmallLead: StyledSystemProps;
    Paragraph: StyledSystemProps;
    SmallParagraph: StyledSystemProps;
    Link: StyledSystemProps;
}
export const typographyStyles: TypographyStyles = {
    H1: {
        fontSize: [50, 51, 52, 57],
        fontWeight: fontWeight.bold,
        color: colors.secondary,
        fontFamily: fontFamilies.heading,
        as: "h1",
    },
    H2: {
        fontSize: [37, 39, 41, 43],
        fontWeight: fontWeight.bold,
        color: colors.secondary,
        fontFamily: fontFamilies.heading,
        as: "h2",
    },
    H3: {
        fontSize: [27, 28, 30, 32],
        color: colors.secondary,
        fontWeight: fontWeight.bold,
        fontFamily: fontFamilies.heading,
        as: "h3",
    },
    H4: {
        fontSize: [18, 20, 22, 24],
        fontWeight: fontWeight.bold,
        color: colors.secondary,
        fontFamily: fontFamilies.heading,
        as: "h4",
    },
    H5: {
        fontWeight: fontWeight.bold,
        fontSize: [16, 17, 19, 21],
        color: colors.secondary,
        fontFamily: fontFamilies.heading,
        as: "h5",
    },
    LargeLead: {
        fontWeight: fontWeight.bold,
        fontSize: [18, 20, 22, 24],
        fontFamily: fontFamilies.heading,
        color: colors.secondary,
        as: "p",
    },
    SmallLead: {
        fontWeight: fontWeight.normal,
        fontSize: [17, 18, 19, 21],
        color: colors.secondary,
        fontFamily: fontFamilies.heading,
        as: "p",
    },
    Paragraph: {
        fontSize: [14, 15, 15, 16],
        fontWeight: fontWeight.thin,
        color: colors.secondary,
        fontFamily: fontFamilies.body,
        as: "p",
    },
    SmallParagraph: {
        fontSize: [13, 14, 14, 15],
        fontWeight: fontWeight.thin,
        color: colors.secondary,
        fontFamily: fontFamilies.body,
        as: "p",
    },
    Link: {
        fontWeight: fontWeight.bold,
        color: colors.secondary,
        fontSize: [14, 15, 15, 16],
        fontFamily: fontFamilies.body,
    },
};
