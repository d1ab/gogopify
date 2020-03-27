import React from "react";
import styled from "styled-components";
import { Typography } from "../_common/Typography/Typography";
import { SideBarList } from "./SideBarList/SideBarList";

const { H3 } = Typography;

const NavMenu = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
    max-width: 230px;
    z-index: 3;
`;

export const SideBar: React.FC = ({ children }) => {
    return (
        <NavMenu>
            <H3>GoGopify</H3>
            <SideBarList>{children}</SideBarList>
        </NavMenu>
    );
};
