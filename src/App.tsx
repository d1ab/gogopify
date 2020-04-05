import React, { useEffect } from "react";
import "./App.css";
import {
    Container,
    FlexContainer,
    FlexContainerItem,
} from "components/_common/Container/Container.styled";
import { SideBar } from "components/SideBar/SideBar";
import { SideBarItem } from "components/SideBar/SideBar.styled";
import { TopBar } from "components/TopBar/TopBar";
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
} from "store/selectors/authorization.selectors";
import { useNotification } from "hooks/useNotification";
import { ProtectedRoute } from "components/ProtectedRoute/ProtectedRoute";
import { Typography } from "components/_common/Typography/Typography";
import { Playlist } from "components/Playlist/Playlist";
import { Playlists } from "components/Playlists/Playlists";
import { Button } from "components/_common/Button/Button.styled";
import { Player } from "components/BottomBar/BottomBar";
import { Search } from "components/TopBar/Search/Search";
import { removeAccessToken } from "./utils/utils";
import { fetchNewReleases } from "store/actions/albums.actions";
import { fetchFeaturedPlaylists } from "store/actions/featuredPlaylists.actions";
import { fetchPlaylists } from "store/actions/playlists.actions";

const { Link } = Typography;

export const App: React.FC = () => {
    const isTokenExpired = useSelector(getAuthorizationExpirationState);
    const { isAuthorized } = useSelector(getAuthorizationState);
    const { push } = useHistory();
    const { showNotification } = useNotification();

    useEffect(() => {
        if (isTokenExpired) {
            showNotification("Token has expired, please re-log", "error");
            removeAccessToken();
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
                        <Link to={"/featured"}>
                            <SideBarItem>Featured</SideBarItem>
                        </Link>
                        <Link to={"/rew-releases"}>
                            <SideBarItem>New releases</SideBarItem>
                        </Link>
                    </SideBar>
                </FlexContainerItem>
                <FlexContainerItem>
                    <TopBar>
                        {isAuthorized && (
                            <>
                                <Search />
                                <Link to={"/profile"}>
                                    <Button color={"secondary"}>Profile</Button>
                                </Link>
                            </>
                        )}
                    </TopBar>
                    {/*TODO: move this calc to js => 170 is sum bot top + bottom bar*/}
                    <Container
                        space="0"
                        scroll={true}
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
                                render={(props) => (
                                    <Playlists
                                        {...props}
                                        title={"Playlists"}
                                        handleRequest={fetchPlaylists.request}
                                    />
                                )}
                            />
                            <ProtectedRoute
                                key={"featured"}
                                isAuthorized={isAuthorized}
                                exact={true}
                                path={"/featured"}
                                render={(props) => (
                                    <Playlists
                                        {...props}
                                        title={"Featured"}
                                        handleRequest={
                                            fetchFeaturedPlaylists.request
                                        }
                                    />
                                )}
                            />
                            <ProtectedRoute
                                key={"new-releases"}
                                isAuthorized={isAuthorized}
                                exact={true}
                                path={"/rew-releases"}
                                render={(props) => (
                                    <Playlists
                                        {...props}
                                        title={"New releases"}
                                        handleRequest={fetchNewReleases.request}
                                    />
                                )}
                            />
                            <ProtectedRoute
                                isAuthorized={isAuthorized}
                                exact={true}
                                path={"/playlists/:id"}
                                component={Playlist}
                            />
                            <ProtectedRoute
                                isAuthorized={isAuthorized}
                                exact={true}
                                path={"/albums/:albumId/playlists"}
                                component={Playlist}
                            />
                        </Switch>
                    </Container>
                </FlexContainerItem>
            </FlexContainer>
            <Player />
        </Container>
    );
};
