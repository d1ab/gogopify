import { storiesOf } from "@storybook/react";
import React from "react";
import { Container } from "components/_common/Container/Container.styled";
import { Profile } from "components/Profile/Profile";

storiesOf("Profile ", module)
    .addParameters({ viewport: { defaultViewport: "default" } })
    .add("empty", () => (
        <Container space={"0"}>
            <Profile />
        </Container>
    ));
