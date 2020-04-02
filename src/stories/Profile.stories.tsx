import { storiesOf } from "@storybook/react";
import React from "react";
import { Container } from "components/_common/Container/Container";
import { Profile } from "components/Profile/Profile";

export default {
    title: "Profile",
    component: Profile,
};

storiesOf("Profile ", module)
    .addParameters({ viewport: { defaultViewport: "default" } })
    .add("empty", () => (
        <Container space={"0"}>
            <Profile />
        </Container>
    ));
