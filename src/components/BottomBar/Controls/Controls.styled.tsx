import styled from "styled-components";
import { StyledIcon } from "@styled-icons/styled-icon";

export const ControlIcon = (icon: StyledIcon) => styled(icon).attrs<{
    isDisabled?: boolean;
}>(({ isDisabled }) => {
    if (isDisabled) {
        return {
            style: {
                opacity: 0.5,
                pointerEvents: "none",
            },
        };
    }
})<{ isDisabled?: boolean }>`
    color: white;
`;

export const PlayerContainer = styled.div`
    align-items: center;
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    max-width: 200px;
    margin: 0 auto;
`;
