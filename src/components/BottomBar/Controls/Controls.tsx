import React from "react";
import styled from "styled-components";
import {
    SkipNext,
    SkipPrevious,
    PlayCircle,
    PauseCircle,
} from "@styled-icons/boxicons-regular";
import { useDispatch } from "react-redux";
import { go } from "../../../store/actions/playlist.actions";

interface Controls {
    handlePlay(isPlaying: boolean): void;
    // canPlay: boolean;
    isPlaying: boolean;
}

const PlayerContainer = styled.div`
    align-items: center;
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    max-width: 200px;
    margin: 0 auto;
`;

const Next = styled(SkipNext)`
    color: white;
`;

const Previous = styled(SkipPrevious)`
    color: white;
`;

const Play = styled(PlayCircle)`
    color: white;
`;

const Pause = styled(PauseCircle)`
    color: white;
`;

export const Controls: React.FC<Controls> = ({ handlePlay, isPlaying }) => {
    const dispatch = useDispatch();

    return (
        <PlayerContainer>
            <Previous
                size={32}
                onClick={() => dispatch(go({ to: "previous" }))}
            />
            {!isPlaying ? (
                <Play size={40} onClick={(): void => handlePlay(true)} />
            ) : (
                <Pause size={40} onClick={(): void => handlePlay(false)} />
            )}
            <Next size={32} onClick={() => dispatch(go({ to: "next" }))} />
        </PlayerContainer>
    );
};
