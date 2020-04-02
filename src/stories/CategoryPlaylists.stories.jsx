import { Container } from "../components/_common/Container/Container";
import React from "react";
import { storiesOf } from "@storybook/react";
import { CategoryPlaylists } from "../components/CategoryPlaylists/CategoryPlaylists";
import { Route } from "react-router";

export default {
    title: "CategoryPlaylist",
    component: CategoryPlaylists,
};

storiesOf("CategoryPlaylists ", module)
    .addParameters({ viewport: { defaultViewport: "default" } })
    // .addDecorator(StoryRouter())
    .add("default", () => (
        <Container>
            <Route>
                {/*TODO: should be handled by storybook-react-router, linking is causing problems */}
                <CategoryPlaylists match={{ params: {} }} />
            </Route>
        </Container>
    ));
