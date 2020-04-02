import React from "react";
import {
    FlexColumnContainer,
    FlexContainer,
    FlexContainerItem,
} from "components/_common/Container/Container.styled";
import { Image } from "components/_common/Image/Image.styled";
import { fontSize } from "styles/typography";
import { useSelector } from "react-redux";
import { getActiveTrack } from "store/selectors/playlist.selectors";
import { Typography } from "components/_common/Typography/Typography";

const { Paragraph, SmallParagraph } = Typography;

export const TrackInfo: React.FC = () => {
    const { isActive, track } = useSelector(getActiveTrack);

    return (
        <FlexContainerItem space={"25%"}>
            {isActive && track && (
                <FlexContainer
                    style={{ justifyContent: "center", alignItems: "center" }}>
                    <FlexColumnContainer alignItems={"flex-start"}>
                        <Image
                            src={track.album.images[1].url}
                            style={{ maxWidth: "60px" }}
                        />
                    </FlexColumnContainer>
                    <FlexColumnContainer alignItems={"center"}>
                        <Paragraph margin={"5px 0"} fontSize={fontSize.normal}>
                            {track.album.artists
                                .map((artist) => artist.name)
                                .join(", ")}
                        </Paragraph>
                        <SmallParagraph
                            margin={"2px 0"}
                            fontSize={fontSize.small}>
                            {track.name}
                        </SmallParagraph>
                    </FlexColumnContainer>
                </FlexContainer>
            )}
        </FlexContainerItem>
    );
};
