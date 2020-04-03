import { storiesOf } from "@storybook/react";
import React from "react";
import { Container } from "components/_common/Container/Container.styled";
import { Main } from "../components/Main/Main";

storiesOf("Main ", module)
    .addParameters({ viewport: { defaultViewport: "default" } })
    .add("default", () => (
        <Container space={"0"}>
            <Main />
        </Container>
    ));
