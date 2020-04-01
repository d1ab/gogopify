import React, { useEffect, useRef, useState } from "react";
import { FlexContainerItem } from "components/_common/Container/Container";
import { Controls } from "./Controls/Controls";
import { PlaybackBar } from "./PlaybackBar/PlaybackBar";
import { useAudioPlayer } from "hooks/useAudioPlayer";
import { PlayerContainer, Audio } from "./BottomBar.styled";
import { useSelector } from "react-redux";
import { getActiveTrack } from "../../store/selectors/playlist.selectors";

// TODO: temporary added url arg, change when async actions will be applied
export const BottomBar: React.FC<{ audioUrl?: string }> = ({ audioUrl }) => {
    const {
        isActive,
        isPlaying: isActiveTrackPlaying,
        isPaused: isActiveTrackPaused,
        track,
    } = useSelector(getActiveTrack);
    const {
        audio,
        currentTrackTime,
        trackDuration,
        setAudioPlay,
        setTrackTime,
        isPlaying,
        setAudioUrl,
    } = useAudioPlayer();
    const audioRef = useRef(audio);
    const [currentPlayTrack, setCurrentTrack] = useState("");

    useEffect(() => {
        setAudioUrl(currentPlayTrack);
    }, [currentPlayTrack]);

    useEffect(() => {
        if (isActive) {
            // initialize track is nothing was set before
            if (isActiveTrackPlaying && !currentPlayTrack) {
                setCurrentTrack(track.preview_url!);
            }

            // if track has changed
            if (
                isActiveTrackPlaying &&
                currentPlayTrack !== track.preview_url
            ) {
                setAudioPlay(false);
                setCurrentTrack(track.preview_url!);
            }

            // if track is paused
            if (isActiveTrackPaused) {
                setAudioPlay(false);
            }
        }
    }, [
        isActive,
        track.preview_url,
        isActiveTrackPaused,
        isActiveTrackPlaying,
    ]);

    return (
        <PlayerContainer>
            <FlexContainerItem space={"25%"}>A</FlexContainerItem>
            <FlexContainerItem>
                <Audio ref={audioRef} />
                <Controls
                    handlePlay={setAudioPlay}
                    // canPlay={canPlay}
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
