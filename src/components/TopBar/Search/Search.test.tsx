import { mount } from "enzyme";
import React from "react";
import { Search } from "./Search";
import { ProviderWrapper } from "components/Provider/ProviderWrapper";
import initStore from "store/store";
import * as debounce from "hooks/useDebounce";

describe("<Search />", () => {
    it("should NOT REDIRECT when search input has lesser then 3 letters", () => {
        jest.spyOn(debounce, "useDebounce").mockReturnValue("Re");
        const store = initStore();

        const wrapper = mount(
            <ProviderWrapper store={store}>
                <Search />
            </ProviderWrapper>
        );

        const search = wrapper.find(Search);
        const location = store.getState().router.location;

        expect(search).toHaveLength(1);
        expect(location.pathname).toStrictEqual("/");
        expect(location.search).toStrictEqual("");
    });

    it("should REDIRECT when search input has changed", () => {
        jest.spyOn(debounce, "useDebounce").mockReturnValue("Rammstein");
        const store = initStore();

        const wrapper = mount(
            <ProviderWrapper store={store}>
                <Search />
            </ProviderWrapper>
        );

        const search = wrapper.find(Search);
        const location = store.getState().router.location;

        expect(search).toHaveLength(1);
        expect(location.pathname).toStrictEqual("/search");
        expect(location.search).toStrictEqual("?q=Rammstein");
    });
});
