import { useContext } from "react";
import { BackdropContext } from "../components/Backdrop/BackdropProvider";

export const useLoader = () => useContext(BackdropContext);
