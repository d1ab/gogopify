import { addParameters } from "@storybook/react"; // <- or your storybook framework
import { addDecorator, configure } from "@storybook/react";
import React from "react";
import requireContext from "require-context.macro";
import { StorybookProviderWrapper } from "../src/components/Provider/ProviderWrapper";
import { storeFixture } from "../src/fixtures/store.fixture";
import initStore from "../src/store/store";

addParameters({
    backgrounds: [
        { name: "gogopify", value: "#151514" },
        { name: "default", value: "#ffffff", default: true },
    ],
});

addDecorator((story) => (
    <StorybookProviderWrapper store={initStore(storeFixture)}>
        {story()}
    </StorybookProviderWrapper>
));

const req = requireContext('../src/stories', true, /\.stories\.tsx$/);

const loadStories = () => {
    req.keys().forEach((filename) => req(filename));
};

configure(loadStories, module);

