import { storiesOf } from "@storybook/react";
import { Typography } from "components/_common/Typography/Typography";
import React from "react";
import { Container } from "components/_common/Container/Container";
import { Profile } from "components/Profile/Profile";

const { H2 } = Typography;

export default {
    title: "Profile",
    component: Profile,
};

storiesOf("Profile ", module)
    .addParameters({ viewport: { defaultViewport: "default" } })
    .add("empty", () => (
        <Container space={"0"}>
            <H2>Profile content</H2>
        </Container>
    ));
