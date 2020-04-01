import { addParameters } from "@storybook/react"; // <- or your storybook framework
import { addDecorator, configure } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { defaultTheme } from "../src/styles/defaultTheme";
import requireContext from "require-context.macro";

const history = createBrowserHistory();

addParameters({
    backgrounds: [
        { name: "gogopify", value: "#151514" },
        { name: "default", value: "#ffffff", default: true },
    ],
});

addDecorator((story) => (
    <ThemeProvider theme={defaultTheme}>
        <Router history={history}>{story()}</Router>
    </ThemeProvider>
));

// const req = require.context('../stories', true, /\.stories\.js$/); // <- import all the stories at once

function loadStories() {
    req.keys().forEach((filename) => req(filename));
}

configure(requireContext("../src", true, /\.stories\.tsx$/), module);
