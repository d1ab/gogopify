import React, { useLayoutEffect, useRef } from "react";
import { Typography } from "components/_common/Typography/Typography";
import {
    PlaybackContainer,
    ProgressBar,
    ProgressBarBackground,
    ProgressBarKnob,
    ProgressBarLiner,
    ProgressBarWrapper,
} from "./Playback.styled";
import { useTrackTimeFormat } from "hooks/useTrackTimeFormat";
import { useMousePosition } from "../../../hooks/useMousePosition";

const { SmallParagraph } = Typography;

interface PlaybackBar {
    currentTime: number;
    duration: number;
    handleTrackTime(toggledTime: number): void;
}

export const PlaybackBar: React.FC<PlaybackBar> = ({
    currentTime,
    duration,
    handleTrackTime,
}) => {
    const progressBarRef = useRef<HTMLDivElement>(null);
    const progress = useRef<number>(0);
    const currentTimeDuration = useTrackTimeFormat(currentTime);
    const timeLeft = useTrackTimeFormat(duration - currentTime);
    const { isMouseUp, isMouseDown, mouseX } = useMousePosition(progressBarRef);

    useLayoutEffect(() => {
        if (isMouseDown) {
            return;
        }

        progress.current = (currentTime / duration) * 100;
        // eslint-disable-next-line
    }, [currentTime, duration]);

    useLayoutEffect(() => {
        const calculateToggledTime = (mouseX: number): number => {
            if (progressBarRef.current) {
                const barWidth = progressBarRef.current.offsetWidth;
                const lengthPerPx = duration / barWidth;
                const barStartPosition = progressBarRef.current.getBoundingClientRect()
                    .left;
                const position = mouseX - barStartPosition;

                return position * lengthPerPx;
            }

            return 0;
        };

        if (isMouseUp) {
            handleTrackTime(calculateToggledTime(mouseX));
        }

        if (isMouseDown) {
            progress.current = (calculateToggledTime(mouseX) / duration) * 100;
        }
        // eslint-disable-next-line
    }, [mouseX, isMouseUp, isMouseDown, duration]);

    return (
        <PlaybackContainer>
            <SmallParagraph>{currentTimeDuration}</SmallParagraph>
            <ProgressBar ref={progressBarRef}>
                <ProgressBarKnob progress={progress.current - 0.5} />
                <ProgressBarWrapper>
                    <ProgressBarBackground>
                        <ProgressBarLiner progress={-100 + progress.current} />
                    </ProgressBarBackground>
                </ProgressBarWrapper>
            </ProgressBar>
            <SmallParagraph>-{timeLeft}</SmallParagraph>
        </PlaybackContainer>
    );
};
