import styled from "styled-components";

export const PlayerContainer = styled.div`
    position: absolute;
    bottom: 0;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100px;
    border: 1px solid ${({ theme }): string => theme.colors.border};
    display: flex;
    background-color: ${({ theme }): string => theme.colors.bgBlackLight};
`;

export const Audio = styled.audio`
    position: relative;
`;
