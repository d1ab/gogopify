import { useContext } from "react";
import { NotificationContext } from "components/NotificationBar/NotificationBarProvider";

export const useNotification = () => useContext(NotificationContext);
