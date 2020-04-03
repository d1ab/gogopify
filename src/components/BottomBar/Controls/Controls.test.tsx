import { mount } from "enzyme";
import { ProviderWrapper } from "components/Provider/ProviderWrapper";
import initStore from "store/store";
import React from "react";
import { useDispatch } from "react-redux";
import * as redux from "react-redux";
import { Controls, Next, Pause, Play, Previous } from "./Controls";
import { storeFixture } from "../../../fixtures/store.fixture";
import { tracksFixture } from "../../../fixtures/tracks.fixture";
import tracklistConstants from "store/constants/playlist.constants";

describe("<Controls/>", () => {
    const handleMock = () => {
        const handlePlayMock = jest.fn();
        const mockDispatch = jest.fn();
        const useDispatchSpy = jest
            .spyOn(redux, "useDispatch")
            .mockReturnValue(mockDispatch);

        return () => ({
            handlePlayMock,
            useDispatchSpy,
            mockDispatch,
        });
    };

    it("should HAVE a visible DISABLED PLAY button WHEN audio IS NOT playing", () => {
        const mock = handleMock();
        const wrapper = mount(
            <Controls
                handlePlay={mock().handlePlayMock}
                isPlaying={false}
                isDisabled={true}
            />
        );

        const play = wrapper.find(Play);
        expect(play).toMatchSnapshot();
        mock().useDispatchSpy.mockRestore();
    });

    it("should NOT HAVE a visible PLAY button WHEN audio IS playing", () => {
        const mock = handleMock();
        const wrapper = mount(
            <Controls
                handlePlay={mock().handlePlayMock}
                isPlaying={true}
                isDisabled={false}
            />
        );

        const play = wrapper.find(Play);
        expect(play).toHaveLength(0);
        mock().useDispatchSpy.mockRestore();
    });

    it("should HAVE a visible ENABLED PAUSE button WHEN audio IS playing", () => {
        const mock = handleMock();
        const wrapper = mount(
            <Controls
                handlePlay={mock().handlePlayMock}
                isPlaying={true}
                isDisabled={false}
            />
        );

        const pause = wrapper.find(Pause);
        expect(pause).toMatchSnapshot();
        mock().useDispatchSpy.mockRestore();
    });

    it("should HAVE a visible DISABLED NEXT button WHEN audio IS NOT playing", () => {
        const mock = handleMock();
        const wrapper = mount(
            <Controls
                handlePlay={mock().handlePlayMock}
                isPlaying={false}
                isDisabled={true}
            />
        );

        const next = wrapper.find(Next);
        expect(next).toMatchSnapshot();
        mock().useDispatchSpy.mockRestore();
    });

    it("should HAVE a visible ENABLED NEXT button WHEN audio IS playing", () => {
        const mock = handleMock();
        const wrapper = mount(
            <Controls
                handlePlay={mock().handlePlayMock}
                isPlaying={true}
                isDisabled={true}
            />
        );

        const next = wrapper.find(Next);
        expect(next).toMatchSnapshot();
        mock().useDispatchSpy.mockRestore();
    });

    it("should HAVE a visible DISABLED PREVIOUS button WHEN audio IS NOT playing", () => {
        const mock = handleMock();
        const wrapper = mount(
            <Controls
                handlePlay={mock().handlePlayMock}
                isPlaying={false}
                isDisabled={true}
            />
        );

        const next = wrapper.find(Next);
        expect(next).toMatchSnapshot();
        mock().useDispatchSpy.mockRestore();
    });

    it("should HAVE a visible ENABLED PREVIOUS button WHEN audio IS playing", () => {
        const mock = handleMock();
        const wrapper = mount(
            <Controls
                handlePlay={mock().handlePlayMock}
                isPlaying={true}
                isDisabled={true}
            />
        );

        const next = wrapper.find(Next);
        expect(next).toMatchSnapshot();
        mock().useDispatchSpy.mockRestore();
    });

    it("should HAVE GO_TO_TRACK action with payload 'next' on NEXT button", () => {
        const mock = handleMock();
        const useDispatchSpy = mock().useDispatchSpy;
        const mockDispatch = mock().mockDispatch;
        const wrapper = mount(
            <Controls
                handlePlay={mock().handlePlayMock}
                isPlaying={true}
                isDisabled={true}
            />
        );

        const next = wrapper.find(Next);
        next.simulate("click");
        expect(mockDispatch).toHaveBeenCalledWith({
            type: tracklistConstants.GO_TO_TRACK,
            payload: {
                to: "next",
            },
        });
        useDispatchSpy.mockRestore();
    });

    it("should HAVE GO_TO_TRACK action with payload 'previous' on PREVIOUS button", () => {
        const mock = handleMock();
        const useDispatchSpy = mock().useDispatchSpy;
        const mockDispatch = mock().mockDispatch;
        const wrapper = mount(
            <Controls
                handlePlay={mock().handlePlayMock}
                isPlaying={true}
                isDisabled={true}
            />
        );

        const previous = wrapper.find(Previous);
        previous.simulate("click");
        expect(mockDispatch).toHaveBeenCalledWith({
            type: tracklistConstants.GO_TO_TRACK,
            payload: {
                to: "previous",
            },
        });
        useDispatchSpy.mockRestore();
    });

    it("should dispatch GO_TO_TRACK ('next') action on active track when audio is playing", () => {
        // mock a playlist with active track
        const handlePlayMock = jest.fn();

        const store = initStore({
            ...storeFixture,
            playlist: {
                ...storeFixture.playlist,
                items: tracksFixture.items.map((item, index) => {
                    return {
                        ...item,
                        isActive: index === 0,
                        isPlaying: index === 0,
                    };
                }),
            },
        });

        const wrapper = mount(
            <ProviderWrapper store={store}>
                <Controls
                    handlePlay={handlePlayMock}
                    isPlaying={true}
                    isDisabled={false}
                />
            </ProviderWrapper>
        );

        const activeTrackIndex = store
            .getState()
            .playlist.items.findIndex(({ isActive }) => isActive);

        expect(activeTrackIndex).toBe(0);

        const next = wrapper.find(Next);
        next.simulate("click");
        const nextActiveTrackIndex = store
            .getState()
            .playlist.items.findIndex(({ isActive }) => isActive);

        expect(nextActiveTrackIndex).toBe(1);
    });

    it("should dispatch GO_TO_TRACK ('previous') action on active track when audio is playing", () => {
        const handlePlayMock = jest.fn();

        // mock a playlist with active track
        const store = initStore({
            ...storeFixture,
            playlist: {
                ...storeFixture.playlist,
                items: tracksFixture.items.map((item, index) => {
                    return {
                        ...item,
                        isActive: index === 1,
                        isPlaying: index === 1,
                    };
                }),
            },
        });

        const wrapper = mount(
            <ProviderWrapper store={store}>
                <Controls
                    handlePlay={handlePlayMock}
                    isPlaying={true}
                    isDisabled={false}
                />
            </ProviderWrapper>
        );

        const activeTrackIndex = store
            .getState()
            .playlist.items.findIndex(({ isActive }) => isActive);

        expect(activeTrackIndex).toBe(1);
        const previous = wrapper.find(Previous);
        previous.simulate("click");
        const newActiveTrackIndex = store
            .getState()
            .playlist.items.findIndex(({ isActive }) => isActive);

        expect(newActiveTrackIndex).toBe(0);
    });

    it(
        "should dispatch GO_TO_TRACK ('next') action on active track when audio is " +
            "playing AND SHOULD be moved to the TOP of the tracklist",
        () => {
            const handlePlayMock = jest.fn();

            // mock a playlist with active track
            const store = initStore({
                ...storeFixture,
                playlist: {
                    ...storeFixture.playlist,
                    items: tracksFixture.items.map((item, index) => {
                        return {
                            ...item,
                            isActive: index === 2,
                            isPlaying: index === 2,
                        };
                    }),
                },
            });

            const wrapper = mount(
                <ProviderWrapper store={store}>
                    <Controls
                        handlePlay={handlePlayMock}
                        isPlaying={true}
                        isDisabled={false}
                    />
                </ProviderWrapper>
            );

            const activeTrackIndex = store
                .getState()
                .playlist.items.findIndex(({ isActive }) => isActive);

            expect(activeTrackIndex).toBe(2);
            const next = wrapper.find(Next);
            next.simulate("click");
            const newActiveTrackIndex = store
                .getState()
                .playlist.items.findIndex(({ isActive }) => isActive);

            expect(newActiveTrackIndex).toBe(0);
        }
    );

    it(
        "should dispatch GO_TO_TRACK ('previous') action on active track when audio is " +
            "playing AND SHOULD be moved to the BOTTOM of the tracklist",
        () => {
            const handlePlayMock = jest.fn();

            // mock a playlist with active track
            const store = initStore({
                ...storeFixture,
                playlist: {
                    ...storeFixture.playlist,
                    items: tracksFixture.items.map((item, index) => {
                        return {
                            ...item,
                            isActive: index === 0,
                            isPlaying: index === 0,
                        };
                    }),
                },
            });

            const wrapper = mount(
                <ProviderWrapper store={store}>
                    <Controls
                        handlePlay={handlePlayMock}
                        isPlaying={true}
                        isDisabled={false}
                    />
                </ProviderWrapper>
            );

            const activeTrackIndex = store
                .getState()
                .playlist.items.findIndex(({ isActive }) => isActive);

            expect(activeTrackIndex).toBe(0);
            const previous = wrapper.find(Previous);
            previous.simulate("click");
            const newActiveTrackIndex = store
                .getState()
                .playlist.items.findIndex(({ isActive }) => isActive);

            expect(newActiveTrackIndex).toBe(2);
        }
    );
});
