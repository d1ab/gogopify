import React from "react";
import { shallow } from "enzyme";
import { App } from "./App";
import { ProviderWrapper } from "./components/Provider/ProviderWrapper";
import initStore from "./store/store";

describe("<App/>", () => {
    it("renders without crashing", () => {
        const wrapper = shallow(
            <ProviderWrapper store={initStore()}>
                <App />
            </ProviderWrapper>
        );
    });
});
