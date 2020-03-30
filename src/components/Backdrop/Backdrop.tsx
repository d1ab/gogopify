import React from "react";
import {
    BackdropContainer,
    BackdropLoaderWrapper,
    Circle,
} from "./Backdrop.styled";
import { useLoader } from "../../hooks/useLoader";

export const Backdrop: React.FC = () => {
    const { isVisible } = useLoader();

    if (!isVisible) {
        return null;
    }

    return (
        <BackdropContainer>
            <BackdropLoaderWrapper>
                <Circle time={1} />
                <Circle time={2} />
                <Circle time={3} />
                <Circle time={4} />
                <Circle time={5} />
            </BackdropLoaderWrapper>
        </BackdropContainer>
    );
};
