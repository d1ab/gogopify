import { storiesOf } from "@storybook/react";
import { Typography } from "components/_common/Typography/Typography";
import React from "react";
import { Search } from "components/TopBar/Search/Search";
import { SideBar } from "components/SideBar/SideBar";
import {
    Container,
    FlexContainer,
    FlexContainerItem,
} from "components/_common/Container/Container";
import { TopBar } from "components/TopBar/TopBar";
import { SideBarItem } from "components/SideBar/SideBarList/SideBarList";

const { H2 } = Typography;

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
    .add("with search", () => (
        <Container space={"0"}>
            <FlexContainer>
                <FlexContainerItem space={"230px"}>
                    <SideBar>
                        <SideBarItem>Item 1</SideBarItem>
                        <SideBarItem>Item 2</SideBarItem>
                        <SideBarItem>Item 3</SideBarItem>
                    </SideBar>
                </FlexContainerItem>
                <FlexContainerItem>
                    <TopBar>
                        <Search />
                    </TopBar>
                    <H2>MAIN CONTENT WILL GO HERE</H2>
                </FlexContainerItem>
            </FlexContainer>
            {/*<BottomBar />*/}
        </Container>
    ));
