import React from "react";
import { action } from "@storybook/addon-actions";
import { Button } from "components/_common/Button/Button";
import { storiesOf } from "@storybook/react";
import { Container } from "../components/_common/Container/Container";

export default {
    title: "Button",
    component: Button,
};

storiesOf("Buttons ", module)
    .addParameters({ viewport: { defaultViewport: "default" } })
    .add("Primary Button", () => (
        <Container>
            <Button onClick={action("clicked")}>Hello Primary</Button>
        </Container>
    ))
    .add("Secondary Button", () => (
        <Container>
            <Button color={"secondary"} onClick={action("clicked")}>
                Hello Secondary
            </Button>
        </Container>
    ));
