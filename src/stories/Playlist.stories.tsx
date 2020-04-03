import { Container } from "../components/_common/Container/Container.styled";
import React from "react";
import { storiesOf } from "@storybook/react";
import { Playlist } from "components/Playlist/Playlist";
import { Route } from "react-router";

const routeComponentPropsMock = {
    history: {} as any,
    location: {
        params: {},
    } as any,
    match: {
        params: { id: "" },
    } as any,
};

storiesOf("Playlist ", module)
    .addParameters({ viewport: { defaultViewport: "default" } })
    .add("default", () => (
        <Container style={{ height: "100vh" }} scroll={true}>
            {/*TODO: should be handled by storybook-react-router, linking is causing problems */}
            <Route>
                <Playlist {...routeComponentPropsMock} />
            </Route>
        </Container>
    ));
