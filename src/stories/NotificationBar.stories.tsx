import { storiesOf } from "@storybook/react";
import React from "react";
import { Notification } from "components/NotificationBar/NotificationBar";
import { Container } from "components/_common/Container/Container.styled";
import { Button } from "components/_common/Button/Button.styled";
import { useNotification } from "hooks/useNotification";
import { NotificationBarProvider } from "components/NotificationBar/NotificationBarProvider";
import { NotificationType } from "../components/NotificationBar/NotificationBar.styled";

const ButtonWrapper: React.FC<{ type: NotificationType }> = ({ type }) => {
    const { showNotification } = useNotification();

    return (
        <Button
            onClick={() => {
                showNotification("Success notification!", type);
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
                    <ButtonWrapper type={"success"} />
                </Container>
            </NotificationBarProvider>
        );
    })
    .add("error", () => {
        return (
            <NotificationBarProvider>
                <Container>
                    <Notification />
                    <ButtonWrapper type={"error"} />
                </Container>
            </NotificationBarProvider>
        );
    });
