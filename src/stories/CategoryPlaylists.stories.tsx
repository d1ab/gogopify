import { Container } from "../components/_common/Container/Container.styled";
import React from "react";
import { storiesOf } from "@storybook/react";
import { CategoryPlaylists } from "../components/CategoryPlaylists/CategoryPlaylists";
import { Route } from "react-router";

const routeComponentPropsMock = {
    history: {} as any,
    location: {
        params: {},
    } as any,
    match: {
        params: {},
    } as any,
};

storiesOf("CategoryPlaylists ", module)
    .addParameters({ viewport: { defaultViewport: "default" } })
    .add("default", () => (
        <Container>
            <Route>
                {/*TODO: should be handled by storybook-react-router, linking is causing problems */}
                <CategoryPlaylists {...routeComponentPropsMock} />
            </Route>
        </Container>
    ));
