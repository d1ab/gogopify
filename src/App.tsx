import React, { useEffect } from "react";
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
import { Route, Switch, useHistory } from "react-router";
import { Profile } from "components/Profile/Profile";
import { Notification } from "components/NotificationBar/NotificationBar";
import { Backdrop } from "components/Backdrop/Backdrop";
import { Categories } from "components/Categories/Categories";
import { useSelector } from "react-redux";
import {
    getAuthorizationExpirationState,
    getAuthorizationState,
} from "./store/selectors/authorization.selectors";
import { useNotification } from "./hooks/useNotification";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { Typography } from "components/_common/Typography/Typography";
import { Playlist } from "./components/Playlist/Playlist";
import { CategoryPlaylists } from "./components/CategoryPlaylists/CategoryPlaylists";

const { Link } = Typography;

export const App: React.FC = () => {
    const isTokenExpired = useSelector(getAuthorizationExpirationState);
    const isAuthorized = useSelector(getAuthorizationState);
    const { push } = useHistory();
    const { showNotification } = useNotification();

    useEffect(() => {
        if (isTokenExpired) {
            showNotification("Token has expired, please re-log", "error");
            push("/");
        }
    }, [isTokenExpired]);

    return (
        <Container space={"0"}>
            <FlexContainer>
                <FlexContainerItem space={"230px"}>
                    <SideBar>
                        <Link to={"/categories"}>
                            <SideBarItem>Categories</SideBarItem>
                        </Link>
                        <Link to={"/featured/playlists"}>
                            <SideBarItem>New releases</SideBarItem>
                        </Link>
                    </SideBar>
                </FlexContainerItem>
                <FlexContainerItem>
                    <TopBar>{isAuthorized && <Search />}</TopBar>
                    {/*TODO: move this calc to styles => 170 is sum bot top + bottom bar*/}
                    <Container
                        space="0"
                        style={{ height: "calc(100vh - 170px)" }}>
                        <Notification />
                        <Backdrop />
                        <Switch>
                            <Route exact={true} path={"/"} component={Main} />
                            <ProtectedRoute
                                isAuthorized={isAuthorized}
                                exact={true}
                                path={"/profile"}
                                component={Profile}
                            />
                            <ProtectedRoute
                                isAuthorized={isAuthorized}
                                exact={true}
                                path={"/categories"}
                                component={Categories}
                            />
                            <ProtectedRoute
                                isAuthorized={isAuthorized}
                                exact={true}
                                path={"/category/:id/playlists"}
                                component={CategoryPlaylists}
                            />
                            <ProtectedRoute
                                isAuthorized={isAuthorized}
                                exact={true}
                                path={"/featured/playlists"}
                                component={CategoryPlaylists}
                            />
                            <ProtectedRoute
                                isAuthorized={isAuthorized}
                                exact={true}
                                path={"/playlist/:id"}
                                component={Playlist}
                            />
                        </Switch>
                    </Container>
                </FlexContainerItem>
            </FlexContainer>
            <BottomBar audioUrl={""} />
        </Container>
    );
};
