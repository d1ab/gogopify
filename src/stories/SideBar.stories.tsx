import { storiesOf } from "@storybook/react";
import React from "react";
import { SideBar } from "components/SideBar/SideBar";
import { Container } from "components/_common/Container/Container.styled";
import { SideBarItem } from "components/SideBar/SideBar.styled";

export default {
    title: "SideBar",
    component: SideBar,
};

storiesOf("SideBar ", module)
    .addParameters({ viewport: { defaultViewport: "default" } })
    .add("empty", () => (
        <Container space={"0"}>
            <SideBar />
        </Container>
    ))
    .add("with items", () => (
        <Container space={"0"}>
            <SideBar>
                <SideBarItem>Item 1</SideBarItem>
                <SideBarItem>Item 2</SideBarItem>
                <SideBarItem>Item 3</SideBarItem>
            </SideBar>
        </Container>
    ));
