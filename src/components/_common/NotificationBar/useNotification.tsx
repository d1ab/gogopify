import { useContext } from "react";
import { NotificationContext } from "./NotificationBarProvider";

export const useNotification = () => useContext(NotificationContext);
