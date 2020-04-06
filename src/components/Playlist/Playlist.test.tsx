import * as redux from "react-redux";
import { mount } from "enzyme";
import React from "react";
import { ProviderWrapper } from "../Provider/ProviderWrapper";
import initStore from "store/store";
import { Playlist } from "./Playlist";
import { MemoryRouter, Route } from "react-router";
import { TrackItem } from "./TrackItem/TrackItem";
import playlistConstants from "store/constants/playlist.constants";

describe("<Playlist />", () => {
    const playlistMock = {
        items: [
            {
                track: {
                    artists: [
                        {
                            id: "5wbIWUzTPuTxTyG6ouQKqz",
                            name: "Phish",
                        },
                    ],
                    id: "4ujSfZBGe8OtTSj5SJ5D9a",
                    name: "Sigma Oasis",
                    preview_url:
                        "https://p.scdn.co/mp3-preview/fdad926137186ba6c1e96e3987d6387a0a934042?cid=d81366c1377b47d99b2d43da6a461c32",
                },
                isPlaying: false,
                isPaused: false,
                isActive: false,
            },
            {
                track: {
                    artists: [
                        {
                            id: "5wbIWUzTPuTxTyG6ouQKqz",
                            name: "Phish",
                        },
                    ],
                    id: "7dofwN9eHwDhxXoiHG0wlV",
                    name: "Leaves",
                    preview_url:
                        "https://p.scdn.co/mp3-preview/cb52fff6c846d09738b733448d7b5584c66bacaa?cid=d81366c1377b47d99b2d43da6a461c32",
                },
                isPlaying: false,
                isPaused: false,
                isActive: false,
            },
        ],
        isFetching: false,
        playlistFetchingFailed: false,
        name: "Test",
        image: undefined,
    };

    const handleMock = (selectorInit?: any) => {
        const handlePlayMock = jest.fn();
        const mockDispatch = jest.fn();
        const useDispatchSpy = jest
            .spyOn(redux, "useDispatch")
            .mockReturnValue(mockDispatch);

        if (selectorInit) {
            jest.spyOn(redux, "useSelector").mockReturnValue(selectorInit);
        }

        return () => ({
            handlePlayMock,
            useDispatchSpy,
            mockDispatch,
        });
    };

    it("should render empty track list if no tracks are available", () => {
        const mock = handleMock({
            items: [],
            isFetching: false,
            playlistFetchingFailed: false,
            name: "Test",
            image: undefined,
        });
        const useDispatchSpy = mock().useDispatchSpy;
        const mockDispatch = mock().mockDispatch;
        const wrapper = mount(
            <ProviderWrapper store={initStore()}>
                <MemoryRouter
                    initialEntries={["/albums/testAlbumId/playlists"]}>
                    <Route
                        path={"/albums/:albumId/playlists"}
                        component={Playlist}
                    />
                </MemoryRouter>
            </ProviderWrapper>
        );

        expect(mockDispatch).toHaveBeenCalledWith({
            type: playlistConstants.FETCH_ALBUM_PLAYLIST_REQUEST,
            payload: "testAlbumId",
        });
        const tracks = wrapper.find(TrackItem);
        expect(tracks).toHaveLength(0);
        useDispatchSpy.mockRestore();
    });

    it("should render ALBUM track list if 'albumId' is available", () => {
        const mock = handleMock(playlistMock);
        const useDispatchSpy = mock().useDispatchSpy;
        const mockDispatch = mock().mockDispatch;
        const wrapper = mount(
            <ProviderWrapper store={initStore()}>
                <MemoryRouter
                    initialEntries={["/albums/testAlbumId/playlists"]}>
                    <Route
                        path={"/albums/:albumId/playlists"}
                        component={Playlist}
                    />
                </MemoryRouter>
            </ProviderWrapper>
        );

        expect(mockDispatch).toHaveBeenCalledWith({
            type: playlistConstants.FETCH_ALBUM_PLAYLIST_REQUEST,
            payload: "testAlbumId",
        });
        const tracks = wrapper.find(TrackItem);
        expect(tracks).toMatchSnapshot();
        useDispatchSpy.mockRestore();
    });

    it("should render PLAYLIST track list if 'id' is available", () => {
        const mock = handleMock(playlistMock);
        const useDispatchSpy = mock().useDispatchSpy;
        const mockDispatch = mock().mockDispatch;
        const wrapper = mount(
            <ProviderWrapper store={initStore()}>
                <MemoryRouter
                    initialEntries={["/albums/playlistTestId/playlists"]}>
                    <Route
                        path={"/albums/:id/playlists"}
                        component={Playlist}
                    />
                </MemoryRouter>
            </ProviderWrapper>
        );

        expect(mockDispatch).toHaveBeenCalledWith({
            type: playlistConstants.FETCH_PLAYLIST_REQUEST,
            payload: "playlistTestId",
        });
        const tracks = wrapper.find(TrackItem);
        expect(tracks).toMatchSnapshot();
        useDispatchSpy.mockRestore();
    });
});
