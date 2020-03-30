import React from "react";
import { NotificationBarContainer } from "./NotificationBar.styled";
import { Typography } from "components/_common/Typography/Typography";
import { useNotification } from "hooks/useNotification";

const { SmallParagraph } = Typography;

export const Notification: React.FC = () => {
    const { isVisible, notification, message } = useNotification();

    return (
        <>
            {isVisible && (
                <NotificationBarContainer notificationType={notification}>
                    <SmallParagraph>{message}</SmallParagraph>
                </NotificationBarContainer>
            )}
        </>
    );
};
