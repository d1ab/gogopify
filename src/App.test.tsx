import React from "react";
import { shallow } from "enzyme";
import { App } from "./App";
import { storeFixture } from "./fixtures/store.fixture";
import { ProviderWrapper } from "./components/Provider/ProviderWrapper";
import initStore from "./store/store";

describe("app", () => {
    it("renders without crashing", () => {
        const wrapper = shallow(
            <ProviderWrapper store={initStore(storeFixture as any)}>
                <App />
            </ProviderWrapper>
        );

        console.log(JSON.stringify(wrapper));
    });
});
