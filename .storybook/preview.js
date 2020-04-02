import { addParameters } from "@storybook/react"; // <- or your storybook framework
import { addDecorator, configure } from "@storybook/react";
import React from "react";
import requireContext from "require-context.macro";
import { ProviderWrapper } from "../src/components/Provider/ProviderWrapper";
import { storeFixture } from "../src/fixtures/store.fixture";
import initStore from "../src/store/store";

addParameters({
    backgrounds: [
        { name: "gogopify", value: "#151514" },
        { name: "default", value: "#ffffff", default: true },
    ],
});

addDecorator((story) => (
    <ProviderWrapper store={initStore(storeFixture)}>{story()}</ProviderWrapper>
));

function loadStories() {
    req.keys().forEach((filename) => req(filename));
}

configure(requireContext("../src", true, /\.stories\.tsx$/), module);
