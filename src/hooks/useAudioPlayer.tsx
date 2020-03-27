import { useLayoutEffect, useRef, useState } from "react";

interface UserAudioPlayer {
    audio: HTMLAudioElement | null;
    isPlaying: boolean;
    canPlay: boolean;
    trackDuration: number;
    currentTrackTime: number;
    toggledTrackTime: number | null;
    setTrackTime(currentTime: number): void;
    setAudioPlay(isPlaying: boolean): void;
}

export const useAudioPlayer = (audioUrl: string): UserAudioPlayer => {
    const audioRef = useRef(new Audio(audioUrl));
    const [isPlaying, setAudioPlay] = useState(false);
    const [toggledTrackTime, setTrackTime] = useState<number | null>(null);
    const [state, setState] = useState({
        audio: new Audio(audioUrl),
        canPlay: false,
        trackDuration: 0,
        currentTrackTime: 0,
    });

    useLayoutEffect(() => {
        const audio = audioRef.current;

        const setAudioAvailability = (): void =>
            setState((currentState) => ({ ...currentState, canPlay: true }));

        const setAudio = (): void => {
            setState((currentState) => ({
                ...currentState,
                trackDuration: audioRef.current.duration,
                currentTrackTime: audioRef.current.currentTime,
            }));
        };

        const setAudioTime = (): void =>
            setState((currentState) => ({
                ...currentState,
                currentTrackTime: audioRef.current.currentTime,
            }));

        audio.addEventListener("canplay", setAudioAvailability);
        audio.addEventListener("loadeddata", setAudio);
        audio.addEventListener("timeupdate", setAudioTime);

        return (): void => {
            audio.removeEventListener("canplay", setAudioAvailability);
            audio.removeEventListener("loadeddata", setAudio);
            audio.removeEventListener("timeupdate", setAudioTime);
        };
    }, []);

    useLayoutEffect(() => {
        if (isPlaying) {
            // something unexpected may happen?
            audioRef.current.play().catch((err) => {
                console.error(err);
            });
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    useLayoutEffect(() => {
        // update timer based on toggled timeline
        if (toggledTrackTime && toggledTrackTime !== state.currentTrackTime) {
            audioRef.current.currentTime = toggledTrackTime;
            setTrackTime(null);
        }
    }, [toggledTrackTime, state.currentTrackTime]);

    return {
        ...state,
        isPlaying,
        setAudioPlay,
        setTrackTime,
        toggledTrackTime,
    };
};
