import styled from "styled-components";
import { ColorTypes } from "styles/colors";
import { fontWeight, fontSize } from "styles/typography";

interface Button {
    color?: ColorTypes;
    fontWeight?: number;
    fontSize?: number;
}

export const Button = styled.button<Button>`
    background-color: ${({ color, theme }) => {
        return color ? theme.colors[color] : theme.colors.primary;
    }};
    padding: ${({ theme }) => theme.space.M}px;
    margin: ${({ theme }) => theme.space.M}px;
    width: 200px;
    border: none;
    color: ${({ color }) => (color === "primary" ? "white" : "black")};
    font-size: 14px;
    font-weight: 500;
    border-radius: 15px;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;

    &:hover {
        transform: scale(1.05, 1.05);
    }

    &:focus {
        outline: none;
    }
`;

Button.defaultProps = {
    color: "primary",
    fontWeight: fontWeight.normal,
    fontSize: fontSize.normal,
};
