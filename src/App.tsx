import React from "react";
import "./App.css";
import {
    Container,
    FlexContainer,
    FlexContainerItem,
} from "components/_common/Container/Container";
import { SideBar } from "components/SideBar/SideBar";
import { SideBarItem } from "components/SideBar/SideBarList/SideBarList";
import { TopBar } from "components/TopBar/TopBar";
import { Search } from "components/TopBar/Search/Search";
import { BottomBar } from "components/BottomBar/BottomBar";
import { Main } from "components/Main/Main";
import { Route, Router, Switch } from "react-router";
import { history } from "store/store";
import { Profile } from "components/Profile/Profile";
import { NotificationBarProvider } from "components/NotificationBar/NotificationBarProvider";
import { Notification } from "components/NotificationBar/NotificationBar";
import { Backdrop } from "./components/Backdrop/Backdrop";
import { BackdropProvider } from "./components/Backdrop/BackdropProvider";

export const App: React.FC = () => {
    return (
        <Container space={"0"}>
            <FlexContainer>
                <FlexContainerItem space={"230px"}>
                    <SideBar>
                        <SideBarItem>Categories</SideBarItem>
                        <SideBarItem>New releases</SideBarItem>
                    </SideBar>
                </FlexContainerItem>
                <FlexContainerItem>
                    <TopBar>
                        <Search />
                    </TopBar>
                    <Router history={history}>
                        <NotificationBarProvider>
                            <BackdropProvider>
                                <Notification />
                                <Backdrop />
                                <Switch>
                                    <Route exact={true} path={"/"}>
                                        <Main />
                                    </Route>
                                    <Route exact={true} path={"/profile"}>
                                        <Profile />
                                    </Route>
                                </Switch>
                            </BackdropProvider>
                        </NotificationBarProvider>
                    </Router>
                </FlexContainerItem>
            </FlexContainer>
            <BottomBar audioUrl={""} />
        </Container>
    );
};
