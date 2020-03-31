import React from "react";
import { FlexContainerItem } from "../../_common/Container/Container";
import {
    CategoryPlaylistBoxContainer,
    CategoryPlaylistBoxImage,
    Description,
} from "components/CategoryPlaylists/CategoryPlaylists.styled";
import { Typography } from "components/_common/Typography/Typography";
import { fontWeight } from "styles/typography";

const { Paragraph, H5 } = Typography;

interface PlaylistCard {
    name: string;
    description: string;
    backgroundUrl: string;
}

export const PlaylistCard: React.FC<PlaylistCard> = React.memo(
    ({ name, description, backgroundUrl }) => {
        return (
            <CategoryPlaylistBoxContainer>
                <CategoryPlaylistBoxImage url={backgroundUrl} />
                <FlexContainerItem>
                    <Paragraph fontWeight={fontWeight.bold}>{name}</Paragraph>
                    <Description>{description}</Description>
                </FlexContainerItem>
            </CategoryPlaylistBoxContainer>
        );
    }
);
