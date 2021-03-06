import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";

interface UserAudioPlayer {
    audio: HTMLAudioElement | null;
    isPlaying: boolean;
    // canPlay: boolean;
    trackDuration: number;
    currentTrackTime: number;
    toggledTrackTime: number | null;
    setTrackTime(currentTime: number): void;
    setAudioPlay(isPlaying: boolean): void;
    setAudioUrl(audioUrl: string): void;
}

export const useAudioPlayer = (): UserAudioPlayer => {
    const audioRef = useRef<HTMLAudioElement>();
    const [audioUrl, setAudioUrl] = useState("");
    const [isPlaying, setAudioPlay] = useState(false);
    const [toggledTrackTime, setTrackTime] = useState<number | null>(null);
    const [state, setState] = useState({
        trackDuration: 0,
        currentTrackTime: 0,
    });

    const setPlay = useCallback((isPlaying) => setAudioPlay(isPlaying), []);

    const setAudio = useCallback((audioUrl) => setAudioUrl(audioUrl), []);

    useLayoutEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                // something unexpected may happen?
                audioRef.current.play().catch((err) => {
                    console.error(err);
                });
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    useLayoutEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio(audioUrl);
        } else {
            audioRef.current.src = audioUrl;
        }

        const setAudio = (): void => {
            setState(() => ({
                trackDuration: audioRef.current!.duration,
                currentTrackTime: audioRef.current!.currentTime,
            }));
        };

        const setAudioTime = (): void =>
            setState((currentState) => ({
                ...currentState,
                currentTrackTime: audioRef.current!.currentTime,
            }));

        audioRef.current.addEventListener("loadeddata", setAudio);
        audioRef.current.addEventListener("timeupdate", setAudioTime);

        return (): void => {
            audioRef.current!.removeEventListener("loadeddata", setAudio);
            audioRef.current!.removeEventListener("timeupdate", setAudioTime);
        };
    }, [audioUrl]);

    useEffect(() => {
        if (!audioUrl) {
            return;
        }

        setAudioPlay(() => true);
    }, [audioUrl]);

    useLayoutEffect(() => {
        // update timer based on toggled timeline
        if (toggledTrackTime && toggledTrackTime !== state.currentTrackTime) {
            audioRef.current!.currentTime = toggledTrackTime;
            setTrackTime(null);
        }
    }, [toggledTrackTime, state.currentTrackTime]);

    return {
        ...state,
        audio: audioRef.current!,
        isPlaying,
        setAudioPlay: setPlay,
        setTrackTime,
        toggledTrackTime,
        setAudioUrl: setAudio,
    };
};
