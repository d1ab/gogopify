import { storiesOf } from "@storybook/react";
import React, { useContext } from "react";
import { Notification } from "../components/_common/NotificationBar/NotificationBar";
import { Container } from "../components/_common/Container/Container";
import { Button } from "../components/_common/Button/Button";
import { useNotification } from "../components/_common/NotificationBar/useNotification";
import {
    NotificationBarProvider,
    NotificationContext,
} from "../components/_common/NotificationBar/NotificationBarProvider";

export default {
    title: "NotificationBar",
    component: Notification,
};

const ButtonWrapper: React.FC = () => {
    const { showNotification } = useNotification();

    return (
        <Button
            onClick={() => {
                showNotification("Success notification!", "success");
            }}>
            Show notification!
        </Button>
    );
};

storiesOf("NotificationBar ", module)
    .addParameters({ viewport: { defaultViewport: "default" } })
    .add("success", () => {
        return (
            <NotificationBarProvider>
                <Container>
                    <Notification />
                    <ButtonWrapper />
                </Container>
            </NotificationBarProvider>
        );
    })
    .add("error", () => {
        return (
            <NotificationBarProvider>
                <Container>
                    <Notification />
                    <ButtonWrapper />
                </Container>
            </NotificationBarProvider>
        );
    });
