import styled from "styled-components";

export type NotificationType = "success" | "error" | "";

export const NotificationBarContainer = styled.div.attrs<{
    notificationType: NotificationType;
}>(({ notificationType, theme }) => {
    switch (notificationType) {
        case "success":
            return {
                style: {
                    backgroundColor: theme.colors.primary,
                },
            };

        case "error":
            return {
                style: {
                    backgroundColor: theme.colors.error,
                },
            };
    }
})<{
    notificationType: NotificationType;
}>`
    position: absolute;
    margin: 0;
    top: 0;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 35px;
    display: flex;
`;
