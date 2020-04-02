import React from "react";
import { Typography } from "components/_common/Typography/Typography";
import { NavMenu, SideBarList } from "./SideBar.styled";

const { H3, Link } = Typography;

export const SideBar: React.FC = ({ children }) => {
    return (
        <NavMenu>
            <Link to={"/"}>
                <H3>GoGopify</H3>
            </Link>
            <SideBarList>{children}</SideBarList>
        </NavMenu>
    );
};
