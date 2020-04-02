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

const Next = ControlIcon(SkipNext);

const Previous = ControlIcon(SkipPrevious);

const Play = ControlIcon(PlayCircle);

const Pause = ControlIcon(PauseCircle);

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
                    onClick={(): void => handlePlay(true)}
                />
            ) : (
                <Pause
                    isDisabled={isDisabled}
                    size={40}
                    onClick={(): void => handlePlay(false)}
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
