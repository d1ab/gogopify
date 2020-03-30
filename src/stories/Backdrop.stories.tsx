import { storiesOf } from "@storybook/react";
import React from "react";
import { Container } from "components/_common/Container/Container";
import { Button } from "components/_common/Button/Button";
import { useLoader } from "hooks/useLoader";
import { BackdropProvider } from "components/Backdrop/BackdropProvider";
import { Backdrop } from "components/Backdrop/Backdrop";

export default {
    title: "Backdrop",
    component: Backdrop,
};

const ButtonWrapper: React.FC = () => {
    const { showLoader } = useLoader();

    return (
        <Button
            onClick={() => {
                showLoader();
            }}>
            Show loader!
        </Button>
    );
};

storiesOf("Backdrop ", module)
    .addParameters({ viewport: { defaultViewport: "default" } })
    .add("default", () => {
        return (
            <BackdropProvider>
                <Container style={{ height: "100vh" }}>
                    <Backdrop />
                    <ButtonWrapper />
                </Container>
            </BackdropProvider>
        );
    });
