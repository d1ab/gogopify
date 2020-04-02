import { Container } from "../components/_common/Container/Container";
import React from "react";
import { storiesOf } from "@storybook/react";
import { Playlist } from "components/Playlist/Playlist";

export default {
    title: "Playlist",
    component: Playlist,
};

storiesOf("Playlist ", module)
    .addParameters({ viewport: { defaultViewport: "default" } })
    .add("default", () => (
        <Container style={{ height: "100vh" }} scroll={true}>
            {/*TODO: should be handled by storybook-react-router, linking is causing problems */}
            <Playlist match={{ params: {} }} />
        </Container>
    ));
