import { storiesOf } from "@storybook/react";
import { Typography } from "components/_common/Typography/Typography";
import React from "react";
import { Container } from "components/_common/Container/Container.styled";
import { Main } from "../components/Main/Main";

export default {
    title: "Main",
    component: Main,
};

storiesOf("Main ", module)
    .addParameters({ viewport: { defaultViewport: "default" } })
    .add("default", () => (
        <Container space={"0"}>
            <Main />
        </Container>
    ));
