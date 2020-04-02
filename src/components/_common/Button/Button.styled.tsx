import styled from "styled-components";
import { ColorTypes } from "styles/colors";

interface ButtonStyled {
    color?: ColorTypes;
    fontWeight?: number;
    fontSize?: number;
}

export const Button = styled.button<ButtonStyled>`
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
};
