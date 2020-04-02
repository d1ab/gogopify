import { Container } from "../components/_common/Container/Container.styled";
import React from "react";
import { storiesOf } from "@storybook/react";
import { Categories } from "../components/Categories/Categories";
import { Route } from "react-router";

export default {
    title: "Categories",
    component: Categories,
};

storiesOf("Categories ", module)
    .addParameters({ viewport: { defaultViewport: "default" } })
    .add("default", () => (
        <Container>
            <Route>
                {/*TODO: should be handled by storybook-react-router, linking is causing problems */}
                <Categories match={{ params: {} }} />
            </Route>
        </Container>
    ));
