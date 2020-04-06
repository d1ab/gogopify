import React, { useEffect, useRef, useState } from "react";
import { FlexContainerItem } from "components/_common/Container/Container.styled";
import { Controls } from "./Controls/Controls";
import { PlaybackBar } from "./PlaybackBar/PlaybackBar";
import { useAudioPlayer } from "hooks/useAudioPlayer";
import { PlayerContainer, Audio } from "./BottomBar.styled";
import { useSelector } from "react-redux";
import { getActiveTrack } from "store/selectors/playlist.selectors";
import { TrackInfo } from "./TrackInfo/TrackInfo";

export const Player: React.FC = () => {
    const {
        activeTrack: {
            isActive,
            isPlaying: isActiveTrackPlaying,
            isPaused: isActiveTrackPaused,
            track,
        },
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
                return setCurrentTrack(track.preview_url);
            }

            // if track has changed
            if (
                isActiveTrackPlaying &&
                currentPlayTrack !== track.preview_url
            ) {
                setAudioPlay(false);

                return setCurrentTrack(track.preview_url);
            }

            // if active track is paused
            if (isActiveTrackPaused) {
                return setAudioPlay(false);
            }

            // resume paused
            setAudioPlay(true);
        }
    }, [
        isActive,
        track.preview_url,
        isActiveTrackPaused,
        isActiveTrackPlaying,
    ]);

    return (
        <PlayerContainer>
            <FlexContainerItem space={"25%"}>
                {isActive && track && <TrackInfo />}
            </FlexContainerItem>
            <FlexContainerItem>
                <Audio ref={audioRef} />
                <Controls
                    isDisabled={!currentPlayTrack}
                    handlePlay={setAudioPlay}
                    isPlaying={isPlaying}
                />
                <PlaybackBar
                    currentTime={currentTrackTime}
                    duration={trackDuration}
                    handleTrackTime={setTrackTime}
                />
            </FlexContainerItem>
            <FlexContainerItem space={"25%"} />
        </PlayerContainer>
    );
};
