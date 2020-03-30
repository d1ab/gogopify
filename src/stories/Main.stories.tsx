import { storiesOf } from "@storybook/react";
import { Typography } from "components/_common/Typography/Typography";
import React from "react";
import { Container } from "components/_common/Container/Container";
import { Main } from "../components/Main/Main";

const { H2 } = Typography;

export default {
    title: "Main",
    component: Main,
};

storiesOf("Main ", module)
    .addParameters({ viewport: { defaultViewport: "default" } })
    .add("empty", () => (
        <Container space={"0"}>
            <H2>Main content</H2>
        </Container>
    ));
