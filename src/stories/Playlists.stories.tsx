import { Container } from "../components/_common/Container/Container.styled";
import React from "react";
import { storiesOf } from "@storybook/react";
import { Playlists } from "../components/Playlists/Playlists";
import { Route } from "react-router";
import { fetchPlaylists } from "../store/actions/playlists.actions";
import { act } from "@testing-library/react";

const routeComponentPropsMock = {
    history: {} as any,
    location: {
        params: {},
    } as any,
    match: {
        params: {},
    } as any,
};

storiesOf("Playlists ", module)
    .addParameters({ viewport: { defaultViewport: "default" } })
    .add("default", () => (
        <Container>
            <Route>
                {/*TODO: should be handled by storybook-react-router, linking is causing problems */}
                <Playlists
                    {...routeComponentPropsMock}
                    title={"Example playlist"}
                />
            </Route>
        </Container>
    ));
