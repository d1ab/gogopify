import { Container } from "../components/_common/Container/Container.styled";
import React from "react";
import { storiesOf } from "@storybook/react";
import { Categories } from "../components/Categories/Categories";
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

storiesOf("Categories", module)
    .addParameters({ viewport: { defaultViewport: "default" } })
    .add("default", () => (
        <Container>
            <Route>
                {/*TODO: should be handled by storybook-react-router, linking is causing problems */}
                <Categories {...routeComponentPropsMock} />
            </Route>
        </Container>
    ));
