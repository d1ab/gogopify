import styled from "styled-components";

export const PlaybackContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const ProgressBar = styled.div`
    height: 12px;
    position: relative;
    width: 100%;
    margin: 0 10px;
    cursor: pointer;
`;

export const ProgressBarBackground = styled.div`
    background-color: #404040;
    border-radius: 2px;
    display: flex;
    height: 4px;
    width: 100%;
`;

export const ProgressBarWrapper = styled.div`
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
`;

export const ProgressBarKnob = styled.div.attrs<{ progress: number }>(
    ({ progress }) => {
        return {
            style: {
                left: `${progress}%`,
            },
        };
    }
)<{ progress: number }>`
    visibility: hidden;
    position: relative;
    height: 12px;
    width: 12px;
    border-radius: 50%;
    background-color: white;
    z-index: 1;

    ${ProgressBar}:hover & {
        visibility: visible;
        background-color: ${({ theme }): string => theme.colors.primary};
    }
`;

export const ProgressBarLiner = styled.div.attrs<{ progress: number }>(
    ({ progress }) => {
        return {
            style: {
                transform: `translateX(${progress}%)`,
            },
        };
    }
)<{ progress: number }>`
    background-color: ${({ theme }): string => theme.colors.border};
    width: 100%;
    height: 4px;
    border-radius: 2px;

    ${ProgressBar}:hover & {
        background-color: ${({ theme }): string => theme.colors.primary};
    }
`;
