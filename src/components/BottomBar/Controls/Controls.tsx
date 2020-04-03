import React from "react";
import {
    SkipNext,
    SkipPrevious,
    PlayCircle,
    PauseCircle,
} from "@styled-icons/boxicons-regular";
import { useDispatch } from "react-redux";
import { go } from "../../../store/actions/playlist.actions";
import { ControlIcon, PlayerContainer } from "./Controls.styled";

interface Controls {
    handlePlay(isPlaying: boolean): void;
    isDisabled: boolean;
    isPlaying: boolean;
}

export const Next = ControlIcon(SkipNext);

export const Previous = ControlIcon(SkipPrevious);

export const Play = ControlIcon(PlayCircle);

export const Pause = ControlIcon(PauseCircle);

export const Controls: React.FC<Controls> = ({
    handlePlay,
    isPlaying,
    isDisabled,
}) => {
    const dispatch = useDispatch();

    return (
        <PlayerContainer>
            <Previous
                size={32}
                isDisabled={isDisabled}
                onClick={() => dispatch(go({ to: "previous" }))}
            />
            {!isPlaying ? (
                <Play
                    isDisabled={isDisabled}
                    size={40}
                    onClick={() => handlePlay(true)}
                />
            ) : (
                <Pause
                    isDisabled={isDisabled}
                    size={40}
                    onClick={() => handlePlay(false)}
                />
            )}
            <Next
                isDisabled={isDisabled}
                size={32}
                onClick={() => dispatch(go({ to: "next" }))}
            />
        </PlayerContainer>
    );
};
