import {
    FlexContainer,
    FlexContainerItem,
} from "components/_common/Container/Container";
import * as React from "react";
import { Typography } from "components/_common/Typography/Typography";
import { Button } from "../_common/Button/Button";

const { H3 } = Typography;

export const Playlist: React.FC = () => {
    return (
        <FlexContainer>
            <FlexContainerItem space={"30%"}>
                <H3>Image </H3>
                <Button>ODTWORZ</Button>
            </FlexContainerItem>
            <FlexContainerItem>
                <H3>Playlista</H3>
            </FlexContainerItem>
        </FlexContainer>
    );
};
