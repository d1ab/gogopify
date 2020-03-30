import React, { useRef } from "react";
import { FlexContainerItem } from "components/_common/Container/Container";
import { Controls } from "./Controls/Controls";
import { PlaybackBar } from "./PlaybackBar/PlaybackBar";
import { useAudioPlayer } from "hooks/useAudioPlayer";
import { PlayerContainer, Audio } from "./BottomBar.styled";

// TODO: temporary added url arg, change when async actions will be applied
export const BottomBar: React.FC<{ audioUrl: string }> = ({ audioUrl }) => {
    const {
        audio,
        canPlay,
        currentTrackTime,
        trackDuration,
        setAudioPlay,
        setTrackTime,
        isPlaying,
    } = useAudioPlayer(audioUrl);
    const audioRef = useRef(audio);

    return (
        <PlayerContainer>
            <FlexContainerItem space={"25%"}>A</FlexContainerItem>
            <FlexContainerItem>
                <Audio ref={audioRef} />
                <Controls
                    handlePlay={setAudioPlay}
                    canPlay={canPlay}
                    isPlaying={isPlaying}
                />
                <PlaybackBar
                    currentTime={currentTrackTime}
                    duration={trackDuration}
                    handleTrackTime={setTrackTime}
                />
            </FlexContainerItem>
            <FlexContainerItem space={"25%"}>C</FlexContainerItem>
        </PlayerContainer>
    );
};
