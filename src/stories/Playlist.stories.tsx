import { Button } from "../components/_common/Button/Button";
import {
    Container,
    FlexColumnContainer,
    FlexContainer,
    FlexContainerItem,
} from "../components/_common/Container/Container";
import React from "react";
import { Typography } from "components/_common/Typography/Typography";
import { storiesOf } from "@storybook/react";
import { linkTo } from "@storybook/addon-links";
import { Playlist } from "components/Playlist/Playlist";
import { Image } from "components/_common/Image/Image.styled";
import { space } from "../styles/spaces";
import { List } from "../components/_common/List/List.styled";
import { TrackItem } from "../components/Playlist/TrackItem/TrackItem";

const { H4 } = Typography;
const playlistImage =
    "https://i.scdn.co/image/ab67706f000000024d9403275950bf74e42df37a";

export default {
    title: "Playlist",
    component: Playlist,
};

storiesOf("Playlist ", module)
    .addParameters({ viewport: { defaultViewport: "default" } })
    .add("default", () => (
        <Container style={{ height: "100vh" }}>
            <FlexContainer>
                <FlexContainerItem space={"30%"} paddings={space.L}>
                    <FlexColumnContainer alignItems={"center"}>
                        <Image src={playlistImage} />
                        <H4 margin={"10px 0"}>Some description</H4>
                        <Button>ODTWORZ</Button>
                    </FlexColumnContainer>
                </FlexContainerItem>
                <FlexContainerItem paddings={space.L}>
                    <List>
                        <TrackItem
                            id={"1"}
                            audioUrl={""}
                            artistName={"Fuego"}
                            songName={"Bomba Estero"}
                        />
                        <TrackItem
                            id={"2"}
                            audioUrl={""}
                            artistName={"Matellica"}
                            songName={"Enter Sandman"}
                        />
                        <TrackItem
                            id={"3"}
                            audioUrl={""}
                            artistName={"Rammstein"}
                            songName={"Mutter"}
                        />
                    </List>
                </FlexContainerItem>
            </FlexContainer>
        </Container>
    ));
