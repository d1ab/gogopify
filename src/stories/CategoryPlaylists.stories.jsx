import {
    Container,
    FlexContainer,
} from "../components/_common/Container/Container";
import React from "react";
import { Typography } from "../components/_common/Typography/Typography";
import { storiesOf } from "@storybook/react";
import { linkTo } from "@storybook/addon-links";
import { CategoryPlaylists } from "../components/CategoryPlaylists/CategoryPlaylists";
import { PlaylistCard } from "../components/CategoryPlaylists/PlaylistCard/PlaylistCard";

const { H3 } = Typography;
const background = "https://images6.alphacoders.com/909/thumb-350-909641.png";

export default {
    title: "CategoryPlaylist",
    component: CategoryPlaylists,
};

storiesOf("CategoryPlaylists ", module)
    .addParameters({ viewport: { defaultViewport: "default" } })
    .add("default", () => (
        <Container>
            <H3>Kategorie</H3>
            <FlexContainer style={{ flexWrap: "wrap" }}>
                <PlaylistCard
                    name={"Yoga session"}
                    backgroundUrl={background}
                    description={
                        "The perfect soundtrack to your morning yoga session"
                    }
                />
                <PlaylistCard
                    name={"Yoga session"}
                    backgroundUrl={background}
                    description={
                        "The perfect soundtrack to your morning yoga session"
                    }
                />
                <PlaylistCard
                    name={"Yoga session"}
                    backgroundUrl={background}
                    description={
                        "The perfect soundtrack to your morning yoga session"
                    }
                />
            </FlexContainer>
        </Container>
    ));
