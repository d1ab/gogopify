import styled from "styled-components";
import { StyledIcon } from "@styled-icons/styled-icon";
import { ListItem } from "../../_common/List/List.styled";

export const PlayerIcon = (icon: StyledIcon) => styled(icon).attrs<{
    isActive?: boolean;
}>(({ theme, isActive }) => {
    return {
        style: {
            color: isActive ? theme.colors.primary : theme.colors.secondary,
        },
    };
})<{ isActive?: boolean }>`
    width: 35px;
    position: absolute;
    left: -15px;
    top: 50%;
    transform: translate(50%, -50%);
    opacity: ${({ isActive }) => (isActive ? 1 : 0)};
    cursor: pointer;

    ${ListItem}:hover & {
        opacity: 1;
    }
`;
