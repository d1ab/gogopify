import React from "react";
import { FlexContainerItem } from "../../_common/Container/Container.styled";
import {
    PlaylistBoxContainer,
    PlaylistBoxImage,
    Description,
} from "components/Playlists/Playlists.styled";
import { Typography } from "components/_common/Typography/Typography";
import { fontWeight } from "styles/typography";

const { Paragraph } = Typography;

interface PlaylistCard {
    name: string;
    description: string;
    backgroundUrl: string;
}

export const PlaylistCard: React.FC<PlaylistCard> = React.memo(
    ({ name, description, backgroundUrl }) => {
        return (
            <PlaylistBoxContainer>
                <PlaylistBoxImage url={backgroundUrl} />
                <FlexContainerItem>
                    <Paragraph fontWeight={fontWeight.bold}>{name}</Paragraph>
                    <Description>{description}</Description>
                </FlexContainerItem>
            </PlaylistBoxContainer>
        );
    }
);
