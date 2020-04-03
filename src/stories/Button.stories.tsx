import React from "react";
import { action } from "@storybook/addon-actions";
import { Button } from "components/_common/Button/Button.styled";
import { storiesOf } from "@storybook/react";
import { Container } from "../components/_common/Container/Container.styled";

storiesOf("Buttons ", module)
    .addParameters({ viewport: { defaultViewport: "default" } })
    .add("all", () => (
        <Container>
            <Button onClick={action("clicked")}>Hello Primary</Button>
            <Button color={"secondary"} onClick={action("clicked")}>
                Hello Secondary
            </Button>
        </Container>
    ));
