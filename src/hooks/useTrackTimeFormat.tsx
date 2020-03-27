import { useEffect, useState } from "react";

export const useTrackTimeFormat = (time: number): string => {
    const [formattedTime, setTimeFormat] = useState("00:00");

    const formatTime = (time: number): string => {
        const dateObj = new Date(time * 1000);
        const minutes = dateObj.getUTCMinutes();
        const seconds = dateObj.getSeconds();

        return (
            minutes.toString().padStart(2, "0") +
            ":" +
            seconds.toString().padStart(2, "0")
        );
    };

    useEffect(() => {
        setTimeFormat(formatTime(time));
    }, [time]);

    return formattedTime;
};
